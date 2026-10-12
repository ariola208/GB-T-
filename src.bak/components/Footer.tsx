import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <h3 className="font-heading text-3xl font-bold mb-4">BÉNIN</h3>
            <p className="font-body text-sm text-primary-foreground/70 max-w-md leading-relaxed">
              Explorez le Bénin, terre de culture, d'histoire et de nature.
              Un voyage inoubliable vous attend au cœur de l'Afrique de l'Ouest.
            </p>
          </div>
          <div>
            <h4 className="font-body text-xs tracking-[0.2em] uppercase mb-4 text-primary-foreground/50">
              Navigation
            </h4>
            <ul className="space-y-2">
              {["Accueil", "Destinations", "Culture", "À propos", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Accueil" ? "/" : `/${item.toLowerCase().replace("à propos", "about")}`}
                    className="font-body text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-body text-xs tracking-[0.2em] uppercase mb-4 text-primary-foreground/50">
              Contact
            </h4>
            <ul className="space-y-2 font-body text-sm text-primary-foreground/70">
              <li>info@benin-tourisme.com</li>
              <li>+229 21 00 00 00</li>
              <li>Cotonou, Bénin</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 pt-8 text-center">
          <p className="font-body text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Bénin Tourisme. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
