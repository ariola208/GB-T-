import { useMemo } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CONTACT } from "@/lib/contact";
import { PHONE_DISPLAY, WHATSAPP_NUMBER, waLink } from "@/lib/whatsapp";

type FormData = { name: string; message: string; travelDate?: string; travelers?: string };
type Row = { icon: typeof Phone; title: string; content: React.ReactNode };

const Contact = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t("contact.errors.name")).max(100),
        message: z.string().min(10, t("contact.errors.message")).max(2000),
        travelDate: z.string().optional(),
        travelers: z.string().optional(),
      }),
    [t]
  );

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  // Le formulaire ouvre WhatsApp avec le message pré-rempli (rien n'est « envoyé » en coulisses).
  const onSubmit = (data: FormData) => {
    const text = [
      t("contact.wa_intro", { name: data.name }),
      data.message,
      data.travelDate ? t("contact.wa_dates", { v: data.travelDate }) : "",
      data.travelers ? t("contact.wa_travelers", { v: data.travelers }) : "",
    ].filter(Boolean).join("\n");
    window.open(waLink(text), "_blank", "noopener");
    toast({ title: t("contact.sent_title"), description: t("contact.sent_desc") });
    reset();
  };

  const rows = [
    { icon: Phone, title: t("contact.phone.title"), content: <a href={`tel:+${WHATSAPP_NUMBER}`} className="hover:underline">{PHONE_DISPLAY}</a> },
    { icon: MapPin, title: t("contact.location"), content: CONTACT.address || t("contact.location_value") },
    CONTACT.email ? { icon: Mail, title: t("contact.email.title"), content: <a href={`mailto:${CONTACT.email}`} className="hover:underline">{CONTACT.email}</a> } : null,
    CONTACT.hours ? { icon: Clock, title: t("contact.hours.title"), content: CONTACT.hours } : null,
  ].filter(Boolean) as Row[];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mb-14 max-w-2xl text-center">
            <h1 className="mb-4 font-heading text-5xl font-bold md:text-6xl">{t("contact.hero_title")}</h1>
            <p className="text-lg text-muted-foreground">{t("contact.hero_subtitle")}</p>
          </motion.div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {rows.map((r, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted"><r.icon className="h-5 w-5" /></div>
                    <div>
                      <h2 className="text-sm font-bold">{r.title}</h2>
                      <p className="text-muted-foreground">{r.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button size="lg" className="mt-8 w-full bg-[#25D366] text-white hover:bg-[#25D366]/90" asChild>
                <a href={waLink(t("whatsapp.greeting"))} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />{t("contact.whatsapp_cta")}
                </a>
              </Button>
            </div>

            <div className="lg:col-span-3">
              <Card flat className="p-8">
                <h2 className="mb-6 font-heading text-2xl font-bold">{t("contact.form.title")}</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <Input label={t("contact.form.name")} placeholder={t("contact.form.name_ph")} error={errors.name?.message} {...register("name")} />
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Input label={t("contact.form.date")} type="date" {...register("travelDate")} />
                    <Input label={t("contact.form.travelers")} type="number" min={1} placeholder="2" {...register("travelers")} />
                  </div>
                  <Textarea label={t("contact.form.message")} placeholder={t("contact.form.message_ph")} rows={6} error={errors.message?.message} {...register("message")} />
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs text-muted-foreground">{t("contact.form_note")}</p>
                    <Button type="submit" size="lg"><Send className="mr-2 h-4 w-4" />{t("contact.form.send")}</Button>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
