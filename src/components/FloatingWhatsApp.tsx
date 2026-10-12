import { useTranslation } from "react-i18next";
import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/whatsapp";

const FloatingWhatsApp = () => {
  const { t } = useTranslation();
  return (
    <a
      href={waLink(t("whatsapp.greeting"))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("whatsapp.label")}
      title={t("whatsapp.label")}
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-dramatic transition-all duration-300 hover:scale-105 hover:shadow-glow"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-300 group-hover:max-w-[12rem]">
        {t("whatsapp.label")}
      </span>
    </a>
  );
};

export default FloatingWhatsApp;
