import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";

import { ConsentBanner } from "@/components/analytics/consent-banner";
import { BarraMobile } from "@/components/layout/barra-mobile";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { JsonLd } from "@/components/seo/json-ld";
import { getMeta, sitio } from "@/content/sitio";
import { organization, website } from "@/lib/schema";
import "./globals.css";

// Doc 04 sección 3.1. Inter Tight en titulares, Inter en cuerpo.
// Autohospedadas por next/font, sin request a Google en runtime.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
  display: "swap",
});

const home = getMeta("/");

export const metadata: Metadata = {
  metadataBase: new URL(sitio.url),
  title: {
    default: home?.title ?? sitio.nombre,
    // Las páginas internas completan con su propio título.
    template: `%s | ${sitio.nombreCorto}`,
  },
  description: home?.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: sitio.nombre,
    title: home?.title,
    description: home?.description,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Las variables de next/font van en <html>, no en <body>: globals.css aplica
    // font-family sobre html, y una variable definida en body no llega al padre.
    <html lang="es-AR" className={`${inter.variable} ${interTight.variable}`}>
      <body>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-parh-blue-700 focus:px-4 focus:py-2 focus:text-white"
        >
          Ir al contenido
        </a>

        <JsonLd data={organization()} />
        <JsonLd data={website()} />

        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <BarraMobile />
        <ConsentBanner />
      </body>
    </html>
  );
}
