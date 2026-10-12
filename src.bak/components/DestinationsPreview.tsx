import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import destAbomey from "@/assets/dest-abomey.jpg";
import destOuidah from "@/assets/dest-ouidah.jpg";
import destPendjari from "@/assets/dest-pendjari.jpg";
import destCotonou from "@/assets/dest-cotonou.jpg";

const destinations = [
  {
    title: "Abomey",
    subtitle: "Palais Royaux — UNESCO",
    description: "Les vestiges du puissant Royaume du Dahomey, classés au patrimoine mondial.",
    image: destAbomey,
  },
  {
    title: "Ouidah",
    subtitle: "La Route de l'Esclave",
    description: "La Porte du Non-Retour, un lieu de mémoire universel face à l'océan.",
    image: destOuidah,
  },
  {
    title: "Pendjari",
    subtitle: "Safari & Nature",
    description: "L'un des derniers sanctuaires de faune sauvage en Afrique de l'Ouest.",
    image: destPendjari,
  },
  {
    title: "Cotonou",
    subtitle: "Cœur Économique",
    description: "La vibrante capitale économique, entre marchés animés et modernité.",
    image: destCotonou,
  },
];

const DestinationCard = ({ dest, index }: { dest: typeof destinations[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className="group relative overflow-hidden"
    >
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={dest.image}
          alt={`${dest.title} — ${dest.subtitle}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <p className="font-body text-xs tracking-[0.2em] uppercase text-primary-foreground/70 mb-1">
          {dest.subtitle}
        </p>
        <h3 className="font-heading text-3xl font-bold text-primary-foreground mb-2">
          {dest.title}
        </h3>
        <p className="font-body text-sm text-primary-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          {dest.description}
        </p>
      </div>
    </motion.div>
  );
};

const DestinationsPreview = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Destinations
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground text-balance">
            Lieux emblématiques
          </h2>
          <div className="w-16 h-0.5 bg-foreground mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, i) => (
            <DestinationCard key={dest.title} dest={dest} index={i} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/destinations"
            className="inline-block px-8 py-4 border border-foreground text-foreground font-body text-sm tracking-widest uppercase hover:bg-foreground hover:text-background transition-colors duration-300"
          >
            Toutes les destinations
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DestinationsPreview;
