export type Category = "culture" | "nature" | "plage" | "ville" | "historique";
export type PlaceType = Category | "stay";

export type Place = {
  id: string;
  slug: string;
  name: string;
  city: string;
  region: string;
  category: Category;
  type: PlaceType;
  lat: number;
  lng: number;
  span: number;
  hours: number;
  price: number;
  estimated?: boolean;
};

export const PLACES: Place[] = [
  { id: "1", slug: "ganvie", name: "Ganvié", city: "Cotonou", region: "Atlantique", category: "culture", type: "culture", lat: 6.4667, lng: 2.4167, span: 0.08, hours: 3, price: 15000 },
  { id: "2", slug: "parc-pendjari", name: "Parc national de la Pendjari", city: "Natitingou", region: "Atacora", category: "nature", type: "nature", lat: 11.2667, lng: 1.5333, span: 0.4, hours: 6, price: 35000 },
  { id: "3", slug: "ouidah", name: "Ouidah", city: "Ouidah", region: "Atlantique", category: "historique", type: "historique", lat: 6.363, lng: 2.085, span: 0.08, hours: 4, price: 10000 },
  { id: "4", slug: "abomey", name: "Abomey", city: "Abomey", region: "Zou", category: "historique", type: "historique", lat: 7.1829, lng: 1.9912, span: 0.08, hours: 3, price: 8000 },
  { id: "5", slug: "grand-popo", name: "Grand-Popo", city: "Grand-Popo", region: "Mono", category: "plage", type: "plage", lat: 6.2833, lng: 1.8167, span: 0.1, hours: 2, price: 5000 },
  { id: "6", slug: "cotonou", name: "Cotonou", city: "Cotonou", region: "Littoral", category: "ville", type: "ville", lat: 6.3703, lng: 2.3912, span: 0.1, hours: 4, price: 12000 },
  { id: "7", slug: "natitingou", name: "Natitingou", city: "Natitingou", region: "Atacora", category: "nature", type: "nature", lat: 10.3042, lng: 1.3796, span: 0.1, hours: 5, price: 15000 },
  { id: "8", slug: "porto-novo", name: "Porto-Novo", city: "Porto-Novo", region: "Ouémé", category: "culture", type: "culture", lat: 6.4969, lng: 2.6289, span: 0.08, hours: 3, price: 8000 }, 
  { id: "9", slug: "hotel-lac", name: "Hôtel Lac Nokoué", city: "Ganvié", region: "Atlantique", category: "ville", type: "stay", lat: 6.4667, lng: 2.4167, span: 0.02, hours: 0, price: 50000 },
];

export const COTONOU = PLACES.find((p) => p.slug === "cotonou")!;

export const TYPES: { key: PlaceType; label: string }[] = [
  { key: "culture", label: "Culture" },
  { key: "nature", label: "Nature" },
  { key: "plage", label: "Plage" },
  { key: "ville", label: "Ville" },
  { key: "historique", label: "Historique" },
  { key: "stay", label: "Hébergement" },
];

export const PRESETS = [
  { key: "express", label: "Express 3 jours", days: [["6", "1", "3"], ["3", "4"], ["8"]] },
  { key: "classique", label: "Classique 5 jours", days: [["6", "1"], ["3", "4"], ["5"], ["7"], ["2"]] },
  { key: "grand-tour", label: "Grand Tour 7 jours", days: [["6", "1"], ["3"], ["4"], ["7"], ["2"], ["2"], ["5", "8"]] },
];

type Pt = { lat: number; lng: number };
const rad = (d: number) => (d * Math.PI) / 180;

export const distKm = (a: Pt, b: Pt) => {
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
};
