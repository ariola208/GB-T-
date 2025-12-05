import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gbeto-surface border-t border-gbeto-gold/20 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gbeto-gold rounded-full flex items-center justify-center">
                <span className="text-gbeto-gold-foreground font-bold text-lg">D</span>
              </div>
              <span className="text-2xl font-playfair font-bold text-foreground">
                Danxomɛ
              </span>
            </Link>
            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
              Découvrez la richesse culturelle et artisanale du Bénin. 
              Explorez nos produits authentiques et vivez une expérience unique.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-gbeto-gold transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-gbeto-gold transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://www.instagram.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-gbeto-gold transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-playfair font-semibold text-foreground mb-4 text-lg">
              Navigation Rapide
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-gbeto-gold transition-colors text-sm">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-muted-foreground hover:text-gbeto-gold transition-colors text-sm">
                  {t('shop')}
                </Link>
              </li>
              <li>
                <Link to="/artisanat" className="text-muted-foreground hover:text-gbeto-gold transition-colors text-sm">
                  {t('artisanat')}
                </Link>
              </li>
              <li>
                <Link to="/tourism" className="text-muted-foreground hover:text-gbeto-gold transition-colors text-sm">
                  {t('tourism')}
                </Link>
              </li>
              <li>
                <Link to="/culture" className="text-muted-foreground hover:text-gbeto-gold transition-colors text-sm">
                  {t('culture')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-playfair font-semibold text-foreground mb-4 text-lg">
              Service Client
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-gbeto-gold transition-colors text-sm">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-gbeto-gold transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-gbeto-gold transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-muted-foreground hover:text-gbeto-gold transition-colors text-sm">
                  Livraison
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-muted-foreground hover:text-gbeto-gold transition-colors text-sm">
                  Retours
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-playfair font-semibold text-foreground mb-4 text-lg">
              Contact
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gbeto-gold" />
                <span className="text-muted-foreground text-sm">
                  Cotonou, Bénin
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gbeto-gold" />
                <span className="text-muted-foreground text-sm">
                  +229 54 06 94 54
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gbeto-gold" />
                <span className="text-muted-foreground text-sm">
                  amoussoukpeviariola4@gmail.com
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gbeto-gold/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © 2024 Danxomɛ. Tous droits réservés. MADE BY DORÉGO
          </p>
          <div className="flex space-x-6 text-sm">
            <Link to="/privacy" className="text-muted-foreground hover:text-gbeto-gold transition-colors">
              Politique de confidentialité
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-gbeto-gold transition-colors">
              Conditions d'utilisation
            </Link>
            <Link to="/cookies" className="text-muted-foreground hover:text-gbeto-gold transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
