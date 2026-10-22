import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MessageCircle,
  Users,
  Award,
  Shield,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageHeader } from "@/components/ui/page-header";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères").max(100),
  email: z.string().email("Email invalide").max(255),
  phone: z.string().optional(),
  subject: z.string().min(3, "Le sujet est requis").max(100),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères").max(2000),
  travelDate: z.string().optional(),
  travelers: z.string().optional(),
  budget: z.string().optional(),
});

type ContactForm = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: MapPin,
    title: "Adresse",
    lines: ["Avenue Jean-Paul II", "Cotonou, Bénin"],
  },
  {
    icon: Phone,
    title: "Téléphone",
    lines: ["+229 97 12 34 56", "+229 94 87 65 43"],
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["contact@benin-tourisme.bj", "reservations@benin-tourisme.bj"],
  },
  {
    icon: Clock,
    title: "Horaires",
    lines: ["Lun - Ven: 8h - 18h", "Sam: 9h - 15h"],
  },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "Youtube" },
];

const features = [
  {
    icon: Users,
    title: "Équipe locale",
    description: "Des experts passionnés qui connaissent chaque recoin du Bénin",
  },
  {
    icon: Award,
    title: "Certifié",
    description: "Agence agréée par le Ministère du Tourisme du Bénin",
  },
  {
    icon: Shield,
    title: "Voyage sécurisé",
    description: "Partenaires vérifiés et assurance voyage incluse",
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast({
      title: "✨ Message envoyé avec succès !",
      description: "Notre équipe vous répondra dans les 24h.",
    });
    
    reset();
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative h-[40vh] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-background" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="font-heading text-5xl md:text-7xl font-bold mb-4">
                Contactez-nous
              </h1>
              <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto px-6">
                Notre équipe est là pour vous aider à créer le voyage de vos rêves au Bénin
              </p>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="text-center p-6"
                >
                  <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Info de contact */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-1"
              >
                <h2 className="font-heading text-3xl font-bold mb-6">
                  Parlons de votre projet
                </h2>
                <p className="text-muted-foreground mb-8">
                  Que vous ayez une question, une demande de devis ou simplement envie d'en savoir plus, nous sommes à votre écoute.
                </p>

                <div className="space-y-6">
                  {contactInfo.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <item.icon className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">{item.title}</h4>
                        {item.lines.map((line, j) => (
                          <p key={j} className="text-muted-foreground">{line}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-8 border-t border-border">
                  <h4 className="font-bold mb-4">Suivez-nous</h4>
                  <div className="flex gap-3">
                    {socialLinks.map((social, i) => (
                      <a
                        key={i}
                        href={social.href}
                        aria-label={social.label}
                        className="p-3 bg-muted rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <Card className="mt-8 bg-primary/5 border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-green-500 rounded-full">
                        <MessageCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-2">WhatsApp</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Préférez-vous discuter directement ? Contactez-nous sur WhatsApp !
                        </p>
                        <Button variant="outline" size="sm" asChild>
                          <a href="https://wa.me/22997123456" target="_blank" rel="noopener noreferrer">
                            +229 97 12 34 56
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Formulaire */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2"
              >
                <Card className="p-8">
                  <h3 className="font-heading text-2xl font-bold mb-6">
                    Envoyez-nous un message
                  </h3>
                  
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Nom complet *"
                        placeholder="Jean Kouagou"
                        error={errors.name?.message}
                        {...register("name")}
                      />
                      <Input
                        label="Email *"
                        type="email"
                        placeholder="jean@email.com"
                        error={errors.email?.message}
                        {...register("email")}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Téléphone"
                        placeholder="+229 97 12 34 56"
                        error={errors.phone?.message}
                        {...register("phone")}
                      />
                      <Input
                        label="Sujet *"
                        placeholder="Demande d'information"
                        error={errors.subject?.message}
                        {...register("subject")}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Input
                        label="Date de voyage"
                        type="date"
                        error={errors.travelDate?.message}
                        {...register("travelDate")}
                      />
                      <Input
                        label="Nombre de voyageurs"
                        type="number"
                        placeholder="2"
                        error={errors.travelers?.message}
                        {...register("travelers")}
                      />
                      <Input
                        label="Budget estimé"
                        placeholder="€€€"
                        error={errors.budget?.message}
                        {...register("budget")}
                      />
                    </div>

                    <Textarea
                      label="Message *"
                      placeholder="Décrivez votre projet de voyage, vos envies, vos questions..."
                      rows={8}
                      error={errors.message?.message}
                      {...register("message")}
                    />

                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        * Champs obligatoires
                      </p>
                      <Button type="submit" size="lg" loading={isSubmitting}>
                        <Send className="w-4 h-4 mr-2" />
                        Envoyer le message
                      </Button>
                    </div>
                  </form>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="pb-20">
          <div className="container mx-auto px-6">
            <div className="rounded-xl overflow-hidden h-[400px] bg-muted">
              <iframe
                title="Carte du Bénin"
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
