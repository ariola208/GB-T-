import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Users, Award, Heart, Globe, Shield, Star, Calendar, Clock, MapPin, Phone, Mail, Twitter, Linkedin, ArrowRight, CheckCircle, Quote, HandHeart, Target, Eye, Smile, Coffee, Briefcase, GraduationCap, Home, Leaf, Building2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

const teamImg = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200";
const officeImg = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200";
const missionImg = "https://images.unsplash.com/photo-1590080669915-3d4e68d2e20f?w=1200";

const stats = [
  { number: "15+", label: "Années d'expérience", icon: Calendar },
  { number: "50K+", label: "Voyageurs satisfaits", icon: Users },
  { number: "200+", label: "Partenaires locaux", icon: HandHeart },
  { number: "100%", label: "Satisfaction client", icon: Star },
  { number: "24/7", label: "Support client", icon: Clock },
  { number: "45+", label: "Destinations", icon: MapPin },
];

const team = [
  { name: "Amoussoukpevi Ariola", role: "Fondateur & CEO", bio: "Passionné par le Bénin depuis 20 ans, a créé Bénin Tourisme pour partager les trésors de son pays natal.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200" },
  { name: "Sophie Mènou", role: "Directrice des opérations", bio: "Experte en tourisme durable, Sophie veille à ce que chaque voyage ait un impact positif.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200" },
  { name: "Marc Hounkpè", role: "Guide en chef", bio: "Historien de formation, Marc connaît chaque recoin du Bénin.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200" },
  { name: "Amina Yacoubou", role: "Responsable culture", bio: "Anthropologue, Amina crée des expériences immersives.", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200" },
  { name: "David Zinsou", role: "Responsable logistique", bio: "David s'assure que chaque détail de votre voyage soit parfait.", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200" },
  { name: "Grace Adjovi", role: "Service client", bio: "Toujours disponible, Grace est votre contact privilégié.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200" },
];

const values = [
  { icon: Heart, title: "Passion", description: "Nous aimons profondément le Bénin et sa culture." },
  { icon: Globe, title: "Durabilité", description: "Tourisme responsable qui préserve l'environnement." },
  { icon: Shield, title: "Excellence", description: "Nous visons l'excellence dans chaque détail." },
  { icon: Users, title: "Authenticité", description: "Expériences authentiques qui vous connectent à la culture." },
];

const milestones = [
  { year: "2010", title: "Création", description: "Naissance de Bénin Tourisme" },
  { year: "2013", title: "Expansion", description: "Ouverture du bureau à Cotonou" },
  { year: "2015", title: "1er Prix", description: "Meilleur tour-opérateur local" },
  { year: "2018", title: "10K voyageurs", description: "Plus de 10 000 voyageurs" },
  { year: "2020", title: "Digitalisation", description: "Lancement de la plateforme" },
  { year: "2024", title: "50K voyageurs", description: "50 000 explorateurs" },
];

const About = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section ref={heroRef} className="relative h-[70vh] overflow-hidden">
          <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="absolute inset-0">
            <img src={teamImg} alt="Équipe" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="text-center text-white px-6">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">Notre histoire</Badge>
              <h1 className="font-heading text-6xl md:text-8xl font-bold mb-6">À propos de nous</h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90">Une équipe de passionnés qui œuvre pour vous faire découvrir le Bénin authentique depuis plus de 15 ans</p>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} className="absolute -bottom-12 left-0 right-0 z-20">
            <div className="container mx-auto px-6">
              <Card className="bg-background/95 backdrop-blur-sm shadow-xl">
                <CardContent className="p-8">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {stats.map((stat, i) => (<div key={i} className="text-center"><stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" /><p className="font-heading text-3xl font-bold">{stat.number}</p><p className="text-xs text-muted-foreground">{stat.label}</p></div>))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </section>

        <div className="h-16" />

        <section className="py-20">
          <div className="container mx-auto px-6">
            <Tabs defaultValue="mission" className="space-y-12">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
                <TabsTrigger value="mission">Mission</TabsTrigger><TabsTrigger value="vision">Vision</TabsTrigger><TabsTrigger value="values">Valeurs</TabsTrigger>
              </TabsList>
              <TabsContent value="mission">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div><Badge className="mb-4">Ce qui nous anime</Badge><h2 className="font-heading text-4xl font-bold mb-6">Faire découvrir le Bénin authentique</h2><p className="text-muted-foreground leading-relaxed mb-6">Bénin Tourisme est né d'une passion profonde pour ce pays extraordinaire. Notre mission est de créer des ponts entre les voyageurs curieux et les communautés locales, de révéler la richesse culturelle et naturelle du Bénin, et de contribuer à un tourisme durable qui profite à tous.</p><Button asChild><Link to="/destinations">Découvrir nos circuits <ArrowRight className="w-4 h-4 ml-2" /></Link></Button></div>
                  <img src={missionImg} alt="Mission" className="rounded-xl h-[400px] object-cover" />
                </div>
              </TabsContent>
              <TabsContent value="vision">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <img src="https://images.unsplash.com/photo-1547970810-dc1e93b62d48?w=1200" alt="Vision" className="rounded-xl h-[400px] object-cover order-2 lg:order-1" />
                  <div className="order-1 lg:order-2"><Badge className="mb-4">Où nous allons</Badge><h2 className="font-heading text-4xl font-bold mb-6">Devenir la référence du tourisme durable</h2><ul className="space-y-3"><li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" />Accompagner 100 000 voyageurs par an</li><li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" />Créer 500 emplois directs</li><li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" />Planter 10 000 arbres</li></ul></div>
                </div>
              </TabsContent>
              <TabsContent value="values">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {values.map((value, i) => (<Card key={i} className="text-center"><CardContent className="p-6"><div className="inline-flex p-4 bg-primary/10 rounded-full mb-4"><value.icon className="w-8 h-8 text-primary" /></div><h3 className="font-bold text-xl mb-3">{value.title}</h3><p className="text-sm text-muted-foreground">{value.description}</p></CardContent></Card>))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6 text-center mb-12"><Badge className="mb-4">Notre parcours</Badge><h2 className="font-heading text-4xl font-bold">Une histoire de passion</h2></div>
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {milestones.map((m, i) => (<Card key={i}><CardContent className="p-4 text-center"><p className="font-heading text-2xl font-bold text-primary">{m.year}</p><p className="font-bold">{m.title}</p><p className="text-xs text-muted-foreground">{m.description}</p></CardContent></Card>))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-6 text-center mb-12"><Badge className="mb-4">Notre équipe</Badge><h2 className="font-heading text-4xl font-bold mb-4">Les visages derrière Bénin Tourisme</h2><p className="text-muted-foreground max-w-2xl mx-auto">Une équipe multiculturelle unie par une même passion : vous faire aimer le Bénin</p></div>
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, i) => (<Card key={i} className="text-center hover:shadow-lg transition"><CardContent className="p-6"><Avatar className="w-24 h-24 mx-auto mb-4"><AvatarImage src={member.avatar} /><AvatarFallback>{member.name[0]}</AvatarFallback></Avatar><h3 className="font-bold text-xl">{member.name}</h3><p className="text-primary text-sm mb-3">{member.role}</p><p className="text-sm text-muted-foreground">{member.bio}</p></CardContent></Card>))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div><Badge className="mb-4">Nos bureaux</Badge><h2 className="font-heading text-4xl font-bold mb-6">Venez nous rencontrer</h2><div className="space-y-4"><div className="flex items-center gap-3"><MapPin className="w-5 h-5 text-primary" />Cotonou, Bénin</div><div className="flex items-center gap-3"><Phone className="w-5 h-5 text-primary" />+229 97 12 34 56</div><div className="flex items-center gap-3"><Mail className="w-5 h-5 text-primary" />contact@benin-tourisme.bj</div></div><Button className="mt-8" asChild><Link to="/contact">Nous contacter <ArrowRight className="w-4 h-4 ml-2" /></Link></Button></div>
              <img src={officeImg} alt="Bureau" className="rounded-xl h-64 object-cover" />
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 text-center">
          <div className="container mx-auto px-6"><HandHeart className="w-16 h-16 mx-auto mb-6 text-primary" /><h2 className="font-heading text-4xl font-bold mb-6">Prêt à vivre l'expérience Bénin Tourisme ?</h2><p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">Rejoignez les milliers de voyageurs qui nous ont fait confiance</p><Button size="lg" asChild><Link to="/destinations">Explorer les destinations <ArrowRight className="w-4 h-4 ml-2" /></Link></Button></div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
