import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Compass, Heart, LogIn, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  user: { name?: string; email?: string } | null;
  isLoggedIn: boolean;
  onLogout: () => void;
};

const UserMenu = ({ user, isLoggedIn, onLogout }: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (!isLoggedIn) {
    return (
      <button
        onClick={() => navigate("/login")}
        aria-label={t("nav.login")}
        className="inline-flex h-9 items-center gap-2 rounded-full bg-foreground px-3.5 text-sm font-medium text-background transition hover:scale-105 hover:opacity-90"
      >
        <LogIn className="h-4 w-4" />
        <span className="hidden md:inline">{t("nav.login")}</span>
      </button>
    );
  }

  const initial = (user?.name || "?").trim().charAt(0).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={t("nav.my_account", "Mon compte")}
        className="relative flex h-9 w-9 items-center justify-center rounded-full bg-foreground font-heading text-sm font-bold text-background outline-none ring-offset-2 ring-offset-background transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring"
      >
        {initial}
        <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-emerald-500" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64 rounded-2xl p-2">
        <DropdownMenuLabel className="flex items-center gap-3 px-2 py-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground font-heading font-bold text-background">
            {initial}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold">{user?.name}</span>
            {user?.email && (
              <span className="block truncate text-xs font-normal text-muted-foreground">{user.email}</span>
            )}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer gap-3 rounded-xl px-3 py-2.5">
          <User className="h-4 w-4" />
          {t("nav.profile")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer gap-3 rounded-xl px-3 py-2.5">
          <Compass className="h-4 w-4" />
          {t("nav.my_trips", "Mes voyages")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer gap-3 rounded-xl px-3 py-2.5">
          <Heart className="h-4 w-4" />
          {t("nav.favorites", "Mes favoris")}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={onLogout}
          className="cursor-pointer gap-3 rounded-xl px-3 py-2.5 text-red-500 focus:text-red-500"
        >
          <LogOut className="h-4 w-4" />
          {t("nav.logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
