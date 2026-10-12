import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

export const LANGUAGES = [
  { code: "fr", label: "Français", flag: "🇫🇷", complete: true },
  { code: "en", label: "English", flag: "🇬🇧", complete: true },
  { code: "pt", label: "Português", flag: "🇵🇹", complete: true },
  { code: "yo", label: "Yorùbá", flag: "🇧🇯", complete: false },
  { code: "fon", label: "Fɔ̀ngbè", flag: "🇧🇯", complete: false },
  { code: "ddn", label: "Dendi", flag: "🇧🇯", complete: false },
] as const;

const isObj = (v: any) => v !== null && typeof v === "object" && !Array.isArray(v);

const merge = (a: any, b: any): any => {
  const out = { ...a };
  for (const k of Object.keys(b)) {
    out[k] = isObj(a?.[k]) && isObj(b[k]) ? merge(a[k], b[k]) : b[k];
  }
  return out;
};

// Tous les fichiers ./locales/<langue>[.suffixe].json sont fusionnés automatiquement.
// Ex : fr.json + fr.pages.json + fr.contact.json => langue "fr"
const files = import.meta.glob("./locales/*.json", { eager: true, import: "default" }) as Record<string, any>;
const resources: Record<string, { translation: any }> = {};
for (const [path, content] of Object.entries(files)) {
  const lng = path.split("/").pop()!.split(".")[0];
  resources[lng] = { translation: merge(resources[lng]?.translation ?? {}, content) };
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: LANGUAGES.map((l) => l.code),
    nonExplicitSupportedLngs: true,
    load: "languageOnly",
    // Texte manquant : yoruba -> anglais -> français ; fon/dendi -> français -> anglais
    fallbackLng: {
      yo: ["en", "fr"],
      fon: ["fr", "en"],
      ddn: ["fr", "en"],
      default: ["fr"],
    },
    returnEmptyString: false,
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "lang",
      caches: ["localStorage"],
    },
  });

const applyLang = (lng: string) => {
  document.documentElement.lang = lng.split("-")[0];
};
applyLang(i18n.language || "fr");
i18n.on("languageChanged", applyLang);

export default i18n;
