import { Cormorant_Garamond, Hanken_Grotesk, Playfair_Display } from "next/font/google";

// Titoli: parola chiave in corsivo bordeaux.
export const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

// Sopratitoli e località, maiuscolo spaziato.
export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-eyebrow",
});

// Testi. Il brand prevede Untitled Sans (font commerciale Klim): finché
// la licenza web non è confermata usiamo Hanken Grotesk come sostituto.
export const sans = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});
