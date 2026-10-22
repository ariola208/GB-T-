import { Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Props = {
  title: string;
  url?: string;
};

const ShareButton = ({ title, url }: Props) => {
  const { toast } = useToast();

  const share = async () => {
    const shareUrl = url || window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url: shareUrl });
      } catch {
        /* annulé */
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast({ title: "Lien copié !" });
      } catch {
        toast({ title: "Impossible de copier", variant: "destructive" });
      }
    }
  };

  return (
    <button
      onClick={share}
      aria-label="Partager"
      className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm transition-all hover:bg-foreground hover:text-background"
    >
      <Share2 className="h-4 w-4" />
      Partager
    </button>
  );
};

export default ShareButton;
