import { useCallback, useEffect, useState } from "react";
import { PLACES } from "@/data/places";
import { getFavs, setFavs } from "@/lib/carnet";

export const useFavorites = () => {
  const [ids, setIds] = useState<number[]>(getFavs);

  useEffect(() => {
    const sync = () => setIds(getFavs());
    window.addEventListener("benin-favorites-changed", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("benin-favorites-changed", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = useCallback((id: number | string) => {
    const n = Number(id);
    const cur = getFavs();
    setFavs(cur.includes(n) ? cur.filter((x) => x !== n) : [...cur, n]);
  }, []);

  const remove = useCallback((id: number | string) => {
    setFavs(getFavs().filter((x) => x !== Number(id)));
  }, []);

  const favorites = ids
    .map((id) => PLACES.find((p) => Number(p.id) === id))
    .filter(Boolean)
    .map((p) => ({ id: Number(p!.id), name: p!.name, slug: p!.slug, region: p!.region }));

  return {
    favorites,
    count: favorites.length,
    toggle,
    remove,
    clear: () => setFavs([]),
    isFavorite: (id: number | string) => ids.includes(Number(id)),
  };
};
