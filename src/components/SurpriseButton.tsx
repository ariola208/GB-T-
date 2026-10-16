import { useTranslation } from "react-i18next";
import { Dices } from "lucide-react";

const SurpriseButton = () => {
  const { t } = useTranslation();

  const goRandom = () => {
    const slugs = [
      "ganvie",
      "pendjari",
      "ouidah",
      "abomey",
      "grand-popo",
      "cotonou",
      "natitingou",
      "porto-novo",
    ];
    const slug = slugs[Math.floor(Math.random() * slugs.length)];
    window.location.href = "/destinations#" + slug;
    setTimeout(() => {
      const el = document.getElementById(slug);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 300);
  };

  return (
    <button
      onClick={goRandom}
      className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:-translate-y-1 hover:border-secondary hover:shadow-dramatic"
    >
      <Dices className="h-4 w-4 text-secondary transition-transform group-hover:rotate-12" />
      {t("destinations.surprise", "Surprends-moi")}
    </button>
  );
};

export default SurpriseButton;
