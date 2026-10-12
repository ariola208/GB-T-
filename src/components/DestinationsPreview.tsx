import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import destAbomey from "@/assets/dest-abomey.jpg";
import destOuidah from "@/assets/dest-ouidah.jpg";
import destPendjari from "@/assets/dest-pendjari.jpg";
import destCotonou from "@/assets/dest-cotonou.jpg";

const items = [
  { key: "abomey", image: destAbomey },
  { key: "ouidah", image: destOuidah },
  { key: "pendjari", image: destPendjari },
  { key: "cotonou", image: destCotonou },
];

const DestinationCard = ({ item, index }: { item: (typeof items)[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useTranslation();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
    >
      <Link
        to="/destinations"
        className="group relative block overflow-hidden rounded-3xl shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-dramatic"
      >
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={item.image}
            alt={`${t(`destPreview.items.${item.key}.title`)} — ${t(`destPreview.items.${item.key}.subtitle`)}`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-colors duration-500 group-hover:from-primary/95 group-hover:via-primary/30" />

        <div className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100 group-hover:rotate-12 group-hover:bg-secondary group-hover:text-secondary-foreground">
          <ArrowUpRight className="h-5 w-5" />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
          <p className="mb-1 font-body text-xs uppercase tracking-[0.2em] text-secondary">
            {t(`destPreview.items.${item.key}.subtitle`)}
          </p>
          <h3 className="mb-2 font-heading text-3xl font-bold">{t(`destPreview.items.${item.key}.title`)}</h3>
          <p className="max-h-0 overflow-hidden font-body text-sm text-white/85 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100 [@media(hover:none)]:max-h-24 [@media(hover:none)]:opacity-100">
            {t(`destPreview.items.${item.key}.description`)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

const DestinationsPreview = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  const { t } = useTranslation();

  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="kicker mb-4">{t("destPreview.kicker")}</p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground text-balance">
            {t("destPreview.title")}
          </h2>
          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-primary via-secondary to-accent" />
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <DestinationCard key={item.key} item={item} index={i} />
          ))}
        </div>

        <div className="mt-14 text-center">
          <Button size="lg" variant="outline" asChild>
            <Link to="/destinations">{t("destPreview.all")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DestinationsPreview;
