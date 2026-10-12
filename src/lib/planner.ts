import type { Place } from "@/data/places";

export const ROAD_FACTOR = 1.3; // la route est plus longue que la ligne droite
export const AVG_SPEED = 45;    // km/h, moyenne estimée
export const DAY_HOURS = 12;    // fenêtre de journée : 8h–20h
export const MEAL_RESERVE = 1.5;
export const MAX_ACTIVITIES = 4;

export const distanceKm = (a: Place, b: Place) => {
  const R = 6371;
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};

export type Warning =
  | { code: "too_many"; n: number; name: string }
  | { code: "too_long"; h: number }
  | { code: "no_meal" }
  | { code: "long_leg"; h: number; from: string; to: string };

export function dayStats(stops: Place[]) {
  const legs: { from: string; to: string; km: number; h: number }[] = [];
  for (let i = 1; i < stops.length; i++) {
    const km = distanceKm(stops[i - 1], stops[i]) * ROAD_FACTOR;
    legs.push({ from: stops[i - 1].name, to: stops[i].name, km, h: km / AVG_SPEED });
  }
  const travelH = legs.reduce((s, l) => s + l.h, 0);
  const activityH = stops.reduce((s, p) => s + p.hours, 0);
  const activities = stops.filter((p) => p.type !== "stay");
  const nights = stops.filter((p) => p.type === "stay").length;
  const cost = stops.reduce((s, p) => s + p.price, 0);
  const costEstimated = stops.some((p) => p.estimated);
  const freeH = DAY_HOURS - travelH - activityH;

  const warnings: Warning[] = [];
  if (activities.length > MAX_ACTIVITIES) {
    warnings.push({ code: "too_many", n: activities.length, name: activities[activities.length - 1].name });
  }
  if (freeH < 0) warnings.push({ code: "too_long", h: travelH + activityH });
  else if (stops.length > 0 && freeH < MEAL_RESERVE) warnings.push({ code: "no_meal" });
  legs.filter((l) => l.h > 2.5).forEach((l) => warnings.push({ code: "long_leg", h: l.h, from: l.from, to: l.to }));

  return {
    legs,
    travelH,
    activityH,
    freeH,
    activities: activities.length,
    nights,
    cost,
    costEstimated,
    km: legs.reduce((s, l) => s + l.km, 0),
    warnings,
  };
}
