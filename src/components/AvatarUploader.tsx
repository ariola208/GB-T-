import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Camera, Loader2, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const BACKEND_URL = API_URL.replace(/\/api$/, "");

type Props = {
  currentAvatar?: string | null;
  userName: string;
  onUploaded?: (url: string | null) => void;
};

const AvatarUploader = ({ currentAvatar, userName, onUploaded }: Props) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  const buildUrl = (av?: string | null) =>
    av ? (av.startsWith("http") ? av : `${BACKEND_URL}${av}`) : null;

  const [preview, setPreview] = useState<string | null>(buildUrl(currentAvatar));
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [imgError, setImgError] = useState(false);

  const initial = (userName || "?").charAt(0).toUpperCase();

  const uploadFile = async (file: File) => {
    if (!/image\/(jpeg|jpg|png|webp|gif)/.test(file.type)) {
      toast({
        title: t("avatar.error_format", "Format non supporté"),
        description: t("avatar.error_format_desc", "Utilise JPG, PNG, WEBP ou GIF."),
        variant: "destructive",
      });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: t("avatar.error_size", "Fichier trop lourd"),
        description: t("avatar.error_size_desc", "Maximum 5 Mo."),
        variant: "destructive",
      });
      return;
    }

    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);
    setImgError(false);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/profile/avatar`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        const fullUrl = `${BACKEND_URL}${data.avatar_url}`;
        setPreview(fullUrl);
        setImgError(false);
        onUploaded?.(data.avatar_url);
        toast({
          title: t("avatar.success", "Photo mise à jour ✅"),
          description: t("avatar.success_desc", "Votre nouvelle photo est en ligne."),
        });
      } else {
        throw new Error(data.error || "Erreur");
      }
    } catch (err: any) {
      setPreview(buildUrl(currentAvatar));
      toast({
        title: t("avatar.error_upload", "Échec de l'upload"),
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      URL.revokeObjectURL(localPreview);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  const handleRemove = async () => {
    if (!confirm(t("avatar.confirm_remove", "Supprimer votre photo de profil ?"))) return;
    setUploading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/profile/avatar`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setPreview(null);
        setImgError(false);
        onUploaded?.(null);
        toast({
          title: t("avatar.removed", "Photo supprimée"),
          description: t("avatar.removed_desc", "Votre avatar par défaut est restauré."),
        });
      }
    } catch {
      toast({ title: t("avatar.error_upload", "Erreur"), variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const showImage = preview && !imgError;

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => !uploading && inputRef.current?.click()}
        className={`group relative h-32 w-32 cursor-pointer overflow-hidden rounded-full border-4 shadow-lg transition-all duration-300 ${
          dragging
            ? "border-primary shadow-glow scale-105"
            : "border-background hover:shadow-dramatic"
        }`}
      >
        {showImage ? (
          <img
            src={preview!}
            alt={userName}
            onError={() => setImgError(true)}
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-full bg-foreground text-4xl font-bold text-background">
            {initial}
          </div>
        )}

        <div
          className={`pointer-events-none absolute inset-0 flex items-center justify-center bg-black/60 text-white transition-opacity ${
            uploading ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          {uploading ? (
            <Loader2 className="h-8 w-8 animate-spin" />
          ) : (
            <Camera className="h-8 w-8" />
          )}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="transition-transform hover:scale-105"
        >
          <Upload className="mr-2 h-4 w-4" />
          {showImage ? t("avatar.change", "Changer") : t("avatar.upload", "Ajouter une photo")}
        </Button>

        {showImage && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            disabled={uploading}
            className="text-destructive transition-transform hover:scale-105 hover:text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {t("avatar.remove", "Supprimer")}
          </Button>
        )}
      </div>

      <p className="text-center text-xs text-muted-foreground">
        {t(
          "avatar.hint",
          "Glissez une image ou cliquez pour choisir. JPG, PNG, WEBP ou GIF · 5 Mo max."
        )}
      </p>
    </div>
  );
};

export default AvatarUploader;
