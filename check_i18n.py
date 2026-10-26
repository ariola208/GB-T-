import json, re, glob, sys
L = "src/i18n/locales"
def merge(a, b):
    for k, v in b.items():
        a[k] = merge(a[k], v) if isinstance(v, dict) and isinstance(a.get(k), dict) else v
    return a
def load(lang):
    try: d = json.load(open(f"{L}/{lang}.json", encoding="utf-8"))
    except FileNotFoundError: d = {}
    for f in sorted(glob.glob(f"{L}/pages/{lang}/*.json")):
        merge(d, json.load(open(f, encoding="utf-8")))
    return d
def has(d, key):
    cur = d
    for part in key.split("."):
        if not isinstance(cur, dict): return False
        hit = next((p for p in (part, part + "_one", part + "_other") if p in cur), None)
        if hit is None: return False
        cur = cur[hit]
    return cur not in ("", {}, [])
static, prefix = {}, set()
for f in glob.glob("src/**/*.ts*", recursive=True):
    s = open(f, encoding="utf-8").read()
    for m in re.finditer(r'''\bt\(\s*(["'`])((?:(?!\1).)*)\1''', s):
        k = m.group(2)
        if "${" in k: prefix.add(k.split("${")[0].rstrip("."))
        elif re.fullmatch(r"[A-Za-z0-9_]+(\.[A-Za-z0-9_]+)+", k): static[k] = f
    if f.endswith("Planner.tsx"):
        for m in re.finditer(r'\btr\(\s*"([a-z_]+)"', s): static["planner." + m.group(1)] = f
bad = False
for lang in ["fr", "en", "pt", "yo", "fon", "ddn"]:
    d = load(lang)
    miss = sorted(k for k in static if not has(d, k))
    print(f"\n=== {lang} : {len(miss)} manquantes / {len(static)}")
    if lang in ("fr", "en", "pt"):
        for k in miss: print("  ", k, "<-", static[k].split("/")[-1])
    if lang == "fr" and miss: bad = True
sys.exit(1 if bad else 0)
