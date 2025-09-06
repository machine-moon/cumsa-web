"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type MotionCardProps = { children: ReactNode };

export default function MotionCard({ children }: MotionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="border rounded-xl p-6 transition-base hover:shadow-md hover:-translate-y-0.5 hover:border-[var(--red)]/30 bg-white"
    >
      {children}
    </motion.div>
  );
}
