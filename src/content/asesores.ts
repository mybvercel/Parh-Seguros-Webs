import type { Asesor } from "./types";

/**
 * Directorio de Organizadores y Productores Asesores de Seguros de la red PARH.
 * Referencia de patrón: buscatucoach.com/coaches (grilla filtrable con perfil
 * por persona), adaptada al rubro.
 *
 * POR QUÉ EXISTE: parh.com.ar hoy no muestra a nadie del equipo. En seguros,
 * donde el diferencial declarado es "atención diferente", la cara visible es
 * parte del producto: la gente elige a una persona, no a una empresa.
 * Ver doc 01, cuello de botella 2 (la propuesta de valor no está demostrada).
 *
 * TODOS LOS DATOS SON INVENTADOS. Son maquetas para dejar el componente y los
 * filtros funcionando. ANTES DE PUBLICAR hace falta, por cada persona:
 *   - nombre real y matrícula SSN (es un dato de exhibición obligatoria)
 *   - foto y autorización para publicarla
 *   - zonas y especialidades que efectivamente atiende
 *   - teléfono o mail de contacto que quiera exponer
 *
 * Publicar personas inventadas en el sitio de un negocio real no es una opción.
 * `npm run placeholders` los lista a todos como pendientes.
 */
export const asesores: Asesor[] = [
  {
    slug: "roberto-corvalan",
    nombre: "Roberto Corvalán",
    rol: "organizador",
    matriculaSSN: null,
    zonas: ["Morón", "Castelar", "Haedo", "Ituzaingó"],
    especialidades: ["automotor", "hogar", "integral-de-comercio", "caucion"],
    telefono: null,
    telefonoE164: null,
    email: "info@parh.com.ar",
    foto: "/img/asesores/roberto-corvalan",
    bio: "Titular de PARH. Más de 20 años en el rubro, con foco en seguros patrimoniales para comercios y pymes del Oeste.",
    oficina: "moron",
    origen: "placeholder",
  },
  {
    slug: "asesor-marcos-paz",
    nombre: "Nombre Apellido",
    rol: "pas",
    matriculaSSN: null,
    zonas: ["Marcos Paz", "González Catán", "Virrey del Pino"],
    especialidades: ["automotor", "motovehiculo", "art"],
    telefono: null,
    telefonoE164: null,
    email: null,
    bio: "Atiende la zona de Marcos Paz, con trabajo fuerte en flotas y en ART para empresas de servicios.",
    oficina: "marcos-paz",
    origen: "placeholder",
  },
  {
    slug: "asesor-mercedes",
    nombre: "Nombre Apellido",
    rol: "pas",
    matriculaSSN: null,
    zonas: ["Mercedes", "Suipacha", "San Andrés de Giles", "Navarro"],
    especialidades: ["integral-de-comercio", "automotor", "seguro-tecnico"],
    telefono: null,
    telefonoE164: null,
    email: null,
    bio: "Cubre Mercedes y alrededores. Buena parte de su cartera son comercios del centro y maquinaria agrícola.",
    oficina: "mercedes",
    origen: "placeholder",
  },
  {
    slug: "asesor-lujan",
    nombre: "Nombre Apellido",
    rol: "pas",
    matriculaSSN: null,
    zonas: ["Luján", "Jáuregui", "Open Door", "General Rodríguez", "Pilar"],
    especialidades: ["responsabilidad-civil", "integral-de-comercio", "vida"],
    telefono: null,
    telefonoE164: null,
    email: null,
    bio: "Trabaja Luján y la zona de Pilar, con experiencia en responsabilidad civil para eventos y locales gastronómicos.",
    oficina: "lujan",
    origen: "placeholder",
  },
  {
    slug: "asesor-transporte",
    nombre: "Nombre Apellido",
    rol: "pas",
    matriculaSSN: null,
    zonas: ["Todo el país"],
    especialidades: ["responsabilidad-civil", "caucion", "art"],
    telefono: null,
    telefonoE164: null,
    email: null,
    bio: "Especialista en empresas de transporte: flotas, responsabilidad civil de carga y las garantías que exige el rubro.",
    origen: "placeholder",
  },
];

export function getAsesor(slug: string): Asesor | undefined {
  return asesores.find((a) => a.slug === slug);
}

/** Todas las zonas cubiertas, sin repetir, para el filtro del directorio. */
export const zonasAsesores: string[] = [
  ...new Set(asesores.flatMap((a) => a.zonas)),
].sort((a, b) => a.localeCompare(b, "es"));
