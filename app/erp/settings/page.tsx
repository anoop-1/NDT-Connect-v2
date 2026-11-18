'use client';
import { useEffect, useRef, useState } from 'react';
import { FileUp, Trash2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { CURRENCIES } from '@/lib/erp/modules';
import { erp } from '@/components/erp/api';

const TEXT: [string, string][] = [['companyName', 'Company name'], ['email', 'Email'], ['phone', 'Phone'], ['website', 'Website'], ['taxId', 'Tax / VAT ID']];

export default function ErpSettings() {
  const { toast } = useToast();
  const [p, setP] = useState<any>({}); const [busy, setBusy] = useState(false); const fileRef = useRef<HTMLInputElement>(null);
  useEffect(() => { erp.profile().then(d => setP(d || {})).catch(() => {}); }, []);
  const set = (k: string, v: any) => setP((x: any) => ({ ...x, [k]: v }));
  const save = async () => {
    setBusy(true);
    try { setP(await erp.saveProfile(p)); toast({ title: 'Company settings saved' }); }
    catch (e: any) { toast({ title: 'Not saved', description: e.message, variant: 'destructive' }); } finally { setBusy(false); }
  };
  const upload = async (f?: File) => {
    if (!f) return; setBusy(true);
    try { const lh = await erp.uploadLetterhead(f); set('letterhead', lh); toast({ title: 'Letterhead uploaded', description: 'Quotes, invoices, POs and reports will now use its header and footer.' }); }
    catch (e: any) { toast({ title: 'Upload failed', description: e.message, variant: 'destructive' }); } finally { setBusy(false); if (fileRef.current) fileRef.current.value = ''; }
  };
  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold">Company & letterhead</h1>
      <Card>
        <CardHeader><CardTitle className="text-lg">Word letterhead</CardTitle>
          <CardDescription>Upload your company letterhead as a Word <b>.docx</b>. We keep its header, footer, logo and page layout and put the quote, invoice, PO or report into the body.</CardDescription></CardHeader>
        <CardContent className="space-y-3">
          {p.letterhead ? (
            <div className="flex flex-wrap items-center gap-3 rounded-md border bg-emerald-50 p-3 text-sm">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" /><span className="font-medium">{p.letterhead.name}</span>
              <span className="text-muted-foreground">{Math.round((p.letterhead.size || 0) / 1024)} KB · uploaded {new Date(p.letterhead.uploadedAt).toLocaleDateString()}</span>
              <Button size="sm" variant="ghost" className="ml-auto text-destructive" onClick={async () => { await erp.removeLetterhead(); set('letterhead', null); }}><Trash2 className="mr-1 h-4 w-4" />Remove</Button>
            </div>
          ) : <p className="text-sm text-muted-foreground">No letterhead yet — documents will use a clean default layout.</p>}
          <input ref={fileRef} type="file" accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="hidden" onChange={e => upload(e.target.files?.[0])} />
          <Button variant="outline" disabled={busy} onClick={() => fileRef.current?.click()}><FileUp className="mr-1 h-4 w-4" />{p.letterhead ? 'Replace letterhead' : 'Upload .docx letterhead'}</Button>
          <p className="text-xs text-muted-foreground">Tip: put your logo and address in Word&apos;s Header, and registration / bank info in the Footer. Body text in the file is ignored. Max 5 MB.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-lg">Company details & defaults</CardTitle></CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {TEXT.map(([k, l]) => <div key={k}><Label className="mb-1.5 block">{l}</Label><Input value={p[k] || ''} onChange={e => set(k, e.target.value)} /></div>)}
          <div><Label className="mb-1.5 block">Default currency</Label>
            <select className="flex h-10 w-full rounded-md border bg-background px-3 text-sm" value={p.defaultCurrency || 'USD'} onChange={e => set('defaultCurrency', e.target.value)}>{CURRENCIES.map(c => <option key={c}>{c}</option>)}</select></div>
          <div><Label className="mb-1.5 block">Default tax rate %</Label><Input type="number" step="any" value={p.defaultTaxRate ?? ''} onChange={e => set('defaultTaxRate', e.target.value)} /></div>
          <div className="md:col-span-2"><Label className="mb-1.5 block">Address</Label><Textarea rows={2} value={p.address || ''} onChange={e => set('address', e.target.value)} /></div>
          <div className="md:col-span-2"><Label className="mb-1.5 block">Default quotation terms</Label><Textarea rows={4} value={p.defaultTerms || ''} onChange={e => set('defaultTerms', e.target.value)} placeholder="Validity 30 days. Mobilisation charged separately. Scaffolding, access, permits and surface preparation by client…" /></div>
          <div className="md:col-span-2"><Label className="mb-1.5 block">Bank / payment details (printed on invoices)</Label><Textarea rows={3} value={p.bankDetails || ''} onChange={e => set('bankDetails', e.target.value)} /></div>
          <div className="md:col-span-2 flex justify-end"><Button onClick={save} disabled={busy}>Save settings</Button></div>
        </CardContent>
      </Card>
    </div>
  );
}
