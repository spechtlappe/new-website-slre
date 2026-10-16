import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { SectionHeading } from "@/components/SectionHeading";
import { DocList, PageIntro, StepList } from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Vendere",
  description: "Vendere una casa, con calma e con metodo. Il processo in otto passi.",
};

const steps = [
  { title: "Il primo incontro", text: "Ci racconta la sua casa e i suoi tempi. Senza impegno." },
  {
    title: "La valutazione",
    text: "Un sopralluogo gratuito e un prezzo realistico: non così basso da svalutarla, non così alto da tenerla ferma sul mercato. Su richiesta, una perizia certificata.",
  },
  { title: "Il mandato", text: "Concordiamo prezzo, tempi e documenti, poi firmiamo il mandato di vendita." },
  {
    title: "La presentazione",
    text: "Foto e video professionali, testi in italiano, tedesco e inglese, una brochure dedicata.",
  },
  {
    title: "Le visite",
    text: "Selezioniamo gli interessati, li accompagniamo e trattiamo per lei prezzo, pagamento e data di consegna.",
  },
  {
    title: "La riservazione",
    text: "Acquirente e venditore firmano l’accordo di riservazione; l’acquirente versa di norma un acconto del 10% presso il notaio.",
  },
  {
    title: "Il rogito",
    text: "Con il notaio prepariamo il contratto di compravendita, verifichiamo la promessa di pagamento della banca e la accompagniamo all’atto.",
  },
  {
    title: "Le chiavi",
    text: "Consegniamo insieme la casa al nuovo proprietario. E restiamo raggiungibili anche dopo.",
  },
];

export default function VenderePage() {
  return (
    <>
      <PageIntro
        eyebrow="Oltre trent’anni di esperienza"
        title={
          <>
            Vendere una casa, <em>con calma e con metodo.</em>
          </>
        }
        image="/images/campagna/brochure-microlino.jpg"
        imageAlt="Consulente SLRE con la brochure di vendita accanto alla Microlino"
        actions={
          <>
            <Link href="/contatto?obiettivo=vendere" className="btn btn--primary">
              Valutazione gratuita →
            </Link>
            <a href="https://heyzine.com/flip-book/e60bc1f120.html" target="_blank" rel="noopener noreferrer" className="btn btn--outline">
              Sfogli SLRE Vendita
            </a>
          </>
        }
      >
        <p>
          Ogni casa porta con sé dei ricordi, e venderla non è mai solo una transazione. Il nostro
          lavoro è renderla semplice: il prezzo giusto, la presentazione giusta, le persone giuste
          alla porta. Ci occupiamo noi di documenti, visite, trattative e aspetti legali, così lei
          può pensare a cosa viene dopo.
        </p>
        <p>
          Ogni consulente segue un numero limitato di case. La provvigione è dovuta solo a vendita
          conclusa.
        </p>
      </PageIntro>

      <section className="section section--white" aria-labelledby="processo">
        <div className="container">
          <SectionHeading
            id="processo"
            eyebrow="Il processo"
            title={
              <>
                In otto passi, <em>dalla prima visita alle chiavi.</em>
              </>
            }
          />
          <StepList steps={steps} />
        </div>
      </section>

      <section id="sviluppo" className="section section--beige" aria-labelledby="sviluppo-title">
        <div className="container" style={{ display: "grid", gap: 48, gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
          <div>
            <span className="eyebrow">Sviluppo</span>
            <h2 id="sviluppo-title" className="h2" style={{ margin: "14px 0 18px" }}>
              Anche progetti <em>nuovi.</em>
            </h2>
            <p className="lead">
              Seguiamo anche progetti nuovi, per proprietari, architetti e investitori: ricerca del
              terreno, analisi di mercato, concetto, direzione lavori e commercializzazione. Tra i
              progetti recenti: Residenza Seiquattro ad Ascona, Residenza Pedramonte a Locarno, la
              sede di Avancon SA a Riazzino.
            </p>
          </div>
          <div>
            <span className="eyebrow">Documenti</span>
            <div style={{ marginTop: 18 }}>
              <DocList
                docs={[
                  { label: "Il processo di vendita (PDF)" },
                  { label: "Imposta sugli utili immobiliari (PDF)" },
                  { label: "Sfogli la brochure SLRE Vendita", href: "https://heyzine.com/flip-book/e60bc1f120.html" },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
