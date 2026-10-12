import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X, User, LogOut, LogIn } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  const navLinks = [
    { key: "home", path: "/" },
    { key: "destinations", path: "/destinations" },
    { key: "culture", path: "/culture" },
    { key: "services", path: "/services" },
    { key: "blog", path: "/blog" },
    { key: "gallery", path: "/gallery" },
    { key: "faq", path: "/faq" },
    { key: "about", path: "/about" },
    { key: "contact", path: "/contact" },
  ];

  const linkClass =
    "relative text-sm after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-foreground after:transition-all after:duration-300 hover:after:w-full";

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-heading font-bold text-xl">
            Bénin Tourisme
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className={linkClass}>
                {t(`nav.${link.key}`)}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
            {isLoggedIn ? (
              <>
                <Link to="/profile" className={`flex items-center gap-1 ${linkClass}`}>
                  <User className="w-4 h-4" />
                  {user?.name?.split(" ")[0]}
                </Link>
                <button
                  onClick={handleLogout}
                  aria-label={t("nav.logout")}
                  title={t("nav.logout")}
                  className="text-red-500 hover:text-red-600 transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <Link to="/login" className={`flex items-center gap-1 ${linkClass}`}>
                <LogIn className="w-4 h-4" />
                {t("nav.login")}
              </Link>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2" aria-label="Menu">
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border bg-background">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-sm hover:pl-2 transition-all"
              >
                {t(`nav.${link.key}`)}
              </Link>
            ))}
            {isLoggedIn ? (
              <>
                <Link to="/profile" onClick={() => setIsOpen(false)} className="block py-2 text-sm">
                  {t("nav.profile")}
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block py-2 text-sm text-red-500"
                >
                  {t("nav.logout")}
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)} className="block py-2 text-sm">
                {t("nav.login")}
              </Link>
            )}
            <div className="flex gap-3 pt-4">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
