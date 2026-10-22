import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * Hook utilitaire pour réagir au changement de langue dans un composant
 * qui n'utilise pas directement `useTranslation`.
 *
 * Exemple :
 *   const lang = useLanguage();
 *   // `lang` se met à jour quand l'utilisateur change la langue
 */
export const useLanguage = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.resolvedLanguage || i18n.language || "fr");

  useEffect(() => {
    const onChanged = (lng: string) => {
      setLang(lng.split("-")[0]);
    };
    i18n.on("languageChanged", onChanged);
    return () => {
      i18n.off("languageChanged", onChanged);
    };
  }, [i18n]);

  return lang;
};
