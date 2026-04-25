// app/admin/compliance/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, Activity, Download, AlertTriangle, CheckCircle, Clock, Users, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface CertRecord {
  userId: string;
  userName: string;
  email: string;
  role: string;
  certType: string;
  certName: string;
  certNumber?: string;
  body?: string;
  expiryDate?: string;
  daysUntilExpiry?: number;
  status: 'valid' | 'expiring_soon' | 'expired' | 'no_expiry';
}

export default function ComplianceDashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [certRecords, setCertRecords] = useState<CertRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    if (!loading && !user) router.push('/login');
    else if (!loading && user && user.role !== 'admin') router.push('/dashboard');
  }, [user, loading, router]);

  const loadData = useCallback(async () => {
    if (!user || user.role !== 'admin') return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/users');
      const json = await res.json();
      const users: any[] = json.data || json || [];
      setAllUsers(users);

      const records: CertRecord[] = [];
      const now = new Date();

      for (const u of users) {
        if (u.role !== 'provider' && u.role !== 'inspector') continue;
        const pd = u.profileData || {};

        // Personnel qualifications
        const quals: any[] = pd.personnelQualifications || [];
        for (const q of quals) {
          const expiry = q.expiryDate ? new Date(q.expiryDate) : null;
          const daysUntil = expiry ? Math.ceil((expiry.getTime() - now.getTime()) / 86400000) : undefined;
          let status: CertRecord['status'] = 'no_expiry';
          if (expiry) {
            if (daysUntil! < 0) status = 'expired';
            else if (daysUntil! <= 90) status = 'expiring_soon';
            else status = 'valid';
          }
          records.push({
            userId: u._id,
            userName: u.name || u.email,
            email: u.email,
            role: u.role,
            certType: 'Personnel',
            certName: `${q.method || ''} ${q.level || ''}`.trim() || q.certificationBody || 'NDT Cert',
            certNumber: q.certificationNumber,
            body: q.certificationBody,
            expiryDate: q.expiryDate,
            daysUntilExpiry: daysUntil,
            status,
          });
        }

        // Company certifications
        const companyCerts: any[] = pd.companyCertifications || [];
        for (const c of companyCerts) {
          const expiry = c.expiryDate ? new Date(c.expiryDate) : null;
          const daysUntil = expiry ? Math.ceil((expiry.getTime() - now.getTime()) / 86400000) : undefined;
          let status: CertRecord['status'] = 'no_expiry';
          if (expiry) {
            if (daysUntil! < 0) status = 'expired';
            else if (daysUntil! <= 90) status = 'expiring_soon';
            else status = 'valid';
          }
          records.push({
            userId: u._id,
            userName: u.name || pd.companyName || u.email,
            email: u.email,
            role: u.role,
            certType: 'Company',
            certName: c.name || c.certificationName || 'Company Cert',
            certNumber: c.certificationNumber,
            expiryDate: c.expiryDate,
            daysUntilExpiry: daysUntil,
            status,
          });
        }
      }

      // Sort: expired first, then expiring soon, then valid
      records.sort((a, b) => {
        const order = { expired: 0, expiring_soon: 1, valid: 2, no_expiry: 3 };
        return order[a.status] - order[b.status];
      });

      setCertRecords(records);
    } catch (e) {
      toast({ title: "Error", description: "Failed to load compliance data", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }, [user, toast]);

  useEffect(() => { loadData(); }, [loadData]);

  const statusBadge = (status: CertRecord['status'], daysUntil?: number) => {
    if (status === 'expired') return <Badge className="bg-red-100 text-red-800 border-red-200">Expired</Badge>;
    if (status === 'expiring_soon') return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Exp. in {daysUntil}d</Badge>;
    if (status === 'valid') return <Badge className="bg-green-100 text-green-800 border-green-200">Valid</Badge>;
    return <Badge variant="outline">No Expiry</Badge>;
  };

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Role', 'Cert Type', 'Certification', 'Number', 'Body', 'Expiry Date', 'Days Until Expiry', 'Status'];
    const rows = filteredRecords.map(r => [
      r.userName, r.email, r.role, r.certType, r.certName,
      r.certNumber || '', r.body || '',
      r.expiryDate ? new Date(r.expiryDate).toLocaleDateString() : 'N/A',
      r.daysUntilExpiry !== undefined ? r.daysUntilExpiry.toString() : 'N/A',
      r.status.replace('_', ' '),
    ]);
    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url;
    a.download = `ndt-connect-compliance-${new Date().toISOString().split('T')[0]}.csv`;
    a.click(); URL.revokeObjectURL(url);
    toast({ title: "Exported", description: `${filteredRecords.length} records exported to CSV.` });
  };

  const filteredRecords = certRecords.filter(r => {
    const matchesSearch = !searchTerm || 
      r.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.certName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || r.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: certRecords.length,
    expired: certRecords.filter(r => r.status === 'expired').length,
    expiringSoon: certRecords.filter(r => r.status === 'expiring_soon').length,
    valid: certRecords.filter(r => r.status === 'valid').length,
  };

  if (loading || isLoading) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]"><Activity className="h-8 w-8 animate-spin text-primary" /><span className="ml-2">Loading compliance data...</span></div>;
  }

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild><Link href="/admin/dashboard"><ArrowLeft className="h-4 w-4 mr-1" />Back</Link></Button>
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2"><ShieldCheck className="h-8 w-8 text-primary" />Compliance Dashboard</h1>
          <p className="text-muted-foreground mt-1">Track certification expiry across all providers and inspectors.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Certifications', value: stats.total, icon: <Users className="h-5 w-5" />, color: 'text-primary' },
          { label: 'Expired', value: stats.expired, icon: <XCircle className="h-5 w-5" />, color: 'text-red-600' },
          { label: 'Expiring (90 days)', value: stats.expiringSoon, icon: <AlertTriangle className="h-5 w-5" />, color: 'text-orange-500' },
          { label: 'Valid', value: stats.valid, icon: <CheckCircle className="h-5 w-5" />, color: 'text-green-600' },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className={`flex items-center gap-2 ${stat.color} mb-1`}>{stat.icon}<span className="text-sm font-medium">{stat.label}</span></div>
              <p className="text-3xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters + Export */}
      <div className="flex flex-wrap gap-3 items-center">
        <Input placeholder="Search by name, email, or certification..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="max-w-xs" />
        <div className="flex gap-2">
          {['all', 'expired', 'expiring_soon', 'valid', 'no_expiry'].map(s => (
            <Button key={s} variant={filterStatus === s ? 'default' : 'outline'} size="sm" onClick={() => setFilterStatus(s)}>
              {s === 'all' ? 'All' : s === 'expiring_soon' ? 'Expiring Soon' : s.charAt(0).toUpperCase() + s.slice(1)}
            </Button>
          ))}
        </div>
        <Button variant="outline" size="sm" onClick={exportCSV} className="ml-auto"><Download className="h-4 w-4 mr-2" />Export CSV</Button>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Certification Registry ({filteredRecords.length} records)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Provider / Inspector</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Certification</TableHead>
                <TableHead>Cert Number</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.length === 0 ? (
                <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No records found.</TableCell></TableRow>
              ) : (
                filteredRecords.map((r, i) => (
                  <TableRow key={i} className={r.status === 'expired' ? 'bg-red-50/50' : r.status === 'expiring_soon' ? 'bg-orange-50/50' : ''}>
                    <TableCell>
                      <div className="font-medium">{r.userName}</div>
                      <div className="text-xs text-muted-foreground">{r.email} · {r.role}</div>
                    </TableCell>
                    <TableCell><Badge variant="outline">{r.certType}</Badge></TableCell>
                    <TableCell>
                      <div>{r.certName}</div>
                      {r.body && <div className="text-xs text-muted-foreground">{r.body}</div>}
                    </TableCell>
                    <TableCell className="text-sm font-mono">{r.certNumber || '—'}</TableCell>
                    <TableCell className="text-sm">{r.expiryDate ? new Date(r.expiryDate).toLocaleDateString() : '—'}</TableCell>
                    <TableCell>{statusBadge(r.status, r.daysUntilExpiry)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
