import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  User,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Search,
  TrendingUp,
  ChevronRight,
  ArrowRight,
  Tag,
  Filter,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const blogPosts = [
  {
    id: 1,
    title: "10 expériences incontournables au Bénin",
    excerpt: "Des palais royaux d'Abomey aux plages de Grand-Popo, découvrez les expériences qui rendront votre voyage inoubliable.",
    image: "https://images.unsplash.com/photo-1590080669915-3d4e68d2e20f?w=800",
    author: { name: "Sophie Mènou", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" },
    date: "2024-03-15",
    readTime: "8 min",
    category: "Voyage",
    tags: ["Destinations", "Culture", "Conseils"],
    likes: 245,
    comments: 32,
    featured: true,
  },
  {
    id: 2,
    title: "Guide complet du Vodoun : histoire et traditions",
    excerpt: "Plongez au cœur de la spiritualité béninoise et découvrez les secrets de cette religion ancestrale.",
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800",
    author: { name: "Marc Hounkpè", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" },
    date: "2024-03-10",
    readTime: "12 min",
    category: "Culture",
    tags: ["Vodoun", "Spiritualité", "Traditions"],
    likes: 189,
    comments: 45,
  },
  {
    id: 3,
    title: "Safari photo au Parc de la Pendjari",
    excerpt: "Conseils et astuces pour réussir vos photos de safari dans l'un des plus beaux parcs d'Afrique de l'Ouest.",
    image: "https://images.unsplash.com/photo-1547970810-dc1e93b62d48?w=800",
    author: { name: "Jean Dupont", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" },
    date: "2024-03-05",
    readTime: "6 min",
    category: "Photographie",
    tags: ["Safari", "Photo", "Pendjari"],
    likes: 156,
    comments: 23,
  },
  {
    id: 4,
    title: "La gastronomie béninoise : un voyage culinaire",
    excerpt: "Du pâte rouge au poulet braisé, explorez les saveurs authentiques de la cuisine béninoise.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    author: { name: "Amina Yacoubou", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" },
    date: "2024-02-28",
    readTime: "7 min",
    category: "Gastronomie",
    tags: ["Cuisine", "Saveurs", "Tradition"],
    likes: 278,
    comments: 51,
  },
  {
    id: 5,
    title: "Rencontre avec les artisans d'Abomey",
    excerpt: "Les appliqués d'Abomey sont mondialement reconnus. Découvrez les secrets de fabrication de ces tapisseries royales.",
    image: "https://images.unsplash.com/photo-1589308078059-be3c3044eccc?w=800",
    author: { name: "Claire Fontaine", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" },
    date: "2024-02-20",
    readTime: "5 min",
    category: "Artisanat",
    tags: ["Artisanat", "Abomey", "Culture"],
    likes: 134,
    comments: 18,
  },
  {
    id: 6,
    title: "Itinéraire de 7 jours pour découvrir le Bénin",
    excerpt: "Un circuit complet pour ne rien manquer des merveilles du Bénin en une semaine.",
    image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800",
    author: { name: "Sophie Mènou", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" },
    date: "2024-02-15",
    readTime: "10 min",
    category: "Itinéraires",
    tags: ["Circuit", "Guide", "Voyage"],
    likes: 312,
    comments: 67,
    trending: true,
  },
];

const categories = ["Tous", "Voyage", "Culture", "Gastronomie", "Photographie", "Artisanat", "Itinéraires"];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Tous" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleLike = (id: number) => {
    setLikedPosts(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const featuredPost = blogPosts.find(p => p.featured);
  const trendingPosts = blogPosts.filter(p => p.trending);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto"
            >
              <Badge className="mb-4">Blog</Badge>
              <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
                Le Blog Bénin Tourisme
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Conseils, récits et inspirations pour votre voyage au Bénin
              </p>
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Rechercher un article..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="py-12">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative rounded-2xl overflow-hidden h-[500px]"
              >
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end">
                  <div className="p-8 md:p-12 max-w-3xl">
                    <Badge className="mb-4 bg-primary">Article en vedette</Badge>
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                      {featuredPost.title}
                    </h2>
                    <p className="text-white/80 text-lg mb-6">{featuredPost.excerpt}</p>
                    <div className="flex items-center gap-4 text-white/70">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={featuredPost.author.avatar} />
                          <AvatarFallback>{featuredPost.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <span>{featuredPost.author.name}</span>
                      </div>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(featuredPost.date).toLocaleDateString("fr-FR")}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                    <Button className="mt-6" asChild>
                      <Link to={`/blog/${featuredPost.id}`}>
                        Lire l'article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Posts Grid */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {filteredPosts.map((post) => (
                    <motion.div key={post.id} variants={fadeInUp}>
                      <Card className="overflow-hidden hover:shadow-lg transition-all h-full flex flex-col">
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                          />
                          <Badge className="absolute top-3 left-3">{post.category}</Badge>
                        </div>
                        <CardContent className="p-4 flex-1 flex flex-col">
                          <h3 className="font-heading text-lg font-bold mb-2 line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <Avatar className="w-5 h-5">
                                <AvatarImage src={post.author.avatar} />
                                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                              </Avatar>
                              <span>{post.author.name}</span>
                            </div>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(post.date).toLocaleDateString("fr-FR")}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => toggleLike(post.id)}
                                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
                              >
                                <Heart className={`w-4 h-4 ${likedPosts.includes(post.id) ? "fill-red-500 text-red-500" : ""}`} />
                                {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                              </button>
                              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                                <MessageCircle className="w-4 h-4" />
                                {post.comments}
                              </span>
                            </div>
                            <Button variant="ghost" size="sm" asChild>
                              <Link to={`/blog/${post.id}`}>
                                Lire
                                <ChevronRight className="w-4 h-4 ml-1" />
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Trending */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-heading text-xl font-bold mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Tendance
                    </h3>
                    <div className="space-y-4">
                      {trendingPosts.map((post) => (
                        <Link key={post.id} to={`/blog/${post.id}`} className="flex gap-3 group">
                          <img src={post.image} alt={post.title} className="w-16 h-16 object-cover rounded-lg" />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
                              {post.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1">{post.readTime}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Newsletter */}
                <Card className="bg-primary/5">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-heading text-xl font-bold mb-2">Newsletter</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Recevez nos derniers articles et conseils de voyage
                    </p>
                    <Input placeholder="Votre email" className="mb-3" />
                    <Button className="w-full">S'abonner</Button>
                  </CardContent>
                </Card>

                {/* Tags Cloud */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-heading text-xl font-bold mb-4">Tags populaires</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Voyage", "Culture", "Vodoun", "Safari", "Photo", "Gastronomie", "Artisanat", "Plage", "UNESCO", "Tradition"].map((tag) => (
                        <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
