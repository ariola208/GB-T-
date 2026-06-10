import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, LogIn } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
    window.addEventListener("scroll", () => setIsScrolled(window.scrollY > 50));
    return () => window.removeEventListener("scroll", () => setIsScrolled(window.scrollY > 50));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  const navLinks = [
    { name: "Accueil", path: "/" },
    { name: "Destinations", path: "/destinations" },
    { name: "Culture", path: "/culture" },
    { name: "Services", path: "/services" },
    { name: "Blog", path: "/blog" },
    { name: "Galerie", path: "/gallery" },
    { name: "FAQ", path: "/faq" },
    { name: "À propos", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-heading font-bold text-xl">Bénin Tourisme</Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className="text-sm hover:text-primary transition">{link.name}</Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Link to="/profile" className="flex items-center gap-1 text-sm hover:text-primary transition">
                  <User className="w-4 h-4" />
                  {user?.name?.split(' ')[0]}
                </Link>
                <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-600 transition">
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <Link to="/login" className="flex items-center gap-1 text-sm hover:text-primary transition">
                <LogIn className="w-4 h-4" />
                Connexion
              </Link>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className="block py-2 text-sm hover:text-primary transition">
                {link.name}
              </Link>
            ))}
            {isLoggedIn ? (
              <>
                <Link to="/profile" onClick={() => setIsOpen(false)} className="block py-2 text-sm hover:text-primary transition">Mon profil</Link>
                <button onClick={() => { handleLogout(); setIsOpen(false); }} className="block py-2 text-sm text-red-500">Déconnexion</button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)} className="block py-2 text-sm hover:text-primary transition">Connexion</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
