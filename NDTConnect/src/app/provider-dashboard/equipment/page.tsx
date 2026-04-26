// app/provider-dashboard/equipment/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Edit2, Activity, Wrench, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { EditableSelect } from "@/components/shared/EditableSelect";
import { apiGet, apiPost, apiPatch, apiDelete, ApiError } from "@/lib/api-client";

interface Equipment {
  id: string;
  name: string;
  type: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  calibrationDueDate: string;
  status: "Active" | "In Calibration" | "Out of Service" | "Retired";
  notes: string;
}

function EquipmentManagementPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Equipment, "id">>({
    name: "",
    type: "",
    manufacturer: "",
    model: "",
    serialNumber: "",
    calibrationDueDate: "",
    status: "Active",
    notes: "",
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/provider-dashboard/equipment");
    } else if (user && user.role !== "provider") {
      router.push("/dashboard");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user || user.role !== "provider") return;
    const ctrl = new AbortController();
    setIsLoading(true);
    apiGet<{ equipment: Equipment[] }>("/api/equipment", ctrl.signal)
      .then((data) => setEquipment(data?.equipment ?? []))
      .catch((err) => {
        if (err?.name === "AbortError") return;
        if (err instanceof ApiError && err.status === 401) return; // redirect already triggered
        toast({
          title: "Couldn't load equipment",
          description: err?.message || "Please try again.",
          variant: "destructive",
        });
      })
      .finally(() => setIsLoading(false));
    return () => ctrl.abort();
  }, [user, toast]);

  const resetForm = () => {
    setForm({
      name: "",
      type: "",
      manufacturer: "",
      model: "",
      serialNumber: "",
      calibrationDueDate: "",
      status: "Active",
      notes: "",
    });
    setEditingId(null);
  };

  const handleSave = async () => {
    if (!form.name || !form.type || !form.serialNumber) {
      toast({ title: "Missing Fields", description: "Name, type, and serial number are required.", variant: "destructive" });
      return;
    }

    setIsSaving(true);
    try {
      if (editingId) {
        const { equipment: updated } = await apiPatch<{ equipment: Equipment }>(
          `/api/equipment/${editingId}`,
          form,
        );
        setEquipment((prev) => prev.map((e) => (e.id === editingId ? updated : e)));
        toast({ title: "Equipment Updated", description: `${form.name} has been updated.` });
      } else {
        const { equipment: created } = await apiPost<{ equipment: Equipment }>(
          "/api/equipment",
          form,
        );
        setEquipment((prev) => [...prev, created]);
        toast({ title: "Equipment Added", description: `${form.name} has been added to your inventory.` });
      }
      resetForm();
      setIsDialogOpen(false);
    } catch (err: any) {
      toast({
        title: "Save failed",
        description: err?.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (item: Equipment) => {
    setForm({
      name: item.name,
      type: item.type,
      manufacturer: item.manufacturer,
      model: item.model,
      serialNumber: item.serialNumber,
      calibrationDueDate: item.calibrationDueDate,
      status: item.status,
      notes: item.notes,
    });
    setEditingId(item.id);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    const previous = equipment;
    setEquipment((prev) => prev.filter((e) => e.id !== id));
    try {
      await apiDelete(`/api/equipment/${id}`);
      toast({ title: "Equipment Removed", description: "The equipment has been removed from your inventory." });
    } catch (err: any) {
      setEquipment(previous);
      toast({
        title: "Delete failed",
        description: err?.message || "Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "In Calibration": return "bg-yellow-100 text-yellow-800";
      case "Out of Service": return "bg-red-100 text-red-800";
      case "Retired": return "bg-gray-100 text-gray-800";
      default: return "";
    }
  };

  const isCalibrationDueSoon = (dateStr: string) => {
    if (!dateStr) return false;
    const due = new Date(dateStr);
    const now = new Date();
    const daysUntil = (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return daysUntil <= 30 && daysUntil > 0;
  };

  const isCalibrationOverdue = (dateStr: string) => {
    if (!dateStr) return false;
    return new Date(dateStr) < new Date();
  };

  if (authLoading) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]"><Activity className="h-8 w-8 animate-spin text-primary" /> <span className="ml-2">Loading...</span></div>;
  }
  if (!user || user.role !== "provider") {
    return <div className="text-center py-10">Access Denied. Redirecting...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" asChild>
          <Link href="/provider-dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Provider Dashboard
          </Link>
        </Button>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Equipment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Equipment" : "Add Equipment"}</DialogTitle>
              <DialogDescription>Enter the equipment details below.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Equipment Name *</Label>
                <Input placeholder="e.g., Olympus Epoch 650" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Equipment Type *</Label>
                <EditableSelect
                  listKey="equipmentTypes"
                  value={form.type}
                  onChange={(v) => setForm({ ...form, type: v })}
                  placeholder="Select equipment type..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Manufacturer</Label>
                  <Input placeholder="e.g., Olympus" value={form.manufacturer} onChange={(e) => setForm({ ...form, manufacturer: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Model</Label>
                  <Input placeholder="e.g., Epoch 650" value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Serial Number *</Label>
                  <Input placeholder="e.g., SN-2024-001" value={form.serialNumber} onChange={(e) => setForm({ ...form, serialNumber: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Calibration Due Date</Label>
                  <Input type="date" value={form.calibrationDueDate} onChange={(e) => setForm({ ...form, calibrationDueDate: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as Equipment["status"] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="In Calibration">In Calibration</SelectItem>
                    <SelectItem value="Out of Service">Out of Service</SelectItem>
                    <SelectItem value="Retired">Retired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea placeholder="Any additional notes about this equipment..." value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => { setIsDialogOpen(false); resetForm(); }} disabled={isSaving}>Cancel</Button>
              <Button onClick={handleSave} disabled={isSaving}>
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? "Saving..." : `${editingId ? "Update" : "Add"} Equipment`}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Wrench className="mr-2 h-6 w-6 text-primary" />
            Equipment Management
          </CardTitle>
          <CardDescription>
            Track your NDT equipment inventory, calibration status, and maintenance records.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3" aria-busy="true" aria-live="polite">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-20 rounded-lg border bg-muted/40 animate-pulse" />
              ))}
            </div>
          ) : equipment.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Wrench className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">No equipment added yet</p>
              <p className="text-sm">Click &ldquo;Add Equipment&rdquo; to start tracking your NDT instruments.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {equipment.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                      {isCalibrationOverdue(item.calibrationDueDate) && (
                        <Badge variant="destructive">Calibration Overdue</Badge>
                      )}
                      {isCalibrationDueSoon(item.calibrationDueDate) && !isCalibrationOverdue(item.calibrationDueDate) && (
                        <Badge className="bg-orange-100 text-orange-800">Calibration Due Soon</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.type} {item.manufacturer && `| ${item.manufacturer}`} {item.model && item.model} | S/N: {item.serialNumber}
                    </p>
                    {item.calibrationDueDate && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Calibration due: {new Date(item.calibrationDueDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default EquipmentManagementPage;
