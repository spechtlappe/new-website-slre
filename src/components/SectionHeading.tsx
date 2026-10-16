import type { ReactNode } from "react";
import styles from "./SectionHeading.module.css";

type Props = {
  eyebrow?: string;
  /** Titolo; la parola chiave va in <em> (corsivo bordeaux). */
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
  as?: "h1" | "h2";
  align?: "left" | "center";
  id?: string;
};

export function SectionHeading({ eyebrow, title, intro, action, as = "h2", align = "left", id }: Props) {
  const Tag = as;
  return (
    <div className={styles.wrap} data-align={align}>
      <div className={styles.text}>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <Tag id={id} className={as === "h1" ? "display" : "h2"}>
          {title}
        </Tag>
        {intro && <p className="lead">{intro}</p>}
      </div>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
