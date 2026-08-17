import type { Compania } from "./types";

/**
 * Compañías y plataformas con las que opera PARH.
 *
 * DATOS REALES: nombres y URLs de cotización. Están extraídos de los links
 * que ya tiene parh.com.ar, con los códigos de productor de Roberto incluidos.
 *
 * INVENTADO: las descripciones. Hoy las 6 tarjetas del sitio dicen todas
 * "Cotiza rapido, facil y sin problemas!", así que no hay copy real que
 * conservar. Ver doc 01 sección 3.2, problema #1.
 *
 * PENDIENTE: autorización de uso de marca de cada compañía antes de publicar
 * los logos. Ver doc 06, insumo 8.
 */
export const companias: Compania[] = [
  {
    slug: "federacion-patronal",
    nombre: "Federación Patronal",
    logo: "/img/companias/federacion-patronal",
    descripcion:
      "Una de las aseguradoras más grandes del país en seguros patrimoniales. La usamos sobre todo para automotor, hogar y las coberturas de empresa.",
    cotizadorUrl:
      "https://online.fedpat.com.ar/cotizar_seguro_online/p/21278-hNSeXsKKchR4xhhCwnxDT9Yo5t%2BeVnPmXOIvVCKY3MI%3D",
    cotiza: ["Automotor", "Motovehículo", "Hogar", "Comercio"],
    logoAutorizado: false,
    origen: "placeholder",
  },
  {
    slug: "atm",
    nombre: "ATM Seguros",
    logo: "/img/companias/atm",
    descripcion:
      "Buena opción en automotor y motovehículo, con un proceso de emisión rápido. Suele ser competitiva en autos de más antigüedad.",
    cotizadorUrl:
      "https://ecommerce.atmseguros.com.ar/?sale-center=2y10z6rnapkea3yhus3exvpfcoaanztc3rnixbjekcem9zh9p7uvinvlo",
    cotiza: ["Automotor", "Motovehículo", "Hogar"],
    logoAutorizado: false,
    origen: "placeholder",
  },
  {
    slug: "san-cristobal",
    nombre: "San Cristóbal",
    logo: "/img/companias/san-cristobal",
    descripcion:
      "Compañía con más de 80 años de trayectoria. La trabajamos para vida, retiro y las coberturas de responsabilidad civil.",
    cotizadorUrl: "https://www.sancristobal.com.ar/pas/roberto-corvalan",
    cotiza: ["Automotor", "Hogar", "Vida", "Retiro", "Responsabilidad civil"],
    logoAutorizado: false,
    origen: "placeholder",
  },
  {
    slug: "cardinal-assistance",
    nombre: "Cardinal Assistance",
    logo: "/img/companias/cardinal",
    descripcion:
      "Asistencia al viajero. Cobertura médica y de equipaje para viajes al exterior o dentro del país.",
    cotizadorUrl: "https://www.cardinalassistance.com/ref/parhseguros",
    cotiza: ["Asistencia al viajero"],
    logoAutorizado: false,
    origen: "placeholder",
  },
  {
    slug: "segurocell",
    nombre: "SeguroCell",
    logo: "/img/companias/segurocell",
    descripcion:
      "Seguro para celulares y notebooks. Cubre robo y rotura accidental de pantalla, que es lo que más pasa.",
    cotizadorUrl: "https://segurocell.com/?pid=6439f1811e3c2d3f8870ea979b91a5a3",
    cotiza: ["Celulares", "Notebooks"],
    logoAutorizado: false,
    origen: "placeholder",
  },
  {
    slug: "banco-del-sol",
    nombre: "Banco del Sol",
    logo: "/img/companias/banco-del-sol",
    descripcion:
      "Apertura de cuenta bancaria online, sin costo de mantenimiento. No es un seguro, es un servicio que ofrecemos a nuestros clientes.",
    cotizadorUrl: "https://open.bancodelsol.com/DWss7a4JQQVFpGzt5",
    cotiza: ["Cuenta bancaria"],
    logoAutorizado: false,
    origen: "placeholder",
  },
];

/** Las que son compañías de seguros propiamente dichas. */
export const aseguradoras = companias.filter((c) =>
  ["federacion-patronal", "atm", "san-cristobal"].includes(c.slug),
);

export function getCompania(slug: string): Compania | undefined {
  return companias.find((c) => c.slug === slug);
}
