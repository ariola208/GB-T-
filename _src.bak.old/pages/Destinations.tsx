import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MapPin, Calendar, Users, Star, Heart, Share2, Filter, Search, ChevronRight,
  Clock, DollarSign, Camera, Compass, TrendingUp, Award, Shield, Building2,
  TreePine, Waves, Landmark, ArrowRight, X, ChevronLeft, Check, ThumbsUp,
  Sun, Moon, CloudRain, Thermometer, Wifi, Coffee, Utensils, Car, Hotel, Phone, Mail
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Input } from "../components/ui/input";

const destinationsData = [
  { id: 1, name: "Ganvié", slug: "ganvie", region: "Atlantique", category: "culture", description: "La Venise de l'Afrique, village lacustre unique au monde", longDescription: "Ganvié est un village lacustre exceptionnel situé sur le lac Nokoué. Avec ses 30 000 habitants vivant dans des maisons sur pilotis, c'est la plus grande cité lacustre d'Afrique. La vie s'organise entièrement sur l'eau : marchés flottants, écoles, lieux de culte. Classé au patrimoine mondial de l'UNESCO, Ganvié offre une expérience unique au monde.", image: "/src/pages/placeholder/ganvié.jpeg", rating: 4.8, reviews: 1234, duration: "1-2 jours", priceLevel: 2, featured: true, trending: true, bestTime: "Novembre à Février", temperature: "25-32°C", highlights: ["Village lacustre UNESCO", "Marché flottant", "Musée de Ganvié", "Pêche traditionnelle", "Artisanat local"], activities: [{ name: "Tour en pirogue", duration: "2h", price: 15, icon: "Compass" }, { name: "Visite du marché flottant", duration: "2h", price: 10, icon: "ShoppingBag" }, { name: "Atelier artisanat", duration: "2h", price: 20, icon: "Palette" }], accommodations: [{ name: "Hotel Lac Nokoué", type: "Hôtel", price: 75, rating: 4.5, amenities: ["WiFi", "Restaurant", "Climatisation", "Vue lac"] }, { name: "Chez Thérèse", type: "Maison d'hôtes", price: 35, rating: 4.8, amenities: ["WiFi", "Repas maison", "Terrasse", "Pirogue privée"] }] },
  { id: 2, name: "Parc National de la Pendjari", slug: "parc-pendjari", region: "Atacora", category: "nature", description: "L'un des derniers grands sanctuaires de faune sauvage en Afrique de l'Ouest", longDescription: "Le Parc National de la Pendjari est un joyau de la conservation en Afrique de l'Ouest. Sur 275 000 hectares, ce parc abrite une faune exceptionnelle : lions, éléphants, buffles, hippopotames, guépards, et plus de 300 espèces d'oiseaux. Les safaris offrent des rencontres inoubliables avec la grande faune africaine. La cascade de Tanougou et les montagnes de l'Atacora ajoutent à la beauté des lieux.", image: "/src/pages/placeholder/pendjari.jpeg", rating: 4.9, reviews: 856, duration: "3-5 jours", priceLevel: 3, featured: true, trending: false, bestTime: "Décembre à Mars", temperature: "18-35°C", highlights: ["Safari photo", "Observation des lions", "Cascade de Tanougou", "Bird watching", "Camping sauvage"], activities: [{ name: "Safari guidé", duration: "4h", price: 50, icon: "Car" }, { name: "Safari photo", duration: "6h", price: 80, icon: "Camera" }, { name: "Randonnée Tanougou", duration: "3h", price: 25, icon: "TreePine" }], accommodations: [{ name: "Pendjari Lodge", type: "Lodge", price: 120, rating: 4.7, amenities: ["WiFi", "Restaurant", "Piscine", "Guide privé"] }, { name: "Campement Tanougou", type: "Camping", price: 30, rating: 4.5, amenities: ["Tentes équipées", "Douches", "Feu de camp"] }] },
  { id: 3, name: "Ouidah", slug: "ouidah", region: "Atlantique", category: "historique", description: "Cœur spirituel du vodoun et mémoire de la traite négrière", longDescription: "Ouidah est une ville chargée d'histoire. La Route des Esclaves et la Porte du Non-Retour témoignent de la tragédie de la traite négrière. La ville est aussi le berceau du vodoun, avec le Temple des Pythons et la Forêt Sacrée de Kpassè. Chaque année, le 10 janvier, la Fête Nationale du Vodoun attire des milliers de pèlerins.", image: "src/pages/placeholder/ouidah.jpeg", rating: 4.7, reviews: 2100, duration: "2-3 jours", priceLevel: 2, featured: true, trending: true, bestTime: "Janvier, Octobre-Décembre", temperature: "24-31°C", highlights: ["Porte du Non-Retour", "Route des Esclaves", "Temple des Pythons", "Forêt Sacrée de Kpassè", "Musée d'Histoire"], activities: [{ name: "Visite historique", duration: "3h", price: 25, icon: "Landmark" }, { name: "Cérémonie vodoun", duration: "2h", price: 30, icon: "Users" }, { name: "Musée de Ouidah", duration: "2h", price: 10, icon: "Info" }], accommodations: [{ name: "Hotel Diaspora", type: "Hôtel", price: 60, rating: 4.3, amenities: ["WiFi", "Restaurant", "Piscine", "Climatisation"] }] },
  { id: 4, name: "Abomey", slug: "abomey", region: "Zou", category: "historique", description: "Les palais royaux du Dahomey, classés au patrimoine mondial", longDescription: "Abomey fut la capitale du puissant Royaume du Dahomey pendant près de 300 ans. Les palais royaux, classés au patrimoine mondial de l'UNESCO, sont ornés de bas-reliefs exceptionnels qui racontent l'histoire du royaume. Le musée historique abrite des trésors inestimables : trônes, armes, objets rituels.", image: "src/pages/placeholder/abomey.jpeg", rating: 4.6, reviews: 945, duration: "1-2 jours", priceLevel: 2, featured: false, trending: false, bestTime: "Novembre à Février", temperature: "22-33°C", highlights: ["Palais royaux UNESCO", "Musée historique", "Bas-reliefs", "Artisanat des appliqués"], activities: [{ name: "Visite des palais", duration: "2h", price: 15, icon: "Landmark" }, { name: "Atelier appliqués", duration: "2h", price: 25, icon: "Palette" }], accommodations: [{ name: "Hotel Abomey", type: "Hôtel", price: 50, rating: 4.2, amenities: ["WiFi", "Restaurant", "Climatisation"] }] },
  { id: 5, name: "Grand-Popo", slug: "grand-popo", region: "Mono", category: "plage", description: "Plages de sable fin, pêche traditionnelle et ambiance décontractée", longDescription: "Grand-Popo est une station balnéaire paisible où le fleuve Mono rencontre l'océan Atlantique. Ses longues plages bordées de cocotiers invitent à la détente. Le village de pêcheurs conserve ses traditions. La bouche du Roy offre des paysages magnifiques.", image: "src/pages/placeholder/grandpopo.jpeg", rating: 4.5, reviews: 678, duration: "2-4 jours", priceLevel: 2, featured: false, trending: false, bestTime: "Novembre à Mars", temperature: "24-31°C", highlights: ["Plages de sable fin", "Bouche du Roy", "Pêche traditionnelle", "Couchers de soleil"], activities: [{ name: "Baignade", duration: "Libre", price: 0, icon: "Waves" }, { name: "Pirogue sur le Mono", duration: "2h", price: 15, icon: "Compass" }], accommodations: [{ name: "Auberge de Grand-Popo", type: "Auberge", price: 40, rating: 4.4, amenities: ["WiFi", "Restaurant", "Plage privée"] }] },
  { id: 6, name: "Cotonou", slug: "cotonou", region: "Littoral", category: "ville", description: "La vibrante capitale économique, entre tradition et modernité", longDescription: "Cotonou est le cœur battant du Bénin. Cette ville dynamique mêle modernité et traditions. Le marché Dantokpa, l'un des plus grands d'Afrique de l'Ouest, est une immersion totale dans la vie locale. La Place de l'Étoile Rouge, la cathédrale Notre-Dame, la plage de Fidjrossè sont autant de lieux à découvrir.", image: "src/pages/placeholder/cotonou.jpeg", rating: 4.2, reviews: 3400, duration: "2-3 jours", priceLevel: 3, featured: false, trending: true, bestTime: "Toute l'année", temperature: "24-31°C", highlights: ["Marché Dantokpa", "Place de l'Étoile Rouge", "Plage de Fidjrossè", "Fondation Zinsou"], activities: [{ name: "Visite de Dantokpa", duration: "3h", price: 15, icon: "Compass" }, { name: "Art contemporain", duration: "2h", price: 10, icon: "Palette" }], accommodations: [{ name: "Benin Marina Hotel", type: "Hôtel 4*", price: 120, rating: 4.5, amenities: ["WiFi", "Piscine", "Restaurant", "Spa"] }, { name: "Hotel du Port", type: "Hôtel 3*", price: 70, rating: 4.2, amenities: ["WiFi", "Restaurant", "Climatisation"] }] },
  { id: 7, name: "Natitingou", slug: "natitingou", region: "Atacora", category: "nature", description: "Porte d'entrée du pays Somba et de ses tatas", longDescription: "Natitingou est la principale ville du pays Somba, réputée pour ses habitations traditionnelles uniques : les tatas. Ces forteresses miniatures en terre crue ressemblent à de petits châteaux. La région offre des paysages magnifiques de collines et de vallées.", image: "src/pages/placeholder/natitingou.jpeg", rating: 4.6, reviews: 423, duration: "2-3 jours", priceLevel: 2, featured: false, trending: false, bestTime: "Novembre à Février", temperature: "18-33°C", highlights: ["Tatas Somba", "Cascades de Kota", "Montagnes de l'Atacora", "Artisanat local"], activities: [{ name: "Visite des tatas", duration: "3h", price: 20, icon: "Home" }, { name: "Randonnée", duration: "4h", price: 25, icon: "Mountain" }], accommodations: [{ name: "Hotel Tata Somba", type: "Hôtel", price: 55, rating: 4.3, amenities: ["WiFi", "Restaurant", "Climatisation"] }] },
  { id: 8, name: "Porto-Novo", slug: "porto-novo", region: "Ouémé", category: "culture", description: "La capitale administrative, riche d'histoire et de traditions", longDescription: "Porto-Novo, la capitale du Bénin, est une ville au riche patrimoine historique. Le Musée Honmè (ancien palais royal), la Grande Mosquée de style afro-brésilien, le Jardin des Plantes et de la Nature sont autant de sites à découvrir.", image: "src/pages/placeholder/portonovo.jpeg", rating: 4.4, reviews: 567, duration: "1-2 jours", priceLevel: 2, featured: false, trending: false, bestTime: "Novembre à Février", temperature: "24-31°C", highlights: ["Musée Honmè", "Grande Mosquée", "Jardin des Plantes", "Palais du Gouverneur"], activities: [{ name: "Visite Musée Honmè", duration: "2h", price: 10, icon: "Landmark" }, { name: "Tour de ville", duration: "3h", price: 20, icon: "Compass" }], accommodations: [{ name: "Hotel Beaurivage", type: "Hôtel", price: 65, rating: 4.3, amenities: ["WiFi", "Restaurant", "Piscine"] }] }
];

const categories = [
  { name: "Tous", value: "all", icon: Compass },
  { name: "Culture", value: "culture", icon: Landmark },
  { name: "Nature", value: "nature", icon: TreePine },
  { name: "Plage", value: "plage", icon: Waves },
  { name: "Ville", value: "ville", icon: Building2 },
  { name: "Historique", value: "historique", icon: Calendar }
];

const Destinations = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [likedDestinations, setLikedDestinations] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  const filteredDestinations = destinationsData.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.description.toLowerCase().includes(searchQuery.toLowerCase()) || d.region.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || d.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleLike = (id) => setLikedDestinations(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const getPriceLevelIcon = (level) => Array.from({ length: 5 }).map((_, i) => (<DollarSign key={i} className={`w-3 h-3 ${i < level ? "text-primary" : "text-muted"}`} />));

  const getCategoryIcon = (category) => {
    const icons = { culture: Landmark, nature: TreePine, plage: Waves, ville: Building2, historique: Calendar };
    const Icon = icons[category] || Compass;
    return <Icon className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section ref={heroRef} className="relative h-[60vh] overflow-hidden">
          <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1590080669915-3d4e68d2e20f?w=1920" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center text-center text-white z-10">
            <div className="px-6">
              <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">Explorez le Bénin</Badge>
              <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6">Destinations</h1>
              <p className="text-xl max-w-2xl mx-auto mb-8">Des cités lacustres aux parcs nationaux, découvrez la diversité exceptionnelle du Bénin</p>
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="text" placeholder="Rechercher une destination..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-white text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 bg-background border-b sticky top-20 z-30">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map(cat => (<Button key={cat.value} variant={selectedCategory === cat.value ? "default" : "outline"} size="sm" onClick={() => setSelectedCategory(cat.value)} className="gap-2"><cat.icon className="w-4 h-4" />{cat.name}</Button>))}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-center mb-8">
              <div><h2 className="font-heading text-2xl font-bold">{filteredDestinations.length} destination(s) trouvée(s)</h2><p className="text-muted-foreground">Explorez les merveilles du Bénin</p></div>
              <div className="flex gap-2"><Button variant={viewMode === "grid" ? "default" : "outline"} size="icon" onClick={() => setViewMode("grid")}><Grid3x3 className="w-4 h-4" /></Button><Button variant={viewMode === "list" ? "default" : "outline"} size="icon" onClick={() => setViewMode("list")}><List className="w-4 h-4" /></Button></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDestinations.map(dest => (
                <Card key={dest.id} className="overflow-hidden hover:shadow-xl transition-all group cursor-pointer" onClick={() => setSelectedDestination(dest)}>
                  <div className="relative h-56 overflow-hidden">
                    <img src={dest.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                    <div className="absolute top-3 left-3 flex gap-2">{dest.featured && <Badge className="bg-primary">En vedette</Badge>}{dest.trending && <Badge className="bg-orange-500">Tendance</Badge>}</div>
                    <Button size="icon" variant="ghost" className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white" onClick={(e) => { e.stopPropagation(); toggleLike(dest.id); }}><Heart className={`w-4 h-4 ${likedDestinations.includes(dest.id) ? "fill-red-500 text-red-500" : ""}`} /></Button>
                    <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm flex items-center gap-1"><MapPin className="w-3 h-3" />{dest.region}</div>
                    <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs flex items-center gap-1">{getCategoryIcon(dest.category)}<span className="capitalize">{dest.category}</span></div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2"><h3 className="font-heading text-xl font-bold">{dest.name}</h3><div className="flex items-center gap-1"><Star className="w-4 h-4 fill-yellow-500 text-yellow-500" /><span className="text-sm font-medium">{dest.rating}</span><span className="text-xs text-muted-foreground">({dest.reviews})</span></div></div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{dest.description}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3"><span className="flex items-center gap-1"><Clock className="w-3 h-3" />{dest.duration}</span><span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{dest.bestTime}</span></div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t"><div className="flex items-center gap-1">{getPriceLevelIcon(dest.priceLevel)}</div><Button variant="ghost" size="sm" className="group-hover:text-primary" onClick={() => setSelectedDestination(dest)}>Découvrir <ChevronRight className="w-4 h-4 ml-1" /></Button></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
          <div className="container mx-auto px-6 text-center">
            <Compass className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Vous ne trouvez pas votre bonheur ?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">Nous créons des itinéraires sur mesure selon vos envies. Parlez-nous de votre projet !</p>
            <Button size="lg" asChild><Link to="/contact">Créer mon voyage personnalisé <ArrowRight className="w-4 h-4 ml-2" /></Link></Button>
          </div>
        </section>
      </main>
      <Footer />

      {selectedDestination && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="absolute inset-0 bg-black/80" onClick={() => setSelectedDestination(null)} />
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="bg-background rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-background border-b p-4 flex justify-between items-center"><h3 className="font-heading text-2xl font-bold">{selectedDestination.name}</h3><Button variant="ghost" size="icon" onClick={() => setSelectedDestination(null)}><X className="w-5 h-5" /></Button></div>
              <div className="p-6">
                <img src={selectedDestination.image} className="w-full h-80 object-cover rounded-xl mb-6" />
                <Tabs defaultValue="overview" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-5"><TabsTrigger value="overview">Aperçu</TabsTrigger><TabsTrigger value="highlights">Points forts</TabsTrigger><TabsTrigger value="activities">Activités</TabsTrigger><TabsTrigger value="accommodations">Hébergements</TabsTrigger><TabsTrigger value="info">Infos pratiques</TabsTrigger></TabsList>
                  <TabsContent value="overview"><p className="text-muted-foreground leading-relaxed">{selectedDestination.longDescription}</p><div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6"><div className="text-center p-4 bg-muted/30 rounded-lg"><Calendar className="w-6 h-6 mx-auto mb-2 text-primary" /><p className="font-bold">{selectedDestination.bestTime}</p><p className="text-xs text-muted-foreground">Meilleure période</p></div><div className="text-center p-4 bg-muted/30 rounded-lg"><Thermometer className="w-6 h-6 mx-auto mb-2 text-primary" /><p className="font-bold">{selectedDestination.temperature}</p><p className="text-xs text-muted-foreground">Température</p></div><div className="text-center p-4 bg-muted/30 rounded-lg"><Clock className="w-6 h-6 mx-auto mb-2 text-primary" /><p className="font-bold">{selectedDestination.duration}</p><p className="text-xs text-muted-foreground">Durée recommandée</p></div><div className="text-center p-4 bg-muted/30 rounded-lg"><Star className="w-6 h-6 mx-auto mb-2 text-primary" /><p className="font-bold">{selectedDestination.rating}/5</p><p className="text-xs text-muted-foreground">{selectedDestination.reviews} avis</p></div></div></TabsContent>
                  <TabsContent value="highlights"><div className="grid grid-cols-2 gap-3">{selectedDestination.highlights.map((h, i) => (<div key={i} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg"><Check className="w-5 h-5 text-green-500" /><span>{h}</span></div>))}</div></TabsContent>
                  <TabsContent value="activities"><div className="space-y-3">{selectedDestination.activities.map((a, i) => (<Card key={i}><CardContent className="p-4 flex justify-between items-center"><div><p className="font-medium">{a.name}</p><p className="text-sm text-muted-foreground">{a.duration}</p></div><div className="text-right"><p className="font-bold text-primary">{a.price}€</p><Button variant="link" size="sm" className="p-0">Réserver</Button></div></CardContent></Card>))}</div></TabsContent>
                  <TabsContent value="accommodations"><div className="space-y-3">{selectedDestination.accommodations.map((a, i) => (<Card key={i}><CardContent className="p-4"><div className="flex gap-4"><div className="w-24 h-24 bg-muted/30 rounded-lg flex items-center justify-center"><Hotel className="w-8 h-8 text-primary" /></div><div className="flex-1"><div className="flex justify-between"><div><p className="font-bold">{a.name}</p><p className="text-sm text-muted-foreground">{a.type}</p></div><div className="text-right"><p className="font-bold text-primary">{a.price}€<span className="text-xs font-normal">/nuit</span></p><div className="flex items-center gap-1"><Star className="w-3 h-3 fill-yellow-500" /><span className="text-sm">{a.rating}</span></div></div></div><div className="flex flex-wrap gap-2 mt-2">{a.amenities.map((am, j) => (<Badge key={j} variant="outline" className="text-xs">{am}</Badge>))}</div></div></div></CardContent></Card>))}</div></TabsContent>
                  <TabsContent value="info"><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><Card><CardContent className="p-4"><h4 className="font-bold mb-3 flex items-center gap-2"><Sun className="w-4 h-4 text-primary" />Meilleure période</h4><p>{selectedDestination.bestTime}</p></CardContent></Card><Card><CardContent className="p-4"><h4 className="font-bold mb-3 flex items-center gap-2"><Thermometer className="w-4 h-4 text-primary" />Climat</h4><p>Température: {selectedDestination.temperature}</p></CardContent></Card><Card><CardContent className="p-4"><h4 className="font-bold mb-3 flex items-center gap-2"><Clock className="w-4 h-4 text-primary" />Durée recommandée</h4><p>{selectedDestination.duration}</p></CardContent></Card><Card><CardContent className="p-4"><h4 className="font-bold mb-3 flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" />Localisation</h4><p>Région: {selectedDestination.region}</p></CardContent></Card></div></TabsContent>
                </Tabs>
                <div className="flex gap-3 mt-6 pt-6 border-t"><Button className="flex-1" asChild><Link to="/contact">Réserver maintenant <ArrowRight className="w-4 h-4 ml-2" /></Link></Button><Button variant="outline"><Share2 className="w-4 h-4 mr-2" />Partager</Button></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Grid3x3 = ({ className }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
const List = ({ className }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>;

export default Destinations;
