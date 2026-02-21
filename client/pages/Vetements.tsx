import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Heart,
  Star,
  Filter,
  ChevronDown,
  Grid3x3,
  List,
  SlidersHorizontal,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
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
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

export default function Vetements() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("popularite");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  const categories = [
    "Tous les vêtements",
    "Pagnes et Wax",
    "Kente",
    "Boubous",
    "Chemises traditionnelles",
    "Accessoires",
    "Tenues modernes"
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "Sur mesure"];
  
  const colors = [
    { name: "Rouge", value: "red", class: "bg-red-500" },
    { name: "Bleu", value: "blue", class: "bg-blue-500" },
    { name: "Vert", value: "green", class: "bg-green-500" },
    { name: "Jaune", value: "yellow", class: "bg-yellow-500" },
    { name: "Orange", value: "orange", class: "bg-orange-500" },
    { name: "Violet", value: "purple", class: "bg-purple-500" },
    { name: "Noir", value: "black", class: "bg-black" },
    { name: "Blanc", value: "white", class: "bg-white border" },
    { name: "Multicolore", value: "multi", class: "bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500" }
  ];

  const products = [
    {
      id: 101,
      name: "Pagne Wax Authentique",
      price: 15000,
      originalPrice: 18500,
      rating: 4.8,
      reviews: 234,
      image: "/placeholder.svg",
      category: "Pagnes et Wax",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Rouge", "Bleu", "Vert", "Jaune"],
      description: "Pagne wax de haute qualité, motifs traditionnels béninois",
      inStock: true,
      isNew: true
    },
    {
      id: 102,
      name: "Boubou Brodé Cérémonie",
      price: 45000,
      originalPrice: 55000,
      rating: 4.9,
      reviews: 89,
      image: "/placeholder.svg",
      category: "Boubous",
      sizes: ["M", "L", "XL", "XXL"],
      colors: ["Bleu", "Vert", "Violet"],
      description: "Boubou élégant avec broderies faites main",
      inStock: true,
      isNew: false
    },
    {
      id: 103,
      name: "Chemise Kente Moderne",
      price: 25000,
      originalPrice: null,
      rating: 4.7,
      reviews: 156,
      image: "/placeholder.svg",
      category: "Chemises traditionnelles",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Rouge", "Jaune", "Multicolore"],
      description: "Chemise en tissu kente, coupe moderne",
      inStock: true,
      isNew: true
    },
    {
      id: 104,
      name: "Ensemble Kente Complet",
      price: 65000,
      originalPrice: 75000,
      rating: 5.0,
      reviews: 45,
      image: "/placeholder.svg",
      category: "Tenues modernes",
      sizes: ["M", "L", "XL"],
      colors: ["Vert", "Bleu"],
      description: "Ensemble complet en kente avec pantalon assorti",
      inStock: false,
      isNew: false
    },
    {
      id: 105,
      name: "Accessoires Tête Tissé",
      price: 5000,
      originalPrice: 6500,
      rating: 4.6,
      reviews: 78,
      image: "/placeholder.svg",
      category: "Accessoires",
      sizes: ["Unique"],
      colors: ["Rouge", "Bleu", "Vert", "Jaune"],
      description: "Accessoires pour la tête en tissu traditionnel",
      inStock: true,
      isNew: true
    },
    {
      id: 106,
      name: "Pagne Kente Premium",
      price: 35000,
      originalPrice: 40000,
      rating: 4.9,
      reviews: 112,
      image: "/placeholder.svg",
      category: "Kente",
      sizes: ["S", "M", "L", "XL", "Sur mesure"],
      colors: ["Rouge", "Or", "Vert", "Bleu"],
      description: "Pagne kente de luxe, tissage traditionnel",
      inStock: true,
      isNew: false
    },
    {
      id: 107,
      name: "Caftan Moderne",
      price: 38000,
      originalPrice: null,
      rating: 4.7,
      reviews: 67,
      image: "/placeholder.svg",
      category: "Tenues modernes",
      sizes: ["M", "L", "XL", "XXL"],
      colors: ["Noir", "Bleu", "Blanc"],
      description: "Caftan contemporain avec motifs traditionnels",
      inStock: true,
      isNew: true
    },
    {
      id: 108,
      name: "Sac en Tissu Wax",
      price: 8500,
      originalPrice: 10000,
      rating: 4.5,
      reviews: 43,
      image: "/placeholder.svg",
      category: "Accessoires",
      sizes: ["Unique"],
      colors: ["Multicolore"],
      description: "Sac pratique en tissu wax, doublure intérieure",
      inStock: true,
      isNew: false
    }
  ];

  const filteredProducts = products
    .filter(product => {
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) return false;
      if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
      if (selectedSizes.length > 0 && !product.sizes.some(s => selectedSizes.includes(s))) return false;
      if (selectedColors.length > 0 && !product.colors.some(c => selectedColors.includes(c))) return false;
      return true;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case "prix-croissant": return a.price - b.price;
        case "prix-decroissant": return b.price - a.price;
        case "notes": return b.rating - a.rating;
        case "nouveautes": return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        default: return 0;
      }
    });

  const handleCategoryChange = (category: string) => {
    if (category === "Tous les vêtements") {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(prev =>
        prev.includes(category)
          ? prev.filter(c => c !== category)
          : [...prev, category]
      );
    }
  };

  const handleSizeChange = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const handleColorChange = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 200000]);
  };

  const getProductContextData = (product: typeof products[0]) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.originalPrice,
    image: product.image,
    category: product.category,
    inStock: product.inStock ? 10 : 0,
    rating: product.rating,
    reviews: product.reviews
  });

  const FiltersContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3 flex items-center justify-between">
          Catégories
          {selectedCategories.length > 0 && (
            <button 
              onClick={() => setSelectedCategories([])}
              className="text-xs text-gbeto-gold hover:underline"
            >
              Réinitialiser
            </button>
          )}
        </h3>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <Label htmlFor={category} className="text-sm cursor-pointer">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Prix (FCFA)</h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={200000}
          step={1000}
          className="mb-4"
        />
        <div className="flex items-center justify-between text-sm">
          <span>{priceRange[0].toLocaleString()} FCFA</span>
          <span>{priceRange[1].toLocaleString()} FCFA</span>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Tailles</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map(size => (
            <button
              key={size}
              onClick={() => handleSizeChange(size)}
              className={`px-3 py-1 text-sm border rounded-md transition-colors ${
                selectedSizes.includes(size)
                  ? 'bg-gbeto-gold text-gbeto-gold-foreground border-gbeto-gold'
                  : 'hover:border-gbeto-gold'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Couleurs</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map(color => (
            <button
              key={color.value}
              onClick={() => handleColorChange(color.name)}
              className={`w-8 h-8 rounded-full ${color.class} ${
                selectedColors.includes(color.name) ? 'ring-2 ring-gbeto-gold ring-offset-2' : ''
              }`}
              title={color.name}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gbeto-surface py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-2">
            Vêtements & Textiles
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Découvrez notre collection de vêtements traditionnels et modernes, 
            tissés avec passion par nos artisans béninois.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filtres
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filtres</SheetTitle>
                <SheetDescription>
                  Affinez votre recherche
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6">
                <FiltersContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-64 space-y-6">
            <div className="bg-gbeto-surface p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold">Filtres</h2>
                <button 
                  onClick={clearAllFilters}
                  className="text-sm text-gbeto-gold hover:underline"
                >
                  Tout effacer
                </button>
              </div>
              <FiltersContent />
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {filteredProducts.length} produits
                </span>
                {(selectedCategories.length > 0 || selectedSizes.length > 0 || selectedColors.length > 0 || priceRange[0] > 0 || priceRange[1] < 200000) && (
                  <button 
                    onClick={clearAllFilters}
                    className="text-xs text-gbeto-gold hover:underline flex items-center"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Effacer les filtres
                  </button>
                )}
              </div>
              
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularite">Popularité</SelectItem>
                    <SelectItem value="prix-croissant">Prix croissant</SelectItem>
                    <SelectItem value="prix-decroissant">Prix décroissant</SelectItem>
                    <SelectItem value="notes">Meilleures notes</SelectItem>
                    <SelectItem value="nouveautes">Nouveautés</SelectItem>
                  </SelectContent>
                </Select>

                <div className="hidden sm:flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-r-none ${viewMode === 'grid' ? 'bg-gbeto-gold text-gbeto-gold-foreground' : ''}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-l-none ${viewMode === 'list' ? 'bg-gbeto-gold text-gbeto-gold-foreground' : ''}`}
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Display */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover:shadow-gbeto-gold/30">
                    <div className="relative overflow-hidden rounded-t-lg">
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
                      {!product.inStock && (
                        <Badge variant="destructive" className="absolute top-2 left-2">
                          Rupture
                        </Badge>
                      )}
                      <Badge variant="secondary" className="absolute top-2 right-2 bg-black/50 text-white">
                        {product.category}
                      </Badge>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-12 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white h-8 w-8 p-0"
                        onClick={() => toggleItem(getProductContextData(product))}
                      >
                        <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
                      </Button>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground mb-2 group-hover:text-gbeto-gold transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-gbeto-gold fill-current' : 'text-muted-foreground'}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground ml-2">
                          ({product.reviews})
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
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
                        <Button
                          size="sm"
                          className="bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground transition-transform hover:scale-105 active:scale-95 duration-300"
                          onClick={() => addItem(getProductContextData(product))}
                          disabled={!product.inStock}
                        >
                          <ShoppingBag className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="group hover:shadow-xl transition-all duration-300">
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative sm:w-48 h-48 overflow-hidden rounded-l-lg">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {product.isNew && (
                          <Badge className="absolute top-2 left-2 bg-gbeto-gold text-gbeto-gold-foreground">
                            Nouveau
                          </Badge>
                        )}
                      </div>
                      <CardContent className="flex-1 p-4">
                        <div className="flex flex-col h-full justify-between">
                          <div>
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-semibold text-foreground text-lg mb-1 group-hover:text-gbeto-gold transition-colors">
                                  {product.name}
                                </h3>
                                <Badge variant="outline" className="mb-2">
                                  {product.category}
                                </Badge>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0"
                                onClick={() => toggleItem(getProductContextData(product))}
                              >
                                <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
                              </Button>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {product.description}
                            </p>
                            <div className="flex items-center gap-4 mb-2">
                              <div className="flex items-center">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-gbeto-gold fill-current' : 'text-muted-foreground'}`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-muted-foreground ml-2">
                                  ({product.reviews})
                                </span>
                              </div>
                              <span className="text-sm">
                                Tailles: {product.sizes.join(", ")}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <div>
                              <span className="text-2xl font-bold text-foreground">
                                {product.price.toLocaleString()} FCFA
                              </span>
                              {product.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through ml-2">
                                  {product.originalPrice.toLocaleString()} FCFA
                                </span>
                              )}
                            </div>
                            <Button
                              className="bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground"
                              onClick={() => addItem(getProductContextData(product))}
                              disabled={!product.inStock}
                            >
                              <ShoppingBag className="h-4 w-4 mr-2" />
                              Ajouter au panier
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Aucun produit ne correspond à vos critères.</p>
                <Button 
                  onClick={clearAllFilters}
                  className="mt-4 bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground"
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
