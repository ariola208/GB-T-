import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";

const Planifier = () => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-32">
        <div className="container mx-auto px-6">
          <PageHeader
            subtitle="Organisez votre voyage"
            title={t("planner.title", "Planifier mon voyage")}
            description={t(
              "planner.subtitle",
              "Construisez votre itinéraire idéal au Bénin, jour par jour."
            )}
          />
          <div className="mb-12 flex justify-center">
            <Badge className="bg-secondary/20 text-secondary-foreground">Bientôt disponible</Badge>
          </div>
          <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-8 text-center">
            <p className="text-lg text-muted-foreground">
              🎯 Le planificateur d'itinéraire (drag & drop, calcul de distances,
              export PDF) sera disponible dans la prochaine mise à jour.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Planifier;
