import { useEffect, useRef, useState } from "react";
import { Coins } from "lucide-react";
import { CURRENCIES, useCurrency, type Currency } from "@/hooks/useCurrency";

const CurrencySwitcher = () => {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Changer la devise"
        aria-expanded={open}
        className="h-9 px-3 inline-flex items-center gap-2 border border-border text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors duration-300"
      >
        <Coins className="w-4 h-4" />
        {currency}
      </button>
      {open && (
        <ul className="absolute right-0 mt-2 w-56 bg-background border border-border shadow-dramatic z-50 max-h-80 overflow-y-auto">
          {(Object.keys(CURRENCIES) as Currency[]).map((c) => (
            <li key={c}>
              <button
                type="button"
                onClick={() => { setCurrency(c); setOpen(false); }}
                className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 hover:bg-foreground hover:text-background transition-colors ${currency === c ? "font-bold" : ""}`}
              >
                <span className="text-lg">{CURRENCIES[c].flag}</span>
                <span className="flex-1">{CURRENCIES[c].label}</span>
                <span className="text-xs opacity-60">{c}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CurrencySwitcher;
