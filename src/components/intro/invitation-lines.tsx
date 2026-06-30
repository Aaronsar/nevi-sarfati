"use client";

import { motion, type Variants } from "framer-motion";

type LineConfig = {
  text: string;
  className: string;
  delay: number;
  duration: number;
  variant: "rise" | "fade" | "scale" | "slide" | "reveal";
  spacing?: string;
};

const LINES: LineConfig[] = [
  {
    text: "Aaron et Neorah Sarfati",
    className: "text-2xl md:text-3xl font-semibold tracking-wide text-gold-dark",
    delay: 0,
    duration: 1.1,
    variant: "rise",
  },
  {
    text: "vous invitent",
    className: "text-base md:text-lg font-light italic text-gold/80",
    delay: 0.7,
    duration: 0.55,
    variant: "fade",
    spacing: "-mt-0.5",
  },
  {
    text: "au Pidyon Haben de leur fils",
    className: "text-xs md:text-sm font-medium tracking-[0.28em] text-gold-dark/70 uppercase",
    delay: 1.3,
    duration: 0.75,
    variant: "fade",
    spacing: "mt-4 mb-1",
  },
  {
    text: "Névi Baroukh Sarfati",
    className: "text-4xl md:text-6xl font-bold leading-tight gold-gradient-text",
    delay: 2.6,
    duration: 1.3,
    variant: "scale",
    spacing: "my-3 md:my-5",
  },
  {
    text: "le mercredi 8 juillet à 20h",
    className: "text-xl md:text-2xl font-semibold tracking-wide text-gold-dark",
    delay: 4.2,
    duration: 0.9,
    variant: "slide",
    spacing: "mt-4",
  },
  {
    text: "Confirmez votre présence",
    className: "text-[11px] md:text-xs font-semibold tracking-[0.35em] text-gold uppercase",
    delay: 5.4,
    duration: 0.7,
    variant: "reveal",
    spacing: "mt-6",
  },
];

const VARIANTS: Record<LineConfig["variant"], Variants> = {
  rise: {
    hidden: { opacity: 0, y: 36, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.82, y: 24, filter: "blur(4px)" },
    visible: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" },
  },
  slide: {
    hidden: { opacity: 0, x: -28, filter: "blur(4px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  reveal: {
    hidden: { opacity: 0, letterSpacing: "0.6em", y: 8 },
    visible: { opacity: 1, letterSpacing: "0.35em", y: 0 },
  },
};

type InvitationLinesProps = {
  visible: boolean;
};

export function InvitationLines({ visible }: InvitationLinesProps) {
  if (!visible) return null;

  const lastLine = LINES[LINES.length - 1];
  const dividerDelay = lastLine.delay + lastLine.duration + 0.3;

  return (
    <motion.div
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {LINES.map((line) => (
        <motion.p
          key={line.text}
          className={`${line.className} ${line.spacing ?? ""}`}
          variants={VARIANTS[line.variant]}
          initial="hidden"
          animate="visible"
          transition={{
            duration: line.duration,
            delay: line.delay,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {line.text}
        </motion.p>
      ))}

      <motion.div
        className="mt-6 h-px w-16 bg-gradient-to-r from-transparent via-gold/60 to-transparent md:w-24"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: dividerDelay, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
}

export const INVITATION_TEXT_DURATION_MS = 7200;
