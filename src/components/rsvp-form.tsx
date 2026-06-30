"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FormState = "idle" | "loading" | "success" | "error";

export function RsvpForm() {
  const [famille, setFamille] = useState("");
  const [present, setPresent] = useState<"oui" | "non" | "">("");
  const [nombrePersonnes, setNombrePersonnes] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          famille,
          present,
          nombrePersonnes: present === "oui" ? Number(nombrePersonnes) : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error ?? "Une erreur est survenue");
        setFormState("error");
        return;
      }

      setFormState("success");
    } catch {
      setErrorMessage("Impossible d'envoyer votre réponse. Veuillez réessayer.");
      setFormState("error");
    }
  }

  if (formState === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="gold-border rounded-2xl bg-white/70 p-8 text-center backdrop-blur-sm md:p-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold/20"
        >
          <svg className="h-8 w-8 text-gold-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <h3 className="mb-2 text-2xl font-semibold text-gold-dark">Merci !</h3>
        <p className="text-text-muted text-lg">
          Votre réponse a bien été enregistrée.
          <br />
          {present === "oui"
            ? "Nous avons hâte de vous accueillir !"
            : "Merci de nous avoir prévenus."}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="gold-border w-full max-w-md rounded-2xl bg-white/70 p-6 backdrop-blur-sm md:p-8"
    >
      <h3 className="mb-6 text-center text-2xl font-semibold tracking-wide text-gold-dark md:text-3xl">
        Confirmez votre présence
      </h3>

      <div className="space-y-5">
        <div>
          <label htmlFor="famille" className="mb-1.5 block text-sm font-medium tracking-wider text-text-muted uppercase">
            Famille
          </label>
          <input
            id="famille"
            type="text"
            required
            value={famille}
            onChange={(e) => setFamille(e.target.value)}
            placeholder="Votre nom de famille"
            className="w-full rounded-lg border border-champagne bg-cream/50 px-4 py-3 text-lg text-text-dark transition-colors outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
          />
        </div>

        <fieldset>
          <legend className="mb-3 block text-sm font-medium tracking-wider text-text-muted uppercase">
            Présent
          </legend>
          <div className="flex gap-4">
            {(["oui", "non"] as const).map((option) => (
              <label
                key={option}
                className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border px-4 py-3 text-lg font-medium transition-all ${
                  present === option
                    ? "border-gold bg-gold/10 text-gold-dark"
                    : "border-champagne bg-cream/30 text-text-muted hover:border-gold-light"
                }`}
              >
                <input
                  type="radio"
                  name="present"
                  value={option}
                  checked={present === option}
                  onChange={() => setPresent(option)}
                  className="sr-only"
                  required
                />
                {option === "oui" ? "Oui" : "Non"}
              </label>
            ))}
          </div>
        </fieldset>

        <AnimatePresence>
          {present === "oui" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <label
                htmlFor="nombre"
                className="mb-1.5 block text-sm font-medium tracking-wider text-text-muted uppercase"
              >
                Nombre de personnes
              </label>
              <input
                id="nombre"
                type="number"
                min={1}
                max={20}
                required
                value={nombrePersonnes}
                onChange={(e) => setNombrePersonnes(e.target.value)}
                placeholder="Ex : 2"
                className="w-full rounded-lg border border-champagne bg-cream/50 px-4 py-3 text-lg text-text-dark transition-colors outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {formState === "error" && errorMessage && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-sm text-red-600"
          >
            {errorMessage}
          </motion.p>
        )}

        <motion.button
          type="submit"
          disabled={formState === "loading"}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full rounded-lg bg-gradient-to-r from-gold-dark via-gold to-gold-dark px-6 py-3.5 text-lg font-semibold tracking-wide text-white shadow-lg shadow-gold/20 transition-opacity disabled:opacity-60"
        >
          {formState === "loading" ? "Envoi en cours..." : "Envoyer ma réponse"}
        </motion.button>
      </div>
    </motion.form>
  );
}
