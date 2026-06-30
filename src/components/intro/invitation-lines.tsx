"use client";

import { motion } from "framer-motion";

const LINES = [
  { text: "Aaron et Neorah Sarfati", className: "text-2xl md:text-4xl font-semibold text-gold-dark" },
  { text: "vous invitent", className: "text-xl md:text-2xl text-text-muted italic" },
  { text: "au Pidyon Haben de leur fils", className: "text-lg md:text-xl tracking-[0.15em] text-text-muted uppercase" },
  { text: "Névi Baroukh Sarfati", className: "text-3xl md:text-5xl font-bold gold-gradient-text" },
  { text: "le mercredi 8 juillet à 20h", className: "text-xl md:text-2xl font-medium text-gold-dark" },
  { text: "Confirmez votre présence", className: "text-lg md:text-xl tracking-widest text-text-muted uppercase mt-4" },
];

type InvitationLinesProps = {
  visible: boolean;
};

export function InvitationLines({ visible }: InvitationLinesProps) {
  if (!visible) return null;

  return (
    <motion.div
      className="flex flex-col items-center gap-3 px-6 text-center md:gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {LINES.map((line, i) => (
        <motion.p
          key={line.text}
          className={line.className}
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.9,
            delay: i * 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {line.text}
        </motion.p>
      ))}

      <motion.div
        className="mt-6 h-px w-32 bg-gradient-to-r from-transparent via-gold to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: LINES.length * 0.7 + 0.3, duration: 0.8 }}
      />
    </motion.div>
  );
}
