import Link from "next/link";
import { contact, footerOffices } from "@/lib/data/site";
import { Logo } from "./Logo";
import { NewsletterForm } from "./NewsletterForm";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brand}>
          <Logo variant="bianco" width={180} />
          <p className={styles.newsletterText}>
            Newsletter: il Journal e le nuove case, prima che altrove.
          </p>
          <NewsletterForm />
        </div>

        <div className={styles.cols}>
          {footerOffices.map((o) => (
            <div key={o.id}>
              <span className={styles.label}>{o.name}</span>
              <p>
                {o.street}
                <br />
                {o.city}
              </p>
            </div>
          ))}
          <div>
            <span className={styles.label}>Contatto</span>
            <p>
              <a href={contact.phoneHref}>{contact.phone}</a>
              <br />
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
            <p className={styles.hours}>
              Lu–Ve 8.30–12 · 13.30–17.30
              <br />
              Sa–Do su appuntamento
            </p>
          </div>
          <div>
            <span className={styles.label}>Servizi</span>
            <p>
              <Link href="/gestione">Gestione e sportello 24/7</Link>
              <br />
              <Link href="/chi-siamo#lavora-con-noi">Lavora con noi</Link>
              <br />
              <Link href="/chi-siamo#galleria">Galleria Menouno</Link>
            </p>
          </div>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <span>© Specht &amp; Lappe Real Estate SA · Membro SVIT Ticino · SIV</span>
        <nav aria-label="Note legali" className={styles.legal}>
          <a href="#">Privacy</a>
          <a href="#">Note legali</a>
          <a href="#">Impressum</a>
          <a href="#">Instagram</a>
          <a href="#">LinkedIn</a>
        </nav>
      </div>
    </footer>
  );
}
