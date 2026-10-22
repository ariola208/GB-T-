import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  subtitle?: string;
  title: string;
  description?: string;
  variant?: "default" | "centered";
  className?: string;
}

export const PageHeader = ({
  subtitle,
  title,
  description,
  variant = "default",
  className,
}: PageHeaderProps) => {
  const isCentered = variant === "centered";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "mb-12",
        isCentered && "text-center",
        className
      )}
    >
      {subtitle && (
        <p className="font-body text-xs tracking-wider uppercase text-muted-foreground mb-4">
          {subtitle}
        </p>
      )}
      <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4">
        {title}
      </h1>
      {description && (
        <p className="font-body text-muted-foreground max-w-2xl">
          {description}
        </p>
      )}
      <div className={cn(
        "w-16 h-0.5 bg-foreground mt-6",
        isCentered && "mx-auto"
      )} />
    </motion.div>
  );
};
