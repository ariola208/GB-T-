import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, BookMarked, ChevronLeft, ChevronRight, Compass, Lightbulb, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hasLocal, localImg } from "@/lib/localImages";

const arr = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);

const TILES = [
  { key: "history", to: "/ame-du-benin", imgs: ["abomey.jpeg", "ouidah.jpeg"], cls: "col-span-2 md:row-span-2" },
  { key: "nature", to: "/destinations", imgs: ["pendjari.jpeg", "natitingou.jpeg"], cls: "" },
  { key: "beach", to: "/destinations", imgs: ["grandpopo.jpeg"], cls: "" },
  { key: "city", to: "/destinations", imgs: ["cotonou.jpeg", "portonovo.jpeg"], cls: "" },
  { key: "tradition", to: "/culture", imgs: ["vodoun_1.jpeg", "G_1.jpeg"], cls: "" },
];
const STEPS = [
  { icon: Compass, to: "/quiz" },
  { icon: MapPin, to: "/carte" },
  { icon: BookMarked, to: "/carnet" },
];

const HomeExtras = () => {
  const { t } = useTranslation();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const facts = arr<string>(t("home2.facts.items", { returnObjects: true }));
  const steps = arr<{ title: string; text: string; cta: string }>(t("home2.steps.items", { returnObjects: true }));

  useEffect(() => {
    if (paused || facts.length === 0) return;
    const id = setInterval(() => setI((x) => (x + 1) % facts.length), 7000);
    return () => clearInterval(id);
  }, [paused, facts.length]);

  const go = (d: number) => setI((x) => (x + d + facts.length) % facts.length);

  return (
    <>
      {/* Explorer par univers */}
      <section className="bg-background py-24">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <p className="kicker mb-4">{t("home2.explore.kicker")}</p>
            <h2 className="font-heading text-4xl font-bold md:text-5xl">{t("home2.explore.title")}</h2>
          </div>
          <div className="grid auto-rows-[13rem] grid-cols-2 gap-4 md:auto-rows-[15rem] md:grid-cols-4">
            {TILES.map((tile, idx) => {
              const name = tile.imgs.find(hasLocal);
              return (
                <motion.div
                  key={tile.key}
                  className={tile.cls}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.6 }}
                >
                  <Link to={tile.to} className="group relative block h-full overflow-hidden rounded-2xl bg-muted">
                    {name && (
                      <img src={localImg(name)} alt="" loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                      <h3 className="font-heading text-xl font-bold md:text-2xl">{t(`home2.explore.tiles.${tile.key}.title`)}</h3>
                      <p className="text-sm text-white/80">{t(`home2.explore.tiles.${tile.key}.text`)}</p>
                    </div>
                    <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-md transition group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Du rêve au départ */}
      <section className="bg-muted/30 py-24">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <p className="kicker mb-4">{t("home2.steps.kicker")}</p>
            <h2 className="font-heading text-4xl font-bold md:text-5xl">{t("home2.steps.title")}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((s, idx) => {
              const Icon = (STEPS[idx] ?? STEPS[0]).icon;
              return (
                <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.12, duration: 0.6 }}>
                  <div className="relative h-full rounded-2xl border border-border bg-card p-8 transition duration-300 hover:-translate-y-1 hover:shadow-dramatic">
                    <span className="absolute right-6 top-3 font-heading text-7xl font-bold text-foreground/[0.06]">{idx + 1}</span>
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-foreground text-background"><Icon className="h-5 w-5" /></div>
                    <h3 className="mb-2 font-heading text-2xl font-bold">{s.title}</h3>
                    <p className="text-muted-foreground">{s.text}</p>
                    <Button variant="link" className="mt-4 p-0" asChild><Link to={(STEPS[idx] ?? STEPS[0]).to}>{s.cta}</Link></Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Le saviez-vous */}
      <section className="bg-background py-24" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="container mx-auto max-w-3xl px-6 text-center">
          <Lightbulb className="mx-auto mb-4 h-8 w-8" />
          <p className="kicker mb-6">{t("home2.facts.kicker")}</p>
          <div className="flex min-h-[8rem] items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4 }}
                className="font-heading text-2xl leading-snug md:text-3xl">
                {facts[i]}
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button size="icon" variant="outline" aria-label={t("home2.facts.prev")} onClick={() => go(-1)}><ChevronLeft className="h-4 w-4" /></Button>
            <div className="flex gap-2">
              {facts.map((_, k) => (
                <button key={k} onClick={() => setI(k)} aria-label={`${k + 1}`}
                  className={`h-2 rounded-full transition-all ${k === i ? "w-6 bg-foreground" : "w-2 bg-foreground/25"}`} />
              ))}
            </div>
            <Button size="icon" variant="outline" aria-label={t("home2.facts.next")} onClick={() => go(1)}><ChevronRight className="h-4 w-4" /></Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeExtras;
