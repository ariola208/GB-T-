import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Users,
  Star,
  Clock,
  Camera,
  Coffee,
  Sun,
  Moon,
  Heart,
  Shield,
  Compass
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function CircuitsTourisme() {
  const [selectedDuration, setSelectedDuration] = useState("all");

  const circuits = [
    {
      id: 401,
      name: "Route des Rois d'Abomey",
      duration: "3 jours / 2 nuits",
      price: 185000,
      originalPrice: 220000,
      rating: 4.9,
      reviews: 234,
      image: "/placeholder.svg",
      location: "Abomey",
      maxPeople: 15,
      nextDeparture: "15 Nov 2024",
      included: ["Hébergement", "Guide", "Repas", "Transport"],
      highlights: [
        "Visite des Palais Royaux",
        "Musée d'Histoire",
        "Atelier tissage",
        "Danse traditionnelle"
      ],
      description: "Plongez au cœur de l'histoire du Royaume du Danxomɛ",
      type: "culturel"
    },
    {
      id: 402,
      name: "Ganvié, la Venise Africaine",
      duration: "2 jours / 1 nuit",
      price: 125000,
      originalPrice: 145000,
      rating: 5.0,
      reviews: 312,
      image: "/placeholder.svg",
      location: "Ganvié",
      maxPeople: 12,
      nextDeparture: "20 Nov 2024",
      included: ["Hébergement", "Guide", "Repas", "Transport", "Visite en pirogue"],
      highlights: [
        "Découverte du lac Nokoué",
        "Visite du marché flottant",
        "Rencontre avec les pêcheurs",
        "Dégustation de poisson"
      ],
      description: "Explorez la plus grande cité lacustre d'Afrique",
      type: "nature"
    },
    {
      id: 403,
      name: "Parc National de la Pendjari",
      duration: "4 jours / 3 nuits",
      price: 350000,
      originalPrice: 400000,
      rating: 4.8,
      reviews: 156,
      image: "/placeholder.svg",
      location: "Pendjari",
      maxPeople: 8,
      nextDeparture: "25 Nov 2024",
      included: ["Hébergement", "Guide", "Repas", "Transport 4x4", "Safari"],
      highlights: [
        "Safari photo",
        "Observation des éléphants",
        "Chutes de Tanougou",
        "Piste des buffles"
      ],
      description: "Aventure inoubliable dans la réserve de biosphère",
      type: "aventure"
    },
    {
      id: 404,
      name: "Route des Escalves à Ouidah",
      duration: "1 jour",
      price: 45000,
      originalPrice: 55000,
      rating: 4.7,
      reviews: 89,
      image: "/placeholder.svg",
      location: "Ouidah",
      maxPeople: 20,
      nextDeparture: "18 Nov 2024",
      included: ["Guide", "Transport", "Déjeuner"],
      highlights: [
        "Porte du Non-Retour",
        "Temple des Pythons",
        "Forêt Sacrée",
        "Musée d'Histoire"
      ],
      description: "Sur les traces de l'histoire et du vaudou",
      type: "culturel"
    },
    {
      id: 405,
      name: "Route des Pêches",
      duration: "2 jours / 1 nuit",
      price: 95000,
      originalPrice: 110000,
      rating: 4.6,
      reviews: 67,
      image: "/placeholder.svg",
      location: "Cotonou - Grand-Popo",
      maxPeople: 10,
      nextDeparture: "22 Nov 2024",
      included: ["Hébergement", "Guide", "Repas", "Transport"],
      highlights: [
        "Plages sauvages",
        "Villages de pêcheurs",
        "Mangroves",
        "Coucher de soleil"
      ],
      description: "Découverte du littoral béninois et de ses traditions",
      type: "nature"
    },
    {
      id: 406,
      name: "Circuit Gastronomique du Sud",
      duration: "3 jours / 2 nuits",
      price: 165000,
      originalPrice: 195000,
      rating: 4.9,
      reviews: 45,
      image: "/placeholder.svg",
      location: "Cotonou - Porto-Novo",
      maxPeople: 12,
      nextDeparture: "28 Nov 2024",
      included: ["Hébergement", "Guide", "Tous repas", "Ateliers cuisine"],
      highlights: [
        "Marchés locaux",
        "Cours de cuisine",
        "Dégustations",
        "Rencontre avec les chefs"
      ],
      description: "Voyage gustatif à travers les saveurs du Bénin",
      type: "gastronomique"
    }
  ];

  const filteredCircuits = selectedDuration === "all" 
    ? circuits 
    : circuits.filter(c => c.duration.includes(selectedDuration));

  const getTypeColor = (type: string) => {
    switch(type) {
      case "culturel": return "bg-purple-500";
      case "nature": return "bg-green-500";
      case "aventure": return "bg-orange-500";
      case "gastronomique": return "bg-red-500";
      default: return "bg-blue-500";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gradient-to-r from-gbeto-gold/30 via-gbeto-surface to-gbeto-gold/30 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-20"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-gbeto-gold text-gbeto-gold-foreground">
              <Compass className="h-3 w-3 mr-1" />
              Explorez le Bénin
            </Badge>
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-foreground mb-4">
              Circuits Touristiques
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Découvrez nos circuits soigneusement conçus pour vous faire vivre 
              des expériences authentiques au cœur du Bénin.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gbeto-surface py-6 border-y">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-2">
              <Button
                variant={selectedDuration === "all" ? "default" : "outline"}
                className={selectedDuration === "all" ? "bg-gbeto-gold text-gbeto-gold-foreground" : ""}
                onClick={() => setSelectedDuration("all")}
              >
                Tous
              </Button>
              <Button
                variant={selectedDuration === "1 jour" ? "default" : "outline"}
                className={selectedDuration === "1 jour" ? "bg-gbeto-gold text-gbeto-gold-foreground" : ""}
                onClick={() => setSelectedDuration("1 jour")}
              >
                1 jour
              </Button>
              <Button
                variant={selectedDuration === "2 jours" ? "default" : "outline"}
                className={selectedDuration === "2 jours" ? "bg-gbeto-gold text-gbeto-gold-foreground" : ""}
                onClick={() => setSelectedDuration("2 jours")}
              >
                2 jours
              </Button>
              <Button
                variant={selectedDuration === "3 jours" ? "default" : "outline"}
                className={selectedDuration === "3 jours" ? "bg-gbeto-gold text-gbeto-gold-foreground" : ""}
                onClick={() => setSelectedDuration("3 jours")}
              >
                3+ jours
              </Button>
            </div>

            <select className="px-4 py-2 rounded-md border bg-background">
              <option>Trier par popularité</option>
              <option>Prix croissant</option>
              <option>Prix décroissant</option>
              <option>Notes</option>
            </select>
          </div>
        </div>
      </div>

      {/* Circuits Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCircuits.map((circuit) => (
            <Card key={circuit.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="relative md:w-64 h-48 md:h-auto overflow-hidden">
                  <img
                    src={circuit.image}
                    alt={circuit.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <Badge className={`absolute top-2 left-2 ${getTypeColor(circuit.type)} text-white`}>
                    {circuit.type}
                  </Badge>
                </div>
                
                <CardContent className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-gbeto-gold transition-colors">
                        {circuit.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <MapPin className="h-4 w-4" />
                        <span>{circuit.location}</span>
                        <Clock className="h-4 w-4 ml-2" />
                        <span>{circuit.duration}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {circuit.description}
                  </p>

                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-gbeto-gold fill-current" />
                      <span className="ml-1 font-semibold">{circuit.rating}</span>
                      <span className="text-sm text-muted-foreground ml-1">
                        ({circuit.reviews})
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-1" />
                      Max {circuit.maxPeople} pers.
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {circuit.highlights.slice(0, 3).map((highlight, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                    {circuit.highlights.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{circuit.highlights.length - 3}
                      </Badge>
                    )}
                  </div>

                  <Accordion type="single" collapsible className="mb-3">
                    <AccordionItem value="included">
                      <AccordionTrigger className="py-1 text-sm">
                        Ce qui est inclus
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="grid grid-cols-2 gap-1 text-sm">
                          {circuit.included.map((item, i) => (
                            <li key={i} className="flex items-center">
                              <Shield className="h-3 w-3 text-gbeto-gold mr-1" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <span className="text-2xl font-bold text-foreground">
                        {circuit.price.toLocaleString()} FCFA
                      </span>
                      {circuit.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through ml-2">
                          {circuit.originalPrice.toLocaleString()} FCFA
                        </span>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Prochain départ : {circuit.nextDeparture}
                      </p>
                    </div>
                    <Button className="bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground">
                      Réserver
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <section className="py-16 bg-gbeto-surface">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-playfair font-bold text-foreground text-center mb-12">
            Pourquoi choisir nos circuits ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gbeto-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-gbeto-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Guides locaux</h3>
              <p className="text-muted-foreground">
                Des guides passionnés qui connaissent chaque recoin du Bénin
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gbeto-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-gbeto-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sécurité garantie</h3>
              <p className="text-muted-foreground">
                Des circuits sécurisés avec des partenaires de confiance
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gbeto-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="h-8 w-8 text-gbeto-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expériences authentiques</h3>
              <p className="text-muted-foreground">
                Des rencontres vraies avec les communautés locales
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
