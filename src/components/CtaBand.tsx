import Image from "next/image";
import Link from "next/link";
import { contact } from "@/lib/data/site";
import styles from "./CtaBand.module.css";

/** Fascia finale "Parliamo della sua casa", con foto e contatti. */
export function CtaBand() {
  return (
    <section className={styles.band} aria-labelledby="cta-title">
      <Image src="/images/home/gandria.jpg" alt="" fill sizes="100vw" className={styles.bg} />
      <div className={`container ${styles.inner}`}>
        <div className={styles.text}>
          <span className={`eyebrow ${styles.eyebrow}`}>Prenota una consulenza</span>
          <h2 id="cta-title" className={`h2 ${styles.title}`}>
            Parliamo della <em>sua casa.</em>
          </h2>
          <p className={styles.lead}>
            Una stima, una vendita o solo una domanda. Ci trova in una delle nostre tre sedi, al
            telefono o per e-mail.
          </p>
        </div>
        <div className={styles.card}>
          <span className="eyebrow">Senza impegno</span>
          <p className={styles.cardTitle}>Ci racconti il suo progetto.</p>
          <Link href="/contatto" className="btn btn--primary">
            Prenota una consulenza
          </Link>
          <a href={contact.phoneHref} className={styles.meta}>
            Chiama {contact.phone}
          </a>
          <a href={`mailto:${contact.email}`} className={styles.meta}>
            {contact.email}
          </a>
        </div>
      </div>
    </section>
  );
}
