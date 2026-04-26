// src/components/shared/EditableSelect.tsx
//
// A Select wrapper that exposes the merged (built-in + user-custom) list and
// surfaces an "Add custom..." action that pops a small text-input. New items
// persist via useUserPredefinedList — once added, they appear in this and
// every other dropdown the same user opens, across Equipment, Calibration,
// and Certifications.
//
// Usage:
//   <EditableSelect
//     listKey="equipmentTypes"
//     value={form.type}
//     onChange={(v) => setForm({ ...form, type: v })}
//     placeholder="Select equipment type"
//   />

"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useUserPredefinedList, type ListKey } from "@/hooks/useUserPredefinedLists";

interface Props {
  listKey: ListKey;
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  // If you want the select to also commit-to-value the just-added item.
  selectOnAdd?: boolean;
}

export function EditableSelect({ listKey, value, onChange, placeholder = "Select...", selectOnAdd = true }: Props) {
  const { items, userItems, addItem, removeItem } = useUserPredefinedList(listKey);
  const { toast } = useToast();
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");

  const submitDraft = () => {
    const result = addItem(draft);
    if (!result.ok) {
      toast({ title: "Couldn't add item", description: result.reason, variant: "destructive" });
      return;
    }
    if (selectOnAdd) onChange(draft.trim());
    setDraft("");
    setAdding(false);
    toast({ title: "Added", description: `${draft.trim()} is now in your list.` });
  };

  return (
    <div className="space-y-2">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items.map(opt => (
            <SelectItem key={opt} value={opt}>
              <div className="flex w-full items-center justify-between gap-2">
                <span>{opt}</span>
                {userItems.includes(opt) && (
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">custom</span>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {adding ? (
        <div className="flex items-center gap-2">
          <Input
            autoFocus
            value={draft}
            onChange={e => setDraft(e.target.value)}
            placeholder="Type a new item — visible only on your account"
            onKeyDown={e => {
              if (e.key === "Enter") { e.preventDefault(); submitDraft(); }
              if (e.key === "Escape") { setAdding(false); setDraft(""); }
            }}
            className="h-8 text-sm"
          />
          <Button type="button" size="sm" onClick={submitDraft}>Add</Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => { setAdding(false); setDraft(""); }}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Button type="button" size="sm" variant="ghost" onClick={() => setAdding(true)} className="h-7 px-2 text-xs">
          <Plus className="mr-1 h-3 w-3" />
          Add custom (only visible to you)
        </Button>
      )}

      {userItems.length > 0 && (
        <div className="flex flex-wrap gap-1 pt-1">
          {userItems.map(u => (
            <span key={u} className="inline-flex items-center gap-1 rounded-full border bg-muted/40 px-2 py-0.5 text-xs">
              {u}
              <button
                type="button"
                aria-label={`Remove ${u}`}
                onClick={() => removeItem(u)}
                className="hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
