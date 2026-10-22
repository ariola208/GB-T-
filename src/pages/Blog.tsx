import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Calendar, Clock, Heart, MessageCircle, Bookmark, Search, TrendingUp,
  ChevronRight, ArrowRight, Eye,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { localImg } from "@/lib/localImages";

type Post = {
  id: number;
  category: string;
  image: string;
  date: string;
  readMin: number;
  likes: number;
  comments: number;
  views: number;
  featured?: boolean;
  trending?: boolean;
  author: { name: string };
};

const posts: Post[] = [
  { id: 1, category: "voyage", image: localImg("ganvié.jpeg", "cotonou.jpeg"), author: { name: "Sophie Mènou" }, date: "2024-03-15", readMin: 8, likes: 245, comments: 32, featured: true, views: 3421 },
  { id: 2, category: "culture", image: localImg("vodoun_1.jpeg", "ouidah.jpeg"), author: { name: "Marc Hounkpè" }, date: "2024-03-10", readMin: 12, likes: 189, comments: 45, trending: true, views: 2856 },
  { id: 3, category: "photographie", image: localImg("pendjari.jpeg"), author: { name: "Jean Dupont" }, date: "2024-03-05", readMin: 6, likes: 156, comments: 23, views: 1892 },
  { id: 4, category: "gastronomie", image: localImg("gastro_1.jpeg"), author: { name: "Amina Yacoubou" }, date: "2024-02-28", readMin: 7, likes: 278, comments: 51, trending: true, views: 3124 },
  { id: 5, category: "artisanat", image: localImg("bask.jpeg", "abomey.jpeg"), author: { name: "Claire Fontaine" }, date: "2024-02-20", readMin: 5, likes: 134, comments: 18, views: 1456 },
  { id: 6, category: "itineraires", image: localImg("cotonou.jpeg", "portonovo.jpeg"), author: { name: "Sophie Mènou" }, date: "2024-02-15", readMin: 10, likes: 312, comments: 67, trending: true, views: 4123 },
];

const categoryIds = ["all", "voyage", "culture", "gastronomie", "photographie", "artisanat", "itineraires"];
const arr = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);

const Blog = () => {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const texts = arr<{ title: string; excerpt: string }>(t("blog.posts", { returnObjects: true }));
  const tx = (p: Post) => texts[p.id - 1] ?? { title: "", excerpt: "" };
  const fmt = (d: string) => new Date(d).toLocaleDateString(i18n.language);

  const filtered = posts.filter((p) => {
    const q = searchQuery.toLowerCase();
    const { title, excerpt } = tx(p);
    return (
      (title.toLowerCase().includes(q) || excerpt.toLowerCase().includes(q)) &&
      (selectedCategory === "all" || p.category === selectedCategory)
    );
  });

  const toggleLike = (id: number) =>
    setLikedPosts((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));

  const featured = posts.find((p) => p.featured);
  const trending = posts.filter((p) => p.trending);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-24">
        <section className="bg-gradient-to-r from-foreground/10 via-foreground/5 to-foreground/10 py-20">
          <div className="container mx-auto px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge className="mb-4">{t("blog.badge")}</Badge>
              <h1 className="mb-6 font-heading text-5xl font-bold md:text-6xl">{t("blog.title")}</h1>
              <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">{t("blog.subtitle")}</p>
              <div className="relative mx-auto max-w-xl">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t("blog.search")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background py-3 pl-12 pr-4 transition-all focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="sticky top-20 z-20 border-b bg-background/95 py-6 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-2">
              {categoryIds.map((c) => (
                <Button
                  key={c}
                  variant={selectedCategory === c ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(c)}
                  className="transition-transform hover:scale-105"
                >
                  {t(`blog.categories.${c}`)}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {featured && (
          <section className="py-12">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="group relative h-[500px] overflow-hidden rounded-2xl"
              >
                <img
                  src={featured.image}
                  alt=""
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                  <div className="max-w-3xl p-8 md:p-12">
                    <Badge className="mb-4 bg-white text-black">{t("blog.featured")}</Badge>
                    <h2 className="mb-4 font-heading text-3xl font-bold text-white md:text-4xl">
                      {tx(featured).title}
                    </h2>
                    <p className="mb-6 line-clamp-2 text-lg text-white/80">{tx(featured).excerpt}</p>
                    <div className="mb-6 flex items-center gap-4 text-sm text-white/70">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{featured.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <span>{featured.author.name}</span>
                      </div>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {fmt(featured.date)}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {featured.readMin} {t("blog.min")}
                      </span>
                    </div>
                    <Button
                      className="bg-white text-black transition-transform hover:scale-105 hover:bg-white/90"
                      asChild
                    >
                      <Link to={`/blog/${featured.id}`}>
                        {t("blog.read_article")}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <AnimatePresence mode="popLayout">
                    {filtered.map((p) => (
                      <motion.div
                        key={p.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Card className="group flex h-full flex-col overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-dramatic">
                          <div className="relative h-56 overflow-hidden">
                            <img
                              src={p.image}
                              alt=""
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                            />
                            <Badge className="absolute left-3 top-3">
                              {t(`blog.categories.${p.category}`)}
                            </Badge>
                            <Button
                              size="icon"
                              variant="ghost"
                              aria-label="like"
                              className="absolute right-3 top-3 bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/70"
                              onClick={(e) => {
                                e.preventDefault();
                                toggleLike(p.id);
                              }}
                            >
                              <Heart
                                className={`h-4 w-4 ${
                                  likedPosts.includes(p.id) ? "fill-red-500 text-red-500" : ""
                                }`}
                              />
                            </Button>
                          </div>
                          <CardContent className="flex flex-1 flex-col p-4">
                            <h3 className="mb-2 line-clamp-2 font-heading text-xl font-bold">
                              {tx(p).title}
                            </h3>
                            <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                              {tx(p).excerpt}
                            </p>
                            <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Avatar className="h-5 w-5">
                                  <AvatarFallback className="text-[10px]">
                                    {p.author.name[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <span>{p.author.name}</span>
                              </div>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {fmt(p.date)}
                              </span>
                            </div>
                            <div className="mt-auto flex items-center justify-between border-t pt-3">
                              <span className="flex items-center gap-3 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Heart className="h-3 w-3" />
                                  {p.likes}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Eye className="h-3 w-3" />
                                  {p.views}
                                </span>
                              </span>
                              <Button variant="ghost" size="sm" className="group/btn" asChild>
                                <Link to={`/blog/${p.id}`}>
                                  {t("blog.read")}
                                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                                </Link>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                {filtered.length === 0 && (
                  <div className="py-12 text-center">
                    <p className="text-muted-foreground">{t("blog.no_result")}</p>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <Card flat className="transition-all duration-500 hover:shadow-dramatic">
                  <CardContent className="p-6">
                    <h3 className="mb-4 flex items-center gap-2 font-heading text-xl font-bold">
                      <TrendingUp className="h-5 w-5" />
                      {t("blog.trending_title")}
                    </h3>
                    <div className="space-y-4">
                      {trending.map((p) => (
                        <Link key={p.id} to={`/blog/${p.id}`} className="group flex gap-3">
                          <img
                            src={p.image}
                            alt=""
                            className="h-20 w-20 rounded-lg object-cover transition-transform group-hover:scale-105"
                          />
                          <div>
                            <h4 className="line-clamp-2 text-sm font-medium transition group-hover:underline">
                              {tx(p).title}
                            </h4>
                            <p className="mt-1 text-xs text-muted-foreground">
                              {p.readMin} {t("blog.min")}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card flat className="bg-muted/40 transition-all duration-500 hover:shadow-dramatic">
                  <CardContent className="p-6 text-center">
                    <Bookmark className="mx-auto mb-4 h-12 w-12" />
                    <h3 className="mb-2 font-heading text-xl font-bold">{t("blog.newsletter_title")}</h3>
                    <p className="mb-4 text-sm text-muted-foreground">{t("blog.newsletter_text")}</p>
                    <input
                      type="email"
                      placeholder={t("blog.email_ph")}
                      className="mb-3 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <Button className="w-full transition-transform hover:scale-105">
                      {t("blog.subscribe")}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-muted/30 py-16 text-center">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <MessageCircle className="mx-auto mb-4 h-12 w-12 animate-float" />
              <h2 className="mb-4 font-heading text-3xl font-bold">{t("blog.help_title")}</h2>
              <p className="mb-8 text-muted-foreground">{t("blog.help_text")}</p>
              <Button size="lg" asChild className="transition-transform hover:scale-105">
                <Link to="/contact">
                  {t("blog.contact")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
