import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
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
        <h1 className="mb-4 font-heading text-8xl font-bold text-foreground md:text-9xl">{t("notfound.title")}</h1>
        <p className="mb-8 font-body text-xl text-muted-foreground">{t("notfound.text")}</p>
        <Button asChild>
          <Link to="/" className="inline-flex items-center gap-2">
            <Home className="h-4 w-4" />
            {t("notfound.back")}
          </Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFound;
