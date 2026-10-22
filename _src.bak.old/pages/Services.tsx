import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Plane,
  Hotel,
  Car,
  Users,
  Camera,
  Utensils,
  Shield,
  Headphones,
  Map,
  Calendar,
  CreditCard,
  ChevronRight,
  Check,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const services = [
  {
    icon: Plane,
    title: "Vols & Transport",
    description: "Réservation de vols internationaux et transport local avec chauffeurs privés.",
    features: ["Vols directs", "Transferts aéroport", "Véhicules climatisés"],
    price: "À partir de 50€",
    popular: true,
  },
  {
    icon: Hotel,
    title: "Hébergement",
    description: "Sélection d'hôtels, lodges et hébergements traditionnels de qualité.",
    features: ["Hôtels 3-5 étoiles", "Lodges écologiques", "Chez l'habitant"],
    price: "À partir de 30€/nuit",
  },
  {
    icon: Map,
    title: "Guides Locaux",
    description: "Guides francophones passionnés pour des visites authentiques.",
    features: ["Guides certifiés", "Visites personnalisées", "Toutes les régions"],
    price: "À partir de 40€/jour",
    popular: true,
  },
  {
    icon: Users,
    title: "Voyages en Groupe",
    description: "Circuits organisés pour groupes, associations et entreprises.",
    features: ["Tarifs dégressifs", "Programme sur mesure", "Accompagnateur dédié"],
    price: "Sur devis",
  },
  {
    icon: Camera,
    title: "Tours Photo",
    description: "Excursions photo avec photographes professionnels locaux.",
    features: ["Coaching photo", "Meilleurs spots", "Matériel disponible"],
    price: "À partir de 60€",
  },
  {
    icon: Utensils,
    title: "Expériences Culinaires",
    description: "Cours de cuisine, dégustations et repas chez l'habitant.",
    features: ["Cours de cuisine", "Marchés locaux", "Repas traditionnels"],
    price: "À partir de 25€",
  },
];

const packages = [
  {
    name: "Essentiel",
    price: "499€",
    duration: "5 jours",
    features: [
      "Hébergement 3*",
      "Petit-déjeuner inclus",
      "Guide local 2 jours",
      "Transferts aéroport",
      "Assurance voyage",
    ],
  },
  {
    name: "Confort",
    price: "899€",
    duration: "7 jours",
    features: [
      "Hébergement 4*",
      "Pension complète",
      "Guide privé 4 jours",
      "Transferts inclus",
      "Assurance premium",
      "Activités incluses",
    ],
    recommended: true,
  },
  {
    name: "Luxe",
    price: "1499€",
    duration: "10 jours",
    features: [
      "Hébergement 5* / Lodge",
      "Pension complète",
      "Guide privé tout le séjour",
      "Véhicule privé",
      "Assurance tous risques",
      "Toutes activités incluses",
      "Spa & Bien-être",
    ],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <PageHeader
          subtitle="Nos Services"
          title="Des prestations sur mesure"
          description="De la réservation de vols aux excursions personnalisées, nous nous occupons de tout pour vous offrir un voyage inoubliable au Bénin."
          variant="centered"
        />

        {/* Services Grid */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {services.map((service, i) => (
                <motion.div key={i} variants={fadeInUp}>
                  <Card className="relative h-full hover:shadow-lg transition-shadow">
                    {service.popular && (
                      <Badge className="absolute -top-3 left-4 bg-primary">
                        Populaire
                      </Badge>
                    )}
                    <CardHeader>
                      <div className="p-3 bg-primary/10 rounded-lg inline-block mb-4">
                        <service.icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="flex items-center justify-between">
                        {service.title}
                        <span className="text-sm font-normal text-primary">
                          {service.price}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        {service.description}
                      </p>
                      <ul className="space-y-2">
                        {service.features.map((feature, j) => (
                          <li key={j} className="flex items-center gap-2 text-sm">
                            <Check className="w-4 h-4 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button variant="link" className="mt-4 p-0" asChild>
                        <Link to="/contact" className="flex items-center gap-1">
                          Réserver
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Packages */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-4xl font-bold mb-4">
                Nos forfaits tout compris
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choisissez le forfait qui correspond le mieux à vos envies et votre budget
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {packages.map((pkg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className={`relative h-full ${pkg.recommended ? "border-primary shadow-lg" : ""}`}>
                    {pkg.recommended && (
                      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                        Recommandé
                      </Badge>
                    )}
                    <CardHeader className="text-center">
                      <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                      <div className="mt-4">
                        <span className="font-heading text-4xl font-bold">{pkg.price}</span>
                        <span className="text-muted-foreground"> / personne</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        {pkg.duration}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 mb-6">
                        {pkg.features.map((feature, j) => (
                          <li key={j} className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full" variant={pkg.recommended ? "default" : "outline"} asChild>
                        <Link to="/contact">
                          Choisir ce forfait
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Garanties */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { icon: Shield, title: "Paiement sécurisé", desc: "Transactions 100% sécurisées" },
                { icon: Headphones, title: "Support 24/7", desc: "Assistance à tout moment" },
                { icon: CreditCard, title: "Annulation flexible", desc: "Remboursement jusqu'à 30j" },
                { icon: Users, title: "Experts locaux", desc: "Équipe passionnée et certifiée" },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-bold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
