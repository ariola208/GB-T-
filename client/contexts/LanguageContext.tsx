import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'fr' | 'en' | 'es' | 'de' | 'it' | 'pt' | 'nl' | 'zh' | 'ja' | 'ar' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    // Navigation
    'nav.ecommerce': 'E-commerce',
    'nav.tourism': 'Tourisme',
    'nav.artisanat': 'Artisanat',
    'nav.culture': 'Culture',
    'nav.about': 'À propos',
    
    // Search
    'search.placeholder': 'Rechercher des produits, destinations...',
    'search.mobile.placeholder': 'Rechercher...',
    
    // Buttons
    'button.addToCart': 'Ajouter au panier',
    'button.buyNow': 'Acheter maintenant',
    'button.viewDetails': 'Voir détails',
    'button.addToWishlist': 'Ajouter aux favoris',
    'button.removeFromWishlist': 'Retirer des favoris',
    'button.checkout': 'Passer à la caisse',
    'button.continue': 'Continuer',
    'button.save': 'Enregistrer',
    'button.cancel': 'Annuler',
    'button.login': 'Se connecter',
    'button.register': "S'inscrire",
    'button.logout': 'Se déconnecter',
    'button.profile': 'Mon profil',
    'button.orders': 'Mes commandes',
    'button.wishlist': 'Mes favoris',
    'button.settings': 'Paramètres',
    
    // Auth pages
    'auth.login.title': 'Connexion',
    'auth.login.subtitle': 'Connectez-vous à votre compte',
    'auth.login.email': 'Email',
    'auth.login.password': 'Mot de passe',
    'auth.login.forgotPassword': 'Mot de passe oublié ?',
    'auth.login.noAccount': "Pas encore de compte ?",
    'auth.login.registerLink': "S'inscrire",
    'auth.register.title': 'Inscription',
    'auth.register.subtitle': 'Créez votre compte',
    'auth.register.name': 'Nom complet',
    'auth.register.email': 'Email',
    'auth.register.password': 'Mot de passe',
    'auth.register.confirmPassword': 'Confirmer le mot de passe',
    'auth.register.haveAccount': 'Déjà un compte ?',
    'auth.register.loginLink': 'Se connecter',
    
    // Profile page
    'profile.title': 'Mon Profil',
    'profile.personalInfo': 'Informations personnelles',
    'profile.name': 'Nom',
    'profile.email': 'Email',
    'profile.phone': 'Téléphone',
    'profile.address': 'Adresse',
    'profile.city': 'Ville',
    'profile.country': 'Pays',
    'profile.postalCode': 'Code postal',
    'profile.edit': 'Modifier le profil',
    'profile.orders': 'Mes commandes',
    'profile.wishlist': 'Mes favoris',
    'profile.recentOrders': 'Commandes récentes',
    'profile.noOrders': 'Aucune commande',
    'profile.noWishlist': 'Aucun favori',
    'profile.memberSince': 'Membre depuis',
    
    // Cart
    'cart.title': 'Votre panier',
    'cart.empty': 'Votre panier est vide',
    'cart.total': 'Total',
    'cart.checkout': 'Commander',
    'cart.continue': 'Continuer les achats',
    
    // Footer
    'footer.about': 'À propos',
    'footer.contact': 'Contact',
    'footer.faq': 'FAQ',
    'footer.privacy': 'Politique de confidentialité',
    'footer.terms': "Conditions d'utilisation",
    'footer.cookies': 'Cookies',
    'footer.livraison': 'Livraison',
    'footer.retours': 'Retours',
    'footer.rights': 'Tous droits réservés',
  },
  en: {
    // Navigation
    'nav.ecommerce': 'E-commerce',
    'nav.tourism': 'Tourism',
    'nav.artisanat': 'Handicrafts',
    'nav.culture': 'Culture',
    'nav.about': 'About',
    
    // Search
    'search.placeholder': 'Search products, destinations...',
    'search.mobile.placeholder': 'Search...',
    
    // Buttons
    'button.addToCart': 'Add to Cart',
    'button.buyNow': 'Buy Now',
    'button.viewDetails': 'View Details',
    'button.addToWishlist': 'Add to Wishlist',
    'button.removeFromWishlist': 'Remove from Wishlist',
    'button.checkout': 'Checkout',
    'button.continue': 'Continue',
    'button.save': 'Save',
    'button.cancel': 'Cancel',
    'button.login': 'Login',
    'button.register': 'Register',
    'button.logout': 'Logout',
    'button.profile': 'My Profile',
    'button.orders': 'My Orders',
    'button.wishlist': 'My Wishlist',
    'button.settings': 'Settings',
    
    // Auth pages
    'auth.login.title': 'Login',
    'auth.login.subtitle': 'Login to your account',
    'auth.login.email': 'Email',
    'auth.login.password': 'Password',
    'auth.login.forgotPassword': 'Forgot password?',
    'auth.login.noAccount': "Don't have an account?",
    'auth.login.registerLink': "Register",
    'auth.register.title': 'Register',
    'auth.register.subtitle': 'Create your account',
    'auth.register.name': 'Full name',
    'auth.register.email': 'Email',
    'auth.register.password': 'Password',
    'auth.register.confirmPassword': 'Confirm password',
    'auth.register.haveAccount': 'Already have an account?',
    'auth.register.loginLink': 'Login',
    
    // Profile page
    'profile.title': 'My Profile',
    'profile.personalInfo': 'Personal Information',
    'profile.name': 'Name',
    'profile.email': 'Email',
    'profile.phone': 'Phone',
    'profile.address': 'Address',
    'profile.city': 'City',
    'profile.country': 'Country',
    'profile.postalCode': 'Postal code',
    'profile.edit': 'Edit Profile',
    'profile.orders': 'My Orders',
    'profile.wishlist': 'My Wishlist',
    'profile.recentOrders': 'Recent Orders',
    'profile.noOrders': 'No orders',
    'profile.noWishlist': 'No wishlist items',
    'profile.memberSince': 'Member since',
    
    // Cart
    'cart.title': 'Your Cart',
    'cart.empty': 'Your cart is empty',
    'cart.total': 'Total',
    'cart.checkout': 'Checkout',
    'cart.continue': 'Continue shopping',
    
    // Footer
    'footer.about': 'About',
    'footer.contact': 'Contact',
    'footer.faq': 'FAQ',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Use',
    'footer.cookies': 'Cookies',
    'footer.livraison': 'Delivery',
    'footer.retours': 'Returns',
    'footer.rights': 'All rights reserved',
  },
  es: {
    // Navigation
    'nav.ecommerce': 'Comercio electrónico',
    'nav.tourism': 'Turismo',
    'nav.artisanat': 'Artesanía',
    'nav.culture': 'Cultura',
    'nav.about': 'Acerca de',
    
    // Search
    'search.placeholder': 'Buscar productos, destinos...',
    'search.mobile.placeholder': 'Buscar...',
    
    // Buttons
    'button.addToCart': 'Añadir al carrito',
    'button.buyNow': 'Comprar ahora',
    'button.viewDetails': 'Ver detalles',
    'button.addToWishlist': 'Añadir a favoritos',
    'button.removeFromWishlist': 'Quitar de favoritos',
    'button.checkout': 'Pagar',
    'button.continue': 'Continuar',
    'button.save': 'Guardar',
    'button.cancel': 'Cancelar',
    'button.login': 'Iniciar sesión',
    'button.register': 'Registrarse',
    'button.logout': 'Cerrar sesión',
    'button.profile': 'Mi perfil',
    'button.orders': 'Mis pedidos',
    'button.wishlist': 'Mis favoritos',
    'button.settings': 'Configuración',
    
    // Auth pages
    'auth.login.title': 'Iniciar sesión',
    'auth.login.subtitle': 'Inicia sesión en tu cuenta',
    'auth.login.email': 'Email',
    'auth.login.password': 'Contraseña',
    'auth.login.forgotPassword': '¿Olvidaste la contraseña?',
    'auth.login.noAccount': '¿No tienes cuenta?',
    'auth.login.registerLink': 'Registrarse',
    'auth.register.title': 'Registro',
    'auth.register.subtitle': 'Crea tu cuenta',
    'auth.register.name': 'Nombre completo',
    'auth.register.email': 'Email',
    'auth.register.password': 'Contraseña',
    'auth.register.confirmPassword': 'Confirmar contraseña',
    'auth.register.haveAccount': '¿Ya tienes cuenta?',
    'auth.register.loginLink': 'Iniciar sesión',
    
    // Profile page
    'profile.title': 'Mi Perfil',
    'profile.personalInfo': 'Información personal',
    'profile.name': 'Nombre',
    'profile.email': 'Email',
    'profile.phone': 'Teléfono',
    'profile.address': 'Dirección',
    'profile.city': 'Ciudad',
    'profile.country': 'País',
    'profile.postalCode': 'Código postal',
    'profile.edit': 'Editar perfil',
    'profile.orders': 'Mis pedidos',
    'profile.wishlist': 'Mis favoritos',
    'profile.recentOrders': 'Pedidos recientes',
    'profile.noOrders': 'Sin pedidos',
    'profile.noWishlist': 'Sin favoritos',
    'profile.memberSince': 'Miembro desde',
    
    // Cart
    'cart.title': 'Tu carrito',
    'cart.empty': 'Tu carrito está vacío',
    'cart.total': 'Total',
    'cart.checkout': 'Pagar',
    'cart.continue': 'Seguir comprando',
    
    // Footer
    'footer.about': 'Acerca de',
    'footer.contact': 'Contacto',
    'footer.faq': 'Preguntas frecuentes',
    'footer.privacy': 'Política de privacidad',
    'footer.terms': 'Términos de uso',
    'footer.cookies': 'Cookies',
    'footer.livraison': 'Entrega',
    'footer.retours': 'Devoluciones',
    'footer.rights': 'Todos los derechos reservados',
  },
  de: {
    // Navigation
    'nav.ecommerce': 'E-Commerce',
    'nav.tourism': 'Tourismus',
    'nav.artisanat': 'Handwerk',
    'nav.culture': 'Kultur',
    'nav.about': 'Über uns',
    
    // Search
    'search.placeholder': 'Produkte, Reiseziele suchen...',
    'search.mobile.placeholder': 'Suchen...',
    
    // Buttons
    'button.addToCart': 'In den Warenkorb',
    'button.buyNow': 'Jetzt kaufen',
    'button.viewDetails': 'Details anzeigen',
    'button.addToWishlist': 'Zur Wunschliste',
    'button.removeFromWishlist': 'Von Wunschliste entfernen',
    'button.checkout': 'Zur Kasse',
    'button.continue': 'Weiter',
    'button.save': 'Speichern',
    'button.cancel': 'Abbrechen',
    'button.login': 'Anmelden',
    'button.register': 'Registrieren',
    'button.logout': 'Abmelden',
    'button.profile': 'Mein Profil',
    'button.orders': 'Meine Bestellungen',
    'button.wishlist': 'Meine Wunschliste',
    'button.settings': 'Einstellungen',
    
    // Auth pages
    'auth.login.title': 'Anmelden',
    'auth.login.subtitle': 'Melden Sie sich bei Ihrem Konto an',
    'auth.login.email': 'E-Mail',
    'auth.login.password': 'Passwort',
    'auth.login.forgotPassword': 'Passwort vergessen?',
    'auth.login.noAccount': 'Noch kein Konto?',
    'auth.login.registerLink': 'Registrieren',
    'auth.register.title': 'Registrieren',
    'auth.register.subtitle': 'Konto erstellen',
    'auth.register.name': 'Vollständiger Name',
    'auth.register.email': 'E-Mail',
    'auth.register.password': 'Passwort',
    'auth.register.confirmPassword': 'Passwort bestätigen',
    'auth.register.haveAccount': 'Bereits ein Konto?',
    'auth.register.loginLink': 'Anmelden',
    
    // Profile page
    'profile.title': 'Mein Profil',
    'profile.personalInfo': 'Persönliche Informationen',
    'profile.name': 'Name',
    'profile.email': 'E-Mail',
    'profile.phone': 'Telefon',
    'profile.address': 'Adresse',
    'profile.city': 'Stadt',
    'profile.country': 'Land',
    'profile.postalCode': 'Postleitzahl',
    'profile.edit': 'Profil bearbeiten',
    'profile.orders': 'Meine Bestellungen',
    'profile.wishlist': 'Meine Wunschliste',
    'profile.recentOrders': 'Letzte Bestellungen',
    'profile.noOrders': 'Keine Bestellungen',
    'profile.noWishlist': 'Keine Wunschliste',
    'profile.memberSince': 'Mitglied seit',
    
    // Cart
    'cart.title': 'Ihr Warenkorb',
    'cart.empty': 'Ihr Warenkorb ist leer',
    'cart.total': 'Gesamt',
    'cart.checkout': 'Zur Kasse',
    'cart.continue': 'Weiter einkaufen',
    
    // Footer
    'footer.about': 'Über uns',
    'footer.contact': 'Kontakt',
    'footer.faq': 'FAQ',
    'footer.privacy': 'Datenschutz',
    'footer.terms': 'Nutzungsbedingungen',
    'footer.cookies': 'Cookies',
    'footer.livraison': 'Lieferung',
    'footer.retours': 'Rückgaben',
    'footer.rights': 'Alle Rechte vorbehalten',
  },
  it: {
    // Navigation
    'nav.ecommerce': 'E-commerce',
    'nav.tourism': 'Turismo',
    'nav.artisanat': 'Artigianato',
    'nav.culture': 'Cultura',
    'nav.about': 'Chi siamo',
    
    // Search
    'search.placeholder': 'Cerca prodotti, destinazioni...',
    'search.mobile.placeholder': 'Cerca...',
    
    // Buttons
    'button.addToCart': 'Aggiungi al carrello',
    'button.buyNow': 'Acquista ora',
    'button.viewDetails': 'Vedi dettagli',
    'button.addToWishlist': 'Aggiungi ai preferiti',
    'button.removeFromWishlist': 'Rimuovi dai preferiti',
    'button.checkout': 'Pagamento',
    'button.continue': 'Continua',
    'button.save': 'Salva',
    'button.cancel': 'Annulla',
    'button.login': 'Accedi',
    'button.register': 'Registrati',
    'button.logout': 'Esci',
    'button.profile': 'Il mio profilo',
    'button.orders': 'I miei ordini',
    'button.wishlist': 'I miei preferiti',
    'button.settings': 'Impostazioni',
    
    // Auth pages
    'auth.login.title': 'Accedi',
    'auth.login.subtitle': 'Accedi al tuo account',
    'auth.login.email': 'Email',
    'auth.login.password': 'Password',
    'auth.login.forgotPassword': 'Password dimenticata?',
    'auth.login.noAccount': 'Non hai un account?',
    'auth.login.registerLink': 'Registrati',
    'auth.register.title': 'Registrazione',
    'auth.register.subtitle': 'Crea il tuo account',
    'auth.register.name': 'Nome completo',
    'auth.register.email': 'Email',
    'auth.register.password': 'Password',
    'auth.register.confirmPassword': 'Conferma password',
    'auth.register.haveAccount': 'Hai già un account?',
    'auth.register.loginLink': 'Accedi',
    
    // Profile page
    'profile.title': 'Il mio profilo',
    'profile.personalInfo': 'Informazioni personali',
    'profile.name': 'Nome',
    'profile.email': 'Email',
    'profile.phone': 'Telefono',
    'profile.address': 'Indirizzo',
    'profile.city': 'Città',
    'profile.country': 'Paese',
    'profile.postalCode': 'Codice postale',
    'profile.edit': 'Modifica profilo',
    'profile.orders': 'I miei ordini',
    'profile.wishlist': 'I miei preferiti',
    'profile.recentOrders': 'Ordini recenti',
    'profile.noOrders': 'Nessun ordine',
    'profile.noWishlist': 'Nessun preferito',
    'profile.memberSince': 'Membro dal',
    
    // Cart
    'cart.title': 'Il tuo carrello',
    'cart.empty': 'Il tuo carrello è vuoto',
    'cart.total': 'Totale',
    'cart.checkout': 'Pagamento',
    'cart.continue': 'Continua lo shopping',
    
    // Footer
    'footer.about': 'Chi siamo',
    'footer.contact': 'Contatti',
    'footer.faq': 'FAQ',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Termini di utilizzo',
    'footer.cookies': 'Cookies',
    'footer.livraison': 'Consegna',
    'footer.retours': 'Resi',
    'footer.rights': 'Tutti i diritti riservati',
  },
  pt: {
    // Navigation
    'nav.ecommerce': 'E-commerce',
    'nav.tourism': 'Turismo',
    'nav.artisanat': 'Artesanato',
    'nav.culture': 'Cultura',
    'nav.about': 'Sobre',
    
    // Search
    'search.placeholder': 'Pesquisar produtos, destinos...',
    'search.mobile.placeholder': 'Pesquisar...',
    
    // Buttons
    'button.addToCart': 'Adicionar ao carrinho',
    'button.buyNow': 'Comprar agora',
    'button.viewDetails': 'Ver detalhes',
    'button.addToWishlist': 'Adicionar aos favoritos',
    'button.removeFromWishlist': 'Remover dos favoritos',
    'button.checkout': 'Finalizar compra',
    'button.continue': 'Continuar',
    'button.save': 'Salvar',
    'button.cancel': 'Cancelar',
    'button.login': 'Entrar',
    'button.register': 'Registrar',
    'button.logout': 'Sair',
    'button.profile': 'Meu perfil',
    'button.orders': 'Meus pedidos',
    'button.wishlist': 'Meus favoritos',
    'button.settings': 'Configurações',
    
    // Auth pages
    'auth.login.title': 'Entrar',
    'auth.login.subtitle': 'Entre na sua conta',
    'auth.login.email': 'Email',
    'auth.login.password': 'Senha',
    'auth.login.forgotPassword': 'Esqueceu a senha?',
    'auth.login.noAccount': 'Não tem uma conta?',
    'auth.login.registerLink': 'Registrar',
    'auth.register.title': 'Registro',
    'auth.register.subtitle': 'Crie sua conta',
    'auth.register.name': 'Nome completo',
    'auth.register.email': 'Email',
    'auth.register.password': 'Senha',
    'auth.register.confirmPassword': 'Confirmar senha',
    'auth.register.haveAccount': 'Já tem uma conta?',
    'auth.register.loginLink': 'Entrar',
    
    // Profile page
    'profile.title': 'Meu Perfil',
    'profile.personalInfo': 'Informações pessoais',
    'profile.name': 'Nome',
    'profile.email': 'Email',
    'profile.phone': 'Telefone',
    'profile.address': 'Endereço',
    'profile.city': 'Cidade',
    'profile.country': 'País',
    'profile.postalCode': 'Código postal',
    'profile.edit': 'Editar perfil',
    'profile.orders': 'Meus pedidos',
    'profile.wishlist': 'Meus favoritos',
    'profile.recentOrders': 'Pedidos recentes',
    'profile.noOrders': 'Nenhum pedido',
    'profile.noWishlist': 'Nenhum favorito',
    'profile.memberSince': 'Membro desde',
    
    // Cart
    'cart.title': 'Seu carrinho',
    'cart.empty': 'Seu carrinho está vazio',
    'cart.total': 'Total',
    'cart.checkout': 'Finalizar compra',
    'cart.continue': 'Continuar comprando',
    
    // Footer
    'footer.about': 'Sobre',
    'footer.contact': 'Contato',
    'footer.faq': 'FAQ',
    'footer.privacy': 'Política de privacidade',
    'footer.terms': 'Termos de uso',
    'footer.cookies': 'Cookies',
    'footer.livraison': 'Entrega',
    'footer.retours': 'Devoluções',
    'footer.rights': 'Todos os direitos reservados',
  },
  nl: {
    // Navigation
    'nav.ecommerce': 'E-commerce',
    'nav.tourism': 'Toerisme',
    'nav.artisanat': 'Ambachten',
    'nav.culture': 'Cultuur',
    'nav.about': 'Over ons',
    
    // Search
    'search.placeholder': 'Zoek producten, bestemmingen...',
    'search.mobile.placeholder': 'Zoeken...',
    
    // Buttons
    'button.addToCart': 'Toevoegen aan winkelwagen',
    'button.buyNow': 'Nu kopen',
    'button.viewDetails': 'Bekijk details',
    'button.addToWishlist': 'Toevoegen aan verlanglijst',
    'button.removeFromWishlist': 'Verwijderen van verlanglijst',
    'button.checkout': 'Afrekenen',
    'button.continue': 'Doorgaan',
    'button.save': 'Opslaan',
    'button.cancel': 'Annuleren',
    'button.login': 'Inloggen',
    'button.register': 'Registreren',
    'button.logout': 'Uitloggen',
    'button.profile': 'Mijn profiel',
    'button.orders': 'Mijn bestellingen',
    'button.wishlist': 'Mijn verlanglijst',
    'button.settings': 'Instellingen',
    
    // Auth pages
    'auth.login.title': 'Inloggen',
    'auth.login.subtitle': 'Log in op uw account',
    'auth.login.email': 'E-mail',
    'auth.login.password': 'Wachtwoord',
    'auth.login.forgotPassword': 'Wachtwoord vergeten?',
    'auth.login.noAccount': 'Nog geen account?',
    'auth.login.registerLink': 'Registreren',
    'auth.register.title': 'Registreren',
    'auth.register.subtitle': 'Maak uw account aan',
    'auth.register.name': 'Volledige naam',
    'auth.register.email': 'E-mail',
    'auth.register.password': 'Wachtwoord',
    'auth.register.confirmPassword': 'Bevestig wachtwoord',
    'auth.register.haveAccount': 'Heeft u al een account?',
    'auth.register.loginLink': 'Inloggen',
    
    // Profile page
    'profile.title': 'Mijn Profiel',
    'profile.personalInfo': 'Persoonlijke informatie',
    'profile.name': 'Naam',
    'profile.email': 'E-mail',
    'profile.phone': 'Telefoon',
    'profile.address': 'Adres',
    'profile.city': 'Stad',
    'profile.country': 'Land',
    'profile.postalCode': 'Postcode',
    'profile.edit': 'Profiel bewerken',
    'profile.orders': 'Mijn bestellingen',
    'profile.wishlist': 'Mijn verlanglijst',
    'profile.recentOrders': 'Recente bestellingen',
    'profile.noOrders': 'Geen bestellingen',
    'profile.noWishlist': 'Geen verlanglijst',
    'profile.memberSince': 'Lid sinds',
    
    // Cart
    'cart.title': 'Uw winkelwagen',
    'cart.empty': 'Uw winkelwagen is leeg',
    'cart.total': 'Totaal',
    'cart.checkout': 'Afrekenen',
    'cart.continue': 'Verder winkelen',
    
    // Footer
    'footer.about': 'Over ons',
    'footer.contact': 'Contact',
    'footer.faq': 'FAQ',
    'footer.privacy': 'Privacybeleid',
    'footer.terms': 'Gebruiksvoorwaarden',
    'footer.cookies': 'Cookies',
    'footer.livraison': 'Levering',
    'footer.retours': 'Retourneren',
    'footer.rights': 'Alle rechten voorbehouden',
  },
  zh: {
    // Navigation
    'nav.ecommerce': '电子商务',
    'nav.tourism': '旅游',
    'nav.artisanat': '手工艺品',
    'nav.culture': '文化',
    'nav.about': '关于我们',
    
    // Search
    'search.placeholder': '搜索产品、目的地...',
    'search.mobile.placeholder': '搜索...',
    
    // Buttons
    'button.addToCart': '加入购物车',
    'button.buyNow': '立即购买',
    'button.viewDetails': '查看详情',
    'button.addToWishlist': '加入收藏',
    'button.removeFromWishlist': '从收藏中移除',
    'button.checkout': '结账',
    'button.continue': '继续',
    'button.save': '保存',
    'button.cancel': '取消',
    'button.login': '登录',
    'button.register': '注册',
    'button.logout': '登出',
    'button.profile': '我的资料',
    'button.orders': '我的订单',
    'button.wishlist': '我的收藏',
    'button.settings': '设置',
    
    // Auth pages
    'auth.login.title': '登录',
    'auth.login.subtitle': '登录您的账户',
    'auth.login.email': '邮箱',
    'auth.login.password': '密码',
    'auth.login.forgotPassword': '忘记密码？',
    'auth.login.noAccount': '还没有账户？',
    'auth.login.registerLink': '注册',
    'auth.register.title': '注册',
    'auth.register.subtitle': '创建您的账户',
    'auth.register.name': '全名',
    'auth.register.email': '邮箱',
    'auth.register.password': '密码',
    'auth.register.confirmPassword': '确认密码',
    'auth.register.haveAccount': '已有账户？',
    'auth.register.loginLink': '登录',
    
    // Profile page
    'profile.title': '我的资料',
    'profile.personalInfo': '个人信息',
    'profile.name': '姓名',
    'profile.email': '邮箱',
    'profile.phone': '电话',
    'profile.address': '地址',
    'profile.city': '城市',
    'profile.country': '国家',
    'profile.postalCode': '邮政编码',
    'profile.edit': '编辑资料',
    'profile.orders': '我的订单',
    'profile.wishlist': '我的收藏',
    'profile.recentOrders': '最近订单',
    'profile.noOrders': '暂无订单',
    'profile.noWishlist': '暂无收藏',
    'profile.memberSince': '加入时间',
    
    // Cart
    'cart.title': '购物车',
    'cart.empty': '购物车是空的',
    'cart.total': '总计',
    'cart.checkout': '结账',
    'cart.continue': '继续购物',
    
    // Footer
    'footer.about': '关于我们',
    'footer.contact': '联系我们',
    'footer.faq': '常见问题',
    'footer.privacy': '隐私政策',
    'footer.terms': '使用条款',
    'footer.cookies': 'Cookies',
    'footer.livraison': '配送',
    'footer.retours': '退货',
    'footer.rights': '保留所有权利',
  },
  ja: {
    // Navigation
    'nav.ecommerce': 'Eコマース',
    'nav.tourism': '観光',
    'nav.artisanat': '工芸品',
    'nav.culture': '文化',
    'nav.about': '会社概要',
    
    // Search
    'search.placeholder': '商品、目的地を検索...',
    'search.mobile.placeholder': '検索...',
    
    // Buttons
    'button.addToCart': 'カートに追加',
    'button.buyNow': '今すぐ購入',
    'button.viewDetails': '詳細を見る',
    'button.addToWishlist': 'お気に入りに追加',
    'button.removeFromWishlist': 'お気に入りから削除',
    'button.checkout': 'レジに進む',
    'button.continue': '続ける',
    'button.save': '保存',
    'button.cancel': 'キャンセル',
    'button.login': 'ログイン',
    'button.register': '登録',
    'button.logout': 'ログアウト',
    'button.profile': 'マイプロフィール',
    'button.orders': '注文履歴',
    'button.wishlist': 'お気に入り',
    'button.settings': '設定',
    
    // Auth pages
    'auth.login.title': 'ログイン',
    'auth.login.subtitle': 'アカウントにログイン',
    'auth.login.email': 'メールアドレス',
    'auth.login.password': 'パスワード',
    'auth.login.forgotPassword': 'パスワードをお忘れですか？',
    'auth.login.noAccount': 'アカウントをお持ちでない方',
    'auth.login.registerLink': '登録',
    'auth.register.title': '登録',
    'auth.register.subtitle': 'アカウントを作成',
    'auth.register.name': '氏名',
    'auth.register.email': 'メールアドレス',
    'auth.register.password': 'パスワード',
    'auth.register.confirmPassword': 'パスワード（確認）',
    'auth.register.haveAccount': 'すでにアカウントをお持ちですか？',
    'auth.register.loginLink': 'ログイン',
    
    // Profile page
    'profile.title': 'マイプロフィール',
    'profile.personalInfo': '個人情報',
    'profile.name': '名前',
    'profile.email': 'メールアドレス',
    'profile.phone': '電話番号',
    'profile.address': '住所',
    'profile.city': '市区町村',
    'profile.country': '国',
    'profile.postalCode': '郵便番号',
    'profile.edit': 'プロフィール編集',
    'profile.orders': '注文履歴',
    'profile.wishlist': 'お気に入り',
    'profile.recentOrders': '最近の注文',
    'profile.noOrders': '注文履歴なし',
    'profile.noWishlist': 'お気に入りなし',
    'profile.memberSince': '登録日',
    
    // Cart
    'cart.title': 'カート',
    'cart.empty': 'カートは空です',
    'cart.total': '合計',
    'cart.checkout': 'レジに進む',
    'cart.continue': '買い物を続ける',
    
    // Footer
    'footer.about': '会社概要',
    'footer.contact': 'お問い合わせ',
    'footer.faq': 'よくある質問',
    'footer.privacy': 'プライバシーポリシー',
    'footer.terms': '利用規約',
    'footer.cookies': 'クッキー',
    'footer.livraison': '配送',
    'footer.retours': '返品',
    'footer.rights': '全著作権所有',
  },
  ar: {
    // Navigation
    'nav.ecommerce': 'التجارة الإلكترونية',
    'nav.tourism': 'السياحة',
    'nav.artisanat': 'الحرف اليدوية',
    'nav.culture': 'الثقافة',
    'nav.about': 'من نحن',
    
    // Search
    'search.placeholder': 'بحث عن منتجات، وجهات...',
    'search.mobile.placeholder': 'بحث...',
    
    // Buttons
    'button.addToCart': 'أضف إلى السلة',
    'button.buyNow': 'اشتر الآن',
    'button.viewDetails': 'عرض التفاصيل',
    'button.addToWishlist': 'أضف إلى المفضلة',
    'button.removeFromWishlist': 'إزالة من المفضلة',
    'button.checkout': 'إتمام الشراء',
    'button.continue': 'متابعة',
    'button.save': 'حفظ',
    'button.cancel': 'إلغاء',
    'button.login': 'تسجيل الدخول',
    'button.register': 'التسجيل',
    'button.logout': 'تسجيل الخروج',
    'button.profile': 'ملفي الشخصي',
    'button.orders': 'طلباتي',
    'button.wishlist': 'المفضلة',
    'button.settings': 'الإعدادات',
    
    // Auth pages
    'auth.login.title': 'تسجيل الدخول',
    'auth.login.subtitle': 'تسجيل الدخول إلى حسابك',
    'auth.login.email': 'البريد الإلكتروني',
    'auth.login.password': 'كلمة المرور',
    'auth.login.forgotPassword': 'نسيت كلمة المرور؟',
    'auth.login.noAccount': 'ليس لديك حساب؟',
    'auth.login.registerLink': 'التسجيل',
    'auth.register.title': 'التسجيل',
    'auth.register.subtitle': 'إنشاء حساب جديد',
    'auth.register.name': 'الاسم الكامل',
    'auth.register.email': 'البريد الإلكتروني',
    'auth.register.password': 'كلمة المرور',
    'auth.register.confirmPassword': 'تأكيد كلمة المرور',
    'auth.register.haveAccount': 'لديك حساب بالفعل؟',
    'auth.register.loginLink': 'تسجيل الدخول',
    
    // Profile page
    'profile.title': 'ملفي الشخصي',
    'profile.personalInfo': 'المعلومات الشخصية',
    'profile.name': 'الاسم',
    'profile.email': 'البريد الإلكتروني',
    'profile.phone': 'الهاتف',
    'profile.address': 'العنوان',
    'profile.city': 'المدينة',
    'profile.country': 'البلد',
    'profile.postalCode': 'الرمز البريدي',
    'profile.edit': 'تعديل الملف الشخصي',
    'profile.orders': 'طلباتي',
    'profile.wishlist': 'المفضلة',
    'profile.recentOrders': 'الطلبات الأخيرة',
    'profile.noOrders': 'لا توجد طلبات',
    'profile.noWishlist': 'لا توجد مفضلة',
    'profile.memberSince': 'عضو منذ',
    
    // Cart
    'cart.title': 'سلة التسوق',
    'cart.empty': 'سلة التسوق فارغة',
    'cart.total': 'المجموع',
    'cart.checkout': 'إتمام الشراء',
    'cart.continue': 'متابعة التسوق',
    
    // Footer
    'footer.about': 'من نحن',
    'footer.contact': 'اتصل بنا',
    'footer.faq': 'الأسئلة الشائعة',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'شروط الاستخدام',
    'footer.cookies': 'ملفات تعريف الارتباط',
    'footer.livraison': 'التوصيل',
    'footer.retours': 'الإرجاع',
    'footer.rights': 'جميع الحقوق محفوظة',
  },
  ru: {
    // Navigation
    'nav.ecommerce': 'Электронная коммерция',
    'nav.tourism': 'Туризм',
    'nav.artisanat': 'Ремесла',
    'nav.culture': 'Культура',
    'nav.about': 'О нас',
    
    // Search
    'search.placeholder': 'Поиск товаров, направлений...',
    'search.mobile.placeholder': 'Поиск...',
    
    // Buttons
    'button.addToCart': 'В корзину',
    'button.buyNow': 'Купить сейчас',
    'button.viewDetails': 'Подробнее',
    'button.addToWishlist': 'В избранное',
    'button.removeFromWishlist': 'Удалить из избранного',
    'button.checkout': 'Оформить заказ',
    'button.continue': 'Продолжить',
    'button.save': 'Сохранить',
    'button.cancel': 'Отмена',
    'button.login': 'Войти',
    'button.register': 'Регистрация',
    'button.logout': 'Выйти',
    'button.profile': 'Мой профиль',
    'button.orders': 'Мои заказы',
    'button.wishlist': 'Избранное',
    'button.settings': 'Настройки',
    
    // Auth pages
    'auth.login.title': 'Вход',
    'auth.login.subtitle': 'Войдите в свой аккаунт',
    'auth.login.email': 'Email',
    'auth.login.password': 'Пароль',
    'auth.login.forgotPassword': 'Забыли пароль?',
    'auth.login.noAccount': 'Нет аккаунта?',
    'auth.login.registerLink': 'Регистрация',
    'auth.register.title': 'Регистрация',
    'auth.register.subtitle': 'Создайте аккаунт',
    'auth.register.name': 'Полное имя',
    'auth.register.email': 'Email',
    'auth.register.password': 'Пароль',
    'auth.register.confirmPassword': 'Подтвердите пароль',
    'auth.register.haveAccount': 'Уже есть аккаунт?',
    'auth.register.loginLink': 'Войти',
    
    // Profile page
    'profile.title': 'Мой профиль',
    'profile.personalInfo': 'Личная информация',
    'profile.name': 'Имя',
    'profile.email': 'Email',
    'profile.phone': 'Телефон',
    'profile.address': 'Адрес',
    'profile.city': 'Город',
    'profile.country': 'Страна',
    'profile.postalCode': 'Почтовый индекс',
    'profile.edit': 'Редактировать профиль',
    'profile.orders': 'Мои заказы',
    'profile.wishlist': 'Избранное',
    'profile.recentOrders': 'Последние заказы',
    'profile.noOrders': 'Нет заказов',
    'profile.noWishlist': 'Нет избранного',
    'profile.memberSince': 'Участник с',
    
    // Cart
    'cart.title': 'Корзина',
    'cart.empty': 'Корзина пуста',
    'cart.total': 'Итого',
    'cart.checkout': 'Оформить заказ',
    'cart.continue': 'Продолжить покупки',
    
    // Footer
    'footer.about': 'О нас',
    'footer.contact': 'Контакты',
    'footer.faq': 'FAQ',
    'footer.privacy': 'Политика конфиденциальности',
    'footer.terms': 'Условия использования',
    'footer.cookies': 'Cookies',
    'footer.livraison': 'Доставка',
    'footer.retours': 'Возврат',
    'footer.rights': 'Все права защищены',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language;
    return saved || 'fr';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language]?.[key as keyof typeof translations['fr']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
