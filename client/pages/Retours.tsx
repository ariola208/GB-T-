import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  RefreshCw, 
  Clock, 
  Shield, 
  CreditCard, 
  Package, 
  CheckCircle, 
  XCircle,
  HelpCircle,
  Download,
  Mail
} from "lucide-react";

const Retours = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("policy");

  const returnSteps = [
    {
      icon: Package,
      title: "1. Préparez votre colis",
      description: "Emballez les articles dans leur emballage d'origine avec l'étiquette de retour"
    },
    {
      icon: Download,
      title: "2. Imprimez l'étiquette",
      description: "Téléchargez et imprimez votre étiquette de retour depuis votre compte"
    },
    {
      icon: Package,
      title: "3. Déposez le colis",
      description: "Déposez votre colis dans un point relais ou bureau de poste"
    },
    {
      icon: CheckCircle,
      title: "4. Confirmation",
      description: "Vous recevrez une confirmation par email dès réception de votre colis"
    }
  ];

  const faqItems = [
    {
      question: "Quel est le délai pour effectuer un retour ?",
      answer: "Vous disposez de 30 jours à compter de la réception de votre commande pour effectuer un retour."
    },
    {
      question: "Les frais de retour sont-ils gratuits ?",
      answer: "Pour la France métropolitaine, les retours sont gratuits. Pour l'international, des frais peuvent s'appliquer."
    },
    {
      question: "Comment obtenir une étiquette de retour ?",
      answer: "Connectez-vous à votre compte, allez dans 'Mes commandes' et cliquez sur 'Demander un retour'."
    },
    {
      question: "Puis-je échanger un article ?",
      answer: "Oui, vous pouvez demander un échange. Sélectionnez l'option 'Échange' lors de votre demande de retour."
    },
    {
      question: "Quand serai-je remboursé ?",
      answer: "Le remboursement est effectué sous 5-7 jours ouvrés après réception et vérification de votre colis."
    },
    {
      question: "Les articles soldés sont-ils remboursables ?",
      answer: "Oui, les articles soldés sont remboursables dans les mêmes conditions que les articles plein prix."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* En-tête */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <RefreshCw className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-4">{t("retours.title")}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {t("retours.subtitle")}
        </p>
      </div>

      {/* Navigation des onglets */}
      <div className="flex justify-center gap-4 mb-8">
        <Button
          variant={activeTab === "policy" ? "default" : "outline"}
          onClick={() => setActiveTab("policy")}
        >
          Politique de retour
        </Button>
        <Button
          variant={activeTab === "howto" ? "default" : "outline"}
          onClick={() => setActiveTab("howto")}
        >
          Comment retourner ?
        </Button>
        <Button
          variant={activeTab === "faq" ? "default" : "outline"}
          onClick={() => setActiveTab("faq")}
        >
          FAQ
        </Button>
      </div>

      {/* Contenu des onglets */}
      {activeTab === "policy" && (
        <div className="space-y-8">
          {/* Conditions générales */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Clock className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Délai de rétractation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold mb-2">30 jours</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Pour retourner vos articles à compter de la réception
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-primary mb-2" />
                <CardTitle>État des articles</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Les articles doivent être retournés dans leur état d'origine, non portés, non lavés, avec leurs étiquettes
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CreditCard className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Remboursement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Remboursement sous 5-7 jours ouvrés après réception du colis, sur le moyen de paiement initial
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Exceptions */}
          <Alert>
            <HelpCircle className="h-4 w-4" />
            <AlertTitle>Articles non retournables</AlertTitle>
            <AlertDescription>
              Certains articles ne peuvent pas être retournés pour des raisons d'hygiène ou de sécurité :
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Articles de beauté et cosmétiques ouverts</li>
                <li>Sous-vêtements et maillots de bain (sans emballage d'origine)</li>
                <li>Articles personnalisés ou sur mesure</li>
                <li>Produits alimentaires</li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>
      )}

      {activeTab === "howto" && (
        <div className="space-y-8">
          {/* Étapes du retour */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {returnSteps.map((step, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Bouton de retour */}
          <div className="text-center">
            <Button size="lg" className="gap-2">
              <Download className="h-5 w-5" />
              Demander un retour
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              Connectez-vous à votre compte pour initier un retour
            </p>
          </div>
        </div>
      )}

      {activeTab === "faq" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center mb-8">Questions fréquentes sur les retours</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {faqItems.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-start gap-2">
                    <HelpCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    {item.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Contact support */}
      <div className="mt-16 text-center p-8 bg-muted/30 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Besoin d'aide ?</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Notre équipe est là pour vous aider avec vos retours
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" asChild>
            <a href="/contact">
              <Mail className="h-4 w-4 mr-2" />
              Nous contacter
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/faq">
              <HelpCircle className="h-4 w-4 mr-2" />
              FAQ générale
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Retours;
