import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";

const InfosPratiques = () => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-32">
        <div className="container mx-auto px-6">
          <PageHeader
            subtitle="Avant de partir"
            title={t("info.title", "Infos pratiques")}
            description={t(
              "info.subtitle",
              "Tout ce qu'il faut savoir pour préparer votre voyage au Bénin."
            )}
          />
          <div className="mb-12 flex justify-center">
            <Badge className="bg-secondary/20 text-secondary-foreground">Bientôt disponible</Badge>
          </div>
          <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-8 text-center">
            <p className="text-lg text-muted-foreground">
              📋 Visa, vaccins, monnaie, convertisseur €/FCFA, jours fériés…
              Toutes les infos pratiques arrivent bientôt.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InfosPratiques;
