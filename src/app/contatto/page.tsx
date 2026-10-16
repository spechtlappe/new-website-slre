import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { ContactForm } from "@/components/ContactForm";
import { contact, offices } from "@/lib/data/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Prenota una consulenza",
  description: "Ci dica di cosa ha bisogno: la richiamiamo entro un giorno lavorativo dalla sede più vicina.",
};

export default function ContattoPage() {
  return (
    <section className="section">
      <div className={`container ${styles.layout}`}>
        <div className={styles.main}>
          <span className="eyebrow">Prenota una consulenza</span>
          <h1 className="display">
            Sempre al <em>vostro fianco.</em>
          </h1>
          <p className="lead">
            Ci dica di cosa ha bisogno: la richiamiamo entro un giorno lavorativo dalla sede più
            vicina.
          </p>
          <Suspense fallback={<div className={styles.fallback} aria-hidden="true" />}>
            <ContactForm />
          </Suspense>
        </div>

        <aside className={styles.aside}>
          <div className={styles.advisor}>
            <span className={styles.advisorImg}>
              <Image
                src="/images/campagna/brochure-microlino.jpg"
                alt=""
                fill
                sizes="64px"
                style={{ objectFit: "cover" }}
              />
            </span>
            <span>
              <span className={styles.advisorTitle}>Il vostro consulente</span>
              <span className={styles.advisorText}>Una persona di riferimento, dall’inizio alla fine.</span>
            </span>
          </div>

          <div className={styles.box}>
            <span className="eyebrow">Le nostre sedi</span>
            <ul className={styles.offices}>
              {offices.map((o) => (
                <li key={o.id}>
                  <span className={styles.officeName}>{o.name}</span>
                  <span>
                    {o.street}, {o.city}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.box}>
            <span className="eyebrow">Orari</span>
            <p>{contact.hours}</p>
            <p className={styles.muted}>{contact.hoursNote}</p>
            <p className={styles.direct}>
              <a href={contact.phoneHref}>{contact.phone}</a> ·{" "}
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
