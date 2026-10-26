import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  AlertTriangle, ArrowDown, ArrowUp, GripVertical, Info, Link2, MessageCircle,
  Mountain, Plus, RotateCcw, X,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PLACES, PRESETS, TYPES, type PlaceType } from "@/data/places";
import { dayStats, DAY_HOURS, type Warning } from "@/lib/planner";
import { waLink } from "@/lib/whatsapp";

const STYLE: maplibregl.StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors",
    },
  },
  layers: [{ id: "osm", type: "raster", source: "osm" }],
};

const COLORS = ["#e11d48", "#2563eb", "#16a34a", "#d97706", "#7c3aed", "#0891b2", "#db2777"];
const MAX_DAYS = 7;
const byId = new Map(PLACES.map((p) => [p.id, p]));
const STORAGE_KEY = "legbah.trip";

const fmtH = (h: number) =>
  `${Math.floor(h)}h${String(Math.round((h % 1) * 60)).padStart(2, "0")}`;
const fcfa = (n: number) => `${n.toLocaleString("fr-FR")} FCFA`;

const PRESET_LIST = PRESETS.map((v) => ({
  ...v,
  total: v.days.reduce((sum, ids) => sum + dayStats(ids.map((id) => byId.get(id)!)).cost, 0),
}));

const loadInitial = (): string[][] => {
  const clean = (rows: unknown): string[][] | null => {
    if (!Array.isArray(rows)) return null;
    const out = rows
      .slice(0, MAX_DAYS)
      .map((r) =>
        Array.isArray(r)
          ? r.filter((id): id is string => typeof id === "string" && byId.has(id))
          : []
      );
    return out.length ? out : null;
  };
  try {
    const m = window.location.hash.match(/plan=([^&]*)/);
    if (m) {
      const rows = decodeURIComponent(m[1]).split("|").map((x) => (x ? x.split(",") : []));
      const c = clean(rows);
      if (c) return c;
    }
  } catch { /* ignore */ }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const c = clean(JSON.parse(raw));
      if (c) return c;
    }
  } catch { /* ignore */ }
  return [[], [], []];
};

const Planner = () => {
  const { t } = useTranslation();
  const tr = (k: string, d: string, o: Record<string, unknown> = {}) =>
    t(`planner.${k}`, { defaultValue: d, ...o }) as string;

  const [days, setDays] = useState<string[][]>(loadInitial);
  const [filter, setFilter] = useState<PlaceType | "all">("all");
  const [ready, setReady] = useState(false);
  const [overDay, setOverDay] = useState<number | null>(null);
  const [relief, setRelief] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const mapEl = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markers = useRef<maplibregl.Marker[]>([]);

  const stats = useMemo(() => days.map((ids) => dayStats(ids.map((id) => byId.get(id)!))), [days]);
  const total = stats.reduce((s, d) => s + d.cost, 0);
  const planned = useMemo(() => {
    const m = new Map<string, number>();
    days.forEach((ids, d) => ids.forEach((id) => m.set(id, d)));
    return m;
  }, [days]);

  // --- Actions sur le programme ---
  const assign = (id: string, d: number) =>
    setDays((prev) => {
      const next = prev.map((ds) => ds.filter((x) => x !== id));
      next[d] = [...next[d], id];
      return next;
    });
  const remove = (id: string) => setDays((prev) => prev.map((ds) => ds.filter((x) => x !== id)));
  const move = (d: number, i: number, dir: -1 | 1) =>
    setDays((prev) => {
      const next = prev.map((ds) => [...ds]);
      const j = i + dir;
      if (j < 0 || j >= next[d].length) return prev;
      [next[d][i], next[d][j]] = [next[d][j], next[d][i]];
      return next;
    });
  const addDay = () => setDays((prev) => (prev.length < MAX_DAYS ? [...prev, []] : prev));
  const reset = () => setDays([[], [], []]);

  // --- Carte : création ---
  useEffect(() => {
    if (!mapEl.current) return;
    const m = new maplibregl.Map({
      container: mapEl.current,
      style: STYLE,
      center: [2.3, 6.75],
      zoom: 7.4,
    });
    m.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
    m.on("load", () => {
      m.addSource("routes", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
      m.addLayer({
        id: "routes",
        type: "line",
        source: "routes",
        paint: { "line-color": ["get", "color"], "line-width": 4, "line-opacity": 0.85 },
      });
      setReady(true);
    });
    map.current = m;
    return () => {
      setReady(false);
      try { m.remove(); } catch { /* ignore */ }
      map.current = null;
    };
  }, []);

  // --- Carte : marqueurs et tracés ---
  useEffect(() => {
    const m = map.current;
    if (!m || !ready) return;
    const src = m.getSource("routes") as maplibregl.GeoJSONSource | undefined;
    if (!src) return;

    markers.current.forEach((x) => x.remove());
    markers.current = [];

    PLACES.forEach((p) => {
      const d = planned.get(p.id);
      const el = document.createElement("div");
      el.style.cssText =
        "width:26px;height:26px;border-radius:9999px;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.5);" +
        "display:flex;align-items:center;justify-content:center;color:#fff;font:600 12px sans-serif;" +
        `background:${d !== undefined ? COLORS[d % COLORS.length] : "#64748b"};`;
      if (d !== undefined) el.textContent = String(days[d].indexOf(p.id) + 1);
      markers.current.push(
        new maplibregl.Marker({ element: el })
          .setLngLat([p.lng, p.lat])
          .setPopup(new maplibregl.Popup({ offset: 16 }).setText(`${p.name} — ${p.city}`))
          .addTo(m)
      );
    });

    const features = days.flatMap((ids, i) =>
      ids.length > 1
        ? [{
            type: "Feature" as const,
            properties: { color: COLORS[i % COLORS.length] },
            geometry: {
              type: "LineString" as const,
              coordinates: ids.map((id) => [byId.get(id)!.lng, byId.get(id)!.lat]),
            },
          }]
        : []
    );
    src.setData({ type: "FeatureCollection", features });
  }, [days, ready, planned]);

  // Sauvegarde automatique
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(days)); } catch { /* ignore */ }
  }, [days]);

  // Relief 3D — chargement à la demande
  useEffect(() => {
    const m = map.current;
    if (!m || !ready) return;
    if (relief) {
      if (!m.getSource("dem")) {
        m.addSource("dem", {
          type: "raster-dem",
          tiles: ["https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"],
          encoding: "terrarium",
          tileSize: 256,
          maxzoom: 14,
          attribution: "Terrain Tiles on AWS",
        });
      }
      m.setTerrain({ source: "dem", exaggeration: 2 });
      m.easeTo({ pitch: 60, bearing: -20, duration: 1200 });
    } else if (m.getTerrain()) {
      // MapLibre ne supporte pas setTerrain(null) → on désactive via exaggeration 0
      m.setTerrain({ source: "dem", exaggeration: 0 });
      m.easeTo({ pitch: 0, bearing: 0, duration: 800 });
    }
  }, [relief, ready]);

  const planText = () =>
    days
      .map((ids, i) => (ids.length ? `Jour ${i + 1} : ${ids.map((id) => byId.get(id)!.name).join(" > ")}` : ""))
      .filter(Boolean)
      .join("\n");

  const shareUrl = () =>
    `${window.location.origin}/planifier#plan=${encodeURIComponent(days.map((x) => x.join(",")).join("|"))}`;

  const quoteMsg = () =>
    `Bonjour LEGBAH, je souhaite un devis pour ce voyage :\n${planText()}\nBudget estimé : ${fcfa(total)} par personne (estimation)\n${shareUrl()}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl());
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 1500);
    } catch { /* ignore */ }
  };

  const warnText = (w: Warning) => {
    switch (w.code) {
      case "too_many":
        return tr("w_too_many", "Journée chargée : {{n}} activités. Pense à déplacer « {{name}} » au lendemain.", { n: w.n, name: w.name });
      case "too_long":
        return tr("w_too_long", "Programme de {{h}} pour une journée de {{max}} : trop chargé.", { h: fmtH(w.h), max: `${DAY_HOURS} h` });
      case "no_meal":
        return tr("w_no_meal", "Moins de 1h30 de libre pour les repas et les pauses.");
      case "long_leg":
        return tr("w_long_leg", "Long trajet (~{{h}}) entre « {{from}} » et « {{to}} ».", { h: fmtH(w.h), from: w.from, to: w.to });
    }
  };

  const list = PLACES.filter((p) => filter === "all" || p.type === filter);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 px-4 pb-10 pt-24">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="font-heading text-3xl font-bold">{tr("title", "Planifier mon voyage")}</h1>
              <p className="text-sm text-muted-foreground">
                {tr("subtitle", "Glisse les lieux dans tes journées : distances, temps et budget se calculent seuls.")}
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={reset}>
              <RotateCcw className="mr-2 h-4 w-4" />
              {tr("reset", "Tout effacer")}
            </Button>
          </div>

          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold">{tr("versions", "Trois versions du voyage :")}</span>
            {PRESET_LIST.map((v) => (
              <Button key={v.key} variant="outline" size="sm" onClick={() => setDays(v.days.map((x) => [...x]))}>
                {v.label} · ~{fcfa(v.total)}
              </Button>
            ))}
            <span className="mx-1 hidden h-5 w-px bg-border sm:block" />
            <Button variant={relief ? "default" : "outline"} size="sm" onClick={() => setRelief((r) => !r)}>
              <Mountain className="mr-2 h-4 w-4" />
              {relief ? tr("relief_on", "Relief 3D : activé") : tr("relief", "Relief 3D")}
            </Button>
          </div>

          <p className="mb-4 flex items-start gap-2 rounded-xl border border-border bg-muted/40 p-3 text-xs text-muted-foreground">
            <Info className="mt-0.5 h-4 w-4 shrink-0" />
            {tr("demo_note", "Données de démonstration : lieux et coordonnées approximatifs, prix estimés (FCFA par personne), trajets calculés à vol d'oiseau avec un coefficient routier.")}
          </p>

          <div className="grid grid-cols-1 gap-4 lg:h-[calc(100vh-14rem)] lg:grid-cols-[300px_1fr_360px]">
            {/* Gauche : lieux */}
            <section aria-label="Liste des lieux" className="flex min-h-0 flex-col rounded-xl border border-border">
              <div className="flex flex-wrap gap-1.5 border-b border-border p-3">
                {[{ key: "all" as const, label: tr("all", "Tout") }, ...TYPES].map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    aria-pressed={filter === f.key}
                    className={`rounded-full border px-3 py-1 text-xs transition ${
                      filter === f.key
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:bg-muted"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <ul className="min-h-0 flex-1 space-y-2 overflow-y-auto p-3">
                {list.map((p) => {
                  const d = planned.get(p.id);
                  return (
                    <li
                      key={p.id}
                      draggable
                      onDragStart={(e) => e.dataTransfer.setData("text/plain", p.id)}
                      className="cursor-grab rounded-lg border border-border p-3 text-sm active:cursor-grabbing"
                    >
                      <div className="flex items-start gap-2">
                        <GripVertical className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold leading-tight">{p.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {p.city} · {p.hours > 0 ? fmtH(p.hours) : tr("night", "1 nuit")} · ~{fcfa(p.price)}
                          </p>
                        </div>
                        {d !== undefined && <Badge className="text-[10px]">J{d + 1}</Badge>}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {days.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => assign(p.id, i)}
                            aria-label={tr("add_to_day", "Ajouter au jour {{n}}", { n: i + 1 })}
                            className="inline-flex items-center rounded-md border border-border px-2 py-0.5 text-[11px] hover:bg-muted"
                          >
                            <Plus className="mr-0.5 h-3 w-3" />J{i + 1}
                          </button>
                        ))}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* Centre : carte */}
            <section aria-label="Carte" className="min-h-[360px] overflow-hidden rounded-xl border border-border">
              <div ref={mapEl} className="h-full min-h-[360px] w-full" />
            </section>

            {/* Droite : programme */}
            <section aria-label="Programme" className="flex min-h-0 flex-col rounded-xl border border-border">
              <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-3">
                {days.map((ids, d) => {
                  const s = stats[d];
                  return (
                    <div
                      key={d}
                      onDragOver={(e) => { e.preventDefault(); setOverDay(d); }}
                      onDragLeave={() => setOverDay(null)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setOverDay(null);
                        const id = e.dataTransfer.getData("text/plain");
                        if (byId.has(id)) assign(id, d);
                      }}
                      className={`rounded-lg border p-3 transition ${
                        overDay === d ? "border-foreground bg-muted" : "border-border"
                      }`}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="flex items-center gap-2 font-bold">
                          <span
                            className="h-3 w-3 rounded-full"
                            style={{ background: COLORS[d % COLORS.length] }}
                            aria-hidden
                          />
                          {tr("day", "Jour {{n}}", { n: d + 1 })}
                        </h3>
                        <span className="text-xs text-muted-foreground">
                          {s.activities} {tr("activities", "activité(s)")}
                          {s.nights > 0 && ` · ${s.nights} ${tr("night_short", "nuit")}`}
                        </span>
                      </div>

                      {ids.length === 0 && (
                        <p className="rounded-md border border-dashed border-border p-3 text-center text-xs text-muted-foreground">
                          {tr("drop_here", "Dépose un lieu ici")}
                        </p>
                      )}

                      <ol className="space-y-1.5">
                        {ids.map((id, i) => {
                          const p = byId.get(id)!;
                          const leg = i > 0 ? s.legs[i - 1] : null;
                          return (
                            <li key={id}>
                              {leg && (
                                <p className="mb-1 ml-2 text-[11px] text-muted-foreground">
                                  ↓ ~{Math.round(leg.km)} km · ~{fmtH(leg.h)}
                                </p>
                              )}
                              <div className="flex items-center gap-1 rounded-md bg-muted/50 px-2 py-1.5 text-sm">
                                <span className="w-4 text-xs font-bold">{i + 1}</span>
                                <span className="min-w-0 flex-1 truncate">{p.name}</span>
                                <button
                                  onClick={() => move(d, i, -1)}
                                  aria-label="Monter"
                                  className="p-0.5 text-muted-foreground hover:text-foreground"
                                >
                                  <ArrowUp className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  onClick={() => move(d, i, 1)}
                                  aria-label="Descendre"
                                  className="p-0.5 text-muted-foreground hover:text-foreground"
                                >
                                  <ArrowDown className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  onClick={() => remove(id)}
                                  aria-label="Retirer"
                                  className="p-0.5 text-muted-foreground hover:text-foreground"
                                >
                                  <X className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </li>
                          );
                        })}
                      </ol>

                      {ids.length > 0 && (
                        <p className="mt-2 text-xs text-muted-foreground">
                          {tr("on_site", "Sur place")} {fmtH(s.activityH)} · {tr("travel", "trajets")}{" "}
                          {fmtH(s.travelH)} · {tr("free", "libre")}{" "}
                          {s.freeH >= 0 ? fmtH(s.freeH) : "0h00"} · ~{fcfa(s.cost)}
                        </p>
                      )}

                      {s.warnings.map((w, i) => (
                        <p
                          key={i}
                          className="mt-2 flex items-start gap-2 rounded-md border border-amber-500/40 bg-amber-500/10 p-2 text-xs"
                        >
                          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600" />
                          {warnText(w)}
                        </p>
                      ))}
                    </div>
                  );
                })}

                {days.length < MAX_DAYS && (
                  <Button variant="outline" size="sm" className="w-full" onClick={addDay}>
                    <Plus className="mr-2 h-4 w-4" />
                    {tr("add_day", "Ajouter un jour")}
                  </Button>
                )}
              </div>

              <div className="border-t border-border p-3">
                <p className="text-sm text-muted-foreground">{tr("budget", "Budget prévisionnel (par personne)")}</p>
                <p className="font-heading text-2xl font-bold">{fcfa(total)}</p>
                <p className="text-[11px] text-muted-foreground">{tr("estimate", "Estimation, pas un tarif contractuel.")}</p>
                {total > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button size="sm" asChild>
                      <a href={waLink(quoteMsg())} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        {tr("quote", "Demander un devis")}
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" onClick={copyLink}>
                      <Link2 className="mr-2 h-4 w-4" />
                      {linkCopied ? tr("copied", "Lien copié") : tr("copy_link", "Copier le lien")}
                    </Button>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Planner;
