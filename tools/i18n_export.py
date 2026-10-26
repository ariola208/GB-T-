import csv, glob, json, sys

BASE = "src/i18n/locales"
SKIP = {"ame", "soul", "culture", "blog", "faq", "about"}
TOUT = "--tout" in sys.argv

def merge(a, b):
    for k, v in b.items():
        if isinstance(v, dict) and isinstance(a.get(k), dict):
            merge(a[k], v)
        else:
            a[k] = v

def load(lang):
    d = {}
    try:
        merge(d, json.load(open(f"{BASE}/{lang}.json", encoding="utf-8")))
    except FileNotFoundError:
        pass
    for f in sorted(glob.glob(f"{BASE}/pages/{lang}/*.json")):
        merge(d, json.load(open(f, encoding="utf-8")))
    return d

def leaves(o, p=""):
    out = {}
    if isinstance(o, dict):
        for k, v in o.items():
            out.update(leaves(v, f"{p}.{k}" if p else k))
    elif isinstance(o, list):
        for i, v in enumerate(o):
            out.update(leaves(v, f"{p}.{i}"))
    elif isinstance(o, str):
        out[p] = o
    return out

fr = leaves(load("fr"))
en = leaves(load("en"))
autres = {l: leaves(load(l)) for l in ("yo", "fon", "ddn")}

rows = []
for k, v in fr.items():
    sec = k.split(".")[0]
    if not TOUT and (sec in SKIP or len(v) > 80):
        continue
    rows.append([k, v, en.get(k, ""), autres["yo"].get(k, ""), autres["fon"].get(k, ""), autres["ddn"].get(k, "")])

out = "i18n-report/pour-traducteurs.csv"
with open(out, "w", newline="", encoding="utf-8-sig") as f:
    w = csv.writer(f)
    w.writerow(["cle", "francais", "anglais", "yoruba", "fon", "dendi"])
    w.writerows(rows)
print(len(rows), "lignes ->", out)
