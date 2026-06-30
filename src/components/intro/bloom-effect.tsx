"use client";

import { motion } from "framer-motion";

export function BloomEffect() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="rounded-full"
        style={{
          width: "30vmax",
          height: "30vmax",
          background:
            "radial-gradient(circle, rgba(255,248,220,0.95) 0%, rgba(232,213,163,0.7) 35%, rgba(201,162,39,0.25) 60%, transparent 70%)",
        }}
        initial={{ scale: 0.15, opacity: 0 }}
        animate={{ scale: 5.5, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
}
