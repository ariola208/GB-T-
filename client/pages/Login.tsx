import { useState } from "react";
import { Link } from "react-router-dom"; // Retrait de BrowserRouter ici
import { LogIn, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner"; // Utilisation de Sonner pour les notifications

// NOTE IMPORTANTE: L'API est sur le port 3001, selon votre configuration.
const API_LOGIN_URL = 'http://localhost:3001/api/login';

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vérification basique
    if (!formData.email || !formData.password) {
        toast.error("Champs requis", {
            description: "Veuillez entrer votre email et votre mot de passe.",
        });
        return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(API_LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Enregistrement du token (à implémenter)
        // localStorage.setItem('token', data.token); 

        toast.success("Connexion réussie !", {
          description: data.message || `Bienvenue, vous êtes connecté.`,
        });

        // Simuler une redirection vers la page d'accueil ou le tableau de bord
        // history.push('/'); 
      } else {
        toast.error("Échec de la connexion", {
          description: data.error || 'Veuillez vérifier vos identifiants.',
        });
      }
    } catch (err) {
      console.error("Erreur de connexion:", err);
      toast.error("Erreur Serveur", {
        description: "Impossible de contacter le serveur. Assurez-vous que l'API Node.js est lancée sur le port 3001.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-100px)] bg-gbeto-surface p-4">
      <Card className="w-full max-w-md bg-background shadow-2xl border-gbeto-gold/50 animate-fade-in">
        <CardHeader className="text-center">
          <LogIn className="h-10 w-10 text-gbeto-gold mx-auto mb-2" />
          <CardTitle className="text-3xl font-playfair font-bold text-foreground">
            Connectez-vous à Danxomɛ
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Accédez à votre compte pour continuer votre exploration.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Champ Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Adresse Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="votre.email@exemple.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="pl-10 focus:ring-gbeto-gold focus:border-gbeto-gold transition-colors"
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            {/* Champ Mot de passe */}
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="pl-10 focus:ring-gbeto-gold focus:border-gbeto-gold transition-colors"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-right text-xs">
                <Link to="/forgot-password" className="hover:text-gbeto-gold text-muted-foreground/80 transition-colors">
                    Mot de passe oublié ?
                </Link>
              </p>
            </div>

            {/* Bouton de soumission */}
            <Button 
              type="submit" 
              className="w-full bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground transition-all duration-300 font-semibold py-3"
              disabled={isLoading}
            >
              {isLoading ? "Connexion en cours..." : "Se connecter"}
            </Button>
            
            {/* Lien vers l'inscription */}
            <div className="text-center text-sm text-muted-foreground pt-4">
              Vous n'avez pas de compte ?{" "}
              <Link to="/register" className="text-gbeto-gold hover:text-gbeto-gold/80 font-semibold transition-colors">
                S'inscrire
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
