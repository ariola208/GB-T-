import { useState, useEffect, useCallback, useMemo, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag, MapPin, Star, Truck, Shield, Users, ChevronRight,
  Heart, Camera, Palmtree, Crown, Leaf, Award, Phone, Mail,
  Facebook, Instagram, Twitter, Youtube
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

// Types
interface HeroSlide {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: string;
  link: string;
}

interface Category {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  count: string;
  color: string;
  link: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviews: number;
  image: string;
  badge: string;
  isNew: boolean;
  category: string;
  description?: string;
  inStock?: boolean;
}

interface Stat {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

// Constants
const HERO_SLIDES: HeroSlide[] = [
  {
    title: "Découvrez l'Excellence Béninoise",
    subtitle: "E-commerce • Dropshipping • Tourisme",
    description: "Votre destination unique pour l'artisanat authentique, les produits locaux et les expériences touristiques du Bénin",
    image: "/placeholder.svg/mask.jpeg",
    cta: "Explorer Maintenant",
    link: "/shop"
  },
  {
    title: "Artisanat Traditionnel du Bénin",
    subtitle: "Créations Authentiques",
    description: "Découvrez les trésors artisanaux du Bénin, créés par nos artisans locaux avec passion et savoir-faire",
    image: "/placeholder.svg",
    cta: "Voir l'Artisanat",
    link: "/artisanat"
  },
  {
    title: "Explorez la Beauté du Bénin",
    subtitle: "Tourisme & Culture",
    description: "Vivez des expériences inoubliables à travers les sites historiques, la gastronomie et la culture béninoise",
    image: "/placeholder.svg",
    cta: "Planifier Votre Voyage",
    link: "/circuits-tourisme"
  }
];

const CATEGORIES: Category[] = [
  { name: "Artisanat", icon: Crown, count: "250+ produits", color: "bg-gbeto-gold", link: "/artisanat" },
  { name: "Vêtements", icon: ShoppingBag, count: "180+ articles", color: "bg-primary", link: "/vetements" },
  { name: "Gastronomie", icon: Heart, count: "120+ spécialités", color: "bg-gbeto-gold", link: "/gastronomie" },
  { name: "Tourisme", icon: Palmtree, count: "50+ destinations", color: "bg-primary", link: "/circuits-tourisme" },
  { name: "Culture", icon: Camera, count: "30+ expériences", color: "bg-gbeto-gold", link: "/culture" },
  { name: "Restauration", icon: MapPin, count: "25+ restaurants", color: "bg-primary", link: "/restauration" }
];

const FEATURED_PRODUCTS: Product[] = [
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
    category: "Artisanat",
    description: "Masque traditionnel sculpté à la main",
    inStock: true
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
    category: "Vêtements",
    inStock: true
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
    category: "Tourisme",
    inStock: true
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
    category: "Artisanat",
    inStock: true
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
    category: "Gastronomie",
    inStock: true
  }
];

const STATS: Stat[] = [
  { label: "Produits Disponibles", value: "1,200+", icon: ShoppingBag },
  { label: "Clients Satisfaits", value: "5,000+", icon: Users },
  { label: "Destinations", value: "50+", icon: MapPin },
  { label: "Artisans Partenaires", value: "200+", icon: Crown }
];

const FEATURES: Feature[] = [
  { icon: Truck, title: "Livraison Rapide", description: "Livraison en 24-48h dans tout le Bénin" },
  { icon: Shield, title: "Paiement Sécurisé", description: "Transactions protégées par SSL" },
  { icon: Star, title: "Qualité Garantie", description: "Produits authentiques certifiés" },
  { icon: Users, title: "Support 24/7", description: "Équipe de support disponible à tout moment" }
];

const FOOTER_LINKS = {
  acheter: [
    { name: "Artisanat", link: "/artisanat" },
    { name: "Vêtements & Textile", link: "/vetements" },
    { name: "Gastronomie Locale", link: "/gastronomie" },
    { name: "Promotions", link: "/promotions" }
  ],
  decouvrir: [
    { name: "Circuits Tourisme", link: "/circuits-tourisme" },
    { name: "Restauration", link: "/restauration" },
    { name: "Impact Durable", link: "/impact" },
    { name: "Artisans", link: "/artisans" }
  ],
  support: [
    { name: "S'inscrire", link: "/register" },
    { name: "FAQ", link: "/faq" },
    { name: "Livraison & Retours", link: "/livraison" },
    { name: "Conditions Générales", link: "/terms" },
    { name: "Politique de Confidentialité", link: "/privacy" }
  ]
};

const SOCIAL_LINKS = [
  { icon: Facebook, link: "/social/facebook", label: "Facebook" },
  { icon: Instagram, link: "/social/instagram", label: "Instagram" },
  { icon: Twitter, link: "/social/twitter", label: "Twitter" },
  { icon: Youtube, link: "/social/youtube", label: "YouTube" }
];

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { addItem: addToCart } = useCart();
  const { toggleItem: toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSlideChange = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const productCategories = useMemo(() => {
    const categories = ["Tous", ...new Set(FEATURED_PRODUCTS.map(p => p.category))];
    return categories;
  }, []);

  const getProductsByCategory = useCallback((category: string) => {
    if (category === "Tous") return FEATURED_PRODUCTS;
    return FEATURED_PRODUCTS.filter(p => p.category === category);
  }, []);

  const getProductContextData = useCallback((product: Product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.originalPrice,
    image: product.image,
    category: product.badge,
    inStock: product.inStock ?? true,
    rating: product.rating,
    reviews: product.reviews
  }), []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection 
        slides={HERO_SLIDES}
        currentSlide={currentSlide}
        onSlideChange={handleSlideChange}
      />

      {/* Categories Section */}
      <CategoriesSection categories={CATEGORIES} />

      {/* Featured Products with Tabs */}
      <FeaturedProductsSection
        products={FEATURED_PRODUCTS}
        categories={productCategories}
        getProductsByCategory={getProductsByCategory}
        getProductContextData={getProductContextData}
        addToCart={addToCart}
        toggleWishlist={toggleWishlist}
        isInWishlist={isInWishlist}
        isLoading={isLoading}
      />

      {/* Stats Section */}
      <StatsSection stats={STATS} />

      {/* Features Section */}
      <FeaturesSection features={FEATURES} />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Hero Section Component
interface HeroSectionProps {
  slides: HeroSlide[];
  currentSlide: number;
  onSlideChange: (index: number) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ slides, currentSlide, onSlideChange }) => {
  const current = slides[currentSlide];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-gbeto-surface via-background to-gbeto-surface">
      <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-10" />
      <div className="relative container mx-auto px-4 py-16">
        <div className="max-w-3xl">
          <Badge className="mb-4 bg-gbeto-gold text-gbeto-gold-foreground animate-fade-in">
            {current.subtitle}
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-foreground mb-6 leading-tight animate-slide-up">
            {current.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed animate-slide-up animation-delay-200">
            {current.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up animation-delay-300">
            <Button size="lg" className="bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground group" asChild>
              <Link to={current.link}>
                {current.cta}
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
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
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-gbeto-gold w-6' : 'bg-muted-foreground/30'
            }`}
            onClick={() => onSlideChange(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

// Categories Section Component
interface CategoriesSectionProps {
  categories: Category[];
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ categories }) => {
  return (
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
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card 
                key={category.name} 
                className="group hover:scale-105 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-gbeto-gold/20 animate-slide-up" 
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link to={category.link} className="block">
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-6 w-6 text-background" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count}</p>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Featured Products Section Component
interface FeaturedProductsSectionProps {
  products: Product[];
  categories: string[];
  getProductsByCategory: (category: string) => Product[];
  getProductContextData: (product: Product) => any;
  addToCart: (product: any) => void;
  toggleWishlist: (product: any) => void;
  isInWishlist: (id: number) => boolean;
  isLoading: boolean;
}

const FeaturedProductsSection: React.FC<FeaturedProductsSectionProps> = ({
  products,
  categories,
  getProductsByCategory,
  getProductContextData,
  addToCart,
  toggleWishlist,
  isInWishlist,
  isLoading
}) => {
  const [activeTab, setActiveTab] = useState("Tous");

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="h-80 rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
            Sélections de la Semaine
          </h2>
          <p className="text-muted-foreground">
            Nos coups de cœur et les articles les plus recherchés, triés par catégorie.
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center overflow-x-auto pb-4">
            <TabsList className="bg-gbeto-surface/50 border border-gbeto-surface/80">
              {categories.map(category => (
                <TabsTrigger 
                  key={category} 
                  value={category} 
                  className="data-[state=active]:bg-gbeto-gold data-[state=active]:text-gbeto-gold-foreground transition-colors duration-200"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map(category => (
            <TabsContent key={category} value={category} className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {getProductsByCategory(category).map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    getProductContextData={getProductContextData}
                    addToCart={addToCart}
                    toggleWishlist={toggleWishlist}
                    isInWishlist={isInWishlist(product.id)}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

// Product Card Component
interface ProductCardProps {
  product: Product;
  index: number;
  getProductContextData: (product: Product) => any;
  addToCart: (product: any) => void;
  toggleWishlist: (product: any) => void;
  isInWishlist: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index,
  getProductContextData,
  addToCart,
  toggleWishlist,
  isInWishlist
}) => {
  const productData = getProductContextData(product);

  return (
    <Card 
      className="group hover:shadow-xl transition-all duration-300 animate-scale-in hover:shadow-gbeto-gold/30" 
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
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
          onClick={() => toggleWishlist(productData)}
          aria-label="Add to wishlist"
        >
          <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
        </Button>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-foreground mb-2 group-hover:text-gbeto-gold transition-colors line-clamp-1">
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
            onClick={() => addToCart(productData)}
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Stats Section Component
interface StatsSectionProps {
  stats: Stat[];
}

const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  return (
    <section className="py-16 bg-gbeto-surface">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center animate-slide-up" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="w-16 h-16 bg-gbeto-gold rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <Icon className="h-8 w-8 text-gbeto-gold-foreground" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Features Section Component
interface FeaturesSectionProps {
  features: Feature[];
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ features }) => {
  return (
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
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={feature.title} 
                className="text-center animate-slide-up p-6 border rounded-xl hover:border-gbeto-gold transition-all duration-300 hover:shadow-lg group" 
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-16 h-16 bg-gbeto-surface rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gbeto-gold/10 transition-colors">
                  <Icon className="h-8 w-8 text-gbeto-gold group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// CTA Section Component
const CTASection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-gbeto-gold/10 via-gbeto-surface to-gbeto-gold/10">
      <div className="container mx-auto px-4 text-center">
        <Leaf className="h-12 w-12 text-gbeto-gold mx-auto mb-6 animate-pulse" />
        <h2 className="text-3xl md:text-5xl font-playfair font-bold text-foreground mb-6">
          Prêt à Découvrir le Bénin ?
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Rejoignez des milliers de clients satisfaits et découvrez l'authenticité béninoise
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground group" asChild>
            <Link to="/shop">
              Commencer Vos Achats
              <ShoppingBag className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="group" asChild>
            <Link to="/circuits-tourisme">
              Explorer le Tourisme
              <MapPin className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-xl font-playfair font-bold text-gbeto-gold mb-3">Danxomɛ</h4>
            <p className="text-xs opacity-70 mb-3">
              L'authenticité du Bénin, livrée chez vous.
            </p>
            <p className="text-xs opacity-70 flex items-center gap-2">
              <Mail className="h-3 w-3" />
              info@danxome.bj
            </p>
            <p className="text-xs opacity-70 flex items-center gap-2 mt-1">
              <Phone className="h-3 w-3" />
              +229 01 23 45 67
            </p>
            <div className="flex space-x-3 mt-4">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <Link 
                    key={social.label}
                    to={social.link} 
                    className="hover:text-gbeto-gold transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Acheter Links */}
          <FooterLinks title="Acheter" links={FOOTER_LINKS.acheter} />
          
          {/* Découvrir Links */}
          <FooterLinks title="Découvrir" links={FOOTER_LINKS.decouvrir} />
          
          {/* Support Links */}
          <FooterLinks title="Support" links={FOOTER_LINKS.support} />
        </div>

        <div className="border-t border-white/20 pt-6 text-center">
          <p className="text-xs opacity-60">
            © {currentYear} Danxomɛ. Tous droits réservés. Propulsé par la culture béninoise.
          </p>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinksProps {
  title: string;
  links: Array<{ name: string; link: string }>;
}

const FooterLinks: React.FC<FooterLinksProps> = ({ title, links }) => {
  return (
    <div>
      <h5 className="font-semibold mb-3 text-gbeto-gold text-sm">{title}</h5>
      <ul className="space-y-1 text-xs opacity-70">
        {links.map((link) => (
          <li key={link.name}>
            <Link to={link.link} className="hover:text-gbeto-gold transition-colors">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
