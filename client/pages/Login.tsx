import { useState } from "react";
import { Link } from "react-router-dom";
import { LogIn, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const API_LOGIN_URL = 'http://localhost:3001/api/login';

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
        toast.error(t('required_fields'), {
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
        // Stocker le token et les informations utilisateur
        localStorage.setItem('token', data.token);
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }

        toast.success(t('connection_success'), {
          description: data.message || `${t('welcome')}, vous êtes connecté.`,
        });

        // Redirection après un court délai
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      } else {
        toast.error("Échec de la connexion", {
          description: data.error || 'Veuillez vérifier vos identifiants.',
        });
      }
    } catch (err) {
      console.error("Erreur de connexion:", err);
      toast.error(t('server_error'), {
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
            {t('login.title')}
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            {t('login.subtitle')}
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Champ Email */}
            <div className="space-y-2">
              <Label htmlFor="email">{t('login.email')}</Label>
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
              <Label htmlFor="password">{t('login.password')}</Label>
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
                  {t('login.forgot_password')}
                </Link>
              </p>
            </div>

            {/* Bouton de soumission */}
            <Button 
              type="submit" 
              className="w-full bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground transition-all duration-300 font-semibold py-3"
              disabled={isLoading}
            >
              {isLoading ? t('login.loading') : t('login.submit')}
            </Button>
            
            {/* Lien vers l'inscription */}
            <div className="text-center text-sm text-muted-foreground pt-4">
              {t('login.no_account')}{" "}
              <Link to="/register" className="text-gbeto-gold hover:text-gbeto-gold/80 font-semibold transition-colors">
                {t('register')}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
