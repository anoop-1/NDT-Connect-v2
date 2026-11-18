import PizZip from 'pizzip';
import { ModuleDef, computeTotals, formatMoney } from './modules';

/**
 * Builds a .docx for an ERP record. If the user uploaded a Word letterhead we KEEP its
 * header, footer, styles and page setup (the final <w:sectPr>) and replace only the body.
 * Without a letterhead a clean minimal document is produced.
 */

const esc = (s: unknown) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function run(text: string, o: { bold?: boolean; size?: number; color?: string } = {}) {
  const rpr = `${o.bold ? '<w:b/>' : ''}${o.color ? `<w:color w:val="${o.color}"/>` : ''}${o.size ? `<w:sz w:val="${Math.round(o.size * 2)}"/><w:szCs w:val="${Math.round(o.size * 2)}"/>` : ''}`;
  const ts = String(text).split('\n').map((t, i) => `${i ? '<w:br/>' : ''}<w:t xml:space="preserve">${esc(t)}</w:t>`).join('');
  return `<w:r>${rpr ? `<w:rPr>${rpr}</w:rPr>` : ''}${ts}</w:r>`;
}
function p(text = '', o: { bold?: boolean; size?: number; align?: 'left' | 'right' | 'center'; after?: number; color?: string } = {}) {
  return `<w:p><w:pPr><w:spacing w:after="${o.after ?? 80}"/>${o.align ? `<w:jc w:val="${o.align === 'left' ? 'start' : o.align === 'right' ? 'end' : 'center'}"/>` : ''}</w:pPr>${text ? run(text, o) : ''}</w:p>`;
}
function cell(content: string, w: number, o: { shade?: string; bold?: boolean; align?: 'left' | 'right' | 'center' } = {}) {
  return `<w:tc><w:tcPr><w:tcW w:w="${w}" w:type="dxa"/>${o.shade ? `<w:shd w:val="clear" w:color="auto" w:fill="${o.shade}"/>` : ''}</w:tcPr>${p(content, { bold: o.bold, size: 9.5, align: o.align, after: 20 })}</w:tc>`;
}
function table(rows: { cells: string[]; header?: boolean; bold?: boolean }[], widths: number[], align: ('left' | 'right' | 'center')[] = []) {
  const border = '<w:top w:val="single" w:sz="4" w:color="BFC7D5"/><w:left w:val="single" w:sz="4" w:color="BFC7D5"/><w:bottom w:val="single" w:sz="4" w:color="BFC7D5"/><w:right w:val="single" w:sz="4" w:color="BFC7D5"/><w:insideH w:val="single" w:sz="4" w:color="BFC7D5"/><w:insideV w:val="single" w:sz="4" w:color="BFC7D5"/>';
  const grid = widths.map(w => `<w:gridCol w:w="${w}"/>`).join('');
  const trs = rows.map(r => `<w:tr>${r.cells.map((c, i) => cell(c, widths[i], { shade: r.header ? '1F3A5F' : undefined, bold: r.header || r.bold, align: align[i] }))
    .join('').replace(/<w:rPr>/g, r.header ? '<w:rPr><w:color w:val="FFFFFF"/>' : '<w:rPr>')}</w:tr>`).join('');
  return `<w:tbl><w:tblPr><w:tblW w:w="${widths.reduce((a, b) => a + b, 0)}" w:type="dxa"/><w:tblBorders>${border}</w:tblBorders><w:tblCellMar><w:left w:w="80" w:type="dxa"/><w:right w:w="80" w:type="dxa"/></w:tblCellMar></w:tblPr><w:tblGrid>${grid}</w:tblGrid>${trs}</w:tbl>${p('', { after: 120 })}`;
}

export interface DocxInput {
  mod: ModuleDef;
  record: { number: string; status: string; data: Record<string, any> };
  refs: Record<string, { title: string; data: Record<string, any> } | undefined>;
  profile?: { companyName?: string; address?: string; email?: string; phone?: string; taxId?: string; bankDetails?: string; letterhead?: { data?: Buffer } } | null;
}

export function buildBody({ mod, record, refs, profile }: DocxInput): string {
  const d = record.data; const cur = d.currency || 'USD'; const out: string[] = [];
  const W = 9360; // 6.5" printable width in twips
  out.push(p(mod.singular.toUpperCase(), { bold: true, size: 18, color: '1F3A5F', after: 40 }));
  out.push(p(`${record.number}${record.status ? '   ·   ' + record.status : ''}`, { size: 10, color: '5A6B85', after: 200 }));

  // Party block (client or vendor) + key dates
  const partyField = mod.fields.find(f => f.type === 'ref' && (f.ref === 'clients' || f.ref === 'vendors'));
  const party = partyField ? refs[partyField.name] : undefined;
  if (party) {
    const pd = party.data || {};
    const left = [partyField!.ref === 'vendors' ? 'Vendor' : 'To', party.title, pd.contactName && `Attn: ${pd.contactName}`, pd.address,
      [pd.city, pd.country].filter(Boolean).join(', '), pd.email, pd.phone, pd.taxId && `Tax ID: ${pd.taxId}`].filter(Boolean).join('\n');
    const dateFields = mod.fields.filter(f => f.type === 'date' || ['reference', 'poNumber'].includes(f.name));
    const right = [`${mod.singular} no.: ${record.number}`, ...dateFields.filter(f => d[f.name]).map(f => `${f.label}: ${d[f.name]}`)].join('\n');
    out.push(table([{ cells: [left, right] }], [W / 2, W / 2]));
  }

  const subjectField = mod.fields.find(f => f.name === 'subject');
  if (subjectField && d.subject) out.push(p(`Subject: ${d.subject}`, { bold: true, size: 11, after: 120 }));
  if (d.scope) { out.push(p('Scope of work', { bold: true, size: 11 })); out.push(p(d.scope, { size: 10, after: 160 })); }

  if (mod.totals) {
    const rows = [{ cells: ['#', 'Description', 'Qty', 'Unit', 'Rate', 'Amount'], header: true }];
    (d.lines || []).forEach((l: any, i: number) => rows.push({ cells: [String(i + 1), l.description, String(l.qty), l.unit || '', formatMoney(l.rate, cur), formatMoney((l.qty || 0) * (l.rate || 0), cur)], header: false }));
    const t = computeTotals(d);
    const tot = (label: string, v: number, bold = false) => ({ cells: ['', label, '', '', '', formatMoney(v, cur)], bold });
    rows.push(tot('Subtotal', t.subtotal) as any);
    if (t.discount) rows.push(tot('Discount', -t.discount) as any);
    if (d.taxRate) rows.push(tot(`Tax (${d.taxRate}%)`, t.tax) as any);
    rows.push(tot('TOTAL', t.total, true) as any);
    if (d.amountPaid) { rows.push(tot('Paid', -d.amountPaid) as any); rows.push(tot('BALANCE DUE', t.balance, true) as any); }
    out.push(table(rows as any, [500, 4260, 800, 900, 1400, 1500], ['center', 'left', 'right', 'center', 'right', 'right']));
  } else {
    // Key/value sheet for non-financial documents (e.g. inspection reports)
    const kv = mod.fields.filter(f => !['lines', 'textarea'].includes(f.type) && d[f.name] !== undefined && d[f.name] !== '')
      .map(f => ({ cells: [f.label, f.type === 'ref' ? (refs[f.name]?.title ?? '') : String(d[f.name])] }));
    if (kv.length) out.push(table(kv, [3000, W - 3000]));
    for (const f of mod.fields.filter(f => f.type === 'textarea' && d[f.name])) {
      out.push(p(f.label, { bold: true, size: 11 })); out.push(p(d[f.name], { size: 10, after: 160 }));
    }
  }

  if (d.terms) { out.push(p('Terms & conditions', { bold: true, size: 11 })); out.push(p(d.terms, { size: 9.5, after: 160 })); }
  const bank = d.bankDetails || (mod.key === 'invoices' ? profile?.bankDetails : '');
  if (bank) { out.push(p('Payment details', { bold: true, size: 11 })); out.push(p(bank, { size: 9.5, after: 160 })); }
  out.push(p('', { after: 400 }));
  out.push(table([{ cells: [`For ${profile?.companyName || 'the company'}\n\n\n______________________\nAuthorised signature`,
    mod.key === 'quotations' ? 'Accepted by client\n\n\n______________________\nName, signature & date' : ''] }], [W / 2, W / 2]));
  return out.join('');
}

const MIN_CT = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>`;
const MIN_RELS = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`;
const NS = 'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"';
const DEFAULT_SECT = '<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1080" w:right="1080" w:bottom="1080" w:left="1080" w:header="567" w:footer="567" w:gutter="0"/></w:sectPr>';

/** Returns the generated .docx bytes. Throws a friendly Error if the letterhead isn't a valid .docx. */
export function renderDocx(input: DocxInput): Buffer {
  const body = buildBody(input);
  const lh = input.profile?.letterhead?.data;
  if (lh && lh.length) {
    let zip: PizZip;
    try { zip = new PizZip(lh); } catch { throw new Error('Your letterhead is not a valid .docx file. Please re-upload it in ERP Settings.'); }
    const docFile = zip.file('word/document.xml');
    if (!docFile) throw new Error('Your letterhead is missing word/document.xml. Save it again as .docx and re-upload.');
    const xml = docFile.asText();
    const bStart = xml.indexOf('<w:body>'); const bEnd = xml.lastIndexOf('</w:body>');
    if (bStart < 0 || bEnd < 0) throw new Error('Could not read the body of your letterhead document.');
    const inner = xml.slice(bStart + 8, bEnd);
    const sIdx = inner.lastIndexOf('<w:sectPr');
    const sect = sIdx >= 0 ? inner.slice(sIdx) : DEFAULT_SECT; // keeps headerReference / footerReference
    zip.file('word/document.xml', xml.slice(0, bStart + 8) + body + sect + xml.slice(bEnd));
    return zip.generate({ type: 'nodebuffer', compression: 'DEFLATE' }) as Buffer;
  }
  const zip = new PizZip();
  zip.file('[Content_Types].xml', MIN_CT);
  zip.file('_rels/.rels', MIN_RELS);
  zip.file('word/document.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document ${NS}><w:body>${body}${DEFAULT_SECT}</w:body></w:document>`);
  return zip.generate({ type: 'nodebuffer', compression: 'DEFLATE' }) as Buffer;
}
