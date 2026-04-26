// app/inspector-dashboard/skill-matrix/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Zap, Plus, Edit2, Trash2, Activity, Loader2, ArrowLeft } from "lucide-react";

// ── NDT method catalogue ───────────────────────────────────────────────────────
const NDT_METHODS = [
  { code: "RT",   name: "Radiographic Testing" },
  { code: "UT",   name: "Ultrasonic Testing" },
  { code: "MT",   name: "Magnetic Particle Testing" },
  { code: "PT",   name: "Liquid Penetrant Testing" },
  { code: "ET",   name: "Eddy Current Testing" },
  { code: "VT",   name: "Visual Testing" },
  { code: "LT",   name: "Leak Testing" },
  { code: "AET",  name: "Acoustic Emission Testing" },
  { code: "PAUT", name: "Phased Array Ultrasonic Testing" },
  { code: "TOFD", name: "Time-of-Flight Diffraction" },
  { code: "GWT",  name: "Guided Wave Testing" },
  { code: "ACFM", name: "Alternating Current Field Measurement" },
  { code: "MFL",  name: "Magnetic Flux Leakage" },
  { code: "IRT",  name: "Infrared Thermography" },
  { code: "NR",   name: "Neutron Radiography" },
];

const METHOD_NAME_MAP: Record<string, string> = Object.fromEntries(
  NDT_METHODS.map((m) => [m.code, m.name])
);

const LEVELS = ["Trainee", "Level I", "Level II", "Level III"] as const;

const CERT_BODIES = [
  "ASNT",
  "SNT-TC-1A",
  "ISO 9712",
  "PCN",
  "CSWIP",
  "NAS 410",
  "CGSB",
  "EN 4179",
  "ACCP",
] as const;

// ── Types ─────────────────────────────────────────────────────────────────────
interface Skill {
  id: string;
  methodCode: string;
  methodName: string;
  level: string;
  certificationBody: string;
  certNumber: string;
  expiryDate: string;
  yearsExperience: number;
}

type SkillDraft = Omit<Skill, "id">;

const EMPTY_DRAFT: SkillDraft = {
  methodCode: "",
  methodName: "",
  level: "",
  certificationBody: "",
  certNumber: "",
  expiryDate: "",
  yearsExperience: 0,
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function expiryStatus(dateStr: string): "past" | "soon" | "ok" | "none" {
  if (!dateStr) return "none";
  const expiry = new Date(dateStr);
  const now = new Date();
  const diff = expiry.getTime() - now.getTime();
  if (diff < 0) return "past";
  if (diff < 90 * 24 * 60 * 60 * 1000) return "soon";
  return "ok";
}

function LevelBadge({ level }: { level: string }) {
  const variants: Record<string, string> = {
    Trainee:   "bg-gray-100 text-gray-700 border-gray-300",
    "Level I":  "bg-blue-100 text-blue-700 border-blue-300",
    "Level II": "bg-amber-100 text-amber-700 border-amber-300",
    "Level III":"bg-green-100 text-green-700 border-green-300",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${variants[level] ?? "bg-gray-100 text-gray-600 border-gray-300"}`}
    >
      {level}
    </span>
  );
}

function ExpiryCell({ dateStr }: { dateStr: string }) {
  if (!dateStr) return <span className="text-muted-foreground text-sm">—</span>;
  const status = expiryStatus(dateStr);
  const formatted = new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });
  const cls =
    status === "past" ? "text-red-600 font-semibold" :
    status === "soon" ? "text-orange-500 font-semibold" :
    "text-sm";
  return <span className={cls}>{formatted}</span>;
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function SkillMatrixPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [skills, setSkills] = useState<Skill[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [draft, setDraft] = useState<SkillDraft>(EMPTY_DRAFT);

  // ── Auth guard ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/inspector-dashboard/skill-matrix");
    } else if (!authLoading && user && user.role !== "inspector" && user.role !== "provider") {
      router.push("/dashboard");
    }
  }, [user, authLoading, router]);

  // ── Fetch skills ────────────────────────────────────────────────────────────
  const fetchSkills = useCallback(async () => {
    if (!user?.id) return;
    setFetchLoading(true);
    try {
      const res = await fetch(`/api/skill-matrix?userId=${user.id}`);
      const json = await res.json();
      if (json.success) {
        setSkills(json.data?.skills || []);
      } else {
        toast({ title: "Error", description: "Failed to load skill matrix.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "Network error loading skills.", variant: "destructive" });
    } finally {
      setFetchLoading(false);
    }
  }, [user?.id, toast]);

  useEffect(() => {
    if (user?.id) fetchSkills();
  }, [user?.id, fetchSkills]);

  // ── Save skills to API ──────────────────────────────────────────────────────
  const persistSkills = async (updatedSkills: Skill[]) => {
    setSaving(true);
    try {
      const res = await fetch("/api/skill-matrix", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user!.id, skills: updatedSkills }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Save failed");
      setSkills(updatedSkills);
      toast({ title: "Saved", description: "Skill matrix updated successfully." });
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Failed to save skills.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  // ── Dialog helpers ──────────────────────────────────────────────────────────
  function openAdd() {
    setEditingSkill(null);
    setDraft(EMPTY_DRAFT);
    setDialogOpen(true);
  }

  function openEdit(skill: Skill) {
    setEditingSkill(skill);
    setDraft({
      methodCode: skill.methodCode,
      methodName: skill.methodName,
      level: skill.level,
      certificationBody: skill.certificationBody,
      certNumber: skill.certNumber,
      expiryDate: skill.expiryDate,
      yearsExperience: skill.yearsExperience,
    });
    setDialogOpen(true);
  }

  function handleMethodChange(code: string) {
    setDraft((d) => ({ ...d, methodCode: code, methodName: METHOD_NAME_MAP[code] ?? "" }));
  }

  async function handleSave() {
    if (!draft.methodCode || !draft.level) {
      toast({ title: "Validation", description: "Method and Level are required.", variant: "destructive" });
      return;
    }
    let updatedSkills: Skill[];
    if (editingSkill) {
      updatedSkills = skills.map((s) =>
        s.id === editingSkill.id ? { ...draft, id: editingSkill.id } : s
      );
    } else {
      updatedSkills = [...skills, { ...draft, id: generateId() }];
    }
    await persistSkills(updatedSkills);
    setDialogOpen(false);
  }

  async function handleDelete(id: string) {
    const updatedSkills = skills.filter((s) => s.id !== id);
    await persistSkills(updatedSkills);
  }

  // ── Loading / access-denied guards ────────────────────────────────────────
  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
        <Activity className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  if (!user || (user.role !== "inspector" && user.role !== "provider")) {
    return <div className="text-center py-10">Access Denied. Redirecting...</div>;
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <Button variant="outline" asChild>
          <Link href="/inspector-dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Inspector Dashboard
          </Link>
        </Button>
      </div>

      {/* Header card */}
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <CardTitle className="flex items-center text-2xl">
                <Zap className="mr-2 h-6 w-6 text-primary" />
                NDT Skill Matrix
              </CardTitle>
              <CardDescription className="mt-1">
                Track your certified expertise across NDT methods
              </CardDescription>
            </div>
            <Button onClick={openAdd} disabled={saving}>
              <Plus className="mr-2 h-4 w-4" />
              Add Skill
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Skills table card */}
      <Card>
        <CardContent className="p-0">
          {fetchLoading ? (
            <div className="flex justify-center items-center py-16 text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              Loading skills...
            </div>
          ) : skills.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground px-4">
              <Zap className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium mb-1">No skills added yet.</p>
              <p className="text-sm">
                Click &ldquo;Add Skill&rdquo; to start building your NDT skill profile.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/40">
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Method</th>
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Full Name</th>
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Level</th>
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Cert Body</th>
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Cert #</th>
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Expiry Date</th>
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Yrs Exp</th>
                    <th className="text-right px-4 py-3 font-semibold text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {skills.map((skill, idx) => (
                    <tr
                      key={skill.id}
                      className={`border-b last:border-0 hover:bg-muted/20 transition-colors ${idx % 2 === 0 ? "" : "bg-muted/10"}`}
                    >
                      <td className="px-4 py-3 font-mono font-semibold text-primary">
                        {skill.methodCode}
                      </td>
                      <td className="px-4 py-3 text-foreground">{skill.methodName}</td>
                      <td className="px-4 py-3">
                        <LevelBadge level={skill.level} />
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {skill.certificationBody || <span className="opacity-40">—</span>}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {skill.certNumber || <span className="opacity-40">—</span>}
                      </td>
                      <td className="px-4 py-3">
                        <ExpiryCell dateStr={skill.expiryDate} />
                      </td>
                      <td className="px-4 py-3 text-center">
                        {skill.yearsExperience ?? 0}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEdit(skill)}
                            disabled={saving}
                            aria-label="Edit skill"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(skill.id)}
                            disabled={saving}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            aria-label="Delete skill"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add / Edit dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingSkill ? "Edit Skill" : "Add Skill"}</DialogTitle>
            <DialogDescription>
              {editingSkill
                ? "Update the details for this NDT skill."
                : "Add a new NDT method to your skill matrix."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            {/* Method Code */}
            <div className="grid gap-1.5">
              <Label htmlFor="methodCode">
                Method Code <span className="text-destructive">*</span>
              </Label>
              <Select value={draft.methodCode} onValueChange={handleMethodChange}>
                <SelectTrigger id="methodCode">
                  <SelectValue placeholder="Select NDT method" />
                </SelectTrigger>
                <SelectContent>
                  {NDT_METHODS.map((m) => (
                    <SelectItem key={m.code} value={m.code}>
                      <span className="font-mono font-semibold">{m.code}</span>
                      <span className="ml-2 text-muted-foreground">{m.name}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Level */}
            <div className="grid gap-1.5">
              <Label htmlFor="level">
                Level <span className="text-destructive">*</span>
              </Label>
              <Select
                value={draft.level}
                onValueChange={(v) => setDraft((d) => ({ ...d, level: v }))}
              >
                <SelectTrigger id="level">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {LEVELS.map((l) => (
                    <SelectItem key={l} value={l}>{l}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Cert Body */}
            <div className="grid gap-1.5">
              <Label htmlFor="certBody">Certification Body <span className="text-muted-foreground text-xs">(optional)</span></Label>
              <Select
                value={draft.certificationBody}
                onValueChange={(v) => setDraft((d) => ({ ...d, certificationBody: v }))}
              >
                <SelectTrigger id="certBody">
                  <SelectValue placeholder="Select certification body" />
                </SelectTrigger>
                <SelectContent>
                  {CERT_BODIES.map((cb) => (
                    <SelectItem key={cb} value={cb}>{cb}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Cert Number */}
            <div className="grid gap-1.5">
              <Label htmlFor="certNumber">
                Certificate Number <span className="text-muted-foreground text-xs">(optional)</span>
              </Label>
              <Input
                id="certNumber"
                placeholder="e.g. ASNT-RT-12345"
                value={draft.certNumber}
                onChange={(e) => setDraft((d) => ({ ...d, certNumber: e.target.value }))}
              />
            </div>

            {/* Expiry Date */}
            <div className="grid gap-1.5">
              <Label htmlFor="expiryDate">
                Expiry Date <span className="text-muted-foreground text-xs">(optional)</span>
              </Label>
              <Input
                id="expiryDate"
                type="date"
                value={draft.expiryDate}
                onChange={(e) => setDraft((d) => ({ ...d, expiryDate: e.target.value }))}
              />
            </div>

            {/* Years Experience */}
            <div className="grid gap-1.5">
              <Label htmlFor="yearsExp">Years of Experience</Label>
              <Input
                id="yearsExp"
                type="number"
                min={0}
                max={50}
                value={draft.yearsExperience}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, yearsExperience: Math.max(0, parseInt(e.target.value, 10) || 0) }))
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving…
                </>
              ) : (
                editingSkill ? "Save Changes" : "Add Skill"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
