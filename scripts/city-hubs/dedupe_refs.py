"""Merge duplicate reference URLs in a city JSON and renumber [n] citations. Usage: dedupe_refs.py file.json ..."""
import json, re, sys
def fix(path):
    c = json.load(open(path, encoding='utf-8'))
    refs = c['references']; keep = []; mapping = {}
    for i, r in enumerate(refs, 1):
        url = r['url'].rstrip('/').lower()
        j = next((k for k, x in enumerate(keep, 1) if x['url'].rstrip('/').lower() == url), None)
        if j is None: keep.append(r); mapping[i] = len(keep)
        else: mapping[i] = j
    sub = lambda t: re.sub(r'\[(\d+)\]', lambda m: f'[{mapping.get(int(m.group(1)), int(m.group(1)))}]', t)
    def walk(o):
        if isinstance(o, str): return sub(o)
        if isinstance(o, list): return [walk(x) for x in o]
        if isinstance(o, dict): return {k: (v if k in ('references', 'url', 'href', 'slug') else walk(v)) for k, v in o.items()}
        return o
    c = walk(c); c['references'] = keep
    # collapse repeated adjacent cites like [4][4]
    def collapse(o):
        if isinstance(o, str): return re.sub(r'(\[\d+\])\1+', r'\1', o)
        if isinstance(o, list): return [collapse(x) for x in o]
        if isinstance(o, dict): return {k: collapse(v) if k != 'references' else v for k, v in o.items()}
        return o
    c = collapse(c)
    json.dump(c, open(path, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(path, len(refs), '->', len(keep), 'refs')
for p in sys.argv[1:]: fix(p)
