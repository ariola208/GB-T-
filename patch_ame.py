f = "src/pages/AmeDuBenin.tsx"
s = open(f, encoding="utf-8").read()
R = [
 ("<span>Demandez l'autorisation avant de photographier une cérémonie.</span>", '<span>{t("soul.stories.respect.0")}</span>'),
 ("<span>Certains lieux et rites sont réservés aux initiés.</span>", '<span>{t("soul.stories.respect.1")}</span>'),
 ("<span>Faites-vous accompagner par un guide local de confiance.</span>", '<span>{t("soul.stories.respect.2")}</span>'),
 ("<span>Une cérémonie n'est pas un spectacle.</span>", '<span>{t("soul.stories.respect.3")}</span>'),
 ("Chronologie à compléter.", '{t("soul.heritage.timeline_empty")}'),
 ("Récits à venir.", '{t("soul.stories.empty")}'),
 ('{isOpen ? "Masquer les chapitres" : "Lire les chapitres"}', '{isOpen ? t("soul.stories.hide_chapters") : t("soul.stories.read_chapters")}'),
 ('+ " ch."', '+ " " + t("soul.stories.chapters_short")'),
 ('encodeURIComponent("Bonjour, je souhaite contribuer à L\'âme du Bénin.")', 'encodeURIComponent(t("soul.contribute.message"))'),
]
for a, b in R:
    if a in s:
        s = s.replace(a, b); print("OK    ", a[:50])
    else:
        print("ABSENT", a[:50])
open(f, "w", encoding="utf-8").write(s)
