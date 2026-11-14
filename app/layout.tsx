import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, Noto_Sans_Devanagari, Tiro_Devanagari_Hindi } from "next/font/google";
import "./globals.css";

const serif = Fraunces({ subsets: ["latin"], variable: "--font-serif", display: "swap" });
const hiSans = Noto_Sans_Devanagari({ subsets: ["devanagari", "latin"], variable: "--font-hisans", display: "swap" });
const hiSerif = Tiro_Devanagari_Hindi({ subsets: ["devanagari", "latin"], weight: "400", variable: "--font-hiserif", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: "HMS Homeopathy Center | सीमांचल का होम्योपैथी केंद्र · Purnia, Araria, Kishanganj, Katihar",
  description:
    "HMS होम्योपैथी सेंटर — सीमांचल (पूर्णिया, अररिया, किशनगंज, कटिहार) के परिवारों के लिए सौम्य, व्यक्तिगत होम्योपैथिक उपचार। HMS Homeopathy Center serves Seemanchal, Bihar. अपॉइंटमेंट बुक करें।",
  openGraph: {
    title: "HMS Homeopathy Center — सीमांचल",
    description: "सीमांचल के हर परिवार के लिए सौम्य होम्योपैथिक उपचार।",
    type: "website",
  },
};
export const viewport: Viewport = { themeColor: "#f6f1e7" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi" className={`${serif.variable} ${sans.variable} ${hiSans.variable} ${hiSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
