import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  Grid3x3,
  List,
  Star,
  Heart,
  ShoppingCart,
  ChevronDown,
  SlidersHorizontal
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
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

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
    name: "Tissus Kente Premium",
    price: 25000,
    category: "Vêtements",
    subcategory: "Tissus",
    rating: 4.8,
    reviews: 89,
    image: "/placeholder.svg",
    description: "Tissu Kente authentique tissé à la main, motifs traditionnels colorés",
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
    image: "/placeholder.svg",
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
    image: "/placeholder.svg",
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
    image: "/placeholder.svg",
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
    image: "/placeholder.svg",
    description: "Pagne Adinkra avec symboles ancestraux, coton premium",
    inStock: 18,
    isNew: false,
    isFeatured: true,
    origin: "Parakou",
    artisan: "Maison Adinkra Parakou"
  },
  {
    id: 7,
    name: "Miel de Karitier",
    price: 8500,
    category: "Gastronomie",
    subcategory: "Produits naturels",
    rating: 4.9,
    reviews: 203,
    image: "/placeholder.svg",
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
    image: "/placeholder.svg",
    description: "Tambour parleur traditionnel, communication ancestrale",
    inStock: 12,
    isNew: true,
    isFeatured: false,
    origin: "Djougou",
    artisan: "Maître Tambourineur Sanni"
  },
  {
    id: 9,
    name: "Beurre de Karité Pur",
    price: 4500,
    category: "Cosmétiques",
    subcategory: "Soins naturels",
    rating: 4.8,
    reviews: 189,
    image: "/placeholder.svg",
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
    image: "/placeholder.svg",
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
    image: "/placeholder.svg",
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

  // Update URL when filters change
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
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {product.isNew && (
          <Badge className="absolute top-2 left-2 bg-gbeto-gold text-gbeto-gold-foreground">
            Nouveau
          </Badge>
        )}
        {product.originalPrice && (
          <Badge variant="destructive" className="absolute top-2 right-2">
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </Badge>
        )}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/80 hover:bg-white">
            <Heart className="h-4 w-4" />
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
      {/* Header Section */}
      <section className="bg-gbeto-surface py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
              Boutique Danxomɛ
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez l'authenticité béninoise à travers nos produits sélectionnés avec soin
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher des produits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
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
              <SelectTrigger className="w-48">
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

            {/* Advanced Filters */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">
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
                      onCheckedChange={setShowInStockOnly}
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
                      onCheckedChange={setShowNewOnly}
                    />
                    <label htmlFor="newOnly" className="text-sm">
                      Nouveautés uniquement
                    </label>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* View Mode */}
            <div className="flex items-center space-x-1 border rounded-md">
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
      </section>

      {/* Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold text-foreground">
              {filteredAndSortedProducts.length} produit{filteredAndSortedProducts.length !== 1 ? 's' : ''} trouvé{filteredAndSortedProducts.length !== 1 ? 's' : ''}
            </h2>
            {searchQuery && (
              <p className="text-muted-foreground">
                Recherche : "{searchQuery}"
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
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Aucun produit trouvé
              </h3>
              <p className="text-muted-foreground mb-6">
                Essayez de modifier vos filtres ou votre recherche
              </p>
              <Button 
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
    </div>
  );
}
