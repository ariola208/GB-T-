import { useEffect, useRef, useState } from "react";
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "@/i18n";

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = LANGUAGES.find((l) => i18n.language?.startsWith(l.code)) || LANGUAGES[0];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={t("common.language")}
        aria-expanded={open}
        className="h-9 px-3 inline-flex items-center gap-2 border border-border text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors duration-300"
      >
        <Globe className="w-4 h-4" />
        {current.code}
      </button>
      {open && (
        <ul className="absolute right-0 mt-2 w-48 bg-background border border-border shadow-dramatic z-50">
          {LANGUAGES.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                onClick={() => {
                  i18n.changeLanguage(l.code);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm flex justify-between items-center hover:bg-foreground hover:text-background transition-colors ${
                  current.code === l.code ? "font-bold" : ""
                }`}
              >
                <span>{l.label}</span>
                {!l.complete && <span className="text-[10px] opacity-60">{t("common.translation_partial")}</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
