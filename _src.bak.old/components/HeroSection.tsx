import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-benin.jpg";

const floatingVariants = {
  animate: {
    y: [0, -15, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background image with parallax-like zoom */}
      <motion.div
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src={heroImg}
          alt="Ganvié, the Venice of Africa — stilt village on Lake Nokoué, Bénin"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Animated geometric shapes */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-1/4 right-[10%] w-32 h-32 border border-primary-foreground/20 rounded-full hidden lg:block"
      />
      <motion.div
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "2s" }}
        className="absolute bottom-1/3 left-[8%] w-20 h-20 border border-primary-foreground/15 rotate-45 hidden lg:block"
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-body text-sm tracking-[0.3em] uppercase text-primary-foreground/70 mb-6"
        >
          Découvrez l'Afrique de l'Ouest
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground leading-tight text-balance max-w-4xl"
        >
          Le Bénin vous attend
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="font-body text-lg md:text-xl text-primary-foreground/80 mt-6 max-w-2xl"
        >
          Un voyage entre histoire millénaire, traditions vivantes et paysages
          à couper le souffle.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <Link
            to="/destinations"
            className="px-8 py-4 bg-primary-foreground text-primary font-body text-sm tracking-widest uppercase hover:bg-primary-foreground/90 transition-colors"
          >
            Explorer
          </Link>
          <Link
            to="/contact"
            className="px-8 py-4 border border-primary-foreground/50 text-primary-foreground font-body text-sm tracking-widest uppercase hover:bg-primary-foreground/10 transition-colors"
          >
            Planifier votre voyage
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 border-2 border-primary-foreground/40 rounded-full flex justify-center pt-1.5"
          >
            <div className="w-1 h-2 bg-primary-foreground/60 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
