"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./QuickSearch.module.css";

type Props = {
  towns: string[];
};

/** Ricerca rapida della home: porta alla pagina Immobili con i filtri. */
export function QuickSearch({ towns }: Props) {
  const router = useRouter();
  const [mode, setMode] = useState<"vendita" | "affitto">("vendita");

  return (
    <form
      className={styles.bar}
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const params = new URLSearchParams({ tipo: mode });
        for (const key of ["localita", "locali", "prezzo"]) {
          const value = String(data.get(key) ?? "");
          if (value) params.set(key, value);
        }
        router.push(`/immobili?${params.toString()}`);
      }}
    >
      <div className={styles.group}>
        <span className={styles.label} id="qs-mode">
          Cerco
        </span>
        <div className={styles.toggle} role="group" aria-labelledby="qs-mode">
          <button type="button" className="pill" aria-pressed={mode === "vendita"} onClick={() => setMode("vendita")}>
            Comprare
          </button>
          <button type="button" className="pill" aria-pressed={mode === "affitto"} onClick={() => setMode("affitto")}>
            Affittare
          </button>
        </div>
      </div>

      <div className={styles.group}>
        <label className={styles.label} htmlFor="qs-localita">
          Località
        </label>
        <select id="qs-localita" name="localita" className={styles.select} defaultValue="">
          <option value="">Tutto il Ticino</option>
          {towns.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.group}>
        <label className={styles.label} htmlFor="qs-locali">
          Locali
        </label>
        <select id="qs-locali" name="locali" className={styles.select} defaultValue="">
          <option value="">Tutti</option>
          <option value="2">Da 2</option>
          <option value="3">Da 3</option>
          <option value="4">Da 4</option>
          <option value="5">Da 5</option>
        </select>
      </div>

      <div className={styles.group}>
        <label className={styles.label} htmlFor="qs-prezzo">
          Prezzo
        </label>
        <select id="qs-prezzo" name="prezzo" className={styles.select} defaultValue="">
          <option value="">Qualsiasi</option>
          <option value="1000000">Fino a CHF 1 Mio</option>
          <option value="2000000">Fino a CHF 2 Mio</option>
          <option value="3000000">Fino a CHF 3 Mio</option>
        </select>
      </div>

      <button type="submit" className={`btn btn--primary ${styles.submit}`}>
        Cerca immobili
      </button>
    </form>
  );
}
