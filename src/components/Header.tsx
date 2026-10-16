import Link from "next/link";
import { nav } from "@/lib/data/site";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Logo className={styles.logo} />

        <nav className={styles.nav} aria-label="Navigazione principale">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={styles.link}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <div className={styles.langs} aria-label="Lingua">
            <span aria-current="true">IT</span>
            <span title="Versione tedesca in arrivo">DE</span>
            <span title="Versione inglese in arrivo">EN</span>
          </div>
          <Link href="/contatto" className={`btn btn--primary btn--sm ${styles.cta}`}>
            Prenota una consulenza
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
