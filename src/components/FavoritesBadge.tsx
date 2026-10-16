import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";

type Props = {
  className?: string;
};

const FavoritesBadge = ({ className = "" }: Props) => {
  const { count } = useFavorites();

  return (
    <Link
      to="/favoris"
      aria-label="Mes favoris"
      title="Mes favoris"
      className={`relative flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-foreground/10 ${className}`}
    >
      <Heart className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary px-1 text-[10px] font-bold text-secondary-foreground shadow-md">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
};

export default FavoritesBadge;
