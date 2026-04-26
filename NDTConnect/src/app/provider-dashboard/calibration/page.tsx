// app/provider-dashboard/calibration/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Bell, BellOff, Activity, CalendarClock, AlertTriangle, CheckCircle } from "lucide-react";
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
import { apiGet, apiPost, apiDelete, ApiError } from "@/lib/api-client";

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

interface CalibrationAlert {
  id: string;
  equipmentId: string;
  emailTo: string;
  daysBefore: number;
  enabled: boolean;
}

function CalibrationAlertsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [alerts, setAlerts] = useState<CalibrationAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState("");
  const [alertEmail, setAlertEmail] = useState("");
  const [daysBefore, setDaysBefore] = useState("30");

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/provider-dashboard/calibration");
    } else if (user && user.role !== "provider") {
      router.push("/dashboard");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user || user.role !== "provider") return;
    const ctrl = new AbortController();
    setIsLoading(true);
    Promise.all([
      apiGet<{ equipment: Equipment[] }>("/api/equipment", ctrl.signal),
      apiGet<{ alerts: CalibrationAlert[] }>("/api/calibration-alerts", ctrl.signal),
    ])
      .then(([eq, al]) => {
        setEquipment(eq?.equipment ?? []);
        setAlerts(al?.alerts ?? []);
      })
      .catch((err) => {
        if (err?.name === "AbortError") return;
        if (err instanceof ApiError && err.status === 401) return;
        toast({
          title: "Couldn't load calibration data",
          description: err?.message || "Please try again.",
          variant: "destructive",
        });
      })
      .finally(() => setIsLoading(false));
    return () => ctrl.abort();
  }, [user, toast]);

  useEffect(() => {
    if (user?.email) setAlertEmail(user.email);
  }, [user]);

  const handleAddAlert = async () => {
    if (!selectedEquipmentId || !alertEmail) {
      toast({ title: "Missing Fields", description: "Please select equipment and enter an email.", variant: "destructive" });
      return;
    }

    const existing = alerts.find((a) => a.equipmentId === selectedEquipmentId);
    if (existing) {
      toast({ title: "Alert Exists", description: "An alert already exists for this equipment. Edit or remove it first.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const { alert: created } = await apiPost<{ alert: CalibrationAlert }>(
        "/api/calibration-alerts",
        {
          equipmentId: selectedEquipmentId,
          emailTo: alertEmail,
          daysBefore: parseInt(daysBefore, 10),
          enabled: true,
        },
      );
      setAlerts((prev) => [...prev, created]);
      setSelectedEquipmentId("");
      toast({ title: "Alert Created", description: "You'll receive an email reminder before calibration is due." });
    } catch (err: any) {
      toast({
        title: "Couldn't create alert",
        description: err?.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleAlert = async (id: string) => {
    const target = alerts.find((a) => a.id === id);
    if (!target) return;
    const previous = alerts;
    const next = alerts.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a));
    setAlerts(next);
    try {
      // The contract has POST/DELETE for alerts; toggle re-creates locally then
      // mirrors via DELETE+POST so the server reflects the new enabled state.
      await apiDelete(`/api/calibration-alerts/${id}`);
      const { alert: created } = await apiPost<{ alert: CalibrationAlert }>(
        "/api/calibration-alerts",
        {
          equipmentId: target.equipmentId,
          emailTo: target.emailTo,
          daysBefore: target.daysBefore,
          enabled: !target.enabled,
        },
      );
      setAlerts((prev) => prev.map((a) => (a.id === id ? created : a)));
    } catch (err: any) {
      setAlerts(previous);
      toast({
        title: "Couldn't update alert",
        description: err?.message || "Please try again.",
        variant: "destructive",
      });
    }
  };

  const removeAlert = async (id: string) => {
    const previous = alerts;
    setAlerts((prev) => prev.filter((a) => a.id !== id));
    try {
      await apiDelete(`/api/calibration-alerts/${id}`);
      toast({ title: "Alert Removed" });
    } catch (err: any) {
      setAlerts(previous);
      toast({
        title: "Couldn't remove alert",
        description: err?.message || "Please try again.",
        variant: "destructive",
      });
    }
  };

  const getEquipmentById = (id: string) => equipment.find((e) => e.id === id);

  const { overdue, dueSoon, upcoming } = useMemo(() => {
    const now = new Date();
    const thirtyDays = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

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
  if (!user || user.role !== "provider") {
    return <div className="text-center py-10">Access Denied. Redirecting...</div>;
  }

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
            <div className="grid sm:grid-cols-3 gap-4 mb-8" aria-busy="true">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-28 rounded-lg border bg-muted/40 animate-pulse" />
              ))}
            </div>
          ) : (
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
          )}

          {!isLoading && equipment.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No equipment found. <Link href="/provider-dashboard/equipment" className="text-primary underline">Add equipment</Link> first to set up calibration tracking.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Set Up Alerts */}
      {!isLoading && equipment.length > 0 && (
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
                <Select value={daysBefore} onValueChange={setDaysBefore}>
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
              <Button onClick={handleAddAlert} disabled={isSubmitting}>
                <Bell className="mr-2 h-4 w-4" />
                {isSubmitting ? "Adding..." : "Add Alert"}
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
                        <p className="font-medium">{eq?.name || "Unknown Equipment"}</p>
                        <p className="text-sm text-muted-foreground">
                          Email: {alert.emailTo} | Remind: {alert.daysBefore} days before
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
