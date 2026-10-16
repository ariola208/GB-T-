import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowLeftRight, CalendarDays, Calculator } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const RATE = 655.957; // parité fixe officielle EUR / XOF

/** Prochain 10 janvier (Fête nationale du Vodoun) */
const nextFestival = () => {
  const now = new Date();
  let target = new Date(now.getFullYear(), 0, 10, 0, 0, 0);
  if (target.getTime() <= now.getTime()) target = new Date(now.getFullYear() + 1, 0, 10, 0, 0, 0);
  return target;
};

/**
 * Tarifs indicatifs par personne et par jour, en euros.
 * À ajuster selon tes vrais forfaits.
 */
const DAILY_RATES = { essential: 60, comfort: 120, luxury: 250 } as const;
type Style = keyof typeof DAILY_RATES;

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-ring";

const CurrencyConverter = () => {
  const { t, i18n } = useTranslation();
  const [eur, setEur] = useState("100");
  const nf = new Intl.NumberFormat(i18n.language, { maximumFractionDigits: 2 });

  const eurNum = parseFloat(eur.replace(",", "."));
  const xof = Number.isFinite(eurNum) ? Math.round(eurNum * RATE) : 0;

  const onXof = (v: string) => {
    const n = parseFloat(v.replace(",", "."));
    setEur(Number.isFinite(n) ? String(Math.round((n / RATE) * 100) / 100) : "");
  };

  return (
    <Card className="p-6">
      <div className="mb-5 flex items-center gap-3">
        <span className="rounded-xl bg-muted p-3"><ArrowLeftRight className="h-5 w-5" /></span>
        <h3 className="font-heading text-xl font-bold">{t("tools.currency.title")}</h3>
      </div>
      <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">{t("tools.currency.eur")}</label>
      <input className={inputClass} inputMode="decimal" value={eur} onChange={(e) => setEur(e.target.value)} />
      <label className="mb-1 mt-4 block text-xs uppercase tracking-wider text-muted-foreground">{t("tools.currency.xof")}</label>
      <input className={inputClass} inputMode="decimal" value={xof ? String(xof) : ""} onChange={(e) => onXof(e.target.value)} />
      <p className="mt-4 text-xs text-muted-foreground">{t("tools.currency.rate")}</p>
      <p className="mt-1 text-sm font-semibold">{nf.format(eurNum || 0)} € = {nf.format(xof)} FCFA</p>
    </Card>
  );
};

const Countdown = () => {
  const { t } = useTranslation();
  const [left, setLeft] = useState(() => nextFestival().getTime() - Date.now());

  useEffect(() => {
    const id = setInterval(() => setLeft(nextFestival().getTime() - Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const s = Math.max(0, Math.floor(left / 1000));
  const parts = [
    { k: "days", v: Math.floor(s / 86400) },
    { k: "hours", v: Math.floor((s % 86400) / 3600) },
    { k: "minutes", v: Math.floor((s % 3600) / 60) },
    { k: "seconds", v: s % 60 },
  ];

  return (
    <Card className="bg-foreground p-6 text-background hover:border-foreground">
      <div className="mb-5 flex items-center gap-3">
        <span className="rounded-xl bg-background/15 p-3"><CalendarDays className="h-5 w-5" /></span>
        <div>
          <h3 className="font-heading text-xl font-bold">{t("tools.countdown.title")}</h3>
          <p className="text-xs opacity-70">{t("tools.countdown.event")}</p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {parts.map((p) => (
          <div key={p.k} className="rounded-2xl bg-background/10 py-4 text-center">
            <p className="font-heading text-3xl font-bold tabular-nums">{String(p.v).padStart(2, "0")}</p>
            <p className="text-[10px] uppercase tracking-wider opacity-70">{t(`tools.countdown.${p.k}`)}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

const BudgetEstimator = () => {
  const { t, i18n } = useTranslation();
  const [style, setStyle] = useState<Style>("comfort");
  const [days, setDays] = useState(7);
  const [travelers, setTravelers] = useState(2);

  const discount = travelers >= 6 ? 0.9 : 1; // tarifs dégressifs à partir de 6 personnes
  const perPerson = DAILY_RATES[style] * days * discount;
  const total = perPerson * travelers;
  const nf = new Intl.NumberFormat(i18n.language, { maximumFractionDigits: 0 });

  return (
    <Card className="p-6">
      <div className="mb-5 flex items-center gap-3">
        <span className="rounded-xl bg-muted p-3"><Calculator className="h-5 w-5" /></span>
        <h3 className="font-heading text-xl font-bold">{t("tools.budget.title")}</h3>
      </div>

      <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">{t("tools.budget.style")}</p>
      <div className="mb-5 grid grid-cols-3 gap-2">
        {(Object.keys(DAILY_RATES) as Style[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStyle(s)}
            className={`rounded-xl border px-2 py-2.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${
              style === s ? "border-foreground bg-foreground text-background" : "border-border hover:bg-muted"
            }`}
          >
            {t(`tools.budget.${s}`)}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <div className="mb-1 flex justify-between text-sm">
          <span>{t("tools.budget.days")}</span>
          <span className="font-semibold">{days} {t("tools.budget.daysUnit")}</span>
        </div>
        <input type="range" min={2} max={21} value={days} onChange={(e) => setDays(+e.target.value)} className="w-full accent-foreground" />
      </div>

      <div className="mb-5">
        <div className="mb-1 flex justify-between text-sm">
          <span>{t("tools.budget.travelers")}</span>
          <span className="font-semibold">{travelers}</span>
        </div>
        <input type="range" min={1} max={12} value={travelers} onChange={(e) => setTravelers(+e.target.value)} className="w-full accent-foreground" />
      </div>

      <div className="rounded-2xl bg-muted p-4 text-center">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{t("tools.budget.total")}</p>
        <p className="font-heading text-4xl font-bold tabular-nums">{nf.format(total)} €</p>
        <p className="text-sm text-muted-foreground">
          ≈ {nf.format(total * RATE)} FCFA · {nf.format(perPerson)} € {t("tools.budget.perPerson")}
        </p>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">{t("tools.budget.note")}</p>
      <Button className="mt-4 w-full" asChild>
        <Link to="/contact">{t("tools.budget.cta")}</Link>
      </Button>
    </Card>
  );
};

const TravelTools = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-muted/40 py-24">
      <div className="container mx-auto px-6">
        <div className="mb-14 text-center">
          <p className="kicker mb-4">{t("tools.kicker")}</p>
          <h2 className="mb-4 font-heading text-4xl font-bold md:text-5xl">{t("tools.title")}</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">{t("tools.subtitle")}</p>
          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-foreground" />
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {[CurrencyConverter, Countdown, BudgetEstimator].map((C, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7 }}
            >
              <C />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelTools;
