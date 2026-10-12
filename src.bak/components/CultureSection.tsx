import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import cultureImg from "@/assets/culture-voodoo.jpg";

const CultureSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-6">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }}
          >
            <div className="overflow-hidden">
              <img
                src={cultureImg}
                alt="Masques traditionnels vodoun du Bénin"
                loading="lazy"
                width={1200}
                height={800}
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Patrimoine
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Berceau du Vodoun
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-6">
              Le Bénin est le berceau de la religion vodoun, une tradition spirituelle
              riche et complexe qui continue de façonner la vie quotidienne. Des
              cérémonies colorées aux masques sacrés, chaque aspect de cette culture
              raconte une histoire millénaire.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              De la fête annuelle du Vodoun à Ouidah aux temples secrets de l'arrière-pays,
              découvrez un patrimoine immatériel d'une profondeur exceptionnelle.
            </p>
            <div className="flex gap-12">
              <div>
                <p className="font-heading text-4xl font-bold text-foreground">12M</p>
                <p className="font-body text-sm text-muted-foreground mt-1">Habitants</p>
              </div>
              <div>
                <p className="font-heading text-4xl font-bold text-foreground">50+</p>
                <p className="font-body text-sm text-muted-foreground mt-1">Ethnies</p>
              </div>
              <div>
                <p className="font-heading text-4xl font-bold text-foreground">2</p>
                <p className="font-body text-sm text-muted-foreground mt-1">Sites UNESCO</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CultureSection;
