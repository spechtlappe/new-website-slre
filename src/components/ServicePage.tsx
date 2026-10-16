import Image from "next/image";
import type { ReactNode } from "react";
import styles from "./ServicePage.module.css";

/** Apertura delle pagine interne: testo a sinistra, foto a destra. */
export function PageIntro({
  eyebrow,
  title,
  children,
  image,
  imageAlt,
  actions,
}: {
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
  image: string;
  imageAlt: string;
  actions?: ReactNode;
}) {
  return (
    <section className="section">
      <div className={`container ${styles.intro}`}>
        <div className={styles.introText}>
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="display">{title}</h1>
          <div className={`prose lead ${styles.introLead}`}>{children}</div>
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>
        <div className={styles.introMedia}>
          <Image src={image} alt={imageAlt} fill preload sizes="(max-width: 900px) 100vw, 480px" className={styles.cover} />
        </div>
      </div>
    </section>
  );
}

/** Processo numerato (8 passi su Vendere e Acquistare). */
export function StepList({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <ol className={styles.steps}>
      {steps.map((s, i) => (
        <li key={s.title} className={styles.step}>
          <span className={styles.no}>{String(i + 1).padStart(2, "0")}</span>
          <div>
            <h3 className={styles.stepTitle}>{s.title}</h3>
            <p>{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Elenco di documenti scaricabili. I PDF verranno caricati più avanti. */
export function DocList({ docs }: { docs: { label: string; href?: string }[] }) {
  return (
    <ul className={styles.docs}>
      {docs.map((d) => (
        <li key={d.label}>
          <a href={d.href ?? "#"} target={d.href ? "_blank" : undefined} rel={d.href ? "noopener noreferrer" : undefined}>
            <span>{d.label}</span>
            <span aria-hidden="true">{d.href?.startsWith("http") ? "↗" : "↓"}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
