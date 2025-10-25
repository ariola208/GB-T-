import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner"; // Utilisation de Sonner pour les notifications

// NOTE IMPORTANTE: L'API est sur le port 3001, selon votre code.
const API_REGISTER_URL = 'http://localhost:3001/api/register';

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isArtisan: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };
  
  // Gestionnaire pour la checkbox
  const handleArtisanChange = (checked: boolean) => {
      setFormData((prev) => ({ ...prev, isArtisan: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vérification basique des champs
    if (!formData.email || formData.password.length < 6) {
        toast.error("Veuillez vérifier les champs", {
            description: "L'email est requis et le mot de passe doit contenir au moins 6 caractères.",
        });
        return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(API_REGISTER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Envoi de toutes les données du formulaire, y compris isArtisan (si le backend le gère)
        body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            isArtisan: formData.isArtisan,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Inscription réussie !", {
          description: data.message || `Bienvenue ${formData.name}. Vous pouvez maintenant vous connecter.`,
        });
        // Réinitialiser le formulaire
        setFormData({ name: '', email: '', password: '', isArtisan: false });
        // Envisager une redirection ici vers /login
      } else {
        toast.error("Échec de l'inscription", {
          description: data.error || 'Erreur inconnue lors de l\'inscription.',
        });
      }
    } catch (err) {
      console.error("Erreur d'enregistrement:", err);
      toast.error("Erreur Serveur", {
        description: "Impossible de contacter le serveur. Assurez-vous que l'API Node.js est lancée sur le port 3001.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-100px)] bg-gbeto-surface p-4">
      <Card className="w-full max-w-lg bg-background shadow-2xl border-gbeto-gold/50 animate-fade-in">
        <CardHeader className="text-center">
          <UserPlus className="h-10 w-10 text-gbeto-gold mx-auto mb-2" />
          <CardTitle className="text-3xl font-playfair font-bold text-foreground">
            Créer un compte Danxomɛ
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Rejoignez notre communauté d'acheteurs passionnés ou d'artisans.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Champ Nom complet */}
            <div className="space-y-2">
              <Label htmlFor="name">Nom Complet (Optionnel)</Label>
              <div className="relative">
                <Input
                  id="name"
                  type="text"
                  placeholder="Ex: Kofi Adjaho"
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-10 focus:ring-gbeto-gold focus:border-gbeto-gold transition-colors"
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            {/* Champ Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Adresse Email *</Label>
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
              <Label htmlFor="password">Mot de passe *</Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="Minimum 6 caractères"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="pl-10 focus:ring-gbeto-gold focus:border-gbeto-gold transition-colors"
                  minLength={6}
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            
            {/* Option Artisan */}
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="isArtisan"
                checked={formData.isArtisan}
                onCheckedChange={handleArtisanChange}
                className="data-[state=checked]:bg-gbeto-gold data-[state=checked]:border-gbeto-gold border-gray-400"
              />
              <Label htmlFor="isArtisan" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center">
                Je suis un Artisan/Partenaire (accès au tableau de bord vendeur) <Crown className="ml-2 h-4 w-4 text-gbeto-gold" />
              </Label>
            </div>

            {/* Bouton de soumission */}
            <Button 
              type="submit" 
              className="w-full bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground transition-all duration-300 font-semibold py-3"
              disabled={isLoading}
            >
              {isLoading ? "Inscription en cours..." : "S'inscrire"}
            </Button>
            
            {/* Lien vers la connexion */}
            <div className="text-center text-sm text-muted-foreground">
              Vous avez déjà un compte ?{" "}
              <Link to="/login" className="text-gbeto-gold hover:text-gbeto-gold/80 font-semibold transition-colors">
                Se connecter
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
