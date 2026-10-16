import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BookMarked, Check, ExternalLink, MapPin, Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { COTONOU, PLACES, distKm, type Place } from "@/data/places";
import { getFavs, toggleFav } from "@/lib/carnet";

const Carte = () => {
  const { t } = useTranslation();
  const [params, setParams] = useSearchParams();
  const [sel, setSel] = useState<Place>(PLACES.find((p) => p.slug === params.get("lieu")) ?? PLACES[0]);
  const [favs, setFavsState] = useState<number[]>(getFavs());

  const choose = (p: Place) => { setSel(p); setParams({ lieu: p.slug }, { replace: true }); };
  const km = Math.round(distKm(COTONOU, sel));
  const dx = sel.span;
  const dy = sel.span * 0.6;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${sel.lon - dx}%2C${sel.lat - dy}%2C${sel.lon + dx}%2C${sel.lat + dy}&layer=mapnik&marker=${sel.lat}%2C${sel.lon}`;
  const inBook = favs.includes(sel.id);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-6">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <Badge className="mb-4">{t("map.badge")}</Badge>
            <h1 className="mb-4 font-heading text-4xl font-bold md:text-5xl">{t("map.title")}</h1>
            <p className="text-muted-foreground">{t("map.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{t("map.list")}</h2>
              <div className="space-y-2">
                {PLACES.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => choose(p)}
                    aria-current={sel.id === p.id}
                    className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${sel.id === p.id ? "border-foreground bg-foreground text-background" : "border-border hover:bg-muted"}`}
                  >
                    <MapPin className="h-4 w-4 shrink-0" />
                    <span className="flex-1">
                      <span className="block font-medium">{p.name}</span>
                      <span className={`block text-xs ${sel.id === p.id ? "text-background/70" : "text-muted-foreground"}`}>
                        {p.region} · {t(`destinations.categories.${p.category}`)}
                      </span>
                    </span>
                    {favs.includes(p.id) && <BookMarked className="h-4 w-4" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <Card flat className="overflow-hidden">
                <div className="h-[26rem] w-full bg-muted">
                  <iframe key={sel.slug} title={sel.name} src={src} className="h-full w-full border-0" loading="lazy" />
                </div>
                <CardContent className="space-y-4 p-6">
                  <div>
                    <h3 className="font-heading text-2xl font-bold">{sel.name}</h3>
                    <p className="text-sm text-muted-foreground">{sel.region} · {t(`destinations.categories.${sel.category}`)}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {sel.id === COTONOU.id ? t("map.start") : t("map.distance", { km })}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button asChild variant="outline">
                      <a href={`https://www.google.com/maps/search/?api=1&query=${sel.lat},${sel.lon}`} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />{t("map.open")}
                      </a>
                    </Button>
                    <Button onClick={() => setFavsState(toggleFav(sel.id))} variant={inBook ? "default" : "outline"}>
                      {inBook ? <Check className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
                      {inBook ? t("map.added") : t("map.add")}
                    </Button>
                    <Button asChild variant="ghost"><Link to="/carnet">{t("map.notebook")}</Link></Button>
                  </div>
                  <p className="text-xs text-muted-foreground">{t("map.offline")}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Carte;
