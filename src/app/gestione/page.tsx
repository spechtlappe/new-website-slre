import type { Metadata } from "next";
import Link from "next/link";
import { DocList, PageIntro } from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Gestione e sportello 24/7",
  description: "Amministrazione di stabili a reddito in tutto il Ticino. Formulari e contratti per inquilini.",
};

export default function GestionePage() {
  return (
    <>
      <PageIntro
        eyebrow="Gestione"
        title={
          <>
            Gestione <em>e amministrazione.</em>
          </>
        }
        image="/images/sedi/ascona-bar.jpg"
        imageAlt="Interno della sede SLRE di Ascona"
        actions={
          <Link href="/immobili?tipo=affitto" className="btn btn--primary">
            Appartamenti in affitto →
          </Link>
        }
      >
        <p>
          Amministriamo stabili a reddito in tutto il Ticino: contratti, depositi di garanzia,
          contabilità, spese accessorie e manutenzione con artigiani di fiducia. Un solo
          interlocutore, per proprietari e inquilini.
        </p>
      </PageIntro>

      <section className="section section--beige" aria-labelledby="sportello">
        <div className="container" style={{ maxWidth: 880 }}>
          <span className="eyebrow">Sportello 24/7</span>
          <h2 id="sportello" className="h2" style={{ margin: "14px 0 18px" }}>
            Formulari e contratti, <em>sempre disponibili.</em>
          </h2>
          <p className="lead" style={{ marginBottom: 28 }}>
            Formulari, contratti e regolamenti per inquilini e interessati.
          </p>
          <DocList
            docs={[
              { label: "Formulario per interessati" },
              { label: "Contratto di locazione" },
              { label: "Contratto per posteggio" },
              { label: "Recapiti e informazioni inquilini" },
              { label: "Condizioni generali" },
              { label: "Regolamento del bene locato" },
            ]}
          />
        </div>
      </section>
    </>
  );
}
