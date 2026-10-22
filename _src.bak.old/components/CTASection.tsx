import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Prêt pour l'aventure ?
          </p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Commencez votre voyage au Bénin
          </h2>
          <p className="font-body text-lg text-muted-foreground mb-10 leading-relaxed">
            Que vous rêviez de safaris, de plages paradisiaques ou de découvertes
            culturelles, nous créons votre itinéraire sur mesure.
          </p>
          <Link
            to="/contact"
            className="inline-block px-10 py-5 bg-foreground text-background font-body text-sm tracking-widest uppercase hover:bg-foreground/90 transition-colors"
          >
            Contactez-nous
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
