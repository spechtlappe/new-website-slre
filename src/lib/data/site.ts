import type { Office } from "@/lib/types";

// Testi e dati fissi del sito, da "Testi nuovo sito slre.ch" (rev. 16.10.2026).

export const contact = {
  phone: "+41 (0)91 751 22 21",
  phoneHref: "tel:+41917512221",
  email: "info@slre.ch",
  hours: "Lunedì – venerdì 8.30–12.00 · 13.30–17.30",
  hoursNote: "Sabato e domenica su appuntamento",
};

export const nav = [
  { href: "/immobili", label: "Immobili" },
  { href: "/vendere", label: "Vendere" },
  { href: "/acquistare", label: "Acquistare" },
  { href: "/stime", label: "Stime" },
  { href: "/chi-siamo", label: "Chi siamo" },
  { href: "/journal", label: "Journal" },
];

/** Le tre sedi del sito. Zurigo compare solo nel footer (da confermare). */
export const offices: Office[] = [
  { id: "muralto", name: "Muralto", street: "Piazza Stazione 2", city: "6600 Muralto" },
  { id: "ascona", name: "Ascona", street: "Viale Bartolomeo Papio 6", city: "6612 Ascona" },
  { id: "morcote", name: "Morcote", street: "Riveta de la Tor 10", city: "6922 Morcote" },
];

export const footerOffices: Office[] = [
  ...offices,
  { id: "zurigo", name: "Zürich", street: "Seefeldstrasse 69", city: "8008 Zürich" },
];

export const processSteps = [
  { title: "Consulenza", text: "Ci racconta la sua casa, o quella che cerca, e i suoi tempi." },
  {
    title: "Valutazione",
    text: "Un sopralluogo e un prezzo realistico, secondo gli Standard Svizzeri.",
  },
  {
    title: "Presentazione",
    text: "Foto, video, testi in tre lingue, portali, Journal ed eventi.",
  },
  {
    title: "Consegna",
    text: "Trattativa, atto notarile e chiavi, con un solo interlocutore.",
  },
];

export const keyFigures = [
  { value: "1993", label: "Anno di fondazione" },
  { value: "3 sedi", label: "Muralto, Ascona, Morcote" },
  { value: "ISO 17024", label: "Periti certificati SEC 04.1" },
  { value: "5 lingue", label: "IT · DE · EN · FR · PT" },
  { value: "Bellevue 2026", label: "Best Property Agents" },
];

export const services = [
  {
    title: "Vendita",
    text: "La accompagniamo in tutte le fasi della vendita o dell’acquisto, con cura e trasparenza, dalla prima consulenza alla firma del contratto.",
    cta: "Vendere con noi",
    href: "/vendere",
  },
  {
    title: "Stime",
    text: "Valutiamo gli immobili con metodo, secondo gli Standard di Valutazione Svizzeri. Perizie certificate ISO 17024 / SEC 04.1.",
    cta: "Richieda una stima",
    href: "/stime",
  },
  {
    title: "Gestione",
    text: "Amministriamo stabili a reddito con attenzione, affidabilità e uno sguardo a lungo termine.",
    cta: "Scopra di più",
    href: "/gestione",
  },
  {
    title: "Sviluppo",
    text: "Seguiamo progetti nuovi su tutto il territorio, dall’analisi del terreno alla vendita.",
    cta: "Scopra di più",
    href: "/vendere#sviluppo",
  },
];

export const publications = [
  {
    title: "SLRE Journal",
    subtitle: "Sfogli il Journal",
    caption: "Journal · Vol. 4",
    image: "/images/journal/journal-vol-4.jpg",
    href: "https://heyzine.com/flip-book/bda063f1e7.html",
  },
  {
    title: "SLRE Book",
    subtitle: "La brochure aziendale",
    caption: "SLRE Book",
    image: "/images/journal/slre-book.jpg",
    href: "https://heyzine.com/flip-book/920d7bf27d.html",
  },
  {
    title: "SLRE Vendita",
    subtitle: "La brochure di vendita",
    caption: "SLRE Vendita",
    image: "/images/journal/slre-vendita.jpg",
    href: "https://heyzine.com/flip-book/e60bc1f120.html",
  },
];

export const faqs = [
  {
    q: "Quanto costa una stima?",
    a: "Il primo sopralluogo per una vendita è gratuito. Per una perizia certificata le inviamo prima il listino prezzi.",
  },
  { q: "Quando si paga la provvigione?", a: "Solo a vendita conclusa." },
  {
    q: "Posso acquistare in Ticino se vivo all’estero?",
    a: "Dipende dalla Lex Koller. Le spieghiamo cosa è possibile prima ancora della prima visita.",
  },
  {
    q: "In quali lingue lavorate?",
    a: "Italiano, tedesco e inglese, e nel team anche francese, olandese, portoghese e spagnolo.",
  },
];

export const values = [
  {
    title: "Fiducia",
    text: "Ogni rapporto comincia da qui: con chi vende, con chi acquista e all’interno del nostro team.",
  },
  {
    title: "Correttezza",
    text: "Diciamo con franchezza cosa ha di bello una casa e cosa meno. In ogni decisione e in ogni trattativa.",
  },
  {
    title: "Competenza",
    text: "Periti certificati ISO 17024, formazione continua e oltre trent’anni di conoscenza del territorio.",
  },
  {
    title: "Cura",
    text: "Ogni passo seguito nei dettagli, dalla prima consulenza alla consegna delle chiavi. E anche dopo.",
  },
];

export const gallery = {
  nextShow: { artist: "Luca Maggetti", dates: "19 novembre – 19 dicembre 2026" },
};

/** Obiettivi selezionabili nel form di contatto. */
export const contactGoals = [
  { id: "vendere", label: "Voglio vendere" },
  { id: "acquistare", label: "Voglio acquistare" },
  { id: "stima", label: "Stima immobiliare" },
  { id: "affitto", label: "Affitto e gestione" },
  { id: "altro", label: "Altro" },
] as const;
