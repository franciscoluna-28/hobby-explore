"use client";

import React from "react";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactElement | React.ReactElement[];
} & React.HTMLAttributes<HTMLDivElement>;

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
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
