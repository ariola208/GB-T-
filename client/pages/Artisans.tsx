import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Star,
  Award,
  Heart,
  ShoppingBag,
  Users,
  Calendar,
  Quote,
  Mail,
  Phone,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useWishlist } from "@/contexts/WishlistContext";

export default function Artisans() {
  const [selectedArtisan, setSelectedArtisan] = useState<number | null>(null);
  const { toggleItem, isInWishlist } = useWishlist();

  const artisans = [
    {
      id: 601,
      name: "Koffi Agbo",
      specialty: "Sculpteur sur bois",
      location: "Abomey",
      rating: 4.9,
      reviews: 124,
      yearsExperience: 25,
      image: "/placeholder.svg",
      avatar: "/placeholder.svg",
      coverImage: "/placeholder.svg",
      description: "Maître sculpteur traditionnel, spécialisé dans les masques et statues royales",
      products: [
        { id: 1, name: "Masque Dan", price: 45000, image: "/placeholder.svg" },
        { id: 2, name: "Statuette royale", price: 85000, image: "/placeholder.svg" },
        { id: 3, name: "Tabouret sculpté", price: 35000, image: "/placeholder.svg" }
      ],
      story: "Koffi a appris l'art de la sculpture de son père à l'âge de 12 ans. Aujourd'hui, il perpétue la tradition en formant la nouvelle génération.",
      awards: ["Prix d'Excellence UNESCO 2020", "Médaille d'Or du Salon des Artisans"]
    },
    {
      id: 602,
      name: "Aminata Diallo",
      specialty: "Tisserande de Kente",
      location: "Cotonou",
      rating: 5.0,
      reviews: 89,
      yearsExperience: 15,
      image: "/placeholder.svg",
      avatar: "/placeholder.svg",
      coverImage: "/placeholder.svg",
      description: "Tisserande renommée pour ses créations en kente aux motifs uniques",
      products: [
        { id: 4, name: "Pagne Kente", price: 35000, image: "/placeholder.svg" },
        { id: 5, name: "Écharpe Kente", price: 15000, image: "/placeholder.svg" },
        { id: 6, name: "Ensemble Kente", price: 75000, image: "/placeholder.svg" }
      ],
      story: "Aminata a modernisé le tissage traditionnel du kente tout en préservant les techniques ancestrales. Ses créations sont portées lors des grandes cérémonies.",
      awards: ["Meilleure Artisane 2023", "Prix de l'Innovation 2022"]
    },
    {
      id: 603,
      name: "Jean-Baptiste Dossou",
      specialty: "Bronzier d'art",
      location: "Porto-Novo",
      rating: 4.8,
      reviews: 67,
      yearsExperience: 30,
      image: "/placeholder.svg",
      avatar: "/placeholder.svg",
      coverImage: "/placeholder.svg",
      description: "Maître dans l'art de la cire perdue, créateur de bronzes d'exception",
      products: [
        { id: 7, name: "Statuette Ifè", price: 120000, image: "/placeholder.svg" },
        { id: 8, name: "Masque bronze", price: 95000, image: "/placeholder.svg" },
        { id: 9, name: "Bijou bronze", price: 25000, image: "/placeholder.svg" }
      ],
      story: "Issu d'une lignée de bronziers, Jean-Baptiste perpétue un art vieux de plusieurs siècles avec une exigence de perfection.",
      awards: ["Prix du Patrimoine Vivant 2021"]
    },
    {
      id: 604,
      name: "Marie Hounkpatin",
      specialty: "Potière traditionnelle",
      location: "Sakété",
      rating: 4.9,
      reviews: 56,
      yearsExperience: 20,
      image: "/placeholder.svg",
      avatar: "/placeholder.svg",
      coverImage: "/placeholder.svg",
      description: "Créatrice de poteries utilitaires et décoratives aux formes élégantes",
      products: [
        { id: 10, name: "Canari", price: 15000, image: "/placeholder.svg" },
        { id: 11, name: "Vase décoratif", price: 22000, image: "/placeholder.svg" },
        { id: 12, name: "Service à thé", price: 35000, image: "/placeholder.svg" }
      ],
      story: "Marie puise son inspiration dans les formes traditionnelles qu'elle réinterprète avec une touche de modernité.",
      awards: ["Prix de la Création Féminine 2023"]
    },
    {
      id: 605,
      name: "Pierre Tchibozo",
      specialty: "Bijoutier",
      location: "Ouidah",
      rating: 4.7,
      reviews: 78,
      yearsExperience: 18,
      image: "/placeholder.svg",
      avatar: "/placeholder.svg",
      coverImage: "/placeholder.svg",
      description: "Créateur de bijoux en or, argent et pierres semi-précieuses",
      products: [
        { id: 13, name: "Collier perles", price: 25000, image: "/placeholder.svg" },
        { id: 14, name: "Bracelet argent", price: 18000, image: "/placeholder.svg" },
        { id: 15, name: "Bagues assorties", price: 15000, image: "/placeholder.svg" }
      ],
      story: "Pierre allie techniques traditionnelles et design contemporain pour créer des bijoux uniques.",
      awards: ["Prix du Design 2022"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-gradient-to-r from-gbeto-gold/30 via-gbeto-surface to-gbeto-gold/30 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-20"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-gbeto-gold text-gbeto-gold-foreground">
              <Users className="h-3 w-3 mr-1" />
              Artisans du Bénin
            </Badge>
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-foreground mb-4">
              Rencontrez nos Artisans
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Derrière chaque création se cache un artisan passionné qui perpétue 
              un savoir-faire ancestral. Découvrez leurs histoires et leurs œuvres.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gbeto-surface py-8 border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-foreground">{artisans.length}</div>
              <div className="text-sm text-muted-foreground">Artisans</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">
                {Math.round(artisans.reduce((acc, a) => acc + a.yearsExperience, 0) / artisans.length)}+
              </div>
              <div className="text-sm text-muted-foreground">Ans d'expérience (moy.)</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">
                {(artisans.reduce((acc, a) => acc + a.reviews, 0) / 1000).toFixed(1)}k+
              </div>
              <div className="text-sm text-muted-foreground">Avis clients</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">5</div>
              <div className="text-sm text-muted-foreground">Spécialités</div>
            </div>
          </div>
        </div>
      </div>

      {/* Artisans Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artisans.map((artisan) => (
            <Card 
              key={artisan.id} 
              className="group hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
              onClick={() => setSelectedArtisan(artisan.id)}
            >
              <div className="relative h-32 overflow-hidden">
                <img
                  src={artisan.coverImage}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              
              <div className="relative px-4 pb-4">
                <div className="flex justify-center -mt-12 mb-4">
                  <Avatar className="w-24 h-24 border-4 border-background">
                    <AvatarImage src={artisan.avatar} />
                    <AvatarFallback>{artisan.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                </div>

                <div className="text-center mb-4">
                  <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-gbeto-gold transition-colors">
                    {artisan.name}
                  </h3>
                  <p className="text-sm text-gbeto-gold mb-2">{artisan.specialty}</p>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{artisan.location}</span>
                    <Calendar className="h-4 w-4 ml-2" />
                    <span>{artisan.yearsExperience} ans</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-gbeto-gold fill-current" />
                    <span className="ml-1 font-semibold">{artisan.rating}</span>
                    <span className="text-sm text-muted-foreground ml-1">
                      ({artisan.reviews})
                    </span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground text-center mb-4 line-clamp-2">
                  {artisan.description}
                </p>

                {artisan.awards.length > 0 && (
                  <div className="flex flex-wrap gap-1 justify-center mb-4">
                    <Award className="h-4 w-4 text-gbeto-gold" />
                    <span className="text-xs">{artisan.awards[0]}</span>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button 
                    className="flex-1 bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Navigate to artisan's products
                    }}
                  >
                    Voir ses créations
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add to favorites
                    }}
                  >
                    <Heart className={`h-4 w-4 ${isInWishlist(artisan.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Artisan Story Modal (simplified - you might want to create a proper modal) */}
      {selectedArtisan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <CardContent className="p-6">
              {artisans.find(a => a.id === selectedArtisan) && (
                <>
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-playfair font-bold">
                      {artisans.find(a => a.id === selectedArtisan)?.name}
                    </h2>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setSelectedArtisan(null)}
                    >
                      <span className="sr-only">Fermer</span>
                      <span aria-hidden="true">&times;</span>
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src={artisans.find(a => a.id === selectedArtisan)?.avatar} />
                        <AvatarFallback>AB</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-lg font-semibold">{artisans.find(a => a.id === selectedArtisan)?.specialty}</p>
                        <p className="text-muted-foreground">{artisans.find(a => a.id === selectedArtisan)?.location}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Son histoire</h3>
                      <p className="text-muted-foreground">{artisans.find(a => a.id === selectedArtisan)?.story}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Récompenses</h3>
                      <ul className="list-disc list-inside text-muted-foreground">
                        {artisans.find(a => a.id === selectedArtisan)?.awards.map((award, i) => (
                          <li key={i}>{award}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Créations</h3>
                      <div className="grid grid-cols-3 gap-4">
                        {artisans.find(a => a.id === selectedArtisan)?.products.map((product) => (
                          <div key={product.id} className="text-center">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-24 object-cover rounded-lg mb-2"
                            />
                            <p className="text-sm font-medium">{product.name}</p>
                            <p className="text-sm text-gbeto-gold">{product.price.toLocaleString()} FCFA</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button className="flex-1 bg-gbeto-gold hover:bg-gbeto-gold/90">
                        <Mail className="h-4 w-4 mr-2" />
                        Contacter
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Voir boutique
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Call to Action */}
      <section className="py-16 bg-gbeto-surface">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">
            Vous êtes artisan ?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Rejoignez notre communauté d'artisans et faites découvrir vos créations 
            à des milliers de clients à travers le monde.
          </p>
          <Button size="lg" className="bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground">
            Devenir partenaire
          </Button>
        </div>
      </section>
    </div>
  );
}
