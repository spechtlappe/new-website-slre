"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { contactGoals, offices } from "@/lib/data/site";
import styles from "./Forms.module.css";

type GoalId = (typeof contactGoals)[number]["id"];

// Prototipo: la richiesta non viene ancora inviata. Il campo "obiettivo"
// servirà a smistarla alla persona giusta (e al CRM) appena collegato.
export function ContactForm() {
  const params = useSearchParams();
  const fromUrl = params.get("obiettivo");
  const reference = params.get("immobile");
  const [goal, setGoal] = useState<GoalId>(
    contactGoals.some((g) => g.id === fromUrl) ? (fromUrl as GoalId) : "vendere",
  );
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className={styles.thanks} role="status">
        <p className="h3">Grazie.</p>
        <p>Abbiamo ricevuto il suo messaggio e la ricontattiamo presto.</p>
      </div>
    );
  }

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <fieldset className={styles.goals}>
        <legend>Di cosa ha bisogno?</legend>
        {contactGoals.map((g) => (
          <button
            key={g.id}
            type="button"
            className="pill"
            aria-pressed={goal === g.id}
            onClick={() => setGoal(g.id)}
          >
            {g.label}
          </button>
        ))}
      </fieldset>
      <input type="hidden" name="obiettivo" value={goal} />
      {reference && <input type="hidden" name="immobile" value={reference} />}

      <div className={styles.row}>
        <div className="field">
          <label htmlFor="c-nome">Nome *</label>
          <input id="c-nome" className="input" required autoComplete="given-name" />
        </div>
        <div className="field">
          <label htmlFor="c-cognome">Cognome *</label>
          <input id="c-cognome" className="input" required autoComplete="family-name" />
        </div>
      </div>
      <div className={styles.row}>
        <div className="field">
          <label htmlFor="c-email">E-mail *</label>
          <input id="c-email" type="email" className="input" required autoComplete="email" />
        </div>
        <div className="field">
          <label htmlFor="c-telefono">Telefono</label>
          <input id="c-telefono" type="tel" className="input" autoComplete="tel" placeholder="+41" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="c-sede">Sede preferita</label>
        <select id="c-sede" className="input" defaultValue="">
          <option value="">Indifferente</option>
          {offices.map((o) => (
            <option key={o.id} value={o.id}>
              {o.name}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="c-messaggio">Messaggio</label>
        <textarea
          id="c-messaggio"
          className="input"
          placeholder="Ci racconti il suo progetto…"
          defaultValue={reference ? `Vorrei visitare l’immobile ${reference}.` : undefined}
        />
      </div>
      <div className={styles.submitRow}>
        <button type="submit" className="btn btn--primary">
          Invia la richiesta
        </button>
        <span className={styles.note}>La richiamiamo entro un giorno lavorativo.</span>
      </div>
    </form>
  );
}
