import { useEffect, useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "@/i18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const code = (i18n.resolvedLanguage || i18n.language || "fr").split("-")[0];
  const current = LANGUAGES.find((l) => l.code === code) || LANGUAGES[0];

  const handleChange = async (newCode: string) => {
    if (newCode === code) return;
    await i18n.changeLanguage(newCode);
    try {
      localStorage.setItem("lang", newCode);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = newCode;
    window.dispatchEvent(new Event("languageChanged"));
  };

  if (!mounted) {
    return <span className="inline-block h-9 w-9" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={t("common.language")}
        className="group inline-flex h-9 items-center gap-1.5 rounded-full border [border-color:color-mix(in_srgb,currentColor_25%,transparent)] px-2.5 text-xs font-medium uppercase tracking-wider outline-none transition-all hover:scale-105 hover:[border-color:color-mix(in_srgb,currentColor_55%,transparent)] hover:[background:color-mix(in_srgb,currentColor_12%,transparent)]"
      >
        <Globe className="h-4 w-4 transition-transform duration-500 group-hover:rotate-[20deg]" />
        <span className="text-base leading-none">{current.flag}</span>
        <span className="hidden sm:inline">{current.code}</span>
        <ChevronDown className="h-3 w-3 opacity-60 transition-transform group-data-[state=open]:rotate-180" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-60 rounded-2xl p-2">
        <DropdownMenuLabel className="flex items-center gap-2 px-2 pb-1 text-xs uppercase tracking-widest text-muted-foreground">
          <Globe className="h-3.5 w-3.5" />
          {t("common.language")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {LANGUAGES.map((l) => {
          const active = l.code === current.code;
          return (
            <DropdownMenuItem
              key={l.code}
              onClick={() => handleChange(l.code)}
              className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-all hover:scale-[1.02] ${
                active ? "bg-muted font-semibold" : ""
              }`}
            >
              <span className="text-xl leading-none">{l.flag}</span>
              <span className="flex-1">
                {l.label}
                {!l.complete && (
                  <span className="ml-2 rounded-full border border-border px-1.5 py-0.5 text-[9px] font-normal uppercase tracking-wide text-muted-foreground">
                    {t("common.translation_partial")}
                  </span>
                )}
              </span>
              {active && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
