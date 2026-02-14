import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, HelpCircle, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    {
      id: 'general',
      name: 'Général',
      icon: '🏠',
      questions: [
        {
          question: 'Qu\'est-ce que Maroc Marketplace ?',
          answer: 'Maroc Marketplace est une plateforme de e-commerce dédiée à l\'artisanat, au tourisme et à la culture marocaine. Nous connectons les artisans locaux, les prestataires touristiques et les passionnés de culture avec des clients du monde entier.'
        },
        {
          question: 'Comment puis-je créer un compte ?',
          answer: 'Pour créer un compte, cliquez sur le bouton "S\'inscrire" en haut à droite de la page. Remplissez le formulaire avec vos informations personnelles et validez votre email. Une fois inscrit, vous pourrez passer des commandes et gérer vos achats.'
        },
        {
          question: 'Est-ce que la plateforme est sécurisée ?',
          answer: 'Oui, la plateforme utilise le cryptage SSL pour toutes les transactions et respecte les normes de sécurité les plus strictes. Vos informations personnelles et bancaires sont protégées.'
        }
      ]
    },
    {
      id: 'commandes',
      name: 'Commandes & Livraison',
      icon: '📦',
      questions: [
        {
          question: 'Quels sont les délais de livraison ?',
          answer: 'Les délais de livraison varient selon votre localisation : 2-3 jours ouvrables au Maroc, 5-7 jours pour l\'Europe, et 7-10 jours pour le reste du monde. Les articles artisanaux peuvent nécessiter un délai supplémentaire de fabrication.'
        },
        {
          question: 'Comment suivre ma commande ?',
          answer: 'Une fois votre commande expédiée, vous recevrez un email avec un numéro de suivi. Vous pouvez également suivre vos commandes depuis votre tableau de bord dans la section "Mes commandes".'
        },
        {
          question: 'Puis-je modifier ma commande après validation ?',
          answer: 'Vous pouvez modifier votre commande dans l\'heure suivant sa validation en contactant notre service client. Passé ce délai, la commande entre en préparation et ne peut plus être modifiée.'
        }
      ]
    },
    {
      id: 'paiements',
      name: 'Paiements',
      icon: '💳',
      questions: [
        {
          question: 'Quels moyens de paiement acceptez-vous ?',
          answer: 'Nous acceptons les cartes bancaires (Visa, MasterCard, American Express), PayPal, et le paiement à la livraison pour certaines zones au Maroc.'
        },
        {
          question: 'Les paiements sont-ils sécurisés ?',
          answer: 'Oui, tous les paiements sont traités via des prestataires de paiement certifiés PCI-DSS. Nous ne stockons aucune information bancaire sur nos serveurs.'
        },
        {
          question: 'Puis-je payer en plusieurs fois ?',
          answer: 'Pour le moment, nous ne proposons pas de paiement en plusieurs fois. Cette option sera disponible prochainement.'
        }
      ]
    },
    {
      id: 'retours',
      name: 'Retours & Remboursements',
      icon: '🔄',
      questions: [
        {
          question: 'Quelle est votre politique de retour ?',
          answer: 'Vous disposez de 14 jours après réception pour retourner un article non utilisé dans son emballage d\'origine. Les frais de retour sont à votre charge sauf en cas de produit défectueux.'
        },
        {
          question: 'Comment demander un remboursement ?',
          answer: 'Connectez-vous à votre compte, allez dans "Mes commandes", sélectionnez l\'article concerné et cliquez sur "Demander un retour". Suivez les instructions pour générer votre bon de retour.'
        },
        {
          question: 'Quand serai-je remboursé ?',
          answer: 'Le remboursement est effectué dans un délai de 5 à 10 jours ouvrés après réception et vérification de votre retour. Le délai peut varier selon votre moyen de paiement.'
        }
      ]
    }
  ];

  const filteredFaqs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Foire Aux Questions
          </motion.h1>
          <motion.p 
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Trouvez rapidement des réponses à vos questions
          </motion.p>
        </div>

        {/* Barre de recherche */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Rechercher une question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-6 text-lg"
            />
          </div>
        </div>

        {/* Catégories FAQ */}
        <Tabs defaultValue="general" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
            {faqCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-sm md:text-base">
                <span className="mr-2">{category.icon}</span>
                <span className="hidden md:inline">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {faqCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">{category.icon}</span>
                    {category.name}
                  </CardTitle>
                  <CardDescription>
                    {category.questions.length} question(s) dans cette catégorie
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.questions.map((item, idx) => {
                    const globalIndex = faqCategories
                      .findIndex(c => c.id === category.id) * 100 + idx;
                    
                    return (
                      <motion.div
                        key={idx}
                        initial={false}
                        className="border rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() => toggleItem(globalIndex)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <span className="font-medium text-gray-900 dark:text-white">
                            {item.question}
                          </span>
                          <ChevronDown
                            className={`h-5 w-5 text-gray-500 transition-transform ${
                              openItems.includes(globalIndex) ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {openItems.includes(globalIndex) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="px-6 pb-4 text-gray-600 dark:text-gray-300"
                            >
                              {item.answer}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Section contact */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <HelpCircle className="h-6 w-6 text-primary" />
                Vous n'avez pas trouvé votre réponse ?
              </CardTitle>
              <CardDescription>
                Notre équipe est là pour vous aider
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Nous contacter par email
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Chat en direct
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default FAQ;
