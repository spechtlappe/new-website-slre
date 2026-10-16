// Modello dati del sito. Gli immobili arriveranno dal CRM Nestermind:
// l'adattatore (src/lib/crm) traduce i dati del CRM in questi tipi,
// così le pagine non dipendono dal formato del gestionale.

export type ImageAsset = {
  src: string;
  alt: string;
};

export type Transaction = "vendita" | "affitto";

/** Disponibile o venduto (i venduti diventano referenze). */
export type PropertyStatus = "disponibile" | "riservato" | "venduto";

export type PropertyType =
  | "Appartamento"
  | "Attico"
  | "Villa"
  | "Casa"
  | "Rustico"
  | "Chalet"
  | "Terreno";

export type Property = {
  /** ID del record nel CRM. */
  id: string;
  slug: string;
  reference: string;
  title: string;
  type: PropertyType;
  transaction: Transaction;
  status: PropertyStatus;
  badge?: "In evidenza" | "Nuovo" | "Disponibile" | "Prezzo ridotto";
  location: {
    town: string;
    region: string;
  };
  /** null = prezzo su richiesta. Per l'affitto è il canone mensile. */
  price: number | null;
  rooms: number;
  livingArea: number;
  landArea?: number;
  floor?: string;
  yearBuilt?: number;
  availability?: string;
  highlights: string[];
  description: string[];
  features: string[];
  images: ImageAsset[];
  floorPlans: (ImageAsset & { label: string })[];
  agentSlug: string;
};

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  qualifications?: string;
  languages: string[];
  email: string;
  phone: string;
  office?: OfficeId;
  photo?: string;
  partner?: boolean;
  bio?: string[];
};

export type OfficeId = "muralto" | "ascona" | "morcote" | "zurigo";

export type Office = {
  id: OfficeId;
  name: string;
  street: string;
  city: string;
};
