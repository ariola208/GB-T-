import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const AnimatedCard = ({ children, delay = 0, className }: AnimatedCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};
