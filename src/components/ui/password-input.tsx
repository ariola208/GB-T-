import { forwardRef, InputHTMLAttributes, useMemo, useState } from "react";
import { Eye, EyeOff, Lock, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
  showStrength?: boolean;
  hint?: string;
}

export function scorePassword(pwd: string) {
  const rules = {
    length: pwd.length >= 8,
    lower: /[a-z]/.test(pwd),
    upper: /[A-Z]/.test(pwd),
    digit: /[0-9]/.test(pwd),
    symbol: /[^A-Za-z0-9]/.test(pwd),
  };
  const passed = Object.values(rules).filter(Boolean).length;
  const score = pwd.length === 0 ? 0 : Math.min(4, Math.max(1, passed - 1));
  return { rules, score, passed };
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, showStrength = false, hint, className, onChange, value, ...props }, ref) => {
    const { t } = useTranslation();
    const [visible, setVisible] = useState(false);
    const [caps, setCaps] = useState(false);
    const pwd = typeof value === "string" ? value : "";
    const { rules, score } = useMemo(() => scorePassword(pwd), [pwd]);

    const strengthLabel = ["", "Faible", "Moyen", "Bon", "Excellent"][score];
    const strengthColor = ["", "bg-red-500", "bg-amber-500", "bg-lime-500", "bg-emerald-500"][score];

    return (
      <div>
        {label && <label className="mb-2 block font-body text-sm text-foreground">{label}</label>}
        <div className="relative">
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Lock className="h-4 w-4" />
          </div>
          <input
            ref={ref}
            type={visible ? "text" : "password"}
            value={value}
            onChange={(e) => {
              if (e.nativeEvent instanceof KeyboardEvent) {
                setCaps(e.nativeEvent.getModifierState?.("CapsLock") || false);
              }
              onChange?.(e);
            }}
            autoComplete={props.autoComplete ?? "current-password"}
            aria-invalid={!!error}
            className={cn(
              "w-full rounded-xl border bg-background/40 px-4 py-3 pl-10 pr-11 font-body text-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring transition",
              error ? "border-destructive" : "border-border",
              className
            )}
            {...props}
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted"
          >
            {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        {caps && <p className="mt-1 text-xs text-amber-600">⚠ {t("login.capslock", "Verr. Maj. activé")}</p>}
        {hint && !error && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
        {error && <p className="mt-1 text-sm text-destructive">{error}</p>}

        {showStrength && pwd.length > 0 && (
          <div className="mt-3 space-y-2">
            <div className="flex gap-1" aria-hidden>
              {[1, 2, 3, 4].map((i) => (
                <span key={i} className={cn("h-1.5 flex-1 rounded-full transition-colors", i <= score ? strengthColor : "bg-border")} />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">{t("login.strength", "Force")} : <span className="font-medium">{strengthLabel}</span></p>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
              {[
                ["length", t("login.rule_length", "8 caractères min.")],
                ["lower", t("login.rule_lower", "Une minuscule")],
                ["upper", t("login.rule_upper", "Une majuscule")],
                ["digit", t("login.rule_digit", "Un chiffre")],
                ["symbol", t("login.rule_symbol", "Un symbole")],
              ].map(([k, txt]) => {
                const ok = (rules as Record<string, boolean>)[k];
                return (
                  <li key={k} className={cn("flex items-center gap-1", ok ? "text-emerald-600" : "text-muted-foreground")}>
                    {ok ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}{txt}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
