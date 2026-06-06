import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

/* ── Self-hosted fonts (no render-blocking request to Google) ──────── */
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument",
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#06090a" },
    { media: "(prefers-color-scheme: light)", color: "#06090a" },
  ],
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://aerocampo.es"),
  title: {
    default: "AeroCampo Iberia | Tratamientos agrícolas con drones DJI en España",
    template: "%s · AeroCampo Iberia",
  },
  description:
    "AeroCampo Iberia: tratamientos agrícolas con drones DJI en toda España. Aplicación aérea de fitosanitarios, fertilización y esparcido de precisión. Pilotos AESA certificados.",
  keywords: [
    "AeroCampo Iberia",
    "tratamientos agrícolas con drones",
    "drones agrícolas España",
    "pulverización con drones DJI",
    "DJI Agras",
    "aplicación aérea de fitosanitarios",
    "agricultura de precisión",
    "fertilización con drones",
    "fumigación con drones",
    "pilotos AESA",
  ],
  authors: [{ name: "AeroCampo Iberia" }],
  creator: "AeroCampo Iberia",
  publisher: "AEROCAMPO IBERIA, S.L.",
  alternates: { canonical: "/" },
  category: "Agricultura de precisión",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://aerocampo.es",
    title: "AeroCampo Iberia | Tratamientos agrícolas con drones DJI",
    description:
      "Tratamientos agrícolas con drones DJI en toda España. Precisión, rapidez y sin pisar el cultivo. Pilotos AESA certificados.",
    siteName: "AeroCampo Iberia",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "AeroCampo Iberia — Tratamientos agrícolas con drones de precisión",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AeroCampo Iberia | Tratamientos agrícolas con drones DJI",
    description: "Tratamientos agrícolas con drones DJI en toda España.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://aerocampo.es/#business",
  name: "AeroCampo Iberia",
  legalName: "AEROCAMPO IBERIA, S.L.",
  url: "https://aerocampo.es",
  logo: "https://aerocampo.es/logo.webp",
  image: "https://aerocampo.es/og.jpg",
  description:
    "Tratamientos agrícolas con drones DJI: aplicación aérea de fitosanitarios, fertilización y esparcido de precisión. Pilotos AESA certificados, cobertura nacional.",
  email: "aerocampoiberia@gmail.com",
  telephone: "+34615325317",
  vatID: "B88737929",
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Carretera de Cuéllar, nº 12",
    postalCode: "40297",
    addressLocality: "Sanchonuño",
    addressRegion: "Segovia",
    addressCountry: "ES",
  },
  geo: { "@type": "GeoCoordinates", latitude: 41.2667, longitude: -4.0833 },
  areaServed: { "@type": "Country", name: "España" },
  knowsAbout: [
    "Tratamientos fitosanitarios con drones",
    "Pulverización agrícola de precisión",
    "Fertilización de precisión",
    "Agricultura de precisión",
  ],
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Aplicación aérea de tratamientos con drones" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pulverización agrícola de precisión" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fertilización y esparcido agrícola" } },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+34615325317",
    email: "aerocampoiberia@gmail.com",
    contactType: "customer service",
    areaServed: "ES",
    availableLanguage: "Spanish",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* Preload the first hero background (LCP candidate) */}
        <link rel="preload" as="image" href="/images/hero-field.webp" fetchPriority="high" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body>
        <div id="scroll-root">{children}</div>
      </body>
    </html>
  );
}
