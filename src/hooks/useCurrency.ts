import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Currency = "EUR" | "USD" | "GBP" | "XOF" | "CAD" | "CHF";

export const CURRENCIES: Record<
  Currency,
  { symbol: string; label: string; rateFromEUR: number; flag: string }
> = {
  EUR: { symbol: "€",  label: "Euro",              rateFromEUR: 1,        flag: "🇪🇺" },
  USD: { symbol: "$",  label: "US Dollar",         rateFromEUR: 1.08,     flag: "🇺🇸" },
  GBP: { symbol: "£",  label: "British Pound",     rateFromEUR: 0.85,     flag: "🇬🇧" },
  XOF: { symbol: "F",  label: "Franc CFA",         rateFromEUR: 655.957,  flag: "🌍" },
  CAD: { symbol: "C$", label: "Canadian Dollar",   rateFromEUR: 1.47,     flag: "🇨🇦" },
  CHF: { symbol: "CHF",label: "Swiss Franc",       rateFromEUR: 0.94,     flag: "🇨🇭" },
};

interface CurrencyState {
  currency: Currency;
  setCurrency: (c: Currency) => void;
}

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      currency: "EUR",
      setCurrency: (currency) => set({ currency }),
    }),
    { name: "currency" }
  )
);

export const convert = (amountEUR: number, to: Currency): number => {
  return amountEUR * CURRENCIES[to].rateFromEUR;
};

export const formatPrice = (
  amountEUR: number,
  to: Currency,
  options?: { decimals?: number; compact?: boolean }
): string => {
  const value = convert(amountEUR, to);
  const decimals = options?.decimals ?? (to === "XOF" ? 0 : 2);
  const symbol = CURRENCIES[to].symbol;

  if (options?.compact && value >= 1000) {
    const compact = value >= 1_000_000
      ? `${(value / 1_000_000).toFixed(1)}M`
      : `${(value / 1000).toFixed(1)}k`;
    return `${symbol}${compact}`;
  }

  const formatted = new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);

  return to === "XOF" ? `${formatted} ${symbol}` : `${symbol}${formatted}`;
};

export const useCurrency = () => {
  const { currency, setCurrency } = useCurrencyStore();
  return {
    currency,
    setCurrency,
    convert: (eur: number) => convert(eur, currency),
    format: (eur: number, opts?: { decimals?: number; compact?: boolean }) =>
      formatPrice(eur, currency, opts),
  };
};
