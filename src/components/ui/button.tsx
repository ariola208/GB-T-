import { forwardRef, ButtonHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { LoadingSpinner } from "./loading-spinner";

export const buttonVariants = cva(
  "group relative inline-flex items-center justify-center overflow-hidden rounded-full font-body text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:-translate-y-0.5 active:scale-95 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none " +
    "before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent hover:before:animate-shine",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg hover:shadow-glow",
        outline:
          "border-2 border-primary/40 bg-transparent text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary",
        ghost: "bg-transparent hover:bg-muted",
        link: "bg-transparent underline-offset-4 hover:underline text-primary rounded-none before:hidden hover:translate-y-0",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        secondary:
          "bg-gradient-to-r from-secondary to-accent text-secondary-foreground shadow-lg hover:shadow-glow",
      },
      size: {
        default: "px-6 py-2.5",
        sm: "px-4 py-1.5 text-xs",
        md: "px-6 py-2.5",
        lg: "px-8 py-3.5 text-base",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading = false, asChild = false, disabled, children, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props}>
          {children}
        </Slot>
      );
    }
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <LoadingSpinner size="sm" className="mr-2 border-background border-t-transparent" />
            Chargement...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
