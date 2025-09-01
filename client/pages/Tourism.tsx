import { useState } from "react";
import { 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  Clock, 
  Camera, 
  Mountain, 
  Palmtree, 
  Building, 
  Waves,
  Heart,
  ChevronRight,
  Phone,
  Mail,
  Globe
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

interface Destination {
  id: number;
  name: string;
  region: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  rating: number;
  reviews: number;
  category: string;
  duration: string;
  price: number;
  highlights: string[];
  bestTime: string;
  difficulty: "Facile" | "Modéré" | "Difficile";
  included: string[];
}

interface TourPackage {
  id: number;
  name: string;
  duration: string;
  price: number;
  maxPeople: number;
  destinations: string[];
  image: string;
  description: string;
  included: string[];
  rating: number;
  reviews: number;
}

const destinations: Destination[] = [
  {
    id: 1,
    name: "Ganvié - Venise d'Afrique",
    region: "Lac Nokoué",
    description: "Village lacustre unique au monde, patrimoine UNESCO",
    longDescription: "Découvrez Ganvié, surnommé la 'Venise d'Afrique', un village entièrement construit sur pilotis au milieu du lac Nokoué. Cette merveille architecturale abrite plus de 20 000 habitants qui vivent en harmonie avec l'eau depuis des siècles.",
    image: "/placeholder.svg/ganvié.jpeg",
    gallery: ["/placeholder.svg/ganvié.jpeg", "/placeholder.svg/ganvié.jpeg", "/placeholder.svg/ganvié.jpeg"],
    rating: 4.9,
    reviews: 324,
    category: "Patrimoine",
    duration: "1-2 jours",
    price: 25000,
    highlights: [
      "Navigation en pirogue traditionnelle",
      "Découverte de l'architecture lacustre",
      "Rencontre avec les pêcheurs locaux",
      "Marché flottant traditionnel"
    ],
    bestTime: "Novembre à Avril",
    difficulty: "Facile",
    included: ["Guide local", "Transport en pirogue", "Déjeuner traditionnel"]
  },
  {
    id: 2,
    name: "Palais Royal d'Abomey",
    region: "Abomey",
    description: "Ancienne capitale du royaume du Dahomey",
    longDescription: "Explorez les palais royaux d'Abomey, témoins de la grandeur du royaume du Dahomey. Ces palais historiques abritent des trésors artistiques et racontent l'histoire fascinante des rois béninois.",
    image: "/placeholder.svg/Benin_ Abomey.jpeg",
    gallery: ["/placeholder.svg/Benin_ Abomey.jpeg", "/placeholder.svg/Benin_ Abomey.jpeg", "/placeholder.svg/Benin_ Abomey.jpeg"],
    rating: 4.8,
    reviews: 189,
    category: "Histoire",
    duration: "1 jour",
    price: 15000,
    highlights: [
      "Visite des 12 palais royaux",
      "Musée d'histoire du Dahomey",
      "Bas-reliefs et sculptures royales",
      "Trône des rois d'Abomey"
    ],
    bestTime: "Toute l'année",
    difficulty: "Facile",
    included: ["Guide historien", "Entrées musées", "Transport local"]
  },
  {
    id: 3,
    name: "Parc National de la Pendjari",
    region: "Nord Bénin",
    description: "Safari authentique dans la savane béninoise",
    longDescription: "Partez en safari dans le parc national de la Pendjari, l'une des dernières réserves d'Afrique de l'Ouest où vous pourrez observer lions, éléphants, buffles et plus de 300 espèces d'oiseaux dans leur habitat naturel.",
    image: "/placeholder.svg/Pendjari.jpeg",
    gallery: ["/placeholder.svg/Pendjari.jpeg", "/placeholder.svg/Pendjari.jpeg", "/placeholder.svg/Pendjari.jpeg"],
    rating: 4.7,
    reviews: 156,
    category: "Nature",
    duration: "2-3 jours",
    price: 125000,
    highlights: [
      "Safari en 4x4 avec guide expert",
      "Observation de la faune sauvage",
      "Campement sous les étoiles",
      "Photographie animalière"
    ],
    bestTime: "Décembre à Mai",
    difficulty: "Modéré",
    included: ["Guide safari", "Véhicule 4x4", "Camping équipé", "Repas complets"]
  },
  {
    id: 4,
    name: "Cascade de Tanougou",
    region: "Atacora",
    description: "Oasis naturelle dans les montagnes",
    longDescription: "Rafraîchissez-vous aux cascades de Tanougou, nichées dans les montagnes de l'Atacora. Un paradis naturel pour la randonnée, la baignade et la découverte de la flore locale.",
    image: "/placeholder.svg/Cascade de Tanougou.jpeg",
    gallery: ["/placeholder.svg/Cascade de Tanougou.jpeg", "/placeholder.svg/Cascade de Tanougou.jpeg", "/placeholder.svg/Cascade de Tanougou.jpeg"],
    rating: 4.6,
    reviews: 98,
    category: "Nature",
    duration: "1 jour",
    price: 18000,
    highlights: [
      "Randonnée guidée jusqu'aux cascades",
      "Baignade dans les bassins naturels",
      "Découverte de la flore montagnarde",
      "Pique-nique au bord de l'eau"
    ],
    bestTime: "Mai à Octobre",
    difficulty: "Modéré",
    included: ["Guide de montagne", "Transport", "Pique-nique"]
  },
  {
    id: 5,
    name: "Porto-Novo Historique",
    region: "Porto-Novo",
    description: "Capitale culturelle et architecturale",
    longDescription: "Découvrez Porto-Novo, capitale officielle du Bénin, avec son architecture afro-brésilienne unique, ses musées fascinants et son riche patrimoine culturel métissé.",
    image: "/placeholder.svg/Porto-Novo.jpeg",
    gallery: ["/placeholder.svg/Porto-Novo.jpeg", "/placeholder.svg/Porto-Novo.jpeg", "/placeholder.svg/Porto-Novo.jpeg"],
    rating: 4.5,
    reviews: 203,
    category: "Culture",
    duration: "1 jour",
    price: 12000,
    highlights: [
      "Architecture afro-brésilienne",
      "Musée Honmé et Musée ethnographique",
      "Marché Adjarra traditionnel",
      "Centre-ville historique"
    ],
    bestTime: "Toute l'année",
    difficulty: "Facile",
    included: ["Guide culturel", "Entrées musées", "Transport urbain"]
  },
  {
    id: 6,
    name: "Grand Marché de Dantokpa",
    region: "Cotonou",
    description: "Plus grand marché d'Afrique de l'Ouest",
    longDescription: "Plongez dans l'effervescence du Grand Marché de Dantokpa, le plus grand marché à ciel ouvert d'Afrique de l'Ouest. Une expérience sensorielle unique au cœur de la vie économique béninoise.",
    image: "/placeholder.svg/Dantokpa.jpeg",
    gallery: ["/placeholder.svg/Dantokpa.jpeg", "/placeholder.svg/Dantokpa.jpeg", "/placeholder.svg/Dantokpa.jpeg"],
    rating: 4.4,
    reviews: 287,
    category: "Culture",
    duration: "1/2 jour",
    price: 8000,
    highlights: [
      "Immersion dans l'économie locale",
      "Découverte des produits béninois",
      "Négociation avec les commerçants",
      "Dégustation de spécialités locales"
    ],
    bestTime: "Toute l'année",
    difficulty: "Facile",
    included: ["Guide local", "Dégustations", "Conseils d'achat"]
  }
];

const tourPackages: TourPackage[] = [
  {
    id: 1,
    name: "Grand Tour du Bénin",
    duration: "10 jours",
    price: 450000,
    maxPeople: 12,
    destinations: ["Ganvié", "Abomey", "Pendjari", "Porto-Novo", "Ouidah"],
    image: "/placeholder.svg/grand tour.jpeg",
    description: "Circuit complet découvrant toutes les merveilles du Bénin",
    included: [
      "Hébergement 4 étoiles",
      "Tous les repas",
      "Transport climatisé",
      "Guides spécialisés",
      "Entrées sites et musées"
    ],
    rating: 4.9,
    reviews: 87
  },
  {
    id: 2,
    name: "Safari & Nature",
    duration: "5 jours",
    price: 185000,
    maxPeople: 8,
    destinations: ["Pendjari", "Tanougou", "W National Park"],
    image: "/placeholder.svg/nature.jpeg",
    description: "Immersion totale dans la nature sauvage béninoise",
    included: [
      "Campement safari",
      "Véhicule 4x4",
      "Guide naturaliste",
      "Équipement camping",
      "Repas de brousse"
    ],
    rating: 4.8,
    reviews: 62
  },
  {
    id: 3,
    name: "Patrimoine & Culture",
    duration: "7 jours",
    price: 275000,
    maxPeople: 15,
    destinations: ["Abomey", "Porto-Novo", "Ganvié", "Ouidah"],
    image: "/placeholder.svg/patrimoine.jpeg",
    description: "Plongée dans l'histoire et la culture béninoise",
    included: [
      "Hôtels patrimoniaux",
      "Guides historiens",
      "Spectacles traditionnels",
      "Ateliers artisanaux",
      "Rencontres locales"
    ],
    rating: 4.7,
    reviews: 134
  }
];

const testimonials = [
  {
    id: 1,
    name: "Marie Dubois",
    country: "France",
    rating: 5,
    comment: "Une expérience inoubliable ! Ganvié m'a émerveillée et l'accueil béninois est exceptionnel.",
    trip: "Grand Tour du Bénin",
    date: "Mars 2024"
  },
  {
    id: 2,
    name: "James Wilson",
    country: "États-Unis",
    rating: 5,
    comment: "Le safari à Pendjari était fantastique. Nous avons vu des éléphants de très près !",
    trip: "Safari & Nature",
    date: "Février 2024"
  },
  {
    id: 3,
    name: "Aminata Traoré",
    country: "Mali",
    rating: 4,
    comment: "Découvrir l'histoire du royaume d'Abomey était fascinant. Très bien organisé.",
    trip: "Patrimoine & Culture",
    date: "Janvier 2024"
  }
];

export default function Tourism() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [bookingForm, setBookingForm] = useState({
    destination: "",
    dates: "",
    people: "",
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const categories = ["Tous", "Patrimoine", "Nature", "Culture", "Histoire"];

  const filteredDestinations = selectedCategory === "Tous" 
    ? destinations 
    : destinations.filter(dest => dest.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden bg-gradient-to-br from-gbeto-surface via-background to-gbeto-surface">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-20"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-gbeto-gold text-gbeto-gold-foreground">
              Découvrez le Bénin Authentique
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-foreground mb-6 leading-tight">
              Voyagez au Cœur de l'Afrique
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
              Explorez les trésors cachés du Bénin : villages lacustres, safaris authentiques, palais royaux et traditions millénaires vous attendent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground">
                Réserver Maintenant
                <Calendar className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                Voir les Destinations
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
              Destinations Incontournables
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Du patrimoine UNESCO aux safaris authentiques, découvrez la diversité du Bénin
            </p>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination, index) => (
              <Card key={destination.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden animate-fade-in" style={{animationDelay: `${index * 150}ms`}}>
                <div className="relative overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-gbeto-gold text-gbeto-gold-foreground">
                      {destination.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/20 backdrop-blur-sm hover:bg-white/30">
                      <Heart className="h-4 w-4 text-white" />
                    </Button>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center text-sm">
                      <MapPin className="h-3 w-3 mr-1" />
                      {destination.region}
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-gbeto-gold transition-colors">
                    {destination.name}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {destination.description}
                  </p>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(destination.rating) ? 'text-gbeto-gold fill-current' : 'text-muted-foreground'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground ml-2">
                      {destination.rating} ({destination.reviews} avis)
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      {destination.duration}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {destination.difficulty}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-foreground">
                        {destination.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-muted-foreground"> FCFA</span>
                    </div>
                    <Button className="bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground">
                      Réserver
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tour Packages Section */}
      <section className="py-16 bg-gbeto-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
              Circuits Organisés
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Des expériences complètes avec guide, hébergement et transport inclus
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {tourPackages.map((tourPackage, index) => (
              <Card key={tourPackage.id} className="group hover:shadow-xl transition-all duration-300 animate-slide-up" style={{animationDelay: `${index * 200}ms`}}>
                <div className="relative overflow-hidden">
                  <img 
                    src={tourPackage.image} 
                    alt={tourPackage.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-gbeto-gold text-gbeto-gold-foreground">
                      {tourPackage.duration}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {tourPackage.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {tourPackage.description}
                  </p>

                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(tourPackage.rating) ? 'text-gbeto-gold fill-current' : 'text-muted-foreground'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground ml-2">
                      ({tourPackage.reviews} avis)
                    </span>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-foreground mb-2">Inclus :</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {tourPackage.included.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex items-center">
                          <span className="w-1 h-1 bg-gbeto-gold rounded-full mr-2"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-foreground">
                        {tourPackage.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-muted-foreground"> FCFA</span>
                      <div className="text-xs text-muted-foreground">
                        Max. {tourPackage.maxPeople} personnes
                      </div>
                    </div>
                    <Button className="bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground">
                      Réserver
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
                Réservez Votre Voyage
              </h2>
              <p className="text-muted-foreground">
                Contactez-nous pour organiser votre séjour sur mesure au Bénin
              </p>
            </div>

            <Card>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      Demande de Réservation
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Destination</label>
                        <Select value={bookingForm.destination} onValueChange={(value) => setBookingForm({...bookingForm, destination: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choisir une destination" />
                          </SelectTrigger>
                          <SelectContent>
                            {destinations.map((dest) => (
                              <SelectItem key={dest.id} value={dest.name}>
                                {dest.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Dates</label>
                          <Input 
                            type="date" 
                            value={bookingForm.dates}
                            onChange={(e) => setBookingForm({...bookingForm, dates: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Personnes</label>
                          <Select value={bookingForm.people} onValueChange={(value) => setBookingForm({...bookingForm, people: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Nombre" />
                            </SelectTrigger>
                            <SelectContent>
                              {[1,2,3,4,5,6,7,8,9,10].map((num) => (
                                <SelectItem key={num} value={num.toString()}>
                                  {num} personne{num > 1 ? 's' : ''}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Nom complet</label>
                        <Input 
                          placeholder="Votre nom"
                          value={bookingForm.name}
                          onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Email</label>
                          <Input 
                            type="email" 
                            placeholder="votre@email.com"
                            value={bookingForm.email}
                            onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Téléphone</label>
                          <Input 
                            placeholder="+229 ..."
                            value={bookingForm.phone}
                            onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Message (optionnel)</label>
                        <Textarea 
                          placeholder="Demandes spéciales, questions..."
                          value={bookingForm.message}
                          onChange={(e) => setBookingForm({...bookingForm, message: e.target.value})}
                          rows={4}
                        />
                      </div>

                      <Button className="w-full bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground">
                        Envoyer la Demande
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      Informations de Contact
                    </h3>
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <Phone className="h-5 w-5 text-gbeto-gold mt-1" />
                        <div>
                          <h4 className="font-medium text-foreground">Téléphone</h4>
                          <p className="text-muted-foreground">+229 21 30 45 67</p>
                          <p className="text-muted-foreground">+229 97 12 34 56</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <Mail className="h-5 w-5 text-gbeto-gold mt-1" />
                        <div>
                          <h4 className="font-medium text-foreground">Email</h4>
                          <p className="text-muted-foreground">tourisme@gbeto.bj</p>
                          <p className="text-muted-foreground">reservation@gbeto.bj</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <MapPin className="h-5 w-5 text-gbeto-gold mt-1" />
                        <div>
                          <h4 className="font-medium text-foreground">Adresse</h4>
                          <p className="text-muted-foreground">
                            Avenue Jean-Paul II<br />
                            Cotonou, Bénin
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <Globe className="h-5 w-5 text-gbeto-gold mt-1" />
                        <div>
                          <h4 className="font-medium text-foreground">Horaires</h4>
                          <p className="text-muted-foreground">
                            Lun - Ven : 8h - 17h<br />
                            Sam : 9h - 15h<br />
                            Dim : Fermé
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 p-4 bg-gbeto-gold/10 rounded-lg">
                      <h4 className="font-medium text-foreground mb-2">Réponse Garantie</h4>
                      <p className="text-sm text-muted-foreground">
                        Nous nous engageons à répondre à votre demande sous 24h
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gbeto-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
              Témoignages de Voyageurs
            </h2>
            <p className="text-muted-foreground">
              Découvrez les expériences de nos clients satisfaits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={testimonial.id} className="animate-slide-up" style={{animationDelay: `${index * 200}ms`}}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < testimonial.rating ? 'text-gbeto-gold fill-current' : 'text-muted-foreground'}`} 
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.comment}"
                  </p>
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.country}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {testimonial.trip} • {testimonial.date}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
