import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowDown, ArrowUp, BookMarked, Copy, MessageCircle, Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PLACES } from "@/data/places";
import { getFavs, getNotes, getTrip, setFavs, setNotes, setTrip } from "@/lib/carnet";
import { waLink } from "@/lib/whatsapp";
import { useToast } from "@/hooks/use-toast";

const Carnet = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [ids, setIds] = useState<number[]>(getFavs());
  const [notes, setNotesState] = useState<Record<string, string>>(getNotes());
  const [trip, setTripState] = useState(getTrip());

  const places = ids.map((id) => PLACES.find((p) => p.id === id)).filter(Boolean) as typeof PLACES;

  const save = (next: number[]) => { setIds(next); setFavs(next); };
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= ids.length) return;
    const next = [...ids];
    [next[i], next[j]] = [next[j], next[i]];
    save(next);
  };
  const remove = (id: number) => save(ids.filter((x) => x !== id));
  const note = (id: number, v: string) => { const n = { ...notes, [id]: v }; setNotesState(n); setNotes(n); };
  const updateTrip = (patch: Partial<typeof trip>) => { const n = { ...trip, ...patch }; setTripState(n); setTrip(n); };

  const summary = [
    t("notebook.wa_intro"),
    ...places.map((p, i) => `${i + 1}. ${p.name}${notes[p.id] ? ` (${notes[p.id]})` : ""}`),
    trip.dates ? t("notebook.wa_dates", { dates: trip.dates }) : "",
    trip.travelers ? t("notebook.wa_travelers", { n: trip.travelers }) : "",
  ].filter(Boolean).join("\n");

  const copy = async () => {
    try { await navigator.clipboard.writeText(summary); toast({ title: t("notebook.copied") }); } catch { /* ignore */ }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto max-w-3xl px-6">
          <div className="mb-10 text-center">
            <Badge className="mb-4"><BookMarked className="mr-1 h-3 w-3" />{t("notebook.count", { count: places.length })}</Badge>
            <h1 className="mb-4 font-heading text-4xl font-bold md:text-5xl">{t("notebook.title")}</h1>
            <p className="text-muted-foreground">{t("notebook.subtitle")}</p>
          </div>

          {places.length === 0 ? (
            <Card flat className="border-dashed">
              <CardContent className="p-10 text-center">
                <BookMarked className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
                <p className="mb-6">{t("notebook.empty")}</p>
                <Button asChild><Link to="/destinations">{t("notebook.empty_cta")}</Link></Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="space-y-3">
                {places.map((p, i) => (
                  <Card key={p.id} flat>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground text-sm font-bold text-background">{i + 1}</span>
                        <div className="flex-1">
                          <p className="font-bold">{p.name}</p>
                          <p className="text-xs text-muted-foreground">{p.region} · {t(`destinations.categories.${p.category}`)}</p>
                        </div>
                        <Button size="icon" variant="ghost" aria-label={t("notebook.up")} disabled={i === 0} onClick={() => move(i, -1)}><ArrowUp className="h-4 w-4" /></Button>
                        <Button size="icon" variant="ghost" aria-label={t("notebook.down")} disabled={i === places.length - 1} onClick={() => move(i, 1)}><ArrowDown className="h-4 w-4" /></Button>
                        <Button size="icon" variant="ghost" aria-label={t("notebook.remove")} className="text-destructive" onClick={() => remove(p.id)}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                      <input
                        value={notes[p.id] ?? ""}
                        onChange={(e) => note(p.id, e.target.value)}
                        placeholder={t("notebook.note_ph")}
                        className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="text-sm">
                  <span className="mb-1 block font-medium">{t("notebook.dates")}</span>
                  <input value={trip.dates} onChange={(e) => updateTrip({ dates: e.target.value })} placeholder={t("notebook.dates_ph")}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring" />
                </label>
                <label className="text-sm">
                  <span className="mb-1 block font-medium">{t("notebook.travelers")}</span>
                  <input type="number" min={1} value={trip.travelers} onChange={(e) => updateTrip({ travelers: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring" />
                </label>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" asChild>
                  <a href={waLink(summary)} target="_blank" rel="noopener noreferrer"><MessageCircle className="mr-2 h-4 w-4" />{t("notebook.send")}</a>
                </Button>
                <Button size="lg" variant="outline" onClick={copy}><Copy className="mr-2 h-4 w-4" />{t("notebook.copy")}</Button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">{t("notebook.stored")}</p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Carnet;
