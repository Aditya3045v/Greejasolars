import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://greejaorganic.in'),
  title: {
    default: 'Greeja Organic Solar Energy Private Limited - Solar Solutions in Muzaffarpur',
    template: '%s | Greeja Organic Solar Energy'
  },
  description: 'Greeja Organic Solar Energy Private Limited provides reliable and affordable solar power solutions in Muzaffarpur, Bihar. High-quality solar installations and service excellence.',
  keywords: ['solar installation muzaffarpur', 'greeja organic solar', 'solar energy company bihar', 'solar panels muzaffarpur', 'solar power solutions india', 'on-grid solar muzaffarpur', 'off-grid solar bihar', 'hybrid solar systems muzaffarpur'],
  authors: [{ name: 'Greeja Organic Solar Energy Private Limited' }],
  creator: 'Greeja Organic Solar Energy Private Limited',
  publisher: 'Greeja Organic Solar Energy Private Limited',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/assets/logo.png',
    shortcut: '/assets/logo.png',
    apple: '/assets/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://greejaorganic.in',
    siteName: 'Greeja Organic Solar Energy',
    title: 'Greeja Organic Solar Energy - Premier Solar Solutions in Muzaffarpur',
    description: 'Delivering reliable and affordable solar power solutions with a focus on excellence and customer satisfaction.',
    images: [
      {
        url: '/assets/logo.png',
        width: 800,
        height: 800,
        alt: 'Greeja Organic Solar Energy Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Greeja Organic Solar Energy - Leading Solar Company in Bihar',
    description: 'Expert solar installations and energy solutions in Muzaffarpur. Reliable, affordable, and sustainable power.',
    images: ['/assets/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://greejaorganic.in',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Greeja Organic Solar Energy Private Limited",
    "description": "Providing reliable and affordable solar power solutions, delivering high-quality installations in Muzaffarpur, Bihar.",
    "url": "https://greejaorganic.in",
    "telephone": "+91-7903406429",
    "email": "info@greejaorganic.in",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Majhaulia Rd, Krishna Chowk, Pokhraira",
      "addressLocality": "Muzaffarpur",
      "addressRegion": "Bihar",
      "postalCode": "842001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "26.1209",
      "longitude": "85.3647"
    },
    "sameAs": [
      "https://facebook.com/greejaorganicsolar",
      "https://instagram.com/greejaorganicsolar"
    ],
    "priceRange": "₹₹",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  };

  return (
    <html lang="en" className={`${outfit.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="antialiased bg-[#0f172a] text-[#F8FAFC] font-sans">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
