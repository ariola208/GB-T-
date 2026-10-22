import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
}

export const LoadingSpinner = ({ className, size = "md", fullScreen = false }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "h-6 w-6 border-2",
    md: "h-12 w-12 border-4",
    lg: "h-16 w-16 border-4",
  };

  const spinner = (
    <div
      className={cn(
        "animate-spin rounded-full border-foreground border-t-transparent",
        sizeClasses[size],
        className
      )}
    />
  );

  if (fullScreen) {
    return <div className="flex h-screen w-full items-center justify-center">{spinner}</div>;
  }
  return <div className="flex h-full w-full items-center justify-center p-4">{spinner}</div>;
};
