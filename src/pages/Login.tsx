import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Mail, Lock, Phone, Eye, EyeOff, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import Logo from "../components/Logo";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Login = () => {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
  });
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
        : {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            password: form.password,
            phone: form.phone,
          };

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
        setError(data.error || t("login.error"));
      }
    } catch {
      setError(t("login.server_error"));
    } finally {
      setLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ backgroundSize: "300% 300%" }}
        />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" />
      </div>

      <Navbar />
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <div className="relative rounded-3xl border border-white/20 bg-white/10 p-8 shadow-dramatic backdrop-blur-2xl dark:border-white/10 dark:bg-black/20">
            <div className="mb-6 text-center">
              <Logo className="mx-auto mb-4 h-10 text-foreground" />
              <h1 className="font-heading text-2xl font-bold text-foreground">
                {isLogin ? t("login.title") : t("login.register_title")}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {isLogin ? t("login.subtitle") : t("login.register_subtitle")}
              </p>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 rounded-lg bg-red-500/10 p-3 text-center text-sm text-red-600"
                >
                  {error}
                </motion.div>
              )}
              {success && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 rounded-lg bg-emerald-500/10 p-3 text-center text-sm text-emerald-600"
                >
                  {success}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.form
                key={isLogin ? "login" : "register"}
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {!isLogin && (
                  <>
                    <Input
                      placeholder={t("login.first_name")}
                      icon={<User className="h-4 w-4" />}
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      required
                      className="border-white/30 bg-transparent placeholder:text-muted-foreground/50"
                    />
                    <Input
                      placeholder={t("login.last_name")}
                      icon={<User className="h-4 w-4" />}
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      required
                      className="border-white/30 bg-transparent placeholder:text-muted-foreground/50"
                    />
                  </>
                )}

                <Input
                  type="email"
                  placeholder={t("login.email")}
                  icon={<Mail className="h-4 w-4" />}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="border-white/30 bg-transparent placeholder:text-muted-foreground/50"
                />

                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder={t("login.password")}
                    icon={<Lock className="h-4 w-4" />}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                    className="border-white/30 bg-transparent placeholder:text-muted-foreground/50"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="toggle password"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>

                {!isLogin && (
                  <Input
                    placeholder={t("login.phone")}
                    icon={<Phone className="h-4 w-4" />}
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="border-white/30 bg-transparent placeholder:text-muted-foreground/50"
                  />
                )}

                <Button
                  type="submit"
                  className="w-full bg-foreground text-background hover:bg-foreground/90"
                  disabled={loading}
                >
                  {loading
                    ? t("login.loading")
                    : isLogin
                    ? t("login.submit")
                    : t("login.register_submit")}
                </Button>
              </motion.form>
            </AnimatePresence>

            <div className="mt-6 border-t border-white/20 pt-4 text-center">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                  setSuccess("");
                }}
                className="text-sm text-foreground underline-offset-4 hover:underline"
              >
                {isLogin ? t("login.no_account") : t("login.has_account")}
              </button>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
