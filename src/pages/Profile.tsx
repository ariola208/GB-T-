import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  User, Mail, Phone, MapPin, Calendar, LogOut, Heart, Compass, Star, Award,
  Edit3, Save, X, Lock, Trash2, AlertCircle, RefreshCw, Bell, Sun, TrendingUp,
  Users, Wallet, Plane,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AvatarUploader from "@/components/AvatarUploader";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { useToast } from "../hooks/use-toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json",
});

const statusStyle: Record<string, string> = {
  upcoming: "bg-blue-500",
  confirmed: "bg-green-500",
  completed: "bg-gray-500",
  cancelled: "bg-red-500",
};

const TAB_IDS = ["trips", "favorites", "reviews", "profile"];

const mockWeather = {
  city: "Cotonou",
  temp: 28,
  condition: "Ensoleillé",
  icon: Sun,
};

const Profile = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [tab, setTab] = useState("trips");
  const [profile, setProfile] = useState<any>(null);
  const [trips, setTrips] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", email: "", phone: "", location: "", bio: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [pw, setPw] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [pwError, setPwError] = useState("");

  const fmtDate = (d: string) => new Date(d).toLocaleDateString(i18n.language);

  const clearSession = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const load = useCallback(async () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    setState("loading");
    try {
      const res = await fetch(`${API_URL}/profile/profile`, { headers: authHeaders() });
      if (res.status === 401 || res.status === 403) {
        clearSession();
        navigate("/login");
        return;
      }
      if (!res.ok) throw new Error(String(res.status));
      setProfile(await res.json());
      setState("ready");

      const [tr, fv, rv] = await Promise.allSettled(
        ["trips", "favorites", "reviews"].map((p) =>
          fetch(`${API_URL}/profile/${p}`, { headers: authHeaders() }).then((r) =>
            r.ok ? r.json() : []
          )
        )
      );
      setTrips(tr.status === "fulfilled" && Array.isArray(tr.value) ? tr.value : []);
      setFavorites(fv.status === "fulfilled" && Array.isArray(fv.value) ? fv.value : []);
      setReviews(rv.status === "fulfilled" && Array.isArray(rv.value) ? rv.value : []);
    } catch {
      setState("error");
    }
  }, [navigate]);

  useEffect(() => {
    load();
  }, [load]);

  const startEditing = () => {
    setEditForm({
      name: profile?.name || "",
      email: profile?.email || "",
      phone: profile?.phone || "",
      location: profile?.location || "",
      bio: profile?.bio || "",
    });
    setTab("profile");
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${API_URL}/profile/profile`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(editForm),
      });
      if (res.ok) {
        await load();
        setIsEditing(false);
        toast({ title: t("profile.toast.success"), description: t("profile.toast.updated") });
      } else {
        const data = await res.json().catch(() => ({}));
        toast({
          title: t("profile.toast.error"),
          description: data.error || t("profile.toast.update_failed"),
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: t("profile.toast.error"),
        description: t("profile.toast.update_failed"),
        variant: "destructive",
      });
    }
  };

  const handleChangePassword = async () => {
    if (pw.newPassword !== pw.confirmPassword) return setPwError(t("profile.pw_mismatch"));
    if (pw.newPassword.length < 8) return setPwError(t("profile.pw_short"));
    try {
      const res = await fetch(`${API_URL}/profile/change-password`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({ currentPassword: pw.currentPassword, newPassword: pw.newPassword }),
      });
      if (res.ok) {
        setShowPassword(false);
        setPw({ currentPassword: "", newPassword: "", confirmPassword: "" });
        setPwError("");
        toast({ title: t("profile.toast.success"), description: t("profile.toast.pw_changed") });
      } else {
        const data = await res.json().catch(() => ({}));
        setPwError(data.error || t("profile.server_error"));
      }
    } catch {
      setPwError(t("profile.server_error"));
    }
  };

  const removeFavorite = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/profile/favorites/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (res.ok) {
        setFavorites((f) => f.filter((x) => x.id !== id));
        toast({ title: t("profile.toast.success"), description: t("profile.toast.fav_removed") });
      }
    } catch {
      toast({
        title: t("profile.toast.error"),
        description: t("profile.toast.fav_failed"),
        variant: "destructive",
      });
    }
  };

  const logout = () => {
    clearSession();
    navigate("/login");
    toast({ title: t("profile.logged_out_title"), description: t("profile.logged_out_desc") });
  };

  const Shell = ({ children }: { children: React.ReactNode }) => (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-24">{children}</main>
      <Footer />
    </div>
  );

  if (state === "loading") {
    return (
      <Shell>
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-foreground border-t-transparent" />
          <p className="text-muted-foreground">{t("profile.loading")}</p>
        </div>
      </Shell>
    );
  }

  if (state === "error" || !profile) {
    return (
      <Shell>
        <div className="container mx-auto flex min-h-[50vh] items-center justify-center px-6">
          <Card flat className="max-w-md text-center">
            <CardContent className="p-8">
              <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
              <h1 className="mb-2 font-heading text-2xl font-bold">
                {t("profile.error_title")}
              </h1>
              <p className="mb-6 text-sm text-muted-foreground">{t("profile.error_text")}</p>
              <div className="flex justify-center gap-3">
                <Button onClick={load}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  {t("profile.retry")}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    clearSession();
                    navigate("/login");
                  }}
                >
                  {t("profile.login_again")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Shell>
    );
  }

  const WeatherIcon = mockWeather.icon;

  return (
    <Shell>
      <div className="container mx-auto px-6 py-8">
        {/* En-tête */}
        <div className="relative mb-12">
          <div className="h-48 rounded-2xl bg-gradient-to-r from-foreground/20 via-foreground/10 to-foreground/5" />
          <div className="-mt-16 flex flex-col items-start gap-6 px-6 md:flex-row md:items-end">
            <AvatarUploader
              currentAvatar={profile.avatar_url}
              userName={profile.name}
              onUploaded={(url) => setProfile({ ...profile, avatar_url: url })}
            />
            <div className="flex-1">
              <h1 className="font-heading text-3xl font-bold">{profile.name}</h1>
              <p className="mt-1 flex flex-wrap items-center gap-1 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {profile.location || t("profile.not_set")}
                <span className="mx-2">•</span>
                <Calendar className="h-4 w-4" />
                {t("profile.member_since")} {profile.joinedDate ? fmtDate(profile.joinedDate) : "—"}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={startEditing}>
                <Edit3 className="mr-2 h-4 w-4" />
                {t("profile.edit")}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-destructive"
                onClick={logout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                {t("profile.logout")}
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Compass, key: "trips", value: profile.stats?.trips || 0, color: "text-primary" },
            { icon: Star, key: "reviews", value: profile.stats?.reviews || 0, color: "text-secondary" },
            { icon: Heart, key: "favorites", value: favorites.length, color: "text-destructive" },
            { icon: Award, key: "points", value: profile.stats?.points || 0, color: "text-accent" },
          ].map((s, i) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-dramatic">
                <CardContent className="p-6">
                  <s.icon className={`mx-auto mb-2 h-8 w-8 ${s.color}`} />
                  <p className="font-heading text-3xl font-bold">{s.value}</p>
                  <p className="text-sm text-muted-foreground">
                    {t(`profile.stats.${s.key}`)}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Météo + Actions rapides */}
        <div className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card flat className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="h-5 w-5" />
                Météo à {mockWeather.city}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <WeatherIcon className="h-12 w-12 text-primary" />
              <div>
                <p className="text-3xl font-bold">{mockWeather.temp}°C</p>
                <p className="text-muted-foreground">{mockWeather.condition}</p>
              </div>
            </CardContent>
          </Card>

          <Card flat className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Actions rapides
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button asChild className="transition-transform hover:scale-105">
                <Link to="/planifier">
                  <Plane className="mr-2 h-4 w-4" />
                  Planifier un voyage
                </Link>
              </Button>
              <Button variant="outline" asChild className="transition-transform hover:scale-105">
                <Link to="/destinations">
                  <Compass className="mr-2 h-4 w-4" />
                  Explorer
                </Link>
              </Button>
              <Button variant="outline" asChild className="transition-transform hover:scale-105">
                <Link to="/contact">
                  <Wallet className="mr-2 h-4 w-4" />
                  Devis
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Onglets */}
        <div className="mb-8 flex flex-wrap gap-2 border-b border-border">
          {TAB_IDS.map((k) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`-mb-px border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                tab === k
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t(`profile.tabs.${k}`)}
            </button>
          ))}
        </div>

        {/* Trips */}
        {tab === "trips" &&
          (trips.length === 0 ? (
            <div className="py-12 text-center">
              <Compass className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <p>{t("profile.no_trips")}</p>
              <Button className="mt-4" asChild>
                <Link to="/destinations">{t("profile.explore")}</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {trips.map((trip) => (
                <Card key={trip.id} className="overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-dramatic">
                  {trip.image ? (
                    <img src={trip.image} alt="" className="h-48 w-full object-cover" />
                  ) : (
                    <div className="flex h-48 items-center justify-center bg-muted">
                      <Compass className="h-10 w-10 text-muted-foreground" />
                    </div>
                  )}
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-bold">{trip.destination}</h3>
                      <Badge className={statusStyle[trip.status] || statusStyle.upcoming}>
                        {t(`profile.status.${statusStyle[trip.status] ? trip.status : "upcoming"}`)}
                      </Badge>
                    </div>
                    <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {trip.startDate} - {trip.endDate}
                    </p>
                    <p className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {t("profile.travelers", { count: trip.travelers })}
                    </p>
                    <p className="mt-2 font-bold">{trip.price}€</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ))}

        {/* Favorites */}
        {tab === "favorites" &&
          (favorites.length === 0 ? (
            <div className="py-12 text-center">
              <Heart className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <p>{t("profile.no_favorites")}</p>
              <Button className="mt-4" asChild>
                <Link to="/destinations">{t("profile.discover")}</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {favorites.map((fav) => (
                <Card key={fav.id} className="overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-dramatic">
                  {fav.image && <img src={fav.image} alt="" className="h-48 w-full object-cover" />}
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <h3 className="font-bold">{fav.name}</h3>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-destructive transition-transform hover:scale-110"
                        onClick={() => removeFavorite(fav.id)}
                        aria-label="remove"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {fav.location}
                    </p>
                    <div className="mt-2 flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      <span>{fav.rating}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ))}

        {/* Reviews */}
        {tab === "reviews" &&
          (reviews.length === 0 ? (
            <div className="py-12 text-center">
              <Star className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <p>{t("profile.no_reviews")}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((r) => (
                <Card key={r.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold">{r.destination}</h3>
                        <p className="text-sm text-muted-foreground">{fmtDate(r.date)}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < r.rating ? "fill-yellow-500 text-yellow-500" : "text-muted"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-3 text-muted-foreground">{r.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ))}

        {/* Profile */}
        {tab === "profile" && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card flat>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>{t("profile.personal_info")}</CardTitle>
                  {!isEditing && (
                    <Button variant="outline" size="sm" onClick={startEditing}>
                      <Edit3 className="mr-2 h-4 w-4" />
                      {t("profile.edit")}
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdate();
                      }}
                      className="space-y-4"
                    >
                      <Input
                        label={t("profile.name")}
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        required
                      />
                      <Input
                        label={t("profile.email")}
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        required
                      />
                      <Input
                        label={t("profile.phone")}
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      />
                      <Input
                        label={t("profile.location")}
                        value={editForm.location}
                        onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                      />
                      <Textarea
                        label={t("profile.bio")}
                        rows={4}
                        value={editForm.bio}
                        onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                      />
                      <div className="flex gap-2">
                        <Button type="submit">
                          <Save className="mr-2 h-4 w-4" />
                          {t("profile.save")}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                        >
                          <X className="mr-2 h-4 w-4" />
                          {t("profile.cancel")}
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <dl className="space-y-4">
                      {[
                        { icon: User, label: t("profile.name"), value: profile.name },
                        { icon: Mail, label: t("profile.email"), value: profile.email },
                        {
                          icon: Phone,
                          label: t("profile.phone"),
                          value: profile.phone || t("profile.not_set"),
                        },
                        {
                          icon: MapPin,
                          label: t("profile.location"),
                          value: profile.location || t("profile.not_set"),
                        },
                      ].map((row) => (
                        <div key={row.label} className="flex items-center gap-3 border-b py-2">
                          <row.icon className="h-5 w-5 text-muted-foreground" />
                          <dt className="w-28 text-sm">{row.label}</dt>
                          <dd className="flex-1 font-medium">{row.value}</dd>
                        </div>
                      ))}
                      <div>
                        <dt className="mb-2 text-sm text-muted-foreground">
                          {t("profile.bio")}
                        </dt>
                        <dd className="text-muted-foreground">
                          {profile.bio || t("profile.no_bio")}
                        </dd>
                      </div>
                    </dl>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card flat>
                <CardHeader>
                  <CardTitle>{t("profile.security")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full justify-start transition-transform hover:scale-105"
                    onClick={() => setShowPassword(true)}
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    {t("profile.change_password")}
                  </Button>
                </CardContent>
              </Card>

              <Card flat>
                <CardHeader>
                  <CardTitle>{t("profile.help_title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {t("profile.help_text")}
                  </p>
                  <Button variant="link" className="p-0" asChild>
                    <Link to="/contact">{t("profile.contact_support")}</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card flat>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Aucune nouvelle notification.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {showPassword && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80"
            onClick={() => setShowPassword(false)}
          />
          <div className="relative w-full max-w-md rounded-2xl bg-background p-6">
            <h3 className="mb-4 font-heading text-2xl font-bold">
              {t("profile.change_password")}
            </h3>
            <div className="space-y-4">
              <Input
                type="password"
                placeholder={t("profile.current_password")}
                value={pw.currentPassword}
                onChange={(e) => setPw({ ...pw, currentPassword: e.target.value })}
              />
              <Input
                type="password"
                placeholder={t("profile.new_password")}
                value={pw.newPassword}
                onChange={(e) => setPw({ ...pw, newPassword: e.target.value })}
              />
              <Input
                type="password"
                placeholder={t("profile.confirm_password")}
                value={pw.confirmPassword}
                onChange={(e) => setPw({ ...pw, confirmPassword: e.target.value })}
              />
            </div>
            {pwError && <p className="mt-2 text-sm text-destructive">{pwError}</p>}
            <div className="mt-6 flex gap-3">
              <Button onClick={handleChangePassword} className="flex-1">
                {t("profile.modify")}
              </Button>
              <Button variant="outline" onClick={() => setShowPassword(false)}>
                {t("profile.cancel")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </Shell>
  );
};

export default Profile;
