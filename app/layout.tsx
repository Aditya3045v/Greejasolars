import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, Noto_Sans_Devanagari, Tiro_Devanagari_Hindi } from "next/font/google";
import "./globals.css";

const serif = Fraunces({ subsets: ["latin"], variable: "--font-serif", display: "swap" });
const hiSans = Noto_Sans_Devanagari({ subsets: ["devanagari", "latin"], variable: "--font-hisans", display: "swap" });
const hiSerif = Tiro_Devanagari_Hindi({ subsets: ["devanagari", "latin"], weight: "400", variable: "--font-hiserif", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: "HMS Homeopathy Center | Homeopathic Clinic in Bahadurganj, Kishanganj, Bihar",
  description:
    "HMS Homeopathy Center in Bahadurganj, Kishanganj (Bihar) offers gentle, personalised homeopathic care for children, women and elders across Seemanchal. Book an appointment today. HMS होम्योपैथी सेंटर, बहादुरगंज।",
  openGraph: {
    title: "HMS Homeopathy Center — Bahadurganj, Kishanganj",
    description: "Gentle homeopathic care for every Seemanchal family.",
    type: "website",
  },
};
export const viewport: Viewport = { themeColor: "#f6f1e7" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${hiSans.variable} ${hiSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
