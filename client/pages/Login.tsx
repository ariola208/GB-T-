import { useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Mail, Lock, LogIn, AlertCircle } from "lucide-react";

// Validation constants
const EMAIL_REGEX = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
const PASSWORD_MIN_LENGTH = 6;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const validateForm = useCallback((): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!EMAIL_REGEX.test(email)) {
      newErrors.email = "Format d'email invalide";
    }

    if (!password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (password.length < PASSWORD_MIN_LENGTH) {
      newErrors.password = `Le mot de passe doit contenir au moins ${PASSWORD_MIN_LENGTH} caractères`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [email, password]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: "Connexion réussie",
          description: "Bienvenue sur D anxomɛ !",
        });
        navigate("/");
      } else {
        toast({
          title: "Erreur de connexion",
          description: "Email ou mot de passe incorrect",
          variant: "destructive",
        });
        setErrors({ password: "Email ou mot de passe incorrect" });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la connexion",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [email, password, login, navigate, validateForm]);

  const handleForgotPassword = useCallback(() => {
    toast({
      title: "Réinitialisation du mot de passe",
      description: "Un email de réinitialisation vous sera envoyé prochainement",
    });
  }, []);

  const clearError = useCallback((field: 'email' | 'password') => {
    setErrors(prev => ({ ...prev, [field]: undefined }));
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">
            {t('auth.login.title') || 'Connexion'}
          </CardTitle>
          <CardDescription className="text-center">
            {t('auth.login.subtitle') || 'Connectez-vous à votre compte'}
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit} noValidate>
          <CardContent className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">
                {t('auth.login.email') || 'Email'}
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="exemple@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearError('email');
                  }}
                  className={`pl-10 ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                  disabled={isLoading}
                  autoComplete="email"
                  autoFocus
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">
                {t('auth.login.password') || 'Mot de passe'}
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    clearError('password');
                  }}
                  className={`pl-10 ${errors.password ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                  disabled={isLoading}
                  autoComplete="current-password"
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Forgot Password Link */}
            <Button
              type="button"
              variant="link"
              className="px-0 text-sm font-normal"
              onClick={handleForgotPassword}
              disabled={isLoading}
            >
              {t('auth.login.forgotPassword') || 'Mot de passe oublié ?'}
            </Button>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              <LogIn className="mr-2 h-4 w-4" />
              {isLoading ? "Connexion en cours..." : (t('button.login') || 'Se connecter')}
            </Button>
            
            <p className="text-sm text-muted-foreground text-center">
              {t('auth.login.noAccount') || "Pas encore de compte ?"}{" "}
              <Link 
                to="/register" 
                className="text-primary hover:underline font-medium"
              >
                {t('auth.login.registerLink') || "Créer un compte"}
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
