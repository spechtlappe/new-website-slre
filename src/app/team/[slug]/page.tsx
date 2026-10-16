import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Avatar } from "@/components/Avatar";
import { getTeam, getTeamMember } from "@/lib/crm";
import { offices } from "@/lib/data/site";
import styles from "./page.module.css";

export async function generateStaticParams() {
  const team = await getTeam();
  return team.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps<"/team/[slug]">): Promise<Metadata> {
  "use cache";
  const { slug } = await params;
  const member = await getTeamMember(slug);
  return member ? { title: `${member.name}, ${member.role}` } : { title: "Team" };
}

export default function TeamMemberPage({ params }: PageProps<"/team/[slug]">) {
  return (
    <Suspense fallback={<div style={{ minHeight: "80vh" }} aria-hidden="true" />}>
      <MemberDetail params={params} />
    </Suspense>
  );
}

async function MemberDetail({ params }: Pick<PageProps<"/team/[slug]">, "params">) {
  const { slug } = await params;
  const member = await getTeamMember(slug);
  if (!member) notFound();

  const [first, ...last] = member.name.split(" ");
  const office = offices.find((o) => o.id === member.office);
  const bio = member.bio ?? [
    `${first} fa parte del team di Specht & Lappe Real Estate. La sua presentazione è in preparazione.`,
  ];

  return (
    <section className="section">
      <div className="container">
        <Link href="/chi-siamo#team" className={styles.back}>
          ← Torna al team
        </Link>
        <div className={styles.layout}>
          <Avatar member={member} sizes="(max-width: 767px) 100vw, 420px" className={styles.photo} />

          <div className={styles.text}>
            <span className="eyebrow">Il nostro team{office ? ` · ${office.name}` : ""}</span>
            <h1 className="display">
              {first} <em>{last.join(" ")}</em>
            </h1>
            <p className={styles.role}>{member.role}</p>
            {member.qualifications && <p className={styles.quals}>{member.qualifications}</p>}
            <ul className={styles.langs} aria-label="Lingue parlate">
              {member.languages.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>

            <div className={`prose ${styles.bio}`}>
              {bio.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>

            <dl className={styles.contacts}>
              <div>
                <dt>E-mail</dt>
                <dd>
                  <a href={`mailto:${member.email}`}>{member.email}</a>
                </dd>
              </div>
              <div>
                <dt>Telefono</dt>
                <dd>
                  <a href={`tel:${member.phone.replace(/[^\d+]/g, "")}`}>{member.phone}</a>
                </dd>
              </div>
              {office && (
                <div>
                  <dt>Sede</dt>
                  <dd>
                    {office.name}, {office.street}
                  </dd>
                </div>
              )}
            </dl>

            <div className={styles.buttons}>
              <a href={`mailto:${member.email}`} className="btn btn--primary">
                Scrivere a {first} →
              </a>
              <Link href="/contatto" className="btn btn--outline">
                Prenota una consulenza
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
