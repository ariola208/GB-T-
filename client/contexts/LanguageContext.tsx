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
