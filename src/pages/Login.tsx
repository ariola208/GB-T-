import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, User, Phone, ArrowRight, AlertCircle, CheckCircle2, Sparkles, ShieldCheck } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { PasswordInput, scorePassword } from "../components/ui/password-input";
import { CustomPhoneInput } from "../components/ui/phone-input";
import Logo from "../components/Logo";
import { api, ApiError } from "@/lib/api";

type Mode = "login" | "register";
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state ?? {}) as { from?: string };
  const redirectTo = state.from || "/profile";

  const [mode, setMode] = useState<Mode>("login");
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    email: "", password: "", confirmPassword: "", firstName: "", lastName: "", phone: "", remember: true,
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (touched.email && !emailRe.test(form.email.trim())) e.email = t("login.errors.email", "Email invalide");
    if (mode === "register") {
      if (touched.firstName && form.firstName.trim().length < 2) e.firstName = t("login.errors.firstName", "Prénom requis");
      if (touched.lastName && form.lastName.trim().length < 1) e.lastName = t("login.errors.lastName", "Nom requis");
    }
    if (touched.password) {
      if (form.password.length < 8) e.password = t("login.errors.password_short", "8 caractères minimum");
      else if (mode === "register" && scorePassword(form.password).score < 2) e.password = t("login.errors.password_weak", "Trop faible");
    }
    if (mode === "register" && touched.confirmPassword && form.confirmPassword !== form.password)
      e.confirmPassword = t("login.errors.confirm", "Ne correspondent pas");
    return e;
  }, [form, mode, touched, t]);

  const isValid = useMemo(() => {
    if (!emailRe.test(form.email.trim()) || form.password.length < 8) return false;
    if (mode === "register") {
      if (form.firstName.trim().length < 2 || form.lastName.trim().length < 1) return false;
      if (form.password !== form.confirmPassword || scorePassword(form.password).score < 2) return false;
    }
    return true;
  }, [form, mode]);

  useEffect(() => {
    if (localStorage.getItem("token")) navigate(redirectTo, { replace: true });
  }, [navigate, redirectTo]);

  useEffect(() => { setGlobalError(""); setSuccess(""); setTouched({}); }, [mode]);

  const setField = (k: keyof typeof form, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));
  const markTouched = (k: string) => setTouched((t) => ({ ...t, [k]: true }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true, firstName: true, lastName: true, confirmPassword: true });
    setGlobalError(""); setSuccess("");
    if (!isValid) return;

    setLoading(true);
    try {
      if (mode === "login") {
        const res = await api.post<{ token: string; user: any }>("/auth/login", {
          email: form.email.trim().toLowerCase(), password: form.password,
        });
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        navigate(redirectTo, { replace: true });
      } else {
        await api.post("/auth/register", {
          firstName: form.firstName.trim(), lastName: form.lastName.trim(),
          email: form.email.trim().toLowerCase(), password: form.password, phone: form.phone.trim() || undefined,
        });
        setSuccess(t("login.registered", "Compte créé !"));
        try {
          const res = await api.post<{ token: string; user: any }>("/auth/login", {
            email: form.email.trim().toLowerCase(), password: form.password,
          });
          localStorage.setItem("token", res.token);
          localStorage.setItem("user", JSON.stringify(res.user));
          navigate(redirectTo, { replace: true });
        } catch { setMode("login"); }
      }
    } catch (err) {
      setGlobalError(err instanceof ApiError ? err.message : t("login.server_error", "Erreur serveur"));
    } finally { setLoading(false); }
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -left-1/4 -top-1/4 h-[150%] w-[150%] bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.1),transparent_50%)]"
        />
      </div>

      <Navbar />
      
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          className="w-full max-w-md"
        >
          <div className="overflow-hidden rounded-[2rem] border border-white/20 bg-background/60 p-8 shadow-2xl backdrop-blur-2xl dark:bg-black/40">
            
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-foreground text-background shadow-lg">
                <Logo className="h-8 text-background" />
              </div>
              <h1 className="font-heading text-3xl font-bold">
                {mode === "login" ? t("login.title") : t("login.register_title")}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {mode === "login" ? t("login.subtitle") : t("login.register_subtitle")}
              </p>
            </div>

            <div className="mb-8 flex rounded-full bg-muted p-1">
              {(["login", "register"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex-1 rounded-full py-2.5 text-sm font-semibold transition-all ${
                    mode === m ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {m === "login" ? t("login.title") : t("login.register_title")}
                </button>
              ))}
            </div>

            {globalError && (
              <div className="mb-6 flex items-start gap-2 rounded-xl bg-destructive/10 p-3 text-sm text-destructive">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{globalError}</span>
              </div>
            )}
            {success && (
              <div className="mb-6 flex items-start gap-2 rounded-xl bg-emerald-500/10 p-3 text-sm text-emerald-600">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={submit} className="space-y-4" noValidate>
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, x: mode === "login" ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: mode === "login" ? 20 : -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {mode === "register" && (
                    <div className="grid grid-cols-2 gap-3">
                      <Input id="firstName" label={t("login.first_name")} value={form.firstName} onChange={(e) => setField("firstName", e.target.value)} onBlur={() => markTouched("firstName")} error={touched.firstName ? errors.firstName : undefined} autoComplete="given-name" required />
                      <Input id="lastName" label={t("login.last_name")} value={form.lastName} onChange={(e) => setField("lastName", e.target.value)} onBlur={() => markTouched("lastName")} error={touched.lastName ? errors.lastName : undefined} autoComplete="family-name" required />
                    </div>
                  )}
                  
                  <Input id="email" type="email" label={t("login.email")} icon={<Mail className="h-4 w-4" />} value={form.email} onChange={(e) => setField("email", e.target.value)} onBlur={() => markTouched("email")} error={touched.email ? errors.email : undefined} autoComplete="email" required />
                  
                  <PasswordInput id="password" label={t("login.password")} value={form.password} onChange={(e) => setField("password", e.target.value)} onBlur={() => markTouched("password")} error={touched.password ? errors.password : undefined} showStrength={mode === "register"} autoComplete={mode === "login" ? "current-password" : "new-password"} required />
                  
                  {mode === "register" && (
                    <>
                      <PasswordInput id="confirmPassword" label={t("login.confirm_password", "Confirmer le mot de passe")} value={form.confirmPassword} onChange={(e) => setField("confirmPassword", e.target.value)} onBlur={() => markTouched("confirmPassword")} error={touched.confirmPassword ? errors.confirmPassword : undefined} autoComplete="new-password" required />
                      <CustomPhoneInput 
                        label={t("login.phone")} 
                        value={form.phone} 
                        onChange={(val) => setField("phone", val || "")} 
                      />
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              {mode === "login" && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex cursor-pointer items-center gap-2 text-muted-foreground">
                    <input type="checkbox" checked={form.remember} onChange={(e) => setField("remember", e.target.checked)} className="h-4 w-4 rounded border-border" />
                    {t("login.remember", "Se souvenir")}
                  </label>
                  <button type="button" className="text-foreground hover:underline" onClick={() => setSuccess(t("login.forgot_hint", "Bientôt disponible."))}>
                    {t("login.forgot", "Mot de passe oublié ?")}
                  </button>
                </div>
              )}

              <Button type="submit" size="lg" className="mt-2 w-full rounded-xl" loading={loading} disabled={loading || (Object.keys(touched).length > 0 && !isValid)}>
                {loading ? t("login.loading") : mode === "login" ? t("login.submit") : t("login.register_submit")}
                {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>

              <div className="flex items-center justify-center gap-2 pt-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5" />
                {t("login.secure_hint", "Vos données sont sécurisées.")}
              </div>
            </form>

            {import.meta.env.DEV && (
              <button
                type="button"
                onClick={() => { setMode("login"); setForm((f) => ({ ...f, email: "admin@legbah.bj", password: "AdminSecure!2025" })); setTouched({}); }}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border py-2 text-xs text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              >
                <Sparkles className="h-3.5 w-3.5" />
                {t("login.fill_demo", "Identifiants démo")}
              </button>
            )}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
