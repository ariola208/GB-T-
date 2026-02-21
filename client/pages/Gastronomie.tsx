import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Heart,
  Star,
  Clock,
  Flame,
  ChefHat,
  Package,
  MapPin,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

export default function Gastronomie() {
  const [searchQuery, setSearchQuery] = useState("");
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  const categories = [
    { id: "epices", name: "Épices", count: 45, icon: Flame },
    { id: "sauces", name: "Sauces", count: 32, icon: ChefHat },
    { id: "snacks", name: "Snacks", count: 28, icon: Package },
    { id: "boissons", name: "Boissons", count: 24, icon: Clock },
    { id: "plats", name: "Plats Préparés", count: 18, icon: ChefHat },
    { id: "produits-frais", name: "Produits Frais", count: 15, icon: Package }
  ];

  const products = [
    {
      id: 201,
      name: "Piment de Guinée Séché",
      price: 3500,
      originalPrice: 4500,
      rating: 4.9,
      reviews: 156,
      image: "/placeholder.svg",
      category: "Épices",
      region: "Zou",
      poids: "250g",
      description: "Piment de Guinée authentique, séché naturellement",
      inStock: true,
      isNew: true,
      featured: true
    },
    {
      id: 202,
      name: "Sauce Gboma Déshydratée",
      price: 2500,
      originalPrice: 3000,
      rating: 4.7,
      reviews: 89,
      image: "/placeholder.svg",
      category: "Sauces",
      region: "Atlantique",
      poids: "200g",
      description: "Sauce traditionnelle à base de feuilles de gboma",
      inStock: true,
      isNew: false,
      featured: true
    },
    {
      id: 203,
      name: "Aklui (Croustillants de Maïs)",
      price: 1500,
      originalPrice: null,
      rating: 4.8,
      reviews: 234,
      image: "/placeholder.svg",
      category: "Snacks",
      region: "Ouémé",
      poids: "300g",
      description: "Snack traditionnel à base de maïs, croustillant",
      inStock: true,
      isNew: true,
      featured: true
    },
    {
      id: 204,
      name: "Jus de Bissap Bio",
      price: 2000,
      originalPrice: 2500,
      rating: 4.6,
      reviews: 67,
      image: "/placeholder.svg",
      category: "Boissons",
      region: "Littoral",
      volume: "1L",
      description: "Jus d'hibiscus naturel, sans conservateurs",
      inStock: true,
      isNew: false,
      featured: true
    },
    {
      id: 205,
      name: "Gari Fin du Bénin",
      price: 4000,
      originalPrice: 5000,
      rating: 4.9,
      reviews: 312,
      image: "/placeholder.svg",
      category: "Produits Frais",
      region: "Plateau",
      poids: "1kg",
      description: "Gari de manioc, fin et savoureux",
      inStock: true,
      isNew: false,
      featured: false
    },
    {
      id: 206,
      name: "Huile de Palme Rouge",
      price: 3500,
      originalPrice: 4000,
      rating: 4.8,
      reviews: 178,
      image: "/placeholder.svg",
      category: "Produits Frais",
      region: "Mono",
      volume: "500ml",
      description: "Huile de palme traditionnelle, riche en vitamines",
      inStock: true,
      isNew: true,
      featured: false
    },
    {
      id: 207,
      name: "Soumbala (Fermentation de néré)",
      price: 2000,
      originalPrice: 2500,
      rating: 4.5,
      reviews: 45,
      image: "/placeholder.svg",
      category: "Épices",
      region: "Borgou",
      poids: "150g",
      description: "Épice traditionnelle fermentée, riche en protéines",
      inStock: true,
      isNew: false,
      featured: false
    },
    {
      id: 208,
      name: "Miel Naturel d'Abomey",
      price: 6000,
      originalPrice: 7500,
      rating: 5.0,
      reviews: 89,
      image: "/placeholder.svg",
      category: "Produits Frais",
      region: "Zou",
      poids: "500g",
      description: "Miel pur, récolté par nos apiculteurs locaux",
      inStock: true,
      isNew: true,
      featured: true
    }
  ];

  const regions = [
    "Toutes les régions",
    "Atlantique",
    "Littoral",
    "Ouémé",
    "Plateau",
    "Zou",
    "Mono",
    "Couffo",
    "Borgou"
  ];

  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedRegion, setSelectedRegion] = useState("Toutes les régions");

  const filteredProducts = products.filter(product => {
    if (selectedCategory !== "Tous" && product.category !== selectedCategory) return false;
    if (selectedRegion !== "Toutes les régions" && product.region !== selectedRegion) return false;
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !product.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const featuredProducts = products.filter(p => p.featured);

  const getProductContextData = (product: typeof products[0]) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.originalPrice,
    image: product.image,
    category: product.category,
    inStock: product.inStock ? 20 : 0,
    rating: product.rating,
    reviews: product.reviews
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-gradient-to-r from-gbeto-gold/20 via-gbeto-surface to-gbeto-gold/20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-10"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-gbeto-gold text-gbeto-gold-foreground">
              Saveurs du Bénin
            </Badge>
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
              Gastronomie Locale
            </h1>
            <p className="text-lg text-muted-foreground">
              Découvrez les saveurs authentiques du Bénin : épices, sauces traditionnelles, 
              snacks et produits frais de nos terroirs.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-gbeto-surface py-6 border-y">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Input
                type="search"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            
            <div className="flex gap-4 w-full md:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded-md border bg-background"
              >
                <option value="Tous">Toutes les catégories</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
              
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-4 py-2 rounded-md border bg-background"
              >
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-playfair font-bold text-foreground mb-6">
            Catégories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, index) => (
              <Card 
                key={cat.id}
                className="group hover:shadow-lg transition-all cursor-pointer hover:border-gbeto-gold"
                onClick={() => setSelectedCategory(cat.name)}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gbeto-surface rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-gbeto-gold/20 transition-colors">
                    <cat.icon className="h-6 w-6 text-gbeto-gold" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{cat.name}</h3>
                  <p className="text-sm text-muted-foreground">{cat.count} produits</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-gbeto-surface">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-playfair font-bold text-foreground mb-6">
            Sélections du Chef
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover:shadow-gbeto-gold/30">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <Badge className="absolute top-2 left-2 bg-gbeto-gold text-gbeto-gold-foreground">
                    Coup de cœur
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white h-8 w-8 p-0"
                    onClick={() => toggleItem(getProductContextData(product))}
                  >
                    <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{product.region}</Badge>
                    <span className="text-sm text-muted-foreground">{product.poids || product.volume}</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-gbeto-gold transition-colors">
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
                      className="bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground"
                      onClick={() => addItem(getProductContextData(product))}
                    >
                      <ShoppingBag className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-playfair font-bold text-foreground mb-6">
            Tous nos produits
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300">
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
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white h-8 w-8 p-0"
                    onClick={() => toggleItem(getProductContextData(product))}
                  >
                    <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{product.category}</Badge>
                    <span className="text-sm text-muted-foreground flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {product.region}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-gbeto-gold transition-colors">
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
                      className="bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground"
                      onClick={() => addItem(getProductContextData(product))}
                    >
                      <ShoppingBag className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucun produit ne correspond à votre recherche.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
