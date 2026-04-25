// app/provider-dashboard/calibration/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Bell, BellOff, Activity, CalendarClock, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Equipment {
  id: string;
  name: string;
  type: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  lastCalibrationDate?: string | null;
  calibrationDueDate: string;
  status: "Active" | "In Calibration" | "Out of Service" | "Retired";
  notes: string;
}

interface CalibrationAlert {
  id: string;
  equipmentId: string;
  equipmentName: string;
  emailTo: string;
  reminderDays: number;
  enabled: boolean;
}

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function daysBetween(dateStr: string) {
  const due = new Date(dateStr);
  const now = new Date();
  return Math.floor((due.getTime() - now.getTime()) / MS_PER_DAY);
}

function CalibrationAlertsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [alerts, setAlerts] = useState<CalibrationAlert[]>([]);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState("");
  const [alertEmail, setAlertEmail] = useState("info@ndt-connect.com");
  const [reminderDays, setReminderDays] = useState("30");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/provider-dashboard/calibration");
    } else if (user && user.role !== "provider" && user.role !== "inspector") {
      router.push("/dashboard");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user && user.id) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    if (!user || !user.id) return;
    try {
      setIsLoading(true);
      const [eqRes, alertsRes] = await Promise.all([
        fetch(`/api/equipment?userId=${user.id}`),
        fetch(`/api/calibration-alerts?userId=${user.id}`),
      ]);
      if (eqRes.ok) setEquipment((await eqRes.json()).data || []);
      if (alertsRes.ok) setAlerts((await alertsRes.json()).data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({ title: "Error", description: "Failed to load calibration data", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAlert = async () => {
    if (!user || !user.id) return;
    if (!selectedEquipmentId || !alertEmail) {
      toast({ title: "Missing Fields", description: "Please select equipment and enter an email.", variant: "destructive" });
      return;
    }

    const existing = alerts.find((a) => a.equipmentId === selectedEquipmentId);
    if (existing) {
      toast({ title: "Alert Exists", description: "An alert already exists for this equipment. Edit or remove it first.", variant: "destructive" });
      return;
    }

    const eq = equipment.find((e) => e.id === selectedEquipmentId);

    try {
      setIsSaving(true);
      const response = await fetch("/api/calibration-alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          equipmentId: selectedEquipmentId,
          equipmentName: eq?.name || "",
          emailTo: alertEmail,
          reminderDays: parseInt(reminderDays, 10),
          enabled: true,
        }),
      });
      if (!response.ok) throw new Error("Failed to create alert");
      await fetchData();
      setSelectedEquipmentId("");
      toast({ title: "Alert Created", description: "You'll receive an email reminder before calibration is due." });
    } catch (error) {
      console.error("Error creating alert:", error);
      toast({ title: "Error", description: "Failed to create alert", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const toggleAlert = async (id: string) => {
    try {
      const alert = alerts.find((a) => a.id === id);
      if (!alert) return;
      const response = await fetch(`/api/calibration-alerts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...alert, enabled: !alert.enabled }),
      });
      if (!response.ok) throw new Error("Failed to update alert");
      await fetchData();
    } catch (error) {
      console.error("Error updating alert:", error);
      toast({ title: "Error", description: "Failed to update alert", variant: "destructive" });
    }
  };

  const removeAlert = async (id: string) => {
    try {
      const response = await fetch(`/api/calibration-alerts/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete alert");
      await fetchData();
      toast({ title: "Alert Removed" });
    } catch (error) {
      console.error("Error deleting alert:", error);
      toast({ title: "Error", description: "Failed to delete alert", variant: "destructive" });
    }
  };

  const getEquipmentById = (id: string) => equipment.find((e) => e.id === id);

  const { overdue, dueSoon, upcoming } = useMemo(() => {
    const now = new Date();
    const thirtyDays = new Date(now.getTime() + 30 * MS_PER_DAY);

    const withDates = equipment.filter((e) => e.calibrationDueDate && e.status !== "Retired");

    return {
      overdue: withDates.filter((e) => new Date(e.calibrationDueDate) < now),
      dueSoon: withDates.filter((e) => {
        const d = new Date(e.calibrationDueDate);
        return d >= now && d <= thirtyDays;
      }),
      upcoming: withDates.filter((e) => new Date(e.calibrationDueDate) > thirtyDays),
    };
  }, [equipment]);

  if (authLoading) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]"><Activity className="h-8 w-8 animate-spin text-primary" /> <span className="ml-2">Loading...</span></div>;
  }
  if (!user || (user.role !== "provider" && user.role !== "inspector")) {
    return <div className="text-center py-10">Access Denied. Redirecting...</div>;
  }

  const daysCellClass = (days: number | null) => {
    if (days === null) return "text-muted-foreground";
    if (days < 0) return "text-red-600 font-semibold";
    if (days <= 30) return "text-orange-500 font-semibold";
    return "text-green-700";
  };

  return (
    <div className="space-y-6">
      <div>
        <Button variant="outline" asChild>
          <Link href="/provider-dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Provider Dashboard
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CalendarClock className="mr-2 h-6 w-6 text-primary" />
            Calibration Dashboard
          </CardTitle>
          <CardDescription>
            Monitor calibration status and set up email alerts for upcoming due dates.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
          {/* Summary Cards */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-lg border bg-red-50 border-red-200">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span className="font-semibold text-red-800">Overdue</span>
              </div>
              <p className="text-2xl font-bold text-red-900">{overdue.length}</p>
              {overdue.map((e) => (
                <p key={e.id} className="text-xs text-red-700 truncate">{e.name} - {new Date(e.calibrationDueDate).toLocaleDateString()}</p>
              ))}
            </div>
            <div className="p-4 rounded-lg border bg-yellow-50 border-yellow-200">
              <div className="flex items-center gap-2 mb-1">
                <Bell className="h-5 w-5 text-yellow-600" />
                <span className="font-semibold text-yellow-800">Due Within 30 Days</span>
              </div>
              <p className="text-2xl font-bold text-yellow-900">{dueSoon.length}</p>
              {dueSoon.map((e) => (
                <p key={e.id} className="text-xs text-yellow-700 truncate">{e.name} - {new Date(e.calibrationDueDate).toLocaleDateString()}</p>
              ))}
            </div>
            <div className="p-4 rounded-lg border bg-green-50 border-green-200">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-800">Up to Date</span>
              </div>
              <p className="text-2xl font-bold text-green-900">{upcoming.length}</p>
            </div>
          </div>

          {equipment.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No equipment found. <Link href="/provider-dashboard/equipment" className="text-primary underline">Add equipment</Link> first to set up calibration tracking.</p>
            </div>
          )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Equipment Calibration Status table */}
      {!isLoading && equipment.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Equipment Calibration Status</CardTitle>
            <CardDescription>All registered equipment with calibration timeline.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/40">
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Serial Number</th>
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Name</th>
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Make</th>
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Model</th>
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Status</th>
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Last Calibration</th>
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Calibration Due</th>
                    <th className="text-right px-4 py-3 font-semibold text-muted-foreground">Days Remaining</th>
                  </tr>
                </thead>
                <tbody>
                  {equipment.map((e) => {
                    const days = e.calibrationDueDate ? daysBetween(e.calibrationDueDate) : null;
                    return (
                      <tr key={e.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                        <td className="px-4 py-3 font-mono">{e.serialNumber || "—"}</td>
                        <td className="px-4 py-3 font-medium">{e.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{e.manufacturer || "—"}</td>
                        <td className="px-4 py-3 text-muted-foreground">{e.model || "—"}</td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className="text-xs">{e.status}</Badge>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {e.lastCalibrationDate ? new Date(e.lastCalibrationDate).toLocaleDateString() : "—"}
                        </td>
                        <td className="px-4 py-3">
                          {e.calibrationDueDate ? new Date(e.calibrationDueDate).toLocaleDateString() : "—"}
                        </td>
                        <td className={`px-4 py-3 text-right ${daysCellClass(days)}`}>
                          {days === null ? "—" : days < 0 ? `${Math.abs(days)} overdue` : `${days} days`}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Set Up Alerts */}
      {equipment.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5 text-primary" />
              Email Alerts
            </CardTitle>
            <CardDescription>Get email reminders before calibration is due.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid sm:grid-cols-4 gap-4 items-end">
              <div className="space-y-2">
                <Label>Equipment</Label>
                <Select value={selectedEquipmentId} onValueChange={setSelectedEquipmentId}>
                  <SelectTrigger><SelectValue placeholder="Select equipment..." /></SelectTrigger>
                  <SelectContent>
                    {equipment.filter((e) => e.calibrationDueDate && e.status !== "Retired").map((e) => (
                      <SelectItem key={e.id} value={e.id}>{e.name} (S/N: {e.serialNumber})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Email To</Label>
                <Input value={alertEmail} onChange={(e) => setAlertEmail(e.target.value)} placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <Label>Remind Days Before</Label>
                <Select value={reminderDays} onValueChange={setReminderDays}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="14">14 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="60">60 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddAlert} disabled={isSaving}>
                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bell className="mr-2 h-4 w-4" />}
                Add Alert
              </Button>
            </div>

            {/* Existing Alerts */}
            {alerts.length > 0 && (
              <div className="space-y-3 mt-6">
                <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Active Alerts</h3>
                {alerts.map((alert) => {
                  const eq = getEquipmentById(alert.equipmentId);
                  return (
                    <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{eq?.name || alert.equipmentName || "Unknown Equipment"}</p>
                        <p className="text-sm text-muted-foreground">
                          Email: {alert.emailTo} | Remind: {alert.reminderDays} days before
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={alert.enabled ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}>
                          {alert.enabled ? "Active" : "Paused"}
                        </Badge>
                        <Button variant="ghost" size="sm" onClick={() => toggleAlert(alert.id)}>
                          {alert.enabled ? <BellOff className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => removeAlert(alert.id)} className="text-red-500">
                          <span className="text-xs">Remove</span>
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default CalibrationAlertsPage;
