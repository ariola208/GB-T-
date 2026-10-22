import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Landmark, Languages, BookOpen, Search, Copy, Check,
  MessageCircle, Shield, ChevronDown, ChevronRight, Info,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import phrases from "@/i18n/locales/phrases.json";

const WHATSAPP_NUMBER = "2290154069454";

const AmeDuBenin = () => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-32">
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background py-20">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mx-auto max-w-4xl"
            >
              <Badge className="mb-6 bg-secondary/20 text-secondary-foreground">
                {t("soul.hero_badge", "Culture vivante")}
              </Badge>
              <h1 className="font-heading text-5xl font-bold md:text-7xl text-balance">
                {t("soul.hero_title", "L'âme du Bénin")}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
                {t("soul.hero_subtitle", "Histoire, langues et récits : découvrez le Bénin par ceux qui le font vivre.")}
              </p>
            </motion.div>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {[
                { href: "#patrimoine", label: t("soul.anchors.heritage", "Patrimoine"), icon: Landmark },
                { href: "#langues", label: t("soul.anchors.languages", "Langues"), icon: Languages },
                { href: "#recits", label: t("soul.anchors.stories", "Récits"), icon: BookOpen },
              ].map((a) => (
                <a
                  key={a.href}
                  href={a.href}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium transition hover:border-primary hover:bg-primary/5"
                >
                  <a.icon className="h-4 w-4" />
                  {a.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="patrimoine" className="border-t border-border py-20">
          <div className="container mx-auto px-6">
            <div className="mb-12 text-center">
              <p className="kicker mb-3">{t("soul.heritage.badge", "A · Patrimoine")}</p>
              <h2 className="font-heading text-4xl font-bold md:text-5xl">
                {t("soul.heritage.title", "Le patrimoine raconté")}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                {t("soul.heritage.intro", "Chaque site a une histoire qui se lit dans le temps.")}
              </p>
            </div>
            <HeritageTabs />
          </div>
        </section>

        <section id="langues" className="border-t border-border bg-muted/30 py-20">
          <div className="container mx-auto px-6">
            <div className="mb-12 text-center">
              <p className="kicker mb-3">{t("soul.languages.badge", "B · Langues")}</p>
              <h2 className="font-heading text-4xl font-bold md:text-5xl">
                {t("soul.languages.title", "Explorateur des langues béninoises")}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                {t("soul.languages.intro", "Un mini-dictionnaire pour voyager.")}
              </p>
            </div>
            <PhrasebookSection />
          </div>
        </section>

        <section id="recits" className="border-t border-border py-20">
          <div className="container mx-auto px-6">
            <div className="mb-12 text-center">
              <p className="kicker mb-3">{t("soul.stories.badge", "C · Récits")}</p>
              <h2 className="font-heading text-4xl font-bold md:text-5xl">
                {t("soul.stories.title", "Récits culturels")}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                {t("soul.stories.intro", "Des royaumes aux savoir-faire.")}
              </p>
            </div>
            <StoriesSection />

            <div className="mx-auto mt-16 max-w-3xl rounded-3xl border border-border bg-card p-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/20">
                  <Shield className="h-5 w-5 text-secondary-foreground" />
                </div>
                <h3 className="font-heading text-2xl font-bold">
                  {t("soul.stories.respect_title", "Visiter avec respect")}
                </h3>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3"><span className="mt-1 text-secondary">◆</span><span>{t("soul.stories.respect.0")}</span></li>
                <li className="flex gap-3"><span className="mt-1 text-secondary">◆</span><span>{t("soul.stories.respect.1")}</span></li>
                <li className="flex gap-3"><span className="mt-1 text-secondary">◆</span><span>{t("soul.stories.respect.2")}</span></li>
                <li className="flex gap-3"><span className="mt-1 text-secondary">◆</span><span>{t("soul.stories.respect.3")}</span></li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-20">
          <div className="container mx-auto px-6 text-center">
            <div className="mx-auto max-w-3xl">
              <h2 className="font-heading text-4xl font-bold md:text-5xl">
                {t("soul.contribute.title", "Vous portez cette mémoire ?")}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                {t("soul.contribute.text", "Contactez-nous pour valider, corriger ou enrichir ces contenus.")}
              </p>
              <div className="mt-8 flex justify-center">
                <Button size="lg" className="gap-2 bg-[#25D366] text-white hover:bg-[#1eb858]" asChild>
                  <a
                    href={"https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(t("soul.contribute.message"))}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-5 w-5" />
                    {t("soul.contribute.button", "Nous écrire sur WhatsApp")}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const HeritageTabs = () => {
  const { t } = useTranslation();
  const sites = ["abomey", "ouidah", "portonovo"] as const;

  return (
    <Tabs defaultValue="abomey" className="mx-auto max-w-5xl">
      <TabsList className="grid w-full grid-cols-3">
        {sites.map((s) => (
          <TabsTrigger key={s} value={s} className="font-medium">
            {t("soul.heritage.tabs." + s, s)}
          </TabsTrigger>
        ))}
      </TabsList>
      {sites.map((site) => (
        <TabsContent key={site} value={site} className="mt-8">
          <SiteTimeline site={site} />
        </TabsContent>
      ))}
    </Tabs>
  );
};

const SiteTimeline = ({ site }: { site: "abomey" | "ouidah" | "portonovo" }) => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const eventsRaw = t("soul.heritage.sites." + site + ".events", { returnObjects: true });
  const events = Array.isArray(eventsRaw) ? (eventsRaw as { year: string; title: string; text: string }[]) : [];

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <div className="sticky top-32 rounded-3xl border border-border bg-card p-6">
          <h3 className="mb-3 font-heading text-2xl font-bold">
            {t("soul.heritage.tabs." + site, site)}
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            {t("soul.heritage.sites." + site + ".intro", "")}
          </p>
          <div className="mt-4 rounded-2xl bg-muted/50 p-3 text-xs text-muted-foreground">
            <p className="mb-1 font-semibold uppercase tracking-wider">
              {t("soul.heritage.sources", "Sources")}
            </p>
            {t("soul.heritage.sites." + site + ".source", "")}
          </div>
        </div>
      </div>
      <div className="lg:col-span-2">
        <div className="relative border-l-2 border-primary/20 pl-6">
          {events.length === 0 ? (
            <p className="text-muted-foreground">{t("soul.heritage.timeline_empty")}</p>
          ) : (
            events.map((event, i) => {
              const isOpen = openIndex === i;
              return (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="relative mb-6 last:mb-0">
                  <span className="absolute -left-[34px] top-3 flex h-5 w-5 items-center justify-center">
                    <span className="h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
                  </span>
                  <button onClick={() => setOpenIndex(isOpen ? null : i)} className="w-full rounded-2xl border border-border bg-card p-5 text-left transition hover:border-primary/40 hover:shadow-md">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <Badge variant="outline" className="mb-2 font-mono text-xs">{event.year}</Badge>
                        <h4 className="font-heading text-lg font-bold">{event.title}</h4>
                        {isOpen && (
                          <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {event.text}
                          </motion.p>
                        )}
                      </div>
                      <ChevronDown className={"h-5 w-5 shrink-0 text-muted-foreground transition-transform " + (isOpen ? "rotate-180" : "")} />
                    </div>
                  </button>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

type Phrase = { fr: string; native: string; pron?: string; status?: string };

const PhrasebookSection = () => {
  const { t } = useTranslation();
  const [selectedLang, setSelectedLang] = useState<"fon" | "yo">("fon");
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const langData = phrases[selectedLang] as Record<string, Phrase[]>;
  const categories = Object.keys(langData);

  const allPhrases: Phrase[] = useMemo(
    () => categories.flatMap((cat) => langData[cat] || []),
    [langData, categories]
  );

  const filtered = useMemo(() => {
    let list = selectedCat === "all" ? allPhrases : langData[selectedCat] || [];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) => p.fr.toLowerCase().includes(q) || p.native.toLowerCase().includes(q)
      );
    }
    return list;
  }, [allPhrases, langData, selectedCat, search]);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(key);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const langLabels: Record<string, string> = {
    fon: t("soul.languages.names.fon", "Fon"),
    yo: t("soul.languages.names.yoruba", "Yoruba"),
  };

  const catLabels: Record<string, string> = {
    greetings: t("soul.languages.categories.greetings", "Salutations"),
    politeness: t("soul.languages.categories.politeness", "Politesse"),
    market: t("soul.languages.categories.market", "Marché"),
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex gap-2">
          {(Object.keys(langLabels) as Array<"fon" | "yo">).map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLang(lang)}
              className={"rounded-full px-5 py-2 text-sm font-medium transition " + (selectedLang === lang ? "bg-primary text-primary-foreground" : "border border-border bg-background hover:bg-muted")}
            >
              {langLabels[lang]}
            </button>
          ))}
        </div>
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder={t("soul.languages.search", "Rechercher...")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-border bg-background py-2.5 pl-11 pr-4 text-sm focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <button onClick={() => setSelectedCat("all")} className={"rounded-full px-4 py-1.5 text-xs font-medium transition " + (selectedCat === "all" ? "bg-foreground text-background" : "border border-border hover:bg-muted")}>
          {t("soul.languages.all", "Toutes")}
        </button>
        {categories.map((cat) => (
          <button key={cat} onClick={() => setSelectedCat(cat)} className={"rounded-full px-4 py-1.5 text-xs font-medium transition " + (selectedCat === cat ? "bg-foreground text-background" : "border border-border hover:bg-muted")}>
            {catLabels[cat] || cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-border bg-card p-12 text-center">
          <Languages className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
          <p className="text-muted-foreground">{t("soul.languages.none", "Aucune expression.")}</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((phrase, i) => {
            const key = selectedLang + "-" + i + "-" + phrase.fr;
            return (
              <motion.div key={key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="group rounded-2xl border border-border bg-card p-5 transition hover:border-primary/40 hover:shadow-md">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">{phrase.fr}</p>
                    <p className="mt-1 font-heading text-xl font-bold">{phrase.native}</p>
                    {phrase.pron && <p className="mt-1 text-xs italic text-muted-foreground">[{phrase.pron}]</p>}
                  </div>
                  <button onClick={() => handleCopy(phrase.native, key)} aria-label="Copier" className="rounded-full p-2 text-muted-foreground opacity-0 transition group-hover:opacity-100 hover:bg-muted">
                    {copiedIndex === key ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
                <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
                  {phrase.status === "validated" ? t("soul.languages.validated", "Validé") : t("soul.languages.draft", "Brouillon")}
                </Badge>
              </motion.div>
            );
          })}
        </div>
      )}

      <div className="mt-8 flex items-start gap-3 rounded-2xl border border-border bg-muted/50 p-4 text-sm text-muted-foreground">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <p>{t("soul.languages.empty_text", "Ces expressions seront complétées avec des locuteurs natifs.")}</p>
      </div>
    </div>
  );
};

const StoriesSection = () => {
  const { t } = useTranslation();
  const [openCard, setOpenCard] = useState<number | null>(null);

  const cardsRaw = t("soul.stories.cards", { returnObjects: true });
  const cards = Array.isArray(cardsRaw)
    ? (cardsRaw as Array<{ title: string; summary: string; chapters: Array<{ title: string; text: string }> }>)
    : [];

  return (
    <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
      {cards.length === 0 ? (
        <p className="col-span-full text-center text-muted-foreground">{t("soul.stories.empty")}</p>
      ) : (
        cards.map((card, i) => {
          const isOpen = openCard === i;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="rounded-3xl border border-border bg-card p-6 transition hover:border-primary/40 hover:shadow-lg">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-heading text-2xl font-bold">{card.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{card.summary}</p>
                </div>
                <Badge variant="outline" className="shrink-0 text-[10px]">
                  {(card.chapters?.length || 0) + " " + t("soul.stories.chapters_short")}
                </Badge>
              </div>
              <button onClick={() => setOpenCard(isOpen ? null : i)} className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                {isOpen ? t("soul.stories.hide_chapters") : t("soul.stories.read_chapters")}
                <ChevronRight className={"h-4 w-4 transition-transform " + (isOpen ? "rotate-90" : "")} />
              </button>
              {isOpen && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4 space-y-4 border-t border-border pt-4">
                  {card.chapters?.map((chap, j) => (
                    <div key={j}>
                      <h4 className="mb-1 font-semibold">{chap.title}</h4>
                      <p className="text-sm leading-relaxed text-muted-foreground">{chap.text}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          );
        })
      )}
    </div>
  );
};

export default AmeDuBenin;
