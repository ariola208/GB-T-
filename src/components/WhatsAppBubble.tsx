import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MessageCircle, X, Send } from "lucide-react";

const WHATSAPP_NUMBER = "2290154069454";

const WhatsAppBubble = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const defaultMessage = t("whatsapp.greeting", {
    defaultValue: "Bonjour LEGBAH, j'aimerais des informations pour organiser un voyage.",
  });

  const handleSend = () => {
    const text = message.trim() || defaultMessage;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
    setMessage("");
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
        onClick={() => setOpen(!open)}
        aria-label={t("whatsapp.label", { defaultValue: "Discuter sur WhatsApp" })}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-dramatic transition-transform hover:scale-110 active:scale-95"
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
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-red-500" />
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
            className="fixed bottom-28 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] overflow-hidden rounded-3xl border border-border bg-card shadow-dramatic"
          >
            <div className="bg-[#25D366] p-5 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-2xl">🇧🇯</div>
                <div>
                  <p className="font-bold">LEGBAH</p>
                  <p className="text-xs opacity-90">● En ligne · répond en ~5 min</p>
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="mb-4 rounded-2xl bg-muted/50 p-4">
                <p className="text-sm text-muted-foreground">
                  👋 Bonjour ! Une question sur votre voyage au Bénin ? Écrivez-nous, on vous répond directement.
                </p>
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
                className="w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm focus:border-[#25D366] focus:outline-none"
              />
              <button
                onClick={handleSend}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white transition hover:bg-[#1eb858] active:scale-[0.98]"
              >
                <Send className="h-4 w-4" />
                Envoyer sur WhatsApp
              </button>
              <p className="mt-3 text-center text-xs text-muted-foreground">Ouvert 7j/7 · 8h–20h (GMT+1)</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WhatsAppBubble;
