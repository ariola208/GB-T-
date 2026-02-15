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
  Drum,
  Hammer
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

// CORRECTION 1: Chemins corrigés pour les images (sans "public/" au début)
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
    // CORRECTION: Enlever "public/" du chemin
    image: "/placeholder.svg/Royaume du Dahomey.jpeg",
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
    // CORRECTION: Enlever "public/" du chemin
    image: "/placeholder.svg/Période Coloniale.jpeg"
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
    // CORRECTION: Enlever "public/" du chemin
    image: "/placeholder.svg/Bénin Moderne.jpeg"
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
    image: "/placeholder.svg/voodoo.jpeg",
    duration: "3 jours",
    significance: "Reconnaissance officielle du vodoun comme religion",
    activities: ["Rituels au temple des pythons", "Danse des masques Egungun", "Bénédictions collectives"]
  },
  {
    id: 2,
    name: "We Love Eya",
    date: "Décembre",
    location: "Cotnou",
    description: "Événement consacré aux musiques urbaines et à l'afrobeat, organisé à Cotonou, au Bénin, depuis 2022.",
    traditions: ["Danses", "Chants", "Artistes", "Urbain"],
    image: "/placeholder.svg/wle.jpeg",
    duration: "2 jours",
    significance: "Honorer la musique africaines",
    activities: ["Spectacles", "Ateliers", "Jeux"]
  },
  {
    id: 3,
    name: "Festival des Masques",
    date: "Août",
    location: "Porto-Novo",
    description: "Célébration traditionnelle des masques, avec une seconde édition tenue en août 2025.",
    traditions: ["Danses royales", "Récits historiques", "Artisanat traditionnel", "Gastronomie royale"],
    image: "/placeholder.svg/fm.jpeg",
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
    image: "/placeholder.svg/yam.jpeg",
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
    image: "/placeholder.svg/azin.jpeg",
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
    image: "/placeholder.svg/Afrocentric Artistry.jpeg",
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
    image: "/placeholder.svg/oui.jpeg",
    location: "Ouidah",
    unescoStatus: false,
    significance: "Lieu de mémoire de la traite négrière",
    visitable: true
  },
  {
    id: 4,
    name: "Forêt Sacrée de Kpassè",
    category: "Nature sacrée",
    description: "La forêt sacrée de Kpassè constitue un îlot forestier à Ouidah, un centre important du vaudou dans le sud du Bénin.",
    image: "/placeholder.svg/kpassè.jpeg",
    location: "Ouidah",
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

  // Nouvelle fonction pour simuler l'action d'un bouton
  const handleButtonClick = (action: string) => {
    alert(`Action déclenchée : ${action}`);
    console.log(`Bouton cliqué : ${action}`);
  };

  // CORRECTION 2: Fonction pour gérer les erreurs de chargement d'images
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
    // Ajouter un message de fallback
    const parent = target.parentElement;
    if (parent) {
      const fallback = document.createElement('div');
      fallback.className = 'w-full h-full bg-gray-200 flex items-center justify-center';
      fallback.innerHTML = '<span class="text-gray-500">Image non disponible</span>';
      parent.appendChild(fallback);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden bg-gradient-to-br from-yellow-50 via-background to-yellow-50">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-20"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-yellow-500 text-yellow-900">
              Patrimoine Culturel Béninois
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              L'Âme du Bénin<br />à Travers les Siècles
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
              Plongez dans la richesse culturelle du Bénin : des royaumes anciens aux traditions vivantes, découvrez un patrimoine exceptionnel reconnu par l'UNESCO.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-yellow-500 hover:bg-yellow-600 text-yellow-900"
                onClick={() => {
                  setSelectedTab("histoire");
                  handleButtonClick("Naviguer vers l'onglet Histoire");
                }}
              >
                Explorer l'Histoire
                <Crown className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => {
                  setSelectedTab("festivals");
                  handleButtonClick("Naviguer vers l'onglet Festivals");
                }}
              >
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
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    Histoire du Bénin
                  </h2>
                  <p className="text-muted-foreground max-w-3xl">
                    Du puissant royaume du Dahomey à la république moderne, découvrez l'évolution fascinante de cette terre d'histoire et de culture.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {historicalPeriods.map((period, index) => (
                    <Button
                      key={period.id}
                      variant={selectedPeriod === index ? "default" : "outline"}
                      onClick={() => setSelectedPeriod(index)}
                      className={selectedPeriod === index ? "bg-yellow-500 hover:bg-yellow-600 text-yellow-900" : ""}
                    >
                      {period.name}
                    </Button>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center mb-4">
                      <Crown className="h-6 w-6 text-yellow-500 mr-2" />
                      <h3 className="text-2xl font-bold text-foreground">
                        {historicalPeriods[selectedPeriod].name}
                      </h3>
                    </div>
                    <Badge className="mb-4 bg-yellow-100 text-yellow-800">
                      {historicalPeriods[selectedPeriod].period}
                    </Badge>
                    <p className="text-muted-foreground mb-6">
                      {historicalPeriods[selectedPeriod].description}
                    </p>
                    
                    <h4 className="font-semibold text-foreground mb-3">Faits marquants :</h4>
                    <ul className="space-y-2">
                      {historicalPeriods[selectedPeriod].keyFacts.map((fact, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
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
                  
                  {/* CORRECTION 3: Remplacer le div gris par une balise img */}
                  <div className="relative">
                    <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
                      <img 
                        src={historicalPeriods[selectedPeriod].image} 
                        alt={historicalPeriods[selectedPeriod].name}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                      />
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black/60 text-white p-2 rounded">
                      <span className="text-sm">{historicalPeriods[selectedPeriod].period}</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Festivals Tab */}
              <TabsContent value="festivals" className="mt-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    Festivals et Traditions
                  </h2>
                  <p className="text-muted-foreground max-w-3xl">
                    Vivez la culture béninoise à travers ses festivals colorés et ses traditions millénaires.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {festivals.map((festival) => (
                    <Card key={festival.id} className="group hover:shadow-xl transition-all duration-300">
                      <div className="relative overflow-hidden">
                        {/* CORRECTION 4: Remplacer le div gris par une balise img */}
                        <div className="w-full h-48 bg-gray-200">
                          <img 
                            src={festival.image} 
                            alt={festival.name}
                            className="w-full h-full object-cover"
                            onError={handleImageError}
                          />
                        </div>
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-yellow-500 text-yellow-900">
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
                        <h3 className="text-xl font-semibold text-foreground mb-2">
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
                                <span className="w-1 h-1 bg-yellow-500 rounded-full mr-2"></span>
                                {activity}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full bg-yellow-500 hover:bg-yellow-600 text-yellow-900"
                          onClick={() => handleButtonClick(`Programmer la visite pour le festival : ${festival.name}`)}
                        >
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
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    Patrimoine Mondial
                  </h2>
                  <p className="text-muted-foreground max-w-3xl">
                    Découvrez les sites exceptionnels du Bénin, reconnus par l'UNESCO et préservés pour les générations futures.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {culturalHeritage.map((heritage) => (
                    <Card key={heritage.id} className="group hover:shadow-xl transition-all duration-300">
                      <div className="relative overflow-hidden">
                        {/* CORRECTION 5: Remplacer le div gris par une balise img */}
                        <div className="w-full h-40 bg-gray-200">
                          <img 
                            src={heritage.image} 
                            alt={heritage.name}
                            className="w-full h-full object-cover"
                            onError={handleImageError}
                          />
                        </div>
                        {heritage.unescoStatus && (
                          <Badge className="absolute top-2 left-2 bg-yellow-500 text-yellow-900 text-xs">
                            <Award className="h-3 w-3 mr-1" />
                            UNESCO
                          </Badge>
                        )}
                        <Badge variant="secondary" className="absolute top-2 right-2 text-xs">
                          {heritage.category}
                        </Badge>
                      </div>
                      
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-foreground mb-2">
                          {heritage.name}
                        </h3>
                        <div className="flex items-center text-xs text-muted-foreground mb-2">
                          <MapPin className="h-3 w-3 mr-1" />
                          {heritage.location}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {heritage.description}
                        </p>
                        
                        <div className="mb-3">
                          <h4 className="text-xs font-medium text-foreground mb-1">Importance :</h4>
                          <p className="text-xs text-muted-foreground">
                            {heritage.significance}
                          </p>
                        </div>
                        
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="w-full"
                          disabled={!heritage.visitable}
                          onClick={() => handleButtonClick(heritage.visitable ? `Visiter : ${heritage.name}` : `En Savoir Plus : ${heritage.name}`)}
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
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    Arts et Traditions Vivantes
                  </h2>
                  <p className="text-muted-foreground max-w-3xl">
                    Explorez les expressions artistiques traditionnelles qui continuent de vibrer dans le Bénin moderne.
                  </p>
                </div>

                <div className="space-y-8">
                  {traditionalArts.map((art) => (
                    <Card key={art.id} className="overflow-hidden">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                        <div className="relative">
                          {/* CORRECTION 6: Remplacer le div gris par une balise img */}
                          <div className="w-full h-48 lg:h-full bg-gray-200">
                            <img 
                              src={art.image} 
                              alt={art.name}
                              className="w-full h-full object-cover"
                              onError={handleImageError}
                            />
                          </div>
                          <div className="absolute bottom-4 left-4">
                            <Badge className="bg-yellow-500 text-yellow-900">
                              {art.type}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="lg:col-span-2 p-6">
                          <h3 className="text-2xl font-bold text-foreground mb-3">
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
                                    <span className="w-1 h-1 bg-yellow-500 rounded-full mr-2"></span>
                                    {technique}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="flex gap-4 mt-6">
                            <Button 
                              className="bg-yellow-500 hover:bg-yellow-600 text-yellow-900"
                              onClick={() => handleButtonClick(`Voir Démonstration pour : ${art.name}`)}
                            >
                              <Play className="mr-2 h-4 w-4" />
                              Voir Démonstration
                            </Button>
                            <Button 
                              variant="outline"
                              onClick={() => handleButtonClick(`Rencontrer les Artistes pour : ${art.name}`)}
                            >
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
                  <h2 className="text-3xl font-bold text-foreground mb-4">
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
                      icon: Crown,
                      image: "/placeholder.svg"
                    },
                    {
                      title: "Atelier d'Artisanat Royal",
                      description: "Apprenez les techniques traditionnelles avec des maîtres artisans",
                      duration: "1/2 journée",
                      participants: "8 max",
                      location: "Abomey",
                      price: "25000 FCFA",
                      includes: ["Atelier pratique", "Matériaux fournis", "Œuvre à emporter", "Certificat d'apprentissage"],
                      icon: Hammer,
                      image: "/placeholder.svg"
                    },
                    {
                      title: "Immersion Musicale",
                      description: "Apprentissage des rythmes et danses traditionnelles béninoises",
                      duration: "3 heures",
                      participants: "12 max",
                      location: "Porto-Novo",
                      price: "18000 FCFA",
                      includes: ["Cours de percussion", "Danse traditionnelle", "Instruments inclus", "Spectacle final"],
                      icon: Drum,
                      image: "/placeholder.svg"
                    },
                    {
                      title: "Contes sous les Étoiles",
                      description: "Soirée de contes traditionnels avec griot professionnel",
                      duration: "2 heures",
                      participants: "20 max",
                      location: "Village traditionnel",
                      price: "12000 FCFA",
                      includes: ["Contes épiques", "Boissons traditionnelles", "Feu de camp", "Interaction groupe"],
                      icon: Book,
                      image: "/placeholder.svg"
                    },
                    {
                      title: "Cuisine Royale",
                      description: "Cours de cuisine des spécialités de la cour royale d'Abomey",
                      duration: "4 heures",
                      participants: "6 max",
                      location: "Abomey",
                      price: "30000 FCFA",
                      includes: ["Ingrédients locaux", "Recettes traditionnelles", "Repas complet", "Livre de recettes"],
                      icon: Heart,
                      image: "/placeholder.svg"
                    },
                    {
                      title: "Randonnée Culturelle",
                      description: "Trek guidé à travers les sites sacrés et villages traditionnels",
                      duration: "1 journée",
                      participants: "10 max",
                      location: "Montagnes de l'Atacora",
                      price: "40000 FCFA",
                      includes: ["Guide expert", "Transport", "Déjeuner", "Rencontres villageoises"],
                      icon: MapPin,
                      image: "/placeholder.svg"
                    }
                  ].map((experience, index) => (
                    <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                      <div className="relative overflow-hidden">
                        {/* CORRECTION 7: Remplacer le div gris par une balise img */}
                        <div className="w-full h-40 bg-gray-200">
                          <img 
                            src={experience.image} 
                            alt={experience.title}
                            className="w-full h-full object-cover"
                            onError={handleImageError}
                          />
                        </div>
                        <div className="absolute top-4 left-4">
                          <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                            <experience.icon className="h-5 w-5 text-yellow-900" />
                          </div>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-black/60 text-white border-none">
                            {experience.price}
                          </Badge>
                        </div>
                      </div>
                      
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-foreground mb-2">
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
                                <span className="w-1 h-1 bg-yellow-500 rounded-full mr-2"></span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Button 
                          className="w-full bg-yellow-500 hover:bg-yellow-600 text-yellow-900"
                          onClick={() => handleButtonClick(`Réserver l'Expérience : ${experience.title}`)}
                        >
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

      {/* Cultural Calendar - Version Améliorée */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-50">
        <div className="container mx-auto px-4">
          {/* En-tête décoratif */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-3 bg-yellow-500/10 rounded-full mb-6">
              <Calendar className="h-8 w-8 text-yellow-600" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 relative inline-block">
              Calendrier Culturel 2024
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-yellow-500 rounded-full"></div>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-6">
              Planifiez votre voyage au rythme des célébrations et traditions béninoises
            </p>
          </div>

          {/* Grille du calendrier améliorée */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  month: "Janvier", 
                  events: ["Fête du Vodoun (10 Janvier)", "Festival International du Kaba"], 
                  color: "from-amber-500 to-yellow-500",
                  icon: "🎭",
                  highlight: "Fête du Vodoun"
                },
                { 
                  month: "Février", 
                  events: ["Festival des Arts de Cotonou", "Carnaval de Porto-Novo"], 
                  color: "from-red-500 to-pink-500",
                  icon: "🎪",
                  highlight: "Carnaval"
                },
                { 
                  month: "Mars", 
                  events: ["Festival Gèlèdé", "Semaine des Cultures Urbaines"], 
                  color: "from-purple-500 to-indigo-500",
                  icon: "🎨",
                  highlight: "Festival Gèlèdé"
                },
                { 
                  month: "Avril", 
                  events: ["Fête des Traditions Orales", "Exposition d'Art Contemporain"], 
                  color: "from-green-500 to-emerald-500",
                  icon: "📖",
                  highlight: "Traditions Orales"
                },
                { 
                  month: "Mai", 
                  events: ["Fête des Mères Traditionnelle", "Festival Artisanal"], 
                  color: "from-pink-500 to-rose-500",
                  icon: "🌸",
                  highlight: "Fête des Mères"
                },
                { 
                  month: "Juin", 
                  events: ["Festival de Danse Zinli", "Journées du Patrimoine"], 
                  color: "from-blue-500 to-cyan-500",
                  icon: "💃",
                  highlight: "Danse Zinli"
                },
                { 
                  month: "Juillet", 
                  events: ["Festival de l'Indépendance", "Semaine du Cinéma Béninois"], 
                  color: "from-yellow-500 to-orange-500",
                  icon: "🎬",
                  highlight: "Indépendance"
                },
                { 
                  month: "Août", 
                  events: ["Fête des Ignames", "Festival des Masques"], 
                  color: "from-orange-500 to-red-500",
                  icon: "🌽",
                  highlight: "Fête des Ignames"
                },
                { 
                  month: "Septembre", 
                  events: ["Festival Abomey", "Rencontres Musicales"], 
                  color: "from-teal-500 to-green-500",
                  icon: "🥁",
                  highlight: "Festival Abomey"
                },
                { 
                  month: "Octobre", 
                  events: ["Semaine du Patrimoine", "Festival des Saveurs"], 
                  color: "from-amber-500 to-orange-500",
                  icon: "🍲",
                  highlight: "Patrimoine"
                },
                { 
                  month: "Novembre", 
                  events: ["Festival du Vodoun (Novembre)", "Salon du Livre"], 
                  color: "from-violet-500 to-purple-500",
                  icon: "📚",
                  highlight: "Salon du Livre"
                },
                { 
                  month: "Décembre", 
                  events: ["We Love Eya", "Célébrations de Fin d'Année"], 
                  color: "from-indigo-500 to-blue-500",
                  icon: "🎉",
                  highlight: "We Love Eya"
                }
              ].map((period, index) => (
                <Card 
                  key={index} 
                  className="group relative overflow-hidden border-2 hover:border-yellow-500 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                >
                  {/* Dégradé d'arrière-plan */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${period.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  <CardContent className="p-6">
                    {/* En-tête du mois avec icône */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${period.color} flex items-center justify-center text-2xl shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                          {period.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-foreground">{period.month}</h3>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {period.events.length} événements
                      </Badge>
                    </div>

                    {/* Liste des événements */}
                    <div className="space-y-3 mt-4">
                      {period.events.map((event, idx) => (
                        <div 
                          key={idx} 
                          className={`p-3 rounded-lg transition-all duration-300 ${
                            event.includes(period.highlight) 
                              ? 'bg-yellow-100 border-l-4 border-yellow-500' 
                              : 'bg-gray-50 hover:bg-yellow-50'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              event.includes(period.highlight) ? 'bg-yellow-500' : 'bg-gray-400'
                            }`}></div>
                            <span className={`text-sm ${
                              event.includes(period.highlight) 
                                ? 'font-semibold text-yellow-800' 
                                : 'text-muted-foreground'
                            }`}>
                              {event}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bouton d'action */}
                    <Button 
                      variant="ghost" 
                      className="w-full mt-6 group-hover:bg-yellow-500 group-hover:text-white transition-all duration-300"
                      onClick={() => handleButtonClick(`Voir détails pour ${period.month}`)}
                    >
                      Voir les détails
                      <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>

                  {/* Élément décoratif */}
                  <div className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br ${period.color} opacity-10 rounded-tl-full transform translate-x-12 translate-y-12 group-hover:translate-x-8 group-hover:translate-y-8 transition-transform duration-500`}></div>
                </Card>
              ))}
            </div>
          </div>

          {/* Section d'information supplémentaire */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-4 bg-white px-8 py-4 rounded-full shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm font-medium text-foreground">Événement majeur</span>
              </div>
              <div className="w-px h-6 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-yellow-500" />
                <span className="text-sm text-muted-foreground">Calendrier mis à jour régulièrement</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
