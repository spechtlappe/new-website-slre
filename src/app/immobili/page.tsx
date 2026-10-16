import type { Metadata } from "next";
import { Suspense } from "react";
import { OffMarketForm } from "@/components/OffMarketForm";
import { PropertyBrowser } from "@/components/PropertyBrowser";
import { SectionHeading } from "@/components/SectionHeading";
import { getProperties } from "@/lib/crm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Immobili",
  description: "Appartamenti, ville, rustici e terreni tra il Lago Maggiore e il Luganese.",
};

export default async function ImmobiliPage() {
  const properties = await getProperties();

  return (
    <>
      <section className={`section ${styles.top}`}>
        <div className="container">
          <SectionHeading
            as="h1"
            align="center"
            eyebrow="Ticino · Lago Maggiore e Lago di Lugano"
            title={
              <>
                La nostra offerta <em>immobiliare.</em>
              </>
            }
            intro="Appartamenti, ville, rustici e terreni tra il Lago Maggiore e il Luganese. Ogni scheda è scritta da chi conosce la casa di persona."
          />
          <Suspense fallback={<div className={styles.fallback} aria-hidden="true" />}>
            <PropertyBrowser properties={properties} />
          </Suspense>
        </div>
      </section>

      <section id="off-market" className="section section--beige" aria-labelledby="off-market-title">
        <div className={`container ${styles.offMarket}`}>
          <div className={styles.offMarketText}>
            <span className="eyebrow">Niente che fa per voi?</span>
            <h2 id="off-market-title" className="h2">
              Alcune case non vengono <em>mai pubblicate.</em>
            </h2>
            <p className="lead">
              Alcune proprietà restano off-market: i proprietari preferiscono la discrezione. Ci
              descriva cosa cerca e la contatteremo solo quando avremo qualcosa di pertinente.
            </p>
          </div>
          <OffMarketForm />
        </div>
      </section>
    </>
  );
}
