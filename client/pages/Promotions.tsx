import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Heart,
  Star,
  Tag,
  Timer,
  TrendingDown,
  Percent,
  Gift,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

export default function Promotions() {
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  const promotions = [
    {
      id: 301,
      name: "Masque Dan Traditionnel",
      price: 45000,
      originalPrice: 55000,
      discount: 18,
      rating: 4.9,
      reviews: 127,
      image: "/placeholder.svg",
      category: "Artisanat",
      endDate: "2024-12-31",
      stockLeft: 15,
      initialStock: 50,
      type: "flash" // flash, seasonal, clearance
    },
    {
      id: 302,
      name: "Tissus Kente Premium",
      price: 25000,
      originalPrice: 35000,
      discount: 28,
      rating: 4.8,
      reviews: 89,
      image: "/placeholder.svg",
      category: "Textile",
      endDate: "2024-12-15",
      stockLeft: 8,
      initialStock: 30,
      type: "flash"
    },
    {
      id: 303,
      name: "Voyage Ganvié - 3 Jours",
      price: 85000,
      originalPrice: 95000,
      discount: 10,
      rating: 5.0,
      reviews: 156,
      image: "/placeholder.svg",
      category: "Tourisme",
      endDate: "2024-11-30",
      stockLeft: 5,
      initialStock: 20,
      type: "seasonal"
    },
    {
      id: 304,
      name: "Statuette Bronze Ifè",
      price: 120000,
      originalPrice: 150000,
      discount: 20,
      rating: 4.9,
      reviews: 34,
      image: "/placeholder.svg",
      category: "Art",
      endDate: "2024-12-20",
      stockLeft: 3,
      initialStock: 10,
      type: "clearance"
    },
    {
      id: 305,
      name: "Piment de Guinée Sec",
      price: 5000,
      originalPrice: 6500,
      discount: 23,
      rating: 4.7,
      reviews: 55,
      image: "/placeholder.svg",
      category: "Épices",
      endDate: "2024-12-10",
      stockLeft: 25,
      initialStock: 100,
      type: "flash"
    },
    {
      id: 306,
      name: "Boubou Brodé Cérémonie",
      price: 45000,
      originalPrice: 60000,
      discount: 25,
      rating: 4.9,
      reviews: 78,
      image: "/placeholder.svg",
      category: "Vêtements",
      endDate: "2024-12-25",
      stockLeft: 4,
      initialStock: 15,
      type: "seasonal"
    },
    {
      id: 307,
      name: "Pack Découverte Bénin",
      price: 125000,
      originalPrice: 180000,
      discount: 30,
      rating: 4.8,
      reviews: 42,
      image: "/placeholder.svg",
      category: "Tourisme",
      endDate: "2024-12-05",
      stockLeft: 6,
      initialStock: 12,
      type: "flash"
    },
    {
      id: 308,
      name: "Collection Artisanale",
      price: 85000,
      originalPrice: 120000,
      discount: 29,
      rating: 4.9,
      reviews: 63,
      image: "/placeholder.svg",
      category: "Artisanat",
      endDate: "2024-12-18",
      stockLeft: 7,
      initialStock: 25,
      type: "clearance"
    }
  ];

  const getTimeRemaining = (endDate: string) => {
    const end = new Date(endDate).getTime();
    const now = new Date().getTime();
    const distance = end - now;
    
    if (distance < 0) return "Expiré";
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}j ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const getDiscountBadgeColor = (discount: number) => {
    if (discount >= 30) return "bg-red-500";
    if (discount >= 20) return "bg-orange-500";
    return "bg-green-500";
  };

  const getProductContextData = (product: typeof promotions[0]) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.originalPrice,
    image: product.image,
    category: product.category,
    inStock: product.stockLeft,
    rating: product.rating,
    reviews: product.reviews
  });

  const flashSales = promotions.filter(p => p.type === "flash");
  const seasonalSales = promotions.filter(p => p.type === "seasonal");
  const clearanceSales = promotions.filter(p => p.type === "clearance");

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-red-500/10 via-gbeto-gold/10 to-orange-500/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-gbeto-gold text-gbeto-gold-foreground">
            <Tag className="h-3 w-3 mr-1" />
            Promotions Exclusives
          </Badge>
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
            Bonnes Affaires du Moment
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Profitez de réductions exceptionnelles sur nos produits phares. 
            Offres limitées, ne manquez pas ces opportunités !
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gbeto-surface py-8 border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-foreground">{promotions.length}</div>
              <div className="text-sm text-muted-foreground">Offres Actives</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">
                {Math.max(...promotions.map(p => p.discount))}%
              </div>
              <div className="text-sm text-muted-foreground">Réduction Max</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">
                {promotions.reduce((acc, p) => acc + p.stockLeft, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Articles en Stock</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">
                {promotions.filter(p => getTimeRemaining(p.endDate) !== "Expiré").length}
              </div>
              <div className="text-sm text-muted-foreground">Offres Valables</div>
            </div>
          </div>
        </div>
      </div>

      {/* Promotions Tabs */}
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-8 bg-gbeto-surface/50">
            <TabsTrigger value="all">Toutes les offres</TabsTrigger>
            <TabsTrigger value="flash">
              <Timer className="h-4 w-4 mr-2" />
              Ventes Flash
            </TabsTrigger>
            <TabsTrigger value="seasonal">
              <Sparkles className="h-4 w-4 mr-2" />
              Offres Saisonnières
            </TabsTrigger>
            <TabsTrigger value="clearance">
              <TrendingDown className="h-4 w-4 mr-2" />
              Déstockage
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {promotions.map((product) => (
                <PromotionCard 
                  key={product.id} 
                  product={product}
                  getTimeRemaining={getTimeRemaining}
                  getDiscountBadgeColor={getDiscountBadgeColor}
                  getProductContextData={getProductContextData}
                  addItem={addItem}
                  toggleItem={toggleItem}
                  isInWishlist={isInWishlist}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="flash">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {flashSales.map((product) => (
                <PromotionCard 
                  key={product.id} 
                  product={product}
                  getTimeRemaining={getTimeRemaining}
                  getDiscountBadgeColor={getDiscountBadgeColor}
                  getProductContextData={getProductContextData}
                  addItem={addItem}
                  toggleItem={toggleItem}
                  isInWishlist={isInWishlist}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="seasonal">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {seasonalSales.map((product) => (
                <PromotionCard 
                  key={product.id} 
                  product={product}
                  getTimeRemaining={getTimeRemaining}
                  getDiscountBadgeColor={getDiscountBadgeColor}
                  getProductContextData={getProductContextData}
                  addItem={addItem}
                  toggleItem={toggleItem}
                  isInWishlist={isInWishlist}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="clearance">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {clearanceSales.map((product) => (
                <PromotionCard 
                  key={product.id} 
                  product={product}
                  getTimeRemaining={getTimeRemaining}
                  getDiscountBadgeColor={getDiscountBadgeColor}
                  getProductContextData={getProductContextData}
                  addItem={addItem}
                  toggleItem={toggleItem}
                  isInWishlist={isInWishlist}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Newsletter */}
      <section className="py-16 bg-gbeto-surface">
        <div className="container mx-auto px-4 text-center">
          <Gift className="h-12 w-12 text-gbeto-gold mx-auto mb-4" />
          <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">
            Ne Manquez Aucune Promotion
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Inscrivez-vous à notre newsletter pour recevoir en avant-première 
            nos offres exclusives et codes promo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-2 rounded-md border bg-background"
            />
            <Button className="bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground">
              S'inscrire
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

// Promotion Card Component
function PromotionCard({ product, getTimeRemaining, getDiscountBadgeColor, getProductContextData, addItem, toggleItem, isInWishlist }: any) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:shadow-gbeto-gold/30 relative overflow-hidden">
      <div className="absolute top-2 left-2 z-10">
        <Badge className={`${getDiscountBadgeColor(product.discount)} text-white`}>
          <Percent className="h-3 w-3 mr-1" />
          -{product.discount}%
        </Badge>
      </div>
      
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
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
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-xs">
            <Timer className="h-3 w-3 mr-1" />
            {getTimeRemaining(product.endDate)}
          </Badge>
          <span className="text-sm font-medium text-red-500">
            Plus que {product.stockLeft}
          </span>
        </div>

        <h3 className="font-semibold text-foreground mb-2 group-hover:text-gbeto-gold transition-colors line-clamp-2">
          {product.name}
        </h3>

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

        <Progress 
          value={(product.initialStock - product.stockLeft) / product.initialStock * 100} 
          className="mb-2 h-1"
        />

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-foreground">
                {product.price.toLocaleString()} FCFA
              </span>
              <span className="text-sm text-muted-foreground line-through">
                {product.originalPrice.toLocaleString()} FCFA
              </span>
            </div>
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
  );
}
