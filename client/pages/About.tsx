import { 
  Heart, 
  Users, 
  Award, 
  Globe, 
  Shield, 
  Truck,
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  Target,
  Handshake,
  Leaf,
  TrendingUp,
  ChevronRight,
  CheckCircle,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface TeamMember {
  id: number;
  name: string;
  position: string;
  description: string;
  image: string;
  expertise: string[];
  email: string;
}

interface Partner {
  id: number;
  name: string;
  type: string;
  location: string;
  specialty: string;
  since: number;
  employees: number;
  image: string;
  description: string;
}

interface Achievement {
  year: number;
  title: string;
  description: string;
  impact: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Kossivi GBÊTÔ",
    position: "Fondateur & Directeur Général",
    description: "Visionnaire passionné du patrimoine béninois, Kossivi a créé GBÊTÔ pour valoriser l'excellence artisanale et touristique du Bénin.",
    image: "/placeholder.svg",
    expertise: ["Patrimoine culturel", "Entrepreneuriat social", "Commerce équitable"],
    email: "kossivi@gbeto.bj"
  },
  {
    id: 2,
    name: "Adjowa SANTOS",
    position: "Directrice Artisanat & Culture",
    description: "Experte en arts traditionnels béninois, Adjowa supervise notre réseau d'artisans et garantit l'authenticité de nos produits.",
    image: "/placeholder.svg",
    expertise: ["Arts traditionnels", "Relations artisans", "Authentification"],
    email: "adjowa@gbeto.bj"
  },
  {
    id: 3,
    name: "Kodjo ALADIN",
    position: "Directeur Tourisme",
    description: "Guide touristique expert avec 15 ans d'expérience, Kodjo développe nos circuits et expériences culturelles immersives.",
    image: "/placeholder.svg",
    expertise: ["Tourisme culturel", "Circuits authentiques", "Hospitalité béninoise"],
    email: "kodjo@gbeto.bj"
  },
  {
    id: 4,
    name: "Fatimah YAROU",
    position: "Responsable E-commerce",
    description: "Spécialiste du commerce digital, Fatimah optimise l'expérience d'achat en ligne et gère la logistique internationale.",
    image: "/placeholder.svg",
    expertise: ["E-commerce", "Logistique", "Expérience client"],
    email: "fatimah@gbeto.bj"
  }
];

const partners: Partner[] = [
  {
    id: 1,
    name: "Coopérative Artisans d'Abomey",
    type: "Coopérative",
    location: "Abomey, Zou",
    specialty: "Sculptures et masques traditionnels",
    since: 2018,
    employees: 45,
    image: "/placeholder.svg",
    description: "Regroupement de sculpteurs et artisans perpétuant les traditions royales d'Abomey"
  },
  {
    id: 2,
    name: "Femmes Tisseuses de Savalou",
    type: "Association",
    location: "Savalou, Collines",
    specialty: "Tissage Kente et pagnes",
    since: 2019,
    employees: 67,
    image: "/placeholder.svg",
    description: "Association de femmes artisanes spécialisées dans le tissage traditionnel"
  },
  {
    id: 3,
    name: "Bronzes Royaux Porto-Novo",
    type: "Atelier familial",
    location: "Porto-Novo, Ouémé",
    specialty: "Bronzes d'art et statuettes",
    since: 2020,
    employees: 12,
    image: "/placeholder.svg",
    description: "Atelier familial spécialisé dans la reproduction des bronzes historiques"
  },
  {
    id: 4,
    name: "Guides Professionnels Bénin",
    type: "Association",
    location: "National",
    specialty: "Tourisme culturel",
    since: 2017,
    employees: 156,
    image: "/placeholder.svg",
    description: "Réseau national de guides touristiques certifiés et expérimentés"
  }
];

const achievements: Achievement[] = [
  {
    year: 2017,
    title: "Création de GBÊTÔ",
    description: "Lancement de la plateforme avec 5 artisans partenaires",
    impact: "Première vente en ligne d'artisanat béninois authentique"
  },
  {
    year: 2018,
    title: "Certification Commerce Équitable",
    description: "Obtention du label commerce équitable international",
    impact: "Garantie de rémunération juste pour 50+ artisans"
  },
  {
    year: 2019,
    title: "Expansion Tourisme",
    description: "Lancement des circuits culturels et expériences immersives",
    impact: "1000+ visiteurs accueillis la première année"
  },
  {
    year: 2020,
    title: "Prix Innovation Digitale",
    description: "Reconnaissance nationale pour l'innovation e-commerce",
    impact: "Modèle dupliqué dans 3 autres pays africains"
  },
  {
    year: 2021,
    title: "Partenariat UNESCO",
    description: "Collaboration officielle pour la préservation du patrimoine",
    impact: "Documentation de 25 techniques artisanales traditionnelles"
  },
  {
    year: 2022,
    title: "Export International",
    description: "Ouverture des marchés européens et nord-américains",
    impact: "500% d'augmentation des revenus des artisans"
  },
  {
    year: 2023,
    title: "Impact Social",
    description: "Soutien de 200 familles d'artisans et 50 guides",
    impact: "Création de 150 emplois directs et indirects"
  },
  {
    year: 2024,
    title: "Expansion Digitale",
    description: "Lancement de la nouvelle plateforme intégrée",
    impact: "Expérience utilisateur révolutionnaire"
  }
];

const values = [
  {
    icon: Heart,
    title: "Authenticité",
    description: "Nous garantissons l'origine et l'authenticité de chaque produit et expérience que nous proposons."
  },
  {
    icon: Handshake,
    title: "Commerce Équitable",
    description: "Rémunération juste des artisans et partenaires, transparence totale sur nos pratiques commerciales."
  },
  {
    icon: Leaf,
    title: "Durabilité",
    description: "Respect de l'environnement et des traditions, promotion d'un tourisme responsable."
  },
  {
    icon: Users,
    title: "Communauté",
    description: "Soutien aux communautés locales et préservation du patrimoine culturel béninois."
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Recherche constante de la qualité dans nos produits, services et relations client."
  },
  {
    icon: Globe,
    title: "Ouverture",
    description: "Partage de la richesse culturelle béninoise avec le monde entier."
  }
];

const testimonials = [
  {
    id: 1,
    name: "Marie Dubois",
    position: "Cliente VIP",
    country: "France",
    comment: "GBÊTÔ m'a fait découvrir la beauté authentique du Bénin. Chaque achat soutient directement les artisans locaux. Une approche éthique remarquable !",
    rating: 5,
    purchase: "Circuit culturel 10 jours",
    date: "Mars 2024"
  },
  {
    id: 2,
    name: "Dr. James Wilson",
    position: "Professeur d'Histoire",
    country: "États-Unis",
    comment: "La qualité historique et culturelle des expériences proposées par GBÊTÔ est exceptionnelle. Un véritable pont entre tradition et modernité.",
    rating: 5,
    purchase: "Collection bronzes royaux",
    date: "Février 2024"
  },
  {
    id: 3,
    name: "Aminata Traoré",
    position: "Entrepreneur",
    country: "Mali",
    comment: "GBÊTÔ inspire par son engagement social. Voir comment ils valorisent le patrimoine africain me donne espoir pour notre continent.",
    rating: 5,
    purchase: "Tissus Kente premium",
    date: "Janvier 2024"
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden bg-gradient-to-br from-gbeto-surface via-background to-gbeto-surface">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-20"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-gbeto-gold text-gbeto-gold-foreground">
              Notre Mission
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-foreground mb-6 leading-tight">
              Révéler l'Excellence<br />Béninoise au Monde
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
              GBÊTÔ unit tradition et innovation pour promouvoir l'artisanat, le tourisme et la culture du Bénin. Nous créons des ponts entre les artisans locaux et les amateurs d'authenticité dans le monde entier.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground">
                Notre Histoire
                <Heart className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                Rencontrer l'Équipe
                <Users className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="text-center animate-fade-in">
              <CardContent className="p-8">
                <Target className="h-12 w-12 text-gbeto-gold mx-auto mb-4" />
                <h3 className="text-xl font-playfair font-bold text-foreground mb-4">Notre Mission</h3>
                <p className="text-muted-foreground">
                  Valoriser et promouvoir l'excellence artisanale et touristique du Bénin tout en soutenant les communautés locales par un commerce équitable et durable.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center animate-fade-in" style={{animationDelay: "200ms"}}>
              <CardContent className="p-8">
                <Globe className="h-12 w-12 text-gbeto-gold mx-auto mb-4" />
                <h3 className="text-xl font-playfair font-bold text-foreground mb-4">Notre Vision</h3>
                <p className="text-muted-foreground">
                  Devenir la référence mondiale pour l'artisanat et le tourisme culturel béninois, tout en préservant et transmettant ce patrimoine unique aux générations futures.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center animate-fade-in" style={{animationDelay: "400ms"}}>
              <CardContent className="p-8">
                <TrendingUp className="h-12 w-12 text-gbeto-gold mx-auto mb-4" />
                <h3 className="text-xl font-playfair font-bold text-foreground mb-4">Notre Impact</h3>
                <p className="text-muted-foreground">
                  Plus de 200 familles d'artisans soutenues, 50+ guides touristiques partenaires, et des milliers de clients satisfaits dans le monde entier.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gbeto-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
              Nos Valeurs
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Les principes qui guident chacune de nos actions et décisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 animate-slide-up" style={{animationDelay: `${index * 150}ms`}}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gbeto-gold rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <value.icon className="h-8 w-8 text-gbeto-gold-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
              Notre Équipe
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Des experts passionnés dédiés à l'excellence et à l'authenticité béninoise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={member.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden animate-scale-in" style={{animationDelay: `${index * 200}ms`}}>
                <div className="relative">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 text-white">
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                        <Mail className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-gbeto-gold transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gbeto-gold mb-3 font-medium">{member.position}</p>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {member.description}
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-foreground">Expertises :</h4>
                    <div className="flex flex-wrap gap-1">
                      {member.expertise.map((skill, idx) => (
                        <Badge key={idx} variant="outline" className="text-2xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Network */}
      <section className="py-16 bg-gbeto-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
              Nos Partenaires
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Un réseau de confiance avec les meilleurs artisans et professionnels du Bénin
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partners.map((partner, index) => (
              <Card key={partner.id} className="group hover:shadow-xl transition-all duration-300 animate-slide-in-left" style={{animationDelay: `${index * 200}ms`}}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                  <div className="relative">
                    <img 
                      src={partner.image} 
                      alt={partner.name}
                      className="w-full h-32 md:h-full object-cover"
                    />
                    <Badge className="absolute top-2 left-2 bg-gbeto-gold text-gbeto-gold-foreground text-xs">
                      Depuis {partner.since}
                    </Badge>
                  </div>
                  
                  <div className="md:col-span-2 p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-gbeto-gold transition-colors">
                      {partner.name}
                    </h3>
                    <p className="text-sm text-gbeto-gold mb-2">{partner.type}</p>
                    
                    <div className="flex items-center text-xs text-muted-foreground mb-3">
                      <MapPin className="h-3 w-3 mr-1" />
                      {partner.location}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4">{partner.description}</p>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="font-medium text-foreground">Spécialité :</span>
                        <p className="text-muted-foreground">{partner.specialty}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-muted-foreground">
                          <Users className="h-3 w-3 mr-1" />
                          {partner.employees} personnes
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
              Notre Parcours
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              7 années d'engagement pour valoriser l'excellence béninoise
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gbeto-gold transform md:-translate-x-0.5"></div>
              
              <div className="space-y-8">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`relative flex items-start ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} animate-fade-in`} style={{animationDelay: `${index * 200}ms`}}>
                    {/* Timeline Dot */}
                    <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-gbeto-gold rounded-full transform md:-translate-x-1/2 z-10"></div>
                    
                    {/* Content */}
                    <div className={`w-full md:w-1/2 ml-12 md:ml-0 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                      <Card className="group hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-center mb-2">
                            <Badge className="bg-gbeto-gold text-gbeto-gold-foreground mr-3">
                              {achievement.year}
                            </Badge>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-gbeto-gold transition-colors">
                            {achievement.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {achievement.description}
                          </p>
                          <div className="bg-gbeto-gold/10 p-3 rounded">
                            <h4 className="text-xs font-medium text-foreground mb-1">Impact :</h4>
                            <p className="text-xs text-muted-foreground">{achievement.impact}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gbeto-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
              Ils Nous Font Confiance
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Témoignages de nos clients qui partagent notre passion pour l'authenticité
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={testimonial.id} className="animate-slide-up" style={{animationDelay: `${index * 200}ms`}}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < testimonial.rating ? 'text-gbeto-gold fill-current' : 'text-muted-foreground'}`} 
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.comment}"
                  </p>
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-gbeto-gold">{testimonial.position}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.country}</p>
                    <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                      <span>{testimonial.purchase}</span>
                      <span>{testimonial.date}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Quality */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
              Certifications & Qualité
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nos engagements qualité reconnus par les organismes internationaux
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { name: "Commerce Équitable", icon: Handshake, description: "Certification internationale", year: "2018" },
              { name: "Qualité UNESCO", icon: Award, description: "Partenaire officiel", year: "2021" },
              { name: "Tourisme Responsable", icon: Leaf, description: "Label écotourisme", year: "2020" },
              { name: "Sécurité Paiements", icon: Shield, description: "Certification SSL", year: "2017" }
            ].map((cert, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300 animate-scale-in" style={{animationDelay: `${index * 150}ms`}}>
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gbeto-gold rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <cert.icon className="h-8 w-8 text-gbeto-gold-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{cert.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{cert.description}</p>
                  <Badge variant="outline" className="text-xs">Depuis {cert.year}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Support */}
      <section className="py-16 bg-gbeto-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
                Contactez-Nous
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Notre équipe est à votre disposition pour répondre à toutes vos questions
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-gbeto-gold" />
                    Envoyez-nous un Message
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Prénom" />
                    <Input placeholder="Nom" />
                  </div>
                  <Input type="email" placeholder="Email" />
                  <Input placeholder="Sujet" />
                  <Textarea placeholder="Votre message..." rows={4} />
                  <Button className="w-full bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground">
                    Envoyer le Message
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center">
                      <Phone className="h-5 w-5 mr-2 text-gbeto-gold" />
                      Téléphone
                    </h3>
                    <div className="space-y-2 text-muted-foreground">
                      <p>+229 21 30 45 67 (Bureau principal)</p>
                      <p>+229 97 12 34 56 (Service client)</p>
                      <p>+229 96 78 90 12 (Urgences tourisme)</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center">
                      <Mail className="h-5 w-5 mr-2 text-gbeto-gold" />
                      Email
                    </h3>
                    <div className="space-y-2 text-muted-foreground">
                      <p>contact@gbeto.bj (Général)</p>
                      <p>commandes@gbeto.bj (E-commerce)</p>
                      <p>tourisme@gbeto.bj (Voyages)</p>
                      <p>support@gbeto.bj (Support technique)</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-gbeto-gold" />
                      Adresse
                    </h3>
                    <p className="text-muted-foreground">
                      Avenue Jean-Paul II<br />
                      Quartier Haie Vive<br />
                      Cotonou, République du Bénin<br />
                      BP: 12345 Cotonou
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-gbeto-gold" />
                      Horaires
                    </h3>
                    <div className="space-y-1 text-muted-foreground">
                      <p>Lundi - Vendredi : 8h00 - 17h30</p>
                      <p>Samedi : 9h00 - 15h00</p>
                      <p>Dimanche : Fermé</p>
                      <p className="text-gbeto-gold font-medium">Support 24h/7j pour urgences</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
