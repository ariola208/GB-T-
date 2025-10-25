import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const API_REGISTER_URL = 'http://localhost:3001/api/register';

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isArtisan: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };
  
  const handleArtisanChange = (checked: boolean) => {
      setFormData((prev) => ({ ...prev, isArtisan: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
        body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            isArtisan: formData.isArtisan,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(t('registration_success'), {
          description: data.message || `${t('welcome')} ${formData.name}. Vous pouvez maintenant vous connecter.`,
        });
        setFormData({ name: '', email: '', password: '', isArtisan: false });
        
        // Redirection vers la page de connexion
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        toast.error("Échec de l'inscription", {
          description: data.error || 'Erreur inconnue lors de l\'inscription.',
        });
      }
    } catch (err) {
      console.error("Erreur d'enregistrement:", err);
      toast.error(t('server_error'), {
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
            {t('register.title')}
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            {t('register.subtitle')}
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Champ Nom complet */}
            <div className="space-y-2">
              <Label htmlFor="name">{t('register.name')}</Label>
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
              <Label htmlFor="email">{t('register.email')}</Label>
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
              <Label htmlFor="password">{t('register.password')}</Label>
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
                {t('register.artisan')} <Crown className="ml-2 h-4 w-4 text-gbeto-gold" />
              </Label>
            </div>

            {/* Bouton de soumission */}
            <Button 
              type="submit" 
              className="w-full bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground transition-all duration-300 font-semibold py-3"
              disabled={isLoading}
            >
              {isLoading ? t('register.loading') : t('register.submit')}
            </Button>
            
            {/* Lien vers la connexion */}
            <div className="text-center text-sm text-muted-foreground">
              {t('register.has_account')}{" "}
              <Link to="/login" className="text-gbeto-gold hover:text-gbeto-gold/80 font-semibold transition-colors">
                {t('login')}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
