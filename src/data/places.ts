export type PlaceType = "site" | "food" | "craft" | "stay";
export type Tier = "eco" | "mid" | "premium";

export const TYPES: { key: PlaceType; label: string }[] = [
  { key: "site", label: "Sites" },
  { key: "craft", label: "Artisanat" },
  { key: "food", label: "Restaurants" },
  { key: "stay", label: "Hébergements" },
];

export type Place = {
  id: string;
  name: string;
  city: string;
  type: PlaceType;
  lat: number;
  lng: number;
  hours: number;      // durée sur place (0 pour une nuit d'hébergement)
  price: number;      // FCFA par personne
  estimated: boolean; // true = estimation, à remplacer par un tarif réel
  demo: boolean;      // true = donnée de démonstration (coordonnées approximatives)
  tier?: Tier;        // niveau de gamme pour restaurants et hébergements
};

// ⚠ Données de démonstration : coordonnées approximatives et prix estimés.
// À remplacer par des données vérifiées avec tes partenaires.
const d = { estimated: true, demo: true } as const;

export const PLACES: Place[] = [
  { id: "abomey-palais", name: "Palais royaux d'Abomey", city: "Abomey", type: "site", lat: 7.1829, lng: 1.9912, hours: 2.5, price: 3000, ...d },
  { id: "abomey-fondeurs", name: "Atelier de fondeurs", city: "Abomey", type: "craft", lat: 7.179, lng: 1.996, hours: 1.5, price: 2000, ...d },
  { id: "abomey-resto-eco", name: "Petit restaurant de quartier", city: "Abomey", type: "food", tier: "eco", lat: 7.1845, lng: 1.9935, hours: 1, price: 1500, ...d },
  { id: "abomey-resto", name: "Restaurant local", city: "Abomey", type: "food", tier: "mid", lat: 7.185, lng: 1.993, hours: 1, price: 4000, ...d },
  { id: "abomey-resto-premium", name: "Table gastronomique", city: "Abomey", type: "food", tier: "premium", lat: 7.1855, lng: 1.9925, hours: 1.5, price: 15000, ...d },
  { id: "abomey-nuit-eco", name: "Auberge simple", city: "Abomey", type: "stay", tier: "eco", lat: 7.1865, lng: 1.9885, hours: 0, price: 12000, ...d },
  { id: "abomey-nuit", name: "Hébergement traditionnel", city: "Abomey", type: "stay", tier: "mid", lat: 7.186, lng: 1.988, hours: 0, price: 25000, ...d },
  { id: "abomey-nuit-premium", name: "Hôtel haut de gamme", city: "Abomey", type: "stay", tier: "premium", lat: 7.1855, lng: 1.9875, hours: 0, price: 85000, ...d },
  { id: "ouidah-fort", name: "Fort portugais et musée d'histoire", city: "Ouidah", type: "site", lat: 6.364, lng: 2.085, hours: 1.5, price: 2000, ...d },
  { id: "ouidah-porte", name: "Porte du Non-Retour", city: "Ouidah", type: "site", lat: 6.3375, lng: 2.084, hours: 1.5, price: 0, ...d },
  { id: "ouidah-resto-eco", name: "Petit restaurant de quartier", city: "Ouidah", type: "food", tier: "eco", lat: 6.3625, lng: 2.0865, hours: 1, price: 1500, ...d },
  { id: "ouidah-resto", name: "Restaurant local", city: "Ouidah", type: "food", tier: "mid", lat: 6.362, lng: 2.087, hours: 1, price: 4500, ...d },
  { id: "ouidah-resto-premium", name: "Table gastronomique", city: "Ouidah", type: "food", tier: "premium", lat: 6.3615, lng: 2.0875, hours: 1.5, price: 16000, ...d },
  { id: "ouidah-nuit-eco", name: "Auberge simple", city: "Ouidah", type: "stay", tier: "eco", lat: 6.3605, lng: 2.0895, hours: 0, price: 12000, ...d },
  { id: "ouidah-nuit", name: "Hébergement à Ouidah", city: "Ouidah", type: "stay", tier: "mid", lat: 6.36, lng: 2.09, hours: 0, price: 30000, ...d },
  { id: "ouidah-nuit-premium", name: "Hôtel haut de gamme", city: "Ouidah", type: "stay", tier: "premium", lat: 6.3595, lng: 2.0905, hours: 0, price: 90000, ...d },
  { id: "ganvie", name: "Cité lacustre de Ganvié", city: "Ganvié", type: "site", lat: 6.465, lng: 2.419, hours: 3, price: 8000, ...d },
  { id: "dantokpa", name: "Marché Dantokpa", city: "Cotonou", type: "craft", lat: 6.3665, lng: 2.435, hours: 2, price: 0, ...d },
  { id: "portonovo-honme", name: "Musée Honmè", city: "Porto-Novo", type: "site", lat: 6.4975, lng: 2.6285, hours: 1.5, price: 2000, ...d },
];

export const PRESETS: { key: Tier; label: string; days: string[][] }[] = [
  {
    key: "eco",
    label: "Économique",
    days: [
      ["abomey-palais", "abomey-fondeurs", "abomey-resto-eco", "abomey-nuit-eco"],
      ["ouidah-fort", "ouidah-porte", "ouidah-resto-eco", "ouidah-nuit-eco"],
      ["dantokpa", "portonovo-honme"],
    ],
  },
  {
    key: "mid",
    label: "Équilibré",
    days: [
      ["abomey-palais", "abomey-fondeurs", "abomey-resto", "abomey-nuit"],
      ["ouidah-fort", "ouidah-porte", "ouidah-resto", "ouidah-nuit"],
      ["ganvie", "dantokpa"],
    ],
  },
  {
    key: "premium",
    label: "Premium",
    days: [
      ["abomey-palais", "abomey-fondeurs", "abomey-resto-premium", "abomey-nuit-premium"],
      ["ouidah-fort", "ouidah-porte", "ouidah-resto-premium", "ouidah-nuit-premium"],
      ["ganvie", "portonovo-honme"],
    ],
  },
];
