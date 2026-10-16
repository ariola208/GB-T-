export type Lang = { code: string; label: string; flag: string; curated: boolean };

export const LANGUAGES: Lang[] = [
  { code: "fr", label: "Français", flag: "🇫🇷", curated: true },
  { code: "en", label: "English", flag: "🇬🇧", curated: true },
  { code: "pt", label: "Português", flag: "🇵🇹", curated: true },
  { code: "es", label: "Español", flag: "🇪🇸", curated: false },
  { code: "de", label: "Deutsch", flag: "🇩🇪", curated: false },
  { code: "it", label: "Italiano", flag: "🇮🇹", curated: false },
  { code: "ar", label: "العربية", flag: "🇸🇦", curated: false },
  { code: "zh-CN", label: "中文", flag: "🇨🇳", curated: false },
  { code: "yo", label: "Yorùbá", flag: "🇳🇬", curated: false },
  { code: "ha", label: "Hausa", flag: "🇳🇬", curated: false },
  { code: "sw", label: "Kiswahili", flag: "🇰🇪", curated: false },
];

const STORAGE_KEY = "site-lang";
const COOKIE = "googtrans";
const SCRIPT_ID = "google-translate-script";
const HOLDER_ID = "google_translate_element";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

export const getChosenLang = (): string => {
  try {
    return localStorage.getItem(STORAGE_KEY) || "fr";
  } catch {
    return "fr";
  }
};

export const baseLang = (code: string): string =>
  LANGUAGES.some((l) => l.code === code && l.curated) ? code : "fr";

const domainVariants = (): string[] => {
  const h = window.location.hostname;
  return h.includes(".") ? ["", `; domain=${h}`, `; domain=.${h}`] : [""];
};

const clearCookie = () => {
  domainVariants().forEach((d) => {
    document.cookie = `${COOKIE}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d}`;
  });
};

const setCookie = (value: string) => {
  domainVariants().forEach((d) => {
    document.cookie = `${COOKIE}=${value}; path=/${d}`;
  });
};

export function applyLanguage(code: string) {
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {
    /* stockage indisponible */
  }
  clearCookie();
  if (code !== "fr") {
    setCookie(baseLang(code) === code ? `/auto/${code}` : `/fr/${code}`);
  }
  window.location.reload();
}

function patchDom() {
  const proto = Node.prototype as any;
  if (proto.__patchedForTranslate) return;
  proto.__patchedForTranslate = true;

  const originalRemove = proto.removeChild;
  proto.removeChild = function (child: Node) {
    if (child.parentNode !== this) return child;
    return originalRemove.call(this, child);
  };

  const originalInsert = proto.insertBefore;
  proto.insertBefore = function (newNode: Node, reference: Node | null) {
    if (reference && reference.parentNode !== this) return newNode;
    return originalInsert.call(this, newNode, reference);
  };
}

function loadGoogleScript() {
  if (document.getElementById(SCRIPT_ID)) return;

  let holder = document.getElementById(HOLDER_ID);
  if (!holder) {
    holder = document.createElement("div");
    holder.id = HOLDER_ID;
    holder.style.display = "none";
    document.body.appendChild(holder);
  }

  window.googleTranslateElementInit = () => {
    if (!window.google?.translate?.TranslateElement) return;
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "fr",
        includedLanguages: LANGUAGES.filter((l) => l.code !== "fr")
          .map((l) => l.code)
          .join(","),
        autoDisplay: false,
      },
      HOLDER_ID
    );
  };

  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  document.body.appendChild(script);
}

export function initTranslation() {
  const chosen = getChosenLang();
  document.documentElement.lang = chosen === "zh-CN" ? "zh" : chosen;

  if (chosen === "fr") {
    clearCookie();
    return;
  }
  patchDom();
  loadGoogleScript();
}
