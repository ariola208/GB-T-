import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { post } from "@/lib/api";

const NewsletterForm = ({ className = "" }: { className?: string }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      await post("/newsletter", { email });
      setEmail("");
      toast({ title: t("newsletter.ok") });
    } catch (err: any) {
      toast({ title: t("newsletter.error"), description: err.message, variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className={`flex gap-2 ${className}`}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("blog.email_ph")}
        className="min-w-0 flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
      <Button type="submit" loading={busy}>{t("blog.subscribe")}</Button>
    </form>
  );
};

export default NewsletterForm;
