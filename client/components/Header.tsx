import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Globe, Menu, X, Heart, LogOut, Settings, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import Cart from "./Cart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { state: cartState, toggleCart } = useCart();
  const { state: wishlistState } = useWishlist();
  const { language, setLanguage, t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();

  const navigation = [
    { name: t('nav.ecommerce'), href: "/shop" },
    { name: t('nav.tourism'), href: "/tourism" },
    { name: t('nav.artisanat'), href: "/artisanat" },
    { name: t('nav.culture'), href: "/culture" },
    { name: t('nav.about'), href: "/about" },
  ];

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
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

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getCurrentLanguageFlag = () => {
    return languages.find(lang => lang.code === language)?.flag || '🇫🇷';
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

          <nav className="hidden md:flex items-center space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex flex-1 max-w-md">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t('search.placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-10 bg-gbeto-surface border-border focus:border-gbeto-gold transition-colors"
              />
            </form>
          </div>

          <div className="flex items-center space-x-2">
            {/* Menu langue */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden sm:flex">
                  <Globe className="h-4 w-4 mr-1" />
                  <span className="mr-1">{getCurrentLanguageFlag()}</span>
                  {language.toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 max-h-96 overflow-y-auto">
                <DropdownMenuLabel>Changer la langue</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as any)}
                    className={language === lang.code ? 'bg-accent' : ''}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Wishlist */}
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

            {/* Cart */}
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

            {/* Menu utilisateur */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  {isAuthenticated && user ? (
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#5b21b6] flex items-center justify-center text-white font-semibold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    </div>
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {isAuthenticated ? (
                  <>
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <UserCircle className="mr-2 h-4 w-4" />
                      <span>{t('button.profile')}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/profile?tab=orders')}>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      <span>{t('button.orders')}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/profile?tab=wishlist')}>
                      <Heart className="mr-2 h-4 w-4" />
                      <span>{t('button.wishlist')}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/profile?tab=settings')}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>{t('button.settings')}</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{t('button.logout')}</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem onClick={() => navigate('/login')}>
                      <User className="mr-2 h-4 w-4" />
                      <span>{t('button.login')}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/register')}>
                      <UserCircle className="mr-2 h-4 w-4" />
                      <span>{t('button.register')}</span>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Menu mobile */}
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

        {/* Menu mobile déroulant */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="px-4 py-4 space-y-4">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={t('search.mobile.placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="pl-10 bg-gbeto-surface border-border"
                />
              </form>
              
              <nav className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-gbeto-surface-hover rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div className="px-4 py-2">
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    <Globe className="h-4 w-4 inline mr-2" />
                    Langue
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as any);
                          setIsMenuOpen(false);
                        }}
                        className={`flex items-center space-x-2 px-3 py-2 text-sm rounded-md transition-colors ${
                          language === lang.code 
                            ? 'bg-gbeto-gold text-gbeto-gold-foreground' 
                            : 'text-muted-foreground hover:text-foreground hover:bg-gbeto-surface-hover'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>

      <Cart />
    </header>
  );
}
