import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cookie, Settings, Shield, Info, Check, X, Sliders, Clock, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

const Cookies = () => {
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true, // Toujours true et désactivé
    functional: false,
    analytics: false,
    marketing: false
  });

  const handleToggle = (type: keyof typeof cookiePreferences) => {
    if (type === 'necessary') return;
    setCookiePreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const cookieTypes = [
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-block p-3 bg-primary/10 rounded-full mb-4"
          >
            <Cookie className="h-12 w-12 text-primary" />
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

        {/* Introduction */}
        <Alert className="mb-8">
          <Cookie className="h-5 w-5" />
          <AlertTitle>Notre engagement pour votre vie privée</AlertTitle>
          <AlertDescription>
            Nous utilisons des cookies pour améliorer votre expérience de navigation. 
            Vous pouvez personnaliser vos préférences ci-dessous.
          </AlertDescription>
        </Alert>

        {/* Tabs */}
        <Tabs defaultValue="preferences" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
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
                {cookieTypes.map((cookie) => (
                  <div key={cookie.id} className="flex items-start justify-between space-x-4">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        {cookie.icon}
                        <Label htmlFor={cookie.id} className="font-medium">
                          {cookie.name}
                        </Label>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {cookie.description}
                      </p>
                    </div>
                    <Switch
                      id={cookie.id}
                      checked={cookiePreferences[cookie.id as keyof typeof cookiePreferences]}
                      onCheckedChange={() => handleToggle(cookie.id as keyof typeof cookiePreferences)}
                      disabled={cookie.always}
                    />
                  </div>
                ))}

                <Separator />

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500">
                      Vos préférences seront sauvegardées pendant 6 mois
                    </span>
                  </div>
                  <Button>
                    <Check className="h-4 w-4 mr-2" />
                    Sauvegarder
                  </Button>
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
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Cookies essentiels</h3>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li className="flex justify-between">
                        <span>session_id</span>
                        <span className="text-gray-400">Session</span>
                      </li>
                      <li className="flex justify-between">
                        <span>csrf_token</span>
                        <span className="text-gray-400">Session</span>
                      </li>
                      <li className="flex justify-between">
                        <span>cart_id</span>
                        <span className="text-gray-400">30 jours</span>
                      </li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Cookies fonctionnels</h3>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li className="flex justify-between">
                        <span>language_preference</span>
                        <span className="text-gray-400">1 an</span>
                      </li>
                      <li className="flex justify-between">
                        <span>theme</span>
                        <span className="text-gray-400">1 an</span>
                      </li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Cookies analytiques</h3>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li className="flex justify-between">
                        <span>_ga (Google Analytics)</span>
                        <span className="text-gray-400">2 ans</span>
                      </li>
                      <li className="flex justify-between">
                        <span>_gid (Google Analytics)</span>
                        <span className="text-gray-400">24h</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Informations complémentaires */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Comment gérer vos cookies ?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Vous pouvez également gérer vos cookies directement depuis les paramètres de votre navigateur :
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300">
                <li>Chrome : Paramètres → Confidentialité et sécurité</li>
                <li>Firefox : Options → Vie privée et sécurité</li>
                <li>Safari : Préférences → Confidentialité</li>
                <li>Edge : Paramètres → Cookies et autorisations</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Durée de conservation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                La durée de conservation des cookies varie selon leur type :
              </p>
              <ul className="space-y-2 mt-2">
                <li className="flex justify-between text-sm">
                  <span>Cookies de session</span>
                  <span className="font-mono">Fermeture du navigateur</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span>Cookies persistants</span>
                  <span className="font-mono">Jusqu'à 13 mois</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span>Cookiers tiers</span>
                  <span className="font-mono">Variable</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default Cookies;
