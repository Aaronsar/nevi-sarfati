"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { NevitubbiesLabel, NevitubbiesPhoto } from "./nevitubbies-block";

const ease = [0.25, 0.46, 0.45, 0.94] as const;
const springSoft = { type: "spring" as const, stiffness: 120, damping: 22 };
const springPop = { type: "spring" as const, stiffness: 200, damping: 18 };

/** Séquence texte — ~7 s */
const T = {
  hosts: 0,
  nevitubbies: 0.5,
  photo: 0.95,
  invite: 1.55,
  neviName: 3.35,
  date: 4.15,
  address1: 4.55,
  address2: 4.8,
  cta: 5.35,
  dots: 5.85,
};

function fadeWord(delay: number) {
  return {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { ...springSoft, delay },
  };
}

function fadeBlock(delay: number) {
  return {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { ...springSoft, delay },
  };
}

function AnimatedWords({
  text,
  className,
  baseDelay,
  stagger = 0.08,
}: {
  text: string;
  className?: string;
  baseDelay: number;
  stagger?: number;
}) {
  const words = text.split(" ");

  return (
    <p className={className}>
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          className="inline-block"
          {...fadeWord(baseDelay + i * stagger)}
        >
          {w}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </p>
  );
}

function InviteSentence() {
  const part1 = "sont heureux de vous inviter";
  const part2 = "au Pydion de leur fils et petit-fils";
  const className =
    "mx-auto max-w-[280px] text-sm leading-relaxed font-medium text-[#3d6b35] md:max-w-sm md:text-base";

  const words1 = part1.split(" ");
  const words2 = part2.split(" ");

  let delay = T.invite;
  const spans: ReactNode[] = [];

  words1.forEach((w, i) => {
    const d = delay;
    delay += i === words1.length - 1 ? 0.1 : 0.055;
    spans.push(
      <motion.span key={`p1-${i}`} className="inline-block" {...fadeWord(d)}>
        {w}
        {"\u00A0"}
      </motion.span>,
    );
  });

  delay += 0.12;

  words2.forEach((w, i) => {
    const d = delay;
    delay += i === 3 ? 0.08 : 0.06;
    spans.push(
      <motion.span key={`p2-${i}`} className="inline-block" {...fadeWord(d)}>
        {w}
        {i < words2.length - 1 ? "\u00A0" : ""}
      </motion.span>,
    );
  });

  return <p className={className}>{spans}</p>;
}

function NevitubbiesPhotoReveal() {
  return (
    <motion.div
      className="overflow-hidden rounded-2xl border-[3px] border-white shadow-lg"
      initial={{ opacity: 0, scale: 0.75, y: 24, rotate: -4 }}
      animate={{
        opacity: 1,
        scale: [0.75, 1.05, 1],
        y: [24, -5, 0],
        rotate: [-4, 2, 0],
      }}
      transition={{
        duration: 0.75,
        delay: T.photo,
        times: [0, 0.7, 1],
        ease,
      }}
    >
      <motion.div
        animate={{ rotate: [0, 1.5, -1.5, 0] }}
        transition={{ delay: T.photo + 0.75, duration: 0.45, ease: "easeInOut" }}
      >
        <NevitubbiesPhoto />
      </motion.div>
    </motion.div>
  );
}

type InvitationLinesProps = {
  onConfirmClick?: () => void;
};

export function InvitationLines({ onConfirmClick }: InvitationLinesProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <AnimatedWords
        text="Aaron et Néorah Sarfati"
        baseDelay={T.hosts}
        stagger={0.09}
        className="text-xl font-bold text-[#6b4c9a] md:text-2xl"
      />

      <motion.div className="my-2 w-full max-w-[260px] md:max-w-xs" {...fadeBlock(T.nevitubbies)}>
        <NevitubbiesLabel />
      </motion.div>

      <div className="my-2 w-full max-w-[260px] md:max-w-xs">
        <NevitubbiesPhotoReveal />
      </div>

      <div className="mt-1 w-full">
        <InviteSentence />
      </div>

      <motion.div
        className="relative my-4 md:my-5"
        initial={{ opacity: 0, scale: 0.9, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ ...springPop, delay: T.neviName }}
      >
        <motion.div
          className="pointer-events-none absolute -inset-3 rounded-full bg-[#f5d020]/20 blur-md"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 0.75, 0.4], scale: [0.8, 1.1, 1] }}
          transition={{ duration: 0.8, delay: T.neviName + 0.08, ease: "easeOut" }}
        />
        <p className="relative text-3xl font-extrabold leading-tight tubby-name-text md:text-5xl">
          Névi Sarfati
        </p>
      </motion.div>

      <motion.p
        className="text-lg font-bold text-[#6b4c9a] md:text-xl"
        {...fadeBlock(T.date)}
      />

      <motion.p
        className="mt-2 text-sm font-semibold text-[#3d6b35] md:text-base"
        {...fadeBlock(T.address1)}
      >
        10 rue de Groslay
      </motion.p>
      <motion.p
        className="text-sm font-semibold text-[#3d6b35] md:text-base"
        {...fadeBlock(T.address2)}
      >
        95160 Montmorency
      </motion.p>

      <motion.button
        type="button"
        initial={{ opacity: 0, scale: 0.92, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ ...springPop, delay: T.cta }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={onConfirmClick}
        className="mt-6 rounded-full bg-gradient-to-r from-[#9b59b6] via-[#e05090] to-[#9b59b6] px-8 py-3.5 text-base font-bold tracking-wide text-white shadow-lg shadow-[#9b59b6]/30 md:px-10 md:py-4 md:text-lg"
      >
        Confirmer ma présence
      </motion.button>

      <div className="mt-5 flex items-center gap-2">
        {["#9b59b6", "#f5d020", "#3d6b35", "#e05090"].map((color, i) => (
          <motion.span
            key={color}
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: color }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ ...springPop, delay: T.dots + i * 0.05 }}
          />
        ))}
      </div>
    </div>
  );
}
