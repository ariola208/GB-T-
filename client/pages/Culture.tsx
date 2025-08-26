import { useState } from "react";
import { 
  Crown, 
  Calendar, 
  Music, 
  Book, 
  Camera, 
  MapPin, 
  Star,
  Play,
  Clock,
  Users,
  Award,
  Globe,
  Heart,
  ChevronRight,
  Theatre,
  Scroll,
  Drum
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface HistoricalPeriod {
  id: number;
  name: string;
  period: string;
  description: string;
  keyFacts: string[];
  image: string;
  rulers?: string[];
}

interface Festival {
  id: number;
  name: string;
  date: string;
  location: string;
  description: string;
  traditions: string[];
  image: string;
  duration: string;
  significance: string;
  activities: string[];
}

interface CulturalHeritage {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  location: string;
  unescoStatus: boolean;
  significance: string;
  visitable: boolean;
}

interface TraditionalArt {
  id: number;
  name: string;
  type: string;
  description: string;
  origins: string;
  modernAdaptation: string;
  image: string;
  practitioners: string[];
  techniques: string[];
}

const historicalPeriods: HistoricalPeriod[] = [
  {
    id: 1,
    name: "Royaume du Dahomey",
    period: "1600 - 1904",
    description: "L'un des royaumes les plus puissants d'Afrique de l'Ouest, réputé pour son organisation militaire et ses Amazones.",
    keyFacts: [
      "Fondé par le roi Houegbadja vers 1600",
      "Capital à Abomey avec 12 palais royaux",
      "Célèbre pour l'armée des Amazones",
      "Pratiques du vodoun bien développées",
      "Système politique très organisé"
    ],
    image: "/placeholder.svg",
    rulers: ["Houegbadja", "Akaba", "Wegbaja", "Agadja", "Tegbesu", "Kpengla", "Agonglo", "Gezo", "Glele", "Béhanzin"]
  },
  {
    id: 2,
    name: "Période Coloniale",
    period: "1894 - 1960",
    description: "Période française marquée par la résistance, l'adaptation culturelle et la préservation des traditions.",
    keyFacts: [
      "Résistance du roi Béhanzin",
      "Introduction de l'éducation française",
      "Naissance de mouvements indépendantistes",
      "Préservation du patrimoine culturel",
      "Émergence d'une élite intellectuelle"
    ],
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Bénin Moderne",
    period: "1960 - Aujourd'hui",
    description: "Renaissance culturelle et valorisation du patrimoine béninois dans un contexte moderne.",
    keyFacts: [
      "Indépendance le 1er août 1960",
      "Révolution de 1972 et 1989",
      "Démocratisation depuis 1990",
      "Renaissance culturelle",
      "Promotion du patrimoine mondial"
    ],
    image: "/placeholder.svg"
  }
];

const festivals: Festival[] = [
  {
    id: 1,
    name: "Fête du Vodoun",
    date: "10 Janvier",
    location: "Ouidah",
    description: "Célébration de la religion vodoun, patrimoine spirituel ancestral du Bénin",
    traditions: ["Cérémonies rituelles", "Danses sacrées", "Offrandes aux divinités", "Processions religieuses"],
    image: "/placeholder.svg",
    duration: "3 jours",
    significance: "Reconnaissance officielle du vodoun comme religion",
    activities: ["Rituels au temple des pythons", "Danse des masques Egungun", "Bénédictions collectives"]
  },
  {
    id: 2,
    name: "Festival des Masques Gèlèdè",
    date: "Mars-Avril",
    location: "Pobè, Kétou",
    description: "Célébration de l'art Gèlèdè, inscrit au patrimoine UNESCO",
    traditions: ["Danses masquées", "Chants traditionnels", "Narrations épiques", "Concours artistiques"],
    image: "/placeholder.svg",
    duration: "2 semaines",
    significance: "Honorer la puissance créatrice des femmes",
    activities: ["Spectacles de masques", "Ateliers de sculpture", "Contes traditionnels"]
  },
  {
    id: 3,
    name: "Festival Abomey",
    date: "Décembre",
    location: "Abomey",
    description: "Célébration de l'héritage royal et des traditions du royaume du Dahomey",
    traditions: ["Danses royales", "Récits historiques", "Artisanat traditionnel", "Gastronomie royale"],
    image: "/placeholder.svg",
    duration: "5 jours",
    significance: "Préservation de la mémoire royale",
    activities: ["Reconstitution historique", "Exposition d'art royal", "Concours de tambours"]
  },
  {
    id: 4,
    name: "Fête des Ignames",
    date: "Août-Septembre",
    location: "Nord Bénin",
    description: "Célébration des premières récoltes et remerciement aux ancêtres",
    traditions: ["Récolte cérémonielle", "Danses agraires", "Bénédiction des terres", "Festins communautaires"],
    image: "/placeholder.svg",
    duration: "1 semaine",
    significance: "Gratitude pour les récoltes abondantes",
    activities: ["Concours d'ignames", "Danses traditionnelles", "Marchés spéciaux"]
  }
];

const culturalHeritage: CulturalHeritage[] = [
  {
    id: 1,
    name: "Palais Royaux d'Abomey",
    category: "Architecture",
    description: "Ensemble de palais des rois du Dahomey, témoins de 300 ans d'histoire",
    image: "/placeholder.svg",
    location: "Abomey",
    unescoStatus: true,
    significance: "Symbole de la puissance du royaume du Dahomey",
    visitable: true
  },
  {
    id: 2,
    name: "Art Gèlèdè",
    category: "Arts performatifs",
    description: "Tradition spectaculaire combinant masques, costumes, chants et danses",
    image: "/placeholder.svg",
    location: "Pobè, Kétou",
    unescoStatus: true,
    significance: "Expression de la sagesse et du pouvoir créateur féminin",
    visitable: true
  },
  {
    id: 3,
    name: "Route de l'Esclave",
    category: "Mémoire historique",
    description: "Vestiges du commerce triangulaire et mémorial de la traite",
    image: "/placeholder.svg",
    location: "Ouidah",
    unescoStatus: false,
    significance: "Lieu de mémoire de la traite négrière",
    visitable: true
  },
  {
    id: 4,
    name: "Forêt Sacrée d'Osun",
    category: "Nature sacrée",
    description: "Forêt sacrée dédiée à la déesse Osun, lieu de culte vodoun",
    image: "/placeholder.svg",
    location: "Zou",
    unescoStatus: false,
    significance: "Sanctuaire spirituel du vodoun",
    visitable: true
  }
];

const traditionalArts: TraditionalArt[] = [
  {
    id: 1,
    name: "Musique Vodoun",
    type: "Musique sacrée",
    description: "Musique rituelle utilisant tambours, hochets et chants pour invoquer les divinités",
    origins: "Traditions ancestrales yoruba et fon",
    modernAdaptation: "Intégration dans la world music contemporaine",
    image: "/placeholder.svg",
    practitioners: ["Prêtres vodoun", "Musiciens traditionnels", "Artistes contemporains"],
    techniques: ["Percussions polyrythmiques", "Chants responsoriales", "Invocations rituelles"]
  },
  {
    id: 2,
    name: "Contes et Épopées",
    type: "Littérature orale",
    description: "Traditions narratives transmettant sagesse, histoire et valeurs culturelles",
    origins: "Griots et conteurs traditionnels",
    modernAdaptation: "Adaptation théâtrale et cinématographique",
    image: "/placeholder.svg",
    practitioners: ["Griots", "Conteurs", "Écrivains modernes"],
    techniques: ["Narration chantée", "Gestuelles expressives", "Interaction avec l'audience"]
  },
  {
    id: 3,
    name: "Appliqués d'Abomey",
    type: "Arts visuels",
    description: "Tentures brodées racontant l'histoire des rois du Dahomey",
    origins: "Cour royale d'Abomey, 18ème siècle",
    modernAdaptation: "Art contemporain et décoration moderne",
    image: "/placeholder.svg",
    practitioners: ["Brodeurs royaux", "Artistes textiles", "Designers modernes"],
    techniques: ["Broderie sur tissu", "Appliqués colorés", "Symbolisme royal"]
  },
  {
    id: 4,
    name: "Danse Zinli",
    type: "Danse traditionnelle",
    description: "Danse acrobatique des chasseurs, démonstration de force et d'agilité",
    origins: "Communautés de chasseurs du nord",
    modernAdaptation: "Spectacles culturels et festivals",
    image: "/placeholder.svg",
    practitioners: ["Chasseurs traditionnels", "Danseurs professionnels", "Troupes culturelles"],
    techniques: ["Acrobaties aériennes", "Mimes de chasse", "Utilisation d'armes traditionnelles"]
  }
];

export default function Culture() {
  const [selectedPeriod, setSelectedPeriod] = useState(0);
  const [selectedTab, setSelectedTab] = useState("histoire");

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden bg-gradient-to-br from-gbeto-surface via-background to-gbeto-surface">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-20"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-gbeto-gold text-gbeto-gold-foreground">
              Patrimoine Culturel Béninois
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-foreground mb-6 leading-tight">
              L'Âme du Bénin<br />à Travers les Siècles
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
              Plongez dans la richesse culturelle du Bénin : des royaumes anciens aux traditions vivantes, découvrez un patrimoine exceptionnel reconnu par l'UNESCO.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground">
                Explorer l'Histoire
                <Crown className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                Festivals et Traditions
                <Calendar className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="histoire">Histoire</TabsTrigger>
                <TabsTrigger value="festivals">Festivals</TabsTrigger>
                <TabsTrigger value="patrimoine">Patrimoine</TabsTrigger>
                <TabsTrigger value="arts">Arts Traditionnels</TabsTrigger>
                <TabsTrigger value="experiences">Expériences</TabsTrigger>
              </TabsList>

              {/* Histoire Tab */}
              <TabsContent value="histoire" className="mt-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">
                    Histoire du Bénin
                  </h2>
                  <p className="text-muted-foreground max-w-3xl">
                    Du puissant royaume du Dahomey à la république moderne, découvrez l'évolution fascinante de cette terre d'histoire et de culture.
                  </p>
                </div>

                {/* Timeline Navigation */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {historicalPeriods.map((period, index) => (
                    <Button
                      key={period.id}
                      variant={selectedPeriod === index ? "default" : "outline"}
                      onClick={() => setSelectedPeriod(index)}
                      className={selectedPeriod === index ? "bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground" : ""}
                    >
                      {period.name}
                    </Button>
                  ))}
                </div>

                {/* Selected Period Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center mb-4">
                      <Crown className="h-6 w-6 text-gbeto-gold mr-2" />
                      <h3 className="text-2xl font-playfair font-bold text-foreground">
                        {historicalPeriods[selectedPeriod].name}
                      </h3>
                    </div>
                    <Badge className="mb-4 bg-gbeto-gold/20 text-gbeto-gold">
                      {historicalPeriods[selectedPeriod].period}
                    </Badge>
                    <p className="text-muted-foreground mb-6">
                      {historicalPeriods[selectedPeriod].description}
                    </p>
                    
                    <h4 className="font-semibold text-foreground mb-3">Faits marquants :</h4>
                    <ul className="space-y-2">
                      {historicalPeriods[selectedPeriod].keyFacts.map((fact, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-gbeto-gold rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          <span className="text-muted-foreground">{fact}</span>
                        </li>
                      ))}
                    </ul>

                    {historicalPeriods[selectedPeriod].rulers && (
                      <div className="mt-6">
                        <h4 className="font-semibold text-foreground mb-3">Souverains emblématiques :</h4>
                        <div className="flex flex-wrap gap-2">
                          {historicalPeriods[selectedPeriod].rulers?.slice(0, 6).map((ruler, index) => (
                            <Badge key={index} variant="outline">
                              {ruler}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="relative">
                    <img 
                      src={historicalPeriods[selectedPeriod].image} 
                      alt={historicalPeriods[selectedPeriod].name}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/60 text-white p-2 rounded">
                      <span className="text-sm">{historicalPeriods[selectedPeriod].period}</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Festivals Tab */}
              <TabsContent value="festivals" className="mt-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">
                    Festivals et Traditions
                  </h2>
                  <p className="text-muted-foreground max-w-3xl">
                    Vivez la culture béninoise à travers ses festivals colorés et ses traditions millénaires.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {festivals.map((festival, index) => (
                    <Card key={festival.id} className="group hover:shadow-xl transition-all duration-300 animate-fade-in" style={{animationDelay: `${index * 200}ms`}}>
                      <div className="relative overflow-hidden">
                        <img 
                          src={festival.image} 
                          alt={festival.name}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-gbeto-gold text-gbeto-gold-foreground">
                            {festival.date}
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Badge variant="secondary">
                            {festival.duration}
                          </Badge>
                        </div>
                      </div>
                      
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-gbeto-gold transition-colors">
                          {festival.name}
                        </h3>
                        <div className="flex items-center text-sm text-muted-foreground mb-3">
                          <MapPin className="h-4 w-4 mr-1" />
                          {festival.location}
                        </div>
                        
                        <p className="text-muted-foreground mb-4">
                          {festival.description}
                        </p>

                        <div className="mb-4">
                          <h4 className="font-medium text-foreground mb-2">Signification :</h4>
                          <p className="text-sm text-muted-foreground">{festival.significance}</p>
                        </div>

                        <div className="mb-4">
                          <h4 className="font-medium text-foreground mb-2">Activités principales :</h4>
                          <div className="space-y-1">
                            {festival.activities.slice(0, 3).map((activity, idx) => (
                              <div key={idx} className="flex items-center text-sm text-muted-foreground">
                                <span className="w-1 h-1 bg-gbeto-gold rounded-full mr-2"></span>
                                {activity}
                              </div>
                            ))}
                          </div>
                        </div>

                        <Button className="w-full bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground">
                          Programmer ma Visite
                          <Calendar className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Patrimoine Tab */}
              <TabsContent value="patrimoine" className="mt-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">
                    Patrimoine Mondial
                  </h2>
                  <p className="text-muted-foreground max-w-3xl">
                    Découvrez les sites exceptionnels du Bénin, reconnus par l'UNESCO et préservés pour les générations futures.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {culturalHeritage.map((heritage, index) => (
                    <Card key={heritage.id} className="group hover:shadow-xl transition-all duration-300 animate-slide-up" style={{animationDelay: `${index * 150}ms`}}>
                      <div className="relative overflow-hidden">
                        <img 
                          src={heritage.image} 
                          alt={heritage.name}
                          className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {heritage.unescoStatus && (
                          <Badge className="absolute top-2 left-2 bg-gbeto-gold text-gbeto-gold-foreground text-xs">
                            <Award className="h-3 w-3 mr-1" />
                            UNESCO
                          </Badge>
                        )}
                        <Badge variant="secondary" className="absolute top-2 right-2 text-xs">
                          {heritage.category}
                        </Badge>
                      </div>
                      
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-foreground mb-2 group-hover:text-gbeto-gold transition-colors">
                          {heritage.name}
                        </h3>
                        <div className="flex items-center text-xs text-muted-foreground mb-2">
                          <MapPin className="h-3 w-3 mr-1" />
                          {heritage.location}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                          {heritage.description}
                        </p>
                        
                        <div className="mb-3">
                          <h4 className="text-xs font-medium text-foreground mb-1">Importance :</h4>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {heritage.significance}
                          </p>
                        </div>

                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="w-full group-hover:bg-gbeto-gold group-hover:text-gbeto-gold-foreground group-hover:border-gbeto-gold transition-colors"
                          disabled={!heritage.visitable}
                        >
                          {heritage.visitable ? "Visiter" : "En Savoir Plus"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Arts Traditionnels Tab */}
              <TabsContent value="arts" className="mt-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">
                    Arts et Traditions Vivantes
                  </h2>
                  <p className="text-muted-foreground max-w-3xl">
                    Explorez les expressions artistiques traditionnelles qui continuent de vibrer dans le Bénin moderne.
                  </p>
                </div>

                <div className="space-y-8">
                  {traditionalArts.map((art, index) => (
                    <Card key={art.id} className="overflow-hidden animate-slide-in-left" style={{animationDelay: `${index * 200}ms`}}>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                        <div className="relative">
                          <img 
                            src={art.image} 
                            alt={art.name}
                            className="w-full h-48 lg:h-full object-cover"
                          />
                          <div className="absolute bottom-4 left-4">
                            <Badge className="bg-gbeto-gold text-gbeto-gold-foreground">
                              {art.type}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="lg:col-span-2 p-6">
                          <h3 className="text-2xl font-playfair font-bold text-foreground mb-3">
                            {art.name}
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            {art.description}
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold text-foreground mb-2">Origines :</h4>
                              <p className="text-sm text-muted-foreground mb-4">{art.origins}</p>
                              
                              <h4 className="font-semibold text-foreground mb-2">Adaptation moderne :</h4>
                              <p className="text-sm text-muted-foreground">{art.modernAdaptation}</p>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-foreground mb-2">Praticiens :</h4>
                              <div className="flex flex-wrap gap-1 mb-4">
                                {art.practitioners.map((practitioner, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {practitioner}
                                  </Badge>
                                ))}
                              </div>
                              
                              <h4 className="font-semibold text-foreground mb-2">Techniques :</h4>
                              <ul className="space-y-1">
                                {art.techniques.map((technique, idx) => (
                                  <li key={idx} className="flex items-center text-sm text-muted-foreground">
                                    <span className="w-1 h-1 bg-gbeto-gold rounded-full mr-2"></span>
                                    {technique}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="flex gap-4 mt-6">
                            <Button className="bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground">
                              <Play className="mr-2 h-4 w-4" />
                              Voir Démonstration
                            </Button>
                            <Button variant="outline">
                              <Users className="mr-2 h-4 w-4" />
                              Rencontrer les Artistes
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Expériences Tab */}
              <TabsContent value="experiences" className="mt-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">
                    Expériences Culturelles Immersives
                  </h2>
                  <p className="text-muted-foreground max-w-3xl">
                    Vivez la culture béninoise de l'intérieur grâce à nos expériences authentiques et enrichissantes.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      title: "Initiation au Vodoun",
                      description: "Découverte respectueuse des pratiques spirituelles traditionnelles",
                      duration: "1 journée",
                      participants: "6 max",
                      location: "Ouidah",
                      price: "35000 FCFA",
                      includes: ["Cérémonie d'accueil", "Visite des temples", "Rencontre avec un prêtre", "Bénédiction traditionnelle"],
                      image: "/placeholder.svg",
                      icon: Crown
                    },
                    {
                      title: "Atelier d'Artisanat Royal",
                      description: "Apprenez les techniques traditionnelles avec des maîtres artisans",
                      duration: "1/2 journée",
                      participants: "8 max",
                      location: "Abomey",
                      price: "25000 FCFA",
                      includes: ["Atelier pratique", "Matériaux fournis", "Œuvre à emporter", "Certificat d'apprentissage"],
                      image: "/placeholder.svg",
                      icon: Hammer
                    },
                    {
                      title: "Immersion Musicale",
                      description: "Apprentissage des rythmes et danses traditionnelles béninoises",
                      duration: "3 heures",
                      participants: "12 max",
                      location: "Porto-Novo",
                      price: "18000 FCFA",
                      includes: ["Cours de percussion", "Danse traditionnelle", "Instruments inclus", "Spectacle final"],
                      image: "/placeholder.svg",
                      icon: Drum
                    },
                    {
                      title: "Contes sous les Étoiles",
                      description: "Soirée de contes traditionnels avec griot professionnel",
                      duration: "2 heures",
                      participants: "20 max",
                      location: "Village traditionnel",
                      price: "12000 FCFA",
                      includes: ["Contes épiques", "Boissons traditionnelles", "Feu de camp", "Interaction groupe"],
                      image: "/placeholder.svg",
                      icon: Book
                    },
                    {
                      title: "Cuisine Royale",
                      description: "Cours de cuisine des spécialités de la cour royale d'Abomey",
                      duration: "4 heures",
                      participants: "6 max",
                      location: "Abomey",
                      price: "30000 FCFA",
                      includes: ["Ingrédients locaux", "Recettes traditionnelles", "Repas complet", "Livre de recettes"],
                      image: "/placeholder.svg",
                      icon: Heart
                    },
                    {
                      title: "Randonnée Culturelle",
                      description: "Trek guidé à travers les sites sacrés et villages traditionnels",
                      duration: "1 journée",
                      participants: "10 max",
                      location: "Montagnes de l'Atacora",
                      price: "40000 FCFA",
                      includes: ["Guide expert", "Transport", "Déjeuner", "Rencontres villageoises"],
                      image: "/placeholder.svg",
                      icon: MapPin
                    }
                  ].map((experience, index) => (
                    <Card key={index} className="group hover:shadow-xl transition-all duration-300 animate-scale-in" style={{animationDelay: `${index * 150}ms`}}>
                      <div className="relative overflow-hidden">
                        <img 
                          src={experience.image} 
                          alt={experience.title}
                          className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <div className="w-10 h-10 bg-gbeto-gold rounded-full flex items-center justify-center">
                            <experience.icon className="h-5 w-5 text-gbeto-gold-foreground" />
                          </div>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-black/60 text-white border-none">
                            {experience.price}
                          </Badge>
                        </div>
                      </div>
                      
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-gbeto-gold transition-colors">
                          {experience.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {experience.description}
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                          <div className="flex items-center text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            {experience.duration}
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <Users className="h-3 w-3 mr-1" />
                            {experience.participants}
                          </div>
                          <div className="flex items-center text-muted-foreground col-span-2">
                            <MapPin className="h-3 w-3 mr-1" />
                            {experience.location}
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="text-xs font-medium text-foreground mb-2">Inclus :</h4>
                          <ul className="space-y-1">
                            {experience.includes.slice(0, 3).map((item, idx) => (
                              <li key={idx} className="flex items-center text-xs text-muted-foreground">
                                <span className="w-1 h-1 bg-gbeto-gold rounded-full mr-2"></span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Button className="w-full bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground">
                          Réserver l'Expérience
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Cultural Calendar */}
      <section className="py-16 bg-gbeto-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
              Calendrier Culturel 2024
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ne manquez aucun événement culturel majeur du Bénin
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { month: "Janvier", events: ["Fête du Vodoun (10)", "Festival Kaba (25)"] },
                { month: "Mars", events: ["Festival Gèlèdè", "Semaine Culturelle"] },
                { month: "Mai", events: ["Fête des Mères", "Festival Artisanal"] },
                { month: "Août", events: ["Indépendance (1)", "Fête des Ignames"] },
                { month: "Octobre", events: ["Festival Abomey", "Semaine du Patrimoine"] },
                { month: "Décembre", events: ["Festival des Arts", "Célébrations Royales"] }
              ].map((period, index) => (
                <Card key={index} className="text-center animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-3">{period.month}</h3>
                    <div className="space-y-2">
                      {period.events.map((event, idx) => (
                        <div key={idx} className="text-sm text-muted-foreground p-2 bg-gbeto-gold/10 rounded">
                          {event}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
