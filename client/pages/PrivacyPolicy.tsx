import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, Mail, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: <Database className="h-6 w-6" />,
      title: "Collecte des données",
      content: "Nous collectons les informations que vous nous fournissez directement lors de la création de votre compte, de vos commandes ou de vos interactions avec notre service client. Ces informations incluent votre nom, adresse email, adresse de livraison et informations de paiement."
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Utilisation des données",
      content: "Vos données sont utilisées pour traiter vos commandes, personnaliser votre expérience, améliorer nos services et vous envoyer des communications marketing (avec votre consentement)."
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Protection des données",
      content: "Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Vos droits",
      content: "Conformément à la loi, vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données. Vous pouvez également vous opposer au traitement de vos données pour des motifs légitimes."
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
            <Shield className="h-12 w-12 text-primary" />
          </motion.div>
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Politique de Confidentialité
          </motion.h1>
          <motion.p 
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </motion.p>
        </div>

        {/* Introduction */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Chez Maroc Marketplace, nous accordons une importance capitale à la protection de vos données personnelles. 
              Cette politique de confidentialité vous informe de la manière dont nous collectons, utilisons et protégeons vos 
              informations lorsque vous utilisez notre plateforme.
            </p>
          </CardContent>
        </Card>

        {/* Sections principales */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-primary">{section.icon}</span>
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    {section.content}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Détails supplémentaires */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Informations complémentaires
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Cookies et technologies similaires</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Nous utilisons des cookies pour améliorer votre expérience de navigation, 
                analyser le trafic du site et personnaliser le contenu. Vous pouvez gérer vos 
                préférences de cookies dans les paramètres de votre navigateur.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">Transferts de données</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Vos données peuvent être transférées et traitées dans des pays autres que le vôtre. 
                Nous nous assurons que ces transferts respectent les lois applicables en matière de 
                protection des données.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contactez notre Délégué à la Protection des Données
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Pour toute question concernant cette politique ou l'utilisation de vos données personnelles, 
              vous pouvez contacter notre Délégué à la Protection des Données :
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <p className="font-medium">Email : dpo@marocmarketplace.ma</p>
              <p className="font-medium">Adresse : 123 Avenue Hassan II, Casablanca, Maroc</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;
