import { useEffect, useState } from "react";

const KEY = "vodoovista-visit-count";

export const useVisitorCount = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    try {
      const stored = parseInt(localStorage.getItem(KEY) || "0", 10);
      const next = stored + 1;
      localStorage.setItem(KEY, String(next));
      setCount(next);
    } catch {
      setCount(1);
    }
  }, []);

  return count;
};
