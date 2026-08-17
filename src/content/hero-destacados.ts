import type { IconoKey } from "./types";

/**
 * Selección curada de coberturas para la grilla del hero de la Home.
 *
 * No reemplaza el catálogo real (`productos-personas.ts` / `productos-empresas.ts`,
 * 6 + 4 productos, ya confirmados contra parh.com.ar). Es una vidriera de
 * entrada: cada tarjeta linkea directo a su página de producto real.
 *
 * Decisión (2026-08-04, corregida por el cliente): se probó primero combinar
 * Automotor + Motovehículo en una sola tarjeta "Vehículos" con una página
 * selectora intermedia (/seguros/vehiculos/). El cliente pidió sacarla: una
 * página extra de más puede confundir a la persona que está por cotizar. Con
 * las 6 fotos ya completas (incluida la de moto), vuelve a ser 6 tarjetas
 * directas, una por producto, sin desvíos.
 *
 * El label de la tarjeta de Retiro es "Jubilación" por pedido explícito del
 * cliente. La página de producto (`/seguros/retiro/`) sigue con el copy
 * verbatim de parh.com.ar ("Seguro de Retiro"), que no se toca sin
 * confirmación aparte: la corrección fue puntual para el tile del hero.
 *
 * Corrección de análisis (2026-08-04): faltaban Asistencia al Viajero y
 * Seguro de Celular. El catálogo original se armó leyendo la sección "TIPOS
 * DE SEGUROS" de parh.com.ar (5 productos) más el acordeón de empresas, pero
 * la sección "COTIZADORES ON LINE" del mismo sitio expone dos productos más:
 * Cardinal Assistance (asistencia al viajero) y SeguroCell (celular). Se
 * habían catalogado solo como "compañías" en la franja de carriers, sin
 * página propia. Son productos reales y además los únicos dos que se cotizan
 * y emiten enteramente online. El "Y más!" del sitio original confirma que
 * el catálogo nunca estuvo cerrado en 5.
 *
 * `imagen` es opcional: sin foto real, la tarjeta cae al ícono de Lucide
 * (mismo patrón que el resto del sitio) en vez de romper el layout.
 */
export interface HeroCard {
  slug: string;
  nombre: string;
  href: string;
  imagen?: string;
  icono: IconoKey;
  alt: string;
  /**
   * Se cotiza y se emite 100 % online, sin intervención de un asesor.
   * Hoy son solo dos (Cardinal Assistance y SeguroCell) y es un diferencial
   * real que conviene señalar: el resto del catálogo requiere cotización
   * asistida porque depende de datos que no se completan en un formulario.
   */
  online?: boolean;
}

export const heroPersonas: HeroCard[] = [
  {
    slug: "automotor",
    nombre: "Auto",
    href: "/seguros/automotor/",
    imagen: "/img/hero/automotor",
    icono: "car",
    alt: "Auto cubierto por un seguro",
  },
  {
    slug: "motovehiculo",
    nombre: "Moto",
    href: "/seguros/motovehiculo/",
    imagen: "/img/hero/motovehiculo",
    icono: "bike",
    alt: "Moto cubierta por un seguro",
  },
  {
    slug: "hogar",
    nombre: "Hogar",
    href: "/seguros/hogar/",
    imagen: "/img/hero/hogar",
    icono: "house",
    alt: "Casa protegida por un seguro de hogar",
  },
  {
    slug: "vida",
    nombre: "Vida",
    href: "/seguros/vida/",
    imagen: "/img/hero/vida",
    icono: "heart-pulse",
    alt: "Seguro de vida, protección para tu familia",
  },
  {
    slug: "accidentes-personales",
    nombre: "Accidentes Personales",
    href: "/seguros/accidentes-personales/",
    imagen: "/img/hero/accidentes-personales",
    icono: "shield-plus",
    alt: "Seguro de accidentes personales",
  },
  {
    slug: "retiro",
    nombre: "Jubilación",
    href: "/seguros/retiro/",
    imagen: "/img/hero/retiro",
    icono: "piggy-bank",
    alt: "Seguro de retiro para la jubilación",
  },
  {
    slug: "asistencia-al-viajero",
    nombre: "Viajes",
    href: "/seguros/asistencia-al-viajero/",
    icono: "plane",
    alt: "Asistencia al viajero",
    online: true,
  },
  {
    slug: "seguro-de-celular",
    nombre: "Celular",
    href: "/seguros/seguro-de-celular/",
    icono: "smartphone",
    alt: "Seguro de celular",
    online: true,
  },
];

export const heroEmpresas: HeroCard[] = [
  {
    slug: "responsabilidad-civil",
    nombre: "Responsabilidad Civil",
    href: "/empresas/responsabilidad-civil/",
    icono: "scale",
    alt: "Seguro de responsabilidad civil para empresas",
  },
  {
    slug: "integral-de-comercio",
    nombre: "Integral de Comercio",
    href: "/empresas/integral-de-comercio/",
    icono: "store",
    alt: "Seguro integral de comercio",
  },
  {
    slug: "seguro-tecnico",
    nombre: "Seguro Técnico",
    href: "/empresas/seguro-tecnico/",
    icono: "hard-hat",
    alt: "Seguro técnico para equipos y obras",
  },
  {
    slug: "accidentes-personales-empresas",
    nombre: "Accidentes Personales",
    href: "/empresas/accidentes-personales/",
    icono: "briefcase",
    alt: "Accidentes personales para tu equipo",
  },
];
