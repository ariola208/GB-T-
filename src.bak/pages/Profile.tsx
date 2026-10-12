import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User, Mail, Phone, MapPin, Calendar, Camera, LogOut, Settings,
  Heart, Clock, Compass, Star, Award, Edit3, Save, X, Lock,
  CheckCircle, XCircle, Trash2, AlertCircle
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { useToast } from "../hooks/use-toast";

// Service API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeader = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json'
});

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [trips, setTrips] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', email: '', phone: '', location: '', bio: '' });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  // Charger les données
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setIsLoading(true);
    try {
      const [profileRes, tripsRes, favRes, reviewsRes] = await Promise.all([
        fetch(`${API_URL}/profile/profile`, { headers: getAuthHeader() }),
        fetch(`${API_URL}/profile/trips`, { headers: getAuthHeader() }),
        fetch(`${API_URL}/profile/favorites`, { headers: getAuthHeader() }),
        fetch(`${API_URL}/profile/reviews`, { headers: getAuthHeader() })
      ]);

      if (profileRes.ok) setProfile(await profileRes.json());
      if (tripsRes.ok) setTrips(await tripsRes.json());
      if (favRes.ok) setFavorites(await favRes.json());
      if (reviewsRes.ok) setReviews(await reviewsRes.json());
    } catch (error) {
      toast({ title: "Erreur", description: "Impossible de charger le profil", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const res = await fetch(`${API_URL}/profile/profile`, {
        method: 'PUT',
        headers: getAuthHeader(),
        body: JSON.stringify(editForm)
      });
      if (res.ok) {
        await loadProfile();
        setIsEditing(false);
        toast({ title: "Succès", description: "Profil mis à jour" });
      }
    } catch (error) {
      toast({ title: "Erreur", description: "Impossible de mettre à jour", variant: "destructive" });
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('Les mots de passe ne correspondent pas');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      setPasswordError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }
    try {
      const res = await fetch(`${API_URL}/profile/change-password`, {
        method: 'PUT',
        headers: getAuthHeader(),
        body: JSON.stringify({ currentPassword: passwordData.currentPassword, newPassword: passwordData.newPassword })
      });
      if (res.ok) {
        setShowPasswordModal(false);
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        toast({ title: "Succès", description: "Mot de passe modifié" });
      } else {
        const error = await res.json();
        setPasswordError(error.error);
      }
    } catch (error) {
      setPasswordError('Erreur serveur');
    }
  };

  const handleRemoveFavorite = async (destinationId) => {
    try {
      const res = await fetch(`${API_URL}/profile/favorites/${destinationId}`, {
        method: 'DELETE',
        headers: getAuthHeader()
      });
      if (res.ok) {
        setFavorites(favorites.filter(f => f.id !== destinationId));
        toast({ title: "Succès", description: "Retiré des favoris" });
      }
    } catch (error) {
      toast({ title: "Erreur", description: "Impossible de retirer", variant: "destructive" });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    toast({ title: "Déconnecté", description: "À bientôt !" });
  };

  const startEditing = () => {
    setEditForm({
      name: profile?.name || '',
      email: profile?.email || '',
      phone: profile?.phone || '',
      location: profile?.location || '',
      bio: profile?.bio || ''
    });
    setIsEditing(true);
  };

  const getStatusBadge = (status) => {
    const variants = {
      upcoming: { label: "À venir", className: "bg-blue-500" },
      confirmed: { label: "Confirmé", className: "bg-green-500" },
      completed: { label: "Terminé", className: "bg-gray-500" },
      cancelled: { label: "Annulé", className: "bg-red-500" }
    };
    const v = variants[status] || variants.upcoming;
    return <Badge className={v.className}>{v.label}</Badge>;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center"><div className="h-12 w-12 mx-auto mb-4 animate-spin rounded-full border-4 border-primary border-t-transparent" /><p>Chargement du profil...</p></div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <div className="relative mb-12">
            <div className="h-48 bg-gradient-to-r from-primary/30 via-primary/20 to-primary/5 rounded-2xl" />
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16 px-6">
              <Avatar className="w-32 h-32 border-4 border-background">
                <AvatarFallback className="bg-primary/10 text-3xl">{profile.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="font-heading text-3xl font-bold">{profile.name}</h1>
                <p className="text-muted-foreground flex items-center gap-1 mt-1">
                  <MapPin className="w-4 h-4" />{profile.location || 'Non renseigné'}
                  <span className="mx-2">•</span>
                  <Calendar className="w-4 h-4" />Membre depuis {new Date(profile.joinedDate).toLocaleDateString('fr-FR')}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={startEditing}><Edit3 className="w-4 h-4 mr-2" />Modifier</Button>
                <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10" onClick={handleLogout}><LogOut className="w-4 h-4 mr-2" />Déconnexion</Button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Compass, label: "Voyages", value: profile.stats?.trips || 0 },
              { icon: Star, label: "Avis", value: profile.stats?.reviews || 0 },
              { icon: Heart, label: "Favoris", value: favorites.length },
              { icon: Award, label: "Points", value: profile.stats?.points || 0 }
            ].map((stat, i) => (
              <Card key={i} className="text-center"><CardContent className="p-6"><stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" /><p className="font-heading text-3xl font-bold">{stat.value}</p><p className="text-sm text-muted-foreground">{stat.label}</p></CardContent></Card>
            ))}
          </div>

          {/* Tabs */}
          <Tabs defaultValue="trips" className="space-y-8">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="trips">Voyages</TabsTrigger>
              <TabsTrigger value="favorites">Favoris</TabsTrigger>
              <TabsTrigger value="reviews">Avis</TabsTrigger>
              <TabsTrigger value="profile">Profil</TabsTrigger>
            </TabsList>

            {/* Trips Tab */}
            <TabsContent value="trips">
              {trips.length === 0 ? (
                <div className="text-center py-12"><Compass className="w-12 h-12 text-muted-foreground mx-auto mb-4" /><p>Aucun voyage pour le moment</p><Button className="mt-4" asChild><Link to="/destinations">Explorer</Link></Button></div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {trips.map(trip => (
                    <Card key={trip.id} className="overflow-hidden">
                      <img src={trip.image} className="w-full h-48 object-cover" />
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start"><h3 className="font-bold text-lg">{trip.destination}</h3>{getStatusBadge(trip.status)}</div>
                        <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2"><Calendar className="w-4 h-4" />{trip.startDate} - {trip.endDate}</p>
                        <p className="text-sm"><span className="font-medium">{trip.travelers}</span> voyageur(s)</p>
                        <p className="font-bold mt-2">{trip.price}€</p>
                        {trip.status === 'upcoming' && <Button size="sm" className="mt-3 w-full">Gérer la réservation</Button>}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Favorites Tab */}
            <TabsContent value="favorites">
              {favorites.length === 0 ? (
                <div className="text-center py-12"><Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" /><p>Aucun favori</p><Button className="mt-4" asChild><Link to="/destinations">Découvrir</Link></Button></div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favorites.map(fav => (
                    <Card key={fav.id} className="overflow-hidden">
                      <img src={fav.image} className="w-full h-48 object-cover" />
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start"><h3 className="font-bold">{fav.name}</h3><Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleRemoveFavorite(fav.id)}><Trash2 className="w-4 h-4" /></Button></div>
                        <p className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" />{fav.location}</p>
                        <div className="flex items-center gap-1 mt-2"><Star className="w-4 h-4 fill-yellow-500 text-yellow-500" /><span>{fav.rating}</span></div>
                        <Button variant="outline" size="sm" className="mt-3 w-full" asChild><Link to={`/destinations/${fav.slug}`}>Voir détails</Link></Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews">
              {reviews.length === 0 ? (
                <div className="text-center py-12"><Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" /><p>Pas encore d'avis</p></div>
              ) : (
                <div className="space-y-4">
                  {reviews.map(review => (
                    <Card key={review.id}><CardContent className="p-6"><div className="flex justify-between items-start"><div><h3 className="font-bold">{review.destination}</h3><p className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString('fr-FR')}</p></div><div className="flex items-center gap-1">{Array(5).fill(0).map((_, i) => (<Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-yellow-500 text-yellow-500" : "text-muted"}`} />))}</div></div><p className="mt-3 text-muted-foreground">{review.comment}</p></CardContent></Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card><CardHeader className="flex flex-row justify-between items-center"><CardTitle>Informations personnelles</CardTitle><Button variant="outline" size="sm" onClick={startEditing}><Edit3 className="w-4 h-4 mr-2" />Modifier</Button></CardHeader><CardContent>
                    {isEditing ? (
                      <form onSubmit={(e) => { e.preventDefault(); handleUpdateProfile(); }} className="space-y-4">
                        <Input label="Nom complet" value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} required />
                        <Input label="Email" type="email" value={editForm.email} onChange={(e) => setEditForm({...editForm, email: e.target.value})} required />
                        <Input label="Téléphone" value={editForm.phone} onChange={(e) => setEditForm({...editForm, phone: e.target.value})} />
                        <Input label="Localisation" value={editForm.location} onChange={(e) => setEditForm({...editForm, location: e.target.value})} />
                        <div><label className="text-sm font-medium mb-2 block">Bio</label><textarea className="w-full px-4 py-3 border rounded-lg" rows={4} value={editForm.bio} onChange={(e) => setEditForm({...editForm, bio: e.target.value})} /></div>
                        <div className="flex gap-2"><Button type="submit"><Save className="w-4 h-4 mr-2" />Enregistrer</Button><Button type="button" variant="outline" onClick={() => setIsEditing(false)}><X className="w-4 h-4 mr-2" />Annuler</Button></div>
                      </form>
                    ) : (
                      <div className="space-y-4"><div className="flex items-center gap-3 py-2 border-b"><User className="w-5 h-5 text-muted-foreground" /><dt className="w-24 text-sm">Nom</dt><dd className="flex-1 font-medium">{profile.name}</dd></div><div className="flex items-center gap-3 py-2 border-b"><Mail className="w-5 h-5 text-muted-foreground" /><dt className="w-24 text-sm">Email</dt><dd className="flex-1 font-medium">{profile.email}</dd></div><div className="flex items-center gap-3 py-2 border-b"><Phone className="w-5 h-5 text-muted-foreground" /><dt className="w-24 text-sm">Téléphone</dt><dd className="flex-1 font-medium">{profile.phone || "Non renseigné"}</dd></div><div className="flex items-center gap-3 py-2 border-b"><MapPin className="w-5 h-5 text-muted-foreground" /><dt className="w-24 text-sm">Localisation</dt><dd className="flex-1 font-medium">{profile.location || "Non renseigné"}</dd></div><div><dt className="text-sm text-muted-foreground mb-2">Bio</dt><dd className="text-muted-foreground">{profile.bio || "Aucune bio"}</dd></div></div>
                    )}
                  </CardContent></Card>
                </div>
                <div className="space-y-6">
                  <Card><CardHeader><CardTitle>Sécurité</CardTitle></CardHeader><CardContent><Button variant="outline" className="w-full justify-start" onClick={() => setShowPasswordModal(true)}><Lock className="w-4 h-4 mr-2" />Changer le mot de passe</Button></CardContent></Card>
                  <Card><CardHeader><CardTitle>Besoin d'aide ?</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground mb-4">Notre équipe est disponible 24/7.</p><Button variant="link" className="p-0" asChild><Link to="/contact">Contacter le support</Link></Button></CardContent></Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center"><div className="absolute inset-0 bg-black/80" onClick={() => setShowPasswordModal(false)} /><div className="relative bg-background rounded-2xl p-6 max-w-md w-full"><h3 className="font-heading text-2xl font-bold mb-4">Changer le mot de passe</h3><div className="space-y-4"><Input type="password" placeholder="Mot de passe actuel" value={passwordData.currentPassword} onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})} /><Input type="password" placeholder="Nouveau mot de passe" value={passwordData.newPassword} onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})} /><Input type="password" placeholder="Confirmer" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})} /></div>{passwordError && <p className="text-destructive text-sm mt-2">{passwordError}</p>}<div className="flex gap-3 mt-6"><Button onClick={handleChangePassword} className="flex-1">Modifier</Button><Button variant="outline" onClick={() => setShowPasswordModal(false)}>Annuler</Button></div></div></div>
      )}
    </div>
  );
};

export default Profile;
