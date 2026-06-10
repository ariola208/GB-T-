import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Star, MapPin, Calendar, Users, Award, Shield, Heart } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const destinations = [
  { id: 1, name: "Ganvié", image: "https://images.unsplash.com/photo-1590080669915-3d4e68d2e20f?w=600", region: "Atlantique", description: "La Venise de l'Afrique" },
  { id: 2, name: "Parc Pendjari", image: "https://images.unsplash.com/photo-1547970810-dc1e93b62d48?w=600", region: "Atacora", description: "Safari inoubliable" },
  { id: 3, name: "Ouidah", image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600", region: "Atlantique", description: "Cœur du vodoun" },
  { id: 4, name: "Abomey", image: "https://images.unsplash.com/photo-1589308078059-be3c3044eccc?w=600", region: "Zou", description: "Palais royaux" },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative h-[80vh] bg-gradient-to-br from-primary/20 via-primary/10 to-background flex items-center justify-center">
          <div className="container mx-auto px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-4">Bienvenue au Bénin</Badge>
              <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6">Découvrez l'Afrique de l'Ouest</h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">Entre culture, nature et traditions, vivez une expérience unique au Bénin</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild><Link to="/destinations">Explorer les destinations <ArrowRight className="w-4 h-4 ml-2" /></Link></Button>
                <Button size="lg" variant="outline" asChild><Link to="/contact">Contactez-nous</Link></Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Destinations */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Destinations populaires</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Découvrez les lieux incontournables du Bénin</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {destinations.map((dest, i) => (
                <motion.div key={dest.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition">
                    <div className="relative h-48 overflow-hidden">
                      <img src={dest.image} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                        <div className="p-4 text-white">
                          <h3 className="font-bold text-lg">{dest.name}</h3>
                          <p className="text-sm opacity-90">{dest.region}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Button variant="outline" asChild><Link to="/destinations">Voir toutes les destinations <ArrowRight className="w-4 h-4 ml-2" /></Link></Button>
            </div>
          </div>
        </section>

        {/* Avantages */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Pourquoi voyager avec nous ?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Des services de qualité pour un voyage inoubliable</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center"><div className="inline-flex p-3 bg-primary/10 rounded-full mb-4"><Users className="w-6 h-6 text-primary" /></div><h3 className="font-bold text-xl mb-2">Experts locaux</h3><p className="text-muted-foreground">Des guides passionnés qui connaissent chaque recoin</p></div>
              <div className="text-center"><div className="inline-flex p-3 bg-primary/10 rounded-full mb-4"><Shield className="w-6 h-6 text-primary" /></div><h3 className="font-bold text-xl mb-2">Voyage sécurisé</h3><p className="text-muted-foreground">Assistance 24/7 et partenaires de confiance</p></div>
              <div className="text-center"><div className="inline-flex p-3 bg-primary/10 rounded-full mb-4"><Heart className="w-6 h-6 text-primary" /></div><h3 className="font-bold text-xl mb-2">Sur mesure</h3><p className="text-muted-foreground">Des itinéraires personnalisés selon vos envies</p></div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container mx-auto px-6 text-center">
            <div className="bg-primary rounded-2xl p-12 text-white">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Prêt pour l'aventure ?</h2>
              <p className="text-lg mb-8 opacity-90">Contactez-nous pour planifier votre voyage</p>
              <Button size="lg" variant="secondary" asChild><Link to="/contact">Demander un devis <ArrowRight className="w-4 h-4 ml-2" /></Link></Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
