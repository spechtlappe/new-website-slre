import styles from "./page.module.css";

const checks = [
  { label: "Next.js App Router", detail: "Pagina generata in fase di build" },
  { label: "TypeScript", detail: "Type-check superato in fase di build" },
  { label: "Repository GitHub", detail: "spechtlappe/new-website-slre" },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <span className={styles.logo}>SLRE</span>
        <span className={styles.badge}>Ambiente di test</span>
      </header>

      <section className={styles.hero}>
        <p className={styles.eyebrow}>Nuovo sito web</p>
        <h1 className={styles.title}>Il nuovo sito SLRE è in costruzione.</h1>
        <p className={styles.lead}>
          Questa pagina verifica che l&apos;intera pipeline funzioni, dal codice
          al repository. I contenuti e il design definitivi arriveranno nei
          prossimi passi.
        </p>
      </section>

      <section className={styles.panel} aria-labelledby="status-title">
        <h2 id="status-title" className={styles.panelTitle}>
          Stato del progetto
        </h2>
        <ul className={styles.checks}>
          {checks.map((check) => (
            <li key={check.label} className={styles.check}>
              <span className={styles.dot} aria-hidden="true" />
              <span className={styles.checkLabel}>{check.label}</span>
              <span className={styles.checkDetail}>{check.detail}</span>
            </li>
          ))}
        </ul>
      </section>

      <footer className={styles.footer}>
        <span>© SLRE</span>
        <span className={styles.mono}>v0.1.0 · test end-to-end</span>
      </footer>
    </main>
  );
}
