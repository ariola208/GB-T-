import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import fr from "./locales/fr.json";
import en from "./locales/en.json";
import pt from "./locales/pt.json";
import yo from "./locales/yo.json";
import fon from "./locales/fon.json";
import ddn from "./locales/ddn.json";

export const LANGUAGES = [
  { code: "fr", label: "Français", flag: "🇫🇷", complete: true },
  { code: "en", label: "English", flag: "🇬🇧", complete: true },
  { code: "pt", label: "Português", flag: "🇵🇹", complete: true },
  { code: "yo", label: "Yorùbá", flag: "🇳🇬", complete: false },
  { code: "fon", label: "Fɔ̀ngbè", flag: "🇧🇯", complete: false },
  { code: "ddn", label: "Dendi", flag: "🇧🇯", complete: false },
] as const;

// Fichiers par page : src/i18n/locales/pages/<langue>/<page>.json
const pageFiles = import.meta.glob("./locales/pages/*/*.json", {
  eager: true,
  import: "default",
}) as Record<string, Record<string, unknown>>;

type Dict = Record<string, unknown>;
const isObj = (v: unknown): v is Dict => !!v && typeof v === "object" && !Array.isArray(v);
const merge = (a: Dict, b: Dict): Dict => {
  const out: Dict = { ...a };
  for (const k of Object.keys(b)) {
    out[k] = isObj(out[k]) && isObj(b[k]) ? merge(out[k] as Dict, b[k] as Dict) : b[k];
  }
  return out;
};

const base: Record<string, Dict> = { fr, en, pt, yo, fon, ddn };
for (const [path, content] of Object.entries(pageFiles)) {
  const lang = path.split("/")[3];
  if (base[lang]) base[lang] = merge(base[lang], content);
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: Object.fromEntries(
      Object.entries(base).map(([code, translation]) => [code, { translation }])
    ),
    supportedLngs: LANGUAGES.map((l) => l.code),
    nonExplicitSupportedLngs: true,
    load: "languageOnly",
    fallbackLng: "fr",
    returnEmptyString: false,
    interpolation: { escapeValue: false },
    saveMissing: import.meta.env.DEV,
    missingKeyHandler: (lngs: readonly string[], _ns: string, key: string) => {
      if (lngs.some((l) => l === "fr" || l === "en")) {
        console.warn(`[i18n] clé manquante (${lngs[0]}) : ${key}`);
      }
    },
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "lang",
      caches: ["localStorage"],
    },
  });

const applyLang = (lng: string) => {
  document.documentElement.lang = lng;
};
applyLang(i18n.language || "fr");
i18n.on("languageChanged", applyLang);

export default i18n;
