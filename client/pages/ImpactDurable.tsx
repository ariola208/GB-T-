import { Link } from "react-router-dom";
import { useMemo, useCallback } from "react";
import {
  Leaf, Heart, Users, TreePine, Droplets, Recycle, Award,
  TrendingUp, Globe, HandHeart, Shield, Coffee, GraduationCap,
  ArrowRight, CheckCircle, Target, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Types
interface Stat {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  color: string;
  description?: string;
}

interface Initiative {
  title: string;
  description: string;
  impact: string;
  icon: React.ComponentType<{ className?: string }>;
  progress: number;
  goal: string;
  category: 'social' | 'environmental' | 'economic';
}

interface Commitment {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

// Constants
const STATS: Stat[] = [
  {
    icon: Users,
    value: "500+",
    label: "Artisans soutenus",
    color: "bg-blue-500",
    description: "Artisans locaux accompagnés"
  },
  {
    icon: TreePine,
    value: "10,000+",
    label: "Arbres plantés",
    color: "bg-green-500",
    description: "Dans les zones déforestées"
  },
  {
    icon: Recycle,
    value: "85%",
    label: "Emballages recyclés",
    color: "bg-yellow-500",
    description: "Objectif 100% en 2025"
  },
  {
    icon: Heart,
    value: "50M FCFA",
    label: "Investis dans les communautés",
    color: "bg-red-500",
    description: "Projets communautaires"
  }
];

const COMMITMENTS: Commitment[] = [
  {
    title: "Social",
    description: "Création d'emplois et soutien aux communautés locales",
    icon: HandHeart,
    color: "text-pink-500"
  },
  {
    title: "Environnemental",
    description: "Protection des écosystèmes et réduction de notre empreinte",
    icon: Globe,
    color: "text-green-500"
  },
  {
    title: "Culturel",
    description: "Préservation et valorisation du patrimoine béninois",
    icon: Award,
    color: "text-purple-500"
  }
];

const INITIATIVES: Initiative[] = [
  {
    title: "Formation des Artisans",
    description: "Programme de formation continue pour les artisans locaux",
    impact: "250 artisans formés en 2024",
    icon: Users,
    progress: 75,
    goal: "500 artisans",
    category: "social"
  },
  {
    title: "Reforestation",
    description: "Plantation d'arbres dans les zones déforestées",
    impact: "10 000 arbres plantés",
    icon: TreePine,
    progress: 60,
    goal: "20 000 arbres",
    category: "environmental"
  },
  {
    title: "Emballages Écologiques",
    description: "Transition vers des emballages biodégradables",
    impact: "85% de nos emballages sont recyclables",
    icon: Recycle,
    progress: 85,
    goal: "100% d'emballages écologiques",
    category: "environmental"
  },
  {
    title: "Éducation des Jeunes",
    description: "Bourses d'études pour les enfants d'artisans",
    impact: "50 étudiants soutenus",
    icon: GraduationCap,
    progress: 50,
    goal: "100 étudiants",
    category: "social"
  }
];

const PARTNERS = [
  { name: "UNESCO", logo: "/placeholder.svg", description: "Patrimoine culturel" },
  { name: "PNUD", logo: "/placeholder.svg", description: "Développement durable" },
  { name: "Ministère du Tourisme", logo: "/placeholder.svg", description: "Partenariat public" },
  { name: "Chambre des Métiers", logo: "/placeholder.svg", description: "Artisanat local" }
];

const IMPACT_METRICS = [
  { value: "95%", label: "Satisfaction clients", icon: Heart },
  { value: "200+", label: "Emplois créés", icon: Users },
  { value: "50+", label: "Communautés impactées", icon: Globe },
  { value: "30%", label: "Réduction CO2", icon: Leaf }
];

const ImpactDurable: React.FC = () => {
  const handleExploreProducts = useCallback(() => {
    // Navigate to products page with sustainability filter
    window.location.href = '/shop?filter=sustainable';
  }, []);

  const averageProgress = useMemo(() => {
    const total = INITIATIVES.reduce((sum, init) => sum + init.progress, 0);
    return Math.round(total / INITIATIVES.length);
  }, []);

  const completedInitiatives = useMemo(() => {
    return INITIATIVES.filter(init => init.progress >= 100).length;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection stats={STATS} />

      {/* Impact Metrics Banner */}
      <ImpactMetrics metrics={IMPACT_METRICS} />

      {/* Our Commitment */}
      <CommitmentSection commitments={COMMITMENTS} />

      {/* Initiatives */}
      <InitiativesSection 
        initiatives={INITIATIVES} 
        averageProgress={averageProgress}
        completedCount={completedInitiatives}
      />

      {/* Partners */}
      <PartnersSection partners={PARTNERS} />

      {/* CTA */}
      <CallToAction onExplore={handleExploreProducts} />
    </div>
  );
};

// Hero Section Component
const HeroSection: React.FC = () => {
  return (
    <div className="relative min-h-[60vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 via-primary/20 to-green-900/30" />
      <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-10" />
      
      <div className="relative container mx-auto px-4 py-16">
        <div className="max-w-3xl">
          <Badge className="mb-4 bg-gbeto-gold text-gbeto-gold-foreground animate-fade-in">
            <Leaf className="h-3 w-3 mr-1" />
            Impact Durable
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-foreground mb-6 leading-tight animate-slide-up">
            Pour un Tourisme
            <span className="text-gbeto-gold block">Responsable</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed animate-slide-up animation-delay-200">
            Danxomɛ s'engage pour un développement durable qui bénéficie aux communautés, 
            préserve l'environnement et valorise le patrimoine culturel béninois.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up animation-delay-300">
            <Button size="lg" className="bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground" asChild>
              <Link to="/shop">
                Découvrir nos produits
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/about/impact">
                En savoir plus
                <Leaf className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Stats Section Component
interface StatsSectionProps {
  stats: Stat[];
}

const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  return (
    <section className="py-16 bg-gradient-to-br from-gbeto-surface to-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface StatCardProps {
  stat: Stat;
  index: number;
}

const StatCard: React.FC<StatCardProps> = ({ stat, index }) => {
  const Icon = stat.icon;
  
  return (
    <div 
      className="text-center group animate-slide-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={`w-16 h-16 ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="h-8 w-8 text-white" />
      </div>
      <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">{stat.value}</div>
      <div className="text-sm text-muted-foreground">{stat.label}</div>
      {stat.description && (
        <div className="text-xs text-muted-foreground/70 mt-1">{stat.description}</div>
      )}
    </div>
  );
};

// Impact Metrics Component
interface ImpactMetricsProps {
  metrics: Array<{ value: string; label: string; icon: React.ComponentType<{ className?: string }> }>;
}

const ImpactMetrics: React.FC<ImpactMetricsProps> = ({ metrics }) => {
  return (
    <section className="py-12 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={metric.label} className="text-center animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="flex items-center justify-center mb-3">
                  <Icon className="h-8 w-8 text-gbeto-gold" />
                </div>
                <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Commitment Section Component
interface CommitmentSectionProps {
  commitments: Commitment[];
}

const CommitmentSection: React.FC<CommitmentSectionProps> = ({ commitments }) => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gbeto-gold/10 text-gbeto-gold">
            <Target className="h-3 w-3 mr-1" />
            Notre Vision
          </Badge>
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
            Notre Engagement
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nous croyons en un tourisme et un commerce qui respectent les personnes, 
            la culture et l'environnement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {commitments.map((commitment, index) => {
            const Icon = commitment.icon;
            return (
              <Card 
                key={commitment.title} 
                className="text-center p-6 hover:shadow-xl transition-all duration-300 group animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`${commitment.color} mb-4 flex justify-center`}>
                  <Icon className="h-14 w-14 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{commitment.title}</h3>
                <p className="text-muted-foreground">{commitment.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Initiatives Section Component
interface InitiativesSectionProps {
  initiatives: Initiative[];
  averageProgress: number;
  completedCount: number;
}

const InitiativesSection: React.FC<InitiativesSectionProps> = ({ 
  initiatives, 
  averageProgress, 
  completedCount 
}) => {
  return (
    <section className="py-20 bg-gbeto-surface">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gbeto-gold/10 text-gbeto-gold">
            <Sparkles className="h-3 w-3 mr-1" />
            Actions Concrètes
          </Badge>
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
            Nos Initiatives
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Des actions concrètes pour un impact positif et durable
          </p>
          
          <div className="flex justify-center gap-8 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gbeto-gold">{averageProgress}%</div>
              <div className="text-sm text-muted-foreground">Progression moyenne</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gbeto-gold">{completedCount}/{initiatives.length}</div>
              <div className="text-sm text-muted-foreground">Initiatives en cours</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {initiatives.map((initiative, index) => (
            <InitiativeCard key={initiative.title} initiative={initiative} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface InitiativeCardProps {
  initiative: Initiative;
  index: number;
}

const InitiativeCard: React.FC<InitiativeCardProps> = ({ initiative, index }) => {
  const Icon = initiative.icon;
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'social': return 'bg-pink-100 dark:bg-pink-900/30 text-pink-600';
      case 'environmental': return 'bg-green-100 dark:bg-green-900/30 text-green-600';
      case 'economic': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600';
      default: return 'bg-gray-100 dark:bg-gray-800 text-gray-600';
    }
  };

  return (
    <Card 
      className="p-6 hover:shadow-xl transition-all duration-300 group animate-slide-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getCategoryColor(initiative.category)} group-hover:scale-110 transition-transform`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-1 group-hover:text-gbeto-gold transition-colors">
            {initiative.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">{initiative.description}</p>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <p className="text-sm font-medium text-gbeto-gold">{initiative.impact}</p>
          </div>
          <div className="flex items-center gap-4">
            <Progress value={initiative.progress} className="flex-1 h-2" />
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              {initiative.goal}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Partners Section Component
interface PartnersSectionProps {
  partners: Array<{ name: string; logo: string; description: string }>;
}

const PartnersSection: React.FC<PartnersSectionProps> = ({ partners }) => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 text-center">
        <Badge className="mb-4 bg-gbeto-gold/10 text-gbeto-gold">
          <Users className="h-3 w-3 mr-1" />
          Nos Partenaires
        </Badge>
        <h2 className="text-2xl md:text-3xl font-playfair font-bold text-foreground mb-12">
          Ils nous soutiennent
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {partners.map((partner) => (
            <div 
              key={partner.name} 
              className="group p-4 rounded-xl hover:bg-muted/50 transition-all duration-300"
            >
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="h-16 object-contain mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" 
              />
              <p className="text-sm font-medium">{partner.name}</p>
              <p className="text-xs text-muted-foreground">{partner.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Call to Action Component
interface CallToActionProps {
  onExplore: () => void;
}

const CallToAction: React.FC<CallToActionProps> = ({ onExplore }) => {
  return (
    <section className="py-20 bg-gradient-to-r from-gbeto-gold/20 via-background to-gbeto-gold/20">
      <div className="container mx-auto px-4 text-center">
        <Leaf className="h-12 w-12 text-gbeto-gold mx-auto mb-6 animate-pulse" />
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
          Rejoignez notre mouvement
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          En achetant sur Danxomɛ, vous contribuez directement à ces initiatives 
          et participez au développement durable du Bénin.
        </p>
        <Button 
          size="lg" 
          className="bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground group"
          onClick={onExplore}
        >
          Découvrir nos produits
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </section>
  );
};

export default ImpactDurable;
