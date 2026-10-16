import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { Search, CornerDownLeft, FileText, Zap } from "lucide-react";
import { LANGUAGES, applyLanguage } from "@/lib/translate";

interface Props {
  open: boolean;
  onClose: () => void;
  links: { key: string; path: string }[];
}

type Item = { id: string; label: string; hint?: string; group: "pages" | "actions"; run: () => void };

const SearchPalette = ({ open, onClose, links }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { resolvedTheme, setTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items: Item[] = useMemo(() => {
    const pages: Item[] = links.map((l) => ({
      id: `page-${l.path}`,
      label: t(`nav.${l.key}`),
      group: "pages",
      run: () => navigate(l.path),
    }));
    const actions: Item[] = [
      {
        id: "theme",
        label: t("search.theme"),
        group: "actions",
        run: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
      },
      ...LANGUAGES.map<Item>((l) => ({
        id: `lang-${l.code}`,
        label: `${l.flag} ${l.label}`,
        hint: t("search.language"),
        group: "actions",
        run: () => applyLanguage(l.code),
      })),
    ];
    return [...pages, ...actions];
  }, [links, t, navigate, setTheme, resolvedTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.label} ${i.hint ?? ""}`.toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => setIndex(0), [query]);

  const choose = (item?: Item) => {
    if (!item) return;
    onClose();
    item.run();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      choose(filtered[index]);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  const renderGroup = (group: "pages" | "actions") => {
    const list = filtered.filter((i) => i.group === group);
    if (!list.length) return null;
    return (
      <div className="mb-2">
        <p className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          {t(`search.${group}`)}
        </p>
        {list.map((item) => {
          const active = filtered[index]?.id === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onMouseEnter={() => setIndex(filtered.findIndex((f) => f.id === item.id))}
              onClick={() => choose(item)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                active ? "bg-foreground text-background" : ""
              }`}
            >
              {group === "pages" ? <FileText className="h-4 w-4" /> : <Zap className="h-4 w-4" />}
              <span className="flex-1">{item.label}</span>
              {item.hint && <span className="text-xs opacity-60">{item.hint}</span>}
              {active && <CornerDownLeft className="h-3.5 w-3.5 opacity-70" />}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-start justify-center bg-black/60 px-4 pt-[15vh] backdrop-blur-sm"
          onMouseDown={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            onMouseDown={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-3xl border border-border bg-popover text-popover-foreground shadow-dramatic"
          >
            <div className="flex items-center gap-3 border-b border-border px-5">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder={t("search.placeholder")}
                className="h-14 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
              />
              <kbd className="rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">Esc</kbd>
            </div>
            <div className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-muted-foreground">{t("search.empty")}</p>
              ) : (
                <>
                  {renderGroup("pages")}
                  {renderGroup("actions")}
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchPalette;
