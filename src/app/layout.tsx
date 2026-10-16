import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileActionBar } from "@/components/MobileActionBar";
import { cormorant, playfair, sans } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://slre.ch"),
  title: {
    default: "Specht & Lappe Real Estate · We bring you home",
    template: "%s · Specht & Lappe Real Estate",
  },
  description:
    "Da oltre trent’anni accompagniamo chi vende e chi acquista casa tra il Lago Maggiore e il Lago di Lugano. Muralto, Ascona, Morcote.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="it" className={`${playfair.variable} ${cormorant.variable} ${sans.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileActionBar />
      </body>
    </html>
  );
}
