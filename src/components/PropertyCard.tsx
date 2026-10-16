import Image from "next/image";
import Link from "next/link";
import { formatPrice, formatRooms } from "@/lib/format";
import type { Property } from "@/lib/types";
import styles from "./PropertyCard.module.css";

export function PropertyCard({ property }: { property: Property }) {
  const cover = property.images[0];
  const badge = property.status === "venduto" ? "Venduto" : property.badge;

  return (
    <article className={styles.card}>
      <Link href={`/immobili/${property.slug}`} className={styles.link}>
        <div className={styles.media}>
          {cover && (
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 400px"
              className={styles.image}
            />
          )}
          {badge && <span className={styles.badge}>{badge}</span>}
        </div>
        <div className={styles.body}>
          <span className="eyebrow">{property.location.region}</span>
          <h3 className={styles.title}>{property.title}</h3>
          <p className={styles.town}>{property.location.town}</p>
          <p className={styles.price}>{formatPrice(property)}</p>
          <ul className={styles.facts}>
            <li>{formatRooms(property.rooms)}</li>
            <li>{property.livingArea} m²</li>
            {property.highlights[0] && <li>{property.highlights[0]}</li>}
          </ul>
        </div>
      </Link>
    </article>
  );
}
