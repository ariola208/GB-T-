import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Dictionnaire de traductions
const translations = {
  fr: {
    // Navigation
    'home': 'Accueil',
    'shop': 'Boutique',
    'tourism': 'Tourisme',
    'artisanat': 'Artisanat',
    'culture': 'Culture',
    'about': 'À propos',
    'login': 'Connexion',
    'register': 'Inscription',
    'logout': 'Déconnexion',
    'profile': 'Profil',
    'cart': 'Panier',
    'wishlist': 'Liste de souhaits',
    'contact': 'Contact',
    'faq': 'FAQ',
    'privacy': 'Confidentialité',
    'terms': 'Conditions',
    'cookies': 'Cookies',
    'livraison': 'Livraison',
    'retours': 'Retours',
    
    // Pages d'authentification
    'login.title': 'Connectez-vous à Danxomɛ',
    'login.subtitle': 'Accédez à votre compte pour continuer votre exploration.',
    'login.email': 'Adresse Email',
    'login.password': 'Mot de passe',
    'login.forgot_password': 'Mot de passe oublié ?',
    'login.submit': 'Se connecter',
    'login.loading': 'Connexion en cours...',
    'login.no_account': 'Vous n\'avez pas de compte ?',
    
    'register.title': 'Créez un compte Danxomɛ',
    'register.subtitle': 'Rejoignez notre communauté d\'acheteurs passionnés ou d\'artisans.',
    'register.name': 'Nom Complet (Optionnel)',
    'register.email': 'Adresse Email *',
    'register.password': 'Mot de passe *',
    'register.artisan': 'Je suis un Artisan/Partenaire (accès au tableau de bord vendeur)',
    'register.submit': 'S\'inscrire',
    'register.loading': 'Inscription en cours...',
    'register.has_account': 'Vous avez déjà un compte ?',

    // Messages
    'required_fields': 'Champs requis',
    'server_error': 'Erreur Serveur',
    'connection_success': 'Connexion réussie !',
    'registration_success': 'Inscription réussie !',
    'welcome': 'Bienvenue',

    // Footer
    'footer.newsletter': 'Newsletter',
    'footer.newsletterDesc': 'Inscrivez-vous pour recevoir nos offres exclusives',
    'footer.email': 'Email',
    'footer.subscribe': 'S\'abonner',
    'footer.quickLinks': 'Liens rapides',
    'footer.legal': 'Informations légales',
    'footer.rights': 'Tous droits réservés',

    // Page Contact
    'contact.title': 'Contactez-nous',
    'contact.subtitle': 'Nous sommes là pour répondre à toutes vos questions',
    'contact.address': 'Adresse',
    'contact.phone': 'Téléphone',
    'contact.email': 'Email',
    'contact.hours': 'Horaires',
    'contact.formTitle': 'Envoyez-nous un message',
    'contact.formDescription': 'Nous vous répondrons dans les plus brefs délais',
    'contact.name': 'Votre nom',
    'contact.subject': 'Sujet',
    'contact.message': 'Votre message',
    'contact.send': 'Envoyer',
    'contact.sending': 'Envoi en cours...',
    'contact.success': 'Message envoyé',
    'contact.successMessage': 'Nous vous répondrons dans les plus brefs délais',
    'contact.faqTitle': 'Questions fréquentes',
    'contact.faqDescription': 'Consultez notre FAQ pour des réponses rapides aux questions courantes',
    'contact.visitFaq': 'Visiter la FAQ',

    // Page Livraison
    'livraison.title': 'Livraison',
    'livraison.subtitle': 'Découvrez nos options de livraison rapides et sécurisées',
    'livraison.standard': 'Standard',
    'livraison.express': 'Express',
    'livraison.pointRelais': 'Point Relais',
    'livraison.internationale': 'Internationale',
    'livraison.processTitle': 'Comment se passe la livraison ?',
    'livraison.step1': 'Préparation',
    'livraison.step1Desc': 'Préparation de votre commande en 24h',
    'livraison.step2': 'Expédition',
    'livraison.step2Desc': 'Colis remis au transporteur',
    'livraison.step3': 'Transport',
    'livraison.step3Desc': 'Acheminement vers votre adresse',
    'livraison.step4': 'Livraison',
    'livraison.step4Desc': 'Réception de votre colis',
    'livraison.zonesTitle': 'Zones de livraison',
    'livraison.shippingInfo': 'Informations d\'expédition',
    'livraison.paymentInfo': 'Paiement sécurisé',

    // Page Retours
    'retours.title': 'Retours et Remboursements',
    'retours.subtitle': 'Nous facilitons vos retours pour que vous soyez toujours satisfait',
    'retours.policy': 'Politique de retour',
    'retours.howto': 'Comment retourner ?',
    'retours.faq': 'FAQ Retours',

    // Page FAQ
    'faq.title': 'Questions Fréquentes',
    'faq.subtitle': 'Trouvez rapidement des réponses à vos questions',
    'faq.search': 'Rechercher une question...',
    'faq.noResults': 'Aucun résultat trouvé',
    'faq.categories': 'Catégories',
    'faq.contact': 'Vous n\'avez pas trouvé votre réponse ?',
    'faq.contactDesc': 'Notre équipe est là pour vous aider',

    // Page Politique de Confidentialité
    'privacy.title': 'Politique de Confidentialité',
    'privacy.lastUpdate': 'Dernière mise à jour',
    'privacy.intro': 'Nous accordons une grande importance à la protection de vos données personnelles',

    // Page Conditions d'Utilisation
    'terms.title': 'Conditions Générales d\'Utilisation',
    'terms.lastUpdate': 'Dernière mise à jour',

    // Page Cookies
    'cookies.title': 'Politique des Cookies',
    'cookies.description': 'Nous utilisons des cookies pour améliorer votre expérience de navigation',
    'cookies.accept': 'Accepter',
    'cookies.decline': 'Refuser',
    'cookies.customize': 'Personnaliser',

    // Page d'accueil (Index)
    'home.hero.title': 'Découvrez l\'Artisanat Marocain',
    'home.hero.subtitle': 'Des produits authentiques faits main par des artisans passionnés',
    'home.hero.cta': 'Explorer la boutique',
    'home.featured': 'Produits en vedette',
    'home.categories': 'Catégories',
    'home.testimonials': 'Témoignages',

    // Boutique (Shop)
    'shop.title': 'Notre Boutique',
    'shop.filter': 'Filtrer',
    'shop.sort': 'Trier par',
    'shop.price': 'Prix',
    'shop.category': 'Catégorie',
    'shop.addToCart': 'Ajouter au panier',
    'shop.addToWishlist': 'Ajouter aux favoris',
    'shop.outOfStock': 'Rupture de stock',
    'shop.inStock': 'En stock',

    // Tourisme (Tourism)
    'tourism.title': 'Tourisme au Maroc',
    'tourism.subtitle': 'Découvrez les merveilles du Maroc',
    'tourism.destinations': 'Destinations populaires',
    'tourism.activities': 'Activités',
    'tourism.bookNow': 'Réserver maintenant',

    // Artisanat (Artisanat)
    'artisanat.title': 'Notre Artisanat',
    'artisanat.subtitle': 'Découvrez le savoir-faire unique des artisans marocains',
    'artisanat.traditional': 'Artisanat traditionnel',
    'artisanat.modern': 'Créations modernes',
    'artisanat.learnMore': 'En savoir plus',

    // Culture (Culture)
    'culture.title': 'Culture Marocaine',
    'culture.subtitle': 'Plongez dans la richesse culturelle du Maroc',
    'culture.history': 'Histoire',
    'culture.traditions': 'Traditions',
    'culture.gastronomy': 'Gastronomie',
    'culture.arts': 'Arts',

    // À propos (About)
    'about.title': 'À propos de nous',
    'about.subtitle': 'Découvrez notre histoire et notre mission',
    'about.mission': 'Notre mission',
    'about.values': 'Nos valeurs',
    'about.team': 'Notre équipe'
  },
  en: {
    // Navigation
    'home': 'Home',
    'shop': 'Shop',
    'tourism': 'Tourism',
    'artisanat': 'Crafts',
    'culture': 'Culture',
    'about': 'About',
    'login': 'Login',
    'register': 'Register',
    'logout': 'Logout',
    'profile': 'Profile',
    'cart': 'Cart',
    'wishlist': 'Wishlist',
    'contact': 'Contact',
    'faq': 'FAQ',
    'privacy': 'Privacy',
    'terms': 'Terms',
    'cookies': 'Cookies',
    'livraison': 'Delivery',
    'retours': 'Returns',
    
    // Pages d'authentification
    'login.title': 'Login to Danxomɛ',
    'login.subtitle': 'Access your account to continue your exploration.',
    'login.email': 'Email Address',
    'login.password': 'Password',
    'login.forgot_password': 'Forgot password?',
    'login.submit': 'Login',
    'login.loading': 'Logging in...',
    'login.no_account': 'Don\'t have an account?',
    
    'register.title': 'Create a Danxomɛ Account',
    'register.subtitle': 'Join our community of passionate buyers or artisans.',
    'register.name': 'Full Name (Optional)',
    'register.email': 'Email Address *',
    'register.password': 'Password *',
    'register.artisan': 'I am an Artisan/Partner (seller dashboard access)',
    'register.submit': 'Register',
    'register.loading': 'Registering...',
    'register.has_account': 'Already have an account?',

    // Messages
    'required_fields': 'Required fields',
    'server_error': 'Server Error',
    'connection_success': 'Login successful!',
    'registration_success': 'Registration successful!',
    'welcome': 'Welcome',

    // Footer
    'footer.newsletter': 'Newsletter',
    'footer.newsletterDesc': 'Subscribe to receive our exclusive offers',
    'footer.email': 'Email',
    'footer.subscribe': 'Subscribe',
    'footer.quickLinks': 'Quick links',
    'footer.legal': 'Legal information',
    'footer.rights': 'All rights reserved',

    // Page Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'We are here to answer all your questions',
    'contact.address': 'Address',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.hours': 'Hours',
    'contact.formTitle': 'Send us a message',
    'contact.formDescription': 'We will respond as soon as possible',
    'contact.name': 'Your name',
    'contact.subject': 'Subject',
    'contact.message': 'Your message',
    'contact.send': 'Send',
    'contact.sending': 'Sending...',
    'contact.success': 'Message sent',
    'contact.successMessage': 'We will respond as soon as possible',
    'contact.faqTitle': 'Frequently asked questions',
    'contact.faqDescription': 'Check our FAQ for quick answers to common questions',
    'contact.visitFaq': 'Visit FAQ',

    // Page Livraison
    'livraison.title': 'Delivery',
    'livraison.subtitle': 'Discover our fast and secure delivery options',
    'livraison.standard': 'Standard',
    'livraison.express': 'Express',
    'livraison.pointRelais': 'Pickup Point',
    'livraison.internationale': 'International',
    'livraison.processTitle': 'How does delivery work?',
    'livraison.step1': 'Preparation',
    'livraison.step1Desc': 'Order preparation within 24h',
    'livraison.step2': 'Shipping',
    'livraison.step2Desc': 'Package handed to carrier',
    'livraison.step3': 'Transport',
    'livraison.step3Desc': 'Routing to your address',
    'livraison.step4': 'Delivery',
    'livraison.step4Desc': 'Receiving your package',
    'livraison.zonesTitle': 'Delivery zones',
    'livraison.shippingInfo': 'Shipping information',
    'livraison.paymentInfo': 'Secure payment',

    // Page Retours
    'retours.title': 'Returns and Refunds',
    'retours.subtitle': 'We make returns easy so you are always satisfied',
    'retours.policy': 'Return policy',
    'retours.howto': 'How to return?',
    'retours.faq': 'Returns FAQ',

    // Page FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle': 'Quickly find answers to your questions',
    'faq.search': 'Search for a question...',
    'faq.noResults': 'No results found',
    'faq.categories': 'Categories',
    'faq.contact': 'Didn\'t find your answer?',
    'faq.contactDesc': 'Our team is here to help you',

    // Page Politique de Confidentialité
    'privacy.title': 'Privacy Policy',
    'privacy.lastUpdate': 'Last update',
    'privacy.intro': 'We take the protection of your personal data very seriously',

    // Page Conditions d'Utilisation
    'terms.title': 'Terms of Use',
    'terms.lastUpdate': 'Last update',

    // Page Cookies
    'cookies.title': 'Cookies Policy',
    'cookies.description': 'We use cookies to improve your browsing experience',
    'cookies.accept': 'Accept',
    'cookies.decline': 'Decline',
    'cookies.customize': 'Customize',

    // Page d'accueil (Index)
    'home.hero.title': 'Discover Moroccan Crafts',
    'home.hero.subtitle': 'Authentic handmade products by passionate artisans',
    'home.hero.cta': 'Explore the shop',
    'home.featured': 'Featured products',
    'home.categories': 'Categories',
    'home.testimonials': 'Testimonials',

    // Boutique (Shop)
    'shop.title': 'Our Shop',
    'shop.filter': 'Filter',
    'shop.sort': 'Sort by',
    'shop.price': 'Price',
    'shop.category': 'Category',
    'shop.addToCart': 'Add to cart',
    'shop.addToWishlist': 'Add to wishlist',
    'shop.outOfStock': 'Out of stock',
    'shop.inStock': 'In stock',

    // Tourisme (Tourism)
    'tourism.title': 'Tourism in Morocco',
    'tourism.subtitle': 'Discover the wonders of Morocco',
    'tourism.destinations': 'Popular destinations',
    'tourism.activities': 'Activities',
    'tourism.bookNow': 'Book now',

    // Artisanat (Artisanat)
    'artisanat.title': 'Our Crafts',
    'artisanat.subtitle': 'Discover the unique know-how of Moroccan artisans',
    'artisanat.traditional': 'Traditional crafts',
    'artisanat.modern': 'Modern creations',
    'artisanat.learnMore': 'Learn more',

    // Culture (Culture)
    'culture.title': 'Moroccan Culture',
    'culture.subtitle': 'Dive into the cultural richness of Morocco',
    'culture.history': 'History',
    'culture.traditions': 'Traditions',
    'culture.gastronomy': 'Gastronomy',
    'culture.arts': 'Arts',

    // À propos (About)
    'about.title': 'About us',
    'about.subtitle': 'Discover our story and mission',
    'about.mission': 'Our mission',
    'about.values': 'Our values',
    'about.team': 'Our team'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("preferred-language") as Language) || "fr";
    }
    return "fr";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("preferred-language", language);
      document.documentElement.lang = language;
    }
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
