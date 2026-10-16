import Link from "next/link";
import { contact } from "@/lib/data/site";
import styles from "./MobileActionBar.module.css";

/** "Chiama" e "Scrivi" sempre in basso su mobile. */
export function MobileActionBar() {
  return (
    <div className={styles.bar}>
      <a href={contact.phoneHref} className="btn btn--primary">
        Chiama
      </a>
      <Link href="/contatto" className="btn btn--outline">
        Scrivi
      </Link>
    </div>
  );
}
