import React from "react";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactElement | React.ReactElement[];
};

// Existing animation variants for the component
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

// Motion animations used in components regarding activities
export function ActivityMotion({ children }: Props) {
  return (
    <motion.div
      className="flex flex-wrap justify-center gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="hidden"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
