export type Category = "culture" | "nature" | "plage" | "ville" | "historique";
export type Place = { id: number; slug: string; name: string; region: string; category: Category; lat: number; lon: number; span: number };

// Les ids 1 à 8 correspondent à ceux de la page Destinations (favoris partagés).
export const PLACES: Place[] = [
  { id: 1, slug: "ganvie", name: "Ganvié", region: "Atlantique", category: "culture", lat: 6.4667, lon: 2.4167, span: 0.08 },
  { id: 2, slug: "parc-pendjari", name: "Parc national de la Pendjari", region: "Atacora", category: "nature", lat: 11.2667, lon: 1.5333, span: 0.4 },
  { id: 3, slug: "ouidah", name: "Ouidah", region: "Atlantique", category: "historique", lat: 6.363, lon: 2.085, span: 0.08 },
  { id: 4, slug: "abomey", name: "Abomey", region: "Zou", category: "historique", lat: 7.1829, lon: 1.9912, span: 0.08 },
  { id: 5, slug: "grand-popo", name: "Grand-Popo", region: "Mono", category: "plage", lat: 6.2833, lon: 1.8167, span: 0.1 },
  { id: 6, slug: "cotonou", name: "Cotonou", region: "Littoral", category: "ville", lat: 6.3703, lon: 2.3912, span: 0.1 },
  { id: 7, slug: "natitingou", name: "Natitingou", region: "Atacora", category: "nature", lat: 10.3042, lon: 1.3796, span: 0.1 },
  { id: 8, slug: "porto-novo", name: "Porto-Novo", region: "Ouémé", category: "culture", lat: 6.4969, lon: 2.6289, span: 0.08 },
];

export const COTONOU = PLACES.find((p) => p.slug === "cotonou")!;

type Pt = { lat: number; lon: number };
const rad = (d: number) => (d * Math.PI) / 180;

/** Distance à vol d'oiseau (formule de haversine), en km. */
export const distKm = (a: Pt, b: Pt) => {
  const dLat = rad(b.lat - a.lat);
  const dLon = rad(b.lon - a.lon);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
};
