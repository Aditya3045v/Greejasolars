import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const serif = Fraunces({ subsets: ["latin"], variable: "--font-serif", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: "HMS Homeopathy Center | Gentle, Individualised Homeopathic Care",
  description:
    "HMS Homeopathy Center offers personalised, whole-person homeopathic consultations for adults, children and families. Book an appointment today.",
  openGraph: {
    title: "HMS Homeopathy Center",
    description: "Gentle, individualised homeopathic care for the whole family.",
    type: "website",
  },
};
export const viewport: Viewport = { themeColor: "#f6f1e7" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
