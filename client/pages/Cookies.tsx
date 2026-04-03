import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Cookie, Settings, Shield, Info, Check, X, Sliders, Clock, Globe, 
  AlertCircle, Save, RefreshCw 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';

// Types
type CookieType = 'necessary' | 'functional' | 'analytics' | 'marketing';
type CookiePreferences = Record<CookieType, boolean>;

interface CookieInfo {
  id: CookieType;
  name: string;
  description: string;
  always?: boolean;
  icon: React.ReactNode;
}

interface CookieDetail {
  name: string;
  duration: string;
  category: string;
}

// Constants
const COOKIE_STORAGE_KEY = 'cookie_preferences';
const COOKIE_EXPIRY_DAYS = 180; // 6 months

const COOKIE_TYPES: CookieInfo[] = [
  {
    id: 'necessary',
    name: 'Cookies essentiels',
    description: 'Nécessaires au fonctionnement du site. Ils permettent d\'utiliser les fonctionnalités principales comme la gestion du panier et l\'authentification.',
    always: true,
    icon: <Shield className="h-5 w-5 text-green-500" />
  },
  {
    id: 'functional',
    name: 'Cookies fonctionnels',
    description: 'Améliorent votre expérience en mémorisant vos préférences (langue, région) et vos choix personnalisés.',
    icon: <Settings className="h-5 w-5 text-blue-500" />
  },
  {
    id: 'analytics',
    name: 'Cookies analytiques',
    description: 'Nous aident à comprendre comment les visiteurs interagissent avec le site, en collectant des informations anonymes.',
    icon: <Info className="h-5 w-5 text-purple-500" />
  },
  {
    id: 'marketing',
    name: 'Cookies marketing',
    description: 'Utilisés pour vous proposer des publicités pertinentes et mesurer l\'efficacité de nos campagnes.',
    icon: <Globe className="h-5 w-5 text-orange-500" />
  }
];

const COOKIE_DETAILS: CookieDetail[] = [
  { name: 'session_id', duration: 'Session', category: 'Essentiels' },
  { name: 'csrf_token', duration: 'Session', category: 'Essentiels' },
  { name: 'cart_id', duration: '30 jours', category: 'Essentiels' },
  { name: 'language_preference', duration: '1 an', category: 'Fonctionnels' },
  { name: 'theme', duration: '1 an', category: 'Fonctionnels' },
  { name: '_ga (Google Analytics)', duration: '2 ans', category: 'Analytiques' },
  { name: '_gid (Google Analytics)', duration: '24h', category: 'Analytiques' }
];

const BROWSER_GUIDES = [
  { browser: 'Chrome', path: 'Paramètres → Confidentialité et sécurité' },
  { browser: 'Firefox', path: 'Options → Vie privée et sécurité' },
  { browser: 'Safari', path: 'Préférences → Confidentialité' },
  { browser: 'Edge', path: 'Paramètres → Cookies et autorisations' }
];

const Cookies: React.FC = () => {
  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>(() => {
    const saved = localStorage.getItem(COOKIE_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          necessary: true,
          functional: parsed.functional ?? false,
          analytics: parsed.analytics ?? false,
          marketing: parsed.marketing ?? false
        };
      } catch {
        return { necessary: true, functional: false, analytics: false, marketing: false };
      }
    }
    return { necessary: true, functional: false, analytics: false, marketing: false };
  });

  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'preferences' | 'details'>('preferences');

  const hasChanges = useMemo(() => {
    const saved = localStorage.getItem(COOKIE_STORAGE_KEY);
    if (!saved) return true;
    try {
      const parsed = JSON.parse(saved);
      return (
        parsed.functional !== cookiePreferences.functional ||
        parsed.analytics !== cookiePreferences.analytics ||
        parsed.marketing !== cookiePreferences.marketing
      );
    } catch {
      return true;
    }
  }, [cookiePreferences]);

  const handleToggle = useCallback((type: CookieType) => {
    if (type === 'necessary') return;
    setCookiePreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  }, []);

  const handleSave = useCallback(() => {
    setIsSaving(true);
    
    // Simulate async save
    setTimeout(() => {
      const preferencesToSave = {
        functional: cookiePreferences.functional,
        analytics: cookiePreferences.analytics,
        marketing: cookiePreferences.marketing
      };
      
      localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(preferencesToSave));
      
      toast({
        title: "Préférences sauvegardées",
        description: "Vos préférences de cookies ont été enregistrées avec succès.",
      });
      
      setIsSaving(false);
    }, 500);
  }, [cookiePreferences]);

  const handleReset = useCallback(() => {
    setCookiePreferences({
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false
    });
    
    toast({
      title: "Préférences réinitialisées",
      description: "Tous les cookies non essentiels ont été désactivés.",
    });
  }, []);

  const handleAcceptAll = useCallback(() => {
    setCookiePreferences({
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true
    });
    
    toast({
      title: "Tous les cookies acceptés",
      description: "Vous acceptez l'utilisation de tous les cookies.",
    });
  }, []);

  const handleDeclineAll = useCallback(() => {
    setCookiePreferences({
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false
    });
    
    toast({
      title: "Cookies refusés",
      description: "Seuls les cookies essentiels sont activés.",
    });
  }, []);

  const groupedCookieDetails = useMemo(() => {
    const groups: Record<string, CookieDetail[]> = {
      'Essentiels': [],
      'Fonctionnels': [],
      'Analytiques': []
    };
    
    COOKIE_DETAILS.forEach(cookie => {
      if (groups[cookie.category]) {
        groups[cookie.category].push(cookie);
      }
    });
    
    return groups;
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12"
    >
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-block p-4 bg-primary/10 rounded-full mb-4"
          >
            <Cookie className="h-14 w-14 text-primary" />
          </motion.div>
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Gestion des Cookies
          </motion.h1>
          <motion.p 
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            Personnalisez vos préférences en matière de cookies
          </motion.p>
        </div>

        {/* Alert Banner */}
        <Alert className="mb-8 border-primary/20 bg-primary/5">
          <Cookie className="h-5 w-5 text-primary" />
          <AlertTitle className="text-primary">Notre engagement pour votre vie privée</AlertTitle>
          <AlertDescription className="text-muted-foreground">
            Nous utilisons des cookies pour améliorer votre expérience de navigation. 
            Vous pouvez personnaliser vos préférences ci-dessous.
          </AlertDescription>
        </Alert>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 mb-6 justify-end">
          <Button variant="outline" size="sm" onClick={handleDeclineAll}>
            <X className="h-4 w-4 mr-2" />
            Tout refuser
          </Button>
          <Button variant="outline" size="sm" onClick={handleAcceptAll}>
            <Check className="h-4 w-4 mr-2" />
            Tout accepter
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)} className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Sliders className="h-4 w-4" />
              Préférences
            </TabsTrigger>
            <TabsTrigger value="details" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              Détails
            </TabsTrigger>
          </TabsList>

          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Personnalisez vos préférences</CardTitle>
                <CardDescription>
                  Sélectionnez les types de cookies que vous acceptez
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {COOKIE_TYPES.map((cookie) => (
                  <CookieSwitch
                    key={cookie.id}
                    cookie={cookie}
                    checked={cookiePreferences[cookie.id]}
                    onToggle={handleToggle}
                  />
                ))}

                <Separator />

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Vos préférences seront sauvegardées pendant 6 mois
                    </span>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button 
                      variant="outline" 
                      onClick={handleReset}
                      disabled={!hasChanges}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Réinitialiser
                    </Button>
                    <Button 
                      onClick={handleSave} 
                      disabled={isSaving || !hasChanges}
                      className="min-w-[120px]"
                    >
                      {isSaving ? (
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4 mr-2" />
                      )}
                      Sauvegarder
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Détails des cookies utilisés</CardTitle>
                <CardDescription>
                  Liste complète des cookies présents sur notre site
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(groupedCookieDetails).map(([category, cookies]) => (
                    <CookieCategorySection
                      key={category}
                      category={category}
                      cookies={cookies}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Additional Information */}
        <div className="grid gap-6 md:grid-cols-2">
          <BrowserGuideCard />
          <CookieDurationCard />
        </div>
      </div>
    </motion.div>
  );
};

// Sub-components
interface CookieSwitchProps {
  cookie: CookieInfo;
  checked: boolean;
  onToggle: (id: CookieType) => void;
}

const CookieSwitch: React.FC<CookieSwitchProps> = ({ cookie, checked, onToggle }) => {
  return (
    <div className="flex items-start justify-between space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          {cookie.icon}
          <Label htmlFor={cookie.id} className="font-medium cursor-pointer">
            {cookie.name}
          </Label>
          {cookie.always && (
            <span className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">
              Toujours actif
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          {cookie.description}
        </p>
      </div>
      <Switch
        id={cookie.id}
        checked={checked}
        onCheckedChange={() => onToggle(cookie.id)}
        disabled={cookie.always}
        className={cookie.always ? 'opacity-50' : ''}
      />
    </div>
  );
};

interface CookieCategorySectionProps {
  category: string;
  cookies: CookieDetail[];
}

const CookieCategorySection: React.FC<CookieCategorySectionProps> = ({ category, cookies }) => {
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Essentiels': return 'border-green-200 dark:border-green-800';
      case 'Fonctionnels': return 'border-blue-200 dark:border-blue-800';
      case 'Analytiques': return 'border-purple-200 dark:border-purple-800';
      default: return 'border-gray-200 dark:border-gray-700';
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Essentiels': return <Shield className="h-4 w-4 text-green-500" />;
      case 'Fonctionnels': return <Settings className="h-4 w-4 text-blue-500" />;
      case 'Analytiques': return <Info className="h-4 w-4 text-purple-500" />;
      default: return <Cookie className="h-4 w-4" />;
    }
  };

  return (
    <div className={`border rounded-lg p-4 ${getCategoryColor(category)}`}>
      <h3 className="font-semibold mb-3 flex items-center gap-2">
        {getCategoryIcon(category)}
        Cookies {category.toLowerCase()}
      </h3>
      <ul className="space-y-2">
        {cookies.map((cookie) => (
          <li key={cookie.name} className="flex justify-between items-center text-sm">
            <span className="font-mono text-muted-foreground">{cookie.name}</span>
            <span className="text-muted-foreground text-xs bg-muted px-2 py-1 rounded">
              {cookie.duration}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const BrowserGuideCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Settings className="h-5 w-5 text-primary" />
          Comment gérer vos cookies ?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Vous pouvez également gérer vos cookies directement depuis les paramètres de votre navigateur :
        </p>
        <ul className="space-y-2">
          {BROWSER_GUIDES.map((guide) => (
            <li key={guide.browser} className="text-sm">
              <span className="font-semibold">{guide.browser}</span>
              <span className="text-muted-foreground"> : {guide.path}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const CookieDurationCard: React.FC = () => {
  const durations = [
    { type: 'Cookies de session', duration: 'Fermeture du navigateur' },
    { type: 'Cookies persistants', duration: "Jusqu'à 13 mois" },
    { type: 'Cookies tiers', duration: 'Variable' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Durée de conservation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          La durée de conservation des cookies varie selon leur type :
        </p>
        <ul className="space-y-2">
          {durations.map((item) => (
            <li key={item.type} className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">{item.type}</span>
              <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                {item.duration}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default Cookies;
