import Link from "next/link";
import type { TeamMember } from "@/lib/types";
import { Avatar } from "./Avatar";
import styles from "./TeamCard.module.css";

const short: Record<string, string> = {
  Italiano: "IT",
  Tedesco: "DE",
  Inglese: "EN",
  Francese: "FR",
  Portoghese: "PT",
  Spagnolo: "ES",
  Olandese: "NL",
  Romancio: "RM",
};

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <Link href={`/team/${member.slug}`} className={styles.card}>
      <Avatar member={member} sizes="(max-width: 600px) 50vw, 220px" className={styles.photo} />
      <span className={styles.name}>{member.name}</span>
      <span className={styles.role}>{member.role}</span>
      <span className={styles.langs} aria-label={`Lingue: ${member.languages.join(", ")}`}>
        {member.languages.map((l) => short[l] ?? l).join(" · ")}
      </span>
    </Link>
  );
}
