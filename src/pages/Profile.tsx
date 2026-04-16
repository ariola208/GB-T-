import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Save,
  Camera,
  LogOut,
  Settings,
  Heart,
  Clock,
  ChevronRight,
  Edit3,
  CheckCircle,
  XCircle,
  AlertCircle,
  CreditCard,
  Bell,
  Lock,
  Globe,
  Award,
  Star,
  TrendingUp,
  Compass,
  Home,
  Info,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { fadeIn, staggerContainer, fadeInUp } from "@/lib/animations";

// Types
interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar?: string;
  bio?: string;
  joinedDate: string;
  preferences: {
    notifications: boolean;
    newsletter: boolean;
    language: "fr" | "en";
  };
  stats: {
    trips: number;
    reviews: number;
    photos: number;
    points: number;
  };
}

interface Trip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: "upcoming" | "completed" | "cancelled";
  image: string;
  price: number;
  travelers: number;
}

interface Favorite {
  id: string;
  name: string;
  type: "destination" | "hotel" | "activity" | "restaurant";
  image: string;
  location: string;
  rating: number;
}

interface Review {
  id: string;
  destination: string;
  rating: number;
  comment: string;
  date: string;
}

// Schéma de validation
const profileSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
  location: z.string().optional(),
  bio: z.string().max(500, "La bio ne doit pas dépasser 500 caractères").optional(),
});

type ProfileForm = z.infer<typeof profileSchema>;

// Données mockées
const mockProfile: UserProfile = {
  id: "1",
  name: "Jean Kouagou",
  email: "jean.kouagou@email.com",
  phone: "+229 97 12 34 56",
  location: "Cotonou, Bénin",
  bio: "Passionné de voyage et de culture béninoise. J'adore découvrir les traditions locales et partager mes expériences avec d'autres voyageurs.",
  joinedDate: "2023-06-15",
  preferences: {
    notifications: true,
    newsletter: true,
    language: "fr",
  },
  stats: {
    trips: 12,
    reviews: 8,
    photos: 45,
    points: 1250,
  },
};

const mockTrips: Trip[] = [
  {
    id: "1",
    destination: "Ganvié - La Venise de l'Afrique",
    startDate: "2024-03-15",
    endDate: "2024-03-20",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1590080669915-3d4e68d2e20f?w=600",
    price: 450,
    travelers: 2,
  },
  {
    id: "2",
    destination: "Parc National de la Pendjari",
    startDate: "2023-11-20",
    endDate: "2023-11-25",
    status: "completed",
    image: "https://images.unsplash.com/photo-1547970810-dc1e93b62d48?w=600",
    price: 680,
    travelers: 4,
  },
  {
    id: "3",
    destination: "Ouidah - Route des Esclaves",
    startDate: "2023-08-10",
    endDate: "2023-08-12",
    status: "completed",
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600",
    price: 220,
    travelers: 1,
  },
  {
    id: "4",
    destination: "Palais Royaux d'Abomey",
    startDate: "2024-05-05",
    endDate: "2024-05-07",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1589308078059-be3c3044eccc?w=600",
    price: 180,
    travelers: 3,
  },
];

const mockFavorites: Favorite[] = [
  {
    id: "1",
    name: "Ganvié",
    type: "destination",
    image: "https://images.unsplash.com/photo-1590080669915-3d4e68d2e20f?w=600",
    location: "Lac Nokoué",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Hôtel Benin Marina",
    type: "hotel",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600",
    location: "Cotonou",
    rating: 4.5,
  },
  {
    id: "3",
    name: "Route des Pêches",
    type: "activity",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
    location: "Cotonou",
    rating: 4.7,
  },
  {
    id: "4",
    name: "Chez Clarisse",
    type: "restaurant",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600",
    location: "Ouidah",
    rating: 4.9,
  },
];

const mockReviews: Review[] = [
  {
    id: "1",
    destination: "Parc Pendjari",
    rating: 5,
    comment: "Une expérience incroyable ! Les guides étaient très professionnels et nous avons vu des lions, des éléphants et même un léopard !",
    date: "2023-11-28",
  },
  {
    id: "2",
    destination: "Ouidah",
    rating: 4,
    comment: "Très émouvant, la visite de la Porte du Non-Retour est un moment fort. Guide passionnant.",
    date: "2023-08-15",
  },
];

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(mockProfile);
  const [trips] = useState<Trip[]>(mockTrips);
  const [favorites] = useState<Favorite[]>(mockFavorites);
  const [reviews] = useState<Review[]>(mockReviews);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler un chargement
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      location: profile.location,
      bio: profile.bio,
    },
  });

  const onSubmit = (data: ProfileForm) => {
    setProfile({ ...profile, ...data });
    setIsEditing(false);
    toast({
      title: "✅ Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès.",
    });
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  const handleLogout = () => {
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès.",
    });
    navigate("/");
  };

  const getStatusBadge = (status: Trip["status"]) => {
    const variants = {
      upcoming: { label: "À venir", variant: "default" as const, icon: Clock },
      completed: { label: "Terminé", variant: "secondary" as const, icon: CheckCircle },
      cancelled: { label: "Annulé", variant: "destructive" as const, icon: XCircle },
    };
    const { label, variant, icon: Icon } = variants[status];
    return (
      <Badge variant={variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {label}
      </Badge>
    );
  };

  const getTypeLabel = (type: Favorite["type"]) => {
    const labels = {
      destination: { text: "Destination", color: "bg-blue-500" },
      hotel: { text: "Hôtel", color: "bg-green-500" },
      activity: { text: "Activité", color: "bg-orange-500" },
      restaurant: { text: "Restaurant", color: "bg-red-500" },
    };
    return labels[type];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 mx-auto mb-4 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-6 py-8">
          {/* En-tête du profil */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="relative mb-12"
          >
            <div className="h-48 bg-gradient-to-r from-primary/30 via-primary/20 to-primary/5 rounded-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/30 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16 px-6">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-background ring-2 ring-primary/20">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback className="bg-primary/10 text-3xl font-heading">
                    {profile.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute bottom-0 right-0 rounded-full bg-background shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex-1">
                <h1 className="font-heading text-3xl font-bold">{profile.name}</h1>
                <p className="text-muted-foreground flex items-center gap-1 mt-1">
                  <MapPin className="w-4 h-4" />
                  {profile.location}
                  <span className="mx-2">•</span>
                  <Calendar className="w-4 h-4" />
                  Membre depuis {new Date(profile.joinedDate).toLocaleDateString("fr-FR", { year: "numeric", month: "long" })}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Paramètres
                </Button>
                <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Déconnexion
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {[
              { icon: Compass, label: "Voyages", value: profile.stats.trips, color: "text-blue-500" },
              { icon: Star, label: "Avis", value: profile.stats.reviews, color: "text-yellow-500" },
              { icon: Camera, label: "Photos", value: profile.stats.photos, color: "text-green-500" },
              { icon: Award, label: "Points", value: profile.stats.points, color: "text-purple-500" },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="text-center">
                  <CardContent className="p-6">
                    <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                    <p className="font-heading text-3xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Onglets */}
          <Tabs defaultValue="profile" className="space-y-8">
            <TabsList className="grid w-full max-w-2xl grid-cols-4">
              <TabsTrigger value="profile">Profil</TabsTrigger>
              <TabsTrigger value="trips">Voyages</TabsTrigger>
              <TabsTrigger value="favorites">Favoris</TabsTrigger>
              <TabsTrigger value="reviews">Avis</TabsTrigger>
            </TabsList>

            {/* Onglet Profil */}
            <TabsContent value="profile">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="lg:col-span-2">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>Informations personnelles</CardTitle>
                      {!isEditing && (
                        <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                          <Edit3 className="w-4 h-4 mr-2" />
                          Modifier
                        </Button>
                      )}
                    </CardHeader>
                    <CardContent>
                      {isEditing ? (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                          <Input
                            label="Nom complet"
                            icon={<User className="w-4 h-4" />}
                            error={errors.name?.message}
                            {...register("name")}
                          />
                          <Input
                            label="Email"
                            type="email"
                            icon={<Mail className="w-4 h-4" />}
                            error={errors.email?.message}
                            {...register("email")}
                          />
                          <Input
                            label="Téléphone"
                            icon={<Phone className="w-4 h-4" />}
                            error={errors.phone?.message}
                            {...register("phone")}
                          />
                          <Input
                            label="Localisation"
                            icon={<MapPin className="w-4 h-4" />}
                            error={errors.location?.message}
                            {...register("location")}
                          />
                          <div>
                            <label className="text-sm font-medium mb-2 block">Bio</label>
                            <textarea
                              className="w-full px-4 py-3 bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                              rows={4}
                              {...register("bio")}
                            />
                            {errors.bio && (
                              <p className="text-sm text-destructive mt-1">{errors.bio.message}</p>
                            )}
                          </div>
                          <div className="flex gap-2 justify-end">
                            <Button type="button" variant="outline" onClick={handleCancel}>
                              Annuler
                            </Button>
                            <Button type="submit" disabled={!isDirty}>
                              <Save className="w-4 h-4 mr-2" />
                              Enregistrer
                            </Button>
                          </div>
                        </form>
                      ) : (
                        <dl className="space-y-4">
                          <div className="flex items-center gap-3 py-2 border-b border-border">
                            <User className="w-5 h-5 text-muted-foreground" />
                            <dt className="w-24 text-sm text-muted-foreground">Nom</dt>
                            <dd className="flex-1 font-medium">{profile.name}</dd>
                          </div>
                          <div className="flex items-center gap-3 py-2 border-b border-border">
                            <Mail className="w-5 h-5 text-muted-foreground" />
                            <dt className="w-24 text-sm text-muted-foreground">Email</dt>
                            <dd className="flex-1 font-medium">{profile.email}</dd>
                          </div>
                          <div className="flex items-center gap-3 py-2 border-b border-border">
                            <Phone className="w-5 h-5 text-muted-foreground" />
                            <dt className="w-24 text-sm text-muted-foreground">Téléphone</dt>
                            <dd className="flex-1 font-medium">{profile.phone || "Non renseigné"}</dd>
                          </div>
                          <div className="flex items-center gap-3 py-2 border-b border-border">
                            <MapPin className="w-5 h-5 text-muted-foreground" />
                            <dt className="w-24 text-sm text-muted-foreground">Localisation</dt>
                            <dd className="flex-1 font-medium">{profile.location || "Non renseigné"}</dd>
                          </div>
                          <div className="pt-4">
                            <dt className="text-sm text-muted-foreground mb-2">Bio</dt>
                            <dd className="text-muted-foreground leading-relaxed">
                              {profile.bio || "Aucune bio renseignée"}
                            </dd>
                          </div>
                        </dl>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Préférences</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Bell className="w-4 h-4 text-muted-foreground" />
                          <span>Notifications</span>
                        </div>
                        <Badge variant={profile.preferences.notifications ? "default" : "secondary"}>
                          {profile.preferences.notifications ? "Activé" : "Désactivé"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span>Newsletter</span>
                        </div>
                        <Badge variant={profile.preferences.newsletter ? "default" : "secondary"}>
                          {profile.preferences.newsletter ? "Abonné" : "Non abonné"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Globe className="w-4 h-4 text-muted-foreground" />
                          <span>Langue</span>
                        </div>
                        <Badge variant="outline">
                          {profile.preferences.language === "fr" ? "Français" : "English"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Sécurité</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Lock className="w-4 h-4 mr-2" />
                        Changer le mot de passe
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Shield className="w-4 h-4 mr-2" />
                        Authentification à deux facteurs
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Besoin d'aide ?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Notre équipe support est disponible 24/7 pour vous aider.
                      </p>
                      <Button variant="link" className="p-0 h-auto" asChild>
                        <Link to="/contact" className="flex items-center gap-1">
                          Contacter le support
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>

            {/* Onglet Voyages */}
            <TabsContent value="trips">
              <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading text-2xl font-bold">Mes voyages</h2>
                  <Button asChild>
                    <Link to="/destinations">
                      <Compass className="w-4 h-4 mr-2" />
                      Explorer
                    </Link>
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {trips.map((trip) => (
                    <motion.div key={trip.id} variants={fadeInUp}>
                      <Card className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
                        <div className="relative h-48">
                          <img
                            src={trip.image}
                            alt={trip.destination}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 right-3">
                            {getStatusBadge(trip.status)}
                          </div>
                          <div className="absolute bottom-3 left-3 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                            {trip.travelers} {trip.travelers > 1 ? "voyageurs" : "voyageur"}
                          </div>
                        </div>
                        <CardContent className="pt-4">
                          <h3 className="font-heading text-lg font-bold mb-2 line-clamp-1">
                            {trip.destination}
                          </h3>
                          <div className="space-y-2 text-sm text-muted-foreground">
                            <p className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              Du {new Date(trip.startDate).toLocaleDateString("fr-FR")} au {new Date(trip.endDate).toLocaleDateString("fr-FR")}
                            </p>
                            <p className="flex items-center gap-2">
                              <CreditCard className="w-4 h-4" />
                              {trip.price.toLocaleString("fr-FR")} €
                            </p>
                          </div>
                          <div className="flex gap-2 mt-4">
                            <Button variant="outline" size="sm" className="flex-1" asChild>
                              <Link to={`/destinations`}>
                                Détails
                              </Link>
                            </Button>
                            {trip.status === "upcoming" && (
                              <Button size="sm" className="flex-1">
                                Gérer
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                {trips.length === 0 && (
                  <div className="text-center py-12">
                    <Compass className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Vous n'avez pas encore de voyages</p>
                    <Button className="mt-4" asChild>
                      <Link to="/destinations">Explorer les destinations</Link>
                    </Button>
                  </div>
                )}
              </motion.div>
            </TabsContent>

            {/* Onglet Favoris */}
            <TabsContent value="favorites">
              <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                <h2 className="font-heading text-2xl font-bold mb-6">Mes favoris</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favorites.map((favorite) => {
                    const typeInfo = getTypeLabel(favorite.type);
                    return (
                      <motion.div key={favorite.id} variants={fadeInUp}>
                        <Card className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
                          <div className="relative h-48">
                            <img
                              src={favorite.image}
                              alt={favorite.name}
                              className="w-full h-full object-cover"
                            />
                            <Button
                              size="icon"
                              variant="ghost"
                              className="absolute top-3 right-3 bg-background/80 hover:bg-background"
                            >
                              <Heart className="w-4 h-4 fill-destructive text-destructive" />
                            </Button>
                            <div className="absolute bottom-3 left-3">
                              <Badge className={`${typeInfo.color} text-white border-0`}>
                                {typeInfo.text}
                              </Badge>
                            </div>
                          </div>
                          <CardContent className="pt-4">
                            <h3 className="font-heading text-lg font-bold mb-1">
                              {favorite.name}
                            </h3>
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {favorite.location}
                              </p>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                <span className="text-sm font-medium">{favorite.rating}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </TabsContent>

            {/* Onglet Avis */}
            <TabsContent value="reviews">
              <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                <h2 className="font-heading text-2xl font-bold mb-6">Mes avis</h2>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <motion.div key={review.id} variants={fadeInUp}>
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-heading text-lg font-bold">{review.destination}</h3>
                              <p className="text-sm text-muted-foreground">
                                {new Date(review.date).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < review.rating ? "fill-yellow-500 text-yellow-500" : "text-muted"}`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-muted-foreground">{review.comment}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
