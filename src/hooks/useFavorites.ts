import { useEffect, useState, useCallback } from "react";

export type Favorite = {
  id: number | string;
  name: string;
  slug?: string;
  region?: string;
  image?: string;
  rating?: number;
  description?: string;
  addedAt: number;
};

const STORAGE_KEY = "benin-favorites";
const EVENT_NAME = "benin-favorites-changed";

const readFavorites = (): Favorite[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeFavorites = (favorites: Favorite[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  window.dispatchEvent(new CustomEvent(EVENT_NAME));
};

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Favorite[]>(() => readFavorites());

  useEffect(() => {
    const sync = () => setFavorites(readFavorites());
    window.addEventListener(EVENT_NAME, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT_NAME, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const add = useCallback((fav: Omit<Favorite, "addedAt">) => {
    const current = readFavorites();
    if (current.some((f) => f.id === fav.id)) return;
    const next = [{ ...fav, addedAt: Date.now() }, ...current];
    writeFavorites(next);
  }, []);

  const remove = useCallback((id: number | string) => {
    const next = readFavorites().filter((f) => f.id !== id);
    writeFavorites(next);
  }, []);

  const toggle = useCallback(
    (fav: Omit<Favorite, "addedAt">) => {
      const current = readFavorites();
      if (current.some((f) => f.id === fav.id)) {
        remove(fav.id);
      } else {
        add(fav);
      }
    },
    [add, remove]
  );

  const clear = useCallback(() => {
    writeFavorites([]);
  }, []);

  const isFavorite = useCallback(
    (id: number | string) => favorites.some((f) => f.id === id),
    [favorites]
  );

  return {
    favorites,
    count: favorites.length,
    add,
    remove,
    toggle,
    clear,
    isFavorite,
  };
};
