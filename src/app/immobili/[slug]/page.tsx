import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Avatar } from "@/components/Avatar";
import { PropertyCard } from "@/components/PropertyCard";
import { getProperties, getProperty, getTeamMember } from "@/lib/crm";
import { contact } from "@/lib/data/site";
import { formatPrice, formatRooms } from "@/lib/format";
import styles from "./page.module.css";

export async function generateStaticParams() {
  const properties = await getProperties();
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/immobili/[slug]">): Promise<Metadata> {
  "use cache";
  const { slug } = await params;
  const property = await getProperty(slug);
  if (!property) return { title: "Immobile non trovato" };
  return {
    title: `${property.title}, ${property.location.town}`,
    description: property.description[0],
    openGraph: { images: property.images[0] ? [property.images[0].src] : [] },
  };
}

export default function PropertyPage({ params }: PageProps<"/immobili/[slug]">) {
  return (
    <Suspense fallback={<div className={styles.fallback} aria-hidden="true" />}>
      <PropertyDetail params={params} />
    </Suspense>
  );
}

async function PropertyDetail({ params }: Pick<PageProps<"/immobili/[slug]">, "params">) {
  const { slug } = await params;
  const property = await getProperty(slug);
  if (!property) notFound();

  const [agent, all] = await Promise.all([getTeamMember(property.agentSlug), getProperties()]);
  const related = all
    .filter((p) => p.slug !== property.slug && p.transaction === property.transaction && p.status !== "venduto")
    .slice(0, 3);
  const [main, ...rest] = property.images;
  const isSold = property.status === "venduto";
  const visitHref = `/contatto?obiettivo=${property.transaction === "affitto" ? "affitto" : "acquistare"}&immobile=${property.reference}`;

  const facts: [string, string | undefined][] = [
    ["Riferimento", property.reference],
    ["Stato", isSold ? "Venduto" : property.status === "riservato" ? "Riservato" : "Disponibile"],
    ["Tipo", property.type],
    ["Locali", formatRooms(property.rooms)],
    ["Superficie abitabile", `${property.livingArea} m²`],
    ["Terreno", property.landArea ? `${property.landArea} m²` : undefined],
    ["Piano", property.floor],
    ["Anno di costruzione", property.yearBuilt ? String(property.yearBuilt) : undefined],
    ["Disponibilità", property.availability],
  ];

  return (
    <>
      <div className={`container ${styles.page}`}>
        <Link href="/immobili" className={styles.back}>
          ← Tutti gli immobili
        </Link>

        <div className={styles.gallery} data-count={Math.min(property.images.length, 3)}>
          {main && (
            <div className={styles.galleryMain}>
              <Image src={main.src} alt={main.alt} fill preload sizes="(max-width: 900px) 100vw, 66vw" className={styles.cover} />
              {(property.badge || isSold) && <span className={styles.badge}>{isSold ? "Venduto" : property.badge}</span>}
              <span className={styles.photoCount}>{property.images.length} foto</span>
            </div>
          )}
          {rest.slice(0, 2).map((img) => (
            <div key={img.src} className={styles.gallerySide}>
              <Image src={img.src} alt={img.alt} fill sizes="(max-width: 900px) 50vw, 33vw" className={styles.cover} />
            </div>
          ))}
        </div>

        <header className={styles.head}>
          <div className={styles.headText}>
            <span className="eyebrow">
              {property.location.town} · {property.location.region} · Rif. {property.reference}
            </span>
            <h1 className="h2">{property.title}</h1>
            <ul className={styles.tags}>
              <li>{property.type}</li>
              <li>{formatRooms(property.rooms)}</li>
              <li>{property.livingArea} m²</li>
              {property.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
          <div className={styles.priceBox}>
            <span className="eyebrow">{property.transaction === "affitto" ? "Canone mensile" : "Prezzo di vendita"}</span>
            <span className={styles.price}>{formatPrice(property)}</span>
          </div>
        </header>

        <div className={styles.layout}>
          <div className={styles.main}>
            <section aria-labelledby="descrizione">
              <h2 id="descrizione" className="h3">
                Descrizione
              </h2>
              <div className={`prose ${styles.description}`}>
                {property.description.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
              <span className={`eyebrow ${styles.subhead}`}>Caratteristiche</span>
              <ul className={styles.features}>
                {property.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </section>

            {property.floorPlans.length > 0 && (
              <section aria-labelledby="planimetria" className={styles.plans}>
                <h2 id="planimetria" className="h3">
                  Planimetria
                </h2>
                {property.floorPlans.map((plan) => (
                  <figure key={plan.src} className={styles.plan}>
                    <Image
                      src={plan.src}
                      alt={plan.alt}
                      width={1600}
                      height={1000}
                      sizes="(max-width: 900px) 100vw, 760px"
                      className={styles.planImg}
                    />
                    <figcaption>{plan.label}</figcaption>
                  </figure>
                ))}
                <div className={styles.planActions}>
                  {property.floorPlans.map((plan) => (
                    <a key={plan.src} href={plan.src} download className="btn btn--outline btn--sm">
                      Scarica la planimetria · {plan.label}
                    </a>
                  ))}
                  {!isSold && (
                    <Link href={visitHref} className="btn btn--outline btn--sm">
                      Documentazione completa
                    </Link>
                  )}
                </div>
              </section>
            )}
          </div>

          <aside className={styles.aside}>
            {agent && (
              <div className={styles.agent}>
                <span className="eyebrow">Il vostro consulente</span>
                <Link href={`/team/${agent.slug}`} className={styles.agentRow}>
                  <Avatar member={agent} sizes="56px" shape="round" className={styles.agentPhoto} />
                  <span>
                    <span className={styles.agentName}>{agent.name}</span>
                    <span className={styles.agentRole}>{agent.role}</span>
                  </span>
                </Link>
                {isSold ? (
                  <Link href="/contatto?obiettivo=vendere" className="btn btn--primary">
                    Vendere una casa simile
                  </Link>
                ) : (
                  <Link href={visitHref} className="btn btn--primary">
                    Prenota una visita
                  </Link>
                )}
                <a href={contact.phoneHref} className="btn btn--outline">
                  {agent.phone}
                </a>
              </div>
            )}
            <div className={styles.facts}>
              <span className="eyebrow">Dati principali</span>
              <dl>
                {facts
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
              </dl>
            </div>
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section section--beige" aria-labelledby="simili">
          <div className="container">
            <h2 id="simili" className="h2" style={{ marginBottom: 32 }}>
              Altri immobili <em>per lei.</em>
            </h2>
            <div className={styles.related}>
              {related.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
