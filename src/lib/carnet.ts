// Carnet de voyage : stocké uniquement dans ce navigateur (localStorage).
const FAV = "fav_destinations"; // même clé que la page Destinations
const NOTES = "carnet_notes";
const TRIP = "carnet_trip";

const read = <T,>(key: string, fallback: T): T => {
  try { const v = JSON.parse(localStorage.getItem(key) || "null"); return v ?? fallback; } catch { return fallback; }
};
const write = (key: string, value: unknown) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* ignore */ } };

export const getFavs = (): number[] => {
  const v = read<unknown>(FAV, []);
  return Array.isArray(v) ? v.map(Number).filter(Number.isFinite) : [];
};
export const setFavs = (ids: number[]) => {
  write(FAV, ids);
  window.dispatchEvent(new Event("benin-favorites-changed"));
};
export const toggleFav = (id: number | string): number[] => {
  const n = Number(id);
  const f = getFavs();
  const r = f.includes(n) ? f.filter((x) => x !== n) : [...f, n];
  setFavs(r);
  return r;
};
export const getNotes = (): Record<string, string> => read<Record<string, string>>(NOTES, {});
export const setNotes = (n: Record<string, string>) => write(NOTES, n);
export type Trip = { dates: string; travelers: string };
export const getTrip = (): Trip => read<Trip>(TRIP, { dates: "", travelers: "" });
export const setTrip = (t: Trip) => write(TRIP, t);
