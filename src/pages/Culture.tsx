import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronRight,
  Calendar,
  MapPin,
  Users,
  Heart,
  Share2,
  BookOpen,
  Music,
  ChefHat,
  Palette,
  Church,
  Sparkles,
  Quote,
  Star,
  Clock,
  ArrowRight,
  Download,
  Eye,
  MessageCircle,
  Send,
  Bookmark,
  Globe,
  Award,
  Camera,
  Video,
  Headphones,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fadeInUp, staggerContainer, fadeIn, scaleIn } from "@/lib/animations";

// Images (à remplacer par vos propres images)
const heroVideo = "https://player.vimeo.com/external/371867846.hd.mp4?s=7b7c0c5c5e5c5c5c5c5c5c5c5c5c5c5c&profile_id=174";
const cultureImg = "https://images.unsplash.com/photo-1590080669915-3d4e68d2e20f?w=1200";

// Données enrichies
const culturalCategories = [
  {
    id: "vodoun",
    title: "Le Vodoun",
    subtitle: "Spiritualité ancestrale",
    description: "Religion traditionnelle née au Bénin, le vodoun est bien plus qu'une simple croyance : c'est un mode de vie, une philosophie et un lien sacré avec les ancêtres et les forces de la nature. Chaque année, le 10 janvier, la Fête Nationale du Vodoun attire des milliers de fidèles et de curieux du monde entier à Ouidah.",
    longDescription: "Le panthéon vodoun compte des centaines de divinités, chacune associée à des éléments naturels, des phénomènes ou des aspects de la vie humaine. Les cérémonies, rythmées par les tambours sacrés, sont des moments de communion intense où les adeptes entrent en transe pour communiquer avec les esprits. Les féticheurs, gardiens de cette tradition millénaire, perpétuent des rituels complexes mêlant offrandes, danses et chants sacrés.",
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1590080669915-3d4e68d2e20f?w=600",
      "https://images.unsplash.com/photo-1589308078059-be3c3044eccc?w=600",
      "https://images.unsplash.com/photo-1547970810-dc1e93b62d48?w=600",
    ],
    icon: Church,
    color: "from-purple-500 to-pink-500",
    stats: { temples: 150, practitioners: "2M+", ceremonies: 365 },
    traditions: [
      "Fête du Vodoun (10 janvier)",
      "Culte des ancêtres",
      "Cérémonies Egungun",
      "Consultation du Fâ",
    ],
    videoUrl: "https://player.vimeo.com/external/371867846.hd.mp4?s=7b7c0c5c5e5c5c5c5c5c5c5c5c5c5c5c&profile_id=174",
  },
  {
    id: "gelede",
    title: "Les Gélédé",
    subtitle: "Patrimoine de l'UNESCO",
    description: "Les masques Gélédé, inscrits au patrimoine culturel immatériel de l'UNESCO depuis 2008, sont des spectacles rituels célébrant la puissance féminine et la sagesse des mères ancestrales. Ces cérémonies spectaculaires mêlent danse, musique et poésie satirique.",
    longDescription: "La société Gélédé est une institution séculaire qui honore le pouvoir spirituel des femmes, particulièrement des mères âgées, appelées 'awon iya wa' (nos mères). Les masques, véritables œuvres d'art, sont sculptés dans du bois et richement décorés. Les danseurs, exclusivement masculins, portent ces masques imposants et exécutent des chorégraphies complexes au son des tambours, créant un spectacle hypnotique qui peut durer toute une journée.",
    image: "https://images.unsplash.com/photo-1590080669915-3d4e68d2e20f?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600",
      "https://images.unsplash.com/photo-1589308078059-be3c3044eccc?w=600",
    ],
    icon: Palette,
    color: "from-orange-500 to-red-500",
    stats: { communities: 50, artisans: 200, festivals: 12 },
    traditions: [
      "Cérémonie Efe (nuit)",
      "Cérémonie Gélédé (jour)",
      "Chants satiriques",
      "Danses acrobatiques",
    ],
    videoUrl: "https://player.vimeo.com/external/371867846.hd.mp4?s=7b7c0c5c5e5c5c5c5c5c5c5c5c5c5c5c&profile_id=174",
  },
  {
    id: "gastronomie",
    title: "La Gastronomie",
    subtitle: "Saveurs authentiques",
    description: "Du pâte rouge au poulet braisé, en passant par l'amiwo et le tchoukoutou (bière de mil), la cuisine béninoise est une explosion de saveurs qui reflète la diversité culturelle du pays. Chaque région possède ses spécialités uniques, transmises de génération en génération.",
    longDescription: "La cuisine béninoise est un art de vivre. Les marchés colorés regorgent de produits frais : ignames, manioc, maïs, piments, poissons du lac, viandes savoureuses. Les sauces, véritables signatures des cuisinières, peuvent mijoter pendant des heures pour atteindre la perfection. Ne manquez pas l'akassa (pâte de maïs fermentée), le wô (purée de haricots), ou encore l'atchomon (sauce gluante au gombo).",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
    ],
    icon: ChefHat,
    color: "from-green-500 to-emerald-500",
    stats: { recipes: 500, restaurants: 1000, markets: 77 },
    traditions: [
      "Pâte rouge",
      "Poulet braisé",
      "Amiwo",
      "Tchoukoutou",
      "Akassa",
    ],
  },
  {
    id: "artisanat",
    title: "L'Artisanat",
    subtitle: "Savoir-faire ancestral",
    description: "Les artisans béninois excellent dans le travail du bronze, la poterie, le tissage et la sculpture sur bois. Les appliqués d'Abomey, tapisseries royales qui racontent l'histoire du royaume du Dahomey, sont mondialement reconnus pour leur finesse d'exécution.",
    longDescription: "L'artisanat béninois est le gardien de techniques séculaires. Les fondeurs de bronze utilisent la technique de la cire perdue, héritée des anciens royaumes. Les potières de Tourou créent des canaris aux formes parfaites sans tour. Les tisserands du Nord produisent des étoffes en coton aux motifs géométriques chargés de sens. Chaque objet raconte une histoire, porte un message, transmet une tradition.",
    image: "https://images.unsplash.com/photo-1589308078059-be3c3044eccc?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1547970810-dc1e93b62d48?w=600",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600",
    ],
    icon: Palette,
    color: "from-amber-500 to-yellow-500",
    stats: { artisans: 5000, workshops: 300, cooperatives: 45 },
    traditions: [
      "Bronze à la cire perdue",
      "Appliqués d'Abomey",
      "Poterie de Tourou",
      "Tissage du Nord",
    ],
  },
  {
    id: "musique",
    title: "Musique & Danse",
    subtitle: "Le rythme dans le sang",
    description: "La musique béninoise est un kaléidoscope de rythmes et de traditions. Du zinli au tchinkounmè, en passant par le moderne agbadja, chaque région a développé son propre langage musical, ses instruments spécifiques et ses danses caractéristiques.",
    longDescription: "Les tambours sont au cœur de la vie sociale et spirituelle. Le tam-tam parleur reproduit les intonations de la langue fon. Les orchestres de cuivres animent les fêtes populaires. Aujourd'hui, des artistes comme Angélique Kidjo font rayonner la musique béninoise dans le monde entier, fusionnant traditions ancestrales et sonorités contemporaines.",
    image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1590080669915-3d4e68d2e20f?w=600",
      "https://images.unsplash.com/photo-1589308078059-be3c3044eccc?w=600",
    ],
    icon: Music,
    color: "from-blue-500 to-cyan-500",
    stats: { instruments: 50, troupes: 200, festivals: 8 },
    traditions: [
      "Zinli",
      "Tchinkounmè",
      "Agbadja moderne",
      "Tambours parleurs",
    ],
  },
  {
    id: "fetes",
    title: "Fêtes Traditionnelles",
    subtitle: "Célébrations ancestrales",
    description: "Le calendrier béninois est rythmé par de nombreuses fêtes traditionnelles qui célèbrent les récoltes, honorent les divinités ou commémorent des événements historiques. Ces célébrations sont des moments privilégiés pour découvrir l'âme du Bénin.",
    longDescription: "La fête des ignames en pays Mahi, la fête du Nonvitcha à Grand-Popo, les cérémonies de sortie de couvent vodoun... Chaque célébration est unique et mobilise toute la communauté. Les visiteurs sont souvent invités à participer, dans une ambiance de partage et de convivialité inégalée.",
    image: "https://images.unsplash.com/photo-1590080669915-3d4e68d2e20f?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600",
      "https://images.unsplash.com/photo-1589308078059-be3c3044eccc?w=600",
    ],
    icon: Calendar,
    color: "from-red-500 to-pink-500",
    stats: { festivals: 30, participants: "100K+", events: 365 },
    traditions: [
      "Fête des ignames",
      "Nonvitcha",
      "Sortie de couvent",
      "Fête du Vodoun",
    ],
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: "Festival International du Vodoun",
    date: "10 Janvier 2025",
    location: "Ouidah",
    image: "https://images.unsplash.com/photo-1590080669915-3d4e68d2e20f?w=400",
    category: "Religion",
    attendees: 5000,
  },
  {
    id: 2,
    title: "Festival des Masques Gélédé",
    date: "15-17 Mars 2025",
    location: "Kétou",
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400",
    category: "Danse",
    attendees: 3000,
  },
  {
    id: 3,
    title: "Fête des Ignames",
    date: "5 Août 2025",
    location: "Savalou",
    image: "https://images.unsplash.com/photo-1589308078059-be3c3044eccc?w=400",
    category: "Tradition",
    attendees: 2000,
  },
  {
    id: 4,
    title: "Festival de Jazz de Ouidah",
    date: "20-22 Septembre 2025",
    location: "Ouidah",
    image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=400",
    category: "Musique",
    attendees: 4000,
  },
];

const testimonials = [
  {
    id: 1,
    name: "Marie-Claire Hounga",
    role: "Guide culturelle",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    content: "Participer aux cérémonies vodoun a été une expérience transformatrice. La puissance des tambours, l'énergie des danseurs, la ferveur des fidèles... C'est une immersion totale dans une spiritualité vivante.",
    rating: 5,
  },
  {
    id: 2,
    name: "Thomas Dubois",
    role: "Ethnologue",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    content: "Les appliqués d'Abomey sont des chefs-d'œuvre qui racontent l'histoire du Dahomey. Chaque motif a une signification précise. C'est fascinant de voir ces artisans perpétuer un savoir-faire séculaire.",
    rating: 5,
  },
  {
    id: 3,
    name: "Aïssatou Diallo",
    role: "Cheffe cuisinière",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
    content: "La cuisine béninoise est une découverte à chaque bouchée. Les sauces sont complexes, les épices parfaitement dosées. J'ai pris des cours de cuisine à Cotonou, une expérience inoubliable !",
    rating: 5,
  },
];

const Culture = () => {
  const [selectedCategory, setSelectedCategory] = useState(culturalCategories[0]);
  const [activeTab, setActiveTab] = useState("overview");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleLike = (id: number) => {
    setLikedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section avec Vidéo */}
        <section ref={heroRef} className="relative h-screen overflow-hidden">
          <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="absolute inset-0">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              loop
              muted={isMuted}
              autoPlay
            >
              <source src={heroVideo} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/50" />
          </motion.div>

          {/* Video Controls */}
          <div className="absolute bottom-8 right-8 flex gap-4 z-20">
            <Button
              size="icon"
              variant="outline"
              className="bg-black/50 border-white/20 text-white hover:bg-black/70"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="bg-black/50 border-white/20 text-white hover:bg-black/70"
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
          </div>

          {/* Hero Content */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-center text-white px-6"
            >
              <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                Découvrez l'âme du Bénin
              </Badge>
              <h1 className="font-heading text-6xl md:text-8xl font-bold mb-6">
                Culture &<br />Traditions
              </h1>
              <p className="font-body text-xl md:text-2xl max-w-3xl mx-auto text-white/90">
                Plongez au cœur des traditions millénaires qui font la richesse du Bénin
              </p>
              <div className="flex gap-4 justify-center mt-8">
                <Button size="lg" className="bg-white text-black hover:bg-white/90">
                  Explorer les traditions
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  <Play className="w-4 h-4 mr-2" />
                  Voir la bande-annonce
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          >
            <div className="flex flex-col items-center gap-2 text-white/70">
              <span className="text-sm">Défiler pour découvrir</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
              >
                <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Introduction Section */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.div variants={fadeInUp}>
                <Badge className="mb-4">Notre héritage</Badge>
                <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
                  Un patrimoine culturel exceptionnel
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Le Bénin est un carrefour de civilisations où se mêlent traditions ancestrales et expressions contemporaines. 
                  Des palais royaux d'Abomey aux cérémonies vodoun de Ouidah, en passant par les marchés colorés et les festivals vibrants, 
                  chaque recoin du pays raconte une histoire fascinante.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Interactive Categories */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <Tabs defaultValue="vodoun" className="space-y-12">
              <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2 bg-transparent h-auto p-1">
                {culturalCategories.map((cat) => (
                  <TabsTrigger
                    key={cat.id}
                    value={cat.id}
                    className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-primary/10"
                    onClick={() => setSelectedCategory(cat)}
                  >
                    <cat.icon className="w-6 h-6" />
                    <span className="hidden md:block text-xs">{cat.title}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {culturalCategories.map((category) => (
                <TabsContent key={category.id} value={category.id}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Category Header */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                      <div>
                        <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${category.color} mb-6`}>
                          <category.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-heading text-4xl font-bold mb-4">{category.title}</h3>
                        <p className="text-xl text-muted-foreground mb-6">{category.subtitle}</p>
                        <p className="text-muted-foreground leading-relaxed mb-8">
                          {category.longDescription}
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                          {Object.entries(category.stats).map(([key, value]) => (
                            <div key={key} className="text-center p-4 bg-muted/30 rounded-lg">
                              <p className="font-heading text-2xl font-bold">{value}</p>
                              <p className="text-xs text-muted-foreground capitalize">{key}</p>
                            </div>
                          ))}
                        </div>

                        {/* Traditions List */}
                        <div>
                          <h4 className="font-bold mb-4">Traditions clés</h4>
                          <div className="flex flex-wrap gap-2">
                            {category.traditions.map((tradition, i) => (
                              <Badge key={i} variant="outline" className="text-sm py-2">
                                {tradition}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Main Image */}
                      <div className="relative h-[400px] lg:h-auto rounded-xl overflow-hidden">
                        <img
                          src={category.image}
                          alt={category.title}
                          className="w-full h-full object-cover"
                        />
                        <Button
                          size="icon"
                          className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Gallery */}
                    <div className="mt-12">
                      <h4 className="font-heading text-2xl font-bold mb-6">Galerie photo</h4>
                      <div className="grid grid-cols-3 gap-4">
                        {category.gallery.map((img, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="relative h-48 rounded-lg overflow-hidden group cursor-pointer"
                          >
                            <img
                              src={img}
                              alt={`${category.title} gallery ${i + 1}`}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Eye className="w-8 h-8 text-white" />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Video Preview */}
                    {category.videoUrl && (
                      <div className="mt-12">
                        <h4 className="font-heading text-2xl font-bold mb-6">Vidéo immersive</h4>
                        <div className="relative h-[400px] rounded-xl overflow-hidden">
                          <video
                            className="w-full h-full object-cover"
                            poster={category.image}
                            controls
                          >
                            <source src={category.videoUrl} type="video/mp4" />
                          </video>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="mb-4">Agenda culturel</Badge>
              <h2 className="font-heading text-4xl font-bold mb-4">
                Événements à ne pas manquer
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Planifiez votre voyage pour coïncider avec ces célébrations uniques
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {upcomingEvents.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-all group">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <Badge className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm">
                        {event.category}
                      </Badge>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white"
                        onClick={() => toggleLike(event.id)}
                      >
                        <Heart className={`w-4 h-4 ${likedItems.includes(event.id) ? "fill-red-500 text-red-500" : ""}`} />
                      </Button>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold mb-2 line-clamp-1">{event.title}</h3>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {event.date}
                        </p>
                        <p className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </p>
                        <p className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {event.attendees.toLocaleString()} participants
                        </p>
                      </div>
                      <Button variant="link" className="mt-4 p-0" asChild>
                        <Link to="/contact" className="flex items-center gap-1">
                          S'inscrire
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="mb-4">Témoignages</Badge>
              <h2 className="font-heading text-4xl font-bold mb-4">
                Ce que disent nos voyageurs
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Des expériences authentiques vécues par notre communauté
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, i) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <Quote className="w-8 h-8 text-primary/30 mb-4" />
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        "{testimonial.content}"
                      </p>
                      <div className="flex items-center gap-1 mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < testimonial.rating ? "fill-yellow-500 text-yellow-500" : "text-muted"}`}
                          />
                        ))}
                      </div>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={testimonial.avatar} />
                          <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <BookOpen className="w-12 h-12 mx-auto mb-6 text-primary" />
              <h2 className="font-heading text-3xl font-bold mb-4">
                Recevez notre guide culturel gratuit
              </h2>
              <p className="text-muted-foreground mb-8">
                Inscrivez-vous pour recevoir notre ebook "Trésors culturels du Bénin" et notre newsletter mensuelle
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button>
                  Télécharger
                  <Download className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Gratuit • Plus de 50 pages • Mis à jour chaque mois
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Culture;
