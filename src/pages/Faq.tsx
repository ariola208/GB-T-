import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Search,
  ChevronDown,
  MessageCircle,
  Mail,
  Phone,
  HelpCircle,
  Calendar,
  Compass,
  Shield,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type QAItem = { q: string; a: string };
type Category = { id: string; name: string; questions: QAItem[] };

const categoryIcons: Record<string, typeof HelpCircle> = {
  general: HelpCircle,
  reservations: Calendar,
  voyage: Compass,
  securite: Shield,
};

const QA = ({
  item,
  id,
  open,
  onToggle,
}: {
  item: QAItem;
  id: string;
  open: boolean;
  onToggle: (id: string) => void;
}) => (
  <Card flat className="overflow-hidden border-l-4 border-l-primary/30 transition-all duration-300 hover:border-l-primary hover:shadow-lg">
    <button
      onClick={() => onToggle(id)}
      aria-expanded={open}
      className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-muted/50"
    >
      <span className="font-medium">{item.q}</span>
      <ChevronDown
        className={`h-5 w-5 shrink-0 text-primary transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      />
    </button>
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="px-5 pb-5 leading-relaxed text-muted-foreground">{item.a}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </Card>
);

const Faq = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [openIds, setOpenIds] = useState<string[]>([]);

  const raw = t("faq.categories", { returnObjects: true }) as unknown;
  const categories: Category[] = Array.isArray(raw) ? (raw as Category[]) : [];

  const toggle = (id: string) =>
    setOpenIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));

  const q = searchQuery.trim().toLowerCase();
  const results = categories.flatMap((cat) =>
    cat.questions
      .map((item, i) => ({ item, id: `${cat.id}-${i}` }))
      .filter(({ item }) => item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q))
  );

  const contactCards = [
    { icon: Phone, title: t("faq.contact.phone.title"), main: "+229 01 54 06 94 54", sub: t("faq.contact.phone.hours") },
    { icon: Mail, title: t("faq.contact.email.title"), main: "contact@benin-tourisme.bj", sub: t("faq.contact.email.reply") },
    { icon: MessageCircle, title: t("faq.contact.whatsapp.title"), main: "+229 01 54 06 94 54", sub: t("faq.contact.whatsapp.instant") },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-20">
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/15 via-secondary/10 to-accent/10 py-20">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
          <div className="container relative mx-auto px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <Badge className="mb-4 bg-primary/10 text-primary">{t("faq.badge")}</Badge>
              <h1 className="mb-6 font-heading text-5xl font-bold md:text-6xl">{t("faq.title")}</h1>
              <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">{t("faq.subtitle")}</p>
              <div className="relative mx-auto max-w-xl">
                <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t("faq.search")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-border bg-background py-4 pl-14 pr-6 shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-primary focus:shadow-dramatic"
                />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-6">
            {q ? (
              <div className="mx-auto max-w-3xl">
                <h2 className="mb-6 font-heading text-2xl font-bold">{t("faq.results", { count: results.length })}</h2>
                <div className="space-y-4">
                  {results.length === 0 && <p className="text-muted-foreground">{t("faq.noresult")}</p>}
                  {results.map(({ item, id }) => (
                    <QA key={id} item={item} id={id} open={openIds.includes(id)} onToggle={toggle} />
                  ))}
                </div>
              </div>
            ) : (
              categories.length > 0 && (
                <Tabs defaultValue={categories[0].id} className="mx-auto max-w-4xl">
                  <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                    {categories.map((cat) => {
                      const Icon = categoryIcons[cat.id] ?? HelpCircle;
                      return (
                        <TabsTrigger key={cat.id} value={cat.id} className="flex items-center justify-center gap-2">
                          <Icon className="h-4 w-4" />
                          <span className="hidden md:inline">{cat.name}</span>
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>
                  {categories.map((cat) => (
                    <TabsContent key={cat.id} value={cat.id} className="mt-6 space-y-4">
                      {cat.questions.map((item, i) => {
                        const id = `${cat.id}-${i}`;
                        return (
                          <motion.div
                            key={id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            <QA item={item} id={id} open={openIds.includes(id)} onToggle={toggle} />
                          </motion.div>
                        );
                      })}
                    </TabsContent>
                  ))}
                </Tabs>
              )
            )}
          </div>
        </section>

        <section className="bg-muted/40 py-20">
          <div className="container mx-auto px-6">
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
              {contactCards.map((c) => (
                <Card key={c.title} className="group p-6 text-center">
                  <div className="mx-auto mb-4 inline-flex rounded-2xl bg-primary/10 p-4 text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                    <c.icon className="h-8 w-8" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{c.title}</h3>
                  <p className="text-muted-foreground">{c.main}</p>
                  <p className="text-sm text-muted-foreground">{c.sub}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 text-center">
          <div className="container mx-auto px-6">
            <HelpCircle className="mx-auto mb-6 h-16 w-16 text-primary animate-float" />
            <h2 className="mb-4 font-heading text-4xl font-bold">{t("faq.notfound.title")}</h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">{t("faq.notfound.text")}</p>
            <Button size="lg" asChild>
              <Link to="/contact">
                <Mail className="mr-2 h-4 w-4" />
                {t("faq.notfound.button")}
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Faq;
