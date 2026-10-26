import { useCallback, useEffect, useState } from "react";
import { PLACES } from "@/data/places";
import { getFavs, setFavs } from "@/lib/carnet";
import { hasLocal, localImg } from "@/lib/localImages";

export type Favorite = {
  id: number;
  name: string;
  slug: string;
  region: string;
  image?: string;
  rating?: number;
  description?: string;
};

const PHOTO: Record<string, string> = {
  ganvie: "ganvié.jpeg",
  "parc-pendjari": "pendjari.jpeg",
  ouidah: "ouidah.jpeg",
  abomey: "abomey.jpeg",
  "grand-popo": "grandpopo.jpeg",
  cotonou: "cotonou.jpeg",
  natitingou: "natitingou.jpeg",
  "porto-novo": "portonovo.jpeg",
};

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

  const favorites: Favorite[] = ids.flatMap((id) => {
    const p = PLACES.find((x) => Number(x.id) === id);
    if (!p) return [];
    const photo = PHOTO[p.slug];
    return [{
      id,
      name: p.name,
      slug: p.slug,
      region: p.region,
      image: photo && hasLocal(photo) ? localImg(photo) : undefined,
    }];
  });

  return {
    favorites,
    count: favorites.length,
    toggle,
    remove,
    clear: () => setFavs([]),
    isFavorite: (id: number | string) => ids.includes(Number(id)),
  };
};
