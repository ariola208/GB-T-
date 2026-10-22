import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Compass } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="px-6 text-center"
      >
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-4 font-heading text-8xl font-bold text-foreground md:text-9xl"
        >
          {t("notfound.title")}
        </motion.h1>
        <p className="mb-8 font-body text-xl text-muted-foreground">{t("notfound.text")}</p>
        <div className="flex justify-center gap-3">
          <Button asChild className="transition-transform hover:scale-105">
            <Link to="/" className="inline-flex items-center gap-2">
              <Home className="h-4 w-4" />
              {t("notfound.back")}
            </Link>
          </Button>
          <Button variant="outline" asChild className="transition-transform hover:scale-105">
            <Link to="/destinations" className="inline-flex items-center gap-2">
              <Compass className="h-4 w-4" />
              {t("destinations.title")}
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
