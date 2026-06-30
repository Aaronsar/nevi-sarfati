"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { NevitubbiesBlock } from "./nevitubbies-block";

type LineConfig = {
  id: string;
  type: "text" | "nevitubbies";
  text?: string;
  className?: string;
  delay: number;
  duration: number;
  variant?: "rise" | "fade" | "scale" | "slide" | "reveal";
  spacing?: string;
};

const LINES: LineConfig[] = [
  {
    id: "hosts",
    type: "text",
    text: "Aaron et Néorah Sarfati",
    className: "text-2xl md:text-3xl font-bold text-[#6b4c9a]",
    delay: 0,
    duration: 1,
    variant: "rise",
  },
  {
    id: "nevitubbies",
    type: "nevitubbies",
    delay: 0.9,
    duration: 1,
  },
  {
    id: "invite",
    type: "text",
    text: "sont heureux de vous inviter au Pydion de leur fils et petit-fils",
    className: "text-sm md:text-base font-medium leading-relaxed text-[#3d6b35] px-2",
    delay: 2.4,
    duration: 0.9,
    variant: "fade",
    spacing: "mt-2 mb-1",
  },
  {
    id: "nevi",
    type: "text",
    text: "Névi Sarfati",
    className: "text-4xl md:text-6xl font-extrabold leading-tight tubby-name-text",
    delay: 3.6,
    duration: 1.2,
    variant: "scale",
    spacing: "my-3 md:my-4",
  },
  {
    id: "date",
    type: "text",
    text: "le mercredi 8 juillet à 20h",
    className: "text-xl md:text-2xl font-bold text-[#6b4c9a]",
    delay: 5,
    duration: 0.85,
    variant: "slide",
    spacing: "mt-2",
  },
  {
    id: "cta",
    type: "text",
    text: "Confirmez votre présence",
    className: "text-xs md:text-sm font-bold tracking-[0.3em] text-[#e05090] uppercase",
    delay: 6.2,
    duration: 0.7,
    variant: "reveal",
    spacing: "mt-6",
  },
];

const VARIANTS: Record<NonNullable<LineConfig["variant"]>, Variants> = {
  rise: {
    hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.75, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
  },
  slide: {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0 },
  },
  reveal: {
    hidden: { opacity: 0, letterSpacing: "0.5em", y: 6 },
    visible: { opacity: 1, letterSpacing: "0.3em", y: 0 },
  },
};

type InvitationLinesProps = {
  visible: boolean;
  onCtaComplete?: () => void;
};

export function InvitationLines({ visible, onCtaComplete }: InvitationLinesProps) {
  const ctaFired = useRef(false);

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
      {LINES.map((line, i) => {
        if (line.type === "nevitubbies") {
          return <NevitubbiesBlock key={line.id} delay={line.delay} />;
        }

        return (
          <motion.p
            key={line.id}
            className={`${line.className} ${line.spacing ?? ""}`}
            variants={VARIANTS[line.variant!]}
            initial="hidden"
            animate="visible"
            transition={{
              duration: line.duration,
              delay: line.delay,
              ease: [0.22, 1, 0.36, 1],
            }}
            onAnimationComplete={() => {
              if (i === LINES.length - 1 && !ctaFired.current) {
                ctaFired.current = true;
                onCtaComplete?.();
              }
            }}
          >
            {line.text}
          </motion.p>
        );
      })}

      <motion.div
        className="mt-5 flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: dividerDelay }}
      >
        <span className="h-3 w-3 rounded-full bg-[#9b59b6]" />
        <span className="h-3 w-3 rounded-full bg-[#f5d020]" />
        <span className="h-3 w-3 rounded-full bg-[#3d6b35]" />
        <span className="h-3 w-3 rounded-full bg-[#e05090]" />
      </motion.div>
    </motion.div>
  );
}
