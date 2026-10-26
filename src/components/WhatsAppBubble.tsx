import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MessageCircle, X, Send } from "lucide-react";
import { waLink } from "@/lib/whatsapp";

const WhatsAppBubble = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const defaultMessage = t("whatsapp.greeting", {
    defaultValue: "Bonjour LEGBAH, j'aimerais des informations pour organiser un voyage.",
  });

  const handleSend = () => {
    const text = message.trim() || defaultMessage;
    window.open(waLink(text), "_blank", "noopener,noreferrer");
    setOpen(false);
    setMessage("");
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_40px_rgba(37,211,102,0.4)] transition-transform hover:scale-110 active:scale-95"
        aria-label="WhatsApp"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-7 w-7" />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="h-7 w-7" />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75" />
            <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-white bg-red-500" />
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="fixed bottom-28 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
          >
            <div className="bg-gradient-to-r from-[#128C7E] to-[#25D366] p-5 text-white">
              <div className="flex items-center gap-3">
                <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-2xl backdrop-blur-sm">
                  🇧🇯
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#128C7E] bg-green-400" />
                </div>
                <div>
                  <p className="text-lg font-bold leading-tight">LEGBAH</p>
                  <p className="text-xs text-white/80">En ligne • Répond en quelques minutes</p>
                </div>
              </div>
            </div>

            <div className="bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat p-5">
              <div className="relative mb-4 rounded-2xl rounded-tl-sm bg-background p-4 shadow-sm">
                <p className="text-sm text-muted-foreground">
                  {t("whatsapp.welcome", "👋 Bonjour ! Une question sur votre voyage au Bénin ? Écrivez-nous.")}
                </p>
                <span className="absolute -left-1 top-0 h-3 w-3 rotate-45 bg-background" />
              </div>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={defaultMessage}
                rows={3}
                className="w-full resize-none rounded-2xl border-none bg-background px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#25D366]/50"
              />
              
              <button
                onClick={handleSend}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 font-semibold text-white shadow-md transition hover:bg-[#1eb858] active:scale-[0.98]"
              >
                <Send className="h-4 w-4" />
                {t("whatsapp.send", "Envoyer sur WhatsApp")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WhatsAppBubble;
