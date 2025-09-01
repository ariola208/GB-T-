import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  MapPin,
  Star,
  TrendingUp,
  Truck,
  Shield,
  Users,
  ChevronRight,
  Heart,
  Camera,
  Palmtree,
  Crown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addItem: addToCart } = useCart();
  const { toggleItem: toggleWishlist, isInWishlist } = useWishlist();

  const heroSlides = [
    {
      title: "Découvrez l'Excellence Béninoise",
      subtitle: "E-commerce • Dropshipping • Tourisme",
      description: "Votre destination unique pour l'artisanat authentique, les produits locaux et les expériences touristiques du Bénin",
      image: "/placeholder.svg/mask.jpeg",
      cta: "Explorer Maintenant"
    },
    {
      title: "Artisanat Traditionnel du Bénin",
      subtitle: "Créations Authentiques",
      description: "Découvrez les trésors artisanaux du Bénin, créés par nos artisans locaux avec passion et savoir-faire",
      image: "/placeholder.svg",
      cta: "Voir l'Artisanat"
    },
    {
      title: "Explorez la Beauté du Bénin",
      subtitle: "Tourisme & Culture",
      description: "Vivez des expériences inoubliables à travers les sites historiques, la gastronomie et la culture béninoise",
      image: "/placeholder.svg",
      cta: "Planifier Votre Voyage"
    }
  ];

  const categories = [
    { name: "Artisanat", icon: Crown, count: "250+ produits", color: "bg-gbeto-gold" },
    { name: "Vêtements", icon: ShoppingBag, count: "180+ articles", color: "bg-primary" },
    { name: "Gastronomie", icon: Heart, count: "120+ spécialités", color: "bg-gbeto-gold" },
    { name: "Tourisme", icon: Palmtree, count: "50+ destinations", color: "bg-primary" },
    { name: "Culture", icon: Camera, count: "30+ expériences", color: "bg-gbeto-gold" },
    { name: "Monuments", icon: MapPin, count: "25+ sites", color: "bg-primary" }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Masque Dan Traditionnel",
      price: 45000,
      originalPrice: 55000,
      rating: 4.9,
      reviews: 127,
      image: "/placeholder.svg",
      badge: "Artisanat",
      isNew: true
    },
    {
      id: 2,
      name: "Tissus Kente Premium",
      price: 25000,
      originalPrice: null,
      rating: 4.8,
      reviews: 89,
      image: "/placeholder.svg",
      badge: "Textile",
      isNew: false
    },
    {
      id: 3,
      name: "Voyage Ganvié - 3 Jours",
      price: 85000,
      originalPrice: 95000,
      rating: 5.0,
      reviews: 156,
      image: "/placeholder.svg",
      badge: "Tourisme",
      isNew: true
    },
    {
      id: 4,
      name: "Statuette Bronze Ifè",
      price: 120000,
      originalPrice: null,
      rating: 4.9,
      reviews: 34,
      image: "/placeholder.svg",
      badge: "Art",
      isNew: false
    }
  ];

  const stats = [
    { label: "Produits Disponibles", value: "1,200+", icon: ShoppingBag },
    { label: "Clients Satisfaits", value: "5,000+", icon: Users },
    { label: "Destinations", value: "50+", icon: MapPin },
    { label: "Artisans Partenaires", value: "200+", icon: Crown }
  ];

  const features = [
    {
      icon: Truck,
      title: "Livraison Rapide",
      description: "Livraison en 24-48h dans tout le Bénin"
    },
    {
      icon: Shield,
      title: "Paiement Sécurisé",
      description: "Transactions protégées par SSL"
    },
    {
      icon: Star,
      title: "Qualité Garantie",
      description: "Produits authentiques certifiés"
    },
    {
      icon: TrendingUp,
      title: "Meilleurs Prix",
      description: "Prix compétitifs et promotions exclusives"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] overflow-hidden bg-gradient-to-br from-gbeto-surface via-background to-gbeto-surface">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-10"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl animate-fade-in">
            <Badge className="mb-4 bg-gbeto-gold text-gbeto-gold-foreground">
              {heroSlides[currentSlide].subtitle}
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-foreground mb-6 leading-tight">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
              {heroSlides[currentSlide].description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground" asChild>
                <Link to={currentSlide === 0 ? "/shop" : currentSlide === 1 ? "/artisanat" : "/tourism"}>
                  {heroSlides[currentSlide].cta}
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/about">
                  En Savoir Plus
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-gbeto-gold' : 'bg-muted-foreground/30'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gbeto-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
              Explorez Nos Catégories
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez la richesse du patrimoine béninois à travers nos différentes catégories
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Card key={category.name} className="group hover:scale-105 transition-all duration-300 cursor-pointer animate-slide-up" style={{animationDelay: `${index * 100}ms`}}>
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <category.icon className="h-6 w-6 text-background" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
                Produits Vedettes
              </h2>
              <p className="text-muted-foreground">
                Découvrez nos sélections les plus populaires
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/shop">
                Voir Tout
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 animate-scale-in" style={{animationDelay: `${index * 150}ms`}}>
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
                  <Badge variant="secondary" className="absolute top-2 right-2">
                    {product.badge}
                  </Badge>
                  {/* Wishlist Button */}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-12 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white h-8 w-8 p-0"
                    onClick={() => toggleWishlist({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      originalPrice: product.originalPrice,
                      image: product.image,
                      category: product.badge,
                      inStock: 50, // Default stock
                      rating: product.rating,
                      reviews: product.reviews
                    })}
                  >
                    <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-gbeto-gold transition-colors">
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
                      onClick={() => addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        originalPrice: product.originalPrice,
                        image: product.image,
                        category: product.badge,
                        inStock: 50, // Default stock
                        rating: product.rating,
                        reviews: product.reviews
                      })}
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

      {/* Stats Section */}
      <section className="py-16 bg-gbeto-surface">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center animate-slide-up" style={{animationDelay: `${index * 200}ms`}}>
                <div className="w-16 h-16 bg-gbeto-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-gbeto-gold-foreground" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
              Pourquoi Choisir Danxomɛ? ?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nous nous engageons à vous offrir la meilleure expérience d'achat et de découverte
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={feature.title} className="text-center animate-slide-up" style={{animationDelay: `${index * 150}ms`}}>
                <div className="w-16 h-16 bg-gbeto-surface rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-gbeto-gold" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gbeto-gold/10 via-gbeto-surface to-gbeto-gold/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-foreground mb-6">
            Prêt à Découvrir le Bénin ?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Rejoignez des milliers de clients satisfaits et découvrez l'authenticité béninoise
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground" asChild>
              <Link to="/shop">
                Commencer Vos Achats
                <ShoppingBag className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/tourism">
                Explorer le Tourisme
                <MapPin className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
