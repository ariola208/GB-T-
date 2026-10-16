import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight, Camera, Hotel, Map as MapIcon, MessageCircle, Plane, Users, Utensils } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { waLink } from "@/lib/whatsapp";

type Item = { title: string; description: string };
const icons = [Plane, Hotel, MapIcon, Users, Camera, Utensils];
const arr = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);

const Services = () => {
  const { t } = useTranslation();
  const items = arr<Item>(t("services.items", { returnObjects: true }));

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-28">
        <PageHeader
          subtitle={t("services.subtitle")}
          title={t("services.title")}
          description={t("services.description")}
          variant="centered"
        />

        <section className="pb-20">
          <div className="container mx-auto px-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {items.map((s, i) => {
                const Icon = icons[i] ?? Plane;
                return (
                  <motion.div key={i} variants={fadeInUp}>
                    <Card className="h-full">
                      <CardContent className="flex h-full flex-col p-8">
                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground text-background">
                          <Icon className="h-6 w-6" />
                        </div>
                        <h3 className="mb-3 font-heading text-2xl font-bold">{s.title}</h3>
                        <p className="mb-6 text-muted-foreground">{s.description}</p>
                        <Button variant="link" className="mt-auto justify-start p-0" asChild>
                          <a href={waLink(t("services.wa_message", { name: s.title }))} target="_blank" rel="noopener noreferrer">
                            {t("services.quote")}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        <section className="bg-muted/30 py-20">
          <div className="container mx-auto px-6 text-center">
            <MessageCircle className="mx-auto mb-4 h-12 w-12" />
            <h2 className="mb-3 font-heading text-3xl font-bold md:text-4xl">{t("services.cta_title")}</h2>
            <p className="mx-auto mb-8 max-w-xl text-muted-foreground">{t("services.cta_text")}</p>
            <Button size="lg" asChild>
              <a href={waLink(t("services.cta_message"))} target="_blank" rel="noopener noreferrer">{t("services.cta_button")}</a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
