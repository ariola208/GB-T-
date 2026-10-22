import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  X, ChevronLeft, ChevronRight, Heart, Download, Share2, Grid3x3, Grid2x2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { localImg, localNames } from "@/lib/localImages";
import { useToast } from "@/hooks/use-toast";

type Meta = { cat: string; place?: string; theme?: string };

const META_RAW: Record<string, Meta> = {
  "ganvié.jpeg": { cat: "culture", place: "Ganvié" },
  "pendjari.jpeg": { cat: "wildlife", place: "Pendjari" },
  "ouidah.jpeg": { cat: "traditions", place: "Ouidah" },
  "abomey.jpeg": { cat: "culture", place: "Abomey" },
  "grandpopo.jpeg": { cat: "beaches", place: "Grand-Popo" },
  "cotonou.jpeg": { cat: "cities", place: "Cotonou" },
  "natitingou.jpeg": { cat: "landscapes", place: "Natitingou" },
  "portonovo.jpeg": { cat: "cities", place: "Porto-Novo" },
  "vodoun_1.jpeg": { cat: "traditions", theme: "vodoun" },
  "v_1.jpeg": { cat: "traditions", theme: "vodoun" },
  "vodoun_3.jpeg": { cat: "traditions", theme: "vodoun" },
  "vodoun_4.jpeg": { cat: "traditions", theme: "vodoun" },
  "egungun.jpeg": { cat: "traditions", theme: "egungun" },
  "G_1.jpeg": { cat: "traditions", theme: "gelede" },
  "G_2.jpeg": { cat: "traditions", theme: "gelede" },
  "G_3.jpeg": { cat: "traditions", theme: "gelede" },
  "gastro_1.jpeg": { cat: "culture", theme: "gastronomie" },
  "gastro_2.jpeg": { cat: "culture", theme: "gastronomie" },
  "gastro_3.jpeg": { cat: "culture", theme: "gastronomie" },
  "bask.jpeg": { cat: "culture", theme: "vannerie" },
  "pot.jpeg": { cat: "culture", theme: "poterie" },
  "bronze.jpeg": { cat: "culture", theme: "bronze" },
  "danse.png": { cat: "traditions", theme: "danse" },
  "tambours.jpeg": { cat: "traditions", theme: "tambours" },
};
const META: Record<string, Meta> = Object.fromEntries(
  Object.entries(META_RAW).map(([k, v]) => [k.normalize("NFC"), v])
);

type Item = { id: string; src: string; category: string; place?: string; theme?: string; fallback: string };

const ITEMS: Item[] = localNames().map((name) => {
  const m = META[name];
  return {
    id: name,
    src: localImg(name),
    category: m?.cat ?? "culture",
    place: m?.place,
    theme: m?.theme,
    fallback: name.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " "),
  };
});

const CATEGORY_IDS = ["landscapes", "culture", "wildlife", "cities", "beaches", "traditions"];

const Gallery = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selected, setSelected] = useState<Item | null>(null);
  const [viewMode, setViewMode] = useState<"grid3" | "grid2">("grid3");
  const [liked, setLiked] = useState<string[]>([]);

  const titleOf = (i: Item) => i.place ?? (i.theme ? t(`gallery.themes.${i.theme}`) : i.fallback);
  const present = CATEGORY_IDS.filter((c) => ITEMS.some((i) => i.category === c));
  const filtered = selectedCategory === "all" ? ITEMS : ITEMS.filter((i) => i.category === selectedCategory);

  const toggleLike = (id: string) =>
    setLiked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const step = (dir: 1 | -1) => {
    if (!selected || filtered.length === 0) return;
    const idx = filtered.findIndex((i) => i.id === selected.id);
    setSelected(filtered[(idx + dir + filtered.length) % filtered.length]);
  };

  const share = async (title: string) => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title, url }); } catch { /* annulé */ }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        toast({ title: t("destinations.link_copied") });
      } catch { /* ignore */ }
    }
  };

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-24">
        <section className="bg-gradient-to-r from-foreground/10 via-foreground/5 to-foreground/10 py-16">
          <div className="container mx-auto px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl">
              <Badge className="mb-4">{t("gallery.badge")}</Badge>
              <h1 className="mb-6 font-heading text-5xl font-bold md:text-6xl">{t("gallery.title")}</h1>
              <p className="text-xl text-muted-foreground">{t("gallery.subtitle")}</p>
            </motion.div>
          </div>
        </section>

        <section className="sticky top-20 z-10 border-b border-border bg-background/95 py-6 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {["all", ...present].map((c) => (
                  <Button
                    key={c}
                    variant={selectedCategory === c ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(c)}
                    className="transition-transform hover:scale-105"
                  >
                    {t(`gallery.categories.${c}`)}
                  </Button>
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid3" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid3")}
                  aria-label="grid 3"
                  className="transition-transform hover:scale-105"
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "grid2" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid2")}
                  aria-label="grid 2"
                  className="transition-transform hover:scale-105"
                >
                  <Grid2x2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-6">
            {ITEMS.length === 0 && (
              <p className="py-16 text-center text-muted-foreground">{t("gallery.empty")}</p>
            )}
            <motion.div
              key={selectedCategory + viewMode}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05 } },
              }}
              className={`grid gap-4 ${
                viewMode === "grid3"
                  ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                  : "grid-cols-1 md:grid-cols-2"
              }`}
            >
              {filtered.map((img) => (
                <motion.div
                  key={img.id}
                  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
                  }}
                  className="group relative cursor-pointer"
                  onClick={() => setSelected(img)}
                >
                  <div className="relative aspect-square overflow-hidden rounded-lg">
                    <img
                      src={img.src}
                      alt={titleOf(img)}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-end bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="w-full p-4">
                        <h3 className="font-bold text-white">{titleOf(img)}</h3>
                      </div>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label="like"
                      className="absolute right-3 top-3 bg-black/50 text-white opacity-0 transition-opacity hover:bg-black/70 group-hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(img.id);
                      }}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          liked.includes(img.id) ? "fill-red-500 text-red-500" : ""
                        }`}
                      />
                    </Button>
                    <Badge className="absolute left-3 top-3 bg-black/50 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                      {t(`gallery.categories.${img.category}`)}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />

      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[60] flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-black/95" onClick={() => setSelected(null)} />
          <div className="relative z-10 mx-4 w-full max-w-6xl">
            <img
              src={selected.src}
              alt={titleOf(selected)}
              className="max-h-[80vh] w-full rounded-lg object-contain"
            />
            <div className="absolute right-4 top-4 flex gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="bg-black/50 text-white transition-transform hover:scale-110 hover:bg-black/70"
                onClick={() => toggleLike(selected.id)}
                aria-label="like"
              >
                <Heart
                  className={`h-4 w-4 ${
                    liked.includes(selected.id) ? "fill-red-500 text-red-500" : ""
                  }`}
                />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="bg-black/50 text-white transition-transform hover:scale-110 hover:bg-black/70"
                onClick={() => share(titleOf(selected))}
                aria-label="share"
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                asChild
                className="bg-black/50 text-white transition-transform hover:scale-110 hover:bg-black/70"
              >
                <a href={selected.src} download aria-label="download">
                  <Download className="h-4 w-4" />
                </a>
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="bg-black/50 text-white transition-transform hover:scale-110 hover:bg-black/70"
                onClick={() => setSelected(null)}
                aria-label="close"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white transition-transform hover:scale-110 hover:bg-black/70"
              onClick={() => step(-1)}
              aria-label="previous"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white transition-transform hover:scale-110 hover:bg-black/70"
              onClick={() => step(1)}
              aria-label="next"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-bold">{titleOf(selected)}</h3>
              <p className="text-white/80">{t(`gallery.categories.${selected.category}`)}</p>
            </div>
            <div className="absolute bottom-4 right-4 text-sm text-white/60">
              {filtered.findIndex((i) => i.id === selected.id) + 1} / {filtered.length}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Gallery;
