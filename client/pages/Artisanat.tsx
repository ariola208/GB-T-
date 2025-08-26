import { useState } from "react";
import { 
  Crown, 
  Hammer, 
  Palette, 
  Award, 
  Users, 
  Clock, 
  MapPin, 
  Star,
  Heart,
  ShoppingCart,
  CheckCircle,
  ChevronRight,
  Camera,
  Play,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Artisan {
  id: number;
  name: string;
  specialty: string;
  location: string;
  experience: number;
  image: string;
  bio: string;
  techniques: string[];
  awards: string[];
  gallery: string[];
  signature: string;
  rating: number;
  clients: number;
}

interface CraftCategory {
  id: number;
  name: string;
  description: string;
  icon: any;
  techniques: string[];
  materials: string[];
  products: ArtisanalProduct[];
  image: string;
}

interface ArtisanalProduct {
  id: number;
  name: string;
  price: number;
  category: string;
  artisan: string;
  location: string;
  description: string;
  image: string;
  gallery: string[];
  materials: string[];
  techniques: string[];
  dimensions: string;
  weight: string;
  timeToMake: string;
  certification: boolean;
  customizable: boolean;
  inStock: number;
  rating: number;
  reviews: number;
}

const artisans: Artisan[] = [
  {
    id: 1,
    name: "Maître Koffi Agbossou",
    specialty: "Sculptures et Masques Traditionnels",
    location: "Natitingou, Atacora",
    experience: 35,
    image: "/placeholder.svg",
    bio: "Héritier d'une lignée de sculpteurs depuis 5 générations, Maître Koffi perpétue l'art ancestral de la sculpture Dan. Reconnu internationalement pour ses masques rituels authentiques.",
    techniques: ["Sculpture sur bois d'iroko", "Patine traditionnelle", "Incisions rituelles"],
    awards: ["Prix National d'Artisanat 2020", "Médaille UNESCO du Patrimoine", "Maître Artisan du Bénin"],
    gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    signature: "Motif papillon gravé à la base",
    rating: 4.9,
    clients: 247
  },
  {
    id: 2,
    name: "Coopérative Femmes Tisseuses",
    specialty: "Tissage Traditionnel Kente",
    location: "Savalou, Collines",
    experience: 20,
    image: "/placeholder.svg",
    bio: "Regroupement de 45 femmes artisanes perpétuant l'art du tissage Kente. Chaque pièce raconte une histoire à travers ses motifs et couleurs symboliques.",
    techniques: ["Tissage sur métier traditionnel", "Teinture naturelle", "Motifs symboliques"],
    awards: ["Prix Femmes Entrepreneures 2021", "Label Commerce Équitable"],
    gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    signature: "Étiquette tissée avec logo coopérative",
    rating: 4.8,
    clients: 189
  },
  {
    id: 3,
    name: "Atelier Bronzes Royaux",
    specialty: "Bronzes d'Art et Statuettes",
    location: "Porto-Novo, Ouémé",
    experience: 40,
    image: "/placeholder.svg",
    bio: "Spécialisé dans la reproduction des bronzes royaux du royaume d'Abomey et la création de pièces contemporaines inspirées de l'art Ifè.",
    techniques: ["Fonte à la cire perdue", "Patine au bronze", "Ciselure fine"],
    awards: ["Maître Bronzier National", "Prix d'Excellence Artisanale"],
    gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    signature: "Poinçon royal sur la base",
    rating: 4.9,
    clients: 156
  },
  {
    id: 4,
    name: "Mama Adjoa Perles",
    specialty: "Bijoux et Perles Traditionnelles",
    location: "Abomey, Zou",
    experience: 25,
    image: "/placeholder.svg",
    bio: "Experte en confection de bijoux traditionnels et moderne, utilisant des perles d'agbada et des matériaux locaux pour créer des pièces uniques.",
    techniques: ["Enfilage traditionnel", "Polissage des perles", "Assemblage créatif"],
    awards: ["Prix Innovation Artisanale", "Médaille du Mérite Commercial"],
    gallery: ["/placeholder.svg", "/placeholder.svg"],
    signature: "Petit charm en forme de calebasse",
    rating: 4.7,
    clients: 312
  }
];

const craftCategories: CraftCategory[] = [
  {
    id: 1,
    name: "Sculptures & Masques",
    description: "Art ancestral de la sculpture sur bois, masques rituels et statuettes traditionnelles",
    icon: Crown,
    techniques: ["Sculpture sur bois d'iroko", "Patine naturelle", "Incisions rituelles"],
    materials: ["Bois d'iroko", "Bois de teck", "Pigments naturels", "Fibres végétales"],
    products: [],
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Tissage & Textiles",
    description: "Tissus Kente, pagnes traditionnels et créations textiles contemporaines",
    icon: Palette,
    techniques: ["Tissage sur métier à tisser", "Teinture naturelle", "Broderie traditionnelle"],
    materials: ["Coton local", "Soie sauvage", "Teintures végétales", "Fil de raphia"],
    products: [],
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Bronzes & Métaux",
    description: "Reproductions des bronzes royaux, statuettes et objets d'art en métal",
    icon: Award,
    techniques: ["Fonte à la cire perdue", "Ciselure", "Patine au bronze"],
    materials: ["Bronze", "Laiton", "Cuivre", "Cire d'abeille"],
    products: [],
    image: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Bijoux & Perles",
    description: "Bijoux traditionnels en perles d'agbada, colliers et accessoires uniques",
    icon: Hammer,
    techniques: ["Enfilage traditionnel", "Polissage", "Assemblage créatif"],
    materials: ["Perles d'agbada", "Graines naturelles", "Métaux précieux", "Corail"],
    products: [],
    image: "/placeholder.svg"
  }
];

const featuredProducts: ArtisanalProduct[] = [
  {
    id: 1,
    name: "Masque Dan Authentique",
    price: 85000,
    category: "Sculptures & Masques",
    artisan: "Maître Koffi Agbossou",
    location: "Natitingou",
    description: "Masque traditionnel Dan sculpté dans du bois d'iroko, utilisé lors des cérémonies rituelles. Pièce unique avec patine naturelle.",
    image: "/placeholder.svg",
    gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    materials: ["Bois d'iroko", "Pigments naturels", "Fibres de raphia"],
    techniques: ["Sculpture traditionnelle", "Patine ancestrale", "Incisions rituelles"],
    dimensions: "35cm x 25cm x 15cm",
    weight: "1.2kg",
    timeToMake: "3 semaines",
    certification: true,
    customizable: false,
    inStock: 1,
    rating: 5.0,
    reviews: 12
  },
  {
    id: 2,
    name: "Tissu Kente Premium",
    price: 45000,
    category: "Tissage & Textiles",
    artisan: "Coopérative Femmes Tisseuses",
    location: "Savalou",
    description: "Tissu Kente authentique tissé à la main avec motifs traditionnels. Chaque couleur et motif a sa signification culturelle.",
    image: "/placeholder.svg",
    gallery: ["/placeholder.svg", "/placeholder.svg"],
    materials: ["Coton 100% local", "Teintures végétales"],
    techniques: ["Tissage sur métier traditionnel", "Teinture naturelle"],
    dimensions: "2m x 1.5m",
    weight: "0.8kg",
    timeToMake: "2 semaines",
    certification: true,
    customizable: true,
    inStock: 8,
    rating: 4.8,
    reviews: 23
  },
  {
    id: 3,
    name: "Statuette Bronze Royal",
    price: 120000,
    category: "Bronzes & Métaux",
    artisan: "Atelier Bronzes Royaux",
    location: "Porto-Novo",
    description: "Reproduction fidèle d'une statuette royale d'Abomey, coulée selon la technique ancestrale à la cire perdue.",
    image: "/placeholder.svg",
    gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    materials: ["Bronze", "Cire d'abeille pour le coulage"],
    techniques: ["Fonte à la cire perdue", "Ciselure fine", "Patine au bronze"],
    dimensions: "28cm x 12cm x 12cm",
    weight: "2.8kg",
    timeToMake: "4 semaines",
    certification: true,
    customizable: false,
    inStock: 3,
    rating: 4.9,
    reviews: 8
  },
  {
    id: 4,
    name: "Collier Perles d'Agbada",
    price: 25000,
    category: "Bijoux & Perles",
    artisan: "Mama Adjoa Perles",
    location: "Abomey",
    description: "Collier traditionnel en perles d'agbada polies, symbole de noblesse et de raffinement dans la culture béninoise.",
    image: "/placeholder.svg",
    gallery: ["/placeholder.svg", "/placeholder.svg"],
    materials: ["Perles d'agbada", "Fil de coton renforcé"],
    techniques: ["Sélection des perles", "Polissage manuel", "Enfilage traditionnel"],
    dimensions: "60cm de longueur",
    weight: "150g",
    timeToMake: "1 semaine",
    certification: true,
    customizable: true,
    inStock: 15,
    rating: 4.7,
    reviews: 31
  }
];

export default function Artisanat() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [customOrderForm, setCustomOrderForm] = useState({
    category: "",
    description: "",
    materials: "",
    dimensions: "",
    deadline: "",
    name: "",
    email: "",
    phone: ""
  });

  const filteredProducts = selectedCategory === "Tous" 
    ? featuredProducts 
    : featuredProducts.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden bg-gradient-to-br from-gbeto-surface via-background to-gbeto-surface">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-20"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-gbeto-gold text-gbeto-gold-foreground">
              Artisanat Traditionnel Béninois
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-foreground mb-6 leading-tight">
              L'Art Millénaire<br />du Bénin
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
              Découvrez l'héritage artistique béninois à travers des créations authentiques, réalisées par des maîtres artisans qui perpétuent les traditions ancestrales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground">
                Explorer la Collection
                <Crown className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                Rencontrer les Artisans
                <Users className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artisans */}
      <section className="py-16 bg-gbeto-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
              Nos Maîtres Artisans
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Rencontrez les gardiens des traditions artisanales béninoises
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {artisans.map((artisan, index) => (
              <Card key={artisan.id} className="group hover:shadow-xl transition-all duration-300 animate-fade-in" style={{animationDelay: `${index * 150}ms`}}>
                <div className="relative overflow-hidden">
                  <img 
                    src={artisan.image} 
                    alt={artisan.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-gbeto-gold text-gbeto-gold-foreground text-xs">
                      {artisan.experience} ans d'exp.
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-gbeto-gold transition-colors">
                    {artisan.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">{artisan.specialty}</p>
                  
                  <div className="flex items-center text-xs text-muted-foreground mb-3">
                    <MapPin className="h-3 w-3 mr-1" />
                    {artisan.location}
                  </div>

                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3 w-3 ${i < Math.floor(artisan.rating) ? 'text-gbeto-gold fill-current' : 'text-muted-foreground'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">
                      ({artisan.clients} clients)
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground mb-4 line-clamp-3">
                    {artisan.bio}
                  </p>

                  <Button size="sm" variant="outline" className="w-full">
                    Voir le Profil
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Craft Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
              Nos Spécialités Artisanales
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Chaque catégorie représente un savoir-faire unique transmis de génération en génération
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {craftCategories.map((category, index) => (
              <Card key={category.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer animate-slide-up" style={{animationDelay: `${index * 150}ms`}}>
                <div className="relative overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <category.icon className="h-8 w-8 mx-auto mb-2" />
                      <h3 className="font-semibold">{category.name}</h3>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    {category.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="text-xs font-medium text-foreground mb-2">Techniques :</h4>
                    <div className="flex flex-wrap gap-1">
                      {category.techniques.slice(0, 2).map((technique, idx) => (
                        <Badge key={idx} variant="outline" className="text-2xs">
                          {technique}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button size="sm" variant="outline" className="w-full group-hover:bg-gbeto-gold group-hover:text-gbeto-gold-foreground group-hover:border-gbeto-gold transition-colors">
                    Voir les Créations
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gbeto-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
              Créations Exceptionnelles
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Pièces uniques et authentiques, certifiées par nos maîtres artisans
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {["Tous", ...craftCategories.map(cat => cat.name)].map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden animate-scale-in" style={{animationDelay: `${index * 150}ms`}}>
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {product.certification && (
                    <Badge className="absolute top-2 left-2 bg-gbeto-gold text-gbeto-gold-foreground text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Certifié
                    </Badge>
                  )}
                  {product.customizable && (
                    <Badge variant="secondary" className="absolute top-2 right-2 text-xs">
                      Personnalisable
                    </Badge>
                  )}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0 bg-white/80 hover:bg-white">
                      <Heart className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-gbeto-gold transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    Par {product.artisan} • {product.location}
                  </p>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'text-gbeto-gold fill-current' : 'text-muted-foreground'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">
                      ({product.reviews})
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-3 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {product.timeToMake}
                    </div>
                    <span>{product.inStock} en stock</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-foreground">
                        {product.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-muted-foreground"> FCFA</span>
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground"
                      disabled={product.inStock === 0}
                    >
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      Acheter
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process & Authenticity */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="process" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="process">Processus de Création</TabsTrigger>
                <TabsTrigger value="authenticity">Authenticité</TabsTrigger>
                <TabsTrigger value="custom">Commandes Personnalisées</TabsTrigger>
              </TabsList>
              
              <TabsContent value="process" className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-playfair font-bold text-foreground mb-4">
                      De l'Idée à l'Œuvre d'Art
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Chaque pièce artisanale suit un processus méticuleux qui respecte les traditions ancestrales tout en intégrant les innovations modernes.
                    </p>
                    
                    <div className="space-y-4">
                      {[
                        { step: 1, title: "Sélection des Matériaux", desc: "Choix rigoureux des matières premières locales" },
                        { step: 2, title: "Conception Traditionnelle", desc: "Respect des motifs et techniques ancestrales" },
                        { step: 3, title: "Création Artisanale", desc: "Réalisation manuelle par des maîtres artisans" },
                        { step: 4, title: "Finition et Contrôle", desc: "Vérification qualité et certification d'authenticité" }
                      ].map((process) => (
                        <div key={process.step} className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-gbeto-gold rounded-full flex items-center justify-center text-gbeto-gold-foreground font-bold text-sm">
                            {process.step}
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{process.title}</h4>
                            <p className="text-sm text-muted-foreground">{process.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="relative">
                    <img 
                      src="/placeholder.svg" 
                      alt="Processus artisanal"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <Button 
                      size="sm" 
                      className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-gbeto-gold/90 hover:bg-gbeto-gold text-gbeto-gold-foreground"
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="authenticity" className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <h3 className="text-2xl font-playfair font-bold text-foreground mb-4">
                      Garantie d'Authenticité
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Chaque pièce est accompagnée d'un certificat d'authenticité qui garantit son origine, sa méthode de fabrication et son artisan créateur.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { icon: CheckCircle, title: "Certificat d'Origine", desc: "Traçabilité complète de la pièce" },
                        { icon: Crown, title: "Signature Artisan", desc: "Identification unique de l'artisan" },
                        { icon: Award, title: "Label Qualité", desc: "Respect des standards artisanaux" },
                        { icon: Download, title: "Documentation", desc: "Histoire et techniques utilisées" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <item.icon className="h-6 w-6 text-gbeto-gold mt-1" />
                          <div>
                            <h4 className="font-semibold text-foreground">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <img 
                      src="/placeholder.svg" 
                      alt="Certificat d'authenticité"
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="custom" className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-playfair font-bold text-foreground mb-4">
                      Commandes Personnalisées
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Travaillez directement avec nos artisans pour créer une pièce unique selon vos spécifications et préférences.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Catégorie souhaitée</label>
                        <Select value={customOrderForm.category} onValueChange={(value) => setCustomOrderForm({...customOrderForm, category: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choisir une catégorie" />
                          </SelectTrigger>
                          <SelectContent>
                            {craftCategories.map((category) => (
                              <SelectItem key={category.id} value={category.name}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Description du projet</label>
                        <Textarea 
                          placeholder="Décrivez votre vision..."
                          value={customOrderForm.description}
                          onChange={(e) => setCustomOrderForm({...customOrderForm, description: e.target.value})}
                          rows={4}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Matériaux préférés</label>
                          <Input 
                            placeholder="ex: Bois d'iroko, bronze..."
                            value={customOrderForm.materials}
                            onChange={(e) => setCustomOrderForm({...customOrderForm, materials: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Dimensions</label>
                          <Input 
                            placeholder="ex: 30cm x 20cm"
                            value={customOrderForm.dimensions}
                            onChange={(e) => setCustomOrderForm({...customOrderForm, dimensions: e.target.value})}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Délai souhaité</label>
                        <Input 
                          type="date"
                          value={customOrderForm.deadline}
                          onChange={(e) => setCustomOrderForm({...customOrderForm, deadline: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-4">Vos informations</h4>
                    <div className="space-y-4">
                      <Input 
                        placeholder="Nom complet"
                        value={customOrderForm.name}
                        onChange={(e) => setCustomOrderForm({...customOrderForm, name: e.target.value})}
                      />
                      <Input 
                        type="email"
                        placeholder="Email"
                        value={customOrderForm.email}
                        onChange={(e) => setCustomOrderForm({...customOrderForm, email: e.target.value})}
                      />
                      <Input 
                        placeholder="Téléphone"
                        value={customOrderForm.phone}
                        onChange={(e) => setCustomOrderForm({...customOrderForm, phone: e.target.value})}
                      />
                      
                      <div className="bg-gbeto-gold/10 p-4 rounded-lg">
                        <h5 className="font-medium text-foreground mb-2">Processus de commande :</h5>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Consultation gratuite avec l'artisan</li>
                          <li>• Devis détaillé sous 48h</li>
                          <li>• Validation du design avant production</li>
                          <li>• Suivi régulier de l'avancement</li>
                        </ul>
                      </div>

                      <Button className="w-full bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground">
                        Envoyer la Demande
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
}
