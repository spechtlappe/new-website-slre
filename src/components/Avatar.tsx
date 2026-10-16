import Image from "next/image";
import { initials } from "@/lib/format";
import type { TeamMember } from "@/lib/types";
import styles from "./Avatar.module.css";

type Props = {
  member: Pick<TeamMember, "name" | "photo">;
  sizes: string;
  className?: string;
  shape?: "portrait" | "round";
};

/** Foto del team; senza foto mostra le iniziali. */
export function Avatar({ member, sizes, className, shape = "portrait" }: Props) {
  return (
    <span className={`${styles.avatar} ${className ?? ""}`} data-shape={shape}>
      {member.photo ? (
        <Image src={member.photo} alt={member.name} fill sizes={sizes} className={styles.img} />
      ) : (
        <span className={styles.initials} aria-label={member.name}>
          {initials(member.name)}
        </span>
      )}
    </span>
  );
}
