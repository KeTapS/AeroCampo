import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AeroCampo Iberia | Tratamientos Agrícolas con Drones de Precisión",
  description:
    "Servicios de drones agrícolas en Segovia, Valladolid y Castilla y León. Fitosanitarios, fertilización, monitorización y fotografía aérea de precisión.",
  keywords: [
    "drones agrícolas Segovia",
    "drones agrícolas Valladolid",
    "drones Castilla y León",
    "tratamientos fitosanitarios dron",
    "agricultura de precisión",
    "fertilización dron",
    "monitorización cultivos",
    "AeroCampo Iberia",
  ],
  authors: [{ name: "AeroCampo Iberia" }],
  creator: "AeroCampo Iberia",
  openGraph: {
    type: "website",
    locale: "es_ES",
    title: "AeroCampo Iberia | Drones Agrícolas de Precisión",
    description:
      "Tratamientos agrícolas con drones en Segovia, Valladolid y Castilla y León. Precisión, rapidez y sin pisar el cultivo.",
    siteName: "AeroCampo Iberia",
  },
  twitter: {
    card: "summary_large_image",
    title: "AeroCampo Iberia | Drones Agrícolas",
    description: "Servicios de drones agrícolas en Castilla y León.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "AeroCampo Iberia",
  description:
    "Servicios de drones agrícolas de precisión: fitosanitarios, fertilización, monitorización y fotografía aérea.",
  areaServed: [
    { "@type": "City", name: "Segovia" },
    { "@type": "City", name: "Valladolid" },
    { "@type": "AdministrativeArea", name: "Castilla y León" },
  ],
  serviceType: [
    "Tratamientos fitosanitarios con drones",
    "Fertilización de precisión",
    "Monitorización de cultivos",
    "Fotografía y vídeo aéreo agrícola",
  ],
  telephone: "+34600000000",
  priceRange: "€€",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
