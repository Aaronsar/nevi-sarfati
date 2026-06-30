"use client";

import { motion } from "framer-motion";

const LINES = [
  { text: "Aaron et Neorah Sarfati", className: "text-xl md:text-2xl font-semibold text-gold-dark" },
  { text: "vous invitent", className: "text-base md:text-lg text-text-muted italic" },
  { text: "au Pidyon Haben de leur fils", className: "text-sm md:text-base tracking-[0.12em] text-text-muted uppercase" },
  { text: "Névi Baroukh Sarfati", className: "text-2xl md:text-3xl font-bold gold-gradient-text my-1" },
  { text: "le mercredi 8 juillet à 20h", className: "text-lg md:text-xl font-medium text-gold-dark" },
  { text: "Confirmez votre présence", className: "text-sm md:text-base tracking-[0.2em] text-text-muted uppercase mt-3" },
];

type InvitationLinesProps = {
  visible: boolean;
};

export function InvitationLines({ visible }: InvitationLinesProps) {
  if (!visible) return null;

  return (
    <motion.div
      className="flex flex-col items-center gap-3 text-center md:gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {LINES.map((line, i) => (
        <motion.p
          key={line.text}
          className={line.className}
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.85,
            delay: i * 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {line.text}
        </motion.p>
      ))}

      <motion.div
        className="mt-4 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: LINES.length * 0.75 + 0.4, duration: 0.7 }}
      />
    </motion.div>
  );
}
