import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AlertTriangle, Trash2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { api, ApiError, API_URL } from "@/lib/api";

const CONFIRM = "SUPPRIMER";

export const DeleteAccountDialog = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [pwd, setPwd] = useState("");
  const [txt, setTxt] = useState("");
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  if (!open) return null;
  const can = pwd.length >= 8 && txt === CONFIRM;

  const del = async () => {
    if (!can) return;
    setBusy(true); setErr("");
    try {
      await api.delete("/account");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast({ title: t("deleteAccount.success_title", "Compte supprimé") });
      navigate("/", { replace: true });
    } catch (e) {
      setErr(e instanceof ApiError ? e.message : "Erreur");
    } finally { setBusy(false); }
  };

  const exp = async () => {
    try {
      const tk = localStorage.getItem("token");
      const r = await fetch(`${API_URL}/account/export`, { headers: { Authorization: `Bearer ${tk}` } });
      if (!r.ok) throw new Error("Export impossible");
      const b = await r.blob();
      const u = URL.createObjectURL(b);
      const a = document.createElement("a");
      a.href = u; a.download = `legbah-export-${Date.now()}.json`; a.click();
      URL.revokeObjectURL(u);
    } catch (e: any) { toast({ title: e.message, variant: "destructive" }); }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/70" onClick={busy ? undefined : onClose} />
      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-destructive/40 bg-background p-6 shadow-dramatic">
        <div className="mb-4 flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-heading text-xl font-bold">{t("deleteAccount.title", "Supprimer mon compte")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t("deleteAccount.intro", "Action irréversible.")}</p>
          </div>
        </div>
        <div className="space-y-4">
          <PasswordInput id="dp" label={t("deleteAccount.password", "Mot de passe actuel")} value={pwd} onChange={(e) => setPwd(e.target.value)} />
          <div>
            <label className="mb-2 block text-sm">{t("deleteAccount.confirm_label", { word: CONFIRM, defaultValue: `Tapez ${CONFIRM} pour confirmer` })}</label>
            <input value={txt} onChange={(e) => setTxt(e.target.value.toUpperCase())} placeholder={CONFIRM} className="w-full rounded-xl border border-border bg-background px-4 py-3 font-mono uppercase focus:ring-2 focus:ring-ring" />
          </div>
          <Textarea label={t("deleteAccount.reason", "Raison (facultatif)")} rows={2} value={reason} onChange={(e) => setReason(e.target.value)} />
          {err && <p className="text-sm text-destructive">{err}</p>}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button variant="outline" onClick={exp} disabled={busy} className="flex-1"><Download className="mr-2 h-4 w-4" />{t("deleteAccount.export", "Exporter mes données")}</Button>
          <Button variant="destructive" onClick={del} disabled={!can || busy} className="flex-1"><Trash2 className="mr-2 h-4 w-4" />{t("deleteAccount.confirm", "Supprimer")}</Button>
          <Button variant="ghost" onClick={onClose} disabled={busy} className="w-full">{t("deleteAccount.cancel", "Annuler")}</Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountDialog;
