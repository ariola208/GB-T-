import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Calendar, Camera, Check, ChevronLeft, ChevronRight, Clock, Copy, Crown, Flame, Hammer,
  Info, Languages, Map as MapIcon, MessageCircle, Mic, Palette, Quote, Search, Shield,
  ShieldAlert, Volume2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CATEGORIES, LANGS, PHRASES, type LangCode } from "@/data/phrases";
import { waLink } from "@/lib/whatsapp";

// Photos locales uniquement (src/pages/placeholder). Aucune photo distante : si un fichier manque, un fond sobre s'affiche.
const localImgs = import.meta.glob("./placeholder/*.{jpeg,jpg,png}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;
const nfc = (s: string) => s.normalize("NFC");
const localImg = (...names: string[]) => {
  for (const n of names) {
    const k = Object.keys(localImgs).find((x) => nfc(x) === nfc(`./placeholder/${n}`));
    if (k) return localImgs[k];
  }
  return undefined;
};

const HERO = localImg("abomey.jpeg", "ouidah.jpeg", "vodoun_1.jpeg", "G_1.jpeg");
const SITE_IMG: Record<string, string | undefined> = {
  abomey: localImg("abomey.jpeg"),
  ouidah: localImg("ouidah.jpeg"),
  portonovo: localImg("portonovo.jpeg"),
};

const arr = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);

const SECTIONS = ["heritage", "languages", "stories"];
const SITES = ["abomey", "ouidah", "portonovo"];
const MEDIA_ICONS = [Camera, Quote, MapIcon, Mic];
const STORY_ICONS = [Crown, Shield, Palette, Calendar, Hammer, Flame];
const REVIEW_STORY = 5; // le vodoun : texte provisoire
const RESPECT_STORIES = [3, 5]; // fêtes et vodoun : encadré « visiter avec respect »

type Ev = { year: string; title: string; text: string };
type Chapter = { title: string; text: string };
type Story = { title: string; summary: string; chapters: Chapter[] };
type MediaItem = { title: string; text: string };

const Soul = () => {
  const { t, i18n } = useTranslation();
  const ui = (i18n.resolvedLanguage || i18n.language || "fr").split("-")[0];

  const [active, setActive] = useState("heritage");
  const [site, setSite] = useState(SITES[0]);
  const [evIdx, setEvIdx] = useState(0);
  const [lang, setLang] = useState<LangCode>(LANGS[0]);
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const [onlyAvail, setOnlyAvail] = useState(false);
  const [story, setStory] = useState(0);
  const [chapter, setChapter] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  // Section en cours (navigation latérale)
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -50% 0px" }
    );
    SECTIONS.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  // A. Patrimoine
  const events = arr<Ev>(t(`ame.heritage.sites.${site}.events`, { returnObjects: true }));
  const idx = Math.min(evIdx, Math.max(events.length - 1, 0));
  const ev = events[idx];
  const media = arr<MediaItem>(t("ame.heritage.media.items", { returnObjects: true }));

  // B. Langues
  const gloss = (p: (typeof PHRASES)[0]) => ((p as any)[ui] as string) ?? p.fr;
  const query = q.trim().toLowerCase();
  const langHas = PHRASES.some((p) => p.forms[lang]);
  const phrases = PHRASES.filter(
    (p) =>
      (cat === "all" || p.cat === cat) &&
      (!onlyAvail || p.forms[lang]) &&
      (!query || gloss(p).toLowerCase().includes(query) || (p.forms[lang]?.text || "").toLowerCase().includes(query))
  );

  const copy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 1500);
    } catch { /* ignore */ }
  };

  // C. Récits
  const stories = arr<Story>(t("ame.stories.cards", { returnObjects: true }));
  const cur = stories[story];
  const chIdx = cur ? Math.min(chapter, cur.chapters.length - 1) : 0;
  const respect = arr<string>(t("ame.stories.respect", { returnObjects: true }));
  const Prev = <ChevronLeft className="mr-1 h-4 w-4" />;
  const Next = <ChevronRight className="ml-1 h-4 w-4" />;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      {/* Navigation latérale : section en cours */}
      <nav aria-label="Sections" className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-4 xl:flex">
        {SECTIONS.map((id) => (
          <button key={id} onClick={() => go(id)} className="group flex items-center gap-3" aria-current={active === id}>
            <span className="rounded-full bg-foreground px-3 py-1 text-xs text-background opacity-0 transition group-hover:opacity-100">
              {t(`ame.anchors.${id}`)}
            </span>
            <span className={`block h-3 w-3 rounded-full border-2 border-foreground transition ${active === id ? "scale-125 bg-foreground" : "bg-transparent"}`} />
          </button>
        ))}
      </nav>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative flex min-h-[75vh] items-center justify-center overflow-hidden bg-neutral-900">
          {HERO && <img src={HERO} alt="" className="absolute inset-0 h-full w-full object-cover" />}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-background" />
          <div className="relative z-10 mx-auto max-w-4xl px-6 pt-24 text-center text-white">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-6 border-white/30 bg-white/20 text-white backdrop-blur-sm">{t("ame.hero_badge")}</Badge>
              <h1 className="mb-6 font-heading text-5xl font-bold md:text-7xl">{t("ame.hero_title")}</h1>
              <p className="mx-auto mb-6 max-w-2xl text-xl text-white/90">{t("ame.hero_subtitle")}</p>
              <p className="mx-auto mb-8 flex max-w-2xl items-start gap-2 rounded-xl border border-white/20 bg-white/10 p-3 text-left text-sm text-white/85 backdrop-blur-sm">
                <Info className="mt-0.5 h-4 w-4 shrink-0" />
                {t("ame.hero_note")}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {SECTIONS.map((id) => (
                  <Button key={id} variant="outline" className="border-white/60 text-white hover:bg-white hover:text-black" onClick={() => go(id)}>
                    {t(`ame.anchors.${id}`)}
                  </Button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* A. Patrimoine raconté */}
        <section id="heritage" className="scroll-mt-24 py-20">
          <div className="container mx-auto px-6">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <Badge className="mb-4">{t("ame.heritage.badge")}</Badge>
              <h2 className="mb-4 font-heading text-4xl font-bold">{t("ame.heritage.title")}</h2>
              <p className="text-muted-foreground">{t("ame.heritage.intro")}</p>
            </div>

            <div className="mb-8 flex flex-wrap justify-center gap-2">
              {SITES.map((s) => (
                <Button key={s} variant={site === s ? "default" : "outline"} onClick={() => { setSite(s); setEvIdx(0); }}>
                  {t(`ame.heritage.tabs.${s}`)}
                </Button>
              ))}
            </div>

            <div className="mx-auto mb-10 max-w-3xl">
              {SITE_IMG[site] && (
                <img src={SITE_IMG[site]} alt={t(`ame.heritage.tabs.${site}`)} className="mb-6 h-56 w-full rounded-2xl object-cover" />
              )}
              <p className="text-center leading-relaxed text-muted-foreground">{t(`ame.heritage.sites.${site}.intro`)}</p>
            </div>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-5">
              <div className="md:col-span-2">
                <h3 className="mb-4 flex items-center gap-2 font-heading text-xl font-bold"><Clock className="h-5 w-5" />{t("ame.heritage.timeline")}</h3>
                <ol className="relative space-y-2 border-l-2 border-border pl-6">
                  {events.map((e, i) => (
                    <li key={i} className="relative">
                      <span className={`absolute -left-[1.95rem] top-3 h-3 w-3 rounded-full border-2 border-background transition-colors ${i === idx ? "bg-foreground" : "bg-muted-foreground/40"}`} />
                      <button
                        onClick={() => setEvIdx(i)}
                        aria-current={i === idx}
                        className={`w-full rounded-lg px-3 py-2 text-left transition ${i === idx ? "bg-muted font-semibold" : "hover:bg-muted/60"}`}
                      >
                        <span className="block text-xs text-muted-foreground">{e.year}</span>
                        <span className="block text-sm">{e.title}</span>
                      </button>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="md:col-span-3">
                <AnimatePresence mode="wait">
                  {ev && (
                    <motion.div key={site + idx} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                      <Card flat>
                        <CardContent className="p-8">
                          <p className="mb-2 font-heading text-4xl font-bold">{ev.year}</p>
                          <h4 className="mb-4 text-2xl font-bold">{ev.title}</h4>
                          <p className="leading-relaxed text-muted-foreground">{ev.text}</p>
                          <p className="mt-6 border-t pt-4 text-xs text-muted-foreground">
                            <span className="font-semibold">{t("ame.heritage.sources")} : </span>
                            {t(`ame.heritage.sites.${site}.source`)}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="mt-4 flex items-center justify-between">
                  <Button variant="outline" size="sm" disabled={idx === 0} onClick={() => setEvIdx(idx - 1)}>{Prev}{t("ame.ui.prev")}</Button>
                  <span className="text-xs text-muted-foreground">{t("ame.ui.step", { n: idx + 1, total: events.length })}</span>
                  <Button variant="outline" size="sm" disabled={idx >= events.length - 1} onClick={() => setEvIdx(idx + 1)}>{t("ame.ui.next")}{Next}</Button>
                </div>
              </div>
            </div>

            <div className="mx-auto mt-16 max-w-5xl">
              <h3 className="mb-2 font-heading text-2xl font-bold">{t("ame.heritage.media.title")}</h3>
              <p className="mb-6 text-muted-foreground">{t("ame.heritage.media.intro")}</p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {media.map((m, i) => {
                  const Icon = MEDIA_ICONS[i] ?? Camera;
                  return (
                    <Card key={i} flat className="border-dashed">
                      <CardContent className="flex gap-4 p-5">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted"><Icon className="h-5 w-5" /></div>
                        <div>
                          <div className="mb-1 flex flex-wrap items-center gap-2">
                            <h4 className="font-bold">{m.title}</h4>
                            <Badge variant="outline" className="text-[10px]">{t("ame.heritage.media.status")}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{m.text}</p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* B. Langues */}
        <section id="languages" className="scroll-mt-24 bg-muted/30 py-20">
          <div className="container mx-auto px-6">
            <div className="mx-auto mb-8 max-w-3xl text-center">
              <Badge className="mb-4">{t("ame.languages.badge")}</Badge>
              <h2 className="mb-4 font-heading text-4xl font-bold">{t("ame.languages.title")}</h2>
              <p className="text-muted-foreground">{t("ame.languages.intro")}</p>
            </div>

            <p className="mx-auto mb-8 flex max-w-3xl items-start gap-2 rounded-xl border border-border bg-background p-4 text-sm text-muted-foreground">
              <Languages className="mt-0.5 h-4 w-4 shrink-0" />
              {t("ame.languages.banner")}
            </p>

            <div className="mb-4 flex flex-wrap justify-center gap-2">
              {LANGS.map((l) => {
                const ok = PHRASES.filter((p) => p.forms[l]?.verified).length;
                return (
                  <Button key={l} variant={lang === l ? "default" : "outline"} onClick={() => setLang(l)}>
                    {t(`ame.languages.names.${l}`)}
                    <span className="ml-2 text-[10px] opacity-70">{t("ame.languages.validated_count", { ok, total: PHRASES.length })}</span>
                  </Button>
                );
              })}
            </div>

            {!langHas ? (
              <Card flat className="mx-auto max-w-2xl border-dashed">
                <CardContent className="p-8 text-center">
                  <Languages className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
                  <h3 className="mb-2 font-heading text-2xl font-bold">{t("ame.languages.empty_title")}</h3>
                  <p className="mb-6 text-sm text-muted-foreground">{t("ame.languages.empty_text")}</p>
                  <Button asChild>
                    <a href={waLink(t("ame.contribute.message"))} target="_blank" rel="noopener noreferrer">{t("ame.contribute.button")}</a>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="mx-auto mb-4 flex max-w-4xl gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible">
                  {["all", ...CATEGORIES].map((c) => (
                    <button
                      key={c}
                      onClick={() => setCat(c)}
                      className={`shrink-0 rounded-full border px-3 py-1 text-xs transition ${cat === c ? "border-foreground bg-foreground text-background" : "border-border hover:bg-background"}`}
                    >
                      {c === "all" ? t("ame.languages.all") : t(`ame.languages.categories.${c}`)}
                    </button>
                  ))}
                </div>

                <div className="mx-auto mb-4 flex max-w-md flex-col items-center gap-3">
                  <div className="relative w-full">
                    <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder={t("ame.languages.search")}
                      className="w-full rounded-full border border-border bg-background py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
                    <input type="checkbox" checked={onlyAvail} onChange={(e) => setOnlyAvail(e.target.checked)} />
                    {t("ame.languages.only_available")}
                  </label>
                </div>

                <div className="mx-auto mt-6 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2">
                  {phrases.map((p) => {
                    const f = p.forms[lang];
                    const ctx = p.context ? (((p.context as any)[ui] as string) ?? p.context.fr) : null;
                    return (
                      <Card key={p.id} flat>
                        <CardContent className="p-5">
                          <div className="mb-3 flex items-center justify-between gap-2">
                            <Badge variant="outline" className="text-[10px]">{t(`ame.languages.categories.${p.cat}`)}</Badge>
                            <Badge variant={f?.verified ? "default" : "outline"} className="text-[10px]">
                              {f ? (f.verified ? t("ame.languages.validated") : t("ame.languages.draft")) : t("ame.languages.pending")}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{gloss(p)}</p>
                          {f ? (
                            <div className="mt-1 flex items-center justify-between gap-2">
                              <p className="font-heading text-2xl font-bold">{f.text}</p>
                              <Button size="icon" variant="ghost" aria-label={t("ame.languages.copy")} onClick={() => copy(p.id, f.text)}>
                                {copied === p.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                              </Button>
                            </div>
                          ) : (
                            <p className="mt-1 text-sm italic text-muted-foreground">{t("ame.languages.pending")}</p>
                          )}
                          <p className="mt-2 text-xs text-muted-foreground">
                            <span className="font-semibold">{t("ame.languages.pron")} : </span>
                            {f?.pron ?? t("ame.languages.pron_pending")}
                          </p>
                          <div className="mt-3">
                            {f?.audio ? (
                              <audio controls preload="none" src={f.audio} className="h-9 w-full" />
                            ) : (
                              <button disabled className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-dashed border-border px-3 py-1.5 text-xs text-muted-foreground">
                                <Volume2 className="h-3.5 w-3.5" />{t("ame.languages.audio_soon")}
                              </button>
                            )}
                          </div>
                          {ctx && f && (
                            <p className="mt-3 rounded-lg bg-muted/60 p-3 text-xs text-muted-foreground">
                              <span className="font-semibold">{t("ame.languages.context")} : </span>{ctx}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
                {phrases.length === 0 && <p className="py-8 text-center text-muted-foreground">{t("ame.languages.none")}</p>}
              </>
            )}
          </div>
        </section>

        {/* C. Récits */}
        <section id="stories" className="scroll-mt-24 py-20">
          <div className="container mx-auto px-6">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <Badge className="mb-4">{t("ame.stories.badge")}</Badge>
              <h2 className="mb-4 font-heading text-4xl font-bold">{t("ame.stories.title")}</h2>
              <p className="mb-2 text-muted-foreground">{t("ame.stories.intro")}</p>
              <p className="text-xs text-muted-foreground">{t("ame.stories.note")}</p>
            </div>

            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="space-y-2">
                {stories.map((s, i) => {
                  const Icon = STORY_ICONS[i] ?? Crown;
                  return (
                    <button
                      key={i}
                      onClick={() => { setStory(i); setChapter(0); }}
                      aria-current={story === i}
                      className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition ${story === i ? "border-foreground bg-foreground text-background" : "border-border hover:bg-muted"}`}
                    >
                      <Icon className="mt-0.5 h-5 w-5 shrink-0" />
                      <span>
                        <span className="block font-bold">{s.title}</span>
                        <span className={`block text-xs ${story === i ? "text-background/70" : "text-muted-foreground"}`}>{s.summary}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="lg:col-span-2">
                {cur && (
                  <AnimatePresence mode="wait">
                    <motion.div key={story} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                      {story === REVIEW_STORY && (
                        <p className="mb-4 flex items-start gap-2 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm">
                          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                          {t("ame.stories.review")}
                        </p>
                      )}
                      <Card flat>
                        <CardContent className="p-8">
                          <h3 className="mb-6 font-heading text-3xl font-bold">{cur.title}</h3>
                          <div className="mb-6 flex flex-wrap gap-2">
                            {cur.chapters.map((c, i) => (
                              <button
                                key={i}
                                onClick={() => setChapter(i)}
                                aria-current={chIdx === i}
                                className={`rounded-full border px-4 py-1.5 text-sm transition ${chIdx === i ? "border-foreground bg-foreground text-background" : "border-border hover:bg-muted"}`}
                              >
                                {i + 1}. {c.title}
                              </button>
                            ))}
                          </div>
                          <AnimatePresence mode="wait">
                            <motion.div key={chIdx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                              <h4 className="mb-3 text-xl font-bold">{cur.chapters[chIdx]?.title}</h4>
                              <p className="leading-relaxed text-muted-foreground">{cur.chapters[chIdx]?.text}</p>
                            </motion.div>
                          </AnimatePresence>
                          <div className="mt-6 flex items-center justify-between border-t pt-4">
                            <Button variant="outline" size="sm" disabled={chIdx === 0} onClick={() => setChapter(chIdx - 1)}>{Prev}{t("ame.ui.prev")}</Button>
                            <span className="text-xs text-muted-foreground">{t("ame.ui.step", { n: chIdx + 1, total: cur.chapters.length })}</span>
                            <Button variant="outline" size="sm" disabled={chIdx >= cur.chapters.length - 1} onClick={() => setChapter(chIdx + 1)}>{t("ame.ui.next")}{Next}</Button>
                          </div>
                        </CardContent>
                      </Card>

                      {RESPECT_STORIES.includes(story) && (
                        <div className="mt-4 rounded-xl border border-border bg-muted/40 p-5">
                          <h4 className="mb-3 font-bold">{t("ame.stories.respect_title")}</h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            {respect.map((r, i) => (
                              <li key={i} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0" />{r}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Contribuer */}
        <section className="bg-gradient-to-r from-foreground/10 via-foreground/5 to-foreground/10 py-16">
          <div className="container mx-auto px-6 text-center">
            <MessageCircle className="mx-auto mb-4 h-12 w-12" />
            <h2 className="mb-3 font-heading text-3xl font-bold">{t("ame.contribute.title")}</h2>
            <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">{t("ame.contribute.text")}</p>
            <Button size="lg" asChild>
              <a href={waLink(t("ame.contribute.message"))} target="_blank" rel="noopener noreferrer">{t("ame.contribute.button")}</a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Soul;
