import { Link } from "react-router-dom";
import {
  Leaf,
  Heart,
  Users,
  TreePine,
  Droplets,
  Recycle,
  Award,
  TrendingUp,
  Globe,
  HandHeart,
  Shield,
  Coffee
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function ImpactDurable() {
  const stats = [
    {
      icon: Users,
      value: "500+",
      label: "Artisans soutenus",
      color: "bg-blue-500"
    },
    {
      icon: TreePine,
      value: "10,000+",
      label: "Arbres plantés",
      color: "bg-green-500"
    },
    {
      icon: Recycle,
      value: "85%",
      label: "Emballages recyclés",
      color: "bg-yellow-500"
    },
    {
      icon: Heart,
      value: "50M FCFA",
      label: "Investis dans les communautés",
      color: "bg-red-500"
    }
  ];

  const initiatives = [
    {
      title: "Formation des Artisans",
      description: "Programme de formation continue pour les artisans locaux",
      impact: "250 artisans formés en 2024",
      icon: Users,
      progress: 75,
      goal: "500 artisans"
    },
    {
      title: "Reforestation",
      description: "Plantation d'arbres dans les zones déforestées",
      impact: "10 000 arbres plantés",
      icon: TreePine,
      progress: 60,
      goal: "20 000 arbres"
    },
    {
      title: "Emballages Écologiques",
      description: "Transition vers des emballages biodégradables",
      impact: "85% de nos emballages sont recyclables",
      icon: Recycle,
      progress: 85,
      goal: "100% d'emballages écologiques"
    },
    {
      title: "Éducation des Jeunes",
      description: "Bourses d'études pour les enfants d'artisans",
      impact: "50 étudiants soutenus",
      icon: GraduationCap,
      progress: 50,
      goal: "100 étudiants"
    }
  ];

  const partners = [
    { name: "UNESCO", logo: "/placeholder.svg" },
    { name: "PNUD", logo: "/placeholder.svg" },
    { name: "Ministère du Tourisme", logo: "/placeholder.svg" },
    { name: "Chambre des Métiers", logo: "/placeholder.svg" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[50vh] bg-gradient-to-r from-green-600/20 via-gbeto-gold/20 to-green-600/20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-10"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-gbeto-gold text-gbeto-gold-foreground">
              <Leaf className="h-3 w-3 mr-1" />
              Impact Durable
            </Badge>
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-foreground mb-4">
              Pour un Tourisme Responsable
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Danxomɛ s'engage pour un développement durable qui bénéficie aux communautés, 
              préserve l'environnement et valorise le patrimoine culturel béninois.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-16 bg-gbeto-surface">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className={`w-16 h-16 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
              Notre Engagement
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nous croyons en un tourisme et un commerce qui respectent les personnes, 
              la culture et l'environnement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <HandHeart className="h-12 w-12 text-gbeto-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Social</h3>
              <p className="text-muted-foreground">
                Création d'emplois et soutien aux communautés locales
              </p>
            </Card>
            <Card className="text-center p-6">
              <Globe className="h-12 w-12 text-gbeto-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Environnemental</h3>
              <p className="text-muted-foreground">
                Protection des écosystèmes et réduction de notre empreinte
              </p>
            </Card>
            <Card className="text-center p-6">
              <Award className="h-12 w-12 text-gbeto-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Culturel</h3>
              <p className="text-muted-foreground">
                Préservation et valorisation du patrimoine béninois
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Initiatives */}
      <section className="py-16 bg-gbeto-surface">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground text-center mb-12">
            Nos Initiatives
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {initiatives.map((initiative) => (
              <Card key={initiative.title} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gbeto-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <initiative.icon className="h-6 w-6 text-gbeto-gold" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">{initiative.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{initiative.description}</p>
                    <p className="text-sm font-medium text-gbeto-gold mb-2">{initiative.impact}</p>
                    <div className="flex items-center gap-4">
                      <Progress value={initiative.progress} className="flex-1" />
                      <span className="text-sm text-muted-foreground">{initiative.goal}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-playfair font-bold text-foreground mb-8">
            Ils nous soutiennent
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partners.map((partner) => (
              <div key={partner.name} className="opacity-70 hover:opacity-100 transition-opacity">
                <img src={partner.logo} alt={partner.name} className="h-16 object-contain mx-auto" />
                <p className="text-sm mt-2">{partner.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-gbeto-gold/20 via-gbeto-surface to-gbeto-gold/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
            Rejoignez notre mouvement
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            En achetant sur Danxomɛ, vous contribuez directement à ces initiatives 
            et participez au développement durable du Bénin.
          </p>
          <Button size="lg" className="bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground">
            Découvrir nos produits
          </Button>
        </div>
      </section>
    </div>
  );
}

// Import missing icon
function GraduationCap(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}
