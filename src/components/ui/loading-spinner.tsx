import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
}

const sizeClasses = {
  sm: "h-6 w-6 border-2",
  md: "h-12 w-12 border-4",
  lg: "h-16 w-16 border-4",
};

export const LoadingSpinner = ({ className, size = "md", fullScreen = false }: LoadingSpinnerProps) => {
  const spinner = (
    <div
      role="status"
      aria-label="Chargement"
      className={cn("animate-spin rounded-full border-primary border-t-transparent", sizeClasses[size], className)}
    />
  );
  return fullScreen ? (
    <div className="flex h-screen w-full items-center justify-center">{spinner}</div>
  ) : (
    spinner
  );
};
