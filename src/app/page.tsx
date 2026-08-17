import type { Metadata } from "next";

import { CarrierLogos } from "@/components/sections/carrier-logos";
import { DiagnosticoTeaser } from "@/components/sections/diagnostico-teaser";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { MetricsBar } from "@/components/sections/metrics-bar";
import { OfficesGrid } from "@/components/sections/offices-grid";
import { ProductGrid } from "@/components/sections/product-grid";
import { StepsBlock } from "@/components/sections/steps-block";
import { Testimonials } from "@/components/sections/testimonials";
import { WhyBroker } from "@/components/sections/why-broker";
import { JsonLd } from "@/components/seo/json-ld";
import { getFaqs } from "@/content/faqs";
import { casaCentral } from "@/content/oficinas";
import { metadataDe } from "@/content/sitio";
import { insuranceAgency } from "@/lib/schema";

export const metadata: Metadata = metadataDe("/");

/**
 * Home. Orden de bloques decidido en doc 02 sección D: el esqueleto de Worth,
 * la sobriedad e independencia de Heffernan, los bloques de conversión de NEXT.
 */
export default function Home() {
  return (
    <>
      <JsonLd data={insuranceAgency(casaCentral)} />

      <Hero />
      <MetricsBar />
      <StepsBlock />
      <ProductGrid />
      <CarrierLogos />
      <WhyBroker />
      <Testimonials />
      <OfficesGrid />
      <DiagnosticoTeaser />
      <FaqSection items={getFaqs("general")} />
      <FinalCta />
    </>
  );
}
