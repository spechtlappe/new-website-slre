import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { PropertyCard } from "@/components/PropertyCard";
import { QuickSearch } from "@/components/QuickSearch";
import { SectionHeading } from "@/components/SectionHeading";
import { getFeaturedProperties, getProperties } from "@/lib/crm";
import { gallery, keyFigures, processSteps, publications, services } from "@/lib/data/site";
import { formatPrice } from "@/lib/format";
import type { Property } from "@/lib/types";
import styles from "./page.module.css";

export default async function Home() {
  const [featured, all] = await Promise.all([getFeaturedProperties(3), getProperties()]);
  const highlight = featured[0];
  const towns = [...new Set(all.map((p) => p.location.town))].sort();

  return (
    <>
      <Hero highlight={highlight} towns={towns} />

      {/* 2 · La nostra offerta immobiliare */}
      <section className="section" aria-labelledby="offerta">
        <div className="container">
          <SectionHeading
            id="offerta"
            eyebrow="Immobili in vendita"
            title={
              <>
                La nostra offerta <em>immobiliare.</em>
              </>
            }
            intro="Una selezione delle case che seguiamo in questo momento, tra il Lago Maggiore e il Ceresio."
            action={
              <Link href="/immobili" className="btn btn--outline btn--sm">
                Tutti gli immobili →
              </Link>
            }
          />
          <div className={styles.grid3}>
            {featured.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 3 · Chi siamo, processo e servizi */}
      <section className="section section--white" aria-labelledby="chi-siamo">
        <div className={`container ${styles.about}`}>
          <div className={styles.aboutMedia}>
            <Image
              src="/images/campagna/passione-vivere-bene.jpg"
              alt="Il team SLRE sul lungolago di Ascona con la Microlino"
              fill
              sizes="(max-width: 900px) 100vw, 520px"
              className={styles.cover}
            />
          </div>
          <div className={styles.aboutText}>
            <span className="eyebrow">Chi siamo</span>
            <h2 id="chi-siamo" className="h2">
              Passione per <em>il vivere bene.</em>
            </h2>
            <p className="lead">
              Una casa non è mai solo una superficie. È la luce sul lago al mattino, la strada per
              la scuola, il silenzio di un giardino. Per questo ogni incarico comincia da una
              conversazione, non da un listino.
            </p>
            <blockquote className={styles.quote}>
              “Poche case per volta, molta attenzione per ciascuna, e la stessa franchezza con chi
              vende e con chi compra.”
            </blockquote>
            <div className={styles.buttons}>
              <Link href="/chi-siamo#team" className="btn btn--primary">
                Il nostro team →
              </Link>
              <Link href="/chi-siamo" className="btn btn--outline">
                La nostra storia
              </Link>
            </div>
          </div>
        </div>

        <div className={`container ${styles.process}`}>
          <SectionHeading
            eyebrow="Il processo, in quattro passi"
            title={
              <>
                Dalla consulenza <em>alla consegna.</em>
              </>
            }
          />
          <ol className={styles.steps}>
            {processSteps.map((step, i) => (
              <li key={step.title} className={styles.step}>
                <span className={styles.stepNo}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="container">
          <dl className={styles.figures}>
            {keyFigures.map((f) => (
              <div key={f.value} className={styles.figure}>
                <dt>{f.value}</dt>
                <dd>{f.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={`container ${styles.services}`}>
          <SectionHeading
            eyebrow="I nostri servizi"
            title={
              <>
                Un approccio <em>su misura.</em>
              </>
            }
            intro="Dietro ogni immobile c’è una storia e dietro ogni ricerca un progetto di vita. La ascoltiamo, poi costruiamo con lei il percorso giusto."
          />
          <div className={styles.serviceGrid}>
            {services.map((s, i) => (
              <Link key={s.title} href={s.href} className={styles.service} data-accent={i === 0}>
                <span className={styles.serviceNo}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h3">{s.title}</h3>
                <p>{s.text}</p>
                <span className={styles.serviceCta}>{s.cta} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4 · Le sedi e la Galleria Menouno */}
      <section className="section" aria-labelledby="sedi">
        <div className="container">
          <SectionHeading
            id="sedi"
            eyebrow="Le nostre sedi"
            title={
              <>
                Muralto, Morcote <em>e Ascona.</em>
              </>
            }
            intro="Ad Ascona, nel cuore della perla del Lago Maggiore, la nostra real estate lounge accoglie i clienti in un ambiente elegante e curato. Ci trovate anche a Muralto e a Morcote."
          />
          <div className={styles.offices}>
            <figure className={styles.officeMain}>
              <Image
                src="/images/sedi/ascona-lounge.jpg"
                alt="La real estate lounge SLRE di Ascona"
                fill
                sizes="(max-width: 900px) 100vw, 600px"
                className={styles.cover}
              />
              <figcaption className={styles.tag}>Ascona · Viale Bartolomeo Papio 6</figcaption>
            </figure>
            <figure className={styles.officeSide}>
              <Image
                src="/images/sedi/ascona-bar.jpg"
                alt="Il bancone della lounge di Ascona"
                fill
                sizes="(max-width: 900px) 50vw, 300px"
                className={styles.cover}
              />
            </figure>
            <figure className={styles.officeSide}>
              <Image
                src="/images/sedi/ascona-dettaglio.jpg"
                alt="Dettaglio in marmo e legno della sede di Ascona"
                fill
                sizes="(max-width: 900px) 50vw, 300px"
                className={styles.cover}
              />
            </figure>
          </div>

          <div className={styles.galleryBand}>
            <div>
              <span className="eyebrow">Galleria Menouno · Muralto</span>
              <p className={styles.galleryTitle}>
                Nella nostra sede di Muralto, <em>una sala per l’arte.</em>
              </p>
              <p className={styles.galleryText}>
                Quattro mostre l’anno con artisti della regione. Prossima esposizione:{" "}
                {gallery.nextShow.artist}, {gallery.nextShow.dates}.
              </p>
            </div>
            <Link href="/chi-siamo#galleria" className="btn btn--outline btn--sm">
              Scopra la galleria →
            </Link>
          </div>
        </div>
      </section>

      {/* 5 · Journal, brochure e Bellevue */}
      <section className="section section--beige" aria-labelledby="journal">
        <div className={`container ${styles.journal}`}>
          <div className={styles.journalText}>
            <span className="eyebrow">Da sfogliare</span>
            <h2 id="journal" className="h2">
              Il nostro Journal <em>e le brochure.</em>
            </h2>
            <p className="lead">
              Il Journal raccoglie case, territorio e storie del Ticino. Le brochure raccontano chi
              siamo e come vendiamo. Su carta nelle nostre sedi, online da sfogliare.
            </p>
            <ul className={styles.pubLinks}>
              {publications.map((p) => (
                <li key={p.href}>
                  <a href={p.href} target="_blank" rel="noopener noreferrer">
                    <span>
                      {p.title}, {p.subtitle.toLowerCase()}
                    </span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.journalMedia}>
            <div className={styles.journalPhoto}>
              <Image
                src="/images/campagna/journal-ascona.jpg"
                alt="Silvia e Max leggono il Journal SLRE ad Ascona"
                fill
                sizes="(max-width: 900px) 100vw, 640px"
                className={styles.cover}
                style={{ objectPosition: "center 72%" }}
              />
            </div>
            <div className={styles.covers}>
              {publications.map((p) => (
                <a key={p.href} href={p.href} target="_blank" rel="noopener noreferrer" className={styles.coverCard}>
                  <span className={styles.coverImg}>
                    <Image src={p.image} alt={p.title} fill sizes="200px" className={styles.cover} />
                  </span>
                  <span className={styles.coverCaption}>{p.caption}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.bellevue} aria-labelledby="bellevue">
        <Image src="/images/home/lago-maggiore.jpg" alt="" fill sizes="100vw" className={styles.bellevueBg} />
        <div className={`container ${styles.bellevueInner}`}>
          <div className={styles.bellevueText}>
            <span className={`eyebrow ${styles.onDark}`}>Best Property Agents 2026</span>
            <h2 id="bellevue" className={`h2 ${styles.onDarkTitle}`}>
              Premiati a livello <em>internazionale.</em>
            </h2>
            <p>
              La rivista Bellevue ci ha nominati tra i Best Property Agents 2026: un riconoscimento
              che valorizza standard qualitativi elevati e una conoscenza approfondita del mercato.
            </p>
          </div>
          <Image
            src="/images/brand/bellevue-2026.svg"
            alt="Bellevue Best Property Agents 2026"
            width={120}
            height={180}
            className={styles.bellevueLogo}
          />
        </div>
      </section>

      {/* 6 · FAQ, contatto e footer */}
      <section className="section" aria-labelledby="faq">
        <div className={`container ${styles.faq}`}>
          <SectionHeading
            id="faq"
            eyebrow="Domande frequenti"
            title={
              <>
                Rispondiamo con piacere <em>alle sue domande.</em>
              </>
            }
          />
          <Faq />
        </div>
      </section>

      <CtaBand />

    </>
  );
}

function Hero({
  highlight,
  towns,
}: {
  highlight: Property | undefined;
  towns: string[];
}) {
  // Art direction: Morcote incorniciata su desktop (versione A),
  // la Microlino nel vicolo di Ascona a tutto schermo su mobile.
  const common = { alt: "Morcote sul Lago di Lugano", sizes: "(max-width: 767px) 100vw, 50vw" };
  const {
    props: { srcSet: mobileSrcSet },
  } = getImageProps({ ...common, src: "/images/campagna/ascona-vicolo-microlino.jpg", width: 1600, height: 2495 });
  const {
    props: { srcSet: desktopSrcSet, ...rest },
  } = getImageProps({ ...common, src: "/images/home/morcote.jpg", width: 2400, height: 1599, preload: true });

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.heroGrid}`}>
        <div className={styles.heroText}>
          <span className={`eyebrow ${styles.heroEyebrow}`}>Muralto · Ascona · Morcote</span>
          <h1 id="hero-title" className={`display ${styles.heroTitle}`}>
            We bring you <em>home.</em>
          </h1>
          <p className={`lead ${styles.heroLead}`}>
            Da oltre trent’anni accompagniamo chi vende e chi acquista casa tra il Lago Maggiore e il
            Lago di Lugano, con competenza, discrezione e attenzione a ogni dettaglio.
          </p>
          <div className={styles.buttons}>
            <Link href="/immobili" className="btn btn--primary">
              Scopra gli immobili →
            </Link>
            <Link href="/contatto?obiettivo=stima" className={`btn btn--outline ${styles.heroSecondary}`}>
              Valutazione gratuita
            </Link>
          </div>
          <div className={styles.award}>
            <span className={styles.awardEyebrow}>Premio Bellevue</span>
            <span className={styles.awardTitle}>Best Property Agents 2026</span>
            <span className={styles.awardText}>Premiati a livello internazionale.</span>
          </div>
        </div>

        <div className={styles.heroMedia}>
          <picture>
            <source media="(max-width: 767px)" srcSet={mobileSrcSet} />
            <source media="(min-width: 768px)" srcSet={desktopSrcSet} />
            {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
            <img {...rest} className={styles.heroImg} />
          </picture>
          {highlight && (
            <Link href={`/immobili/${highlight.slug}`} className={styles.highlight}>
              <span className={styles.highlightThumb}>
                <Image src={highlight.images[0].src} alt="" fill sizes="80px" className={styles.cover} />
              </span>
              <span className={styles.highlightText}>
                <span className={styles.highlightEyebrow}>In evidenza · {highlight.location.town}</span>
                <span className={styles.highlightTitle}>{highlight.title}</span>
                <span className={styles.highlightPrice}>{formatPrice(highlight)}</span>
              </span>
            </Link>
          )}
        </div>
      </div>

      <div className={`container ${styles.search}`}>
        <QuickSearch towns={towns} />
      </div>
    </section>
  );
}
