import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

type Copy = { title: string; description: string };

const DEFAULT: Copy = {
  title: "LEGBAH",
  description: "Découvrez le Bénin : histoire, culture vivante et paysages. Planifiez votre voyage avec LEGBAH.",
};

// Textes fr et en. Les autres langues utilisent l'anglais.
const PAGES: Record<string, { fr: Copy; en: Copy }> = {
  "/": {
    fr: { title: "LEGBAH — Découvrez le Bénin", description: "Voyages, culture et itinéraires au Bénin : histoire, traditions vivantes et paysages. Planifiez votre séjour avec LEGBAH." },
    en: { title: "LEGBAH — Discover Benin", description: "Travel, culture and itineraries in Benin: history, living traditions and landscapes. Plan your trip with LEGBAH." },
  },
  "/destinations": {
    fr: { title: "Destinations", description: "Les lieux à découvrir au Bénin : villes historiques, sites de mémoire, villages lacustres et nature." },
    en: { title: "Destinations", description: "Places to discover in Benin: historic towns, memorial sites, lake villages and nature." },
  },
  "/culture": {
    fr: { title: "Culture", description: "Royaumes, arts, fêtes et savoir-faire : explorer la culture béninoise." },
    en: { title: "Culture", description: "Kingdoms, arts, festivals and craftsmanship: explore Beninese culture." },
  },
  "/ame-du-benin": {
    fr: { title: "L'âme du Bénin", description: "Patrimoine raconté, mini-dictionnaire des langues du Bénin et récits culturels." },
    en: { title: "Soul of Benin", description: "Heritage stories, a mini-dictionary of Benin's languages and cultural narratives." },
  },
  "/planifier": {
    fr: { title: "Planifier mon voyage", description: "Organisez votre voyage au Bénin jour par jour : carte, trajets, budget estimé et devis." },
    en: { title: "Plan your trip", description: "Organise your trip to Benin day by day: map, travel times, estimated budget and quote request." },
  },
  "/blog": {
    fr: { title: "Blog", description: "Récits, conseils et idées pour préparer votre voyage au Bénin." },
    en: { title: "Blog", description: "Stories, tips and ideas to prepare your trip to Benin." },
  },
  "/services": {
    fr: { title: "Services", description: "Les services LEGBAH pour organiser votre séjour au Bénin." },
    en: { title: "Services", description: "LEGBAH services to organise your stay in Benin." },
  },
  "/gallery": {
    fr: { title: "Galerie", description: "Photographies du Bénin : lieux, paysages et culture." },
    en: { title: "Gallery", description: "Photographs of Benin: places, landscapes and culture." },
  },
  "/faq": {
    fr: { title: "Questions fréquentes", description: "Réponses aux questions les plus courantes avant de voyager au Bénin." },
    en: { title: "FAQ", description: "Answers to the most common questions before travelling to Benin." },
  },
  "/about": {
    fr: { title: "À propos", description: "Qui est LEGBAH et ce que nous proposons." },
    en: { title: "About", description: "Who LEGBAH is and what we offer." },
  },
  "/contact": {
    fr: { title: "Contact", description: "Contactez LEGBAH pour préparer votre voyage." },
    en: { title: "Contact", description: "Contact LEGBAH to prepare your trip." },
  },
};

function setMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

export function useRouteSeo() {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();
  const language = i18n.resolvedLanguage || i18n.language || "fr";

  useEffect(() => {
    const lang = language.slice(0, 2);
    const key = Object.keys(PAGES)
      .filter((k) => (k === "/" ? pathname === "/" : pathname === k || pathname.startsWith(k + "/")))
      .sort((a, b) => b.length - a.length)[0];
    const page = key ? PAGES[key] : undefined;
    const c = page ? (lang === "fr" ? page.fr : page.en) : DEFAULT;
    const title = !page || key === "/" ? c.title : `${c.title} | LEGBAH`;
    const url = window.location.origin + pathname;

    document.title = title;
    document.documentElement.lang = lang;
    setMeta("name", "description", c.description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", c.description);
    setMeta("property", "og:url", url);

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = url;
  }, [pathname, language]);
}
