import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import cultureImg from "@/assets/culture-voodoo.jpg";

// Sources : estimations ONU (~14,8 M en 2025) ; liste UNESCO du patrimoine mondial (3 sites). À revérifier avant publication.
const stats = [
  { value: "14M+", key: "inhabitants" },
  { value: "3", key: "unesco" },
];

const CultureSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useTranslation();

  return (
    <section className="bg-muted/40 py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div ref={ref} className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="group relative"
          >
            <div className="absolute -inset-3 translate-x-4 translate-y-4 rounded-3xl border-2 border-secondary/50 transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6" />
            <div className="relative overflow-hidden rounded-3xl shadow-dramatic">
              <img
                src={cultureImg}
                alt={t("cultureSection.alt")}
                loading="lazy"
                decoding="async"
                width={1200}
                height={800}
                className="h-auto w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <p className="kicker mb-4">{t("cultureSection.kicker")}</p>
            <h2 className="mb-6 font-heading text-4xl md:text-6xl font-bold text-foreground text-balance">
              {t("cultureSection.title")}
            </h2>
            <p className="mb-6 font-body leading-relaxed text-muted-foreground">{t("cultureSection.p1")}</p>
            <p className="mb-10 font-body leading-relaxed text-muted-foreground">{t("cultureSection.p2")}</p>

            <div className="mb-10 grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div
                  key={s.key}
                  className="rounded-2xl border border-border bg-card p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-dramatic"
                >
                  <p className="font-heading text-3xl md:text-4xl font-bold text-gradient">{s.value}</p>
                  <p className="mt-1 font-body text-xs text-muted-foreground">{t(`cultureSection.stats.${s.key}`)}</p>
                </div>
              ))}
            </div>

            <Button size="lg" asChild>
              <Link to="/culture">
                {t("cultureSection.more")}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CultureSection;
