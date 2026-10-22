import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Heart, MapPin, Star, Trash2, ArrowRight, Compass, Dices } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useFavorites } from "@/hooks/useFavorites";

const Favoris = () => {
  const { t } = useTranslation();
  const { favorites, remove, clear } = useFavorites();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-32">
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background py-16">
          <div className="pointer-events-none absolute -top-32 right-0 h-72 w-72 rounded-full bg-secondary/20 blur-3xl animate-float" />
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mx-auto max-w-4xl"
            >
              <Badge className="mb-6 bg-secondary/20 text-secondary-foreground">
                <Heart className="mr-1 h-3 w-3 fill-current" />
                {t("favorites.badge", "Mes coups de cœur")}
              </Badge>
              <h1 className="font-heading text-5xl font-bold md:text-7xl">
                {t("favorites.title", "Mes favoris")}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                {t("favorites.subtitle", "Retrouvez ici toutes les destinations que vous avez aimées.")}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-6">
            {favorites.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mx-auto max-w-2xl rounded-3xl border border-border bg-card p-12 text-center shadow-dramatic"
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary/20 animate-float">
                  <Heart className="h-10 w-10 text-secondary" />
                </div>
                <h2 className="mb-4 font-heading text-3xl font-bold">
                  {t("favorites.empty_title", "Votre liste est vide")}
                </h2>
                <p className="mb-8 text-muted-foreground">
                  {t("favorites.empty_text", "Explorez nos destinations et cliquez sur le cœur pour les ajouter ici.")}
                </p>
                <Button size="lg" asChild className="transition-transform hover:scale-105">
                  <Link to="/destinations">
                    <Compass className="mr-2 h-4 w-4" />
                    {t("favorites.explore", "Explorer les destinations")}
                  </Link>
                </Button>
              </motion.div>
            ) : (
              <>
                <div className="mb-8 flex items-center justify-between">
                  <p className="text-muted-foreground">
                    {t("favorites.count", "{{count}} destination(s) enregistrée(s)", {
                      count: favorites.length,
                    })}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clear}
                    className="text-destructive transition-transform hover:scale-105 hover:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    {t("favorites.clear_all", "Tout supprimer")}
                  </Button>
                </div>

                <motion.div
                  layout
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                >
                  <AnimatePresence>
                    {favorites.map((fav) => (
                      <motion.div
                        key={fav.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="group overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-dramatic">
                          <div className="relative h-48 overflow-hidden">
                            {fav.image ? (
                              <img
                                src={fav.image}
                                alt={fav.name}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-muted">
                                <MapPin className="h-8 w-8 text-muted-foreground" />
                              </div>
                            )}
                            <button
                              onClick={() => remove(fav.id)}
                              aria-label="Retirer des favoris"
                              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-destructive transition-transform hover:scale-110 hover:bg-white"
                            >
                              <Heart className="h-4 w-4 fill-current" />
                            </button>
                            {fav.region && (
                              <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-sm">
                                <MapPin className="h-3 w-3" />
                                {fav.region}
                              </div>
                            )}
                          </div>
                          <CardContent className="p-4">
                            <div className="mb-2 flex items-start justify-between gap-2">
                              <h3 className="font-heading text-lg font-bold">{fav.name}</h3>
                              {fav.rating != null && (
                                <div className="flex shrink-0 items-center gap-1">
                                  <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                                  <span className="text-sm font-medium">{fav.rating}</span>
                                </div>
                              )}
                            </div>
                            {fav.description && (
                              <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                                {fav.description}
                              </p>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              className="group/btn w-full transition-transform hover:scale-105"
                              asChild
                            >
                              <Link to={fav.slug ? `/destinations#${fav.slug}` : "/destinations"}>
                                {t("favorites.view", "Voir la destination")}
                                <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                              </Link>
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-12 rounded-3xl border border-border bg-gradient-to-r from-primary/10 via-secondary/5 to-accent/10 p-8 text-center"
                >
                  <Dices className="mx-auto mb-4 h-10 w-10 text-secondary animate-float" />
                  <h3 className="mb-2 font-heading text-2xl font-bold">
                    {t("favorites.cta_title", "Envie d'explorer plus ?")}
                  </h3>
                  <p className="mb-6 text-muted-foreground">
                    {t("favorites.cta_text", "Découvrez d'autres destinations ou laissez-vous surprendre.")}
                  </p>
                  <Button asChild className="transition-transform hover:scale-105">
                    <Link to="/destinations">
                      {t("favorites.cta_button", "Voir toutes les destinations")}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Favoris;
