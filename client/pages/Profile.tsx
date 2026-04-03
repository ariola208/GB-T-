import { useState, useEffect, useRef, useCallback, useMemo } from "react";
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
  User, Mail, Phone, MapPin, Calendar, ShoppingBag, Heart, Settings,
  Save, Edit, Package, Clock, CheckCircle, XCircle, Camera, Moon, Sun,
  Bell, Shield, Globe, CreditCard, LogOut, Trash2, Download, Eye, EyeOff,
  Languages, Palette, Lock, AlertCircle
} from "lucide-react";

// Types
type OrderStatus = 'livré' | 'en cours' | 'annulé' | 'en préparation';

interface OrderProduct {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: number;
  products?: OrderProduct[];
}

interface FormData {
  name: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  bio: string;
  website: string;
  company: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  orderUpdates: boolean;
  promotions: boolean;
}

interface PrivacySettings {
  showEmail: boolean;
  showPhone: boolean;
  showAddress: boolean;
  publicProfile: boolean;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Constants
const MAX_AVATAR_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const PASSWORD_MIN_LENGTH = 8;

const STATUS_CONFIG: Record<OrderStatus, { className: string; icon: React.ComponentType<{ className?: string }>; text: string }> = {
  'livré': { className: "bg-green-500", icon: CheckCircle, text: "Livré" },
  'en cours': { className: "bg-yellow-500", icon: Clock, text: "En cours" },
  'annulé': { className: "bg-red-500", icon: XCircle, text: "Annulé" },
  'en préparation': { className: "bg-blue-500", icon: Package, text: "En préparation" },
};

// Mock orders data
const MOCK_ORDERS: Order[] = [
  {
    id: 'CMD-001',
    date: '2024-01-15',
    total: 89.99,
    status: 'livré',
    items: 3,
    products: [
      { id: '1', name: 'Produit Premium', quantity: 2, price: 29.99 },
      { id: '2', name: 'Accessoire Standard', quantity: 1, price: 30.01 },
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
];

export default function Profile() {
  const { user, isAuthenticated, updateProfile, logout, deleteAccount } = useAuth();
  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const { state: wishlistState } = useWishlist();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // State
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: false,
    orderUpdates: true,
    promotions: false,
  });
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    showEmail: false,
    showPhone: false,
    showAddress: false,
    publicProfile: true,
  });
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [formData, setFormData] = useState<FormData>({
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
  const [orders] = useState<Order[]>(MOCK_ORDERS);

  // Derived values
  const orderCount = useMemo(() => orders.length, [orders]);
  const wishlistCount = useMemo(() => wishlistState.itemCount, [wishlistState.itemCount]);
  const userInitials = useMemo(() => {
    if (!user?.name) return '';
    return user.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }, [user?.name]);

  // Effects
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

  // Handlers
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleAvatarClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const validateImage = useCallback((file: File): boolean => {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      toast({
        title: "Format non supporté",
        description: "Veuillez choisir une image au format JPEG, PNG ou WebP",
        variant: "destructive",
      });
      return false;
    }
    
    if (file.size > MAX_AVATAR_SIZE) {
      toast({
        title: "Fichier trop volumineux",
        description: "L'image ne doit pas dépasser 5MB",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  }, []);

  const handleAvatarChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!validateImage(file)) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const avatarUrl = reader.result as string;
      setAvatarPreview(avatarUrl);
      updateProfile({ ...formData, avatar: avatarUrl });
      toast({
        title: "Photo mise à jour",
        description: "Votre photo de profil a été modifiée avec succès.",
      });
    };
    reader.readAsDataURL(file);
  }, [formData, updateProfile, validateImage]);

  const handleSaveProfile = useCallback(() => {
    updateProfile({ ...formData, avatar: avatarPreview || user?.avatar });
    setIsEditing(false);
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès.",
    });
  }, [formData, avatarPreview, user?.avatar, updateProfile]);

  const handleNotificationChange = useCallback((key: keyof NotificationSettings) => {
    setNotificationSettings(prev => ({ ...prev, [key]: !prev[key] }));
    toast({
      title: "Paramètres mis à jour",
      description: "Vos préférences de notification ont été modifiées.",
    });
  }, []);

  const handlePrivacyChange = useCallback((key: keyof PrivacySettings) => {
    setPrivacySettings(prev => ({ ...prev, [key]: !prev[key] }));
    toast({
      title: "Confidentialité mise à jour",
      description: "Vos paramètres de confidentialité ont été modifiés.",
    });
  }, []);

  const validatePassword = useCallback((): boolean => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les nouveaux mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      return false;
    }

    if (passwordData.newPassword.length < PASSWORD_MIN_LENGTH) {
      toast({
        title: "Erreur",
        description: `Le mot de passe doit contenir au moins ${PASSWORD_MIN_LENGTH} caractères.`,
        variant: "destructive",
      });
      return false;
    }

    return true;
  }, [passwordData]);

  const handlePasswordChange = useCallback(() => {
    if (!validatePassword()) return;

    toast({
      title: "Mot de passe modifié",
      description: "Votre mot de passe a été mis à jour avec succès.",
    });
    setIsPasswordDialogOpen(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  }, [validatePassword]);

  const handleDeleteAccount = useCallback(() => {
    if (deleteAccount) {
      deleteAccount();
    }
    toast({
      title: "Compte supprimé",
      description: "Votre compte a été supprimé définitivement.",
    });
    navigate('/');
  }, [deleteAccount, navigate]);

  const handleExportData = useCallback(() => {
    const userData = {
      profile: user,
      orders,
      wishlist: wishlistState.items,
      settings: {
        notifications: notificationSettings,
        privacy: privacySettings,
        language,
        theme,
      },
      exportDate: new Date().toISOString(),
    };
    
    const dataStr = JSON.stringify(userData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    const exportFileName = `user-data-${new Date().toISOString()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileName);
    linkElement.click();
    
    toast({
      title: "Données exportées",
      description: "Vos données ont été téléchargées avec succès.",
    });
  }, [user, orders, wishlistState.items, notificationSettings, privacySettings, language, theme]);

  const handleLogout = useCallback(() => {
    logout();
    navigate('/');
  }, [logout, navigate]);

  const getStatusBadge = useCallback((status: OrderStatus) => {
    const config = STATUS_CONFIG[status];
    const Icon = config.icon;

    return (
      <Badge className={`${config.className} flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        <span>{config.text}</span>
      </Badge>
    );
  }, []);

  // Early return
  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Profile Header */}
      <ProfileHeader
        user={user}
        userInitials={userInitials}
        avatarPreview={avatarPreview}
        isEditing={isEditing}
        onEdit={() => setIsEditing(true)}
        onAvatarClick={handleAvatarClick}
        fileInputRef={fileInputRef}
        onAvatarChange={handleAvatarChange}
      />

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="flex flex-wrap h-auto gap-2">
          <TabsTrigger value="profile" className="flex-1">
            <User className="h-4 w-4 mr-2" />
            Informations
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex-1">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Commandes ({orderCount})
          </TabsTrigger>
          <TabsTrigger value="wishlist" className="flex-1">
            <Heart className="h-4 w-4 mr-2" />
            Favoris ({wishlistCount})
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex-1">
            <Settings className="h-4 w-4 mr-2" />
            Paramètres
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileInfoCard
            user={user}
            formData={formData}
            isEditing={isEditing}
            onInputChange={handleInputChange}
            onSave={handleSaveProfile}
            onCancel={() => setIsEditing(false)}
          />
        </TabsContent>

        <TabsContent value="orders">
          <OrdersCard
            orders={orders}
            getStatusBadge={getStatusBadge}
            onNavigate={navigate}
          />
        </TabsContent>

        <TabsContent value="wishlist">
          <WishlistCard
            itemCount={wishlistCount}
            onNavigate={navigate}
          />
        </TabsContent>

        <TabsContent value="settings">
          <SettingsSection
            notificationSettings={notificationSettings}
            privacySettings={privacySettings}
            language={language}
            theme={theme}
            passwordData={passwordData}
            showPasswords={showPasswords}
            isPasswordDialogOpen={isPasswordDialogOpen}
            isDeleteDialogOpen={isDeleteDialogOpen}
            onNotificationChange={handleNotificationChange}
            onPrivacyChange={handlePrivacyChange}
            onLanguageChange={setLanguage}
            onThemeChange={setTheme}
            onPasswordDataChange={setPasswordData}
            onShowPasswordsChange={setShowPasswords}
            onPasswordDialogOpenChange={setIsPasswordDialogOpen}
            onPasswordChange={handlePasswordChange}
            onDeleteDialogOpenChange={setIsDeleteDialogOpen}
            onDeleteAccount={handleDeleteAccount}
            onExportData={handleExportData}
            onLogout={handleLogout}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Sub-components
interface ProfileHeaderProps {
  user: any;
  userInitials: string;
  avatarPreview: string | null;
  isEditing: boolean;
  onEdit: () => void;
  onAvatarClick: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ProfileHeader({
  user,
  userInitials,
  avatarPreview,
  isEditing,
  onEdit,
  onAvatarClick,
  fileInputRef,
  onAvatarChange,
}: ProfileHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
      <div className="flex items-center space-x-4">
        <div className="relative group">
          <Avatar className="h-24 w-24 cursor-pointer" onClick={onAvatarClick}>
            <AvatarImage src={avatarPreview || user.avatar} />
            <AvatarFallback className="bg-gradient-to-br from-[#7c3aed] to-[#5b21b6] text-white text-2xl">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <button
            onClick={onAvatarClick}
            className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Changer la photo de profil"
          >
            <Camera className="h-4 w-4" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={onAvatarChange}
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            aria-label="Télécharger une photo de profil"
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
        <Button onClick={onEdit}>
          <Edit className="h-4 w-4 mr-2" />
          Modifier le profil
        </Button>
      )}
    </div>
  );
}

interface ProfileInfoCardProps {
  user: any;
  formData: FormData;
  isEditing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSave: () => void;
  onCancel: () => void;
}

function ProfileInfoCard({ user, formData, isEditing, onInputChange, onSave, onCancel }: ProfileInfoCardProps) {
  const fields = [
    { name: 'name', label: 'Nom complet', icon: User, editable: true },
    { name: 'email', label: 'Email', icon: Mail, editable: false },
    { name: 'bio', label: 'Bio', icon: null, editable: true, textarea: true },
    { name: 'phone', label: 'Téléphone', icon: Phone, editable: true },
    { name: 'website', label: 'Site web', icon: null, editable: true },
    { name: 'company', label: 'Entreprise', icon: null, editable: true },
    { name: 'address', label: 'Adresse', icon: MapPin, editable: true },
    { name: 'city', label: 'Ville', icon: null, editable: true },
    { name: 'country', label: 'Pays', icon: null, editable: true },
    { name: 'postalCode', label: 'Code postal', icon: null, editable: true },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations personnelles</CardTitle>
        <CardDescription>
          {isEditing ? "Modifiez vos informations personnelles" : "Consultez vos informations personnelles"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <label className="text-sm font-medium">{field.label}</label>
              {isEditing && field.editable ? (
                field.textarea ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name as keyof FormData] || ''}
                    onChange={onInputChange}
                    placeholder={`Votre ${field.label.toLowerCase()}`}
                    className="w-full min-h-[100px] p-2 border rounded-md"
                  />
                ) : (
                  <Input
                    name={field.name}
                    value={formData[field.name as keyof FormData] || ''}
                    onChange={onInputChange}
                    placeholder={`Votre ${field.label.toLowerCase()}`}
                  />
                )
              ) : (
                <div className="flex items-center space-x-2 p-2 bg-muted rounded-md">
                  {field.icon && <field.icon className="h-4 w-4 text-muted-foreground" />}
                  <span>{field.name === 'email' ? user.email : (user[field.name] || 'Non renseigné')}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      {isEditing && (
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onCancel}>
            <XCircle className="h-4 w-4 mr-2" />
            Annuler
          </Button>
          <Button onClick={onSave}>
            <Save className="h-4 w-4 mr-2" />
            Enregistrer
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

interface OrdersCardProps {
  orders: Order[];
  getStatusBadge: (status: OrderStatus) => React.ReactNode;
  onNavigate: (path: string) => void;
}

function OrdersCard({ orders, getStatusBadge, onNavigate }: OrdersCardProps) {
  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-4">Aucune commande pour le moment</p>
          <Button onClick={() => onNavigate('/shop')}>Découvrir nos produits</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mes commandes</CardTitle>
        <CardDescription>Historique de vos commandes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} getStatusBadge={getStatusBadge} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

interface OrderItemProps {
  order: Order;
  getStatusBadge: (status: OrderStatus) => React.ReactNode;
}

function OrderItem({ order, getStatusBadge }: OrderItemProps) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
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
  );
}

interface WishlistCardProps {
  itemCount: number;
  onNavigate: (path: string) => void;
}

function WishlistCard({ itemCount, onNavigate }: WishlistCardProps) {
  if (itemCount === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-4">Votre liste de favoris est vide</p>
          <Button onClick={() => onNavigate('/shop')}>Explorer les produits</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ma liste de favoris</CardTitle>
        <CardDescription>Produits que vous avez aimés</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <p className="col-span-full text-center text-muted-foreground py-8">
            Contenu de la wishlist à implémenter
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

interface SettingsSectionProps {
  notificationSettings: NotificationSettings;
  privacySettings: PrivacySettings;
  language: string;
  theme: string;
  passwordData: PasswordData;
  showPasswords: { current: boolean; new: boolean; confirm: boolean };
  isPasswordDialogOpen: boolean;
  isDeleteDialogOpen: boolean;
  onNotificationChange: (key: keyof NotificationSettings) => void;
  onPrivacyChange: (key: keyof PrivacySettings) => void;
  onLanguageChange: (lang: string) => void;
  onThemeChange: (theme: string) => void;
  onPasswordDataChange: React.Dispatch<React.SetStateAction<PasswordData>>;
  onShowPasswordsChange: React.Dispatch<React.SetStateAction<{ current: boolean; new: boolean; confirm: boolean }>>;
  onPasswordDialogOpenChange: (open: boolean) => void;
  onPasswordChange: () => void;
  onDeleteDialogOpenChange: (open: boolean) => void;
  onDeleteAccount: () => void;
  onExportData: () => void;
  onLogout: () => void;
}

function SettingsSection({
  notificationSettings,
  privacySettings,
  language,
  theme,
  passwordData,
  showPasswords,
  isPasswordDialogOpen,
  isDeleteDialogOpen,
  onNotificationChange,
  onPrivacyChange,
  onLanguageChange,
  onThemeChange,
  onPasswordDataChange,
  onShowPasswordsChange,
  onPasswordDialogOpenChange,
  onPasswordChange,
  onDeleteDialogOpenChange,
  onDeleteAccount,
  onExportData,
  onLogout,
}: SettingsSectionProps) {
  return (
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
          <NotificationSwitch
            label="Notifications par email"
            description="Recevoir des notifications par email"
            checked={notificationSettings.emailNotifications}
            onCheckedChange={() => onNotificationChange('emailNotifications')}
          />
          <NotificationSwitch
            label="Notifications push"
            description="Recevoir des notifications push"
            checked={notificationSettings.pushNotifications}
            onCheckedChange={() => onNotificationChange('pushNotifications')}
          />
          <NotificationSwitch
            label="Mises à jour des commandes"
            description="Être informé des changements de statut de vos commandes"
            checked={notificationSettings.orderUpdates}
            onCheckedChange={() => onNotificationChange('orderUpdates')}
          />
          <NotificationSwitch
            label="Promotions et offres"
            description="Recevoir des offres promotionnelles"
            checked={notificationSettings.promotions}
            onCheckedChange={() => onNotificationChange('promotions')}
          />
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
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Thème</Label>
              <p className="text-sm text-muted-foreground">Choisissez le mode d'affichage</p>
            </div>
            <Select value={theme} onValueChange={onThemeChange}>
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
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Langue de l'interface</Label>
              <p className="text-sm text-muted-foreground">Sélectionnez la langue d'affichage</p>
            </div>
            <Select value={language} onValueChange={onLanguageChange}>
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
          <NotificationSwitch
            label="Profil public"
            description="Rendre votre profil visible par les autres utilisateurs"
            checked={privacySettings.publicProfile}
            onCheckedChange={() => onPrivacyChange('publicProfile')}
          />
          <NotificationSwitch
            label="Afficher l'email"
            description="Permettre aux autres de voir votre adresse email"
            checked={privacySettings.showEmail}
            onCheckedChange={() => onPrivacyChange('showEmail')}
          />
          <NotificationSwitch
            label="Afficher le téléphone"
            description="Permettre aux autres de voir votre numéro de téléphone"
            checked={privacySettings.showPhone}
            onCheckedChange={() => onPrivacyChange('showPhone')}
          />
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
        <CardContent>
          <Dialog open={isPasswordDialogOpen} onOpenChange={onPasswordDialogOpenChange}>
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
              <PasswordChangeForm
                passwordData={passwordData}
                showPasswords={showPasswords}
                onPasswordDataChange={onPasswordDataChange}
                onShowPasswordsChange={onShowPasswordsChange}
                onPasswordChange={onPasswordChange}
                onCancel={() => onPasswordDialogOpenChange(false)}
              />
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
        <CardContent>
          <Button variant="outline" className="w-full" onClick={onExportData}>
            <Download className="h-4 w-4 mr-2" />
            Exporter mes données
          </Button>
        </CardContent>
      </Card>

      {/* Actions du compte */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center text-red-600">
            <AlertCircle className="h-5 w-5 mr-2" />
            Actions du compte
          </CardTitle>
          <CardDescription>Actions sensibles sur votre compte</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full" onClick={onLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Déconnexion
          </Button>
          
          <Dialog open={isDeleteDialogOpen} onOpenChange={onDeleteDialogOpenChange}>
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
                <Button variant="outline" onClick={() => onDeleteDialogOpenChange(false)}>
                  Annuler
                </Button>
                <Button variant="destructive" onClick={onDeleteAccount}>
                  Supprimer définitivement
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}

interface NotificationSwitchProps {
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: () => void;
}

function NotificationSwitch({ label, description, checked, onCheckedChange }: NotificationSwitchProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>{label}</Label>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Switch checked={checked} onCheckedChange={onCheckedChange} />
      </div>
      <Separator />
    </>
  );
}

interface PasswordChangeFormProps {
  passwordData: PasswordData;
  showPasswords: { current: boolean; new: boolean; confirm: boolean };
  onPasswordDataChange: React.Dispatch<React.SetStateAction<PasswordData>>;
  onShowPasswordsChange: React.Dispatch<React.SetStateAction<{ current: boolean; new: boolean; confirm: boolean }>>;
  onPasswordChange: () => void;
  onCancel: () => void;
}

function PasswordChangeForm({
  passwordData,
  showPasswords,
  onPasswordDataChange,
  onShowPasswordsChange,
  onPasswordChange,
  onCancel,
}: PasswordChangeFormProps) {
  const updatePasswordField = (field: keyof PasswordData, value: string) => {
    onPasswordDataChange(prev => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    onShowPasswordsChange(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <>
      <div className="space-y-4 py-4">
        <PasswordField
          label="Mot de passe actuel"
          value={passwordData.currentPassword}
          show={showPasswords.current}
          onChange={(value) => updatePasswordField('currentPassword', value)}
          onToggle={() => togglePasswordVisibility('current')}
        />
        <PasswordField
          label="Nouveau mot de passe"
          value={passwordData.newPassword}
          show={showPasswords.new}
          onChange={(value) => updatePasswordField('newPassword', value)}
          onToggle={() => togglePasswordVisibility('new')}
        />
        <PasswordField
          label="Confirmer le mot de passe"
          value={passwordData.confirmPassword}
          show={showPasswords.confirm}
          onChange={(value) => updatePasswordField('confirmPassword', value)}
          onToggle={() => togglePasswordVisibility('confirm')}
        />
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button onClick={onPasswordChange}>
          Changer le mot de passe
        </Button>
      </DialogFooter>
    </>
  );
}

interface PasswordFieldProps {
  label: string;
  value: string;
  show: boolean;
  onChange: (value: string) => void;
  onToggle: () => void;
}

function PasswordField({ label, value, show, onChange, onToggle }: PasswordFieldProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="relative">
        <Input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pr-10"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          aria-label={show ? "Masquer le mot de passe" : "Afficher le mot de passe"}
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
