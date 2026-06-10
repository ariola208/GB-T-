import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronDown, ChevronUp, MessageCircle, Mail, Phone, ArrowRight, HelpCircle, Calendar, Compass, Shield, CreditCard, Plane, Hotel, MapPin, Clock, Users, Globe, AlertCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

const faqCategories = [
  { id: "general", name: "Général", icon: HelpCircle, questions: [
    { q: "Quelle est la meilleure période pour visiter le Bénin ?", a: "La meilleure période s'étend de novembre à mars, pendant la saison sèche. Les températures sont agréables (25-32°C) et les routes sont praticables. C'est aussi la période idéale pour les safaris dans le Parc de la Pendjari." },
    { q: "Faut-il un visa pour entrer au Bénin ?", a: "Oui, un visa est nécessaire pour la plupart des nationalités. Vous pouvez l'obtenir en ligne via le système e-Visa (https://evisa.gouv.bj) ou à l'arrivée à l'aéroport de Cotonou. Le visa touriste coûte environ 50€ pour 30 jours." },
    { q: "Quels vaccins sont recommandés ?", a: "La vaccination contre la fièvre jaune est obligatoire. Les vaccins recommandés incluent : hépatite A et B, typhoïde, méningite, et rage. Un traitement antipaludique est fortement conseillé." },
    { q: "Quelle est la monnaie au Bénin ?", a: "La monnaie est le Franc CFA (XOF). 1€ ≈ 655 FCFA. Les cartes bancaires sont acceptées dans les grands hôtels, mais il est préférable d'avoir des espèces pour les zones rurales." },
    { q: "Quelles langues parle-t-on au Bénin ?", a: "Le français est la langue officielle. Les langues locales les plus parlées sont le fon, le yoruba, l'adja et le bariba. Dans les zones touristiques, l'anglais est également compris." },
  ]},
  { id: "reservations", name: "Réservations", icon: Calendar, questions: [
    { q: "Comment réserver un circuit avec Bénin Tourisme ?", a: "Vous pouvez réserver directement sur notre site en choisissant votre circuit et vos dates, ou nous contacter via le formulaire de contact pour un devis personnalisé. Un acompte de 30% est demandé à la réservation." },
    { q: "Puis-je modifier ou annuler ma réservation ?", a: "Oui, les modifications sont possibles selon disponibilité. Pour les annulations : plus de 60 jours avant le départ : remboursement intégral ; 30-60 jours : 50% retenu ; moins de 30 jours : non remboursable." },
    { q: "Proposez-vous des circuits pour les groupes ?", a: "Absolument ! Nous organisons des circuits pour groupes de toute taille : familles, associations, entreprises. Des tarifs dégressifs s'appliquent à partir de 6 personnes." },
    { q: "Les prix incluent-ils les vols internationaux ?", a: "Nos circuits n'incluent généralement pas les vols internationaux, sauf mention contraire. Nous pouvons cependant vous conseiller sur les meilleures options de vol." },
  ]},
  { id: "voyage", name: "Sur place", icon: Compass, questions: [
    { q: "Comment se déplacer au Bénin ?", a: "Pour les circuits organisés, nous fournissons des véhicules privés climatisés avec chauffeur-guide. Pour les voyageurs indépendants, les options incluent : taxis collectifs (zemidjans), bus, et location de voiture avec chauffeur." },
    { q: "Quels types d'hébergement proposez-vous ?", a: "Nous sélectionnons des hébergements de qualité : hôtels 3-4 étoiles à Cotonou, lodges confortables près des parcs, maisons d'hôtes authentiques, et parfois hébergement chez l'habitant." },
    { q: "La nourriture est-elle sûre ?", a: "Oui, nous sélectionnons des restaurants de confiance. Il est recommandé de boire de l'eau en bouteille, d'éviter les crudités non lavées et les glaçons." },
    { q: "Y a-t-il des connexions Internet ?", a: "La 4G est disponible dans les grandes villes. Nous fournissons une carte SIM locale avec data à tous nos voyageurs. Le WiFi est disponible dans la plupart des hôtels." },
  ]},
  { id: "securite", name: "Sécurité", icon: Shield, questions: [
    { q: "Le Bénin est-il un pays sûr ?", a: "Oui, le Bénin est considéré comme l'un des pays les plus sûrs d'Afrique de l'Ouest. Les Béninois sont réputés pour leur hospitalité. Comme partout, restez vigilant dans les zones touristiques." },
    { q: "Une assurance voyage est-elle obligatoire ?", a: "Oui, une assurance voyage incluant rapatriement sanitaire est obligatoire pour participer à nos circuits. Nous pouvons vous proposer une assurance complète lors de votre réservation." },
    { q: "Que faire en cas d'urgence ?", a: "Nous fournissons une assistance 24/7 avec un numéro d'urgence local. Notre équipe sur place peut vous aider en cas de problème. Conservez également les coordonnées de votre ambassade." },
  ]},
];

const Faq = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openQuestions, setOpenQuestions] = useState([]);

  const toggleQuestion = (q) => setOpenQuestions(prev => prev.includes(q) ? prev.filter(i => i !== q) : [...prev, q]);

  const allQuestions = faqCategories.flatMap(cat => cat.questions);
  const filteredQuestions = allQuestions.filter(item => item.q.toLowerCase().includes(searchQuery.toLowerCase()) || item.a.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-20">
        <section className="py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
          <div className="container mx-auto px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <Badge className="mb-4 bg-primary/10 text-primary">FAQ</Badge>
              <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">Foire aux questions</h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">Trouvez rapidement des réponses à vos questions sur le voyage au Bénin</p>
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input type="text" placeholder="Rechercher une question..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-6">
            {searchQuery ? (
              <div className="max-w-3xl mx-auto">
                <h2 className="font-heading text-2xl font-bold mb-6">{filteredQuestions.length} résultat(s) trouvé(s)</h2>
                <div className="space-y-4">
                  {filteredQuestions.map((item, i) => (
                    <Card key={i}><CardContent className="p-0"><button onClick={() => toggleQuestion(item.q)} className="w-full p-4 text-left flex justify-between items-center hover:bg-muted/50 transition"><span className="font-medium">{item.q}</span>{openQuestions.includes(item.q) ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}</button>{openQuestions.includes(item.q) && <div className="px-4 pb-4"><p className="text-muted-foreground">{item.a}</p></div>}</CardContent></Card>
                  ))}
                </div>
              </div>
            ) : (
              <Tabs defaultValue="general" className="max-w-4xl mx-auto">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                  {faqCategories.map(cat => (<TabsTrigger key={cat.id} value={cat.id} className="flex items-center gap-2"><cat.icon className="w-4 h-4" /><span className="hidden md:inline">{cat.name}</span></TabsTrigger>))}
                </TabsList>
                {faqCategories.map(cat => (
                  <TabsContent key={cat.id} value={cat.id} className="space-y-4 mt-6">
                    {cat.questions.map((item, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                        <Card><CardContent className="p-0"><button onClick={() => toggleQuestion(item.q)} className="w-full p-4 text-left flex justify-between items-center hover:bg-muted/50 transition"><span className="font-medium">{item.q}</span>{openQuestions.includes(item.q) ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}</button>{openQuestions.includes(item.q) && <div className="px-4 pb-4"><p className="text-muted-foreground leading-relaxed">{item.a}</p></div>}</CardContent></Card>
                      </motion.div>
                    ))}
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card><CardContent className="p-6"><Phone className="w-12 h-12 mx-auto mb-4 text-primary" /><h3 className="font-bold text-xl mb-2">Par téléphone</h3><p className="text-muted-foreground">+229 97 12 34 56</p><p className="text-sm text-muted-foreground">Lun-Ven: 8h-18h</p></CardContent></Card>
              <Card><CardContent className="p-6"><Mail className="w-12 h-12 mx-auto mb-4 text-primary" /><h3 className="font-bold text-xl mb-2">Par email</h3><p className="text-muted-foreground">contact@benin-tourisme.bj</p><p className="text-sm text-muted-foreground">Réponse sous 24h</p></CardContent></Card>
              <Card><CardContent className="p-6"><MessageCircle className="w-12 h-12 mx-auto mb-4 text-primary" /><h3 className="font-bold text-xl mb-2">WhatsApp</h3><p className="text-muted-foreground">+229 97 12 34 56</p><p className="text-sm text-muted-foreground">Discussion instantanée</p></CardContent></Card>
            </div>
          </div>
        </section>

        <section className="py-20 text-center">
          <div className="container mx-auto px-6"><HelpCircle className="w-16 h-16 mx-auto mb-6 text-primary" /><h2 className="font-heading text-4xl font-bold mb-4">Vous n'avez pas trouvé votre réponse ?</h2><p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">Notre équipe est là pour vous aider. Contactez-nous par email, téléphone ou via notre formulaire.</p><div className="flex flex-col sm:flex-row gap-4 justify-center"><Button size="lg" asChild><Link to="/contact"><Mail className="w-4 h-4 mr-2" />Nous contacter</Link></Button><Button size="lg" variant="outline" asChild><a href="tel:+22997123456"><Phone className="w-4 h-4 mr-2" />+229 97 12 34 56</a></Button></div></div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Faq;
