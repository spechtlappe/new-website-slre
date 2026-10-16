"use client";

import { useState } from "react";
import styles from "./MortgageCalculator.module.css";

// Regole d'uso comuni in Svizzera: 20% di capitale proprio, interesse
// calcolatorio 5%, ammortamento a 2/3 del prezzo in 15 anni, manutenzione 1%.
// Il costo annuo non dovrebbe superare un terzo del reddito lordo.
const RATE = 0.05;
const MAINTENANCE = 0.01;

const chf = (n: number) => `CHF ${new Intl.NumberFormat("de-CH", { maximumFractionDigits: 0 }).format(Math.max(0, n))}`;

export function MortgageCalculator() {
  const [price, setPrice] = useState(1500000);
  const [equity, setEquity] = useState(300000);
  const [income, setIncome] = useState(220000);

  const mortgage = Math.max(0, price - equity);
  const equityShare = price > 0 ? equity / price : 0;
  const amortization = Math.max(0, mortgage - (price * 2) / 3) / 15;
  const yearly = mortgage * RATE + amortization + price * MAINTENANCE;
  const burden = income > 0 ? yearly / income : 1;
  const ok = equityShare >= 0.2 && burden <= 1 / 3;

  return (
    <div className={styles.calc}>
      <div className={styles.inputs}>
        <NumberField id="mc-prezzo" label="Prezzo dell’immobile" value={price} onChange={setPrice} step={50000} />
        <NumberField id="mc-capitale" label="Capitale proprio" value={equity} onChange={setEquity} step={10000} />
        <NumberField id="mc-reddito" label="Reddito lordo annuo" value={income} onChange={setIncome} step={10000} />
      </div>

      <dl className={styles.results} aria-live="polite">
        <div>
          <dt>Ipoteca necessaria</dt>
          <dd>{chf(mortgage)}</dd>
        </div>
        <div>
          <dt>Capitale proprio</dt>
          <dd data-warn={equityShare < 0.2}>{Math.round(equityShare * 100)}% del prezzo</dd>
        </div>
        <div>
          <dt>Costo annuo calcolatorio</dt>
          <dd>{chf(yearly)}</dd>
        </div>
        <div>
          <dt>Quota sul reddito</dt>
          <dd data-warn={burden > 1 / 3}>{Math.round(burden * 100)}%</dd>
        </div>
      </dl>

      <p className={styles.verdict} data-ok={ok}>
        {ok
          ? "In base a questi dati l’acquisto sembra sostenibile."
          : "Con questi dati la banca potrebbe chiedere più capitale proprio o un reddito più alto."}
      </p>
      <p className={styles.note}>
        Primo orientamento, non una conferma bancaria. Interesse calcolatorio 5%, ammortamento a due
        terzi del prezzo in 15 anni, manutenzione 1%.
      </p>
    </div>
  );
}

function NumberField({
  id,
  label,
  value,
  onChange,
  step,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (n: number) => void;
  step: number;
}) {
  return (
    <div className="field">
      <label htmlFor={id}>{label} (CHF)</label>
      <input
        id={id}
        className="input"
        type="number"
        inputMode="numeric"
        min={0}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
      />
    </div>
  );
}
