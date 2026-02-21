import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
  XCircle,
  Camera,
  Moon,
  Sun,
  Bell,
  Shield,
  Globe,
  CreditCard,
  LogOut,
  Trash2,
  Download,
  Eye,
  EyeOff,
  Languages,
  Palette,
  Lock
} from "lucide-react";

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'livré' | 'en cours' | 'annulé' | 'en préparation';
  items: number;
  products?: Array<{ id: string; name: string; quantity: number; price: number }>;
}

export default function Profile() {
  const { user, isAuthenticated, updateProfile, logout, deleteAccount } = useAuth();
  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const { state: wishlistState } = useWishlist();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    orderUpdates: true,
    promotions: false,
  });
  const [privacySettings, setPrivacySettings] = useState({
    showEmail: false,
    showPhone: false,
    showAddress: false,
    publicProfile: true,
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    bio: '',
    website: '',
    company: '',
  });

  // Données de commandes
  const [orders] = useState<Order[]>([
    {
      id: 'CMD-001',
      date: '2024-01-15',
      total: 89.99,
      status: 'livré',
      items: 3,
      products: [
        { id: '1', name: 'Produit 1', quantity: 2, price: 29.99 },
        { id: '2', name: 'Produit 2', quantity: 1, price: 30.01 },
      ]
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
        bio: user.bio || '',
        website: user.website || '',
        company: user.company || '',
      });
      setAvatarPreview(user.avatar || null);
    }
  }, [user]);

  if (!user) {
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "Erreur",
          description: "L'image ne doit pas dépasser 5MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
        updateProfile({ ...formData, avatar: reader.result as string });
        toast({
          title: "Photo mise à jour",
          description: "Votre photo de profil a été modifiée avec succès.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    updateProfile({ ...formData, avatar: avatarPreview || user.avatar });
    setIsEditing(false);
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès.",
    });
  };

  const handleNotificationChange = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({ ...prev, [key]: !prev[key] }));
    toast({
      title: "Paramètres mis à jour",
      description: "Vos préférences de notification ont été modifiées.",
    });
  };

  const handlePrivacyChange = (key: keyof typeof privacySettings) => {
    setPrivacySettings(prev => ({ ...prev, [key]: !prev[key] }));
    toast({
      title: "Confidentialité mise à jour",
      description: "Vos paramètres de confidentialité ont été modifiés.",
    });
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les nouveaux mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast({
        title: "Erreur",
        description: "Le mot de passe doit contenir au moins 8 caractères.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Mot de passe modifié",
      description: "Votre mot de passe a été mis à jour avec succès.",
    });
    setIsPasswordDialogOpen(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleDeleteAccount = () => {
    if (deleteAccount) {
      deleteAccount();
    }
    toast({
      title: "Compte supprimé",
      description: "Votre compte a été supprimé définitivement.",
    });
    navigate('/');
  };

  const handleExportData = () => {
    const userData = {
      profile: user,
      orders: orders,
      wishlist: wishlistState.items,
      settings: {
        notifications: notificationSettings,
        privacy: privacySettings,
        language,
        theme,
      }
    };
    
    const dataStr = JSON.stringify(userData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `user-data-${new Date().toISOString()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Données exportées",
      description: "Vos données ont été téléchargées avec succès.",
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getStatusBadge = (status: Order['status']) => {
    const statusConfig = {
      'livré': { className: "bg-green-500", icon: CheckCircle, text: "Livré" },
      'en cours': { className: "bg-yellow-500", icon: Clock, text: "En cours" },
      'annulé': { className: "bg-red-500", icon: XCircle, text: "Annulé" },
      'en préparation': { className: "bg-blue-500", icon: Package, text: "En préparation" },
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <Badge className={config.className}>
        <Icon className="w-3 h-3 mr-1" />
        {config.text}
      </Badge>
    );
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* En-tête du profil */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <Avatar className="h-24 w-24 cursor-pointer" onClick={handleAvatarClick}>
                <AvatarImage src={avatarPreview || user.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-[#7c3aed] to-[#5b21b6] text-white text-2xl">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <button
                onClick={handleAvatarClick}
                className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Camera className="h-4 w-4" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-muted-foreground">
                <p className="flex items-center">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Membre depuis {new Date(user.createdAt).toLocaleDateString()}
                </p>
                {user.bio && (
                  <>
                    <span className="hidden sm:inline">•</span>
                    <p className="text-sm">{user.bio}</p>
                  </>
                )}
              </div>
            </div>
          </div>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Modifier le profil
            </Button>
          )}
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="flex flex-wrap h-auto">
            <TabsTrigger value="profile" className="flex-1">
              <User className="h-4 w-4 mr-2" />
              Informations
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex-1">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Commandes ({orders.length})
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex-1">
              <Heart className="h-4 w-4 mr-2" />
              Favoris ({wishlistState.itemCount})
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex-1">
              <Settings className="h-4 w-4 mr-2" />
              Paramètres
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
                <CardDescription>
                  {isEditing 
                    ? "Modifiez vos informations personnelles" 
                    : "Consultez vos informations personnelles"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nom complet</label>
                    {isEditing ? (
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Votre nom"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 p-2 bg-muted rounded-md">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{user.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <div className="flex items-center space-x-2 p-2 bg-muted rounded-md">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{user.email}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Bio</label>
                    {isEditing ? (
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder="Parlez-nous de vous..."
                        className="w-full min-h-[100px] p-2 border rounded-md"
                      />
                    ) : (
                      <div className="p-2 bg-muted rounded-md">
                        {user.bio || 'Aucune bio renseignée'}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Téléphone</label>
                    {isEditing ? (
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Votre téléphone"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 p-2 bg-muted rounded-md">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{user.phone || 'Non renseigné'}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Site web</label>
                    {isEditing ? (
                      <Input
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        placeholder="https://..."
                      />
                    ) : (
                      <div className="p-2 bg-muted rounded-md">
                        {user.website || 'Non renseigné'}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Entreprise</label>
                    {isEditing ? (
                      <Input
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Votre entreprise"
                      />
                    ) : (
                      <div className="p-2 bg-muted rounded-md">
                        {user.company || 'Non renseigné'}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Adresse</label>
                    {isEditing ? (
                      <Input
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Votre adresse"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 p-2 bg-muted rounded-md">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{user.address || 'Non renseigné'}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Ville</label>
                    {isEditing ? (
                      <Input
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Votre ville"
                      />
                    ) : (
                      <div className="p-2 bg-muted rounded-md">
                        {user.city || 'Non renseigné'}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Pays</label>
                    {isEditing ? (
                      <Input
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        placeholder="Votre pays"
                      />
                    ) : (
                      <div className="p-2 bg-muted rounded-md">
                        {user.country || 'Non renseigné'}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Code postal</label>
                    {isEditing ? (
                      <Input
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="Code postal"
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
                    Annuler
                  </Button>
                  <Button onClick={handleSaveProfile}>
                    <Save className="h-4 w-4 mr-2" />
                    Enregistrer
                  </Button>
                </CardFooter>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Mes commandes</CardTitle>
                <CardDescription>Historique de vos commandes</CardDescription>
              </CardHeader>
              <CardContent>
                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                          <div>
                            <p className="font-semibold text-lg">{order.id}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.date).toLocaleDateString('fr-FR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                          {getStatusBadge(order.status)}
                        </div>
                        
                        {order.products && (
                          <div className="mt-3 mb-2">
                            <p className="text-sm font-medium mb-1">Articles :</p>
                            {order.products.map((product, idx) => (
                              <div key={idx} className="text-sm text-muted-foreground flex justify-between">
                                <span>{product.name} x{product.quantity}</span>
                                <span>{(product.price * product.quantity).toFixed(2)} €</span>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <Separator className="my-2" />
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            {order.items} article{order.items > 1 ? 's' : ''}
                          </span>
                          <div className="text-right">
                            <span className="text-sm text-muted-foreground">Total : </span>
                            <span className="font-bold text-lg">{order.total.toFixed(2)} €</span>
                          </div>
                        </div>

                        <div className="mt-3 flex gap-2">
                          <Button variant="outline" size="sm">
                            <Package className="h-4 w-4 mr-1" />
                            Suivre
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Facture
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-4">Aucune commande pour le moment</p>
                    <Button onClick={() => navigate('/shop')}>
                      Découvrir nos produits
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wishlist">
            <Card>
              <CardHeader>
                <CardTitle>Ma liste de favoris</CardTitle>
                <CardDescription>Produits que vous avez aimés</CardDescription>
              </CardHeader>
              <CardContent>
                {wishlistState.itemCount > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Les produits de la wishlist seront affichés ici */}
                    <p className="col-span-full text-center text-muted-foreground py-8">
                      Contenu de la wishlist à implémenter
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-4">Votre liste de favoris est vide</p>
                    <Button onClick={() => navigate('/shop')}>
                      Explorer les produits
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid gap-6">
              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    Notifications
                  </CardTitle>
                  <CardDescription>Gérez vos préférences de notification</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notifications par email</Label>
                      <p className="text-sm text-muted-foreground">
                        Recevoir des notifications par email
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={() => handleNotificationChange('emailNotifications')}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notifications push</Label>
                      <p className="text-sm text-muted-foreground">
                        Recevoir des notifications push
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={() => handleNotificationChange('pushNotifications')}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Mises à jour des commandes</Label>
                      <p className="text-sm text-muted-foreground">
                        Être informé des changements de statut de vos commandes
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.orderUpdates}
                      onCheckedChange={() => handleNotificationChange('orderUpdates')}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Promotions et offres</Label>
                      <p className="text-sm text-muted-foreground">
                        Recevoir des offres promotionnelles
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.promotions}
                      onCheckedChange={() => handleNotificationChange('promotions')}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Apparence */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Palette className="h-5 w-5 mr-2" />
                    Apparence
                  </CardTitle>
                  <CardDescription>Personnalisez l'apparence de l'application</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Thème</Label>
                      <p className="text-sm text-muted-foreground">
                        Choisissez le mode d'affichage
                      </p>
                    </div>
                    <Select value={theme} onValueChange={(value: any) => setTheme(value)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sélectionner un thème" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">
                          <div className="flex items-center">
                            <Sun className="h-4 w-4 mr-2" />
                            Clair
                          </div>
                        </SelectItem>
                        <SelectItem value="dark">
                          <div className="flex items-center">
                            <Moon className="h-4 w-4 mr-2" />
                            Sombre
                          </div>
                        </SelectItem>
                        <SelectItem value="system">
                          <div className="flex items-center">
                            <Settings className="h-4 w-4 mr-2" />
                            Système
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Langue */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Languages className="h-5 w-5 mr-2" />
                    Langue
                  </CardTitle>
                  <CardDescription>Choisissez votre langue préférée</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Langue de l'interface</Label>
                      <p className="text-sm text-muted-foreground">
                        Sélectionnez la langue d'affichage
                      </p>
                    </div>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Choisir une langue" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Confidentialité */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Confidentialité
                  </CardTitle>
                  <CardDescription>Gérez la visibilité de vos informations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Profil public</Label>
                      <p className="text-sm text-muted-foreground">
                        Rendre votre profil visible par les autres utilisateurs
                      </p>
                    </div>
                    <Switch
                      checked={privacySettings.publicProfile}
                      onCheckedChange={() => handlePrivacyChange('publicProfile')}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Afficher l'email</Label>
                      <p className="text-sm text-muted-foreground">
                        Permettre aux autres de voir votre adresse email
                      </p>
                    </div>
                    <Switch
                      checked={privacySettings.showEmail}
                      onCheckedChange={() => handlePrivacyChange('showEmail')}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Afficher le téléphone</Label>
                      <p className="text-sm text-muted-foreground">
                        Permettre aux autres de voir votre numéro de téléphone
                      </p>
                    </div>
                    <Switch
                      checked={privacySettings.showPhone}
                      onCheckedChange={() => handlePrivacyChange('showPhone')}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Sécurité */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lock className="h-5 w-5 mr-2" />
                    Sécurité
                  </CardTitle>
                  <CardDescription>Gérez la sécurité de votre compte</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <Lock className="h-4 w-4 mr-2" />
                        Changer le mot de passe
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Changer le mot de passe</DialogTitle>
                        <DialogDescription>
                          Entrez votre mot de passe actuel et votre nouveau mot de passe
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>Mot de passe actuel</Label>
                          <div className="relative">
                            <Input
                              type={showPasswords.current ? "text" : "password"}
                              value={passwordData.currentPassword}
                              onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                              className="absolute right-2 top-1/2 -translate-y-1/2"
                            >
                              {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Nouveau mot de passe</Label>
                          <div className="relative">
                            <Input
                              type={showPasswords.new ? "text" : "password"}
                              value={passwordData.newPassword}
                              onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                              className="absolute right-2 top-1/2 -translate-y-1/2"
                            >
                              {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Confirmer le mot de passe</Label>
                          <div className="relative">
                            <Input
                              type={showPasswords.confirm ? "text" : "password"}
                              value={passwordData.confirmPassword}
                              onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                              className="absolute right-2 top-1/2 -translate-y-1/2"
                            >
                              {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsPasswordDialogOpen(false)}>
                          Annuler
                        </Button>
                        <Button onClick={handlePasswordChange}>
                          Changer le mot de passe
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              {/* Méthodes de paiement */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Méthodes de paiement
                  </CardTitle>
                  <CardDescription>Gérez vos moyens de paiement</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Ajouter une carte
                  </Button>
                </CardContent>
              </Card>

              {/* Données */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Download className="h-5 w-5 mr-2" />
                    Mes données
                  </CardTitle>
                  <CardDescription>Gérez vos données personnelles</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full" onClick={handleExportData}>
                    <Download className="h-4 w-4 mr-2" />
                    Exporter mes données
                  </Button>
                </CardContent>
              </Card>

              {/* Actions du compte */}
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-600">
                    <Shield className="h-5 w-5 mr-2" />
                    Actions du compte
                  </CardTitle>
                  <CardDescription>Actions sensibles sur votre compte</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Déconnexion
                  </Button>
                  
                  <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="destructive" className="w-full">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Supprimer mon compte
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Supprimer le compte</DialogTitle>
                        <DialogDescription>
                          Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <p className="text-sm text-muted-foreground">
                          Toutes vos données personnelles, commandes et informations seront définitivement effacées.
                        </p>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                          Annuler
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteAccount}>
                          Supprimer définitivement
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
