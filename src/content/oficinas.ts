import type { Oficina } from "./types";

/**
 * Las 4 sucursales. Cada una genera una landing y una ficha InsuranceAgency.
 * Doc 03 sección 5.4. Es la mayor oportunidad de SEO local del proyecto.
 *
 * DATOS REALES: direcciones, códigos postales y coordenadas. Salen de los
 * links de Google Maps que ya usa parh.com.ar.
 *
 * DATOS INVENTADOS para el prototipo: horarios, teléfonos por sucursal,
 * zonas atendidas y descripciones. Por eso `origen: "placeholder"`.
 *
 * IMPORTANTE antes de publicar: el nombre, la dirección y el teléfono tienen
 * que coincidir carácter por carácter con la ficha de Google Business Profile
 * de cada sucursal. Cualquier diferencia debilita la señal local.
 */

const HORARIO_ESTANDAR = [
  {
    dias: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    desde: "09:00",
    hasta: "18:00",
  },
];

export const oficinas: Oficina[] = [
  {
    slug: "moron",
    localidad: "Morón",
    calle: "Av. Gral. Miguel de Azcuénaga 705",
    codigoPostal: "B1708",
    provincia: "Buenos Aires",
    telefono: "11 2244 5022",
    telefonoE164: "5491122445022",
    email: "info@parh.com.ar",
    horarios: HORARIO_ESTANDAR,
    geo: { lat: -34.6433549, lng: -58.6210276 },
    imagen: "/img/oficinas/moron",
    alt: "Frente de la oficina de PARH en Morón",
    zonas: [
      "Morón",
      "Castelar",
      "Haedo",
      "El Palomar",
      "Ituzaingó",
      "Ramos Mejía",
    ],
    descripcion:
      "La casa central. Es la oficina con más movimiento y desde acá se coordina la operación de las otras tres sucursales. Si tenés un siniestro en curso o una consulta que necesita revisar documentación, es el lugar donde te podemos atender con todo el equipo disponible.",
    esCasaCentral: true,
    origen: "placeholder",
  },
  {
    slug: "marcos-paz",
    localidad: "Marcos Paz",
    calle: "Melgar 2034",
    codigoPostal: "B1727IYQ",
    provincia: "Buenos Aires",
    telefono: "11 2244 5022",
    telefonoE164: "5491122445022",
    email: "info@parh.com.ar",
    horarios: HORARIO_ESTANDAR,
    geo: { lat: -34.7845945, lng: -58.8355199 },
    imagen: "/img/oficinas/marcos-paz",
    alt: "Frente de la oficina de PARH en Marcos Paz",
    zonas: ["Marcos Paz", "González Catán", "Virrey del Pino", "Las Heras"],
    descripcion:
      "Atendemos a comercios, productores rurales y familias de Marcos Paz y alrededores. Es una zona donde el seguro de campo, la maquinaria agrícola y el integral de comercio tienen más peso que en el resto del partido, y por eso trabajamos esas coberturas con más detalle acá.",
    esCasaCentral: false,
    origen: "placeholder",
  },
  {
    slug: "mercedes",
    localidad: "Mercedes",
    calle: "Calle 18 nro. 409",
    codigoPostal: "B6600",
    provincia: "Buenos Aires",
    telefono: "11 2244 5022",
    telefonoE164: "5491122445022",
    email: "info@parh.com.ar",
    horarios: HORARIO_ESTANDAR,
    geo: { lat: -34.654134, lng: -59.4276736 },
    imagen: "/img/oficinas/mercedes",
    alt: "Frente de la oficina de PARH en Mercedes",
    zonas: ["Mercedes", "Suipacha", "San Andrés de Giles", "Navarro"],
    descripcion:
      "Nuestra oficina más al oeste. Cubre Mercedes y las localidades vecinas, donde buena parte del trabajo es con comercios del centro, campos y vehículos de uso mixto. Si estás en la zona y querés que revisemos una póliza existente, podés acercarte con la documentación.",
    esCasaCentral: false,
    origen: "placeholder",
  },
  {
    slug: "lujan",
    localidad: "Luján",
    calle: "Av. Constitución 1612",
    codigoPostal: "B6700",
    provincia: "Buenos Aires",
    telefono: "11 2244 5022",
    telefonoE164: "5491122445022",
    email: "info@parh.com.ar",
    horarios: HORARIO_ESTANDAR,
    // Geocodificado desde "Av. Constitución 1612, Luján" (OpenStreetMap,
    // consulta libre y estructurada, mismo resultado en ambas). Sin verificar
    // contra la ficha de Google Business Profile todavía: si el pin quedara
    // corrido, se ajusta acá y el mapa, el "Cómo llegar" y el JSON-LD se
    // corrigen solos, porque los tres se generan desde estas coordenadas.
    geo: { lat: -34.5669318, lng: -59.0960678 },
    imagen: "/img/oficinas/lujan",
    alt: "Frente de la oficina de PARH en Luján",
    zonas: ["Luján", "Open Door", "Jáuregui", "Pilar", "General Rodríguez"],
    descripcion:
      "Luján tiene un movimiento comercial y turístico que genera necesidades puntuales, desde el integral de comercio para locales del centro hasta la responsabilidad civil para eventos. Atendemos también a quienes vienen de General Rodríguez y Pilar.",
    esCasaCentral: false,
    origen: "placeholder",
  },
];

export const casaCentral = oficinas.find((o) => o.esCasaCentral) ?? oficinas[0];

export function getOficina(slug: string): Oficina | undefined {
  return oficinas.find((o) => o.slug === slug);
}
