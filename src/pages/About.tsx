import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Users, Heart, Globe, Shield, Star, Calendar, Clock, MapPin, Phone, Mail,
  ArrowRight, CheckCircle, HandHeart,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { localImg } from "@/lib/localImages";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

const teamImg = localImg("cotonou.jpeg", "ouidah.jpeg");
const officeImg = localImg("cotonou.jpeg");
const missionImg = localImg("ganvié.jpeg", "abomey.jpeg");
const visionImg = localImg("pendjari.jpeg", "natitingou.jpeg");

const statIcons = [Calendar, Users, HandHeart, Star, Clock, MapPin];
const statNumbers = ["15+", "50K+", "200+", "100%", "24/7", "45+"];
const valueIcons = [Heart, Globe, Shield, Users];
const years = ["2010", "2013", "2015", "2018", "2020", "2024"];
const team = [
  { name: "Amoussoukpevi Ariola" },
  { name: "Sophie Mènou" },
  { name: "Marc Hounkpè" },
  { name: "Amina Yacoubou" },
  { name: "David Zinsou" },
  { name: "Grace Adjovi" },
];

const arr = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);

const About = () => {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const statLabels = arr<string>(t("about.stats", { returnObjects: true }));
  const points = arr<string>(t("about.vision.points", { returnObjects: true }));
  const values = arr<{ title: string; description: string }>(t("about.values", { returnObjects: true }));
  const milestones = arr<{ title: string; description: string }>(t("about.milestones", { returnObjects: true }));
  const members = arr<{ role: string; bio: string }>(t("about.members", { returnObjects: true }));

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section ref={heroRef} className="relative h-[70vh] overflow-hidden">
          <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="absolute inset-0">
            <img src={teamImg} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
          </motion.div>
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="px-6 text-center text-white">
              <Badge className="mb-6 border-white/30 bg-white/20 text-white">{t("about.hero_badge")}</Badge>
              <h1 className="mb-6 font-heading text-6xl font-bold md:text-8xl">{t("about.hero_title")}</h1>
              <p className="mx-auto max-w-3xl text-xl text-white/90 md:text-2xl">{t("about.hero_subtitle")}</p>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} className="absolute -bottom-12 left-0 right-0 z-20">
            <div className="container mx-auto px-6">
              <Card flat className="bg-background/95 shadow-xl backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
                    {statLabels.map((label, i) => {
                      const Icon = statIcons[i] ?? Star;
                      return (
                        <div key={i} className="text-center">
                          <Icon className="mx-auto mb-2 h-6 w-6" />
                          <p className="font-heading text-3xl font-bold">{statNumbers[i]}</p>
                          <p className="text-xs text-muted-foreground">{label}</p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </section>

        <div className="h-16" />

        <section className="py-20">
          <div className="container mx-auto px-6">
            <Tabs defaultValue="mission" className="space-y-12">
              <TabsList className="mx-auto grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="mission">{t("about.tabs.mission")}</TabsTrigger>
                <TabsTrigger value="vision">{t("about.tabs.vision")}</TabsTrigger>
                <TabsTrigger value="values">{t("about.tabs.values")}</TabsTrigger>
              </TabsList>

              <TabsContent value="mission">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                  <div>
                    <Badge className="mb-4">{t("about.mission.badge")}</Badge>
                    <h2 className="mb-6 font-heading text-4xl font-bold">{t("about.mission.title")}</h2>
                    <p className="mb-6 leading-relaxed text-muted-foreground">{t("about.mission.text")}</p>
                    <Button asChild>
                      <Link to="/destinations">{t("about.mission.cta")} <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </div>
                  <img src={missionImg} alt="" className="h-[400px] rounded-xl object-cover" />
                </div>
              </TabsContent>

              <TabsContent value="vision">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                  <img src={visionImg} alt="" className="order-2 h-[400px] rounded-xl object-cover lg:order-1" />
                  <div className="order-1 lg:order-2">
                    <Badge className="mb-4">{t("about.vision.badge")}</Badge>
                    <h2 className="mb-6 font-heading text-4xl font-bold">{t("about.vision.title")}</h2>
                    <ul className="space-y-3">
                      {points.map((p, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-foreground" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="values">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {values.map((v, i) => {
                    const Icon = valueIcons[i] ?? Heart;
                    return (
                      <Card key={i} className="text-center">
                        <CardContent className="p-6">
                          <div className="mb-4 inline-flex rounded-full bg-foreground/5 p-4">
                            <Icon className="h-8 w-8" />
                          </div>
                          <h3 className="mb-3 text-xl font-bold">{v.title}</h3>
                          <p className="text-sm text-muted-foreground">{v.description}</p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="bg-muted/30 py-20">
          <div className="container mx-auto mb-12 px-6 text-center">
            <Badge className="mb-4">{t("about.journey.badge")}</Badge>
            <h2 className="font-heading text-4xl font-bold">{t("about.journey.title")}</h2>
          </div>
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
              {milestones.map((m, i) => (
                <Card key={i}>
                  <CardContent className="p-4 text-center">
                    <p className="font-heading text-2xl font-bold">{years[i]}</p>
                    <p className="font-bold">{m.title}</p>
                    <p className="text-xs text-muted-foreground">{m.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Équipe retirée : à remettre avec de vraies personnes */}

        <section className="bg-muted/30 py-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div>
                <Badge className="mb-4">{t("about.office.badge")}</Badge>
                <h2 className="mb-6 font-heading text-4xl font-bold">{t("about.office.title")}</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3"><MapPin className="h-5 w-5" />Cotonou, Bénin</div>
                  <div className="flex items-center gap-3"><Phone className="h-5 w-5" />+229 01 54 06 94 54</div>
                  <div className="flex items-center gap-3"><Mail className="h-5 w-5" />contact@benin-tourisme.bj</div>
                </div>
                <Button className="mt-8" asChild>
                  <Link to="/contact">{t("about.office.button")} <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
              <img src={officeImg} alt="" className="h-64 rounded-xl object-cover" />
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-foreground/10 via-foreground/5 to-foreground/10 py-20 text-center">
          <div className="container mx-auto px-6">
            <HandHeart className="mx-auto mb-6 h-16 w-16" />
            <h2 className="mb-6 font-heading text-4xl font-bold">{t("about.cta.title")}</h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">{t("about.cta.text")}</p>
            <Button size="lg" asChild>
              <Link to="/destinations">{t("about.cta.button")} <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
