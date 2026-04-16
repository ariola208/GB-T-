import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Users,
  Star,
  Heart,
  Share2,
  Filter,
  Search,
  ChevronRight,
  Clock,
  DollarSign,
  Camera,
  Compass,
  TrendingUp,
  Award,
  Shield,
  Wifi,
  Coffee,
  Utensils,
  Car,
  Plane,
  Hotel,
  Landmark,
  TreePine,
  Waves,
  Mountain,
  Sun,
  Moon,
  CloudRain,
  Thermometer,
  ArrowRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
  ChevronLeft,
  Download,
  Eye,
  MessageCircle,
  Bookmark,
  Share,
  Info,
  Check,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fadeInUp, staggerContainer, fadeIn, scaleIn } from "@/lib/animations";

// Types
interface Destination {
  id: number;
  name: string;
  region: string;
  category: "culture" | "nature" | "plage" | "ville" | "historique";
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  video?: string;
  coordinates: { lat: number; lng: number };
  stats: {
    visitors: number;
    rating: number;
    reviews: number;
    area: string;
    altitude?: string;
    population?: string;
  };
  highlights: string[];
  activities: Activity[];
  bestTimeToVisit: string[];
  weather: Weather;
  accommodations: Accommodation[];
  reviews_list: Review[];
  priceLevel: 1 | 2 | 3 | 4 | 5;
  duration: string;
  tags: string[];
  featured?: boolean;
  trending?: boolean;
}

interface Activity {
  name: string;
  duration: string;
  price: number;
  icon: any;
}

interface Weather {
  temperature: { min: number; max: number };
  rainfall: number;
  bestMonths: string[];
}

interface Accommodation {
  name: string;
  type: string;
  price: number;
  rating: number;
  image: string;
  amenities: string[];
}

interface Review {
  id: number;
  user: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
}

// Données enrichies
const destinations: Destination[] = [
  {
    id: 1,
    name: "Ganvié",
    region: "Atlantique",
    category: "culture",
    description: "La Venise de l'Afrique, village lacustre unique au monde",
    longDescription: "Ganvié est un village lacustre exceptionnel situé sur le lac Nokoué. Avec ses 30 000 habitants vivant dans des maisons sur pilotis, c'est la plus grande cité lacustre d'Afrique. La vie s'organise entièrement sur l'eau : marchés flottants, écoles, lieux de culte. Les habitants, les Tofinu, se déplacent en pirogues dans un ballet aquatique fascinant. Classé au patrimoine mondial de l'UNESCO, Ganvié offre une expérience unique au monde.",
    image: "https://images.unsplash.com/photo-1590080669915-3d4e68d2e20f?w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1590080669915-3d4e68d2e20f?w=800",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800",
      "https://images.unsplash.com/photo-1589308078059-be3c3044eccc?w=800",
      "https://images.unsplash.com/photo-1547970810-dc1e93b62d48?w=800",
    ],
    video: "https://player.vimeo.com/external/371867846.hd.mp4?s=7b7c0c5c5e5c5c5c5c5c5c5c5c5c5c5c&profile_id=174",
    coordinates: { lat: 6.4667, lng: 2.4167 },
    stats: {
      visitors: 50000,
      rating: 4.8,
      reviews: 1234,
      area: "40 km²",
      population: "30 000",
    },
    highlights: [
      "Village lacustre UNESCO",
      "Marché flottant",
      "Musée de Ganvié",
      "Pêche traditionnelle",
      "Artisanat local",
    ],
    activities: [
      { name: "Tour en pirogue", duration: "2h", price: 15, icon: Compass },
      { name: "Visite du marché flottant", duration: "1h30", price: 10, icon: Utensils },
      { name: "Pêche traditionnelle", duration: "3h", price: 25, icon: Waves },
      { name: "Atelier artisanat", duration: "2h", price: 20, icon: Camera },
    ],
    bestTimeToVisit: ["Novembre", "Décembre", "Janvier", "Février"],
    weather: {
      temperature: { min: 23, max: 32 },
      rainfall: 1200,
      bestMonths: ["Nov", "Déc", "Jan", "Fév"],
    },
    accommodations: [
      {
        name: "Hotel Lac Nokoué",
        type: "Hôtel",
        price: 75,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
        amenities: ["WiFi", "Restaurant", "Climatisation", "Vue lac"],
      },
      {
        name: "Chez Thérèse",
        type: "Maison d'hôtes",
        price: 35,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
        amenities: ["WiFi", "Repas maison", "Terrasse", "Pirogue privée"],
      },
    ],
    reviews_list: [
      {
        id: 1,
        user: "Marie Dubois",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
        rating: 5,
        date: "2024-02-15",
        comment: "Une expérience unique ! Le marché flottant est fascinant. Notre guide était exceptionnel.",
        helpful: 45,
      },
      {
        id: 2,
        user: "Pierre Martin",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
        rating: 5,
        date: "2024-01-20",
        comment: "Ganvié est vraiment la Venise de l'Afrique. Les habitants sont accueillants.",
        helpful: 32,
      },
    ],
    priceLevel: 2,
    duration: "1-2 jours",
    tags: ["UNESCO", "Lac", "Culture", "Authentique"],
    featured: true,
    trending: true,
  },
  {
    id: 2,
    name: "Parc National de la Pendjari",
    region: "Atacora",
    category: "nature",
    description: "L'un des derniers grands sanctuaires de faune sauvage en Afrique de l'Ouest",
    longDescription: "Le Parc National de la Pendjari est un joyau de la conservation en Afrique de l'Ouest. Sur 275 000 hectares, ce parc abrite une faune exceptionnelle : lions, éléphants, buffles, hippopotames, guépards, et plus de 300 espèces d'oiseaux. Les safaris offrent des rencontres inoubliables avec la grande faune africaine dans un cadre préservé. La cascade de Tanougou et les montagnes de l'Atacora ajoutent à la beauté des lieux.",
    image: "https://images.unsplash.com/photo-1547970810-dc1e93b62d48?w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1547970810-dc1e93b62d48?w=800",
      "https://images.unsplash.com/photo-1590080669915-3d4e68d2e20f?w=800",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800",
      "https://images.unsplash.com/photo-1589308078059-be3c3044eccc?w=800",
    ],
    coordinates: { lat: 11.2667, lng: 1.5333 },
    stats: {
      visitors: 25000,
      rating: 4.9,
      reviews: 856,
      area: "275 000 ha",
      altitude: "150-650 m",
    },
    highlights: [
      "Safari photo",
      "Observation des lions",
      "Cascade de Tanougou",
      "Bird watching",
      "Camping sauvage",
    ],
    activities: [
      { name: "Safari guidé", duration: "4h", price: 50, icon: Car },
      { name: "Safari photo", duration: "6h", price: 80, icon: Camera },
      { name: "Randonnée Tanougou", duration: "3h", price: 25, icon: TreePine },
      { name: "Observation oiseaux", duration: "2h", price: 20, icon: Eye },
    ],
    bestTimeToVisit: ["Décembre", "Janvier", "Février", "Mars"],
    weather: {
      temperature: { min: 18, max: 35 },
      rainfall: 1000,
      bestMonths: ["Déc", "Jan", "Fév", "Mar"],
    },
    accommodations: [
      {
        name: "Pendjari Lodge",
        type: "Lodge",
        price: 120,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
        amenities: ["WiFi", "Restaurant", "Piscine", "Guide privé"],
      },
      {
        name: "Campement Tanougou",
        type: "Camping",
        price: 30,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400",
        amenities: ["Tentes équipées", "Douches", "Feu de camp"],
      },
    ],
    reviews_list: [
      {
        id: 1,
        user: "Sophie Laurent",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
        rating: 5,
        date: "2024-03-10",
        comment: "Nous avons vu des lions, des éléphants et même un léopard ! Inoubliable.",
        helpful: 67,
      },
    ],
    priceLevel: 3,
    duration: "3-5 jours",
    tags: ["Safari", "Nature", "Faune", "Aventure"],
    featured: true,
  },
  {
    id: 3,
    name: "Ouidah",
    region: "Atlantique",
    category: "historique",
    description: "Cœur spirituel du vodoun et mémoire de la traite négrière",
    longDescription: "Ouidah est une ville chargée d'histoire. La Route des Esclaves et la Porte du Non-Retour témoignent de la tragédie de la traite négrière. La ville est aussi le berceau du vodoun, avec le Temple des Pythons et la Forêt Sacrée de Kpassè. Chaque année, le 10 janvier, la Fête Nationale du Vodoun attire des milliers de pèlerins. Ouidah est un lieu de mémoire, de spiritualité et de résilience.",
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800",
      "https://images.unsplash.com/photo-1590080669915-3d4e68d2e20f?w=800",
      "https://images.unsplash.com/photo-1589308078059-be3c3044eccc?w=800",
    ],
    coordinates: { lat: 6.3667, lng: 2.0833 },
    stats: {
      visitors: 75000,
      rating: 4.7,
      reviews: 2100,
      area: "364 km²",
      population: "90 000",
    },
    highlights: [
      "Porte du Non-Retour",
      "Route des Esclaves",
      "Temple des Pythons",
      "Forêt Sacrée de Kpassè",
      "Musée d'Histoire de Ouidah",
    ],
    activities: [
      { name: "Visite historique", duration: "3h", price: 25, icon: Landmark },
      { name: "Cérémonie vodoun", duration: "2h", price: 30, icon: Users },
      { name: "Musée de Ouidah", duration: "1h30", price: 10, icon: Info },
      { name: "Plage de Ouidah", duration: "2h", price: 0, icon: Waves },
    ],
    bestTimeToVisit: ["Janvier", "Octobre", "Novembre", "Décembre"],
    weather: {
      temperature: { min: 24, max: 31 },
      rainfall: 1300,
      bestMonths: ["Jan", "Oct", "Nov", "Déc"],
    },
    accommodations: [
      {
        name: "Hotel Diaspora",
        type: "Hôtel",
        price: 60,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
        amenities: ["WiFi", "Restaurant", "Piscine", "Climatisation"],
      },
    ],
    reviews_list: [
      {
        id: 1,
        user: "Jean Kouagou",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
        rating: 5,
        date: "2024-01-10",
        comment: "La Fête du Vodoun est une expérience spirituelle intense. À ne pas manquer.",
        helpful: 89,
      },
    ],
    priceLevel: 2,
    duration: "2-3 jours",
    tags: ["Histoire", "Vodoun", "Mémoire", "Spiritualité"],
    featured: true,
  },
  {
    id: 4,
    name: "Abomey",
    region: "Zou",
    category: "historique",
    description: "Les palais royaux du Dahomey, classés au patrimoine mondial",
    longDescription: "Abomey fut la capitale du puissant Royaume du Dahomey pendant près de 300 ans. Les palais royaux, classés au patrimoine mondial de l'UNESCO, sont ornés de bas-reliefs exceptionnels qui racontent l'histoire et les traditions du royaume. Le musée historique d'Abomey abrite des trésors inestimables : trônes, armes, objets rituels. La ville reste un centre important de l'artisanat traditionnel, notamment des célèbres appliqués d'Abomey.",
    image: "https://images.unsplash.com/photo-1589308078059-be3c3044eccc?w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1589308078059-be3c3044eccc?w=800",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800",
      "https://images.unsplash.com/photo-1590080669915-3d4e68d2e20f?w=800",
    ],
    coordinates: { lat: 7.1833, lng: 1.9833 },
    stats: {
      visitors: 35000,
      rating: 4.6,
      reviews: 945,
      area: "142 km²",
      population: "90 000",
    },
    highlights: [
      "Palais royaux UNESCO",
      "Musée historique",
      "Bas-reliefs",
      "Artisanat des appliqués",
      "Temple des amazones",
    ],
    activities: [
      { name: "Visite des palais", duration: "2h", price: 15, icon: Landmark },
      { name: "Atelier appliqués", duration: "2h", price: 25, icon: Palette },
      { name: "Musée historique", duration: "1h30", price: 10, icon: Info },
      { name: "Tour de la ville", duration: "2h", price: 20, icon: Compass },
    ],
    bestTimeToVisit: ["Novembre", "Décembre", "Janvier", "Février"],
    weather: {
      temperature: { min: 22, max: 33 },
      rainfall: 1100,
      bestMonths: ["Nov", "Déc", "Jan", "Fév"],
    },
    accommodations: [
      {
        name: "Hotel Abomey",
        type: "Hôtel",
        price: 50,
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
        amenities: ["WiFi", "Restaurant", "Climatisation"],
      },
    ],
    reviews_list: [
      {
        id: 1,
        user: "Claire Fontaine",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
        rating: 5,
        date: "2024-02-01",
        comment: "Les bas-reliefs sont fascinants. L'histoire du Dahomey est captivante.",
        helpful: 54,
      },
    ],
    priceLevel: 2,
    duration: "1-2 jours",
    tags: ["UNESCO", "Histoire", "Palais", "Artisanat"],
  },
  {
    id: 5,
    name: "Grand-Popo",
    region: "Mono",
    category: "plage",
    description: "Plages de sable fin, pêche traditionnelle et ambiance décontractée",
    longDescription: "Grand-Popo est une station balnéaire paisible où le fleuve Mono rencontre l'océan Atlantique. Ses longues plages bordées de cocotiers invitent à la détente. Le village de pêcheurs conserve ses traditions : vous pourrez assister au retour des pirogues chargées de poissons. La bouche du Roy, où le fleuve se jette dans l'océan, offre des paysages magnifiques. L'ambiance y est authentique et reposante.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800",
      "https://images.unsplash.com/photo-1590080669915-3d4e68d2e20f?w=800",
    ],
    coordinates: { lat: 6.2833, lng: 1.8333 },
    stats: {
      visitors: 20000,
      rating: 4.5,
      reviews: 678,
      area: "289 km²",
      population: "40 000",
    },
    highlights: [
      "Plages de sable fin",
      "Bouche du Roy",
      "Pêche traditionnelle",
      "Balades en pirogue",
      "Couchers de soleil",
    ],
    activities: [
      { name: "Baignade", duration: "Libre", price: 0, icon: Waves },
      { name: "Pirogue sur le Mono", duration: "2h", price: 15, icon: Compass },
      { name: "Pêche en mer", duration: "4h", price: 35, icon: Waves },
      { name: "Balade à vélo", duration: "3h", price: 10, icon: Compass },
    ],
    bestTimeToVisit: ["Novembre", "Décembre", "Janvier", "Février", "Mars"],
    weather: {
      temperature: { min: 24, max: 31 },
      rainfall: 1200,
      bestMonths: ["Nov", "Déc", "Jan", "Fév", "Mar"],
    },
    accommodations: [
      {
        name: "Auberge de Grand-Popo",
        type: "Auberge",
        price: 40,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
        amenities: ["WiFi", "Restaurant", "Plage privée"],
      },
    ],
    reviews_list: [
      {
        id: 1,
        user: "Léa Dubois",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
        rating: 4,
        date: "2024-01-15",
        comment: "Parfait pour se ressourcer. Les couchers de soleil sont magnifiques.",
        helpful: 28,
      },
    ],
    priceLevel: 2,
    duration: "2-4 jours",
    tags: ["Plage", "Détente", "Pêche", "Nature"],
  },
  {
    id: 6,
    name: "Cotonou",
    region: "Littoral",
    category: "ville",
    description: "La vibrante capitale économique, entre tradition et modernité",
    longDescription: "Cotonou est le cœur battant du Bénin. Cette ville dynamique mêle modernité et traditions. Le marché Dantokpa, l'un des plus grands d'Afrique de l'Ouest, est une immersion totale dans la vie locale. La Place de l'Étoile Rouge, la cathédrale Notre-Dame, la plage de Fidjrossè sont autant de lieux à découvrir. Cotonou est aussi le point de départ idéal pour explorer le reste du pays.",
    image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800",
      "https://images.unsplash.com/photo-1590080669915-3d4e68d2e20f?w=800",
      "https://images.unsplash.com/photo-1589308078059-be3c3044eccc?w=800",
    ],
    coordinates: { lat: 6.3667, lng: 2.4333 },
    stats: {
      visitors: 150000,
      rating: 4.2,
      reviews: 3400,
      area: "79 km²",
      population: "680 000",
    },
    highlights: [
      "Marché Dantokpa",
      "Place de l'Étoile Rouge",
      "Cathédrale Notre-Dame",
      "Plage de Fidjrossè",
      "Fondation Zinsou",
    ],
    activities: [
      { name: "Visite de Dantokpa", duration: "3h", price: 15, icon: Compass },
      { name: "Art contemporain", duration: "2h", price: 10, icon: Palette },
      { name: "Balade en ville", duration: "3h", price: 20, icon: Car },
      { name: "Soirée Fidjrossè", duration: "Soirée", price: 30, icon: Music },
    ],
    bestTimeToVisit: ["Toute l'année"],
    weather: {
      temperature: { min: 24, max: 31 },
      rainfall: 1300,
      bestMonths: ["Toute l'année"],
    },
    accommodations: [
      {
        name: "Benin Marina Hotel",
        type: "Hôtel 4*",
        price: 120,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
        amenities: ["WiFi", "Piscine", "Restaurant", "Spa", "Salle de sport"],
      },
      {
        name: "Hotel du Port",
        type: "Hôtel 3*",
        price: 70,
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
        amenities: ["WiFi", "Restaurant", "Climatisation"],
      },
    ],
    reviews_list: [
      {
        id: 1,
        user: "Marc Dupont",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
        rating: 4,
        date: "2024-02-20",
        comment: "Dantokpa est une expérience unique. Préparez-vous à marchander !",
        helpful: 42,
      },
    ],
    priceLevel: 3,
    duration: "2-3 jours",
    tags: ["Ville", "Shopping", "Culture", "Vie nocturne"],
    trending: true,
  },
  {
    id: 7,
    name: "Natitingou",
    region: "Atacora",
    category: "nature",
    description: "Porte d'entrée du pays Somba et de ses tatas",
    longDescription: "Natitingou est la principale ville du pays Somba, réputée pour ses habitations traditionnelles uniques : les tatas. Ces forteresses miniatures en terre crue ressemblent à de petits châteaux. La région offre des paysages magnifiques de collines et de vallées. C'est aussi le point de départ idéal pour visiter le Parc de la Pendjari et découvrir la culture fascinante du peuple Batammariba.",
    image: "https://images.unsplash.com/photo-1590080669915-3d4e68d2e20f?w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1590080669915-3d4e68d2e20f?w=800",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800",
      "https://images.unsplash.com/photo-1589308078059-be3c3044eccc?w=800",
    ],
    coordinates: { lat: 10.3, lng: 1.3833 },
    stats: {
      visitors: 15000,
      rating: 4.6,
      reviews: 423,
      area: "3 045 km²",
      altitude: "450 m",
    },
    highlights: [
      "Tatas Somba",
      "Musée régional",
      "Cascades de Kota",
      "Montagnes de l'Atacora",
      "Artisanat local",
    ],
    activities: [
      { name: "Visite des tatas", duration: "3h", price: 20, icon: Home },
      { name: "Randonnée", duration: "4h", price: 25, icon: Mountain },
      { name: "Cascades de Kota", duration: "2h", price: 15, icon: Waves },
      { name: "Rencontre Batammariba", duration: "2h", price: 15, icon: Users },
    ],
    bestTimeToVisit: ["Novembre", "Décembre", "Janvier", "Février"],
    weather: {
      temperature: { min: 18, max: 33 },
      rainfall: 1300,
      bestMonths: ["Nov", "Déc", "Jan", "Fév"],
    },
    accommodations: [
      {
        name: "Hotel Tata Somba",
        type: "Hôtel",
        price: 55,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
        amenities: ["WiFi", "Restaurant", "Climatisation"],
      },
    ],
    reviews_list: [
      {
        id: 1,
        user: "Antoine Lefort",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
        rating: 5,
        date: "2024-02-10",
        comment: "Les tatas sont fascinants. Une architecture unique au monde !",
        helpful: 31,
      },
    ],
    priceLevel: 2,
    duration: "2-3 jours",
    tags: ["Architecture", "Culture", "Montagne", "UNESCO"],
  },
  {
    id: 8,
    name: "Porto-Novo",
    region: "Ouémé",
    category: "culture",
    description: "La capitale administrative, riche d'histoire et de traditions",
    longDescription: "Porto-Novo, la capitale du Bénin, est une ville au riche patrimoine historique. Le Musée Honmè (ancien palais royal), la Grande Mosquée de style afro-brésilien, le Jardin des Plantes et de la Nature sont autant de sites à découvrir. La ville est aussi réputée pour ses masques et ses traditions vodoun. Plus calme que Cotonou, Porto-Novo offre une atmosphère authentique.",
    image: "https://images.unsplash.com/photo-1589308078059-be3c3044eccc?w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1589308078059-be3c3044eccc?w=800",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800",
      "https://images.unsplash.com/photo-1590080669915-3d4e68d2e20f?w=800",
    ],
    coordinates: { lat: 6.4833, lng: 2.6167 },
    stats: {
      visitors: 30000,
      rating: 4.4,
      reviews: 567,
      area: "110 km²",
      population: "264 000",
    },
    highlights: [
      "Musée Honmè",
      "Grande Mosquée",
      "Jardin des Plantes",
      "Palais du Gouverneur",
      "Marché Ouando",
    ],
    activities: [
      { name: "Visite Musée Honmè", duration: "2h", price: 10, icon: Landmark },
      { name: "Tour de ville", duration: "3h", price: 20, icon: Compass },
      { name: "Jardin des Plantes", duration: "1h30", price: 5, icon: TreePine },
      { name: "Balade en pirogue", duration: "2h", price: 15, icon: Waves },
    ],
    bestTimeToVisit: ["Novembre", "Décembre", "Janvier", "Février"],
    weather: {
      temperature: { min: 24, max: 31 },
      rainfall: 1400,
      bestMonths: ["Nov", "Déc", "Jan", "Fév"],
    },
    accommodations: [
      {
        name: "Hotel Beaurivage",
        type: "Hôtel",
        price: 65,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
        amenities: ["WiFi", "Restaurant", "Piscine"],
      },
    ],
    reviews_list: [
      {
        id: 1,
        user: "Julie Moreau",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
        rating: 4,
        date: "2024-03-05",
        comment: "Musée Honmè très intéressant. Guide passionnant.",
        helpful: 19,
      },
    ],
    priceLevel: 2,
    duration: "1-2 jours",
    tags: ["Histoire", "Culture", "Musées", "Architecture"],
  },
];

const categories = [
  { name: "Tous", value: "all", icon: Compass },
  { name: "Culture", value: "culture", icon: Landmark },
  { name: "Nature", value: "nature", icon: TreePine },
  { name: "Plage", value: "plage", icon: Waves },
  { name: "Ville", value: "ville", icon: Building2 },
  { name: "Historique", value: "historique", icon: Calendar },
];

const regions = [
  "Toutes les régions",
  "Atlantique",
  "Atacora",
  "Zou",
  "Mono",
  "Littoral",
  "Ouémé",
];

const Destinations = () => {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [filteredDestinations, setFilteredDestinations] = useState(destinations);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("Toutes les régions");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [showFilters, setShowFilters] = useState(false);
  const [likedDestinations, setLikedDestinations] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    let filtered = destinations;

    if (searchQuery) {
      filtered = filtered.filter(d =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(d => d.category === selectedCategory);
    }

    if (selectedRegion !== "Toutes les régions") {
      filtered = filtered.filter(d => d.region === selectedRegion);
    }

    filtered = filtered.filter(d => d.priceLevel * 25 >= priceRange[0] && d.priceLevel * 25 <= priceRange[1]);

    setFilteredDestinations(filtered);
  }, [searchQuery, selectedCategory, selectedRegion, priceRange]);

  const toggleLike = (id: number) => {
    setLikedDestinations(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  const getPriceLevelIcon = (level: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <DollarSign
        key={i}
        className={`w-3 h-3 ${i < level ? "text-primary" : "text-muted"}`}
      />
    ));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section ref={heroRef} className="relative h-[70vh] overflow-hidden">
          <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1590080669915-3d4e68d2e20f?w=1920"
              alt="Destinations Bénin"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
          </motion.div>

          <div className="absolute inset-0 flex items-center justify-center z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center text-white px-6"
            >
              <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                Explorez le Bénin
              </Badge>
              <h1 className="font-heading text-6xl md:text-8xl font-bold mb-6">
                Destinations
              </h1>
              <p className="font-body text-xl md:text-2xl max-w-3xl mx-auto text-white/90">
                Des cités lacustres aux parcs nationaux, découvrez la diversité exceptionnelle du Bénin
              </p>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="max-w-2xl mx-auto mt-8"
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Rechercher une destination..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/95 backdrop-blur-sm text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          >
            <div className="flex flex-col items-center gap-2 text-white/70">
              <span className="text-sm">Défiler pour explorer</span>
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

        {/* Filters Section */}
        <section className="py-8 bg-background border-b border-border sticky top-20 z-30">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Button
                    key={cat.value}
                    variant={selectedCategory === cat.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(cat.value)}
                    className="flex items-center gap-2"
                  >
                    <cat.icon className="w-4 h-4" />
                    {cat.name}
                  </Button>
                ))}
              </div>

              {/* Filter Controls */}
              <div className="flex flex-wrap gap-3">
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="px-4 py-2 bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {regions.map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filtres
                </Button>

                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                  >
                    <Compass className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "map" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("map")}
                  >
                    <MapPin className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Extended Filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-border"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Prix maximum</label>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>0€</span>
                      <span>{priceRange[1]}€</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Durée</label>
                    <select className="w-full px-4 py-2 bg-transparent border border-border rounded-lg">
                      <option>Toutes les durées</option>
                      <option>1-2 jours</option>
                      <option>3-5 jours</option>
                      <option>1 semaine+</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Note minimum</label>
                    <select className="w-full px-4 py-2 bg-transparent border border-border rounded-lg">
                      <option>Toutes les notes</option>
                      <option>4.5+ étoiles</option>
                      <option>4.0+ étoiles</option>
                      <option>3.5+ étoiles</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Destinations Grid */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-heading text-3xl font-bold">
                  {filteredDestinations.length} destination{filteredDestinations.length > 1 ? "s" : ""} trouvée{filteredDestinations.length > 1 ? "s" : ""}
                </h2>
                <p className="text-muted-foreground">Explorez les merveilles du Bénin</p>
              </div>
            </div>

            {viewMode === "grid" ? (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredDestinations.map((destination) => (
                  <motion.div key={destination.id} variants={fadeInUp}>
                    <Card className="overflow-hidden hover:shadow-xl transition-all group h-full flex flex-col">
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={destination.image}
                          alt={destination.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 flex gap-2">
                          {destination.featured && (
                            <Badge className="bg-primary">En vedette</Badge>
                          )}
                          {destination.trending && (
                            <Badge className="bg-orange-500">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Tendance
                            </Badge>
                          )}
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white"
                          onClick={() => toggleLike(destination.id)}
                        >
                          <Heart className={`w-4 h-4 ${likedDestinations.includes(destination.id) ? "fill-red-500 text-red-500" : ""}`} />
                        </Button>
                        <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm">
                          {destination.region}
                        </div>
                      </div>
                      <CardContent className="p-4 flex-1 flex flex-col">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-heading text-xl font-bold">{destination.name}</h3>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                            <span className="text-sm font-medium">{destination.stats.rating}</span>
                            <span className="text-xs text-muted-foreground">({destination.stats.reviews})</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {destination.description}
                        </p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {destination.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {destination.region}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
                          <div className="flex items-center gap-1">
                            {getPriceLevelIcon(destination.priceLevel)}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="group-hover:text-primary"
                            onClick={() => setSelectedDestination(destination)}
                          >
                            Découvrir
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="h-[600px] bg-muted/30 rounded-xl flex items-center justify-center">
                <p className="text-muted-foreground">Vue carte en développement</p>
              </div>
            )}
          </div>
        </section>

        {/* Featured Destination Banner */}
        {destinations.filter(d => d.featured)[0] && (
          <section className="py-16 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative rounded-2xl overflow-hidden h-[400px]"
              >
                <img
                  src={destinations.find(d => d.featured)?.image}
                  alt="Destination en vedette"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex items-center">
                  <div className="p-12 max-w-2xl">
                    <Badge className="mb-4 bg-primary">Destination en vedette</Badge>
                    <h2 className="font-heading text-4xl font-bold text-white mb-4">
                      {destinations.find(d => d.featured)?.name}
                    </h2>
                    <p className="text-white/80 text-lg mb-6">
                      {destinations.find(d => d.featured)?.description}
                    </p>
                    <Button size="lg" onClick={() => setSelectedDestination(destinations.find(d => d.featured)!)}>
                      Découvrir cette destination
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <Compass className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h2 className="font-heading text-4xl font-bold mb-4">
                Vous ne trouvez pas votre bonheur ?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Nous créons des itinéraires sur mesure selon vos envies. Parlez-nous de votre projet !
              </p>
              <Button size="lg" asChild>
                <Link to="/contact">
                  Créer mon voyage personnalisé
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Modal Destination Details */}
      {selectedDestination && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="absolute inset-0 bg-black/80" onClick={() => setSelectedDestination(null)} />
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="bg-background rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between z-10">
                <h3 className="font-heading text-2xl font-bold">{selectedDestination.name}</h3>
                <Button variant="ghost" size="icon" onClick={() => setSelectedDestination(null)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="p-6">
                {/* Gallery */}
                <div className="relative h-[400px] rounded-xl overflow-hidden mb-6">
                  <img
                    src={selectedDestination.gallery[activeImageIndex]}
                    alt={selectedDestination.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {selectedDestination.gallery.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImageIndex(i)}
                        className={`w-2 h-2 rounded-full transition-all ${activeImageIndex === i ? "w-8 bg-white" : "bg-white/50"}`}
                      />
                    ))}
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white"
                    onClick={() => setActiveImageIndex(prev => prev > 0 ? prev - 1 : selectedDestination.gallery.length - 1)}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white"
                    onClick={() => setActiveImageIndex(prev => prev < selectedDestination.gallery.length - 1 ? prev + 1 : 0)}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="overview" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="overview">Aperçu</TabsTrigger>
                    <TabsTrigger value="activities">Activités</TabsTrigger>
                    <TabsTrigger value="accommodations">Hébergements</TabsTrigger>
                    <TabsTrigger value="reviews">Avis</TabsTrigger>
                    <TabsTrigger value="info">Infos pratiques</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedDestination.longDescription}
                    </p>

                    <div>
                      <h4 className="font-bold mb-3">Points forts</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedDestination.highlights.map((highlight, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500" />
                            <span className="text-sm">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      {Object.entries(selectedDestination.stats).slice(0, 4).map(([key, value]) => (
                        <div key={key} className="text-center p-4 bg-muted/30 rounded-lg">
                          <p className="font-heading text-xl font-bold">{value}</p>
                          <p className="text-xs text-muted-foreground capitalize">{key}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="activities" className="space-y-4">
                    {selectedDestination.activities.map((activity, i) => (
                      <Card key={i}>
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                              <activity.icon className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{activity.name}</p>
                              <p className="text-sm text-muted-foreground">{activity.duration}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{activity.price}€</p>
                            <Button variant="link" size="sm">Réserver</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="accommodations" className="space-y-4">
                    {selectedDestination.accommodations.map((acc, i) => (
                      <Card key={i}>
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <img src={acc.image} alt={acc.name} className="w-24 h-24 object-cover rounded-lg" />
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="font-medium">{acc.name}</p>
                                  <p className="text-sm text-muted-foreground">{acc.type}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold">{acc.price}€ / nuit</p>
                                  <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                                    <span className="text-sm">{acc.rating}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {acc.amenities.map((amenity, j) => (
                                  <Badge key={j} variant="outline" className="text-xs">{amenity}</Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="reviews" className="space-y-4">
                    {selectedDestination.reviews_list.map((review) => (
                      <Card key={review.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <Avatar>
                              <AvatarImage src={review.avatar} />
                              <AvatarFallback>{review.user[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium">{review.user}</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(review.date).toLocaleDateString("fr-FR")}
                                </p>
                              </div>
                              <div className="flex items-center gap-1 my-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star key={i} className={`w-3 h-3 ${i < review.rating ? "fill-yellow-500 text-yellow-500" : "text-muted"}`} />
                                ))}
                              </div>
                              <p className="text-sm">{review.comment}</p>
                              <Button variant="ghost" size="sm" className="mt-2">
                                <ThumbsUp className="w-3 h-3 mr-1" />
                                Utile ({review.helpful})
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="info" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-bold mb-2 flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Meilleure période
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {selectedDestination.bestTimeToVisit.join(" • ")}
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-bold mb-2 flex items-center gap-2">
                            <Thermometer className="w-4 h-4" />
                            Climat
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {selectedDestination.weather.temperature.min}°C - {selectedDestination.weather.temperature.max}°C
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex gap-3 mt-6 pt-6 border-t border-border">
                  <Button className="flex-1" asChild>
                    <Link to="/contact">
                      Réserver maintenant
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    Partager
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Destinations;
