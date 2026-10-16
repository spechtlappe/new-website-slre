import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { DocList, PageIntro } from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Stime",
  description: "Perizie certificate ISO 17024 / SEC 04.1 secondo gli Standard di valutazione svizzeri.",
};

const objects = [
  "Appartamenti, case e ville",
  "Stabili plurifamiliari e nuove proprietà per piani",
  "Terreni",
  "Immobili commerciali e alberghi",
];

export default function StimePage() {
  return (
    <>
      <PageIntro
        eyebrow="Stime immobiliari · ISO 17024"
        title={
          <>
            Quanto vale <em>davvero la sua casa.</em>
          </>
        }
        image="/images/home/morcote-lago.jpg"
        imageAlt="Morcote vista dal Lago di Lugano"
        actions={
          <Link href="/contatto?obiettivo=stima" className="btn btn--primary">
            Richieda una stima →
          </Link>
        }
      >
        <p>
          Un prezzo giusto è il punto di partenza di ogni buona vendita, ma anche di una
          successione, di un divorzio, di un rifinanziamento. Le nostre perizie seguono gli Standard
          di valutazione svizzeri (SVS) e i metodi riconosciuti a livello internazionale.
        </p>
        <p>
          Siamo certificati ISO 17024/SEC 04.1. Le nostre stime sono riconosciute da banche,
          preture, tribunali, avvocati, notai e fondi immobiliari. Il rapporto arriva entro 14 giorni
          dal sopralluogo, in italiano o in tedesco, su richiesta in altre lingue.
        </p>
      </PageIntro>

      <section className="section section--white">
        <div className="container" style={{ display: "grid", gap: 48, gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
          <div>
            <span className="eyebrow">Cosa valutiamo</span>
            <ul style={{ listStyle: "none", marginTop: 18 }}>
              {objects.map((o) => (
                <li
                  key={o}
                  className="h3"
                  style={{ padding: "16px 0", borderBottom: "1px solid var(--line)" }}
                >
                  {o}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="eyebrow">Documenti</span>
            <div style={{ marginTop: 18 }}>
              <DocList
                docs={[
                  { label: "Listino prezzi" },
                  { label: "Documenti necessari per la stima" },
                  { label: "Mandato e procura" },
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
