import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Plane, Hotel, Users, Camera, Utensils, Shield, Headphones, Map,
  Calendar, CreditCard, ChevronRight, Check,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fadeInUp, staggerContainer } from "@/lib/animations";

type Item = { title: string; description: string; features: string[]; price: string };
type Pack = { name: string; price: string; duration: string; features: string[] };
type Guarantee = { title: string; desc: string };

const serviceIcons = [Plane, Hotel, Map, Users, Camera, Utensils];
const popularIdx = [0, 2];
const guaranteeIcons = [Shield, Headphones, CreditCard, Users];

const asArray = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);

const Services = () => {
  const { t } = useTranslation();
  const items = asArray<Item>(t("services.items", { returnObjects: true }));
  const packages = asArray<Pack>(t("services.packages", { returnObjects: true }));
  const guarantees = asArray<Guarantee>(t("services.guarantees", { returnObjects: true }));

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <PageHeader
          subtitle={t("services.subtitle")}
          title={t("services.title")}
          description={t("services.description")}
          variant="centered"
        />

        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {items.map((service, i) => {
                const Icon = serviceIcons[i] ?? Plane;
                return (
                  <motion.div key={i} variants={fadeInUp}>
                    <Card className="relative h-full">
                      {popularIdx.includes(i) && (
                        <Badge className="absolute -top-3 left-4">{t("services.popular")}</Badge>
                      )}
                      <CardHeader>
                        <div className="mb-4 inline-block rounded-lg bg-foreground/5 p-3">
                          <Icon className="h-6 w-6" />
                        </div>
                        <CardTitle className="flex items-center justify-between gap-2">
                          {service.title}
                          <span className="text-sm font-normal text-muted-foreground">{service.price}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4 text-muted-foreground">{service.description}</p>
                        <ul className="space-y-2">
                          {service.features.map((f, j) => (
                            <li key={j} className="flex items-center gap-2 text-sm">
                              <Check className="h-4 w-4" />
                              {f}
                            </li>
                          ))}
                        </ul>
                        <Button variant="link" className="mt-4 p-0" asChild>
                          <Link to="/contact" className="flex items-center gap-1">
                            {t("services.book")}
                            <ChevronRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 font-heading text-4xl font-bold">{t("services.packages_title")}</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">{t("services.packages_text")}</p>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {packages.map((pkg, i) => {
                const recommended = i === 1;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className={`relative h-full ${recommended ? "border-2 border-foreground shadow-dramatic" : ""}`}>
                      {recommended && (
                        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">{t("services.recommended")}</Badge>
                      )}
                      <CardHeader className="text-center">
                        <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                        <div className="mt-4">
                          <span className="font-heading text-4xl font-bold">{pkg.price}</span>
                          <span className="text-muted-foreground"> {t("services.per_person")}</span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          <Calendar className="mr-1 inline h-4 w-4" />
                          {pkg.duration}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <ul className="mb-6 space-y-3">
                          {pkg.features.map((f, j) => (
                            <li key={j} className="flex items-center gap-2">
                              <Check className="h-4 w-4 flex-shrink-0" />
                              <span className="text-sm">{f}</span>
                            </li>
                          ))}
                        </ul>
                        <Button className="w-full" variant={recommended ? "default" : "outline"} asChild>
                          <Link to="/contact">{t("services.choose")}</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              {guarantees.map((g, i) => {
                const Icon = guaranteeIcons[i] ?? Shield;
                return (
                  <div key={i} className="text-center">
                    <div className="mb-4 inline-flex rounded-full bg-foreground/5 p-4">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h4 className="mb-2 font-bold">{g.title}</h4>
                    <p className="text-sm text-muted-foreground">{g.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
