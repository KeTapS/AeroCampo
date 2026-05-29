import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,         // accessibility — don't lock zoom
  viewportFit: "cover",    // notched phones
  themeColor: [
    { media: "(prefers-color-scheme: dark)",  color: "#06090a" },
    { media: "(prefers-color-scheme: light)", color: "#06090a" },
  ],
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: "AeroCampo Iberia",
  description:
    "Tratamientos agrícolas con drones DJI en toda España. Aplicación aérea de fitosanitarios, fertilización y esparcido de precisión. Pilotos AESA certificados.",
  keywords: [
    "drones agrícolas España",
    "tratamientos agrícolas con drones",
    "pulverización con drones DJI",
    "DJI Agras",
    "aplicación aérea fitosanitarios",
    "agricultura de precisión",
    "fertilización con drones",
    "pilotos AESA",
    "AeroCampo Iberia",
  ],
  authors: [{ name: "AeroCampo Iberia" }],
  creator: "AeroCampo Iberia",
  openGraph: {
    type: "website",
    locale: "es_ES",
    title: "AeroCampo Iberia | Drones Agrícolas de Precisión",
    description:
      "Tratamientos agrícolas con drones DJI en toda España. Precisión, rapidez y sin pisar el cultivo.",
    siteName: "AeroCampo Iberia",
  },
  twitter: {
    card: "summary_large_image",
    title: "AeroCampo Iberia | Drones Agrícolas",
    description: "Tratamientos agrícolas con drones DJI en toda España.",
  },
  robots: { index: true, follow: true },
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "AeroCampo Iberia",
  description:
    "Tratamientos agrícolas con drones DJI: aplicación aérea de fitosanitarios, fertilización y esparcido de precisión.",
  areaServed: { "@type": "Country", name: "España" },
  serviceType: [
    "Aplicación aérea de tratamientos con drones",
    "Pulverización agrícola de precisión",
    "Fertilización y esparcido agrícola",
  ],
  email: "aerocampoiberia@gmail.com",
  telephone: "+34615325317",
  priceRange: "€€",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
