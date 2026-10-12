import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import {
  MapPin, Phone, Mail, Clock, Send, Facebook, Instagram, Twitter, Youtube,
  MessageCircle, Users, Award, Shield,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { fadeInUp, staggerContainer } from "@/lib/animations";

type ContactForm = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  travelDate?: string;
  travelers?: string;
  budget?: string;
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "Youtube" },
];

const Contact = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t("contact.errors.name")).max(100),
        email: z.string().email(t("contact.errors.email")).max(255),
        phone: z.string().optional(),
        subject: z.string().min(3, t("contact.errors.subject")).max(100),
        message: z.string().min(10, t("contact.errors.message")).max(2000),
        travelDate: z.string().optional(),
        travelers: z.string().optional(),
        budget: z.string().optional(),
      }),
    [t]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({ resolver: zodResolver(schema) });

  const onSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    toast({ title: t("contact.toast.title"), description: t("contact.toast.desc") });
    reset();
    setIsSubmitting(false);
  };

  const features = [
    { icon: Users, key: "team" },
    { icon: Award, key: "certified" },
    { icon: Shield, key: "secure" },
  ];

  const contactInfo = [
    { icon: MapPin, title: t("contact.address.title"), lines: [t("contact.address.line1"), t("contact.address.line2")] },
    { icon: Phone, title: t("contact.phone.title"), lines: ["+229 01 54 06 94 54"] },
    { icon: Mail, title: t("contact.email.title"), lines: ["contact@benin-tourisme.bj", "reservations@benin-tourisme.bj"] },
    { icon: Clock, title: t("contact.hours.title"), lines: [t("contact.hours.line1"), t("contact.hours.line2")] },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <section className="relative h-[40vh] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/10 to-background" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <h1 className="mb-4 font-heading text-5xl font-bold md:text-7xl">{t("contact.hero_title")}</h1>
              <p className="mx-auto max-w-2xl px-6 font-body text-lg text-muted-foreground">
                {t("contact.hero_subtitle")}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="bg-muted/30 py-12">
          <div className="container mx-auto px-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 gap-8 md:grid-cols-3"
            >
              {features.map((f) => (
                <motion.div key={f.key} variants={fadeInUp} className="p-6 text-center">
                  <div className="mb-4 inline-flex rounded-full bg-foreground/5 p-4">
                    <f.icon className="h-8 w-8" />
                  </div>
                  <h3 className="mb-2 font-heading text-xl font-bold">{t(`contact.features.${f.key}.title`)}</h3>
                  <p className="text-muted-foreground">{t(`contact.features.${f.key}.desc`)}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-1"
              >
                <h2 className="mb-6 font-heading text-3xl font-bold">{t("contact.info_title")}</h2>
                <p className="mb-8 text-muted-foreground">{t("contact.info_text")}</p>

                <div className="space-y-6">
                  {contactInfo.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="rounded-lg bg-foreground/5 p-3">
                          <item.icon className="h-5 w-5" />
                        </div>
                      </div>
                      <div>
                        <h4 className="mb-1 font-bold">{item.title}</h4>
                        {item.lines.map((line, j) => (
                          <p key={j} className="text-muted-foreground">{line}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 border-t border-border pt-8">
                  <h4 className="mb-4 font-bold">{t("contact.follow")}</h4>
                  <div className="flex gap-3">
                    {socialLinks.map((s, i) => (
                      <a key={i} href={s.href} aria-label={s.label}
                        className="rounded-full bg-muted p-3 transition-colors hover:bg-foreground hover:text-background">
                        <s.icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                </div>

                <Card flat className="mt-8 bg-muted/40">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-green-500 p-3">
                        <MessageCircle className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="mb-2 font-bold">{t("contact.whatsapp.title")}</h4>
                        <p className="mb-3 text-sm text-muted-foreground">{t("contact.whatsapp.text")}</p>
                        <Button variant="outline" size="sm" asChild>
                          <a href="https://wa.me/2290154069454" target="_blank" rel="noopener noreferrer">
                            +229 01 54 06 94 54
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2"
              >
                <Card flat className="p-8">
                  <h3 className="mb-6 font-heading text-2xl font-bold">{t("contact.form.title")}</h3>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <Input label={t("contact.form.name")} placeholder={t("contact.form.name_ph")}
                        error={errors.name?.message} {...register("name")} />
                      <Input label={t("contact.form.email")} type="email" placeholder={t("contact.form.email_ph")}
                        error={errors.email?.message} {...register("email")} />
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <Input label={t("contact.form.phone")} placeholder="+229 01 54 06 94 54"
                        error={errors.phone?.message} {...register("phone")} />
                      <Input label={t("contact.form.subject")} placeholder={t("contact.form.subject_ph")}
                        error={errors.subject?.message} {...register("subject")} />
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                      <Input label={t("contact.form.date")} type="date" {...register("travelDate")} />
                      <Input label={t("contact.form.travelers")} type="number" placeholder="2" {...register("travelers")} />
                      <Input label={t("contact.form.budget")} placeholder="€€€" {...register("budget")} />
                    </div>

                    <Textarea label={t("contact.form.message")} placeholder={t("contact.form.message_ph")}
                      rows={8} error={errors.message?.message} {...register("message")} />

                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">{t("contact.form.required")}</p>
                      <Button type="submit" size="lg" loading={isSubmitting}>
                        <Send className="mr-2 h-4 w-4" />
                        {t("contact.form.send")}
                      </Button>
                    </div>
                  </form>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="container mx-auto px-6">
            <div className="h-[400px] overflow-hidden rounded-xl bg-muted">
              <iframe
                title={t("contact.map_title")}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1014195.4382375274!2d1.98232445!3d6.4966935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10238d0b5a6e6a45%3A0x4014cf6fccaa60f!2sCotonou%2C%20B%C3%A9nin!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
