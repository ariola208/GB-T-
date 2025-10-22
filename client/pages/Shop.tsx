import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Search,
  Grid3x3,
  List,
  Star,
  Heart,
  ShoppingCart,
  SlidersHorizontal,
  ChevronRight,
  Wallet, // Nouveau icône pour le paiement
  CreditCard, // Icône carte bancaire
  Smartphone, // Icône Mobile Money
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog"; // Nouveaux imports pour le modal
import { Label } from "@/components/ui/label"; // Nouvel import pour les labels de formulaire
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

// Interface et données produits inchangées
interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory: string;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  inStock: number;
  isNew: boolean;
  isFeatured: boolean;
  origin: string;
  artisan?: string;
}

const products: Product[] = [
  // ... (Vos 12 produits restent ici, le contenu a été omis pour la concision du code)
  {
    id: 1,
    name: "Masque Dan Traditionnel",
    price: 45000,
    originalPrice: 55000,
    category: "Artisanat",
    subcategory: "Masques",
    rating: 4.9,
    reviews: 127,
    image: "/placeholder.svg",
    description: "Masque traditionnel Dan sculpté dans le bois d'iroko, symbole de sagesse et de protection",
    inStock: 15,
    isNew: true,
    isFeatured: true,
    origin: "Natitingou",
    artisan: "Maître Koffi Agbossou"
  },
  {
    id: 2,
    name: "Tissus wax hollandais  Premium",
    price: 25000,
    category: "Vêtements",
    subcategory: "Tissus",
    rating: 4.8,
    reviews: 89,
    image: "/placeholder.svg/wax.jpeg",
    description: "Tissu hollandais authentique tissé à la main, motifs traditionnels colorés",
    inStock: 32,
    isNew: false,
    isFeatured: true,
    origin: "Savalou",
    artisan: "Coopérative Femmes Tisseuses"
  },
  {
    id: 3,
    name: "Statuette Bronze d'Ifè",
    price: 120000,
    category: "Artisanat",
    subcategory: "Sculptures",
    rating: 4.9,
    reviews: 34,
    image: "/placeholder.svg/Statue bronze.jpeg",
    description: "Reproduction fidèle des bronzes d'Ifè, technique ancestrale préservée",
    inStock: 8,
    isNew: false,
    isFeatured: true,
    origin: "Porto-Novo",
    artisan: "Atelier Bronzes Royaux"
  },
  {
    id: 4,
    name: "Huile de Palme Bio",
    price: 3500,
    category: "Gastronomie",
    subcategory: "Condiments",
    rating: 4.7,
    reviews: 156,
    image: "/placeholder.svg/huile de palme.jpeg",
    description: "Huile de palme rouge pure, extraction traditionnelle sans additifs",
    inStock: 124,
    isNew: false,
    isFeatured: false,
    origin: "Zou",
    artisan: "Coopérative Palmiers du Zou"
  },
  {
    id: 5,
    name: "Collier Perles d'Agbada",
    price: 18000,
    originalPrice: 22000,
    category: "Bijoux",
    subcategory: "Colliers",
    rating: 4.6,
    reviews: 78,
    image: "/placeholder.svg/perle.jpeg",
    description: "Collier traditionnel en perles d'agbada, symbole de noblesse",
    inStock: 25,
    isNew: true,
    isFeatured: false,
    origin: "Abomey",
    artisan: "Atelier Royal Abomey"
  },
  {
    id: 6,
    name: "Pagne Adinkra Deluxe",
    price: 35000,
    category: "Vêtements",
    subcategory: "Pagnes",
    rating: 4.8,
    reviews: 92,
    image: "/placeholder.svg/Adinkra.jpeg",
    description: "Pagne Adinkra avec symboles ancestraux, coton premium",
    inStock: 18,
    isNew: false,
    isFeatured: true,
    origin: "Parakou",
    artisan: "Maison Adinkra Parakou"
  },
  {
    id: 7,
    name: "Miel de forêt (Atacora, Donga)",
    price: 8500,
    category: "Gastronomie",
    subcategory: "Produits naturels",
    rating: 4.9,
    reviews: 203,
    image: "/placeholder.svg/miel.png",
    description: "Miel pur de karitier, récolté dans les forêts du nord Bénin",
    inStock: 67,
    isNew: false,
    isFeatured: false,
    origin: "Kandi",
    artisan: "Apiculteurs Kandi"
  },
  {
    id: 8,
    name: "Tambour Talking Drum",
    price: 55000,
    category: "Instruments",
    subcategory: "Percussion",
    rating: 4.7,
    reviews: 45,
    image: "/placeholder.svg/dundun.jpeg",
    description: "Tambour parleur traditionnel, communication ancestrale",
    inStock: 12,
    isNew: true,
    isFeatured: false,
    origin: "Djougou",
    artisan: "Maître Tambourineur Sanni"
  },
  {
    id: 9,
    name: "Beurre de Karité brut",
    price: 4500,
    category: "Cosmétiques",
    subcategory: "Soins naturels",
    rating: 4.8,
    reviews: 189,
    image: "/placeholder.svg/Beurre de karité brut.jpeg",
    description: "Beurre de karité non raffiné, propriétés hydratantes exceptionnelles",
    inStock: 98,
    isNew: false,
    isFeatured: false,
    origin: "Natitingou",
    artisan: "Femmes Karité Nord"
  },
  {
    id: 10,
    name: "Sculpture Gélédé",
    price: 85000,
    category: "Artisanat",
    subcategory: "Sculptures",
    rating: 4.9,
    reviews: 56,
    image: "/placeholder.svg/Masque guélédé.jpeg",
    description: "Sculpture Gélédé authentique, art Yoruba traditionnel",
    inStock: 6,
    isNew: true,
    isFeatured: true,
    origin: "Pobè",
    artisan: "Maître Sculpteur Gélédé"
  },
  {
    id: 11,
    name: "Sauce Piment Lokassa",
    price: 2800,
    category: "Gastronomie",
    subcategory: "Sauces",
    rating: 4.6,
    reviews: 134,
    image: "/placeholder.svg",
    description: "Sauce piment traditionnel lokassa, recette ancestrale",
    inStock: 156,
    isNew: false,
    isFeatured: false,
    origin: "Cotonou",
    artisan: "Mama Lokassa"
  },
  {
    id: 12,
    name: "Chapeau Peul Brodé",
    price: 15000,
    category: "Vêtements",
    subcategory: "Accessoires",
    rating: 4.5,
    reviews: 67,
    image: "/placeholder.svg/chapeau peul.jpeg",
    description: "Chapeau traditionnel Peul avec broderies fines",
    inStock: 23,
    isNew: false,
    isFeatured: false,
    origin: "Malanville",
    artisan: "Artisans Peuls Malanville"
  }
];

const categories = [
  "Tous",
  "Artisanat", 
  "Vêtements", 
  "Gastronomie", 
  "Bijoux", 
  "Instruments", 
  "Cosmétiques"
];

const sortOptions = [
  { value: "featured", label: "Mis en avant" },
  { value: "newest", label: "Plus récents" },
  { value: "price-low", label: "Prix croissant" },
  { value: "price-high", label: "Prix décroissant" },
  { value: "rating", label: "Mieux notés" },
  { value: "popular", label: "Plus populaires" }
];

type PaymentMethod = "mobile_money" | "moov_money" | "celtiis_cash" | "card";

// Composant pour le formulaire de paiement
const PaymentModal = ({ open, setOpen, method }: { 
  open: boolean; 
  setOpen: (open: boolean) => void; 
  method: PaymentMethod | null 
}) => {
  const [formData, setFormData] = useState({});

  if (!method) return null;

  let title = "Finaliser l'achat";
  let description = "";
  let formFields;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Paiement ${method} simulé avec les données :`, formData);
    // Logique de paiement simulée (API call, redirection, etc.)
    setOpen(false);
    alert(`Paiement par ${title} simulé avec succès !`);
    setFormData({}); // Réinitialiser le formulaire
  };

  const MobileMoneyForm = ({ providerName }: { providerName: string }) => {
    title = `Paiement via ${providerName}`;
    description = `Veuillez entrer votre numéro de téléphone ${providerName} pour recevoir la requête de paiement.`;
    formFields = (
      <>
        <div className="space-y-2">
          <Label htmlFor="phone">Numéro de Téléphone ({providerName})</Label>
          <Input 
            id="phone" 
            placeholder="Ex: 97xx xxxx" 
            type="tel"
            required
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="amount">Montant à Payer</Label>
          <Input id="amount" value="55.000 FCFA" disabled />
        </div>
        <Button type="submit" className="w-full bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground">
          <Check className="h-4 w-4 mr-2" />
          Confirmer le Paiement
        </Button>
      </>
    );
    return null;
  };

  const CardForm = () => {
    title = "Paiement par Carte Bancaire";
    description = "Veuillez entrer les détails de votre carte pour procéder au paiement.";
    formFields = (
      <>
        <div className="space-y-2">
          <Label htmlFor="cardNumber">Numéro de Carte</Label>
          <Input 
            id="cardNumber" 
            placeholder="xxxx xxxx xxxx xxxx" 
            maxLength={19}
            required
            onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cardName">Nom sur la Carte</Label>
          <Input 
            id="cardName" 
            placeholder="Nom Prénom" 
            required
            onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 space-y-2">
            <Label htmlFor="expiryDate">Date d'Expiration (MM/AA)</Label>
            <Input 
              id="expiryDate" 
              placeholder="MM/AA" 
              maxLength={5}
              required
              onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
            />
          </div>
          <div className="col-span-1 space-y-2">
            <Label htmlFor="cvv">CVV</Label>
            <Input 
              id="cvv" 
              placeholder="123" 
              maxLength={4}
              required
              onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="amount">Montant à Payer</Label>
          <Input id="amount" value="55.000 FCFA" disabled />
        </div>
        <Button type="submit" className="w-full bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground">
          <CreditCard className="h-4 w-4 mr-2" />
          Payer Maintenant
        </Button>
      </>
    );
    return null;
  };


  // Détermine le formulaire à afficher
  switch (method) {
    case 'mobile_money':
      MobileMoneyForm({ providerName: 'MTN Mobile Money' });
      break;
    case 'moov_money':
      MobileMoneyForm({ providerName: 'Moov Money' });
      break;
    case 'celtiis_cash':
      MobileMoneyForm({ providerName: 'Celtiis Cash' });
      break;
    case 'card':
      CardForm();
      break;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleFormSubmit} className="grid gap-4 py-4">
          {formFields}
        </form>
      </DialogContent>
    </Dialog>
  );
};


export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const { addItem: addToCart } = useCart(); 
  const { toggleItem: toggleWishlist, isInWishlist } = useWishlist(); 

  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "Tous");
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 150000]);
  const [showInStockOnly, setShowInStockOnly] = useState(searchParams.get("inStock") === "true");
  const [showNewOnly, setShowNewOnly] = useState(searchParams.get("newOnly") === "true");

  // Nouveaux états pour le paiement
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);

  // Fonction pour ouvrir le modal de paiement
  const handleSimulatedCheckout = useCallback((method: PaymentMethod) => {
    setSelectedPaymentMethod(method);
    setIsPaymentModalOpen(true);
  }, []);


  // Update URL when filters change (unchanged logic)
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (selectedCategory !== "Tous") params.set("category", selectedCategory);
    if (sortBy !== "featured") params.set("sort", sortBy);
    if (showInStockOnly) params.set("inStock", "true");
    if (showNewOnly) params.set("newOnly", "true");

    setSearchParams(params);
  }, [searchQuery, selectedCategory, sortBy, showInStockOnly, showNewOnly, setSearchParams]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "Tous" || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesStock = !showInStockOnly || product.inStock > 0;
      const matchesNew = !showNewOnly || product.isNew;

      return matchesSearch && matchesCategory && matchesPrice && matchesStock && matchesNew;
    });

    // Sort products
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      case "featured":
      default:
        filtered.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortBy, priceRange, showInStockOnly, showNewOnly]);

  const ProductCard = ({ product }: { product: Product }) => (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden animate-scale-in">
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {product.isNew && (
          <Badge className="absolute top-2 left-2 bg-gbeto-gold text-gbeto-gold-foreground text-xs">
            Nouveau
          </Badge>
        )}
        {product.originalPrice && (
          <Badge variant="destructive" className="absolute top-2 right-2 text-xs">
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </Badge>
        )}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            size="sm" 
            variant="ghost" 
            className={`h-6 w-6 p-0 bg-white/80 hover:bg-white ${isInWishlist(product.id) ? 'text-red-500' : ''}`}
            onClick={() => toggleWishlist(product)} 
          >
            <Heart className={`h-3 w-3 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="mb-2">
          <Badge variant="outline" className="text-xs">
            {product.category}
          </Badge>
        </div>
        <h3 className="font-semibold text-foreground mb-2 group-hover:text-gbeto-gold transition-colors line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'text-gbeto-gold fill-current' : 'text-muted-foreground'}`} 
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground ml-2">
            ({product.reviews})
          </span>
        </div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-lg font-bold text-foreground">
              {product.price.toLocaleString()} FCFA
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through ml-2">
                {product.originalPrice.toLocaleString()} FCFA
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {product.inStock > 0 ? `${product.inStock} en stock` : "Épuisé"}
          </span>
          <Button 
            size="sm" 
            className="bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground"
            disabled={product.inStock === 0}
            onClick={() => addToCart(product, 1)} 
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Ajouter
          </Button>
        </div>
        {product.artisan && (
          <p className="text-xs text-muted-foreground mt-2">
            Par {product.artisan} • {product.origin}
          </p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Symétrique à Artisanat.tsx */}
      <section className="relative h-[60vh] md:h-[50vh] overflow-hidden bg-gradient-to-br from-gbeto-surface via-background to-gbeto-surface">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-20"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center text-center">
          <div className="max-w-4xl pt-12">
            <Badge className="mb-4 bg-gbeto-gold text-gbeto-gold-foreground">
              Artisanat & Produits Locaux
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-foreground mb-4 leading-tight">
              Boutique Danxomɛ
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Découvrez l'authenticité béninoise à travers nos produits sélectionnés avec soin, reflets du savoir-faire local.
            </p>
            
            {/* Nouveau : Boutons pour la simulation de paiement */}
            <div className="flex flex-wrap justify-center gap-3">
              <Button 
                size="lg" 
                className="bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground"
                onClick={() => handleSimulatedCheckout('mobile_money')}
              >
                  <Smartphone className="ml-2 h-5 w-5" />
                  MTN Mobile Money
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-gbeto-gold text-gbeto-gold hover:bg-gbeto-gold/10"
                onClick={() => handleSimulatedCheckout('moov_money')}
              >
                  <Smartphone className="ml-2 h-5 w-5" />
                  Moov Money
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-gbeto-gold text-gbeto-gold hover:bg-gbeto-gold/10"
                onClick={() => handleSimulatedCheckout('celtiis_cash')}
              >
                  <Smartphone className="ml-2 h-5 w-5" />
                  Celtiis Cash
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-gbeto-gold text-gbeto-gold hover:bg-gbeto-gold/10"
                onClick={() => handleSimulatedCheckout('card')}
              >
                  <CreditCard className="ml-2 h-5 w-5" />
                  Carte Bancaire
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Ligne pour séparer visuellement le Hero et les Filtres */}
      <hr className="w-4/5 mx-auto border-t border-gbeto-surface" /> 

      {/* Filter Bar Section - Symétrique en termes de padding/couleur à Artisanat.tsx */}
      <section className="py-8 bg-gbeto-surface">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher des produits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* View Mode & Advanced Filters - Grouped for symmetry/cleanliness */}
            <div className="flex items-center space-x-3">
              {/* Advanced Filters */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex-shrink-0">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filtres
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filtres Avancés</SheetTitle>
                    <SheetDescription>
                      Affinez votre recherche selon vos préférences
                    </SheetDescription>
                  </SheetHeader>
                  <div className="space-y-6 mt-6">
                    {/* Price Range */}
                    <div>
                      <label className="text-sm font-medium mb-3 block">
                        Prix (FCFA)
                      </label>
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={150000}
                        step={1000}
                        min={0}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{priceRange[0].toLocaleString()} FCFA</span>
                        <span>{priceRange[1].toLocaleString()} FCFA</span>
                      </div>
                    </div>

                    {/* Stock Filter */}
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="inStock" 
                        checked={showInStockOnly}
                        onCheckedChange={(checked) => setShowInStockOnly(!!checked)}
                      />
                      <label htmlFor="inStock" className="text-sm">
                        En stock uniquement
                      </label>
                    </div>

                    {/* New Products */}
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="newOnly" 
                        checked={showNewOnly}
                        onCheckedChange={(checked) => setShowNewOnly(!!checked)}
                      />
                      <label htmlFor="newOnly" className="text-sm">
                        Nouveautés uniquement
                      </label>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              {/* View Mode */}
              <div className="flex items-center space-x-1 border rounded-md flex-shrink-0">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="h-8 w-8 p-0"
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="h-8 w-8 p-0"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - Utilise py-16 comme Artisanat.tsx */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-2 sm:mb-0">
              <span className="font-playfair font-bold text-2xl">{filteredAndSortedProducts.length}</span> produit{filteredAndSortedProducts.length !== 1 ? 's' : ''} trouvé{filteredAndSortedProducts.length !== 1 ? 's' : ''}
            </h2>
            {searchQuery && (
              <p className="text-muted-foreground text-sm">
                Résultats pour : "<span className="font-medium text-foreground">{searchQuery}</span>"
              </p>
            )}
          </div>

          {/* Products Grid */}
          {filteredAndSortedProducts.length > 0 ? (
            <div className={`grid gap-6 ${
              viewMode === "grid" 
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                : "grid-cols-1"
            }`}>
              {filteredAndSortedProducts.map((product, index) => (
                // Ajout de style pour l'animation (similaire à Artisanat.tsx)
                <div key={product.id} className="animate-fade-in" style={{animationDelay: `${index * 50}ms`}}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gbeto-surface rounded-lg shadow-inner">
              <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center mx-auto mb-4 border border-gbeto-gold">
                <Search className="h-10 w-10 text-gbeto-gold" />
              </div>
              <h3 className="text-xl font-playfair font-bold text-foreground mb-2">
                Aucun produit trouvé
              </h3>
              <p className="text-muted-foreground mb-6">
                Essayez de modifier vos filtres ou votre terme de recherche.
              </p>
              <Button 
                className="bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("Tous");
                  setPriceRange([0, 150000]);
                  setShowInStockOnly(false);
                  setShowNewOnly(false);
                }}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Modal de Paiement (ajouté) */}
      <PaymentModal 
        open={isPaymentModalOpen} 
        setOpen={setIsPaymentModalOpen} 
        method={selectedPaymentMethod} 
      />
    </div>
  );
}
