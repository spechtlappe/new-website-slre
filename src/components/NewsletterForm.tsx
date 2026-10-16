"use client";

import { useState } from "react";
import styles from "./NewsletterForm.module.css";

// Prototipo: l'iscrizione non viene ancora inviata a nessun servizio.
export function NewsletterForm() {
  const [done, setDone] = useState(false);

  if (done) {
    return <p className={styles.done}>Grazie, la terremo aggiornata.</p>;
  }

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      <label htmlFor="newsletter-email" className="visually-hidden">
        E-mail
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="La sua e-mail"
        className={styles.input}
        autoComplete="email"
      />
      <button type="submit" className="btn btn--light btn--sm">
        Iscriviti
      </button>
    </form>
  );
}
