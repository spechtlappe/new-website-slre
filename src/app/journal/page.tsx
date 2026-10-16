import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro } from "@/components/ServicePage";
import { publications } from "@/lib/data/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Journal",
  description: "SLRE Journal e brochure, da sfogliare online.",
};

export default function JournalPage() {
  return (
    <>
      <PageIntro
        eyebrow="Journal"
        title={
          <>
            SLRE Journal <em>e brochure.</em>
          </>
        }
        image="/images/campagna/journal-ascona.jpg"
        imageAlt="Il Journal SLRE sfogliato in piazza ad Ascona"
        actions={
          <a href={publications[0].href} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
            Sfogli l’ultimo numero ↗
          </a>
        }
      >
        <p>
          Il nostro giornale sul mercato immobiliare del Ticino: case, quartieri, persone e numeri,
          senza gergo. Esce tre volte l’anno, in italiano e in tedesco. Qui trova tutti i numeri da
          sfogliare online e le notizie più brevi dalle nostre sedi.
        </p>
        <p>
          Accanto al Journal, le nostre due brochure: SLRE Book, chi siamo e come lavoriamo; SLRE
          Vendita, il nostro metodo per vendere una casa.
        </p>
      </PageIntro>

      <section className="section section--beige" aria-label="Pubblicazioni">
        <div className={`container ${styles.grid}`}>
          {publications.map((p) => (
            <a key={p.href} href={p.href} target="_blank" rel="noopener noreferrer" className={styles.card}>
              <span className={styles.cover}>
                <Image src={p.image} alt={p.title} fill sizes="(max-width: 767px) 100vw, 360px" style={{ objectFit: "cover" }} />
              </span>
              <span className="eyebrow">{p.caption}</span>
              <span className="h3">{p.title}</span>
              <span className={styles.sub}>{p.subtitle} ↗</span>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
