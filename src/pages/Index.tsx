import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Users, Shield, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import DestinationsPreview from "@/components/DestinationsPreview";
import CultureSection from "@/components/CultureSection";
import CTASection from "@/components/CTASection";
import { Card } from "@/components/ui/card";

const advantages = [
  { icon: Users, title: "home.experts_title", desc: "home.experts_desc" },
  { icon: Shield, title: "home.safe_title", desc: "home.safe_desc" },
  { icon: Heart, title: "home.custom_title", desc: "home.custom_desc" },
];

const Index = () => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <DestinationsPreview />

        <section className="bg-background py-24">
          <div className="container mx-auto px-6">
            <div className="mb-14 text-center">
              <h2 className="mb-4 font-heading text-4xl md:text-5xl font-bold">{t("home.why_title")}</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">{t("home.why_subtitle")}</p>
              <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-primary via-secondary to-accent" />
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {advantages.map((a, i) => (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.7 }}
                >
                  <Card className="group h-full p-8 text-center">
                    <div className="mb-6 inline-flex rounded-2xl bg-primary/10 p-5 text-primary transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                      <a.icon className="h-8 w-8" />
                    </div>
                    <h3 className="mb-3 font-heading text-2xl font-bold">{t(a.title)}</h3>
                    <p className="text-muted-foreground">{t(a.desc)}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CultureSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
