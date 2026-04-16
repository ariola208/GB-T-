import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Award,
  Target,
  Heart,
  Globe,
  Shield,
  Star,
  TrendingUp,
  CheckCircle,
  ChevronRight,
  Quote,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Calendar,
  Clock,
  ThumbsUp,
  Smile,
  Coffee,
  Briefcase,
  GraduationCap,
  Home,
  Leaf,
  HandHeart,
  Building2,
  Plane,
  Hotel,
  Camera,
  MessageCircle,
  ArrowRight,
  Play,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fadeInUp, staggerContainer, fadeIn, scaleIn } from "@/lib/animations";

// Images
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
  {
    name: "Koffi Agossou",
    role: "Fondateur & CEO",
    bio: "Passionné par le Bénin depuis 20 ans, Koffi a créé Bénin Tourisme pour partager les trésors de son pays natal.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Sophie Mènou",
    role: "Directrice des opérations",
    bio: "Experte en tourisme durable, Sophie veille à ce que chaque voyage ait un impact positif sur les communautés locales.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Marc Hounkpè",
    role: "Guide en chef",
    bio: "Historien de formation, Marc connaît chaque recoin du Bénin et partage ses connaissances avec passion.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Amina Yacoubou",
    role: "Responsable culture",
    bio: "Anthropologue, Amina crée des expériences immersives pour découvrir l'âme du Bénin.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "David Zinsou",
    role: "Responsable logistique",
    bio: "David s'assure que chaque détail de votre voyage soit parfait, du transport à l'hébergement.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Grace Adjovi",
    role: "Service client",
    bio: "Toujours disponible, Grace est votre contact privilégié pour toutes vos questions.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
    social: { linkedin: "#", twitter: "#" },
  },
];

const values = [
  {
    icon: Heart,
    title: "Passion",
    description: "Nous aimons profondément le Bénin et sa culture. Cette passion guide chacune de nos actions.",
  },
  {
    icon: Globe,
    title: "Durabilité",
    description: "Nous nous engageons pour un tourisme responsable qui préserve l'environnement et soutient les communautés locales.",
  },
  {
    icon: Shield,
    title: "Excellence",
    description: "Nous visons l'excellence dans chaque détail, de la conception des circuits à l'accompagnement sur place.",
  },
  {
    icon: Users,
    title: "Authenticité",
    description: "Nous créons des expériences authentiques qui vous connectent véritablement à la culture béninoise.",
  },
];

const milestones = [
  { year: "2010", title: "Création", description: "Naissance de Bénin Tourisme avec 3 passionnés" },
  { year: "2013", title: "Expansion", description: "Ouverture de notre bureau à Cotonou" },
  { year: "2015", title: "1er Prix", description: "Prix du meilleur tour-opérateur local" },
  { year: "2018", title: "10K voyageurs", description: "Plus de 10 000 voyageurs accompagnés" },
  { year: "2020", title: "Digitalisation", description: "Lancement de notre plateforme en ligne" },
  { year: "2023", title: "Certification", description: "Certification Tourisme Durable" },
  { year: "2024", title: "50K voyageurs", description: "Une communauté de 50 000 explorateurs" },
];

const partners = [
  { name: "Ministère du Tourisme", logo: "🏛️" },
  { name: "Office du Tourisme", logo: "🎯" },
  { name: "UNESCO Bénin", logo: "🏺" },
  { name: "Air France", logo: "✈️" },
  { name: "Hôtel Marina", logo: "🏨" },
  { name: "Parc Pendjari", logo: "🦁" },
];

const testimonials = [
  {
    name: "Isabelle Martin",
    role: "Voyageuse",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    content: "Bénin Tourisme a transformé mon voyage en une expérience inoubliable. Leur connaissance du terrain et leur passion font toute la différence.",
  },
  {
    name: "Jean-Marc Dupont",
    role: "Photographe",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    content: "En tant que photographe, j'ai été bluffé par la richesse des sites proposés. L'équipe connaît les meilleurs spots et les meilleures lumières.",
  },
];

const About = () => {
  const [activeTab, setActiveTab] = useState("mission");
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section ref={heroRef} className="relative h-[70vh] overflow-hidden">
          <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="absolute inset-0">
            <img
              src={teamImg}
              alt="Équipe Bénin Tourisme"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
          </motion.div>

          <div className="absolute inset-0 flex items-center justify-center z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center text-white px-6"
            >
              <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                Notre histoire
              </Badge>
              <h1 className="font-heading text-6xl md:text-8xl font-bold mb-6">
                À propos de nous
              </h1>
              <p className="font-body text-xl md:text-2xl max-w-3xl mx-auto text-white/90">
                Une équipe de passionnés qui œuvre pour vous faire découvrir 
                le Bénin authentique depuis plus de 15 ans
              </p>
            </motion.div>
          </div>

          {/* Stats Floating */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute -bottom-12 left-0 right-0 z-20"
          >
            <div className="container mx-auto px-6">
              <Card className="bg-background/95 backdrop-blur-sm shadow-xl">
                <CardContent className="p-8">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {stats.map((stat, i) => (
                      <div key={i} className="text-center">
                        <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                        <p className="font-heading text-3xl font-bold">{stat.number}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </section>

        {/* Spacer for floating stats */}
        <div className="h-16" />

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <Tabs defaultValue="mission" className="space-y-12">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
                <TabsTrigger value="mission">Notre Mission</TabsTrigger>
                <TabsTrigger value="vision">Notre Vision</TabsTrigger>
                <TabsTrigger value="values">Nos Valeurs</TabsTrigger>
              </TabsList>

              <TabsContent value="mission">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <Badge className="mb-4">Ce qui nous anime</Badge>
                    <h2 className="font-heading text-4xl font-bold mb-6">
                      Faire découvrir le Bénin authentique
                    </h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>
                        Bénin Tourisme est né d'une passion profonde pour ce pays extraordinaire 
                        et d'une conviction : le Bénin mérite d'être découvert par le monde entier.
                      </p>
                      <p>
                        Notre mission est de créer des ponts entre les voyageurs curieux et les 
                        communautés locales, de révéler la richesse culturelle et naturelle du Bénin, 
                        et de contribuer à un tourisme durable qui profite à tous.
                      </p>
                      <p>
                        Chaque itinéraire que nous créons est pensé pour offrir une immersion 
                        authentique, respectueuse des traditions et de l'environnement.
                      </p>
                    </div>
                    <div className="flex gap-4 mt-8">
                      <Button>
                        Découvrir nos circuits
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      <Button variant="outline">
                        <Play className="w-4 h-4 mr-2" />
                        Notre vidéo
                      </Button>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative h-[400px] rounded-xl overflow-hidden"
                  >
                    <img
                      src={missionImg}
                      alt="Notre mission"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>
              </TabsContent>

              <TabsContent value="vision">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="order-2 lg:order-1 relative h-[400px] rounded-xl overflow-hidden"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1547970810-dc1e93b62d48?w=1200"
                      alt="Notre vision"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="order-1 lg:order-2"
                  >
                    <Badge className="mb-4">Où nous allons</Badge>
                    <h2 className="font-heading text-4xl font-bold mb-6">
                      Devenir la référence du tourisme durable en Afrique de l'Ouest
                    </h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>
                        Notre vision est de positionner le Bénin comme une destination incontournable 
                        pour les voyageurs en quête d'authenticité et de sens.
                      </p>
                      <p>
                        D'ici 2030, nous ambitionnons de :
                      </p>
                      <ul className="space-y-2">
                        {[
                          "Accompagner 100 000 voyageurs par an",
                          "Créer 500 emplois directs dans le tourisme durable",
                          "Planter 10 000 arbres dans le cadre de notre programme environnemental",
                          "Former 1000 jeunes aux métiers du tourisme",
                        ].map((item, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </TabsContent>

              <TabsContent value="values">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className="text-center mb-12">
                    <Badge className="mb-4">Ce qui nous guide</Badge>
                    <h2 className="font-heading text-4xl font-bold mb-4">Nos valeurs fondamentales</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      Ces principes guident chacune de nos décisions et actions au quotidien
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((value, i) => (
                      <motion.div key={i} variants={fadeInUp}>
                        <Card className="h-full text-center hover:shadow-lg transition-shadow">
                          <CardContent className="p-6">
                            <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
                              <value.icon className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="font-heading text-xl font-bold mb-3">{value.title}</h3>
                            <p className="text-sm text-muted-foreground">{value.description}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="mb-4">Notre parcours</Badge>
              <h2 className="font-heading text-4xl font-bold mb-4">
                Une histoire de passion
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                De nos débuts modestes à aujourd'hui, revivez les grandes étapes de notre aventure
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border" />

              <div className="space-y-12">
                {milestones.map((milestone, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className={`flex items-center ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                  >
                    <div className="w-1/2 px-8">
                      <Card className={`${i % 2 === 0 ? "text-right" : "text-left"}`}>
                        <CardContent className="p-6">
                          <p className="font-heading text-3xl font-bold text-primary mb-2">
                            {milestone.year}
                          </p>
                          <h3 className="font-bold text-xl mb-2">{milestone.title}</h3>
                          <p className="text-muted-foreground">{milestone.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="relative z-10">
                      <div className="w-4 h-4 bg-primary rounded-full ring-4 ring-background" />
                    </div>
                    <div className="w-1/2" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="mb-4">Notre équipe</Badge>
              <h2 className="font-heading text-4xl font-bold mb-4">
                Les visages derrière Bénin Tourisme
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Une équipe multiculturelle unie par une même passion : vous faire aimer le Bénin
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all group">
                    <CardContent className="p-6 text-center">
                      <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-primary/10">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-heading text-xl font-bold mb-1">{member.name}</h3>
                      <p className="text-primary text-sm mb-3">{member.role}</p>
                      <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                      <div className="flex justify-center gap-3">
                        <a href={member.social.linkedin} className="text-muted-foreground hover:text-primary transition-colors">
                          <Linkedin className="w-4 h-4" />
                        </a>
                        <a href={member.social.twitter} className="text-muted-foreground hover:text-primary transition-colors">
                          <Twitter className="w-4 h-4" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Office Gallery */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Badge className="mb-4">Nos bureaux</Badge>
                <h2 className="font-heading text-4xl font-bold mb-6">
                  Venez nous rencontrer
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Nos bureaux sont situés au cœur de Cotonou, dans le quartier animé de Haie Vive. 
                  N'hésitez pas à passer nous voir pour discuter de votre projet de voyage autour d'un café !
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>Avenue Jean-Paul II, Immeuble Akpakpa, 3ème étage, Cotonou</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <span>+229 97 12 34 56</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <span>contact@benin-tourisme.bj</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <span>Lun - Ven : 8h - 18h / Sam : 9h - 15h</span>
                  </div>
                </div>
                <Button className="mt-8" asChild>
                  <Link to="/contact">
                    Nous contacter
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                <img
                  src={officeImg}
                  alt="Bureau Bénin Tourisme"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=600"
                  alt="Espace de travail"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600"
                  alt="Salle de réunion"
                  className="w-full h-48 object-cover rounded-lg col-span-2"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="mb-4">Ils nous font confiance</Badge>
              <h2 className="font-heading text-4xl font-bold mb-4">Nos partenaires</h2>
            </motion.div>
            <div className="flex flex-wrap justify-center items-center gap-12">
              {partners.map((partner, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl mb-2">{partner.logo}</div>
                  <p className="text-sm font-medium">{partner.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full bg-background/80 backdrop-blur-sm">
                    <CardContent className="p-8">
                      <Quote className="w-10 h-10 text-primary/30 mb-6" />
                      <p className="text-lg mb-6 italic">"{testimonial.content}"</p>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={testimonial.avatar} />
                          <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <HandHeart className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
                Prêt à vivre l'expérience Bénin Tourisme ?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Rejoignez les milliers de voyageurs qui nous ont fait confiance pour découvrir le Bénin authentique
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/destinations">
                    Explorer les destinations
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contact">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Parler à un conseiller
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
