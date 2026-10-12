import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { t } = useTranslation();

  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[2rem] border-2 border-foreground/15 bg-card px-8 py-20 text-center shadow-dramatic"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-foreground/[0.04] blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-foreground/[0.04] blur-3xl" />

          <div className="relative z-10 mx-auto max-w-3xl">
            <p className="mb-4 font-body text-xs uppercase tracking-[0.3em] text-muted-foreground">{t("cta.kicker")}</p>
            <h2 className="mb-6 font-heading text-4xl font-bold text-balance md:text-6xl">{t("cta.title")}</h2>
            <p className="mb-10 font-body text-lg leading-relaxed text-muted-foreground">{t("cta.text")}</p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link to="/contact">{t("cta.button")}</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/destinations">{t("cta.secondary")}</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
