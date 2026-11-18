// Free NDT ERP — module registry. Shared by API (validation) and UI (forms/tables).
// Adding a module = adding an entry here; API + screens pick it up automatically.

export type FieldType =
  | 'text' | 'textarea' | 'number' | 'money' | 'date' | 'email' | 'phone'
  | 'select' | 'ref' | 'lines' | 'checkbox';

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];          // select
  ref?: string;                // ref -> module key
  list?: boolean;              // show as table column
  placeholder?: string;
  half?: boolean;              // render at half width in the form
}

export interface ModuleDef {
  key: string;
  label: string;               // plural
  singular: string;
  group: 'Sales' | 'Operations' | 'Finance' | 'Assets' | 'People' | 'Setup';
  icon: string;                // lucide icon name (mapped in UI)
  prefix: string;              // record number prefix, e.g. QT
  statuses?: string[];
  titleField: string;          // field used as the record's display name
  fields: FieldDef[];
  totals?: boolean;            // has line items + tax/discount totals
  docx?: boolean;              // can be exported to Word on the user's letterhead
  converts?: { to: string; label: string; whenStatus?: string[] }[];
  description: string;
}

export const CURRENCIES = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'NZD', 'SGD', 'JPY', 'INR', 'SAR', 'AED', 'QAR', 'OMR', 'KWD', 'BHD', 'ZAR', 'NGN', 'EGP'];
export const NDT_METHODS = ['UT', 'PAUT', 'TOFD', 'RT', 'DR/CR', 'MT', 'PT', 'ET', 'VT', 'AE', 'MFL', 'Hardness', 'PMI', 'Leak Testing', 'Thermography'];

const lines: FieldDef = { name: 'lines', label: 'Line items', type: 'lines' };
const money = (name: string, label: string, extra: Partial<FieldDef> = {}): FieldDef => ({ name, label, type: 'money', half: true, ...extra });
const currency: FieldDef = { name: 'currency', label: 'Currency', type: 'select', options: CURRENCIES, half: true };
const notes: FieldDef = { name: 'notes', label: 'Notes', type: 'textarea' };

export const MODULES: ModuleDef[] = [
  {
    key: 'clients', label: 'Clients', singular: 'Client', group: 'Sales', icon: 'Building2', prefix: 'CL',
    titleField: 'company', statuses: ['Prospect', 'Active', 'Inactive'],
    description: 'Customer companies and contacts — the start of every quote, job and invoice.',
    fields: [
      { name: 'company', label: 'Company', type: 'text', required: true, list: true },
      { name: 'contactName', label: 'Contact person', type: 'text', list: true, half: true },
      { name: 'email', label: 'Email', type: 'email', list: true, half: true },
      { name: 'phone', label: 'Phone', type: 'phone', half: true },
      { name: 'industry', label: 'Industry', type: 'select', half: true, list: true,
        options: ['Oil & Gas', 'Petrochemical', 'Power', 'Aerospace', 'Maritime', 'Construction', 'Manufacturing', 'Pipeline', 'Nuclear', 'Other'] },
      { name: 'address', label: 'Address', type: 'textarea' },
      { name: 'city', label: 'City', type: 'text', half: true, list: true },
      { name: 'country', label: 'Country', type: 'text', half: true },
      { name: 'taxId', label: 'Tax / VAT ID', type: 'text', half: true },
      { name: 'paymentTerms', label: 'Payment terms', type: 'select', half: true, options: ['Due on receipt', 'Net 15', 'Net 30', 'Net 45', 'Net 60', 'Net 90'] },
      notes,
    ],
  },
  {
    key: 'quotations', label: 'Quotations', singular: 'Quotation', group: 'Sales', icon: 'FileText', prefix: 'QT',
    titleField: 'subject', statuses: ['Draft', 'Sent', 'Accepted', 'Rejected', 'Expired'], totals: true, docx: true,
    description: 'Priced proposals on your own Word letterhead — track every quote from draft to accepted.',
    converts: [
      { to: 'jobs', label: 'Create job', whenStatus: ['Accepted'] },
      { to: 'invoices', label: 'Create invoice', whenStatus: ['Accepted'] },
    ],
    fields: [
      { name: 'client', label: 'Client', type: 'ref', ref: 'clients', required: true, list: true },
      { name: 'subject', label: 'Subject / scope title', type: 'text', required: true, list: true, placeholder: 'e.g. PAUT of 120 girth welds — Unit 4 piping' },
      { name: 'issueDate', label: 'Quote date', type: 'date', half: true },
      { name: 'validUntil', label: 'Valid until', type: 'date', half: true, list: true },
      currency,
      { name: 'reference', label: 'Client RFQ / reference', type: 'text', half: true },
      { name: 'scope', label: 'Scope of work', type: 'textarea', placeholder: 'Methods, codes/standards (ASME V, API 570…), acceptance criteria, deliverables' },
      lines,
      money('discount', 'Discount (amount)'),
      { name: 'taxRate', label: 'Tax rate %', type: 'number', half: true },
      { name: 'terms', label: 'Terms & conditions', type: 'textarea', placeholder: 'Mobilisation, standby rates, access/scaffolding by client, validity…' },
    ],
  },
  {
    key: 'jobs', label: 'Jobs', singular: 'Job', group: 'Operations', icon: 'Briefcase', prefix: 'JB',
    titleField: 'title', statuses: ['Planned', 'In Progress', 'On Hold', 'Completed', 'Cancelled'],
    description: 'Inspection jobs / projects — site, methods, crew, dates and progress.',
    converts: [{ to: 'invoices', label: 'Create invoice', whenStatus: ['In Progress', 'Completed'] }],
    fields: [
      { name: 'title', label: 'Job title', type: 'text', required: true, list: true },
      { name: 'client', label: 'Client', type: 'ref', ref: 'clients', list: true, half: true },
      { name: 'quotation', label: 'From quotation', type: 'ref', ref: 'quotations', half: true },
      { name: 'site', label: 'Site / location', type: 'text', list: true, half: true },
      { name: 'methods', label: 'NDT methods', type: 'text', half: true, placeholder: 'UT, PAUT, MT' },
      { name: 'standard', label: 'Code / standard', type: 'text', half: true, placeholder: 'ASME B31.3, API 570, AWS D1.1' },
      { name: 'crew', label: 'Crew / technicians', type: 'text', half: true },
      { name: 'startDate', label: 'Start date', type: 'date', half: true, list: true },
      { name: 'endDate', label: 'End date', type: 'date', half: true },
      { name: 'costCentre', label: 'Cost centre', type: 'ref', ref: 'cost_centres', half: true },
      money('budget', 'Budget'),
      notes,
    ],
  },
  {
    key: 'timesheets', label: 'Timesheets', singular: 'Timesheet', group: 'Operations', icon: 'Clock', prefix: 'TS',
    titleField: 'technician', statuses: ['Draft', 'Submitted', 'Approved', 'Rejected'],
    description: 'Daily hours per technician per job — the basis for billing and payroll.',
    fields: [
      { name: 'technician', label: 'Technician', type: 'ref', ref: 'employees', required: true, list: true, half: true },
      { name: 'job', label: 'Job', type: 'ref', ref: 'jobs', list: true, half: true },
      { name: 'date', label: 'Date', type: 'date', required: true, list: true, half: true },
      { name: 'method', label: 'Method', type: 'select', options: NDT_METHODS, half: true },
      { name: 'hours', label: 'Regular hours', type: 'number', list: true, half: true },
      { name: 'overtime', label: 'Overtime hours', type: 'number', half: true },
      { name: 'standby', label: 'Standby hours', type: 'number', half: true },
      notes,
    ],
  },
  {
    key: 'inspection_reports', label: 'Inspection Reports', singular: 'Inspection Report', group: 'Operations', icon: 'ClipboardCheck', prefix: 'IR',
    titleField: 'component', statuses: ['Draft', 'Reviewed', 'Approved', 'Issued'], docx: true,
    description: 'Method reports (UT/RT/MT/PT/VT…) with results, issued on your letterhead.',
    fields: [
      { name: 'job', label: 'Job', type: 'ref', ref: 'jobs', list: true, half: true },
      { name: 'client', label: 'Client', type: 'ref', ref: 'clients', half: true },
      { name: 'method', label: 'Method', type: 'select', options: NDT_METHODS, required: true, list: true, half: true },
      { name: 'component', label: 'Component / item tested', type: 'text', required: true, list: true, half: true },
      { name: 'material', label: 'Material', type: 'text', half: true },
      { name: 'thickness', label: 'Thickness / diameter', type: 'text', half: true },
      { name: 'procedure', label: 'Procedure no.', type: 'text', half: true },
      { name: 'standard', label: 'Acceptance standard', type: 'text', half: true },
      { name: 'equipment', label: 'Equipment used (model / S/N)', type: 'text' },
      { name: 'technique', label: 'Technique & settings', type: 'textarea', placeholder: 'Probe/frequency/angle, film/source/exposure, yoke/current, penetrant system…' },
      { name: 'findings', label: 'Findings / indications', type: 'textarea' },
      { name: 'result', label: 'Result', type: 'select', options: ['Accept', 'Reject', 'Repair & Retest', 'Report Only'], list: true, half: true },
      { name: 'inspector', label: 'Inspector (name, level)', type: 'text', half: true },
      { name: 'inspectionDate', label: 'Inspection date', type: 'date', half: true },
      { name: 'reviewer', label: 'Reviewed by (Level III)', type: 'text', half: true },
    ],
  },
  {
    key: 'invoices', label: 'Invoices', singular: 'Invoice', group: 'Finance', icon: 'Receipt', prefix: 'INV',
    titleField: 'subject', statuses: ['Draft', 'Sent', 'Partially Paid', 'Paid', 'Overdue', 'Cancelled'], totals: true, docx: true,
    description: 'Bill clients from accepted quotes or jobs; track what is paid and overdue.',
    fields: [
      { name: 'client', label: 'Client', type: 'ref', ref: 'clients', required: true, list: true },
      { name: 'subject', label: 'Subject', type: 'text', required: true, list: true },
      { name: 'job', label: 'Job', type: 'ref', ref: 'jobs', half: true },
      { name: 'quotation', label: 'Quotation', type: 'ref', ref: 'quotations', half: true },
      { name: 'issueDate', label: 'Invoice date', type: 'date', half: true },
      { name: 'dueDate', label: 'Due date', type: 'date', half: true, list: true },
      currency,
      { name: 'poNumber', label: 'Client PO number', type: 'text', half: true },
      lines,
      money('discount', 'Discount (amount)'),
      { name: 'taxRate', label: 'Tax rate %', type: 'number', half: true },
      money('amountPaid', 'Amount paid'),
      { name: 'bankDetails', label: 'Bank / payment details', type: 'textarea' },
    ],
  },
  {
    key: 'purchase_orders', label: 'Purchase Orders', singular: 'Purchase Order', group: 'Finance', icon: 'ShoppingCart', prefix: 'PO',
    titleField: 'subject', statuses: ['Draft', 'Sent', 'Partially Received', 'Received', 'Cancelled'], totals: true, docx: true,
    description: 'Buy consumables, films, couplant, probes and calibration services from vendors.',
    fields: [
      { name: 'vendor', label: 'Vendor', type: 'ref', ref: 'vendors', required: true, list: true },
      { name: 'subject', label: 'Subject', type: 'text', required: true, list: true },
      { name: 'orderDate', label: 'Order date', type: 'date', half: true },
      { name: 'expectedDate', label: 'Expected delivery', type: 'date', half: true, list: true },
      currency,
      { name: 'job', label: 'For job', type: 'ref', ref: 'jobs', half: true },
      lines,
      money('discount', 'Discount (amount)'),
      { name: 'taxRate', label: 'Tax rate %', type: 'number', half: true },
      { name: 'deliveryAddress', label: 'Delivery address', type: 'textarea' },
    ],
  },
  {
    key: 'expenses', label: 'Expenses', singular: 'Expense', group: 'Finance', icon: 'Wallet', prefix: 'EX',
    titleField: 'description', statuses: ['Submitted', 'Approved', 'Reimbursed', 'Rejected'],
    description: 'Travel, per diem, consumables and site costs — per job and cost centre.',
    fields: [
      { name: 'description', label: 'Description', type: 'text', required: true, list: true },
      { name: 'category', label: 'Category', type: 'select', list: true, half: true,
        options: ['Travel', 'Accommodation', 'Per diem', 'Consumables', 'Film / chemicals', 'Equipment rental', 'Calibration', 'Training / certification', 'Other'] },
      { name: 'date', label: 'Date', type: 'date', list: true, half: true },
      money('amount', 'Amount', { required: true, list: true }),
      currency,
      { name: 'job', label: 'Job', type: 'ref', ref: 'jobs', half: true },
      { name: 'costCentre', label: 'Cost centre', type: 'ref', ref: 'cost_centres', half: true },
      { name: 'paidBy', label: 'Paid by', type: 'ref', ref: 'employees', half: true },
      { name: 'billable', label: 'Re-bill to client', type: 'checkbox', half: true },
      notes,
    ],
  },
  {
    key: 'equipment_issuance', label: 'Equipment Issuance', singular: 'Issuance', group: 'Assets', icon: 'PackageCheck', prefix: 'EI',
    titleField: 'equipment', statuses: ['Requested', 'Issued', 'Returned', 'Overdue', 'Lost / Damaged'],
    description: 'Who has which instrument, for which job, and when it comes back.',
    fields: [
      { name: 'equipment', label: 'Equipment (name / S/N)', type: 'text', required: true, list: true },
      { name: 'issuedTo', label: 'Issued to', type: 'ref', ref: 'employees', list: true, half: true },
      { name: 'job', label: 'Job', type: 'ref', ref: 'jobs', half: true },
      { name: 'issueDate', label: 'Issue date', type: 'date', half: true, list: true },
      { name: 'dueBack', label: 'Due back', type: 'date', half: true, list: true },
      { name: 'returnedDate', label: 'Returned on', type: 'date', half: true },
      { name: 'condition', label: 'Condition on return', type: 'select', half: true, options: ['Good', 'Needs calibration', 'Needs repair', 'Damaged'] },
      notes,
    ],
  },
  {
    key: 'maintenance', label: 'Maintenance', singular: 'Maintenance Record', group: 'Assets', icon: 'Wrench', prefix: 'MR',
    titleField: 'equipment', statuses: ['Scheduled', 'In Progress', 'Done', 'Cancelled'],
    description: 'Preventive and corrective maintenance for instruments, sources and vehicles.',
    fields: [
      { name: 'equipment', label: 'Equipment (name / S/N)', type: 'text', required: true, list: true },
      { name: 'type', label: 'Type', type: 'select', options: ['Preventive', 'Corrective', 'Verification', 'Source exchange'], list: true, half: true },
      { name: 'date', label: 'Date', type: 'date', list: true, half: true },
      { name: 'vendor', label: 'Service vendor', type: 'ref', ref: 'vendors', half: true },
      money('cost', 'Cost'),
      { name: 'nextDue', label: 'Next due', type: 'date', half: true },
      { name: 'work', label: 'Work performed', type: 'textarea' },
    ],
  },
  {
    key: 'employees', label: 'Employees', singular: 'Employee', group: 'People', icon: 'Users', prefix: 'EM',
    titleField: 'name', statuses: ['Active', 'On Leave', 'Inactive'],
    description: 'Technicians and staff — level, methods, rates. Certificates live in Certifications.',
    fields: [
      { name: 'name', label: 'Full name', type: 'text', required: true, list: true },
      { name: 'role', label: 'Role', type: 'select', list: true, half: true,
        options: ['Trainee', 'Level I Technician', 'Level II Technician', 'Level III', 'Inspector (API/CWI)', 'Supervisor', 'Office / Admin', 'Manager'] },
      { name: 'methods', label: 'Qualified methods', type: 'text', list: true, half: true, placeholder: 'UT II, PAUT II, RT II' },
      { name: 'email', label: 'Email', type: 'email', half: true },
      { name: 'phone', label: 'Phone', type: 'phone', half: true },
      money('dayRate', 'Day rate'),
      { name: 'joinDate', label: 'Joined', type: 'date', half: true },
      notes,
    ],
  },
  {
    key: 'vendors', label: 'Vendors', singular: 'Vendor', group: 'Setup', icon: 'Truck', prefix: 'VN',
    titleField: 'company', statuses: ['Active', 'Inactive'],
    description: 'Suppliers of equipment, consumables, calibration and subcontract services.',
    fields: [
      { name: 'company', label: 'Company', type: 'text', required: true, list: true },
      { name: 'category', label: 'Supplies', type: 'select', list: true, half: true,
        options: ['Equipment', 'Consumables', 'Calibration lab', 'Radiation sources', 'Subcontract NDT', 'Training', 'Other'] },
      { name: 'contactName', label: 'Contact', type: 'text', half: true },
      { name: 'email', label: 'Email', type: 'email', list: true, half: true },
      { name: 'phone', label: 'Phone', type: 'phone', half: true },
      { name: 'address', label: 'Address', type: 'textarea' },
      notes,
    ],
  },
  {
    key: 'cost_centres', label: 'Cost Centres', singular: 'Cost Centre', group: 'Setup', icon: 'PieChart', prefix: 'CC',
    titleField: 'name', statuses: ['Active', 'Closed'],
    description: 'Group costs by region, contract or business line to see real margins.',
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true, list: true },
      { name: 'code', label: 'Code', type: 'text', list: true, half: true },
      money('budget', 'Annual budget', { list: true }),
      notes,
    ],
  },
];

export const MODULE_MAP: Record<string, ModuleDef> = Object.fromEntries(MODULES.map(m => [m.key, m]));
export const GROUP_ORDER: ModuleDef['group'][] = ['Sales', 'Operations', 'Finance', 'Assets', 'People', 'Setup'];

export interface Line { description: string; qty: number; unit?: string; rate: number }

export function computeTotals(data: Record<string, any>) {
  const ls: Line[] = Array.isArray(data?.lines) ? data.lines : [];
  const subtotal = ls.reduce((s, l) => s + (Number(l.qty) || 0) * (Number(l.rate) || 0), 0);
  const discount = Number(data?.discount) || 0;
  const taxable = Math.max(0, subtotal - discount);
  const tax = taxable * ((Number(data?.taxRate) || 0) / 100);
  const total = taxable + tax;
  const paid = Number(data?.amountPaid) || 0;
  const r = (n: number) => Math.round(n * 100) / 100;
  return { subtotal: r(subtotal), discount: r(discount), tax: r(tax), total: r(total), balance: r(total - paid) };
}

export function formatMoney(n: number, currency = 'USD') {
  try { return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(n || 0); }
  catch { return `${currency} ${(n || 0).toFixed(2)}`; }
}

/** Validate + coerce a payload against the module definition. Unknown keys are dropped (no mass assignment). */
export function sanitize(mod: ModuleDef, input: Record<string, any>): { data: Record<string, any>; errors: string[] } {
  const data: Record<string, any> = {}; const errors: string[] = [];
  for (const f of mod.fields) {
    let v = input?.[f.name];
    if (v === undefined || v === null || v === '') {
      if (f.required) errors.push(`${f.label} is required`);
      continue;
    }
    switch (f.type) {
      case 'number': case 'money': v = Number(v); if (Number.isNaN(v)) { errors.push(`${f.label} must be a number`); continue; } break;
      case 'checkbox': v = Boolean(v); break;
      case 'date': { const d = new Date(v); if (isNaN(d.getTime())) { errors.push(`${f.label} is not a valid date`); continue; } v = d.toISOString().slice(0, 10); break; }
      case 'select': if (f.options && !f.options.includes(String(v))) { errors.push(`${f.label}: invalid option`); continue; } v = String(v); break;
      case 'lines':
        if (!Array.isArray(v)) { errors.push('Line items must be a list'); continue; }
        v = v.slice(0, 200).map((l: any) => ({
          description: String(l?.description ?? '').slice(0, 1000),
          qty: Number(l?.qty) || 0, unit: String(l?.unit ?? '').slice(0, 30), rate: Number(l?.rate) || 0,
        })).filter((l: Line) => l.description || l.qty || l.rate);
        break;
      case 'ref': v = String(v).slice(0, 64); break;
      default: v = String(v).slice(0, f.type === 'textarea' ? 20000 : 500);
    }
    data[f.name] = v;
  }
  return { data, errors };
}
