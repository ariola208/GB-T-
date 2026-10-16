import { useState } from "react";
import {
  Share2, Printer, Check, Link2, MessageCircle,
  Facebook, Twitter, Mail,
} from "lucide-react";

type Props = {
  name: string;
  description: string;
  image?: string;
  slug: string;
};

const DestinationActions = ({ name, description, image, slug }: Props) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const url =
    typeof window !== "undefined"
      ? window.location.origin + "/destinations#" + slug
      : "";
  const shareText = name + " — " + description;

  const share = (platform: string) => {
    const text = encodeURIComponent(shareText);
    const u = encodeURIComponent(url);
    let target = "";
    switch (platform) {
      case "whatsapp":
        target = "https://wa.me/?text=" + text + "%20" + u;
        break;
      case "facebook":
        target = "https://www.facebook.com/sharer/sharer.php?u=" + u;
        break;
      case "twitter":
        target = "https://twitter.com/intent/tweet?text=" + text + "&url=" + u;
        break;
      case "email":
        target =
          "mailto:?subject=" +
          encodeURIComponent(name) +
          "&body=" +
          text +
          "%20" +
          u;
        break;
    }
    if (target) window.open(target, "_blank", "noopener,noreferrer");
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openPrintView = () => {
    const win = window.open("", "_blank", "width=800,height=900");
    if (!win) return;
    const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<title>${name} — LEGBAH</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: Georgia, serif; color: #0f1a14; padding: 48px; max-width: 800px; margin: 0 auto; }
  .header { background: #0f4c3a; color: #fff; padding: 32px; border-radius: 12px; margin-bottom: 32px; }
  .header h1 { font-size: 32px; margin-bottom: 6px; }
  .header p { opacity: 0.85; font-size: 14px; }
  h2 { font-size: 28px; margin-bottom: 12px; color: #0f4c3a; }
  .rule { height: 2px; background: linear-gradient(90deg, #0f4c3a, #d4a548); margin: 16px 0 24px; border-radius: 2px; }
  p.desc { font-size: 15px; line-height: 1.7; color: #333; margin-bottom: 24px; }
  .meta { background: #f5f3ee; border-radius: 12px; padding: 20px; font-size: 14px; color: #555; margin-bottom: 24px; }
  .meta strong { color: #0f1a14; display: block; margin-bottom: 4px; }
  .footer { border-top: 1px solid #ddd; padding-top: 16px; font-size: 12px; color: #888; margin-top: 32px; }
  img { max-width: 100%; border-radius: 12px; margin-bottom: 24px; }
  @media print {
    body { padding: 24px; }
    .header { break-inside: avoid; }
  }
</style>
</head>
<body>
  <div class="header">
    <h1>LEGBAH</h1>
    <p>Fiche destination — ${new Date().toLocaleDateString("fr-FR")}</p>
  </div>
  ${image ? '<img src="' + image + '" alt="' + name + '" />' : ""}
  <h2>${name}</h2>
  <div class="rule"></div>
  <p class="desc">${description}</p>
  <div class="meta">
    <strong>En savoir plus</strong>
    ${url}
  </div>
  <div class="footer">
    Document généré le ${new Date().toLocaleString("fr-FR")} depuis benin-tourisme — Pour enregistrer en PDF, choisissez « Enregistrer au format PDF » dans le dialogue d'impression.
  </div>
  <script>
    window.onload = function() {
      setTimeout(function() { window.print(); }, 300);
    };
  </script>
</body>
</html>`;
    win.document.open();
    win.document.write(html);
    win.document.close();
  };

  return (
    <div className="relative flex items-center gap-2">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Partager"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-foreground transition hover:bg-white"
      >
        <Share2 className="h-4 w-4" />
      </button>

      <button
        onClick={openPrintView}
        aria-label="Imprimer / PDF"
        title="Imprimer ou enregistrer en PDF"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-foreground transition hover:bg-white"
      >
        <Printer className="h-4 w-4" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-2xl border border-border bg-background shadow-dramatic">
            <div className="border-b border-border px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Partager
            </div>
            <button
              onClick={() => share("whatsapp")}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm transition hover:bg-muted"
            >
              <MessageCircle className="h-4 w-4 text-[#25D366]" />
              WhatsApp
            </button>
            <button
              onClick={() => share("facebook")}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm transition hover:bg-muted"
            >
              <Facebook className="h-4 w-4 text-[#1877F2]" />
              Facebook
            </button>
            <button
              onClick={() => share("twitter")}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm transition hover:bg-muted"
            >
              <Twitter className="h-4 w-4 text-[#1DA1F2]" />
              Twitter
            </button>
            <button
              onClick={() => share("email")}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm transition hover:bg-muted"
            >
              <Mail className="h-4 w-4" />
              Email
            </button>
            <button
              onClick={copyLink}
              className="flex w-full items-center gap-3 border-t border-border px-4 py-3 text-sm transition hover:bg-muted"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Link2 className="h-4 w-4" />
              )}
              {copied ? "Lien copié" : "Copier le lien"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DestinationActions;
