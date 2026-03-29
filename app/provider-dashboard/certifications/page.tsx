// app/provider-dashboard/certifications/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Activity, Award, Users2, AlertTriangle, CheckCircle, Clock, ExternalLink, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import type { ProviderUser, PersonnelQualification, CompanyCertification } from "@/lib/types";

function CertificationsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [personnelQuals, setPersonnelQuals] = useState<PersonnelQualification[]>([]);
  const [companyCerts, setCompanyCerts] = useState<CompanyCertification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/provider-dashboard/certifications");
    } else if (user && user.role !== "provider" && user.role !== "inspector") {
      router.push("/dashboard");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user && user.id) {
      fetchCertifications();
    }
  }, [user]);

  const fetchCertifications = async () => {
    if (!user || !user.id) return;
    try {
      setIsLoading(true);
      const response = await fetch(`/api/certifications?userId=${user.id}`);
      if (!response.ok) throw new Error("Failed to fetch certifications");
      const data = await response.json();
      setPersonnelQuals(data.personnelQualifications || []);
      setCompanyCerts(data.certifications || []);
    } catch (error) {
      console.error("Error fetching certifications:", error);
      toast({ title: "Error", description: "Failed to load certifications", variant: "destructive" });
      setPersonnelQuals([]);
      setCompanyCerts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const { expiringPersonnel, expiredPersonnel, expiringCompany, expiredCompany } = useMemo(() => {
    const now = new Date();
    const thirtyDays = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    return {
      personnelQuals,
      companyCerts,
      expiringPersonnel: personnelQuals.filter(q => q.expiryDate && new Date(q.expiryDate) > now && new Date(q.expiryDate) <= thirtyDays),
      expiredPersonnel: personnelQuals.filter(q => q.expiryDate && new Date(q.expiryDate) <= now),
      expiringCompany: companyCerts.filter(c => c.expiryDate && new Date(c.expiryDate) > now && new Date(c.expiryDate) <= thirtyDays),
      expiredCompany: companyCerts.filter(c => c.expiryDate && new Date(c.expiryDate) <= now),
    };
  }, [personnelQuals, companyCerts]);

  const totalExpiring = expiringPersonnel.length + expiringCompany.length;
  const totalExpired = expiredPersonnel.length + expiredCompany.length;
  const totalValid = (personnelQuals.length + companyCerts.length) - totalExpiring - totalExpired;
  const provider = user as ProviderUser | null;

  const getExpiryStatus = (expiryDate: Date | string | null | undefined) => {
    if (!expiryDate) return { label: "No Expiry Set", color: "bg-gray-100 text-gray-600", icon: null };
    const d = new Date(expiryDate);
    const now = new Date();
    const thirtyDays = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    if (d <= now) return { label: "Expired", color: "bg-red-100 text-red-800", icon: <AlertTriangle className="h-3 w-3" /> };
    if (d <= thirtyDays) return { label: "Expiring Soon", color: "bg-yellow-100 text-yellow-800", icon: <Clock className="h-3 w-3" /> };
    return { label: "Valid", color: "bg-green-100 text-green-800", icon: <CheckCircle className="h-3 w-3" /> };
  };

  if (authLoading) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]"><Activity className="h-8 w-8 animate-spin text-primary" /> <span className="ml-2">Loading...</span></div>;
  }
  if (!user || (user.role !== "provider" && user.role !== "inspector")) {
    return <div className="text-center py-10">Access Denied. Redirecting...</div>;
  }

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]"><Loader2 className="h-8 w-8 animate-spin text-primary" /> <span className="ml-2">Loading certifications...</span></div>;
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
        <Button asChild>
          <Link href="/provider-profile">
            <ExternalLink className="mr-2 h-4 w-4" />
            Edit in Profile
          </Link>
        </Button>
      </div>

      {/* Summary */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span className="font-semibold text-red-800">Expired</span>
            </div>
            <p className="text-3xl font-bold text-red-900">{totalExpired}</p>
          </CardContent>
        </Card>
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-5 w-5 text-yellow-600" />
              <span className="font-semibold text-yellow-800">Expiring in 30 Days</span>
            </div>
            <p className="text-3xl font-bold text-yellow-900">{totalExpiring}</p>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-green-800">Valid</span>
            </div>
            <p className="text-3xl font-bold text-green-900">{totalValid < 0 ? 0 : totalValid}</p>
          </CardContent>
        </Card>
      </div>

      {/* Personnel Qualifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users2 className="mr-2 h-5 w-5 text-primary" />
            Personnel Qualifications (NDT Level I, II, III)
          </CardTitle>
          <CardDescription>Track your team's NDT certification levels and expiry dates.</CardDescription>
        </CardHeader>
        <CardContent>
          {personnelQuals.length === 0 ? (
            <p className="text-muted-foreground text-center py-6">No personnel qualifications added. <Link href="/provider-profile" className="text-primary underline">Add in your profile</Link>.</p>
          ) : (
            <div className="space-y-3">
              {personnelQuals.map((qual, i) => {
                const status = getExpiryStatus(qual.expiryDate);
                return (
                  <div key={qual.id || i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{qual.certificationBody} — {qual.level}</span>
                        <Badge className={status.color}>
                          <span className="flex items-center gap-1">{status.icon} {status.label}</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {qual.quantity} personnel
                        {qual.expiryDate && ` | Expires: ${new Date(qual.expiryDate).toLocaleDateString()}`}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Company Certifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="mr-2 h-5 w-5 text-primary" />
            Company Certifications
          </CardTitle>
          <CardDescription>ISO, IACS, API, and other company-level certifications.</CardDescription>
        </CardHeader>
        <CardContent>
          {companyCerts.length === 0 ? (
            <p className="text-muted-foreground text-center py-6">No company certifications added. <Link href="/provider-profile" className="text-primary underline">Add in your profile</Link>.</p>
          ) : (
            <div className="space-y-3">
              {companyCerts.map((cert, i) => {
                const status = getExpiryStatus(cert.expiryDate);
                return (
                  <div key={cert.id || i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{cert.name}</span>
                        {cert.category && <span className="text-sm text-muted-foreground">({cert.category})</span>}
                        <Badge className={status.color}>
                          <span className="flex items-center gap-1">{status.icon} {status.label}</span>
                        </Badge>
                      </div>
                      {cert.expiryDate && (
                        <p className="text-sm text-muted-foreground">Expires: {new Date(cert.expiryDate).toLocaleDateString()}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <p className="text-sm text-blue-800">
            <strong>Automatic Alerts:</strong> NDT Connect sends email alerts 30 days before any certification expires. Ensure your profile has up-to-date expiry dates to receive timely reminders.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default CertificationsPage;
