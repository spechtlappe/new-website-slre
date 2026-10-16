"use client";

import { useState } from "react";
import styles from "./Forms.module.css";

// Prototipo: il profilo non viene ancora inviato. In seguito andrà al CRM
// Nestermind come "profilo di ricerca" collegato al contatto.
export function OffMarketForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className={styles.thanks} role="status">
        <p className="h3">Grazie.</p>
        <p>Abbiamo ricevuto il suo profilo di ricerca. La contatteremo solo quando avremo qualcosa di pertinente.</p>
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
      <div className={styles.row}>
        <Field id="om-nome" label="Nome" required autoComplete="given-name" />
        <Field id="om-cognome" label="Cognome" required autoComplete="family-name" />
      </div>
      <div className={styles.row}>
        <Field id="om-email" label="E-mail" type="email" required autoComplete="email" />
        <Field id="om-telefono" label="Telefono" type="tel" autoComplete="tel" />
      </div>
      <div className={styles.row3}>
        <div className="field">
          <label htmlFor="om-transazione">Acquisto o affitto</label>
          <select id="om-transazione" className="input" defaultValue="Acquisto">
            <option>Acquisto</option>
            <option>Affitto</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="om-tipo">Tipo di casa</label>
          <select id="om-tipo" className="input" defaultValue="">
            <option value="">Qualsiasi</option>
            <option>Appartamento</option>
            <option>Attico</option>
            <option>Villa</option>
            <option>Rustico</option>
            <option>Terreno</option>
          </select>
        </div>
        <Field id="om-locali" label="Locali" placeholder="Es. 4.5" />
      </div>
      <div className={styles.row}>
        <Field id="om-localita" label="Località" placeholder="Es. Ascona, Locarnese" />
        <Field id="om-budget" label="Budget" placeholder="Es. CHF 2 Mio" />
      </div>
      <div className="field">
        <label htmlFor="om-messaggio">Messaggio</label>
        <textarea id="om-messaggio" className="input" placeholder="Cosa non può mancare nella sua prossima casa?" />
      </div>
      <button type="submit" className="btn btn--primary">
        Invia il profilo
      </button>
    </form>
  );
}

function Field({ id, label, ...rest }: { id: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        {rest.required && " *"}
      </label>
      <input id={id} className="input" {...rest} />
    </div>
  );
}
