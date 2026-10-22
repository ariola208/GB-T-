import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, MapPin, Calendar, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const STATS = [
  { icon: Users, label: "Utilisateurs", value: 1234, color: "text-blue-500" },
  { icon: MapPin, label: "Destinations", value: 8, color: "text-green-500" },
  { icon: Calendar, label: "Réservations", value: 456, color: "text-purple-500" },
  { icon: TrendingUp, label: "Visites / mois", value: 12345, color: "text-orange-500" },
];

const Admin = () => {
  const [section, setSection] = useState("dashboard");

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <h1 className="font-heading text-4xl font-bold">Panneau d'administration</h1>
            <p className="text-muted-foreground">Gérez le contenu et les utilisateurs</p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <s.icon className={`h-8 w-8 ${s.color}`} />
                    <p className="mt-2 text-2xl font-bold">{s.value}</p>
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card>
              <CardHeader><CardTitle>Derniers utilisateurs</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between"><span>Jean K.</span><Badge>Admin</Badge></li>
                  <li className="flex justify-between"><span>Marie S.</span><Badge variant="outline">User</Badge></li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Dernières réservations</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between"><span>Circuit Pendjari</span><Badge>Confirmé</Badge></li>
                  <li className="flex justify-between"><span>Ganvié 2j</span><Badge variant="outline">En attente</Badge></li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Actions rapides</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link to="/destinations" className="block rounded-lg border border-border p-2 hover:bg-muted">Gérer les destinations</Link>
                  <Link to="/blog" className="block rounded-lg border border-border p-2 hover:bg-muted">Gérer le blog</Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
