import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-benin.jpg";

const stats = [
  { value: "15+", key: "years" },
  { value: "45+", key: "destinations" },
  { value: "50K+", key: "travelers" },
];

const HeroSection = () => {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, 220]);
  const fade = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section className="relative h-screen min-h-[680px] w-full overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-x-0 -top-16 -bottom-16">
        <motion.img
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: "easeOut" }}
          src={heroImg}
          alt={t("hero.alt")}
          width={3840}
          height={2160}
          decoding="async"
          className="h-full w-full object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 hero-overlay" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,hsl(var(--secondary)/0.18),transparent_55%)]" />

      <div className="absolute top-1/4 right-[10%] hidden lg:block h-32 w-32 rounded-full border border-white/25 animate-float" />
      <div className="absolute bottom-1/3 left-[8%] hidden lg:block h-20 w-20 rotate-45 border border-secondary/40 animate-float [animation-delay:2s]" />

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-6 flex items-center gap-4 font-body text-sm tracking-[0.3em] uppercase text-white/80"
        >
          <span className="hidden sm:block h-px w-10 bg-secondary" />
          {t("hero.kicker")}
          <span className="hidden sm:block h-px w-10 bg-secondary" />
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="max-w-5xl font-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] text-balance text-white drop-shadow-2xl"
        >
          {t("hero.title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-6 max-w-2xl font-body text-lg md:text-xl text-white/85"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <Button size="lg" variant="secondary" asChild>
            <Link to="/destinations">
              {t("hero.explore")} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/60 text-white hover:bg-white hover:text-primary hover:border-white"
            asChild
          >
            <Link to="/contact">{t("hero.plan")}</Link>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-24 inset-x-0 z-10 hidden md:flex justify-center gap-4 px-6"
      >
        {stats.map((s) => (
          <div
            key={s.key}
            className="min-w-[180px] rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-center text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/20"
          >
            <p className="font-heading text-3xl font-bold">{s.value}</p>
            <p className="text-xs uppercase tracking-wider text-white/70">{t(`hero.stats.${s.key}`)}</p>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-1 text-white/70"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">{t("hero.scroll")}</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
