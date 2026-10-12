import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center px-6"
      >
        <h1 className="font-heading text-8xl md:text-9xl font-bold text-primary mb-4">
          404
        </h1>
        <p className="font-body text-xl text-muted-foreground mb-8">
          Oups ! Cette page n'existe pas.
        </p>
        <Button asChild>
          <Link to="/" className="inline-flex items-center gap-2">
            <Home className="w-4 h-4" />
            Retour à l'accueil
          </Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFound;
