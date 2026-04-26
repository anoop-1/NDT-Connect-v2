// src/hooks/useUserPredefinedLists.ts
//
// Per-user customisable predefined lists.
//
// Backed by /api/user/predefined-lists/:listKey. The hook surface is
// `{ items, builtin, userItems, addItem, removeItem }` so EditableSelect and
// any other consumer can stay unchanged. We cache the most recently fetched
// list per listKey on a module-level map so consumers that mount/unmount
// across pages don't double-fetch within a session.

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useAuth } from "@/hooks/useAuth";
import { apiGet, apiPost, apiPut, ApiError } from "@/lib/api-client";
import {
  NDT_METHODS,
  NDT_EQUIPMENT_TYPES,
  type NdtMethod,
} from "@/data/ndtMethods";
import {
  PERSONNEL_CERT_BODIES,
  PERSONNEL_LEVELS,
  COMPANY_CERTIFICATIONS,
  type CertBody,
} from "@/data/ndtCertifications";

export type ListKey =
  | "ndtMethods"            // method codes / names (UT, RT, …)
  | "equipmentTypes"        // instrument types in the equipment registry
  | "personnelCertBodies"   // ASNT, PCN, ISO 9712, …
  | "personnelLevels"       // Level I, II, III, …
  | "companyCertifications";// ISO 9001, NADCAP, Nadcap, …

const BUILTIN: Record<ListKey, string[]> = {
  ndtMethods: NDT_METHODS.map((m: NdtMethod) => m.name),
  equipmentTypes: NDT_EQUIPMENT_TYPES.map(e => e.type),
  personnelCertBodies: PERSONNEL_CERT_BODIES.map((b: CertBody) => b.name),
  personnelLevels: PERSONNEL_LEVELS,
  companyCertifications: COMPANY_CERTIFICATIONS,
};

// Per-user, per-listKey in-memory cache so navigating between pages doesn't
// re-fetch every mount. Keyed as `${userId}:${listKey}`.
const cache = new Map<string, string[]>();
const cacheKey = (userId: string | null, listKey: ListKey) =>
  `${userId ?? "anon"}:${listKey}`;

export function useUserPredefinedList(listKey: ListKey) {
  const { user } = useAuth();
  const userId = user?.id ?? null;

  const [userItems, setUserItems] = useState<string[]>(() => {
    return cache.get(cacheKey(userId, listKey)) ?? [];
  });
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    if (!userId) {
      setUserItems([]);
      return;
    }
    const cached = cache.get(cacheKey(userId, listKey));
    if (cached) setUserItems(cached);

    const ctrl = new AbortController();
    apiGet<{ items: string[] }>(`/api/user/predefined-lists/${listKey}`, ctrl.signal)
      .then((res) => {
        const items = Array.isArray(res?.items) ? res.items.filter(x => typeof x === "string") : [];
        cache.set(cacheKey(userId, listKey), items);
        if (mountedRef.current) setUserItems(items);
      })
      .catch((err) => {
        if (err?.name === "AbortError") return;
        if (err instanceof ApiError && err.status === 401) return;
        // Network/server hiccup — keep whatever was cached and stay quiet so
        // we don't spam the EditableSelect dropdown with toasts.
        // eslint-disable-next-line no-console
        console.warn(`useUserPredefinedList(${listKey}) load failed:`, err?.message || err);
      });
    return () => ctrl.abort();
  }, [userId, listKey]);

  const addItem = useCallback(
    (raw: string): { ok: boolean; reason?: string } => {
      const trimmed = raw.trim();
      if (!trimmed) return { ok: false, reason: "Cannot add an empty item." };

      const all = [...BUILTIN[listKey], ...userItems];
      if (all.some(x => x.toLowerCase() === trimmed.toLowerCase())) {
        return { ok: false, reason: "Already in the list." };
      }

      // Optimistic update — keep the sync `{ ok, reason }` contract that
      // EditableSelect already depends on. Persist in the background.
      const next = [...userItems, trimmed];
      setUserItems(next);
      cache.set(cacheKey(userId, listKey), next);

      apiPost<{ items: string[] }>(
        `/api/user/predefined-lists/${listKey}`,
        { item: trimmed },
      )
        .then((res) => {
          const items = Array.isArray(res?.items)
            ? res.items.filter(x => typeof x === "string")
            : next;
          cache.set(cacheKey(userId, listKey), items);
          if (mountedRef.current) setUserItems(items);
        })
        .catch((err) => {
          // Roll back so the UI doesn't lie about persistence.
          cache.set(cacheKey(userId, listKey), userItems);
          if (mountedRef.current) setUserItems(userItems);
          // eslint-disable-next-line no-console
          console.warn(`addItem(${listKey}) failed:`, err?.message || err);
        });

      return { ok: true };
    },
    [listKey, userId, userItems],
  );

  const removeItem = useCallback(
    (raw: string) => {
      const next = userItems.filter(x => x !== raw);
      const previous = userItems;
      setUserItems(next);
      cache.set(cacheKey(userId, listKey), next);
      apiPut<{ items: string[] }>(
        `/api/user/predefined-lists/${listKey}`,
        { items: next },
      )
        .then((res) => {
          const fresh = Array.isArray(res?.items)
            ? res.items.filter(x => typeof x === "string")
            : next;
          cache.set(cacheKey(userId, listKey), fresh);
          if (mountedRef.current) setUserItems(fresh);
        })
        .catch((err) => {
          // Roll back on failure so the UI doesn't lie.
          cache.set(cacheKey(userId, listKey), previous);
          if (mountedRef.current) setUserItems(previous);
          // eslint-disable-next-line no-console
          console.warn(`removeItem(${listKey}) failed:`, err?.message || err);
        });
    },
    [userId, listKey, userItems],
  );

  // Always built-ins first, then user-custom in addition order.
  const merged = [...BUILTIN[listKey], ...userItems];

  return { items: merged, builtin: BUILTIN[listKey], userItems, addItem, removeItem };
}
