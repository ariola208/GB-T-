import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  MapPin, Calendar, Star, Heart, Share2, Search, ChevronRight, Clock, Compass,
  Landmark, TreePine, Waves, Building2, ArrowRight, X, Check, Sun, Thermometer,
  Hotel, LayoutGrid, List as ListIcon,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { useToast } from "../hooks/use-toast";
import { FALLBACK } from "@/lib/localImages";
import { waLink } from "@/lib/whatsapp";
import { useFavorites } from "@/hooks/useFavorites";

const local = import.meta.glob("./placeholder/*.{jpeg,jpg,png}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;
const norm = (s: string) => s.normalize("NFC");
const img = (name: string, fallback: string) => {
  const k = Object.keys(local).find((x) => norm(x) === norm(`./placeholder/${name}`));
  return k ? local[k] : fallback;
};

type Acc = { name: string; type: string; price: number; rating: number; amenities: string[] };
type Dest = {
  id: number; slug: string; name: string; region: string; category: string; image: string;
  rating: number; reviews: number; days: string; priceLevel: number; featured: boolean;
  trending: boolean; temperature: string; activityMeta: { price: number; hours: number }[];
  accommodations: Acc[];
};

const destinations: Dest[] = [
  { id: 1, slug: "ganvie", name: "Ganvié", region: "Atlantique", category: "culture", image: img("ganvié.jpeg", FALLBACK), rating: 4.8, reviews: 1234, days: "1-2", priceLevel: 2, featured: true, trending: true, temperature: "25-32°C",
    activityMeta: [{ price: 15, hours: 2 }, { price: 10, hours: 2 }, { price: 20, hours: 2 }],
    accommodations: [{ name: "Hotel Lac Nokoué", type: "hotel", price: 75, rating: 4.5, amenities: ["wifi", "restaurant", "ac", "lakeview"] }, { name: "Chez Thérèse", type: "guesthouse", price: 35, rating: 4.8, amenities: ["wifi", "homemeal", "terrace", "privatepirogue"] }] },
  { id: 2, slug: "parc-pendjari", name: "Parc National de la Pendjari", region: "Atacora", category: "nature", image: img("pendjari.jpeg", FALLBACK), rating: 4.9, reviews: 856, days: "3-5", priceLevel: 3, featured: true, trending: false, temperature: "18-35°C",
    activityMeta: [{ price: 50, hours: 4 }, { price: 80, hours: 6 }, { price: 25, hours: 3 }],
    accommodations: [{ name: "Pendjari Lodge", type: "lodge", price: 120, rating: 4.7, amenities: ["wifi", "restaurant", "pool", "privateguide"] }, { name: "Campement Tanougou", type: "camping", price: 30, rating: 4.5, amenities: ["tents", "showers", "campfire"] }] },
  { id: 3, slug: "ouidah", name: "Ouidah", region: "Atlantique", category: "historique", image: img("ouidah.jpeg", FALLBACK), rating: 4.7, reviews: 2100, days: "2-3", priceLevel: 2, featured: true, trending: true, temperature: "24-31°C",
    activityMeta: [{ price: 25, hours: 3 }, { price: 30, hours: 2 }, { price: 10, hours: 2 }],
    accommodations: [{ name: "Hotel Diaspora", type: "hotel", price: 60, rating: 4.3, amenities: ["wifi", "restaurant", "pool", "ac"] }] },
  { id: 4, slug: "abomey", name: "Abomey", region: "Zou", category: "historique", image: img("abomey.jpeg", FALLBACK), rating: 4.6, reviews: 945, days: "1-2", priceLevel: 2, featured: false, trending: false, temperature: "22-33°C",
    activityMeta: [{ price: 15, hours: 2 }, { price: 25, hours: 2 }],
    accommodations: [{ name: "Hotel Abomey", type: "hotel", price: 50, rating: 4.2, amenities: ["wifi", "restaurant", "ac"] }] },
  { id: 5, slug: "grand-popo", name: "Grand-Popo", region: "Mono", category: "plage", image: img("grandpopo.jpeg", FALLBACK), rating: 4.5, reviews: 678, days: "2-4", priceLevel: 2, featured: false, trending: false, temperature: "24-31°C",
    activityMeta: [{ price: 0, hours: 0 }, { price: 15, hours: 2 }],
    accommodations: [{ name: "Auberge de Grand-Popo", type: "inn", price: 40, rating: 4.4, amenities: ["wifi", "restaurant", "privatebeach"] }] },
  { id: 6, slug: "cotonou", name: "Cotonou", region: "Littoral", category: "ville", image: img("cotonou.jpeg", FALLBACK), rating: 4.2, reviews: 3400, days: "2-3", priceLevel: 3, featured: false, trending: true, temperature: "24-31°C",
    activityMeta: [{ price: 15, hours: 3 }, { price: 10, hours: 2 }],
    accommodations: [{ name: "Benin Marina Hotel", type: "hotel4", price: 120, rating: 4.5, amenities: ["wifi", "pool", "restaurant", "spa"] }, { name: "Hotel du Port", type: "hotel3", price: 70, rating: 4.2, amenities: ["wifi", "restaurant", "ac"] }] },
  { id: 7, slug: "natitingou", name: "Natitingou", region: "Atacora", category: "nature", image: img("natitingou.jpeg", FALLBACK), rating: 4.6, reviews: 423, days: "2-3", priceLevel: 2, featured: false, trending: false, temperature: "18-33°C",
    activityMeta: [{ price: 20, hours: 3 }, { price: 25, hours: 4 }],
    accommodations: [{ name: "Hotel Tata Somba", type: "hotel", price: 55, rating: 4.3, amenities: ["wifi", "restaurant", "ac"] }] },
  { id: 8, slug: "porto-novo", name: "Porto-Novo", region: "Ouémé", category: "culture", image: img("portonovo.jpeg", FALLBACK), rating: 4.4, reviews: 567, days: "1-2", priceLevel: 2, featured: false, trending: false, temperature: "24-31°C",
    activityMeta: [{ price: 10, hours: 2 }, { price: 20, hours: 3 }],
    accommodations: [{ name: "Hotel Beaurivage", type: "hotel", price: 65, rating: 4.3, amenities: ["wifi", "restaurant", "pool"] }] },
];

const categories = [
  { value: "all", icon: Compass },
  { value: "culture", icon: Landmark },
  { value: "nature", icon: TreePine },
  { value: "plage", icon: Waves },
  { value: "ville", icon: Building2 },
  { value: "historique", icon: Calendar },
];

const catIcon: Record<string, typeof Compass> = {
  culture: Landmark, nature: TreePine, plage: Waves, ville: Building2, historique: Calendar,
};

type ItemText = {
  description: string; longDescription: string; bestTime: string;
  highlights: string[]; activities: string[];
};
const TAB_IDS = ["overview", "highlights", "activities", "accommodations", "info"];

const Destinations = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const heroRef = useRef(null);
  const [selected, setSelected] = useState<Dest | null>(null);
  const [tab, setTab] = useState("overview");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const { isFavorite, toggle } = useFavorites();
  const { hash } = useLocation();

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  const items = t("destinations.items", { returnObjects: true }) as unknown;
  const texts: ItemText[] = Array.isArray(items) ? (items as ItemText[]) : [];
  const tx = (d: Dest): ItemText =>
    texts[d.id - 1] ?? { description: "", longDescription: "", bestTime: "", highlights: [], activities: [] };

  const filtered = destinations.filter((d) => {
    const q = query.trim().toLowerCase();
    const txt = tx(d);
    const hit = !q || d.name.toLowerCase().includes(q) || d.region.toLowerCase().includes(q) || txt.description.toLowerCase().includes(q);
    return hit && (category === "all" || d.category === category);
  });

  // Ouvre la fiche d'une destination via /destinations#slug
  useEffect(() => {
    const d = destinations.find((x) => x.slug === hash.slice(1));
    if (d) { setTab("overview"); setSelected(d); }
  }, [hash]);

  // Échap pour fermer + blocage du scroll derrière la fenêtre
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [selected]);

  const open = (d: Dest) => { setTab("overview"); setSelected(d); };

  const share = async (d: Dest) => {
    const url = `${window.location.origin}/destinations`;
    if (navigator.share) {
      try { await navigator.share({ title: d.name, url }); } catch { /* annulé */ }
    } else {
      try { await navigator.clipboard.writeText(url); toast({ title: t("destinations.link_copied") }); } catch { /* ignore */ }
    }
  };

  const euros = (level: number) => (
    <span className="text-sm tracking-tight" aria-hidden>
      <span className="font-semibold">{"€".repeat(level)}</span>
      <span className="text-muted-foreground/40">{"€".repeat(Math.max(0, 4 - level))}</span>
    </span>
  );

  const dur = (d: Dest) => t("destinations.days_range", { range: d.days });

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section ref={heroRef} className="relative h-[60vh] overflow-hidden">
          <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0">
            <img src={img("abomey.jpeg", FALLBACK)} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
          </motion.div>
          <div className="absolute inset-0 z-10 flex items-center justify-center pt-16 text-center text-white">
            <div className="px-6">
              <Badge className="mb-6 border-white/30 bg-white/20 text-white backdrop-blur-sm">{t("destinations.badge")}</Badge>
              <h1 className="mb-6 font-heading text-5xl font-bold md:text-7xl">{t("destinations.title")}</h1>
              <p className="mx-auto mb-8 max-w-2xl text-xl">{t("destinations.subtitle")}</p>
              <div className="relative mx-auto max-w-xl">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder={t("destinations.search")}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full rounded-xl bg-white py-3 pl-12 pr-4 text-black focus:outline-none focus:ring-2 focus:ring-white/60"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="sticky top-20 z-30 border-b bg-background/95 py-6 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((c) => (
                <Button key={c.value} variant={category === c.value ? "default" : "outline"} size="sm" onClick={() => setCategory(c.value)} className="gap-2">
                  <c.icon className="h-4 w-4" />
                  {t(`destinations.categories.${c.value}`)}
                </Button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="font-heading text-2xl font-bold">{t("destinations.found", { count: filtered.length })}</h2>
                <p className="text-muted-foreground">{t("destinations.found_sub")}</p>
              </div>
              <div className="flex gap-2">
                <Button variant={view === "grid" ? "default" : "outline"} size="icon" onClick={() => setView("grid")} aria-label="grid"><LayoutGrid className="h-4 w-4" /></Button>
                <Button variant={view === "list" ? "default" : "outline"} size="icon" onClick={() => setView("list")} aria-label="list"><ListIcon className="h-4 w-4" /></Button>
              </div>
            </div>

            {filtered.length === 0 && <p className="py-16 text-center text-muted-foreground">{t("destinations.none")}</p>}

            <div className={view === "grid" ? "grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3" : "grid grid-cols-1 gap-6"}>
              {filtered.map((d) => {
                const CatIcon = catIcon[d.category] ?? Compass;
                return (
                  <Card key={d.id} className={`group cursor-pointer overflow-hidden ${view === "list" ? "flex flex-col sm:flex-row" : ""}`} onClick={() => open(d)}>
                    <div className={`relative overflow-hidden ${view === "list" ? "h-56 sm:h-auto sm:w-80 sm:shrink-0" : "h-56"}`}>
                      <img src={d.image} alt={d.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                      
                      <Button size="icon" variant="ghost" aria-label="like"
                        className="absolute right-3 top-3 bg-black/50 text-white hover:bg-black/70"
                        onClick={(e) => { e.stopPropagation(); toggle(d.id); }}>
                        <Heart className={`h-4 w-4 ${isFavorite(d.id) ? "fill-red-500 text-red-500" : ""}`} />
                      </Button>
                      
                      
                    </div>
                    <CardContent className="flex flex-1 flex-col p-5">
                      <h3 className="mb-1 font-heading text-xl font-bold">{d.name}</h3>
                      <p className="mb-3 text-sm text-muted-foreground">{d.region} · {dur(d)}</p>
                      <p className="mb-5 line-clamp-2 text-sm text-muted-foreground">{tx(d).description}</p>
                      <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium">{t("destinations.discover")}<ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-foreground/10 via-foreground/5 to-foreground/10 py-16">
          <div className="container mx-auto px-6 text-center">
            <Compass className="mx-auto mb-6 h-16 w-16" />
            <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">{t("destinations.cta_title")}</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">{t("destinations.cta_text")}</p>
            <Button size="lg" asChild>
              <Link to="/contact">{t("destinations.cta_button")}<ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />

      <AnimatePresence>
        {selected && (
          <motion.div key="modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80" onClick={() => setSelected(null)} />
            <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30 }}
              className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-background">
              <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background p-4">
                <h3 className="font-heading text-2xl font-bold">{selected.name}</h3>
                <Button variant="ghost" size="icon" onClick={() => setSelected(null)} aria-label={t("destinations.close")}><X className="h-5 w-5" /></Button>
              </div>

              <div className="p-6">
                <img src={selected.image} alt={selected.name} className="mb-6 h-80 w-full rounded-xl object-cover" />

                <div className="mb-6 flex flex-wrap gap-2 border-b border-border">
                  {TAB_IDS.map((k) => (
                    <button key={k} onClick={() => setTab(k)}
                      className={`-mb-px border-b-2 px-4 py-2 text-sm font-medium transition-colors ${tab === k ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
                      {t(`destinations.tabs.${k}`)}
                    </button>
                  ))}
                </div>

                {tab === "overview" && (
                  <div>
                    <p className="leading-relaxed text-muted-foreground">{tx(selected).longDescription}</p>
                    <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                      {[
                        { icon: Calendar, value: tx(selected).bestTime, label: t("destinations.best_time") },
                        { icon: Thermometer, value: selected.temperature, label: t("destinations.temperature") },
                        { icon: Clock, value: dur(selected), label: t("destinations.duration") },
                        { icon: Star, value: `${selected.rating}/5`, label: t("destinations.reviews", { count: selected.reviews }) },
                      ].map((s, i) => (
                        <div key={i} className="rounded-lg bg-muted/40 p-4 text-center">
                          <s.icon className="mx-auto mb-2 h-6 w-6" />
                          <p className="font-bold">{s.value}</p>
                          <p className="text-xs text-muted-foreground">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {tab === "highlights" && (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {tx(selected).highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-3 rounded-lg bg-muted/40 p-3"><Check className="h-5 w-5 text-foreground" /><span>{h}</span></div>
                    ))}
                  </div>
                )}

                {tab === "activities" && (
                  <div className="space-y-3">
                    {selected.activityMeta.map((a, i) => (
                      <Card key={i} flat>
                        <CardContent className="flex items-center justify-between p-4">
                          <div>
                            <p className="font-medium">{tx(selected).activities[i]}</p>
                            <p className="text-sm text-muted-foreground">{a.hours === 0 ? t("destinations.free") : `${a.hours}h`}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{a.price === 0 ? t("destinations.free_label") : `${a.price}€`}</p>
                            <Button variant="link" size="sm" className="p-0" asChild><Link to="/contact">{t("destinations.book")}</Link></Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {tab === "accommodations" && (
                  <div className="space-y-3">
                    {selected.accommodations.map((a, i) => (
                      <Card key={i} flat>
                        <CardContent className="flex gap-4 p-4">
                          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-muted/40"><Hotel className="h-8 w-8" /></div>
                          <div className="flex-1">
                            <div className="flex justify-between gap-2">
                              <div>
                                <p className="font-bold">{a.name}</p>
                                <p className="text-sm text-muted-foreground">{t(`destinations.acc_types.${a.type}`)}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold">{a.price}€<span className="text-xs font-normal text-muted-foreground">{t("destinations.per_night")}</span></p>
                                <div className="flex items-center justify-end gap-1"><Star className="h-3 w-3 fill-yellow-500 text-yellow-500" /><span className="text-sm">{a.rating}</span></div>
                              </div>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {a.amenities.map((am) => (<Badge key={am} variant="outline" className="text-xs">{t(`destinations.amenities.${am}`)}</Badge>))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {tab === "info" && (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {[
                      { icon: Sun, title: t("destinations.best_time"), value: tx(selected).bestTime },
                      { icon: Thermometer, title: t("destinations.climate"), value: `${t("destinations.temperature")} : ${selected.temperature}` },
                      { icon: Clock, title: t("destinations.duration"), value: dur(selected) },
                      { icon: MapPin, title: t("destinations.location"), value: `${t("destinations.region")} : ${selected.region}` },
                    ].map((b, i) => (
                      <Card key={i} flat>
                        <CardContent className="p-4">
                          <h4 className="mb-3 flex items-center gap-2 font-bold"><b.icon className="h-4 w-4" />{b.title}</h4>
                          <p>{b.value}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                <div className="mt-6 flex gap-3 border-t pt-6">
                  <Button className="flex-1" asChild><a href={waLink(t("destinations.wa_message", { name: selected.name }))} target="_blank" rel="noopener noreferrer">{t("destinations.book_now")}<ArrowRight className="ml-2 h-4 w-4" /></a></Button>
                  <Button variant="outline" onClick={() => share(selected)}><Share2 className="mr-2 h-4 w-4" />{t("destinations.share")}</Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Destinations;
