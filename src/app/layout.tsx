import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Braise — Le feu qui ne s'éteint pas",
    template: "%s | Braise",
  },
  description:
    "Braise crée des coffrets olfactifs premium assemblés à la main à Casablanca. Offrez une émotion, pas un objet.",
  keywords: [
    "coffret cadeau Maroc",
    "gifting olfactif Maroc",
    "cadeau original Casablanca",
    "diffuseur parfum Maroc",
    "bougie artisanale Maroc",
    "cadeau entreprise Casablanca",
    "coffret parfum premium Maroc",
  ],
  openGraph: {
    title: "Braise — Le feu qui ne s'éteint pas",
    description: "Coffrets olfactifs premium assemblés à la main à Casablanca.",
    locale: "fr_MA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
