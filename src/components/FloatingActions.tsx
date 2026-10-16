import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowUp, MessageCircle } from "lucide-react";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-foreground mix-blend-difference"
    />
  );
};

const WHATSAPP = "https://wa.me/2290154069454";

const FloatingActions = () => {
  const [show, setShow] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {show && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label={t("floating.top")}
            title={t("floating.top")}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background/80 text-foreground shadow-dramatic backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-foreground hover:text-background"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("floating.whatsapp")}
        title={t("floating.whatsapp")}
        className="group flex h-14 items-center gap-0 overflow-hidden rounded-full bg-foreground px-4 text-background shadow-dramatic transition-all duration-500 hover:-translate-y-1 hover:gap-2 hover:pr-6"
      >
        <MessageCircle className="h-6 w-6 shrink-0" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-500 group-hover:max-w-[200px]">
          {t("floating.whatsapp")}
        </span>
      </a>
    </div>
  );
};

export default FloatingActions;
