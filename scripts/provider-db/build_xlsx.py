import json,re,secrets,datetime
from openpyxl import Workbook
from openpyxl.styles import Font,PatternFill,Alignment,Border,Side
from openpyxl.utils import get_column_letter
from openpyxl.worksheet.table import Table,TableStyleInfo
from openpyxl.comments import Comment
REG={'Gulf Coast':'TX LA MS AL','Southeast':'FL GA SC NC TN KY','Mid-Atlantic':'VA MD DE DC NJ PA WV','Northeast':'NY CT MA RI NH VT ME','Midwest':'OH MI IN IL WI MN IA MO KS NE ND SD','Mountain':'CO WY MT UT ID NM AZ NV','West Coast':'CA OR WA','Alaska & Hawaii':'AK HI','South Central':'OK AR'}
S2R={s:r for r,v in REG.items() for s in v.split()}
def norm(n): return re.sub(r'(inc|llc|ltd|corp|corporation|company|co|the|group|services?)','',re.sub(r'[^a-z ]','',n.lower())).replace(' ','')[:18]
recs={}
def add(r):
    k=norm(r['company'])
    if not k: return
    if k in recs:
        o=recs[k]
        for f,v in r.items():
            if v and not o.get(f): o[f]=v
        if r.get('source') and r['source'] not in o['source']: o['source']+='; '+r['source']
    else: recs[k]=r
for f in ('crawled1.json','crawled2.json','crawled3.json'):
    for x in json.load(open(f)):
        if f=='crawled1.json' and x['crawl_status']!='ok' and any(norm(x['company'])==norm(y['company']) for y in json.load(open('crawled2.json')) if y['crawl_status']=='ok'): continue
        st=x.get('hq_state','') ; a=x.get('address','')
        m=re.search(r',\s*([A-Z]{2})\s+(\d{5})$',a)
        if m: st=st or m.group(1)
        add({'company':x['company'],'sector':x['sector'],'services':x.get('services',''),'certs':x.get('certs',''),'address':a,'city':x.get('hq_city',''),'state':st,'zip':m.group(2) if m else '',
             'phone':x.get('phones','').split(';')[0],'phones_all':x.get('phones',''),'email':x.get('emails',''),'email_type':x.get('email_type',''),'website':x['website'] if x['crawl_status']=='ok' else x['website'],
             'source':x['source'],'source_url':x['website'],'crawl':x['crawl_status']})
for x in json.load(open('gov_rows.json')):
    add({'company':x['company'],'sector':x['sector'],'services':'Special Inspection (IBC)'+('; NDT (structural welds)' if x['ndt_flag'] else '')+('; CWI/Welding' if x['welding_flag'] else ''),
         'certs':'Building-department recognized agency','address':x['address'],'city':x['city'],'state':x['state'],'zip':x['zip'],'phone':x['phone'],'phones_all':x['phone'],
         'email':x['email'],'email_type':'published on government list' if x['email'] else '','website':x['website'],'source':x['source'],'source_url':x['source_url'],'crawl':'gov-list'})
for x in json.load(open('sd_rows.json')):
    add({'company':x['company'],'sector':'Civil infrastructure / special inspection','services':'Special Inspection (IBC); '+x['scope'].replace('/','; '),'certs':'City of San Diego registered '+x['type'].lower(),
         'address':'','city':'San Diego area','state':'CA','zip':'','phone':x['phone'],'phones_all':x['phone'],'email':x['email'],'email_type':'published on government list' if x['email'] else '',
         'website':'','source':'City of San Diego — Registered Materials Testing Labs & Special Inspection Agencies 2026-2028','source_url':'https://www.sandiego.gov/sites/default/files/legacy/development-services/pdf/industry/testlabs.pdf','crawl':'gov-list'})
rows=sorted(recs.values(),key=lambda r:(S2R.get(r['state'],'zz'),r['state'],r['company'].lower()))
COLS=['ID','Company Name','Sector(s)','Primary Sector','US Region','State','City','ZIP','Street Address','Phone (main)','All Phones','Business Email','Email Type','Website',
 'Services / Methods Offered','Accreditations / Approvals Found','Service Area','Company Description','Year Founded','Employee Range','Insurance (GL/PL) on file','Level III on staff',
 'Logo URL','Listing Slug','Listing Status','Claim Token','Claim URL','Outreach Eligible','Outreach Status','Outreach Date','Unsubscribed','Source','Source URL','Data Verified (crawl)','Last Updated','Notes']
wb=Workbook(); ws=wb.active; ws.title='Providers'
F=Font(name='Arial',size=10); H=Font(name='Arial',size=10,bold=True,color='FFFFFF'); HF=PatternFill('solid',fgColor='0B3D91')
ws.append(COLS)
today=datetime.date.today().isoformat()
for i,r in enumerate(rows,1):
    sec=r['sector']; prim='Maritime' if sec.startswith('Maritime') else ('Oil & Gas' if 'Oil' in sec.split(';')[0] else 'Civil infrastructure')
    if 'Maritime' not in sec: r['services']='; '.join(x for x in r['services'].split('; ') if x not in ('ROV/Subsea','Hull/Class survey'))
    slug=re.sub(r'[^a-z0-9]+','-',r['company'].lower()).strip('-')[:60]
    tok=secrets.token_urlsafe(16)
    elig='Yes' if r['email'] and r['email_type'] in ('role-based','published on government list') else ('Review' if r['email'] else 'No — no public email')
    ws.append([f'NDTC-US-{i:04d}',r['company'],sec,prim,S2R.get(r['state'],'Unknown'),r['state'],r['city'],r['zip'],r['address'],r['phone'],r['phones_all'],r['email'],r['email_type'],r['website'],
      r['services'],r['certs'],'','','','','','','',slug,'Unclaimed (draft — not yet published)',tok,f'https://ndt-connect.com/claim?token={tok}',elig,'Not contacted — awaiting SES setup & approval','', 'No',
      r['source'],r['source_url'],r['crawl'],today,''])
n=ws.max_row
for c in ws[1]: c.font=H; c.fill=HF; c.alignment=Alignment(wrap_text=True,vertical='center')
for row in ws.iter_rows(min_row=2):
    for c in row: c.font=F
W={'B':34,'C':26,'D':16,'E':14,'F':6,'G':16,'I':34,'J':15,'K':22,'L':32,'M':18,'N':30,'O':50,'P':34,'Z':24,'AA':40,'AB':16,'AC':30,'AF':40,'AG':40}
for i in range(1,len(COLS)+1):
    L=get_column_letter(i); ws.column_dimensions[L].width=W.get(L,14)
ws.freeze_panes='C2'
t=Table(displayName='Providers',ref=f'A1:{get_column_letter(len(COLS))}{n}'); t.tableStyleInfo=TableStyleInfo(name='TableStyleLight9',showRowStripes=True); ws.add_table(t)
ws['Z1'].comment=Comment('Unique per company. The claim link lets the owner set a password and take over the listing. Keep this file private.','NDT-Connect')
ws['AB1'].comment=Comment('Yes = role-based business inbox (info@, sales@…) or an email a government agency published as the agency contact. Review = only a named staff address found on the company site; check before emailing.','NDT-Connect')
# Summary
s=wb.create_sheet('Summary'); s['A1']='US Inspection Provider Database — Summary'; s['A1'].font=Font(name='Arial',size=14,bold=True)
s['A2']=f'Built {today}. All counts are live formulas over the Providers table.'; s['A2'].font=Font(name='Arial',size=9,italic=True)
hdr=['Region','Total','Oil & Gas','Maritime','Civil infrastructure','With email','Outreach-eligible']
s.append([]); s.append(hdr)
for c in s[4]: c.font=H; c.fill=HF
regs=list(REG)+['Unknown']
for j,rg in enumerate(regs):
    r=5+j
    s.cell(r,1,rg)
    s.cell(r,2,f'=COUNTIFS(Providers!$E:$E,$A{r})')
    s.cell(r,3,f'=COUNTIFS(Providers!$E:$E,$A{r},Providers!$C:$C,"*Oil*")')
    s.cell(r,4,f'=COUNTIFS(Providers!$E:$E,$A{r},Providers!$C:$C,"*Maritime*")')
    s.cell(r,5,f'=COUNTIFS(Providers!$E:$E,$A{r},Providers!$C:$C,"*Civil*")')
    s.cell(r,6,f'=COUNTIFS(Providers!$E:$E,$A{r},Providers!$L:$L,"?*")')
    s.cell(r,7,f'=COUNTIFS(Providers!$E:$E,$A{r},Providers!$AB:$AB,"Yes")')
tr=5+len(regs); s.cell(tr,1,'TOTAL').font=Font(name='Arial',bold=True)
for col in range(2,8):
    L=get_column_letter(col); s.cell(tr,col,f'=SUM({L}5:{L}{tr-1})').font=Font(name='Arial',bold=True)
for row in s.iter_rows(min_row=5,max_row=tr-1):
    for c in row: c.font=F
s.column_dimensions['A'].width=20
for L in 'BCDEFG': s.column_dimensions[L].width=16
# Listing schema
sc=wb.create_sheet('Listing Schema')
sc.append(['Field','Required to publish?','Collected now?','Notes'])
for c in sc[1]: c.font=H; c.fill=HF
for f in [('Company Name','Yes','Yes','Legal or trading name as published'),('Sector(s)','Yes','Yes','Maritime / Oil & Gas / Civil infrastructure'),('Services / Methods','Yes','Partly','Keyword-matched from the company site; owner confirms on claim'),
 ('City, State, Region','Yes','Mostly','Used for city-hub placement'),('Phone','Yes','Mostly',''),('Business Email','For order routing','Partly','Orders route by email once claimed'),('Website','Recommended','Mostly',''),
 ('Accreditations (ABS, DNV, IAS AC291, A2LA, ISO 17025, ASNT…)','Recommended','Partly','Shown as "self-reported" until documents uploaded'),('Service Area / radius','Recommended','No','Owner adds on claim'),
 ('Description','Recommended','No','Owner adds on claim; we will not invent copy'),('Logo','Optional','No',''),('Insurance certificate (GL/PL)','Required to receive paid orders','No','Uploaded by owner'),
 ('Level III / technician certs','Required for "Verified" badge','No','Uploaded by owner'),('Claim token & URL','System','Yes','Unique per company'),('Unsubscribe / remove flag','System (CAN-SPAM)','Yes','Honor within 10 business days; we process immediately')]:
    sc.append(list(f))
for row in sc.iter_rows(min_row=2):
    for c in row: c.font=F
for L,w in zip('ABCD',(48,30,16,60)): sc.column_dimensions[L].width=w
# Email draft
e=wb.create_sheet('Email Draft (SES)')
txt=open('email_draft.txt').read().splitlines()
for line in txt: e.append([line])
for row in e.iter_rows():
    for c in row: c.font=F; c.alignment=Alignment(wrap_text=True)
e.column_dimensions['A'].width=110
# Sources
so=wb.create_sheet('Sources & Method')
so.append(['Item','Detail'])
for c in so[1]: c.font=H; c.fill=HF
for it in [('Government lists','City of Berkeley, San Mateo County, City of Menlo Park, City of Sacramento and City of San Diego recognized special inspection / testing agency lists (public PDFs)'),
 ('Company websites','Each company\'s own homepage plus contact / about / services / locations pages; robots.txt honored; 1 request per second per site; sites that block bots were skipped, not bypassed'),
 ('Discovery seeds','Public web sources named per row in the Source column (directories, trade-association pages, press)'),
 ('Not used','LinkedIn, NDT.net, paid/rented lists (Inspectioneering, Quality Magazine), personal social profiles'),
 ('Emails','Only business addresses published on the company site or a government list. "Role-based" preferred; named staff addresses marked Review'),
 ('Listing status','Nothing is published yet. Rows are draft unclaimed listings until approved'),
 ('Outreach','No emails sent. Waiting for Amazon SES credentials, domain authentication (SPF/DKIM/DMARC), the Atlantis street address, and your approval of the draft'),
 ('Scaling','Batch 1. To reach thousands of US providers, the compliant next step is the Google Places API (needs your API key) plus more state/city agency lists')]:
    so.append(list(it))
for row in so.iter_rows(min_row=2):
    for c in row: c.font=F; c.alignment=Alignment(wrap_text=True,vertical='top')
so.column_dimensions['A'].width=22; so.column_dimensions['B'].width=110
wb.move_sheet('Summary',offset=-1)
out='US-Inspection-Providers-Batch1.xlsx'; wb.save(out); print(out,n-1,'rows')
