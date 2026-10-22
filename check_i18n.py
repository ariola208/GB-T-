import json, re, glob, os

def paths(d, p=""):
    out = set()
    if isinstance(d, dict):
        for k, v in d.items():
            q = p + "." + k if p else k
            if v == "" or v == {} or v == []:
                continue
            out.add(q)
            out |= paths(v, q)
    return out

static, prefix = {}, {}
files = glob.glob("src/**/*.ts*", recursive=True)
for f in files:
    s = open(f, encoding="utf-8").read()
    for m in re.finditer(r'''\bt\(\s*(["'`])((?:(?!\1).)*)\1''', s):
        k = m.group(2)
        if "${" in k:
            p = k.split("${")[0].rstrip(".")
            if p:
                prefix[p] = f
        elif re.fullmatch(r"[A-Za-z0-9_]+(\.[A-Za-z0-9_]+)+", k):
            static[k] = f
    if f.endswith("Planner.tsx"):
        for m in re.finditer(r'\btr\(\s*"([a-z_]+)"', s):
            static["planner." + m.group(1)] = f

for lang in ["fr", "en", "pt", "yo", "fon", "ddn"]:
    fn = f"src/i18n/locales/{lang}.json"
    if not os.path.exists(fn):
        print(lang, "-> fichier absent"); continue
    try:
        have = paths(json.load(open(fn, encoding="utf-8")))
    except Exception as e:
        print(lang, "-> JSON INVALIDE:", e); continue
    ok = lambda k: any((k + x) in have for x in ["", "_one", "_other", "_many"])
    miss = sorted(k for k in static if not ok(k))
    missp = sorted(p for p in prefix if p not in have)
    print(f"\n=== {lang}: {len(miss)} clés manquantes, {len(missp)} groupes dynamiques manquants")
    if lang in ("fr", "en"):
        for k in miss: print("  ", k, " <-", os.path.basename(static[k]))
        for p in missp: print("   [groupe]", p, " <-", os.path.basename(prefix[p]))
