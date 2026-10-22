import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User, Phone, Eye, EyeOff } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";

const API_URL = 'http://localhost:5000/api';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: ""
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const body = isLogin
        ? { email: form.email, password: form.password }
        : {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            password: form.password,
            phone: form.phone
          };

      const res = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (res.ok) {
        if (isLogin) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/profile");
        } else {
          setIsLogin(true);
          setForm({ email: "", password: "", firstName: "", lastName: "", phone: "" });
        }
      } else {
        setError(data.error || "Une erreur est survenue");
      }
    } catch (err) {
      setError("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-md">
          <Card>
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h1 className="font-heading text-2xl font-bold">
                  {isLogin ? "Connexion" : "Inscription"}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {isLogin ? "Connectez-vous à votre compte" : "Créez votre compte"}
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="Prénom"
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      required
                    />
                    <Input
                      placeholder="Nom"
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      required
                    />
                  </div>
                )}

                <Input
                  type="email"
                  placeholder="Email"
                  icon={<Mail className="w-4 h-4" />}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />

                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Mot de passe"
                    icon={<Lock className="w-4 h-4" />}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
                  </button>
                </div>

                {!isLogin && (
                  <Input
                    placeholder="Téléphone (optionnel)"
                    icon={<Phone className="w-4 h-4" />}
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                )}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Chargement..." : (isLogin ? "Se connecter" : "S'inscrire")}
                </Button>
              </form>

              <div className="text-center mt-6 pt-4 border-t">
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError("");
                  }}
                  className="text-sm text-primary hover:underline"
                >
                  {isLogin ? "Pas de compte ? S'inscrire" : "Déjà un compte ? Se connecter"}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
