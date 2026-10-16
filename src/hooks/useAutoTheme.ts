import { useEffect } from "react";
import { useTheme } from "next-themes";

const MANUAL_KEY = "theme-manual";
const DAY_START = 7;
const DAY_END = 19;

export const useAutoTheme = () => {
  const { setTheme } = useTheme();

  useEffect(() => {
    const isManual = localStorage.getItem(MANUAL_KEY) === "true";
    if (isManual) return;

    const applyAuto = () => {
      const hour = new Date().getHours();
      const isNight = hour < DAY_START || hour >= DAY_END;
      setTheme(isNight ? "dark" : "light");
    };

    applyAuto();
    const interval = setInterval(applyAuto, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [setTheme]);
};

export const markThemeAsManual = () => {
  localStorage.setItem(MANUAL_KEY, "true");
};
