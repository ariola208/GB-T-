import { forwardRef, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { LoadingSpinner } from "./loading-spinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link" | "destructive";
  size?: "sm" | "md" | "lg" | "icon";
  loading?: boolean;
  asChild?: boolean;
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = "default", 
    size = "md", 
    loading = false,
    className, 
    children, 
    disabled,
    asChild,
    ...props 
  }, ref) => {
    const variants = {
      default: "bg-foreground text-background hover:bg-foreground/90",
      outline: "border border-border bg-transparent hover:bg-muted",
      ghost: "bg-transparent hover:bg-muted",
      link: "bg-transparent underline-offset-4 hover:underline text-primary",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2",
      lg: "px-6 py-3 text-lg",
      icon: "p-2",
    };

    const Component = asChild ? "span" : "button";

    return (
      <Component
        ref={ref as any}
        className={cn(
          "inline-flex items-center justify-center font-body text-sm tracking-widest uppercase",
          "transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <LoadingSpinner size="sm" className="mr-2" />
            Chargement...
          </>
        ) : (
          children
        )}
      </Component>
    );
  }
);

Button.displayName = "Button";
