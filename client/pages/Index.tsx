import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  MapPin,
  Star,
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; 

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
    { name: "Artisanat", icon: Crown, count: "250+ produits", color: "bg-gbeto-gold", link: "/artisanat" },
    { name: "Vêtements", icon: ShoppingBag, count: "180+ articles", color: "bg-primary", link: "/vetements" },
    { name: "Gastronomie", icon: Heart, count: "120+ spécialités", color: "bg-gbeto-gold", link: "/gastronomie" },
    { name: "Tourisme", icon: Palmtree, count: "50+ destinations", color: "bg-primary", link: "/circuits-tourisme" },
    { name: "Culture", icon: Camera, count: "30+ expériences", color: "bg-gbeto-gold", link: "/culture" },
    { name: "Restauration", icon: MapPin, count: "25+ restaurants", color: "bg-primary", link: "/restauration" }
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
      isNew: true,
      category: "Artisanat"
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
      isNew: false,
      category: "Vêtements"
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
      isNew: true,
      category: "Tourisme"
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
      isNew: false,
      category: "Artisanat"
    },
    {
      id: 5,
      name: "Piment de Guinée Sec",
      price: 5000,
      originalPrice: 6500,
      rating: 4.7,
      reviews: 55,
      image: "/placeholder.svg",
      badge: "Épices",
      isNew: true,
      category: "Gastronomie"
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
      icon: Users,
      title: "Support 24/7",
      description: "Équipe de support disponible à tout moment"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const getProductContextData = (product: typeof featuredProducts[0]) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.originalPrice,
    image: product.image,
    category: product.badge,
    inStock: 50,
    rating: product.rating,
    reviews: product.reviews
  });
  
  const getProductsByCategory = (category: string) => {
    if (category === "Tous") return featuredProducts;
    return featuredProducts.filter(p => p.category === category);
  };
  
  const productCategories = ["Tous", "Artisanat", "Vêtements", "Tourisme", "Gastronomie"];

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
              <Button size="lg" className="bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground transition-transform hover:scale-105 active:scale-95 duration-300" asChild>
                <Link to={currentSlide === 0 ? "/shop" : currentSlide === 1 ? "/artisanat" : "/circuits-tourisme"}>
                  {heroSlides[currentSlide].cta}
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="transition-transform hover:scale-105 active:scale-95 duration-300" asChild>
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
              aria-label={`Go to slide ${index + 1}`}
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
              <Card 
                key={category.name} 
                className="group hover:scale-105 transition-all duration-300 cursor-pointer animate-slide-up hover:shadow-lg hover:shadow-gbeto-gold/20" 
                style={{animationDelay: `${index * 100}ms`}}
              >
                <Link to={category.link} className="block">
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <category.icon className="h-6 w-6 text-background" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count}</p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products with Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
                Sélections de la Semaine
              </h2>
              <p className="text-muted-foreground">
                Nos coups de cœur et les articles les plus recherchés, triés par catégorie.
              </p>
            </div>
          </div>
          
          <Tabs defaultValue="Tous" className="w-full">
            <div className="flex justify-start overflow-x-auto pb-4">
              <TabsList className="bg-gbeto-surface/50 border border-gbeto-surface/80">
                {productCategories.map(category => (
                  <TabsTrigger key={category} value={category} className="data-[state=active]:bg-gbeto-gold data-[state=active]:text-gbeto-gold-foreground transition-colors duration-200">
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value="Tous" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {getProductsByCategory("Tous").map((product, index) => (
                  <Card 
                    key={product.id} 
                    className="group hover:shadow-xl transition-all duration-300 animate-scale-in hover:shadow-gbeto-gold/30" 
                    style={{animationDelay: `${index * 150}ms`}}
                  >
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
                      <Badge variant="secondary" className="absolute top-2 right-2 bg-black/50 text-white">
                        {product.badge}
                      </Badge>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-12 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white h-8 w-8 p-0"
                        onClick={() => toggleWishlist(getProductContextData(product))}
                        aria-label="Add to wishlist"
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
                          className="bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground transition-transform hover:scale-105 active:scale-95 duration-300"
                          onClick={() => addToCart(getProductContextData(product))}
                        >
                          <ShoppingBag className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {productCategories.filter(c => c !== "Tous").map(category => (
              <TabsContent key={`content-${category}`} value={category} className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {getProductsByCategory(category).map((product, index) => (
                    <Card 
                      key={product.id} 
                      className="group hover:shadow-xl transition-all duration-300 animate-scale-in hover:shadow-gbeto-gold/30" 
                      style={{animationDelay: `${index * 150}ms`}}
                    >
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
                        <Badge variant="secondary" className="absolute top-2 right-2 bg-black/50 text-white">
                          {product.badge}
                        </Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-2 right-12 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white h-8 w-8 p-0"
                          onClick={() => toggleWishlist(getProductContextData(product))}
                          aria-label="Add to wishlist"
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
                            className="bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground transition-transform hover:scale-105 active:scale-95 duration-300"
                            onClick={() => addToCart(getProductContextData(product))}
                          >
                            <ShoppingBag className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gbeto-surface">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center animate-slide-up" style={{animationDelay: `${index * 200}ms`}}>
                <div className="w-16 h-16 bg-gbeto-gold rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
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
              Pourquoi Choisir Danxomɛ?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nous nous engageons à vous offrir la meilleure expérience d'achat et de découverte
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={feature.title} className="text-center animate-slide-up p-4 border rounded-xl hover:border-gbeto-gold transition-colors duration-300" style={{animationDelay: `${index * 150}ms`}}>
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
            <Button size="lg" className="bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground transition-transform hover:scale-105 active:scale-95 duration-300" asChild>
              <Link to="/shop">
                Commencer Vos Achats
                <ShoppingBag className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="transition-transform hover:scale-105 active:scale-95 duration-300" asChild>
              <Link to="/circuits-tourisme">
                Explorer le Tourisme
                <MapPin className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* PIED DE PAGE (FOOTER) */}
      <footer className="bg-black text-primary-foreground py-8"> 
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-5 gap-6">
          
          {/* Colonne 1 : Logo et Contact */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-xl font-playfair font-bold text-gbeto-gold mb-3">Danxomɛ</h4>
            <p className="text-xs opacity-70 mb-3">
              L'authenticité du Bénin, livrée chez vous.
            </p>
            <p className="text-xs opacity-70">
              **Contact :** info@danxome.bj
            </p>
            <div className="flex space-x-3 mt-3">
              <Link to="/social/facebook" className="hover:text-gbeto-gold transition-colors" aria-label="Facebook">
                <Users className="h-4 w-4" />
              </Link>
              <Link to="/social/instagram" className="hover:text-gbeto-gold transition-colors" aria-label="Instagram">
                <Camera className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Colonne 2 : Liens Rapides - Acheter */}
          <div>
            <h5 className="font-semibold mb-3 text-gbeto-gold text-sm">Acheter</h5>
            <ul className="space-y-1 text-xs opacity-70">
              <li><Link to="/artisanat" className="hover:text-gbeto-gold transition-colors">Artisanat</Link></li>
              <li><Link to="/vetements" className="hover:text-gbeto-gold transition-colors">Vêtements & Textile</Link></li>
              <li><Link to="/gastronomie" className="hover:text-gbeto-gold transition-colors">Gastronomie Locale</Link></li>
              <li><Link to="/promotions" className="hover:text-gbeto-gold transition-colors">Promotions</Link></li>
            </ul>
          </div>

          {/* Colonne 3 : Tourisme & Culture - Découvrir */}
          <div>
            <h5 className="font-semibold mb-3 text-gbeto-gold text-sm">Découvrir</h5>
            <ul className="space-y-1 text-xs opacity-70">
              <li><Link to="/circuits-tourisme" className="hover:text-gbeto-gold transition-colors">Circuits Tourisme</Link></li>
              <li><Link to="/restauration" className="hover:text-gbeto-gold transition-colors">Restauration</Link></li>
              <li><Link to="/impact" className="hover:text-gbeto-gold transition-colors">Impact Durable</Link></li>
              <li><Link to="/artisans" className="hover:text-gbeto-gold transition-colors">Artisans</Link></li>
            </ul>
          </div>

          {/* Colonne 4 : Support */}
          <div>
            <h5 className="font-semibold mb-3 text-gbeto-gold text-sm">Support</h5>
            <ul className="space-y-1 text-xs opacity-70">
              <li><Link to="/register" className="hover:text-gbeto-gold transition-colors">S'inscrire</Link></li>
              <li><Link to="/faq" className="hover:text-gbeto-gold transition-colors">FAQ</Link></li>
              <li><Link to="/livraison" className="hover:text-gbeto-gold transition-colors">Livraison & Retours</Link></li>
              <li><Link to="/terms" className="hover:text-gbeto-gold transition-colors">Conditions Générales</Link></li>
              <li><Link to="/privacy" className="hover:text-gbeto-gold transition-colors">Politique de Confidentialité</Link></li>
            </ul>
          </div>
        </div>

        <div className="container mx-auto px-4 border-t border-primary-foreground/20 mt-6 pt-4 text-center">
          <p className="text-xs opacity-60">
            © {new Date().getFullYear()} Danxomɛ. Tous droits réservés. Propulsé par la culture béninoise.
          </p>
        </div>
      </footer>
    </div>
  );
}
