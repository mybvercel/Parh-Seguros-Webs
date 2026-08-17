import { casaCentral, oficinas } from "@/content/oficinas";
import { sitio } from "@/content/sitio";
import type { Faq, Oficina } from "@/content/types";

/**
 * Generadores de JSON-LD. Doc 03 sección 5.4.
 *
 * IMPORTANTE antes de publicar: el nombre, la dirección y el teléfono de cada
 * InsuranceAgency tienen que coincidir carácter por carácter con la ficha de
 * Google Business Profile de esa sucursal.
 */

const url = (ruta: string) => new URL(ruta, sitio.url).toString();

function direccion(o: Oficina) {
  return {
    "@type": "PostalAddress",
    streetAddress: o.calle,
    addressLocality: o.localidad,
    postalCode: o.codigoPostal,
    addressRegion: o.provincia,
    addressCountry: "AR",
  };
}

function horarios(o: Oficina) {
  return o.horarios.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.dias,
    opens: h.desde,
    closes: h.hasta,
  }));
}

/** Ficha de una sucursal. Se usa en la Home (casa central) y en cada landing. */
export function insuranceAgency(o: Oficina) {
  return {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "@id": url(`/oficinas/${o.slug}/#agency`),
    name: `${sitio.nombre} ${o.localidad}`,
    url: url(`/oficinas/${o.slug}/`),
    image: url(`${o.imagen}-1280.webp`),
    telephone: `+${o.telefonoE164}`,
    email: o.email,
    address: direccion(o),
    geo: {
      "@type": "GeoCoordinates",
      latitude: o.geo.lat,
      longitude: o.geo.lng,
    },
    openingHoursSpecification: horarios(o),
    areaServed: o.zonas.map((z) => ({ "@type": "City", name: z })),
    priceRange: "$$",
    sameAs: Object.values(sitio.redes),
  };
}

/** Entidad matriz, con las 4 sucursales como departamentos. */
export function organization() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": url("/#organization"),
    name: sitio.nombre,
    legalName: sitio.razonSocial,
    url: sitio.url,
    email: sitio.email,
    telephone: `+${sitio.telefonoE164}`,
    address: direccion(casaCentral),
    sameAs: Object.values(sitio.redes),
    department: oficinas.map((o) => ({
      "@type": "InsuranceAgency",
      "@id": url(`/oficinas/${o.slug}/#agency`),
      name: `${sitio.nombre} ${o.localidad}`,
      address: direccion(o),
      telephone: `+${o.telefonoE164}`,
    })),
  };
}

export function website() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": url("/#website"),
    name: sitio.nombre,
    url: sitio.url,
    inLanguage: "es-AR",
    publisher: { "@id": url("/#organization") },
  };
}

export function faqPage(items: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.pregunta,
      acceptedAnswer: { "@type": "Answer", text: f.respuesta },
    })),
  };
}

export interface Miga {
  label: string;
  href: string;
}

export function breadcrumbList(migas: Miga[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: migas.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: m.label,
      item: url(m.href),
    })),
  };
}

export function service(opts: {
  nombre: string;
  descripcion: string;
  ruta: string;
  coberturas: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.nombre,
    description: opts.descripcion,
    url: url(opts.ruta),
    serviceType: opts.nombre,
    provider: { "@id": url("/#organization") },
    areaServed: oficinas
      .flatMap((o) => o.zonas)
      .filter((z, i, arr) => arr.indexOf(z) === i)
      .map((z) => ({ "@type": "City", name: z })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Coberturas de ${opts.nombre}`,
      itemListElement: opts.coberturas.map((c) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: c },
      })),
    },
  };
}
