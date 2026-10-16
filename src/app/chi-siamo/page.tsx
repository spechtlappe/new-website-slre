import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { SectionHeading } from "@/components/SectionHeading";
import { TeamCard } from "@/components/TeamCard";
import { getTeam } from "@/lib/crm";
import { gallery, values } from "@/lib/data/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Chi siamo",
  description:
    "Agenzia immobiliare indipendente, nata a Muralto nel 1993. Il team, i valori e la Galleria Menouno.",
};

export default async function ChiSiamoPage() {
  const team = await getTeam();
  const partners = team.filter((m) => m.partner);
  const others = team.filter((m) => !m.partner);

  return (
    <>
      <section className="section">
        <div className={`container ${styles.intro}`}>
          <div className={styles.introText}>
            <span className="eyebrow">Chi siamo · Dal 1993</span>
            <h1 className="display">
              Specht &amp; Lappe <em>Real Estate.</em>
            </h1>
            <div className={`prose lead ${styles.introLead}`}>
              <p>
                Siamo un’agenzia immobiliare indipendente, nata a Muralto nel 1993 come Immobiliare
                SL. Nel 2026 è diventata Specht &amp; Lappe Real Estate, dal nome dei due soci che la
                guidano, Stefano Specht e Stefano Lappe. Oggi lavoriamo da tre sedi, Muralto, Ascona e
                Morcote, con un team che parla italiano, tedesco, inglese, francese e portoghese.
              </p>
              <p>
                Valutiamo, vendiamo, gestiamo e sviluppiamo case. Lo facciamo da oltre trent’anni
                nello stesso modo: poche case per volta, molta attenzione per ciascuna, e la stessa
                franchezza con chi vende e con chi compra.
              </p>
            </div>
          </div>
          <div className={styles.introMedia}>
            <Image
              src="/images/campagna/consulente-microlino.jpg"
              alt="Consulente SLRE con la Microlino sul lungolago di Ascona"
              fill
              preload
              sizes="(max-width: 900px) 100vw, 480px"
              className={styles.cover}
            />
          </div>
        </div>
      </section>

      <section id="team" className="section section--white" aria-labelledby="team-title">
        <div className="container">
          <SectionHeading
            id="team-title"
            eyebrow="Il nostro team"
            title={
              <>
                Le persone <em>dietro ogni casa.</em>
              </>
            }
            intro="Quindici persone tra Muralto, Ascona e Morcote. Fiduciari, periti, consulenti e amministrazione: le persone che incontrerà, con le lingue che parlano."
          />
          <div className={styles.partners}>
            {partners.map((m) => (
              <TeamCard key={m.slug} member={m} />
            ))}
          </div>
          <div className={styles.team}>
            {others.map((m) => (
              <TeamCard key={m.slug} member={m} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--beige" aria-labelledby="valori">
        <div className="container">
          <SectionHeading
            id="valori"
            eyebrow="Ciò che è importante per noi"
            title={
              <>
                I nostri <em>valori.</em>
              </>
            }
            intro="Dal 1993 lavoriamo nello stesso modo: poche case per volta, molta attenzione per ciascuna."
          />
          <ol className={styles.values}>
            {values.map((v, i) => (
              <li key={v.title}>
                <span className={styles.valueNo}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h3">{v.title}</h3>
                <p>{v.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="partner">
        <div className={`container ${styles.twoCol}`}>
          <div>
            <span className="eyebrow">Partner e associazioni</span>
            <h2 id="partner" className="h3" style={{ margin: "12px 0 16px" }}>
              Formazione, certificazioni <em>e riconoscimenti.</em>
            </h2>
            <p className={styles.muted}>
              Siamo membri della SIV, l’associazione dei periti immobiliari, e dello SVIT. I nostri
              fiduciari insegnano alla SUPSI e fanno parte delle commissioni d’esame per la
              certificazione ISO 17024. Nel 2026 la rivista Bellevue ci ha nominati tra i Best
              Property Agents.
            </p>
          </div>
          <div>
            <span className="eyebrow">Sponsoring</span>
            <h2 className="h3" style={{ margin: "12px 0 16px" }}>
              Eventi che fanno <em>vivere la regione.</em>
            </h2>
            <p className={styles.muted}>
              Sosteniamo eventi che fanno vivere la regione, dal cinema alla nautica.
            </p>
            {/* TODO testi: elenco sponsoring 2026 da aggiornare (Locarno Film Festival, EspoVerbano, …). */}
            <ul className={styles.sponsors}>
              <li>Locarno Film Festival</li>
              <li>EspoVerbano</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="galleria" className="section section--white" aria-labelledby="galleria-title">
        <div className={`container ${styles.gallery}`}>
          <div className={styles.galleryText}>
            <span className="eyebrow">Galleria Menouno · Muralto</span>
            <h2 id="galleria-title" className="h2">
              Arte, <em>a due passi dal lago.</em>
            </h2>
            <p className={styles.muted}>
              Nella nostra sede di Muralto c’è una sala espositiva che mettiamo a disposizione di
              artisti della regione, tra fotografie della Locarno degli anni Venti. Quattro mostre
              l’anno.
            </p>
            <div className={styles.show}>
              <span className="eyebrow">Prossima esposizione</span>
              <span className={styles.showArtist}>{gallery.nextShow.artist}</span>
              <span className={styles.muted}>{gallery.nextShow.dates}</span>
            </div>
            <Link href="/contatto?obiettivo=altro" className="btn btn--primary btn--sm">
              Visiti la galleria →
            </Link>
          </div>
          {/* Le foto della Galleria Menouno non sono ancora nei materiali: qui andrà il carosello. */}
          <div className={styles.galleryPlaceholder} role="img" aria-label="Foto della Galleria Menouno in arrivo">
            <span className="eyebrow">Galleria Menouno</span>
            <span>Foto della sala in arrivo</span>
          </div>
        </div>
      </section>

      <section id="lavora-con-noi" className="section section--beige" aria-labelledby="lavora">
        <div className={`container ${styles.jobs}`}>
          <div>
            <span className="eyebrow">Carriera</span>
            <h2 id="lavora" className="h2">
              Lavora <em>con noi.</em>
            </h2>
          </div>
          <div>
            <p className="lead">
              Cerchiamo persone curiose, precise e a loro agio con i clienti in più lingue. Al momento
              non ci sono posizioni aperte; se crede che il suo profilo faccia per noi, ci scriva
              comunque.
            </p>
            <a href="mailto:info@slre.ch?subject=Candidatura" className="btn btn--outline btn--sm" style={{ marginTop: 20 }}>
              Invii la sua candidatura
            </a>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
