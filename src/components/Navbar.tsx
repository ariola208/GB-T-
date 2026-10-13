import { useRouteSeo } from "@/lib/seo";
import Logo from "@/components/Logo";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { Menu, Search, User, LogOut, LogIn, ChevronDown } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import UserMenu from "./UserMenu";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type StoredUser = { name?: string } | null;

const mainLinks = [
  { key: "home", path: "/" },
  { key: "destinations", path: "/destinations" },
  { key: "culture", path: "/culture" },
  { key: "ame", path: "/ame-du-benin" },
  { key: "planner", path: "/planifier" },
  { key: "blog", path: "/blog" },
  { key: "contact", path: "/contact" },
];

const moreLinks = [
  { key: "map", path: "/carte" },
  { key: "quiz", path: "/quiz" },
  { key: "notebook", path: "/carnet" },
  { key: "info", path: "/infos-pratiques" },
  { key: "services", path: "/services" },
  { key: "gallery", path: "/gallery" },
  { key: "faq", path: "/faq" },
  { key: "about", path: "/about" },
];

const allLinks = [...mainLinks, ...moreLinks];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [user, setUser] = useState<StoredUser>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 40);
    setHidden(latest > prev && latest > 240 && !mobileOpen);
  });

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");
      if (token && userData) {
        setIsLoggedIn(true);
        setUser(JSON.parse(userData));
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, [pathname]);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Ctrl+K / ⌘K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  const goTo = (path: string) => {
    setSearchOpen(false);
    navigate(path);
  };

  // Sur l'accueil, tout en haut : texte blanc sur l'image. Sinon : texte normal.
  const overHero = pathname === "/" && !scrolled;
  const tone = overHero ? "text-white" : "text-foreground";
  useRouteSeo();
  const isMoreActive = moreLinks.some((l) => l.path === pathname);

  const LinkItem = ({ link }: { link: { key: string; path: string } }) => {
    const active = pathname === link.path;
    return (
      <Link
        to={link.path}
        onMouseEnter={() => setHovered(link.path)}
        onMouseLeave={() => setHovered(null)}
        className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
          overHero ? "text-white/85 hover:text-white" : "text-foreground/70 hover:text-foreground"
        } ${active ? (overHero ? "!text-white" : "!text-foreground") : ""}`}
      >
        {(hovered === link.path || (active && hovered === null)) && (
          <motion.span
            layoutId="nav-pill"
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className={`absolute inset-0 -z-10 rounded-full ${
              overHero ? "bg-white/15" : "bg-foreground/[0.07]"
            }`}
          />
        )}
        {t(`nav.${link.key}`)}
      </Link>
    );
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -120 : 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6"
      >
        <nav
          className={`mx-auto flex h-14 max-w-[110rem] items-center justify-between rounded-full px-4 transition-all duration-500 sm:px-6 ${
            scrolled || pathname !== "/"
              ? "glass"
              : "border border-transparent bg-transparent"
          }`}
          aria-label="Navigation principale"
        >
          {/* Logo */}
          <Link to="/" className={`group flex items-center gap-2.5 font-heading text-lg font-bold ${tone}`}>
            <Logo className="h-6" />
          </Link>

          {/* Liens desktop */}
          <div className="hidden items-center gap-1 lg:flex">
            {mainLinks.map((l) => (
              <LinkItem key={l.path} link={l} />
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger
                className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium outline-none transition-colors ${
                  overHero ? "text-white/85 hover:text-white" : "text-foreground/70 hover:text-foreground"
                } ${isMoreActive ? "!text-foreground" : ""}`}
              >
                {t("nav.more", "Plus")}
                <ChevronDown className="h-3.5 w-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[10rem] rounded-2xl p-2">
                {moreLinks.map((l) => (
                  <DropdownMenuItem
                    key={l.path}
                    onClick={() => navigate(l.path)}
                    className={`cursor-pointer rounded-xl px-3 py-2 text-sm ${
                      pathname === l.path ? "font-semibold" : ""
                    }`}
                  >
                    {t(`nav.${l.key}`)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Actions */}
          <div className={`flex items-center gap-2 ${tone}`}>
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label={t("nav.search", "Rechercher")}
              className="hidden h-9 items-center gap-2 rounded-full border [border-color:color-mix(in_srgb,currentColor_25%,transparent)] px-3 text-xs opacity-80 transition hover:opacity-100 md:inline-flex"
            >
              <Search className="h-4 w-4" />
              <span className="hidden xl:inline">{t("nav.search", "Rechercher")}</span>
              <kbd className="hidden rounded border [border-color:color-mix(in_srgb,currentColor_35%,transparent)] px-1.5 py-0.5 text-[10px] xl:inline">Ctrl K</kbd>
            </button>

            <div className="hidden items-center gap-2 md:flex">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>

            <UserMenu user={user} isLoggedIn={isLoggedIn} onLogout={handleLogout} />

            <button
              onClick={() => setSearchOpen(true)}
              aria-label={t("nav.search", "Rechercher")}
              className="flex h-9 w-9 items-center justify-center rounded-full md:hidden"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Menu"
              className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-foreground/10 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>

        {/* Barre de progression de lecture */}
        <motion.div
          style={{ scaleX: progress }}
          className="mx-auto mt-1.5 h-0.5 max-w-[104rem] origin-left rounded-full bg-foreground"
        />
      </motion.header>

      {/* Menu mobile */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right" className="flex w-[85%] max-w-sm flex-col gap-0 p-0">
          <SheetTitle className="border-b border-border px-6 py-5 font-heading text-xl">
            <Logo className="h-6" />
          </SheetTitle>
          <div className="flex-1 overflow-y-auto px-3 py-4">
            {allLinks.map((l, i) => (
              <motion.div
                key={l.path}
                initial={{ opacity: 0, x: 24 }}
                animate={mobileOpen ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.04 * i }}
              >
                <Link
                  to={l.path}
                  className={`block rounded-xl px-4 py-3 text-base transition hover:bg-muted ${
                    pathname === l.path ? "bg-muted font-semibold" : ""
                  }`}
                >
                  {t(`nav.${l.key}`)}
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="space-y-3 border-t border-border p-4">
            <div className="flex gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            {isLoggedIn ? (
              <div className="flex gap-2">
                <Link to="/profile" className="flex-1 rounded-full bg-foreground py-3 text-center text-sm font-medium text-background">
                  {t("nav.profile")}
                </Link>
                <button onClick={handleLogout} className="rounded-full border border-border px-4 text-sm text-red-500">
                  {t("nav.logout")}
                </button>
              </div>
            ) : (
              <Link to="/login" className="block rounded-full bg-foreground py-3 text-center text-sm font-medium text-background">
                {t("nav.login")}
              </Link>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Recherche rapide Ctrl+K */}
      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <CommandInput placeholder={t("nav.search_placeholder", "Aller vers une page...")} />
        <CommandList>
          <CommandEmpty>{t("nav.no_result", "Aucun résultat")}</CommandEmpty>
          <CommandGroup heading="Pages">
            {allLinks.map((l) => (
              <CommandItem key={l.path} value={t(`nav.${l.key}`)} onSelect={() => goTo(l.path)}>
                {t(`nav.${l.key}`)}
              </CommandItem>
            ))}
            <CommandItem value={t("nav.login")} onSelect={() => goTo(isLoggedIn ? "/profile" : "/login")}>
              {isLoggedIn ? t("nav.profile") : t("nav.login")}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default Navbar;
