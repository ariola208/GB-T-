import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Mail, Lock, Phone, Eye, EyeOff } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Login = () => {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({ email: "", password: "", firstName: "", lastName: "", phone: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const body = isLogin
        ? { email: form.email, password: form.password }
        : { firstName: form.firstName, lastName: form.lastName, email: form.email, password: form.password, phone: form.phone };

      const res = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
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
          setSuccess(t("login.registered"));
        }
      } else {
        // Les messages du serveur sont en français : on les affiche tels quels (voir bloc backend)
        setError(data.error || t("login.error"));
      }
    } catch {
      setError(t("login.server_error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-24">
        <div className="w-full max-w-md">
          <Card flat>
            <CardContent className="p-8">
              <div className="mb-6 text-center">
                <h1 className="font-heading text-2xl font-bold">
                  {isLogin ? t("login.title") : t("login.register_title")}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {isLogin ? t("login.subtitle") : t("login.register_subtitle")}
                </p>
              </div>

              {error && (
                <div className="mb-4 rounded-lg bg-red-500/10 p-3 text-center text-sm text-red-600">{error}</div>
              )}
              {success && (
                <div className="mb-4 rounded-lg bg-emerald-500/10 p-3 text-center text-sm text-emerald-600">{success}</div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="grid grid-cols-2 gap-3">
                    <Input placeholder={t("login.first_name")} value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })} required />
                    <Input placeholder={t("login.last_name")} value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })} required />
                  </div>
                )}

                <Input type="email" placeholder={t("login.email")} icon={<Mail className="h-4 w-4" />}
                  value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />

                <div className="relative">
                  <Input type={showPassword ? "text" : "password"} placeholder={t("login.password")}
                    icon={<Lock className="h-4 w-4" />} value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)} aria-label="toggle password">
                    {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                  </button>
                </div>

                {!isLogin && (
                  <Input placeholder={t("login.phone")} icon={<Phone className="h-4 w-4" />}
                    value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                )}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? t("login.loading") : isLogin ? t("login.submit") : t("login.register_submit")}
                </Button>
              </form>

              <div className="mt-6 border-t pt-4 text-center">
                <button
                  onClick={() => { setIsLogin(!isLogin); setError(""); setSuccess(""); }}
                  className="text-sm text-foreground underline-offset-4 hover:underline"
                >
                  {isLogin ? t("login.no_account") : t("login.has_account")}
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
