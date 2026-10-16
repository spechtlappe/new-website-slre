import { cacheLife, cacheTag } from "next/cache";
import { team } from "@/lib/data/team";
import type { Property, TeamMember } from "@/lib/types";
import { mockProperties } from "./mock-properties";

// Unico punto d'accesso ai dati degli immobili.
//
// Oggi legge i dati di esempio. Per collegare Nestermind basta scrivere un
// adattatore che implementi `PropertySource` (chiamate API + mappatura dei
// campi verso `Property`) e sceglierlo qui sotto: pagine e componenti non
// cambiano. Le funzioni sono in cache ("use cache") con il tag "properties":
// un webhook del CRM potrà chiamare revalidateTag("properties", "max") per
// aggiornare il sito appena un immobile cambia.

export interface PropertySource {
  list(): Promise<Property[]>;
}

const mockSource: PropertySource = {
  async list() {
    return mockProperties;
  },
};

const source: PropertySource = mockSource;

export async function getProperties(): Promise<Property[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("properties");
  return source.list();
}

export async function getProperty(slug: string): Promise<Property | undefined> {
  "use cache";
  cacheLife("hours");
  cacheTag("properties", `property-${slug}`);
  const all = await source.list();
  return all.find((p) => p.slug === slug);
}

export async function getFeaturedProperties(limit = 3): Promise<Property[]> {
  const all = await getProperties();
  return all
    .filter((p) => p.transaction === "vendita" && p.status === "disponibile")
    .slice(0, limit);
}

export async function getTeam(): Promise<TeamMember[]> {
  return team;
}

export async function getTeamMember(slug: string): Promise<TeamMember | undefined> {
  return team.find((m) => m.slug === slug);
}
