import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Brain, Compass, Check, X, RotateCcw, Share2,
  ArrowRight, ArrowLeft, Trophy, MapPin, Sparkles,
  Clock, Target, Award, Filter,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import quizzesData from "@/i18n/locales/quizzes.json";

// ============================================================
// PAGE QUIZ POLYVALENT
// ============================================================

type Category = "culture" | "histoire" | "nature" | "gastronomie" | "langues" | "arts";
type Level = "easy" | "medium" | "hard";
type Question = {
  cat: Category;
  level: Level;
  q: string;
  opts: string[];
  correct: number;
  exp: string;
};

const Quiz = () => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-32">
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background py-16">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mx-auto max-w-4xl"
            >
              <Badge className="mb-6 bg-secondary/20 text-secondary-foreground">
                <Sparkles className="mr-1 h-3 w-3" />
                {t("quiz.badge", "Jeux et découvertes")}
              </Badge>
              <h1 className="font-heading text-5xl font-bold md:text-7xl">
                {t("quiz.title", "Quiz")}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
                {t("quiz.subtitle", "Trouvez le voyage qui vous ressemble, puis testez vos connaissances.")}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-6">
            <Tabs defaultValue="finder" className="mx-auto max-w-5xl">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="finder" className="gap-2">
                  <Compass className="h-4 w-4" />
                  {t("quiz.tabs.finder", "Trouver mon voyage")}
                </TabsTrigger>
                <TabsTrigger value="culture" className="gap-2">
                  <Brain className="h-4 w-4" />
                  {t("quiz.tabs.culture", "Quiz culture")}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="finder" className="mt-8">
                <TripFinder />
              </TabsContent>
              <TabsContent value="culture" className="mt-8">
                <PolyvalentQuiz />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

// ============================================================
// SOUS-COMPOSANT : Trip Finder
// ============================================================

type TripInterest = "historique" | "nature" | "plage" | "ville" | "culture";
type TripDuration = "short" | "medium" | "long";

type Destination = {
  name: string;
  slug: string;
  km: number;
  interests: TripInterest[];
  duration: TripDuration[];
  image: string;
};

const DESTINATIONS: Destination[] = [
  { name: "Ouidah", slug: "ouidah", km: 40, interests: ["historique", "culture"], duration: ["short", "medium"], image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400" },
  { name: "Ganvié", slug: "ganvie", km: 15, interests: ["culture", "ville"], duration: ["short", "medium"], image: "https://images.unsplash.com/photo-1590080669915-3d4e68d2e20f?w=400" },
  { name: "Abomey", slug: "abomey", km: 145, interests: ["historique", "culture"], duration: ["short", "medium"], image: "https://images.unsplash.com/photo-1589308078059-be3c3044eccc?w=400" },
  { name: "Pendjari", slug: "pendjari", km: 500, interests: ["nature"], duration: ["medium", "long"], image: "https://images.unsplash.com/photo-1547970810-dc1e93b62d48?w=400" },
  { name: "Grand-Popo", slug: "grand-popo", km: 130, interests: ["plage", "nature"], duration: ["short", "medium"], image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400" },
  { name: "Cotonou", slug: "cotonou", km: 0, interests: ["ville", "culture"], duration: ["short", "medium", "long"], image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=400" },
  { name: "Natitingou", slug: "natitingou", km: 550, interests: ["nature", "culture"], duration: ["medium", "long"], image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400" },
  { name: "Porto-Novo", slug: "porto-novo", km: 30, interests: ["historique", "ville"], duration: ["short"], image: "https://images.unsplash.com/photo-1589308078059-be3c3044eccc?w=400" },
];

const TripFinder = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [q1, setQ1] = useState<TripInterest | null>(null);
  const [q2, setQ2] = useState<TripInterest | null>(null);
  const [duration, setDuration] = useState<TripDuration | null>(null);
  const [results, setResults] = useState<Destination[]>([]);

  const interests: { value: TripInterest; label: string; emoji: string }[] = [
    { value: "historique", label: t("quiz.finder.interests.historique", "Histoire et monuments"), emoji: "🏛️" },
    { value: "nature", label: t("quiz.finder.interests.nature", "Nature et animaux"), emoji: "🦁" },
    { value: "plage", label: t("quiz.finder.interests.plage", "Plage et détente"), emoji: "🏖️" },
    { value: "ville", label: t("quiz.finder.interests.ville", "Ville et marchés"), emoji: "🏙️" },
    { value: "culture", label: t("quiz.finder.interests.culture", "Traditions et vie locale"), emoji: "🎭" },
  ];

  const durations: { value: TripDuration; label: string }[] = [
    { value: "short", label: t("quiz.finder.durations.short", "Court séjour (1-3 jours)") },
    { value: "medium", label: t("quiz.finder.durations.medium", "Environ une semaine") },
    { value: "long", label: t("quiz.finder.durations.long", "Plus d'une semaine") },
  ];

  const computeResults = () => {
    const scored = DESTINATIONS.map((d) => {
      let score = 0;
      if (d.interests.includes(q1!)) score += 3;
      if (q2 && d.interests.includes(q2)) score += 2;
      if (duration && d.duration.includes(duration)) score += 2;
      if (d.km < 100) score += 1;
      return { dest: d, score };
    });
    scored.sort((a, b) => b.score - a.score);
    setResults(scored.slice(0, 4).map((s) => s.dest));
    setStep(3);
  };

  const restart = () => {
    setStep(0);
    setQ1(null);
    setQ2(null);
    setDuration(null);
    setResults([]);
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
      {step < 3 && (
        <div className="mb-8">
          <div className="mb-2 flex justify-between text-xs text-muted-foreground">
            <span>{t("quiz.finder.step", "Étape {{n}} / 3", { n: step + 1 })}</span>
            <span>{Math.round(((step + 1) / 3) * 100)}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <motion.div className="h-full bg-primary" initial={{ width: 0 }} animate={{ width: `${((step + 1) / 3) * 100}%` }} transition={{ duration: 0.4 }} />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="mb-6 font-heading text-3xl font-bold">{t("quiz.finder.q1", "Qu'est-ce qui vous attire le plus ?")}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {interests.map((i) => (
                <button key={i.value} onClick={() => { setQ1(i.value); setStep(1); }} className="flex items-center gap-4 rounded-2xl border border-border bg-background p-5 text-left transition hover:-translate-y-1 hover:border-primary hover:shadow-lg">
                  <span className="text-3xl">{i.emoji}</span>
                  <span className="font-medium">{i.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="mb-6 font-heading text-3xl font-bold">{t("quiz.finder.q2", "Et en deuxième choix ?")}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {interests.filter((i) => i.value !== q1).map((i) => (
                <button key={i.value} onClick={() => { setQ2(i.value); setStep(2); }} className="flex items-center gap-4 rounded-2xl border border-border bg-background p-5 text-left transition hover:-translate-y-1 hover:border-primary hover:shadow-lg">
                  <span className="text-3xl">{i.emoji}</span>
                  <span className="font-medium">{i.label}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setStep(0)} className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> {t("quiz.finder.back", "Retour")}
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="mb-6 font-heading text-3xl font-bold">{t("quiz.finder.q3", "Combien de temps avez-vous ?")}</h2>
            <div className="grid gap-3">
              {durations.map((d) => (
                <button key={d.value} onClick={() => { setDuration(d.value); setTimeout(computeResults, 100); }} className="rounded-2xl border border-border bg-background p-5 text-left font-medium transition hover:-translate-y-1 hover:border-primary hover:shadow-lg">
                  {d.label}
                </button>
              ))}
            </div>
            <button onClick={() => setStep(1)} className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> {t("quiz.finder.back", "Retour")}
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-8 text-center">
              <h2 className="font-heading text-3xl font-bold">{t("quiz.finder.result_title", "Nos idées pour vous")}</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {results.map((r, i) => (
                <motion.div key={r.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="overflow-hidden rounded-2xl border border-border bg-background">
                  <div className="relative h-40 overflow-hidden">
                    <img src={r.image} alt={r.name} className="h-full w-full object-cover" />
                    {i === 0 && (
                      <Badge className="absolute left-3 top-3 bg-secondary text-secondary-foreground">
                        <Trophy className="mr-1 h-3 w-3" /> Top
                      </Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading text-xl font-bold">{r.name}</h3>
                    <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {t("quiz.finder.aerial", "≈ {{km}} km de Cotonou", { km: r.km })}
                    </p>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1" asChild>
                        <Link to="/destinations">
                          {t("quiz.finder.see_map", "Voir")}
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 flex justify-center gap-3">
              <Button variant="outline" onClick={restart}>
                <RotateCcw className="mr-2 h-4 w-4" />
                {t("quiz.finder.restart", "Recommencer")}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================
// SOUS-COMPOSANT : Quiz polyvalent
// ============================================================

const QUESTIONS_PER_ROUND = 10;

type CategoryOrAll = Category | "all";
type LevelOrAll = Level | "all";

type HighScore = { score: number; total: number; date: string };

const PolyvalentQuiz = () => {
  const { t } = useTranslation();
  const allQuestions = quizzesData.questions as Question[];
  const categories = quizzesData.categories as Record<Category, { label: string; emoji: string }>;

  const [started, setStarted] = useState(false);
  const [selectedCat, setSelectedCat] = useState<CategoryOrAll>("all");
  const [selectedLevel, setSelectedLevel] = useState<LevelOrAll>("all");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [bestScore, setBestScore] = useState<HighScore | null>(null);
  const [elapsed, setElapsed] = useState(0);

  // Historique du meilleur score
  useEffect(() => {
    try {
      const stored = localStorage.getItem("quiz-best-score");
      if (stored) setBestScore(JSON.parse(stored));
    } catch {}
  }, []);

  // Chronomètre
  useEffect(() => {
    if (!started || finished) return;
    const interval = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(interval);
  }, [started, finished]);

  // Questions disponibles selon filtres
  const available = useMemo(() => {
    return allQuestions.filter((q) => {
      const catOk = selectedCat === "all" || q.cat === selectedCat;
      const levelOk = selectedLevel === "all" || q.level === selectedLevel;
      return catOk && levelOk;
    });
  }, [allQuestions, selectedCat, selectedLevel]);

  const startQuiz = () => {
    if (available.length === 0) return;
    // Tirage aléatoire
    const shuffled = [...available].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, Math.min(QUESTIONS_PER_ROUND, shuffled.length)));
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
    setElapsed(0);
    setStarted(true);
  };

  const handleAnswer = (index: number) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    if (index === questions[current].correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      // Fin
      const finalScore = score + (selected === questions[current].correct ? 0 : 0);
      if (!bestScore || finalScore > bestScore.score) {
        const newBest = { score: finalScore, total: questions.length, date: new Date().toISOString() };
        setBestScore(newBest);
        localStorage.setItem("quiz-best-score", JSON.stringify(newBest));
      }
      setFinished(true);
    }
  };

  const restart = () => {
    setStarted(false);
    setFinished(false);
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setElapsed(0);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  // ==== ÉCRAN D'ACCUEIL / CHOIX ====
  if (!started) {
    return (
      <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
        <div className="mb-8 text-center">
          <Brain className="mx-auto mb-4 h-14 w-14 text-primary" />
          <h2 className="font-heading text-3xl font-bold">
            {t("quiz.culture.title", "Quiz culture")}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {t("quiz.culture.intro", "Choisissez un thème et un niveau, puis répondez à 10 questions.")}
          </p>
        </div>

        {/* Meilleur score */}
        {bestScore && (
          <div className="mx-auto mb-8 flex max-w-md items-center justify-center gap-3 rounded-2xl border border-secondary/30 bg-secondary/10 p-4">
            <Award className="h-5 w-5 text-secondary" />
            <span className="text-sm">
              {t("quiz.culture.best", "Meilleur score : {{score}} / {{total}}", { score: bestScore.score, total: bestScore.total })}
            </span>
          </div>
        )}

        {/* Choix du thème */}
        <div className="mb-6">
          <label className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            <Filter className="h-4 w-4" /> Thème
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCat("all")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${selectedCat === "all" ? "bg-foreground text-background" : "border border-border hover:bg-muted"}`}
            >
              🌟 Tous
            </button>
            {(Object.keys(categories) as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${selectedCat === cat ? "bg-foreground text-background" : "border border-border hover:bg-muted"}`}
              >
                {categories[cat].emoji} {categories[cat].label}
              </button>
            ))}
          </div>
        </div>

        {/* Choix du niveau */}
        <div className="mb-8">
          <label className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            <Target className="h-4 w-4" /> Niveau
          </label>
          <div className="flex flex-wrap gap-2">
            {(["all", "easy", "medium", "hard"] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${selectedLevel === lvl ? "bg-foreground text-background" : "border border-border hover:bg-muted"}`}
              >
                {lvl === "all" ? "🎯 Tous" : lvl === "easy" ? "🟢 Facile" : lvl === "medium" ? "🟡 Moyen" : "🔴 Difficile"}
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="mb-6 rounded-2xl bg-muted/50 p-4 text-center text-sm text-muted-foreground">
          {available.length} question(s) disponible(s) dans cette sélection.
          {available.length < QUESTIONS_PER_ROUND && available.length > 0 && (
            <span> Tirage de {available.length} questions.</span>
          )}
        </div>

        <div className="flex justify-center">
          <Button size="lg" onClick={startQuiz} disabled={available.length === 0}>
            {t("quiz.culture.start", "Commencer")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  // ==== ÉCRAN DE FIN ====
  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    let tier: "high" | "mid" | "low" = "low";
    if (pct >= 80) tier = "high";
    else if (pct >= 50) tier = "mid";

    const tierLabel = tier === "high"
      ? t("quiz.culture.tiers.high", "Excellent ! Vous connaissez très bien le Bénin !")
      : tier === "mid"
      ? t("quiz.culture.tiers.mid", "Bien joué ! Vous avez de bonnes bases.")
      : t("quiz.culture.tiers.low", "Continuez à explorer le Bénin !");

    return (
      <div className="rounded-3xl border border-border bg-card p-8 text-center md:p-12">
        <Trophy className="mx-auto mb-6 h-16 w-16 text-secondary" />
        <h2 className="mb-2 font-heading text-3xl font-bold">
          {t("quiz.culture.score", "Votre score : {{score}} / {{total}}", { score, total: questions.length })}
        </h2>
        <p className="mb-2 text-muted-foreground">{tierLabel}</p>
        <p className="mb-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          Temps : {formatTime(elapsed)}
        </p>

        <div className="mb-8 flex flex-wrap justify-center gap-3">
          <Button variant="outline" onClick={restart}>
            <RotateCcw className="mr-2 h-4 w-4" />
            {t("quiz.culture.restart", "Rejouer")}
          </Button>
          <Button onClick={() => {
            const text = t("quiz.culture.share_text", "J'ai obtenu {{score}}/{{total}} au quiz culture du Bénin !", { score, total: questions.length });
            if (navigator.share) navigator.share({ text });
            else navigator.clipboard.writeText(text);
          }}>
            <Share2 className="mr-2 h-4 w-4" />
            {t("quiz.culture.share", "Partager mon score")}
          </Button>
        </div>

        <Link to="/quiz" className="text-sm text-muted-foreground hover:text-foreground">
          ← Changer de thème ou de niveau
        </Link>
      </div>
    );
  }

  // ==== ÉCRAN QUESTION ====
  const q = questions[current];
  const catInfo = categories[q.cat];
  return (
    <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            {t("quiz.culture.question_of", "Question {{n}} / {{total}}", { n: current + 1, total: questions.length })}
          </Badge>
          <Badge className="bg-secondary/20 text-secondary-foreground">
            {catInfo.emoji} {catInfo.label}
          </Badge>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> {formatTime(elapsed)}
          </span>
          <span className="flex items-center gap-1">
            <Target className="h-3 w-3" /> {score} pts
          </span>
        </div>
      </div>

      {/* Barre de progression */}
      <div className="mb-8 h-2 overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${((current + 1) / questions.length) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <h2 className="mb-8 font-heading text-2xl font-bold md:text-3xl">{q.q}</h2>

      <div className="space-y-3">
        {q.opts.map((opt, i) => {
          const isCorrect = i === q.correct;
          const isSelected = i === selected;
          let styles = "border-border bg-background hover:border-primary hover:bg-primary/5";
          if (answered) {
            if (isCorrect) styles = "border-green-500 bg-green-50 dark:bg-green-950";
            else if (isSelected) styles = "border-red-500 bg-red-50 dark:bg-red-950";
            else styles = "border-border bg-background opacity-50";
          }
          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={answered}
              className={`flex w-full items-center gap-4 rounded-2xl border-2 p-5 text-left transition ${styles}`}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-current font-bold">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">{opt}</span>
              {answered && isCorrect && <Check className="h-5 w-5 text-green-600" />}
              {answered && isSelected && !isCorrect && <X className="h-5 w-5 text-red-600" />}
            </button>
          );
        })}
      </div>

      {answered && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 rounded-2xl border border-border bg-muted/50 p-4">
          <p className="text-sm">
            <strong>
              {selected === q.correct
                ? "✅ " + t("quiz.culture.correct", "Bonne réponse !")
                : "❌ " + t("quiz.culture.wrong", "Pas tout à fait.")}{" "}
            </strong>
            {q.exp}
          </p>
          <div className="mt-4 flex justify-end">
            <Button onClick={handleNext}>
              {current + 1 < questions.length
                ? t("quiz.culture.next", "Question suivante")
                : t("quiz.culture.finish", "Voir mon score")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Quiz;
