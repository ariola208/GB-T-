import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
          className
        )}
        {...props}
      />
    );
  }
);

Avatar.displayName = "Avatar";

interface AvatarImageProps extends HTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
}

export const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, src, alt = "", ...props }, ref) => {
    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={cn("aspect-square h-full w-full object-cover", className)}
        {...props}
      />
    );
  }
);

AvatarImage.displayName = "AvatarImage";

interface AvatarFallbackProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const AvatarFallback = forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex h-full w-full items-center justify-center rounded-full bg-muted",
          className
        )}
        {...props}
      />
    );
  }
);

AvatarFallback.displayName = "AvatarFallback";
