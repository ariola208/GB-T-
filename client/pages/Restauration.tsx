import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Star,
  Clock,
  Phone,
  Users,
  Coffee,
  Utensils,
  Wine,
  Heart,
  Award,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

export default function Restauration() {
  const [searchQuery, setSearchQuery] = useState("");

  const restaurants = [
    {
      id: 501,
      name: "Chez Maman Bénin",
      cuisine: "Traditionnelle",
      rating: 4.8,
      reviews: 324,
      priceRange: "$$",
      image: "/placeholder.svg",
      location: "Cotonou",
      address: "Avenue Jean Paul II",
      phone: "+229 97 89 89 89",
      hours: "8h - 22h",
      specialty: "Ablo, Sauce gboma, Poisson braisé",
      features: ["Wifi", "Terrasse", "Parking", "Climatisation"],
      delivery: true,
      reservation: true
    },
    {
      id: 502,
      name: "Le Zaglo d'Or",
      cuisine: "Traditionnelle et Fusion",
      rating: 4.9,
      reviews: 412,
      priceRange: "$$$",
      image: "/placeholder.svg",
      location: "Cotonou",
      address: "Boulevard de la Marina",
      phone: "+229 61 23 45 67",
      hours: "12h - 23h",
      specialty: "Zaglo revisité, Kuli-kuli burger",
      features: ["Wifi", "Climatisation", "Bar", "Espace VIP"],
      delivery: false,
      reservation: true
    },
    {
      id: 503,
      name: "Saveurs du Nord",
      cuisine: "Cuisine du Nord",
      rating: 4.7,
      reviews: 178,
      priceRange: "$$",
      image: "/placeholder.svg",
      location: "Parakou",
      address: "Place Marché",
      phone: "+229 94 56 78 90",
      hours: "9h - 21h",
      specialty: "Tchigan, Dongo-dongo, Riz local",
      features: ["Wifi", "Parking", "Climatisation"],
      delivery: true,
      reservation: true
    },
    {
      id: 504,
      name: "La Perle d'Abomey",
      cuisine: "Traditionnelle",
      rating: 4.8,
      reviews: 156,
      priceRange: "$$",
      image: "/placeholder.svg",
      location: "Abomey",
      address: "Place de la Basilique",
      phone: "+229 97 12 34 56",
      hours: "8h - 22h",
      specialty: "Kpanman, Wasso, Agoutis",
      features: ["Wifi", "Terrasse", "Parking"],
      delivery: false,
      reservation: true
    },
    {
      id: 505,
      name: "Ouidah Beach Restaurant",
      cuisine: "Poissons et Fruits de mer",
      rating: 4.9,
      reviews: 267,
      priceRange: "$$$",
      image: "/placeholder.svg",
      location: "Ouidah",
      address: "Plage de Ouidah",
      phone: "+229 61 98 76 54",
      hours: "10h - 23h",
      specialty: "Poisson braisé, Crabe, Langouste",
      features: ["Wifi", "Terrasse", "Vue mer", "Bar", "Parking"],
      delivery: false,
      reservation: true
    },
    {
      id: 506,
      name: "Café Ganvié",
      cuisine: "Café et Snacks",
      rating: 4.6,
      reviews: 89,
      priceRange: "$",
      image: "/placeholder.svg",
      location: "Ganvié",
      address: "Sur pilotis",
      phone: "+229 97 55 44 33",
      hours: "7h - 19h",
      specialty: "Café local, Beignets, Jus de fruits",
      features: ["Wifi", "Vue lac"],
      delivery: false,
      reservation: false
    }
  ];

  const filteredRestaurants = restaurants.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPriceRange = (range: string) => {
    switch(range) {
      case "$": return "Bon marché";
      case "$$": return "Modéré";
      case "$$$": return "Élevé";
      default: return range;
    }
  };

  const locations = ["Tous", "Cotonou", "Abomey", "Ouidah", "Ganvié", "Parakou"];
  const cuisines = ["Toutes", "Traditionnelle", "Poissons", "Café", "Fusion"];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-gradient-to-r from-gbeto-gold/20 via-gbeto-surface to-gbeto-gold/20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-10"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-gbeto-gold text-gbeto-gold-foreground">
              <Utensils className="h-3 w-3 mr-1" />
              Saveurs du Bénin
            </Badge>
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
              Restauration
            </h1>
            <p className="text-lg text-muted-foreground">
              Découvrez les meilleurs restaurants du Bénin, de la cuisine traditionnelle 
              aux expériences gastronomiques uniques.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-gbeto-surface py-6 border-y">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Input
                type="search"
                placeholder="Rechercher un restaurant..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            
            <div className="flex gap-4">
              <select className="px-4 py-2 rounded-md border bg-background">
                {locations.map(loc => (
                  <option key={loc}>{loc}</option>
                ))}
              </select>
              
              <select className="px-4 py-2 rounded-md border bg-background">
                {cuisines.map(cuisine => (
                  <option key={cuisine}>{cuisine}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurants Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <Card key={restaurant.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <Badge className="absolute top-2 left-2 bg-gbeto-gold text-gbeto-gold-foreground">
                  {restaurant.cuisine}
                </Badge>
                {restaurant.delivery && (
                  <Badge variant="secondary" className="absolute top-2 right-2 bg-blue-500 text-white">
                    Livraison
                  </Badge>
                )}
              </div>

              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-gbeto-gold transition-colors">
                      {restaurant.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{restaurant.location}</span>
                      <span className="text-xs bg-gbeto-surface px-2 py-1 rounded">
                        {restaurant.priceRange}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-gbeto-gold fill-current" />
                    <span className="ml-1 font-semibold">{restaurant.rating}</span>
                    <span className="text-sm text-muted-foreground ml-1">
                      ({restaurant.reviews})
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    {restaurant.hours}
                  </div>
                </div>

                <p className="text-sm mb-2">
                  <span className="font-semibold">Spécialité:</span> {restaurant.specialty}
                </p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {restaurant.features.map((feature, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-1 text-gbeto-gold" />
                      {restaurant.phone}
                    </div>
                  </div>
                  <Button 
                    className="bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground"
                    disabled={!restaurant.reservation}
                  >
                    {restaurant.reservation ? 'Réserver' : 'Sur place'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Featured Restaurants */}
      <section className="py-16 bg-gbeto-surface">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-playfair font-bold text-foreground text-center mb-12">
            Restaurants Coup de Cœur
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {restaurants.slice(0, 3).map((restaurant) => (
              <div key={restaurant.id} className="text-center">
                <Award className="h-12 w-12 text-gbeto-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{restaurant.name}</h3>
                <p className="text-muted-foreground">{restaurant.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
