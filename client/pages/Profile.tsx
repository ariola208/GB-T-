import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  ShoppingBag, 
  Heart, 
  Settings,
  Save,
  Edit,
  Package,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";

export default function Profile() {
  const { user, isAuthenticated, updateProfile } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { state: wishlistState } = useWishlist();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
  });

  // Simuler des commandes passées
  const [orders] = useState([
    {
      id: 'CMD-001',
      date: '2024-01-15',
      total: 89.99,
      status: 'livré',
      items: 3,
    },
    {
      id: 'CMD-002',
      date: '2024-01-10',
      total: 45.50,
      status: 'en cours',
      items: 2,
    },
    {
      id: 'CMD-003',
      date: '2024-01-05',
      total: 129.99,
      status: 'livré',
      items: 4,
    },
  ]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        country: user.country || '',
        postalCode: user.postalCode || '',
      });
    }
  }, [user]);

  if (!user) {
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    updateProfile(formData);
    setIsEditing(false);
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'livré':
        return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" /> Livré</Badge>;
      case 'en cours':
        return <Badge className="bg-yellow-500"><Clock className="w-3 h-3 mr-1" /> En cours</Badge>;
      default:
        return <Badge variant="outline"><Package className="w-3 h-3 mr-1" /> {status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* En-tête du profil */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-gradient-to-br from-[#7c3aed] to-[#5b21b6] text-white text-2xl">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">{t('profile.title')}</h1>
              <p className="text-muted-foreground">
                <Calendar className="inline h-4 w-4 mr-1" />
                {t('profile.memberSince')} {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              {t('profile.edit')}
            </Button>
          )}
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              {t('profile.personalInfo')}
            </TabsTrigger>
            <TabsTrigger value="orders">
              <ShoppingBag className="h-4 w-4 mr-2" />
              {t('profile.orders')} ({orders.length})
            </TabsTrigger>
            <TabsTrigger value="wishlist">
              <Heart className="h-4 w-4 mr-2" />
              {t('profile.wishlist')} ({wishlistState.itemCount})
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              {t('button.settings')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>{t('profile.personalInfo')}</CardTitle>
                <CardDescription>
                  {isEditing 
                    ? "Modifiez vos informations personnelles" 
                    : "Consultez vos informations personnelles"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t('profile.name')}</label>
                    {isEditing ? (
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={t('profile.name')}
                      />
                    ) : (
                      <div className="flex items-center space-x-2 p-2 bg-muted rounded-md">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{user.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t('profile.email')}</label>
                    <div className="flex items-center space-x-2 p-2 bg-muted rounded-md">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{user.email}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t('profile.phone')}</label>
                    {isEditing ? (
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder={t('profile.phone')}
                      />
                    ) : (
                      <div className="flex items-center space-x-2 p-2 bg-muted rounded-md">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{user.phone || 'Non renseigné'}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t('profile.address')}</label>
                    {isEditing ? (
                      <Input
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder={t('profile.address')}
                      />
                    ) : (
                      <div className="flex items-center space-x-2 p-2 bg-muted rounded-md">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{user.address || 'Non renseigné'}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t('profile.city')}</label>
                    {isEditing ? (
                      <Input
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder={t('profile.city')}
                      />
                    ) : (
                      <div className="p-2 bg-muted rounded-md">
                        {user.city || 'Non renseigné'}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t('profile.country')}</label>
                    {isEditing ? (
                      <Input
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        placeholder={t('profile.country')}
                      />
                    ) : (
                      <div className="p-2 bg-muted rounded-md">
                        {user.country || 'Non renseigné'}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t('profile.postalCode')}</label>
                    {isEditing ? (
                      <Input
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder={t('profile.postalCode')}
                      />
                    ) : (
                      <div className="p-2 bg-muted rounded-md">
                        {user.postalCode || 'Non renseigné'}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              {isEditing && (
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    <XCircle className="h-4 w-4 mr-2" />
                    {t('button.cancel')}
                  </Button>
                  <Button onClick={handleSaveProfile}>
                    <Save className="h-4 w-4 mr-2" />
                    {t('button.save')}
                  </Button>
                </CardFooter>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>{t('profile.orders')}</CardTitle>
                <CardDescription>{t('profile.recentOrders')}</CardDescription>
              </CardHeader>
              <CardContent>
                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-semibold">{order.id}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>
                          {getStatusBadge(order.status)}
                        </div>
                        <Separator className="my-2" />
                        <div className="flex items-center justify-between text-sm">
                          <span>{order.items} articles</span>
                          <span className="font-semibold">{order.total.toFixed(2)} €</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    {t('profile.noOrders')}
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wishlist">
            <Card>
              <CardHeader>
                <CardTitle>{t('profile.wishlist')}</CardTitle>
                <CardDescription>Produits que vous avez aimés</CardDescription>
              </CardHeader>
              <CardContent>
                {wishlistState.itemCount > 0 ? (
                  <p>Contenu de la wishlist à afficher ici</p>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    {t('profile.noWishlist')}
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>{t('button.settings')}</CardTitle>
                <CardDescription>Paramètres de votre compte</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">
                  Paramètres du compte (à implémenter)
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
