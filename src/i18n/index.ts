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
  { code: "fr", label: "Français", complete: true },
  { code: "en", label: "English", complete: true },
  { code: "pt", label: "Português", complete: true },
  { code: "yo", label: "Yorùbá", complete: false },
  { code: "fon", label: "Fɔ̀ngbè", complete: false },
  { code: "ddn", label: "Dendi", complete: false },
] as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en },
      pt: { translation: pt },
      yo: { translation: yo },
      fon: { translation: fon },
      ddn: { translation: ddn },
    },
    supportedLngs: LANGUAGES.map((l) => l.code),
    nonExplicitSupportedLngs: true,
    fallbackLng: "fr",
    returnEmptyString: false,
    interpolation: { escapeValue: false },
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
