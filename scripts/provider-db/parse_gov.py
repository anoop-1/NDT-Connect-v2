import pdfplumber, re, json
PH=re.compile(r'\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}')
EM=re.compile(r'[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}')
WEB=re.compile(r'(?:https?://)?(?:www\.)?[A-Za-z0-9-]+\.(?:com|net|org|us|biz)(?:/[^\s]*)?',re.I)
ADDR=re.compile(r'([A-Za-z .]+),?\s+(CA|NV|OR|AZ)\s+(\d{5})')
SRC={'berkeley':('City of Berkeley — Recognized Special Inspection Agencies','https://berkeleyca.gov/sites/default/files/documents/170B%20Special%20Inspection%20Recognized%20Agencies_6.pdf'),
 'smcgov':('San Mateo County — Recognized Special Inspection and Testing Agencies','https://www.smcgov.org/media/155209/download'),
 'menlo':('City of Menlo Park — Approved Special Inspection Agencies','https://www.menlopark.gov/files/sharedassets/public/v/1/community-development/documents/building/list-of-approved-speciel-inspection-agencies_06152026.pdf'),
 'sacramento':('City of Sacramento — Special Inspection Consulting Services list','https://www.cityofsacramento.gov/content/dam/portal/cdd/Building/Forms/CDD-0230_Special-Inspection-Consulting-Services.pdf')}
out=[]
for k,(sname,surl) in SRC.items():
    with pdfplumber.open(f'gov_{k}.bin') as pdf:
        for page in pdf.pages:
            for t in page.extract_tables():
                hdr=[(c or '').lower() for c in t[0]]
                ndt_idx=[i for i,h in enumerate(hdr) if 'ndt' in h or 'non-destructive' in h]
                sw_idx=[i for i,h in enumerate(hdr) if 'weld' in h or h.strip() in ('sw','ss')]
                for row in t[1:]:
                    cells=[(c or '').replace('\n',' ').strip() for c in row]
                    if not cells or not cells[0] or len(cells[0])<3 or cells[0].lower().startswith(('agency','company','name')): continue
                    blob=' | '.join(cells)
                    phones=PH.findall(blob); emails=EM.findall(blob)
                    webs=[w for w in WEB.findall(blob) if '@' not in w and not any(w.lower().endswith(x) for x in ['.gov'])]
                    webs=[w for w in webs if not EM.search(w)]
                    a=ADDR.search(blob)
                    ndt=any(cells[i].strip() not in ('','-') for i in ndt_idx if i<len(cells)) if ndt_idx else None
                    sw=any(cells[i].strip() not in ('','-') for i in sw_idx if i<len(cells)) if sw_idx else None
                    out.append({'company':re.sub(r'\s+',' ',cells[0]).strip(' *'),'address':cells[1] if len(cells)>1 else '',
                      'city':a.group(1).strip() if a else '','state':a.group(2) if a else 'CA','zip':a.group(3) if a else '',
                      'phone':phones[0] if phones else '','email':emails[0] if emails else '','website':webs[0] if webs else '',
                      'ndt_flag':ndt,'welding_flag':sw,'sector':'Civil infrastructure / special inspection','source':sname,'source_url':surl})
# dedupe by normalized name+phone
seen={};
for r in out:
    key=re.sub(r'[^a-z]','',r['company'].lower())[:20]
    if key in seen:
        s=seen[key]
        for f in ['email','website','phone','city','zip']:
            if not s[f] and r[f]: s[f]=r[f]
        if r['source'] not in s['source']: s['source']+='; '+r['source']
        s['ndt_flag']=s['ndt_flag'] or r['ndt_flag']
    else: seen[key]=r
rows=list(seen.values())
json.dump(rows,open('gov_rows.json','w'),indent=1)
print(len(out),'raw ->',len(rows),'unique; with email',sum(1 for r in rows if r['email']),'with web',sum(1 for r in rows if r['website']),'NDT flagged',sum(1 for r in rows if r['ndt_flag']))
for r in rows[:6]: print(r['company'],'|',r['city'],r['zip'],'|',r['phone'],'|',r['email'],'|',r['website'],'| NDT',r['ndt_flag'])
