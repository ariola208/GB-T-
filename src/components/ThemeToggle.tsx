import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <span className="inline-block h-9 w-9" />;

  const isDark = resolvedTheme === "dark";
  const label = isDark ? t("common.theme_light") : t("common.theme_dark");
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border [border-color:color-mix(in_srgb,currentColor_25%,transparent)] transition hover:[background:color-mix(in_srgb,currentColor_12%,transparent)]"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
};

export default ThemeToggle;
