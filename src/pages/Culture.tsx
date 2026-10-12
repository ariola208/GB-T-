import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Calendar, MapPin, Users, Heart, Church, Sparkles, ChefHat, Hammer, Music,
  Quote, Star, ArrowRight, Download, BookOpen, ChevronRight, Eye,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FALLBACK } from "@/lib/localImages";

// Images locales (src/pages/placeholder/*) : importées proprement, valables aussi après `pnpm build`.
const local = import.meta.glob("./placeholder/*.{jpeg,jpg,png}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;
const img = (name: string, fallback: string) => local[`./placeholder/${name}`] ?? fallback;

const FB = { a: FALLBACK, b: FALLBACK, c: FALLBACK, d: FALLBACK };

const categories = [
  { id: "vodoun", icon: Church, image: img("vodoun_1.jpeg", FB.b),
    gallery: [img("v_1.jpeg", FB.a), img("vodoun_3.jpeg", FB.c), img("vodoun_4.jpeg", FB.d)],
    stats: { temples: 150, practitioners: "2M+", ceremonies: 365 } },
  { id: "gelede", icon: Sparkles, image: img("G_1.jpeg", FB.a),
    gallery: [img("G_2.jpeg", FB.b), img("G_3.jpeg", FB.c)],
    stats: { communities: 50, artisans: 200, festivals: 12 } },
  { id: "gastronomie", icon: ChefHat, image: img("gastro_1.jpeg", FB.d),
    gallery: [img("gastro_2.jpeg", FB.a), img("gastro_3.jpeg", FB.b)],
    stats: { recipes: 500, restaurants: 1000, markets: 77 } },
  { id: "artisanat", icon: Hammer, image: img("bask.jpeg", FB.c),
    gallery: [img("pot.jpeg", FB.a), img("bronze.jpeg", FB.b)],
    stats: { artisans: 5000, workshops: 300, cooperatives: 45 } },
  { id: "musique", icon: Music, image: img("danse.png", FB.a),
    gallery: [img("tambours.jpeg", FB.b), FB.c],
    stats: { instruments: 50, troupes: 200, festivals: 8 } },
  { id: "fetes", icon: Calendar, image: FB.a,
    gallery: [FB.b, FB.c],
    stats: { festivals: 30, participants: "100K+", events: 365 } },
];

const eventMeta = [
  { image: img("vodoun_1.jpeg", FALLBACK), attendees: 5000 },
  { image: img("G_1.jpeg", FALLBACK), attendees: 3000 },
  { image: img("gastro_1.jpeg", FALLBACK), attendees: 2000 },
  { image: img("tambours.jpeg", img("ouidah.jpeg", FALLBACK)), attendees: 4000 },
];

const testimonialMeta = [
  { name: "Marie-Claire Hounga", rating: 5 },
  { name: "Thomas Dubois", rating: 5 },
  { name: "Aïssatou Diallo", rating: 5 },
];

const arr = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);

type CatText = { title: string; subtitle: string; longDescription: string; traditions: string[] };

const Culture = () => {
  const { t, i18n } = useTranslation();
  const [active, setActive] = useState(0);
  const [liked, setLiked] = useState<number[]>([]);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const texts = arr<CatText>(t("culture.categories", { returnObjects: true }));
  const events = arr<{ title: string; date: string; location: string; category: string }>(
    t("culture.events", { returnObjects: true })
  );
  const reviews = arr<{ role: string; content: string }>(t("culture.testimonials", { returnObjects: true }));

  const cat = categories[active];
  const txt = texts[active];
  const toggleLike = (i: number) =>
    setLiked((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section ref={heroRef} className="relative h-screen overflow-hidden">
          <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="absolute inset-0">
            <img src={img("vodoun_1.jpeg", img("G_1.jpeg", FALLBACK))} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-black/55" />
          </motion.div>

          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="px-6 text-center text-white"
            >
              <Badge className="mb-6 border-white/30 bg-white/20 text-white backdrop-blur-sm">
                {t("culture.hero_badge")}
              </Badge>
              <h1 className="mb-6 font-heading text-6xl font-bold md:text-8xl">
                {t("culture.hero_title_1")}
                <br />
                {t("culture.hero_title_2")}
              </h1>
              <p className="mx-auto max-w-3xl font-body text-xl text-white/90 md:text-2xl">
                {t("culture.hero_subtitle")}
              </p>
              <div className="mt-8 flex justify-center">
                <Button size="lg" className="bg-white text-black hover:bg-white/90"
                  onClick={() => document.getElementById("traditions")?.scrollIntoView({ behavior: "smooth" })}>
                  {t("culture.hero_cta")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Introduction */}
        <section className="bg-gradient-to-b from-background to-muted/30 py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto max-w-4xl text-center"
            >
              <Badge className="mb-4">{t("culture.intro_badge")}</Badge>
              <h2 className="mb-6 font-heading text-4xl font-bold md:text-5xl">{t("culture.intro_title")}</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">{t("culture.intro_text")}</p>
            </motion.div>
          </div>
        </section>

        {/* Catégories */}
        <section id="traditions" className="py-16">
          <div className="container mx-auto px-6">
            <div className="mb-12 grid grid-cols-3 gap-2 md:grid-cols-6">
              {categories.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => setActive(i)}
                  className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-xs transition-all ${
                    active === i
                      ? "border-foreground bg-foreground text-background shadow-lg"
                      : "border-border hover:border-foreground/50 hover:bg-muted"
                  }`}
                >
                  <c.icon className="h-6 w-6" />
                  <span className="hidden text-center md:block">{texts[i]?.title}</span>
                </button>
              ))}
            </div>

            {txt && (
              <motion.div key={cat.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="mb-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
                  <div>
                    <div className="mb-6 inline-flex rounded-lg bg-foreground p-3 text-background">
                      <cat.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-4 font-heading text-4xl font-bold">{txt.title}</h3>
                    <p className="mb-6 text-xl text-muted-foreground">{txt.subtitle}</p>
                    <p className="mb-8 leading-relaxed text-muted-foreground">{txt.longDescription}</p>

                    <div className="mb-8 grid grid-cols-3 gap-4">
                      {Object.entries(cat.stats).map(([key, value]) => (
                        <div key={key} className="rounded-lg bg-muted/40 p-4 text-center">
                          <p className="font-heading text-2xl font-bold">{value}</p>
                          <p className="text-xs text-muted-foreground">{t(`culture.stat_labels.${key}`)}</p>
                        </div>
                      ))}
                    </div>

                    <h4 className="mb-4 font-bold">{t("culture.key_traditions")}</h4>
                    <div className="flex flex-wrap gap-2">
                      {txt.traditions.map((tr, i) => (
                        <Badge key={i} variant="outline" className="py-2 text-sm">{tr}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="relative h-[400px] overflow-hidden rounded-xl lg:h-auto">
                    <img src={cat.image} alt={txt.title} className="h-full w-full object-cover" />
                  </div>
                </div>

                <div className="mt-12">
                  <h4 className="mb-6 font-heading text-2xl font-bold">{t("culture.gallery")}</h4>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    {cat.gallery.map((g, i) => (
                      <motion.div
                        key={g + i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="group relative h-48 cursor-pointer overflow-hidden rounded-lg"
                      >
                        <img src={g} alt={`${txt.title} ${i + 1}`} loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                          <Eye className="h-8 w-8 text-white" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Événements */}
        <section className="bg-muted/30 py-20">
          <div className="container mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
              <Badge className="mb-4">{t("culture.events_badge")}</Badge>
              <h2 className="mb-4 font-heading text-4xl font-bold">{t("culture.events_title")}</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">{t("culture.events_text")}</p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {eventMeta.map((m, i) => {
                const e = events[i];
                if (!e) return null;
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    <Card className="group overflow-hidden">
                      <div className="relative h-48 overflow-hidden">
                        <img src={m.image} alt={e.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <Badge className="absolute left-3 top-3 bg-black/50 backdrop-blur-sm">{e.category}</Badge>
                        <Button size="icon" variant="ghost" aria-label="like"
                          className="absolute right-3 top-3 bg-black/50 text-white hover:bg-black/70"
                          onClick={() => toggleLike(i)}>
                          <Heart className={`h-4 w-4 ${liked.includes(i) ? "fill-red-500 text-red-500" : ""}`} />
                        </Button>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="mb-2 line-clamp-1 font-bold">{e.title}</h3>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <p className="flex items-center gap-2"><Calendar className="h-4 w-4" />{e.date}</p>
                          <p className="flex items-center gap-2"><MapPin className="h-4 w-4" />{e.location}</p>
                          <p className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            {t("culture.participants", { count: m.attendees.toLocaleString(i18n.language) as any })}
                          </p>
                        </div>
                        <Button variant="link" className="mt-4 p-0" asChild>
                          <Link to="/contact" className="flex items-center gap-1">
                            {t("culture.register")}
                            <ChevronRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Témoignages */}
        {/* Témoignages retirés : à remettre avec de vrais avis */}

        {/* Newsletter */}
        <section className="bg-gradient-to-r from-foreground/10 via-foreground/5 to-foreground/10 py-20">
          <div className="container mx-auto px-6 text-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="mx-auto max-w-2xl">
              <BookOpen className="mx-auto mb-6 h-12 w-12" />
              <h2 className="mb-4 font-heading text-3xl font-bold">{t("culture.newsletter_title")}</h2>
              <p className="mb-8 text-muted-foreground">{t("culture.newsletter_text")}</p>
              <div className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
                <input type="email" placeholder={t("culture.email_ph")}
                  className="flex-1 rounded-lg border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring" />
                <Button>{t("culture.download")}<Download className="ml-2 h-4 w-4" /></Button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">{t("culture.newsletter_note")}</p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Culture;
