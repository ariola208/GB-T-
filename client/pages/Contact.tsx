import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuler l'envoi du formulaire
    setTimeout(() => {
      toast({
        title: t("contact.success"),
        description: t("contact.successMessage"),
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    { icon: MapPin, title: t("contact.address"), details: "123 Rue du Marché, 75001 Paris, France" },
    { icon: Phone, title: t("contact.phone"), details: "+33 1 23 45 67 89" },
    { icon: Mail, title: t("contact.email"), details: "contact@marocmarket.com" },
    { icon: Clock, title: t("contact.hours"), details: "Lun-Ven: 9h-18h, Sam: 10h-16h" }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* En-tête */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{t("contact.title")}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {t("contact.subtitle")}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Informations de contact */}
        <div className="lg:col-span-1 space-y-6">
          {contactInfo.map((item, index) => (
            <Card key={index}>
              <CardContent className="flex items-start gap-4 p-6">
                <div className="bg-primary/10 p-3 rounded-full">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.details}</p>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Carte (optionnelle) */}
          <Card>
            <CardContent className="p-0 overflow-hidden h-48 rounded-lg">
              <iframe
                title="map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=2.3484%2C48.8534%2C2.3524%2C48.8564&layer=mapnik"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </CardContent>
          </Card>
        </div>

        {/* Formulaire de contact */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{t("contact.formTitle")}</CardTitle>
              <CardDescription>{t("contact.formDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      name="name"
                      placeholder={t("Entrez votre nom")}
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder={t("Entrez votre email")}
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Input
                    name="subject"
                    placeholder={t("Entrez votre sujet")}
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder={t("Entrez votre message")}
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {t("contact.sending")}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      {t("contact.send")}
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Section FAQ rapide */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">{t("contact.faqTitle")}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {t("Faq Description")}
        </p>
        <Button variant="outline" asChild>
          <a href="/faq">{t("Visiter la Faq")}</a>
        </Button>
      </div>
    </div>
  );
};

export default Contact;
