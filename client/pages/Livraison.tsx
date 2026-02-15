import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Package, Clock, MapPin, CreditCard, Shield, CheckCircle, Globe } from "lucide-react";

const Livraison = () => {
  const { t } = useLanguage();

  const deliveryOptions = [
    {
      icon: Truck,
      title: t("livraison.standard"),
      time: "3-5 jours ouvrés",
      price: "5.90 €",
      freeFrom: "50 €"
    },
    {
      icon: Package,
      title: t("livraison.express"),
      time: "24-48h",
      price: "12.90 €",
      freeFrom: null
    },
    {
      icon: Clock,
      title: t("livraison.pointRelais"),
      time: "3-5 jours ouvrés",
      price: "3.90 €",
      freeFrom: "30 €"
    },
    {
      icon: Globe,
      title: t("livraison.internationale"),
      time: "7-15 jours",
      price: "À partir de 15 €",
      freeFrom: null
    }
  ];

  const deliverySteps = [
    {
      icon: CheckCircle,
      title: t("livraison.step1"),
      description: t("livraison.step1Desc")
    },
    {
      icon: Package,
      title: t("livraison.step2"),
      description: t("livraison.step2Desc")
    },
    {
      icon: Truck,
      title: t("livraison.step3"),
      description: t("livraison.step3Desc")
    },
    {
      icon: MapPin,
      title: t("livraison.step4"),
      description: t("livraison.step4Desc")
    }
  ];

  const deliveryZones = [
    { zone: "France métropolitaine", delay: "3-5 jours", price: "5.90 €", free: "50 €" },
    { zone: "Belgique, Luxembourg", delay: "4-6 jours", price: "7.90 €", free: "60 €" },
    { zone: "Suisse", delay: "5-7 jours", price: "9.90 €", free: "80 €" },
    { zone: "Autres pays UE", delay: "6-10 jours", price: "12.90 €", free: "100 €" },
    { zone: "International", delay: "7-15 jours", price: "À partir de 15 €", free: "150 €" }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* En-tête */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{t("livraison.title")}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {t("livraison.subtitle")}
        </p>
      </div>

      {/* Options de livraison */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {deliveryOptions.map((option, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <option.icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">{option.title}</CardTitle>
              <CardDescription>{option.time}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold mb-2">{option.price}</p>
              {option.freeFrom && (
                <p className="text-sm text-green-600 dark:text-green-400">
                  Gratuit à partir de {option.freeFrom}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Processus de livraison */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">{t("livraison.processTitle")}</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {deliverySteps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Zones de livraison */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">{t("livraison.zonesTitle")}</h2>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Zone</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Délai</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Tarif</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Livraison gratuite</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveryZones.map((zone, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-6 py-4">{zone.zone}</td>
                      <td className="px-6 py-4">{zone.delay}</td>
                      <td className="px-6 py-4">{zone.price}</td>
                      <td className="px-6 py-4">{zone.free}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Informations complémentaires */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              {t("livraison.shippingInfo")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• Suivi de colis inclus pour toutes les commandes</li>
              <li>• Assurance transport incluse jusqu'à 150 €</li>
              <li>• Emballage soigné et écologique</li>
              <li>• Livraison en point relais disponible</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              {t("livraison.paymentInfo")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• Paiement sécurisé par carte bancaire</li>
              <li>• PayPal accepté</li>
              <li>• Paiement en plusieurs fois disponible</li>
              <li>• Apple Pay et Google Pay</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Livraison;
