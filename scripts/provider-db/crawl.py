import csv, json, re, sys, time, urllib.robotparser as rp
from urllib.parse import urljoin, urlparse
from concurrent.futures import ThreadPoolExecutor
import requests
UA="Mozilla/5.0 (compatible; NDT-Connect-Directory/1.0; +https://ndt-connect.com/claim)"
S=requests.Session(); S.headers['User-Agent']=UA
EM=re.compile(r'[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.(?:com|net|org|us|biz|co|io)\b',re.I)
PH=re.compile(r'(?:\+1[\s.-]?)?\(?([2-9]\d{2})\)?[\s.-]([2-9]\d{2})[\s.-](\d{4})\b')
ROLE=('info','sales','contact','office','admin','inquiries','inquiry','quotes','quote','service','services','ndt','inspection','hello','marketing','dispatch','bd','business','customerservice','support','lab','testing','operations','ops','hr','careers','jobs')
SVC={'UT':r'ultrasonic','PAUT':r'phased array','TOFD':r'TOFD|time of flight','RT':r'radiograph|x-ray','DR/CR':r'digital radiograph|computed radiograph','MT':r'magnetic particle','PT':r'penetrant','VT':r'visual inspection|visual testing','ET':r'eddy current','UTG/UTM':r'thickness (?:gaug|measur)','Guided Wave':r'guided wave','AE':r'acoustic emission','PMI':r'positive material|\bPMI\b','Hardness':r'hardness','ACFM':r'ACFM','IRIS/RFT':r'\bIRIS\b|remote field','Rope Access':r'rope access','Drone/UAV':r'drone|UAV','ROV/Subsea':r'\bROVs?\b|\bsubsea\b|\bdivers?\b|\bdiving\b','API 510':r'API[ -]?510','API 570':r'API[ -]?570','API 653':r'API[ -]?653','API 1169':r'API[ -]?1169','CWI/Welding':r'CWI|welding inspect','Coating/NACE':r'coating inspect|NACE|AMPP','Special Inspection (IBC)':r'special inspect','Concrete testing':r'concrete (?:test|inspect)','Bridge inspection':r'bridge inspect','Hull/Class survey':r'\bhull (?:survey|inspection|gauging|thickness)|class survey|special (?:periodical )?survey','Tank inspection':r'tank inspect','Pipeline inspection':r'pipeline','Level III':r'level iii|level 3'}
CERT={'ABS':r'\bABS\b','DNV':r'\bDNV\b','Lloyd\'s Register':r'Lloyd.?s Register','BV':r'Bureau Veritas','ISO 9001':r'ISO 9001','ISO/IEC 17025':r'17025','IAS AC291':r'AC ?291|IAS','A2LA':r'A2LA','ASNT':r'ASNT','SNT-TC-1A':r'SNT-TC-1A','NADCAP':r'Nadcap','ASME':r'\bASME\b','API':r'\bAPI\b','AASHTO':r'AASHTO','NYC DOB':r'NYC DOB|DOB Class'}
STATES='AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY DC'.split()
ADR=re.compile(r'(\d{2,6}\s+[A-Za-z0-9 .\'-]{3,40}?(?:St|Street|Ave|Avenue|Rd|Road|Blvd|Boulevard|Dr|Drive|Ln|Lane|Hwy|Highway|Pkwy|Parkway|Way|Ct|Court|Pl|Place|Fwy|Freeway)\.?(?:,?\s+(?:Suite|Ste\.?|#|Unit|Bldg)\s*[\w-]+)?),?\s+([A-Za-z .]{2,30}),\s*('+'|'.join(STATES)+r')\s+(\d{5})')
_RC={}
def robots_ok(base,url):
    if base not in _RC:
        r=rp.RobotFileParser()
        try:
            x=S.get(urljoin(base,'/robots.txt'),timeout=10)
            r.parse(x.text.splitlines() if x.status_code==200 and 'html' not in x.headers.get('content-type','') else [])
        except Exception: r.parse([])
        _RC[base]=r
    return _RC[base].can_fetch(UA,url)
def get(u):
    try:
        r=S.get(u,timeout=15,allow_redirects=True)
        if r.status_code==200 and 'html' in r.headers.get('content-type',''): return r.url,r.text
    except Exception: pass
    return None,None
def text(h):
    h=re.sub(r'(?is)<(script|style|noscript)[^>]*>.*?</\1>',' ',h); return re.sub(r'\s+',' ',re.sub(r'<[^>]+>',' ',h))
def crawl(row):
    site=row['website'].strip()
    if not site.startswith('http'): site='https://'+site
    out=dict(row); out.update(crawl_status='unreachable',emails='',email_type='',phones='',address='',services='',certs='',pages='')
    final,h=get(site)
    if not h: return out
    base='{0.scheme}://{0.netloc}'.format(urlparse(final)); dom=urlparse(final).netloc.lower().replace('www.','')
    if not robots_ok(base,final): out['crawl_status']='robots-disallowed'; return out
    pages=[(final,h)]
    links=set(re.findall(r'href=["\']([^"\'#]+)',h,re.I))
    cand=[urljoin(base,l) for l in links if re.search(r'contact|locations?|about|services|capabilit|accreditation|certification',l,re.I)]
    cand=[c for c in cand if urlparse(c).netloc.lower().replace('www.','')==dom][:6]
    for c in cand:
        if robots_ok(base,c):
            time.sleep(1); u,hh=get(c)
            if hh: pages.append((u,hh))
    blob_h=' '.join(p[1] for p in pages); blob=text(blob_h)
    ems=set(e.lower() for e in EM.findall(blob_h) if not re.search(r'\.(png|jpg|gif|svg|webp)$|sentry|wixpress|example|domain\.com|@2x',e,re.I))
    own=[e for e in ems if e.split('@')[1].replace('www.','').endswith(dom.split('.',1)[-1] if dom.count('.')>1 else dom) or dom.split('.')[0] in e.split('@')[1]]
    role=[e for e in own if e.split('@')[0].split('.')[0] in ROLE or any(e.startswith(r) for r in ROLE)]
    named=[e for e in own if e not in role]
    out['emails']='; '.join(sorted(role)[:5] or sorted(named)[:3])
    out['email_type']='role-based' if role else ('named staff (published)' if named else '')
    ph=[]
    for m in PH.finditer(blob):
        p='(%s) %s-%s'%m.groups()
        if p not in ph: ph.append(p)
    out['phones']='; '.join(ph[:3])
    a=ADR.search(blob)
    if a: out['address']=f"{a.group(1).strip()}, {a.group(2).strip()}, {a.group(3)} {a.group(4)}"; out.setdefault('addr_state',a.group(3))
    out['services']='; '.join(k for k,v in SVC.items() if re.search(v,blob,re.I))
    out['certs']='; '.join(k for k,v in CERT.items() if re.search(v,blob))
    out['pages']=len(pages); out['crawl_status']='ok'; out['website']=final
    return out
if __name__=='__main__':
    rows=json.load(open(sys.argv[1])); 
    with ThreadPoolExecutor(10) as ex: res=list(ex.map(crawl,rows))
    json.dump(res,open(sys.argv[2],'w'),indent=1)
    ok=[r for r in res if r['crawl_status']=='ok']
    print(len(res),'crawled; ok',len(ok),'; with email',sum(1 for r in ok if r['emails']),'; role-based',sum(1 for r in ok if r['email_type']=='role-based'))
