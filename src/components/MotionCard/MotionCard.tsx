import { motion } from "framer-motion";
import { ReactNode } from "react";

type MotionCardProps = {
  children: ReactNode;
  className?: string;
};

export default function MotionCard({ children, className = "" }: MotionCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 8px 32px 0 rgba(0,0,0,0.10)" }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={"rounded-xl bg-white ring-1 ring-black/10 shadow-sm p-6 " + className}
    >
      {children}
    </motion.div>
  );
}
