import { TbBrandLinktree } from "react-icons/tb";
import { motion } from "framer-motion";
import { LINKS } from "@/lib/constants";

const circleVariants = {
  idle: { scale: 0.8, opacity: 0, backgroundColor: "rgba(16,185,129,0)" }, // transparent
  hover: { scale: 1, opacity: 1, backgroundColor: "rgba(16,185,129,0.98)" }, // teal/green
};

const iconVariants = {
  idle: { color: "#059669" }, // green-600
  hover: { color: "#ffffff" },
};

export default function LinktreeIcon() {
  return (
    <motion.a
      href={LINKS.linktree}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Linktree"
      className="relative inline-flex items-center justify-center w-9 h-9 rounded-full"
      initial="idle"
      whileHover="hover"
      whileTap="idle"
    >
      {/* circular green background */}
      <motion.span
        className="absolute z-0 rounded-full"
        style={{ width: 36, height: 36, borderRadius: 9999 }}
        variants={circleVariants}
        transition={{ duration: 0.14 }}
      />

      <motion.span
        className="relative z-10 flex items-center justify-center"
        variants={iconVariants}
        transition={{ duration: 0.12 }}
      >
        <TbBrandLinktree className="w-5 h-5" />
      </motion.span>
    </motion.a>
  );
}
