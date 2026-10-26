import csv, json, os, re, sys

SRC = sys.argv[1] if len(sys.argv) > 1 else "i18n-report/pour-traducteurs.csv"
PAGES = "src/i18n/locales/pages"
COLS = {"yoruba": "yo", "fon": "fon", "dendi": "ddn"}
PH = re.compile(r"\{\{\w+\}\}")
HOLE = object()

def setp(root, parts, val):
    cur = root
    for i, p in enumerate(parts):
        last = i == len(parts) - 1
        key = int(p) if p.isdigit() else p
        nxt = None if last else (list if parts[i + 1].isdigit() else dict)
        if isinstance(cur, list):
            while len(cur) <= key:
                cur.append(HOLE)
            if last:
                cur[key] = val
            else:
                if cur[key] is HOLE:
                    cur[key] = nxt()
                cur = cur[key]
        else:
            if last:
                cur[key] = val
            else:
                cur = cur.setdefault(key, nxt())

def clean(o):
    if isinstance(o, list):
        if any(x is HOLE for x in o):
            return HOLE
        res = [clean(x) for x in o]
        return HOLE if any(x is HOLE for x in res) else res
    if isinstance(o, dict):
        res = {k: clean(v) for k, v in o.items()}
        return {k: v for k, v in res.items() if v is not HOLE}
    return o

data = {l: {} for l in COLS.values()}
count = {l: 0 for l in COLS.values()}
for row in csv.DictReader(open(SRC, newline="", encoding="utf-8-sig")):
    for col, lang in COLS.items():
        val = (row.get(col) or "").strip()
        if not val:
            continue
        if sorted(PH.findall(row["francais"])) != sorted(PH.findall(val)):
            print("ATTENTION variables {{...}} differentes :", row["cle"], "->", lang)
        setp(data[lang], row["cle"].split("."), val)
        count[lang] += 1

for lang, d in data.items():
    if not d:
        continue
    d = clean(d)
    os.makedirs(f"{PAGES}/{lang}", exist_ok=True)
    path = f"{PAGES}/{lang}/ui_import.json"
    json.dump(d, open(path, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(lang, count[lang], "textes ->", path)
