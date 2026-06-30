"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { NevitubbiesLabel, NevitubbiesPhoto } from "./nevitubbies-block";

const ease = [0.22, 1, 0.36, 1] as const;
const spring = { type: "spring" as const, stiffness: 110, damping: 24 };
const springPop = { type: "spring" as const, stiffness: 160, damping: 20 };

/** Délais lents — chaque bloc respire avant le suivant */
const T = {
  hosts: 0,
  nevitubbies: 4.5,
  photo: 9.0,
  invite: 13.0,
  neviName: 24.0,
  date: 27.0,
  address1: 28.5,
  address2: 29.8,
  cta: 31.5,
  dots: 33.0,
};

function fadeWord(delay: number) {
  return {
    initial: { opacity: 0, y: 12, filter: "blur(2px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.7, delay, ease },
  };
}

function AnimatedWords({
  text,
  className,
  baseDelay,
  stagger = 0.45,
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
    delay += i === words1.length - 1 ? 0.6 : 0.38;
    spans.push(
      <motion.span key={`p1-${i}`} className="inline-block" {...fadeWord(d)}>
        {w}
        {"\u00A0"}
      </motion.span>,
    );
  });

  delay += 1.0;

  words2.forEach((w, i) => {
    const d = delay;
    delay += i === 3 ? 0.5 : 0.4;
    spans.push(
      <motion.span key={`p2-${i}`} className="inline-block" {...fadeWord(d)}>
        {w}
        {i < words2.length - 1 ? "\u00A0" : ""}
      </motion.span>,
    );
  });

  return <p className={className}>{spans}</p>;
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
        stagger={0.45}
        className="text-xl font-bold text-[#6b4c9a] md:text-2xl"
      />

      <motion.div
        className="my-2 w-full max-w-[260px] md:max-w-xs"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring, delay: T.nevitubbies }}
      >
        <NevitubbiesLabel />
      </motion.div>

      <motion.div
        className="my-2 w-full max-w-[260px] md:max-w-xs"
        initial={{ opacity: 0, scale: 0.96, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ ...spring, delay: T.photo }}
      >
        <NevitubbiesPhoto />
      </motion.div>

      <div className="mt-1 w-full">
        <InviteSentence />
      </div>

      <motion.div
        className="relative my-4 md:my-5"
        initial={{ opacity: 0, scale: 0.88, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ ...springPop, delay: T.neviName }}
      >
        <motion.div
          className="pointer-events-none absolute -inset-3 rounded-full bg-[#f5d020]/20 blur-md"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: [0, 0.8, 0.45], scale: [0.7, 1.15, 1] }}
          transition={{ duration: 1.2, delay: T.neviName + 0.15, ease: "easeOut" }}
        />
        <p className="relative text-3xl font-extrabold leading-tight tubby-name-text md:text-5xl">
          Névi Sarfati
        </p>
      </motion.div>

      <motion.p
        className="text-lg font-bold text-[#6b4c9a] md:text-xl"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: T.date, ease }}
      >
        le mercredi 8 juillet à 20h
      </motion.p>

      <motion.p
        className="mt-2 text-sm font-semibold text-[#3d6b35] md:text-base"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: T.address1, ease }}
      >
        10 rue de Groslay
      </motion.p>
      <motion.p
        className="text-sm font-semibold text-[#3d6b35] md:text-base"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: T.address2, ease }}
      >
        95160 Montmorency
      </motion.p>

      <motion.button
        type="button"
        initial={{ opacity: 0, scale: 0.9, y: 12 }}
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
            transition={{ ...springPop, delay: T.dots + i * 0.12 }}
          />
        ))}
      </div>
    </div>
  );
}
