import React from 'react';
import { motion } from 'framer-motion';
import { Scale, FileText, AlertCircle, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

const TermsOfUse = () => {
  const sections = [
    {
      title: "1. Acceptation des conditions",
      content: "En accédant ou en utilisant la plateforme Maroc Marketplace, vous acceptez d'être lié par ces conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser nos services."
    },
    {
      title: "2. Éligibilité",
      content: "Pour utiliser nos services, vous devez avoir au moins 18 ans ou être sous la supervision d'un parent ou tuteur. Vous garantissez que toutes les informations fournies sont exactes et complètes."
    },
    {
      title: "3. Compte utilisateur",
      content: "Vous êtes responsable de maintenir la confidentialité de votre compte et de votre mot de passe. Vous acceptez de nous informer immédiatement de toute utilisation non autorisée de votre compte."
    },
    {
      title: "4. Commandes et paiements",
      content: "Toutes les commandes sont sujettes à disponibilité et à confirmation du prix. Nous nous réservons le droit d'annuler toute commande en cas de suspicion de fraude ou d'erreur de prix."
    },
    {
      title: "5. Livraison et retours",
      content: "Les délais de livraison sont donnés à titre indicatif. Notre politique de retour s'applique conformément aux conditions spécifiques détaillées dans la section FAQ."
    },
    {
      title: "6. Propriété intellectuelle",
      content: "Tout le contenu présent sur la plateforme (textes, images, logos) est protégé par les droits d'auteur et autres droits de propriété intellectuelle."
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
            <Scale className="h-12 w-12 text-primary" />
          </motion.div>
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Conditions d'Utilisation
          </motion.h1>
          <motion.p 
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </motion.p>
        </div>

        {/* Alert importante */}
        <Alert className="mb-8 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20">
          <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
          <AlertTitle className="text-yellow-600 dark:text-yellow-400">Information importante</AlertTitle>
          <AlertDescription className="text-yellow-700 dark:text-yellow-300">
            Veuillez lire attentivement ces conditions d'utilisation avant d'utiliser nos services. 
            Elles constituent un accord légal entre vous et Maroc Marketplace.
          </AlertDescription>
        </Alert>

        {/* Sections */}
        <div className="space-y-6 mb-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <FileText className="h-5 w-5 text-primary" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {section.content}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Limitations et responsabilités */}
        <Card className="mb-8 border-red-200 dark:border-red-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <XCircle className="h-5 w-5" />
              Limitations de responsabilité
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Dans toute la mesure permise par la loi, Maroc Marketplace ne sera pas responsable des dommages 
              indirects, accessoires ou consécutifs découlant de l'utilisation ou de l'impossibilité d'utiliser nos services.
            </p>
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
              <p className="text-sm text-red-700 dark:text-red-300">
                ⚠️ Notre responsabilité totale envers vous pour tous les réclamations liées à nos services 
                ne dépassera pas le montant que vous avez payé pour les produits concernés au cours des 12 derniers mois.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Modifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Modifications des conditions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300">
              Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications prennent effet 
              dès leur publication sur la plateforme. Votre utilisation continue de nos services après ces modifications 
              constitue votre acceptation des nouvelles conditions.
            </p>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default TermsOfUse;
