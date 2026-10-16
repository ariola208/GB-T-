import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowUp, Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";

const links = [
  { key: "home", path: "/" },
  { key: "destinations", path: "/destinations" },
  { key: "culture", path: "/culture" },
  { key: "ame", path: "/ame-du-benin" },
  { key: "services", path: "/services" },
  { key: "blog", path: "/blog" },
  { key: "gallery", path: "/gallery" },
  { key: "faq", path: "/faq" },
  { key: "about", path: "/about" },
  { key: "contact", path: "/contact" },
];

const socials = [
  { icon: Facebook, label: "Facebook" },
  { icon: Instagram, label: "Instagram" },
  { icon: Twitter, label: "Twitter" },
  { icon: Youtube, label: "Youtube" },
];

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="relative border-t border-border bg-background py-16 text-foreground">
      <div className="container relative mx-auto px-6">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <h3 className="mb-4 font-heading text-3xl font-bold">BÉNIN</h3>
            <p className="max-w-md font-body text-sm leading-relaxed text-muted-foreground">{t("footer.tagline")}</p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="rounded-full border border-border p-3 transition-all duration-300 hover:-translate-y-1 hover:bg-foreground hover:text-background"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-body text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {t("footer.navigation")}
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {links.map((l) => (
                <li key={l.key}>
                  <Link
                    to={l.path}
                    className="inline-block font-body text-sm text-muted-foreground transition-all duration-300 hover:translate-x-1 hover:text-foreground"
                  >
                    {t(`nav.${l.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-body text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {t("footer.contact")}
            </h4>
            <ul className="space-y-3 font-body text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" />info@benin-tourisme.com</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" />+229 01 54 06 94 54</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4" />Cotonou, Bénin</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="font-body text-xs text-muted-foreground">
            © {new Date().getFullYear()} Bénin Tourisme. {t("footer.rights")}
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs uppercase tracking-widest transition hover:bg-foreground hover:text-background"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            {t("footer.back_to_top", "Haut de page")}
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
