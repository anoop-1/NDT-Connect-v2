'use client';
// Tiny client for the /api/erp endpoints. Cookies carry the session; no user id is ever sent.
export interface ErpRow { id: string; number: string; module: string; status: string; title: string; data: Record<string, any>;
  totals?: { subtotal: number; discount: number; tax: number; total: number; balance: number } | null;
  source?: { module: string; id: string; number: string } | null; history?: { at: string; status: string; note?: string }[];
  refs?: Record<string, { id: string; number: string; title: string; data: Record<string, any> }>; createdAt?: string; updatedAt?: string }

async function call<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, { credentials: 'include', ...init, headers: init?.body && !(init.body instanceof FormData) ? { 'Content-Type': 'application/json', ...(init?.headers || {}) } : init?.headers });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.success === false) throw new Error(json.message || `Request failed (${res.status})`);
  return json.data as T;
}
export const erp = {
  list: (m: string, q = '', status = '') => call<ErpRow[]>(`/api/erp/${m}?${new URLSearchParams({ ...(q && { q }), ...(status && { status }) })}`),
  get: (m: string, id: string) => call<ErpRow>(`/api/erp/${m}/${id}`),
  create: (m: string, data: any, status?: string) => call<ErpRow>(`/api/erp/${m}`, { method: 'POST', body: JSON.stringify({ data, status }) }),
  update: (m: string, id: string, data: any, status?: string) => call<ErpRow>(`/api/erp/${m}/${id}`, { method: 'PUT', body: JSON.stringify({ data, status }) }),
  remove: (m: string, id: string) => call<void>(`/api/erp/${m}/${id}`, { method: 'DELETE' }),
  convert: (m: string, id: string, to: string) => call<ErpRow>(`/api/erp/${m}/${id}/convert`, { method: 'POST', body: JSON.stringify({ to }) }),
  summary: () => call<any>('/api/erp/summary'),
  profile: () => call<any>('/api/erp/profile'),
  saveProfile: (p: any) => call<any>('/api/erp/profile', { method: 'PUT', body: JSON.stringify(p) }),
  uploadLetterhead: (f: File) => { const fd = new FormData(); fd.append('file', f); return call<any>('/api/erp/profile/letterhead', { method: 'POST', body: fd }); },
  removeLetterhead: () => call<void>('/api/erp/profile/letterhead', { method: 'DELETE' }),
};
export const docxUrl = (m: string, id: string) => `/api/erp/${m}/${id}/docx`;

export const STATUS_TONE: Record<string, string> = {
  Draft: 'bg-slate-100 text-slate-700', Sent: 'bg-blue-100 text-blue-700', Accepted: 'bg-emerald-100 text-emerald-700', Rejected: 'bg-rose-100 text-rose-700',
  Expired: 'bg-amber-100 text-amber-800', Paid: 'bg-emerald-100 text-emerald-700', 'Partially Paid': 'bg-teal-100 text-teal-700', Overdue: 'bg-rose-100 text-rose-700',
  Cancelled: 'bg-slate-200 text-slate-600', Planned: 'bg-slate-100 text-slate-700', 'In Progress': 'bg-blue-100 text-blue-700', Completed: 'bg-emerald-100 text-emerald-700',
  'On Hold': 'bg-amber-100 text-amber-800', Approved: 'bg-emerald-100 text-emerald-700', Issued: 'bg-indigo-100 text-indigo-700', Returned: 'bg-emerald-100 text-emerald-700',
  Active: 'bg-emerald-100 text-emerald-700', Prospect: 'bg-blue-100 text-blue-700', Inactive: 'bg-slate-200 text-slate-600', Done: 'bg-emerald-100 text-emerald-700',
};
export function StatusPill({ s }: { s: string }) {
  if (!s) return null;
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_TONE[s] ?? 'bg-slate-100 text-slate-700'}`}>{s}</span>;
}
