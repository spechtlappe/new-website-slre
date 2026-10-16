import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { MortgageCalculator } from "@/components/MortgageCalculator";
import { SectionHeading } from "@/components/SectionHeading";
import { PageIntro, StepList } from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Acquistare",
  description: "Trovare la casa giusta in Ticino: il processo in otto passi e il calcolatore ipoteca.",
};

const steps = [
  { title: "L’interesse", text: "Ha visto una casa che le piace? Ci scriva: chiariamo i dubbi e fissiamo una prima visita." },
  { title: "La visita", text: "La accompagniamo e le raccontiamo la casa, anche nei dettagli che non stanno in un annuncio." },
  { title: "I documenti", text: "Le inviamo planimetrie, estratti e tutto ciò che serve per decidere." },
  { title: "L’offerta", text: "Mettiamo per iscritto prezzo e data di consegna desiderata." },
  {
    title: "Il finanziamento",
    text: "Se lo desidera, la mettiamo in contatto con istituti indipendenti con cui i nostri clienti si sono trovati bene.",
  },
  {
    title: "La riservazione",
    text: "Con la conferma del finanziamento firma l’accordo di riservazione e versa un acconto, di norma il 10%.",
  },
  {
    title: "Il rogito",
    text: "Coordiniamo notaio e banca e le spieghiamo il contratto riga per riga. Diventa proprietario con l’iscrizione a registro fondiario.",
  },
  {
    title: "Le chiavi",
    text: "E se poi servono un artigiano o una ristrutturazione, conosciamo le persone giuste.",
  },
];

export default function AcquistarePage() {
  return (
    <>
      <PageIntro
        eyebrow="Acquistare"
        title={
          <>
            Trovare <em>la casa giusta.</em>
          </>
        }
        image="/images/campagna/microlino-lungolago.jpg"
        imageAlt="La Microlino SLRE sul lungolago di Ascona"
        actions={
          <>
            <Link href="/immobili" className="btn btn--primary">
              Scopra gli immobili →
            </Link>
            <Link href="/immobili#off-market" className="btn btn--outline">
              Profilo di ricerca
            </Link>
          </>
        }
      >
        <p>
          Comprare casa è una decisione felice, e anche una decisione complessa. Conosciamo di
          persona ogni casa che proponiamo: le diremo con franchezza cosa ha di bello e cosa meno. Se
          la casa giusta non è ancora sul mercato, la cerchiamo con lei.
        </p>
      </PageIntro>

      <section className="section section--white" aria-labelledby="processo">
        <div className="container">
          <SectionHeading
            id="processo"
            eyebrow="Il processo"
            title={
              <>
                In otto passi, <em>fino alle chiavi.</em>
              </>
            }
          />
          <StepList steps={steps} />
        </div>
      </section>

      <section className="section section--beige" aria-labelledby="calcolatore">
        <div className="container">
          <SectionHeading
            id="calcolatore"
            eyebrow="Calcolatore ipoteca"
            title={
              <>
                Quanto posso <em>spendere?</em>
              </>
            }
            intro="Di regola il 20% del prezzo deve essere capitale proprio, di cui almeno la metà in mezzi liquidi; il resto può arrivare dalla cassa pensione. Interessi, manutenzione e spese accessorie non dovrebbero superare un terzo del reddito lordo annuo."
          />
          <MortgageCalculator />
        </div>
      </section>

      <section className="section" aria-labelledby="estero">
        <div className="container" style={{ maxWidth: 880 }}>
          <span className="eyebrow">Lex Koller</span>
          <h2 id="estero" className="h2" style={{ margin: "14px 0 18px" }}>
            Acquistare in Svizzera <em>dall’estero.</em>
          </h2>
          <p className="lead">
            Per chi non risiede in Svizzera valgono le regole della Lex Koller. Le spieghiamo cosa è
            possibile e cosa no prima ancora della prima visita.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
