"""Validate city hub JSON files: >=2000 rendered words, citations resolve, required fields, unique slugs.
Usage: python3 scripts/city-hubs/validate.py [slug ...]"""
import json, re, sys, glob, os
D = os.environ.get('CITY_DIR') or os.path.join(os.path.dirname(__file__), '..', '..', 'lib', 'content', 'city-hubs', 'data')
REQ = ['slug','city','region','country','countrySlug','wave','updated','title','metaTitle','description','quickAnswer','keyFacts','industries','sections','faqs','references','nearby','related']
def words(t): return len(re.findall(r"[A-Za-z0-9À-ÿ][\w'’\-./%]*", re.sub(r'\[\d+\]|\*\*', ' ', t)))
def texts(c):
    yield c['quickAnswer']
    for f in c['keyFacts']: yield f['value']
    for s in c['sections']:
        yield s['h2']; yield from s['paragraphs']; yield from s.get('bullets', [])
        if s.get('table'): yield from (x for r in s['table']['rows'] for x in r)
    for f in c['faqs']: yield f['q']; yield f['a']
files = sorted(glob.glob(D + '/*.json'))
want = set(sys.argv[1:])
ok = True; seen = set()
for p in files:
    c = json.load(open(p, encoding='utf-8'))
    if want and c['slug'] not in want: continue
    errs = [k for k in REQ if k not in c]
    if c['slug'] in seen: errs.append('dup slug')
    seen.add(c['slug'])
    if os.path.basename(p) != c['slug'] + '.json': errs.append('filename != slug')
    n = sum(words(t) for t in texts(c))
    if n < 2000: errs.append(f'only {n} words')
    refs = len(c['references'])
    cites = {int(x) for t in texts(c) for x in re.findall(r'\[(\d+)\]', t)}
    bad = sorted(x for x in cites if x < 1 or x > refs)
    if bad: errs.append(f'bad cites {bad}')
    unused = sorted(set(range(1, refs + 1)) - cites)
    if unused: errs.append(f'unused refs {unused}')
    if len(c['description']) > 160: errs.append(f"description {len(c['description'])} chars")
    if len(c['faqs']) < 5: errs.append('faqs<5')
    print(f"{'OK ' if not errs else 'ERR'} {c['slug']:<24} {n:>5} words  {refs} refs  {len(c['sections'])} sections  {'; '.join(errs)}")
    ok &= not errs
sys.exit(0 if ok else 1)
