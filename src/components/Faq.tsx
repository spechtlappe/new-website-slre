import { faqs } from "@/lib/data/site";
import styles from "./Faq.module.css";

export function Faq() {
  return (
    <div className={styles.list}>
      {faqs.map((item, i) => (
        <details key={item.q} className={styles.item} open={i === 0}>
          <summary className={styles.q}>
            {item.q}
            <span className={styles.icon} aria-hidden="true" />
          </summary>
          <p className={styles.a}>{item.a}</p>
        </details>
      ))}
    </div>
  );
}
