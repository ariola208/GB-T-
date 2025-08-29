import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Globe, Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useLanguage } from "@/contexts/LanguageContext";
import Cart from "./Cart";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { state: cartState, toggleCart } = useCart();
  const { state: wishlistState } = useWishlist();
  const { language, setLanguage } = useLanguage();

  const navigation = [
    { name: "E-commerce", href: "/shop" },
    { name: "Tourisme", href: "/tourism" },
    { name: "Artisanat", href: "/artisanat" },
    { name: "Culture", href: "/culture" },
    { name: "À propos", href: "/about" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "fr" ? "en" : "fr");
  };

  const getLanguageLabel = () => {
    return language === "fr" ? "EN" : "FR";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              {/* Logo D stylisé */}
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#5b21b6] flex items-center justify-center shadow-lg border-2 border-[#8b5cf6] transition-all duration-300 hover:scale-110 hover:rotate-6">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="font-playfair font-bold text-xl text-foreground">
                anxomɛ
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher des produits, destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-10 bg-gbeto-surface border-border focus:border-gbeto-gold transition-colors"
              />
            </form>
          </div>

          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="hidden sm:flex"
              onClick={toggleLanguage}
            >
              <Globe className="h-4 w-4 mr-1" />
              {getLanguageLabel()}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="relative hidden sm:flex"
              onClick={() => navigate('/shop?tab=wishlist')}
            >
              <Heart className="h-5 w-5" />
              {wishlistState.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-2xs font-medium flex items-center justify-center">
                  {wishlistState.itemCount}
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="relative"
              onClick={toggleCart}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartState.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gbeto-gold text-gbeto-gold-foreground text-2xs font-medium flex items-center justify-center">
                  {cartState.itemCount}
                </span>
              )}
            </Button>

            <Button variant="ghost" size="sm">
              <User className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="px-4 py-4 space-y-4">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="pl-10 bg-gbeto-surface border-border"
                />
              </form>
              
              <nav className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-gbeto-surface-hover rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                <button
                  onClick={toggleLanguage}
                  className="w-full text-left px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-gbeto-surface-hover rounded-md transition-colors"
                >
                  <Globe className="h-4 w-4 inline mr-2" />
                  {language === "fr" ? "Switch to English" : "Passer en Français"}
                </button>
              </nav>
            </div>
          </div>
        )}
      </div>

      <Cart />
    </header>
  );
}
