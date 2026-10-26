import { useQuery } from "@tanstack/react-query";

export const weatherKind = (c: number) =>
  c === 0 ? "clear" : c <= 3 ? "cloudy" : c <= 48 ? "fog" : c <= 82 ? "rain" : "storm";

export const useWeather = (lat = 6.37, lng = 2.39) =>
  useQuery({
    queryKey: ["weather", lat, lng],
    staleTime: 30 * 60 * 1000,
    queryFn: async () => {
      const r = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weather_code&timezone=Africa%2FLagos`
      );
      const d = await r.json();
      return { temp: Math.round(d.current.temperature_2m), kind: weatherKind(d.current.weather_code) };
    },
  });
