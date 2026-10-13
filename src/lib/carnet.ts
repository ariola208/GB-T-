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
  return Array.isArray(v) ? v.filter((x) => typeof x === "number") : [];
};
export const setFavs = (ids: number[]) => write(FAV, ids);
export const toggleFav = (id: number): number[] => {
  const f = getFavs();
  const n = f.includes(id) ? f.filter((x) => x !== id) : [...f, id];
  setFavs(n);
  return n;
};
export const getNotes = (): Record<string, string> => read<Record<string, string>>(NOTES, {});
export const setNotes = (n: Record<string, string>) => write(NOTES, n);
export type Trip = { dates: string; travelers: string };
export const getTrip = (): Trip => read<Trip>(TRIP, { dates: "", travelers: "" });
export const setTrip = (t: Trip) => write(TRIP, t);
