import json, shutil
P = "src/i18n/locales/fr.json"
shutil.copy(P, P + ".bak")
snap = json.load(open("i18n-report/missing-ddn.json", encoding="utf-8"))
fr = json.load(open(P, encoding="utf-8"))
added = 0
for dotted, v in snap.items():
    ks, d = dotted.split("."), fr
    ok = True
    for k in ks[:-1]:
        d = d.setdefault(k, {})
        if not isinstance(d, dict):
            ok = False
            break
    if ok and ks[-1] not in d:
        d[ks[-1]] = v
        added += 1
json.dump(fr, open(P, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("clés restaurées :", added)
