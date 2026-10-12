// Photos locales du projet (src/pages/placeholder). Rien n'est chargé depuis Internet.
const files = import.meta.glob("../pages/placeholder/*.{jpeg,jpg,png}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const nfc = (s: string) => s.normalize("NFC");

// Fond sombre neutre quand une photo manque (jamais une photo hors sujet)
export const FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'><rect width='100%' height='100%' fill='#1f1f1f'/></svg>");

const byName: Record<string, string> = {};
for (const [path, url] of Object.entries(files)) byName[nfc(path.split("/").pop()!)] = url;

export const hasLocal = (name: string) => nfc(name) in byName;
export const localImg = (...names: string[]): string => {
  for (const n of names) {
    const u = byName[nfc(n)];
    if (u) return u;
  }
  return FALLBACK;
};
export const localNames = () => Object.keys(byName).sort();
