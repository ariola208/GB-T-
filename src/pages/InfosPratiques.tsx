import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  ArrowLeftRight, Banknote, CalendarPlus, Car, ChevronLeft, ChevronRight,
  Clock, FileText, Languages, Phone, Plug, Syringe,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const RATE = 655.957;

const FACTS: { key: string; icon: typeof Languages }[] = [
  { key: "language", icon: Languages },
  { key: "currency", icon: Banknote },
  { key: "timezone", icon: Clock },
  { key: "electricity", icon: Plug },
  { key: "phone", icon: Phone },
  { key: "driving", icon: Car },
  { key: "health", icon: Syringe },
  { key: "entry", icon: FileText },
];

const easter = (y: number) => {
  const a = y % 19,
    b = Math.floor(y / 100),
    c = y % 100,
    d = Math.floor(b / 4),
    e = b % 4;
  const f = Math.floor((b + 8) / 25),
    g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30,
    i = Math.floor(c / 4),
    k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7,
    m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(Date.UTC(y, month - 1, day));
};
const addDays = (d: Date, n: number) => new Date(d.getTime() + n * 86400000);

const holidays = (y: number) => {
  const e = easter(y);
  const fixed = (m: number, d: number) => new Date(Date.UTC(y, m - 1, d));
  return [
    { key: "newyear", date: fixed(1, 1) },
    { key: "religions", date: fixed(1, 10) },
    { key: "easterMonday", date: addDays(e, 1) },
    { key: "labour", date: fixed(5, 1) },
    { key: "ascension", date: addDays(e, 39) },
    { key: "whitMonday", date: addDays(e, 50) },
    { key: "independence", date: fixed(8, 1) },
    { key: "assumption", date: fixed(8, 15) },
    { key: "allsaints", date: fixed(11, 1) },
    { key: "christmas", date: fixed(12, 25) },
  ].sort((a, b) => a.date.getTime() - b.date.getTime());
};

const ymd = (d: Date) => d.toISOString().slice(0, 10).replace(/-/g, "");

const Infos = () => {
  const { t, i18n } = useTranslation();
  const [amount, setAmount] = useState("100");
  const [dir, setDir] = useState<"eur" | "xof">("eur");
  const [year, setYear] = useState(new Date().getFullYear());

  const n = parseFloat(amount.replace(",", "."));
  const result = Number.isFinite(n) ? (dir === "eur" ? n * RATE : n / RATE) : null;
  const fmt = (v: number) =>
    v.toLocaleString(i18n.language, { maximumFractionDigits: dir === "eur" ? 0 : 2 });

  const list = holidays(year);

  const downloadIcs = () => {
    const stamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const events = list.map((h) =>
      [
        "BEGIN:VEVENT",
        `UID:${h.key}-${year}@vodoovista`,
        `DTSTAMP:${stamp}`,
        `DTSTART;VALUE=DATE:${ymd(h.date)}`,
        `SUMMARY:${t(`info.holidays.names.${h.key}`).replace(/([,;])/g, "\\$1")}`,
        "END:VEVENT",
      ].join("\r\n")
    );
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//VôdooVista//Jours feries//FR",
      ...events,
      "END:VCALENDAR",
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `jours-feries-benin-${year}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 text-center"
          >
            <h1 className="mb-4 font-heading text-4xl font-bold md:text-5xl">{t("info.title")}</h1>
            <p className="mb-2 text-muted-foreground">{t("info.subtitle")}</p>
            <p className="text-xs text-muted-foreground">{t("info.disclaimer")}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card flat className="mb-10">
              <CardContent className="p-6">
                <h2 className="mb-4 flex items-center gap-2 font-heading text-2xl font-bold">
                  <Banknote className="h-5 w-5" />
                  {t("info.converter.title")}
                </h2>
                <div className="flex flex-wrap items-end gap-3">
                  <label className="flex-1 text-sm">
                    <span className="mb-1 block font-medium">
                      {dir === "eur" ? t("info.converter.eur") : t("info.converter.xof")}
                    </span>
                    <input
                      inputMode="decimal"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-lg transition-all focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </label>
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="swap"
                    onClick={() => setDir(dir === "eur" ? "xof" : "eur")}
                    className="transition-transform hover:scale-110"
                  >
                    <ArrowLeftRight className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 rounded-lg bg-muted px-4 py-3">
                    <span className="block text-xs text-muted-foreground">
                      {dir === "eur" ? t("info.converter.xof") : t("info.converter.eur")}
                    </span>
                    <span className="text-lg font-bold">
                      {result === null ? "—" : t("info.converter.result", { value: fmt(result) })}
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">{t("info.converter.note")}</p>
              </CardContent>
            </Card>
          </motion.div>

          <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {FACTS.map(({ key, icon: Icon }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card
                  flat
                  className="group transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-dramatic"
                >
                  <CardContent className="flex gap-4 p-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-muted transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold">{t(`info.facts.${key}.title`)}</h3>
                      <p className="text-sm text-muted-foreground">
                        {t(`info.facts.${key}.text`)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card flat>
            <CardContent className="p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-heading text-2xl font-bold">{t("info.holidays.title")}</h2>
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    aria-label="prev"
                    onClick={() => setYear(year - 1)}
                    className="transition-transform hover:scale-110"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Badge className="px-3 py-1 text-sm">{year}</Badge>
                  <Button
                    size="icon"
                    variant="outline"
                    aria-label="next"
                    onClick={() => setYear(year + 1)}
                    className="transition-transform hover:scale-110"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <ul className="divide-y divide-border">
                {list.map((h) => (
                  <li
                    key={h.key}
                    className="flex flex-wrap items-center justify-between gap-2 py-3 transition-colors hover:bg-muted/40"
                  >
                    <span className="font-medium">{t(`info.holidays.names.${h.key}`)}</span>
                    <span className="text-sm capitalize text-muted-foreground">
                      {h.date.toLocaleDateString(i18n.language, {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        timeZone: "UTC",
                      })}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted-foreground">{t("info.holidays.note")}</p>
              <Button
                className="mt-4 transition-transform hover:scale-105"
                variant="outline"
                onClick={downloadIcs}
              >
                <CalendarPlus className="mr-2 h-4 w-4" />
                {t("info.holidays.download")}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Infos;
