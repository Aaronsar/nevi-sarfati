"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  SunRays,
  StarOfDavid,
  DecorativeSun,
  OliveBranch,
  SynagogueSilhouette,
  TorahScroll,
} from "./decorations";
import { RsvpForm } from "./rsvp-form";

const fadeIn = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: "easeOut" as const },
});

export default function InvitationPage() {
  return (
    <main className="cloud-bg relative min-h-screen overflow-hidden">
      {/* Decorative background elements */}
      <DecorativeSun className="absolute top-8 left-6 h-16 w-16 opacity-60 md:top-12 md:left-12 md:h-24 md:w-24" />
      <StarOfDavid className="absolute top-8 right-6 h-10 w-10 text-gold opacity-50 md:top-12 md:right-12 md:h-14 md:w-14" />
      <OliveBranch className="absolute bottom-32 left-0 h-20 w-32 opacity-50 md:h-28 md:w-44" />
      <OliveBranch className="absolute right-0 bottom-16 h-16 w-28 opacity-40 md:h-24 md:w-40" flip />
      <SynagogueSilhouette className="absolute top-32 right-4 h-28 w-24 opacity-40 md:top-40 md:right-16 md:h-40 md:w-32" />
      <TorahScroll className="absolute bottom-48 left-4 h-20 w-16 opacity-40 md:bottom-56 md:left-12 md:h-28 md:w-20" />

      <div className="relative z-10 mx-auto max-w-2xl px-5 py-10 md:px-8 md:py-16">
        {/* Header Hebrew */}
        <motion.p
          {...fadeIn(0.1)}
          className="text-center font-hebrew text-lg tracking-widest text-gold-dark md:text-xl"
        >
          ב״ה
        </motion.p>

        {/* Hebrew verse */}
        <motion.div {...fadeIn(0.2)} className="mt-4 text-center">
          <p className="font-hebrew text-xl text-gold-dark md:text-2xl">
            אני לדודי ודודי לי
          </p>
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-2 inline-block text-gold"
          >
            ♥
          </motion.span>
        </motion.div>

        {/* Main title */}
        <motion.div {...fadeIn(0.3)} className="mt-8 text-center">
          <p className="text-sm font-medium tracking-[0.3em] text-text-muted uppercase md:text-base">
            Vous êtes invités au
          </p>
          <h1 className="mt-3 text-3xl leading-tight font-semibold tracking-wide md:text-5xl">
            <span className="gold-gradient-text">Pidyon Haben</span>
          </h1>
          <p className="mt-2 text-sm tracking-[0.2em] text-text-muted uppercase md:text-base">
            de
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-wide text-gold-dark md:text-4xl">
            Névi Baroukh Sarfati
          </h2>
        </motion.div>

        {/* Baby photo with sun rays */}
        <motion.div
          {...fadeIn(0.5)}
          className="relative mx-auto mt-10 flex justify-center md:mt-14"
        >
          <SunRays />
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
            <div className="relative overflow-hidden rounded-full border-4 border-gold-light shadow-2xl shadow-gold/30">
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-gold/20 to-transparent" />
              <Image
                src="/images/baby.png"
                alt="Névi Baroukh Sarfati"
                width={280}
                height={350}
                priority
                className="h-[280px] w-[220px] object-cover object-top md:h-[360px] md:w-[280px]"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Event details */}
        <motion.div
          {...fadeIn(0.7)}
          className="mt-12 space-y-6 text-center md:mt-16"
        >
          <div className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />

          <div>
            <p className="text-sm tracking-[0.25em] text-text-muted uppercase">Date</p>
            <p className="mt-1 text-2xl font-semibold text-gold-dark md:text-3xl">
              Mercredi 8 Juillet
            </p>
          </div>

          <div>
            <p className="text-sm tracking-[0.25em] text-text-muted uppercase">Heure</p>
            <p className="mt-1 text-2xl font-semibold text-gold-dark md:text-3xl">
              À partir de 20h
            </p>
          </div>

          <div>
            <p className="text-sm tracking-[0.25em] text-text-muted uppercase">Lieu</p>
            <a
              href="https://maps.google.com/?q=10+rue+de+Groslay,+Montmorency,+95160"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-1 inline-flex items-center gap-2 text-xl font-semibold text-gold-dark transition-colors hover:text-gold md:text-2xl"
            >
              <svg className="h-5 w-5 text-gold" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              10 rue de Groslay
              <br className="md:hidden" />
              <span className="md:ml-0">Montmorency, 95160</span>
            </a>
          </div>

          <div className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
        </motion.div>

        {/* Hosts message */}
        <motion.div {...fadeIn(0.9)} className="mt-10 text-center">
          <p className="text-lg text-text-muted md:text-xl">
            <span className="font-semibold text-gold-dark">Aaron & Neorah Sarfati</span>
            <br />
            sont heureux de vous accueillir
            <br />
            à cette occasion si particulière.
          </p>
        </motion.div>

        {/* RSVP Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-14 flex justify-center md:mt-20"
          id="rsvp"
        >
          <RsvpForm />
        </motion.div>

        {/* Footer */}
        <motion.footer
          {...fadeIn(1.1)}
          className="mt-16 pb-8 text-center text-sm text-text-muted"
        >
          <StarOfDavid className="mx-auto mb-3 h-6 w-6 text-gold opacity-40" />
          <p>nevi-sarfati.fr</p>
        </motion.footer>
      </div>
    </main>
  );
}
