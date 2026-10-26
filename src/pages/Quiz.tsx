import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, Check, Compass, Landmark, RotateCcw, Share2, TreePine, Trophy,
  Users, Waves, X, Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { COTONOU, PLACES, distKm, type Category } from "@/data/places";
import { getFavs, toggleFav } from "@/lib/carnet";
import { useToast } from "@/hooks/use-toast";

const arr = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);

const INTERESTS: { id: Category; icon: typeof Compass }[] = [
  { id: "historique", icon: Landmark },
  { id: "nature", icon: TreePine },
  { id: "plage", icon: Waves },
  { id: "ville", icon: Building2 },
  { id: "culture", icon: Users },
];
const DURATIONS = ["short", "medium", "long"] as const;

const QUESTIONS: { id: string; ans: number; neutral: string[] | null }[] = [
  { id: "unesco", ans: 1, neutral: ["1972", "1985", "1996", "2008"] },
  { id: "exile", ans: 1, neutral: ["Guézo", "Béhanzin", "Agadja", "Glèlè"] },
  { id: "jan10", ans: 1, neutral: null },
  { id: "gate", ans: 2, neutral: ["Cotonou", "Abomey", "Ouidah", "Parakou"] },
  { id: "capital", ans: 1, neutral: ["Cotonou", "Porto-Novo", "Abomey", "Parakou"] },
  { id: "bronze", ans: 2, neutral: null },
  { id: "rename", ans: 1, neutral: ["1960", "1975", "1990", "2008"] },
  { id: "currency", ans: 2, neutral: ["Naira", "Cedi", "Franc CFA", "Euro"] },
  { id: "gelede", ans: 1, neutral: null },
  { id: "fort", ans: 1, neutral: ["1621", "1721", "1821", "1921"] },
];

const BEST_KEY = "quiz_best";

const Quiz = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [tab, setTab] = useState<"finder" | "culture">("finder");

  const [step, setStep] = useState(0);
  const [a1, setA1] = useState<Category | null>(null);
  const [a2, setA2] = useState<Category | null>(null);
  const [dur, setDur] = useState<(typeof DURATIONS)[number] | null>(null);
  const [favs, setFavsState] = useState<number[]>(getFavs());

  const results = useMemo(() => {
    if (step < 3 || !a1 || !dur) return [];
    return PLACES.map((p) => ({
      p,
      km: Math.round(distKm(COTONOU, p)),
      score: (p.category === a1 ? 3 : 0) + (a2 && p.category === a2 ? 1.5 : 0),
    }))
      .filter((x) => dur !== "short" || x.km <= 300)
      .sort((x, y) => y.score - x.score || x.km - y.km)
      .slice(0, 3);
  }, [step, a1, a2, dur]);

  const restartFinder = () => {
    setStep(0);
    setA1(null);
    setA2(null);
    setDur(null);
  };

  const [started, setStarted] = useState(false);
  const [qi, setQi] = useState(0);
  const [sel, setSel] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [best, setBest] = useState<number>(() => Number(localStorage.getItem(BEST_KEY) || 0));

  const q = QUESTIONS[qi];
  const opts = q.neutral ?? arr<string>(t(`quiz.q.${q.id}.opts`, { returnObjects: true }));

  const pick = (i: number) => {
    if (sel !== null) return;
    setSel(i);
    if (i === q.ans) setScore((s) => s + 1);
  };
  const next = () => {
    if (qi + 1 >= QUESTIONS.length) {
      const b = Math.max(best, score);
      setBest(b);
      try {
        localStorage.setItem(BEST_KEY, String(b));
      } catch { /* ignore */ }
      setDone(true);
    } else {
      setQi(qi + 1);
      setSel(null);
    }
  };
  const replay = () => {
    setStarted(true);
    setQi(0);
    setSel(null);
    setScore(0);
    setDone(false);
  };

  const share = async () => {
    const text = t("quiz.culture.share_text", { score, total: QUESTIONS.length });
    if (navigator.share) {
      try { await navigator.share({ text }); } catch { /* annulé */ }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        toast({ title: t("quiz.culture.copied") });
      } catch { /* ignore */ }
    }
  };
  const tier = score >= 9 ? "high" : score >= 6 ? "mid" : "low";

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto max-w-3xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <Badge className="mb-4">
              <Sparkles className="mr-1 h-3 w-3" />
              {t("quiz.badge")}
            </Badge>
            <h1 className="mb-4 font-heading text-4xl font-bold md:text-5xl">{t("quiz.title")}</h1>
            <p className="text-muted-foreground">{t("quiz.subtitle")}</p>
          </motion.div>

          <div className="mb-8 flex justify-center gap-2">
            {(["finder", "culture"] as const).map((k) => (
              <Button
                key={k}
                variant={tab === k ? "default" : "outline"}
                onClick={() => setTab(k)}
                className="transition-transform hover:scale-105"
              >
                {t(`quiz.tabs.${k}`)}
              </Button>
            ))}
          </div>

          {tab === "finder" && (
            <Card flat>
              <CardContent className="p-8">
                {step < 3 ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
                        {t("quiz.finder.step", { n: step + 1 })}
                      </p>
                      <h2 className="mb-6 font-heading text-2xl font-bold">
                        {t(`quiz.finder.q${step + 1}`)}
                      </h2>
                      <div className="grid gap-3">
                        {step < 2 &&
                          INTERESTS.filter((i) => step === 0 || i.id !== a1).map(
                            ({ id, icon: Icon }) => (
                              <button
                                key={id}
                                onClick={() => {
                                  if (step === 0) setA1(id);
                                  else setA2(id);
                                  setStep(step + 1);
                                }}
                                className="flex items-center gap-3 rounded-xl border border-border p-4 text-left transition-all hover:-translate-y-1 hover:border-foreground hover:bg-muted hover:shadow-lg"
                              >
                                <Icon className="h-5 w-5" />
                                {t(`quiz.finder.interests.${id}`)}
                              </button>
                            )
                          )}
                        {step === 2 &&
                          DURATIONS.map((d) => (
                            <button
                              key={d}
                              onClick={() => {
                                setDur(d);
                                setStep(3);
                              }}
                              className="rounded-xl border border-border p-4 text-left transition-all hover:-translate-y-1 hover:border-foreground hover:bg-muted hover:shadow-lg"
                            >
                              {t(`quiz.finder.durations.${d}`)}
                            </button>
                          ))}
                      </div>
                      {step > 0 && (
                        <Button
                          variant="ghost"
                          className="mt-6"
                          onClick={() => setStep(step - 1)}
                        >
                          {t("quiz.finder.back")}
                        </Button>
                      )}
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h2 className="mb-2 font-heading text-2xl font-bold">
                      {t("quiz.finder.result_title")}
                    </h2>
                    {dur === "short" && (
                      <p className="mb-6 text-sm text-muted-foreground">
                        {t("quiz.finder.result_note_short")}
                      </p>
                    )}
                    <div className="space-y-4">
                      {results.map(({ p, km, score: sc }) => {
                        const inBook = favs.includes(Number(p.id));
                        return (
                          <motion.div
                            key={p.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-xl border border-border p-5 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                          >
                            <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                              <h3 className="text-lg font-bold">{p.name}</h3>
                              <Badge variant="outline" className="text-[10px]">
                                {sc >= 3
                                  ? t("quiz.finder.match1")
                                  : sc >= 1.5
                                  ? t("quiz.finder.match2")
                                  : t("quiz.finder.match0")}
                              </Badge>
                            </div>
                            <p className="mb-3 text-sm text-muted-foreground">
                              {p.region} · {t(`destinations.categories.${p.category}`)} ·{" "}
                              {t("quiz.finder.aerial", { km })}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <Button size="sm" variant="outline" asChild>
                                <Link to={`/carte?lieu=${p.slug}`}>
                                  {t("quiz.finder.see_map")}
                                </Link>
                              </Button>
                              <Button
                                size="sm"
                                variant={inBook ? "default" : "outline"}
                                onClick={() => setFavsState(toggleFav(p.id))}
                              >
                                {inBook ? t("quiz.finder.added") : t("quiz.finder.add")}
                              </Button>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                    <Button variant="ghost" className="mt-6" onClick={restartFinder}>
                      <RotateCcw className="mr-2 h-4 w-4" />
                      {t("quiz.finder.restart")}
                    </Button>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          )}

          {tab === "culture" && (
            <Card flat>
              <CardContent className="p-8">
                {!started ? (
                  <div className="text-center">
                    <Trophy className="mx-auto mb-4 h-12 w-12 animate-float" />
                    <p className="mb-2">{t("quiz.culture.intro")}</p>
                    {best > 0 && (
                      <p className="mb-4 text-sm text-muted-foreground">
                        {t("quiz.culture.best", { best, total: QUESTIONS.length })}
                      </p>
                    )}
                    <Button size="lg" onClick={replay} className="transition-transform hover:scale-105">
                      {t("quiz.culture.start")}
                    </Button>
                  </div>
                ) : done ? (
                  <div className="text-center">
                    <Trophy className="mx-auto mb-4 h-12 w-12 animate-float" />
                    <h2 className="mb-2 font-heading text-3xl font-bold">
                      {t("quiz.culture.score", { score, total: QUESTIONS.length })}
                    </h2>
                    <p className="mb-2 text-muted-foreground">
                      {t(`quiz.culture.tiers.${tier}`)}
                    </p>
                    <p className="mb-6 text-xs text-muted-foreground">
                      {t("quiz.culture.best", { best, total: QUESTIONS.length })}
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                      <Button onClick={replay} className="transition-transform hover:scale-105">
                        <RotateCcw className="mr-2 h-4 w-4" />
                        {t("quiz.culture.restart")}
                      </Button>
                      <Button variant="outline" onClick={share} className="transition-transform hover:scale-105">
                        <Share2 className="mr-2 h-4 w-4" />
                        {t("quiz.culture.share")}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <motion.div key={qi} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
                      {t("quiz.culture.question_of", { n: qi + 1, total: QUESTIONS.length })}
                    </p>
                    <h2 className="mb-6 font-heading text-2xl font-bold">
                      {t(`quiz.q.${q.id}.q`)}
                    </h2>
                    <div className="grid gap-3">
                      {opts.map((o, i) => {
                        const right = sel !== null && i === q.ans;
                        const wrong = sel === i && i !== q.ans;
                        return (
                          <button
                            key={i}
                            onClick={() => pick(i)}
                            disabled={sel !== null}
                            className={`flex items-center justify-between rounded-xl border p-4 text-left transition-all ${
                              right
                                ? "border-green-600 bg-green-600/10"
                                : wrong
                                ? "border-red-500 bg-red-500/10"
                                : "border-border hover:-translate-y-1 hover:border-foreground hover:bg-muted"
                            }`}
                          >
                            {o}
                            {right && <Check className="h-4 w-4 text-green-600" />}
                            {wrong && <X className="h-4 w-4 text-red-500" />}
                          </button>
                        );
                      })}
                    </div>
                    {sel !== null && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6"
                      >
                        <p className="mb-1 font-bold">
                          {sel === q.ans
                            ? t("quiz.culture.correct")
                            : t("quiz.culture.wrong")}
                        </p>
                        <p className="mb-4 text-sm text-muted-foreground">
                          {t(`quiz.q.${q.id}.exp`)}
                        </p>
                        <Button onClick={next} className="transition-transform hover:scale-105">
                          {qi + 1 >= QUESTIONS.length
                            ? t("quiz.culture.finish")
                            : t("quiz.culture.next")}
                        </Button>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Quiz;
