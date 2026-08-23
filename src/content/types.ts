/**
 * Tipos del contenido. Doc 05 sección 4.
 *
 * Todo el texto del sitio vive en `src/content`. Ningún string de copy va
 * hardcodeado en un componente. Así se audita todo el sitio con un grep y se
 * corrigen textos sin tocar la UI.
 */

/**
 * Procedencia del dato.
 *
 * "real" sale de parh.com.ar, del logo o de una fuente verificada.
 * "placeholder" es inventado para el prototipo y NO puede publicarse.
 *
 * `npm run placeholders` lista todo lo pendiente de reemplazar.
 */
export type Origen = "real" | "placeholder";

/** Segmento comercial. Define el toggle del hero y la rama de navegación. */
export type Segmento = "personas" | "empresas";

/** Clave de ícono de Lucide. El mapa vive en components/ui/icono.tsx. */
export type IconoKey =
  | "car"
  | "bike"
  | "house"
  | "heart-pulse"
  | "piggy-bank"
  | "shield-plus"
  | "scale"
  | "store"
  | "hard-hat"
  | "briefcase"
  | "plane"
  | "smartphone"
  | "shield-check"
  | "file-check";

/** Una cobertura, sea de personas o de empresas. */
export interface Producto {
  slug: string;
  segmento: Segmento;
  /** Nombre corto, como aparece en el menú y en la tarjeta. */
  nombre: string;
  /** h1 de la página de producto. */
  titulo: string;
  /** Bajada de una línea. Copy verbatim de parh.com.ar donde existe. */
  bajada: string;
  icono: IconoKey;
  /** Ruta base de la imagen, sin el sufijo de ancho ni la extensión. */
  imagen: string;
  alt: string;
  /** Párrafo de apertura de la página de producto. */
  introduccion: string;
  cubre: string[];
  /** Lo que la póliza no cubre. Diferencial real: casi nadie lo publica. */
  noCubre: string[];
  paraQuien: string[];
  /** Slugs de compañías con las que se cotiza este producto. */
  companias: string[];
  /** Texto largo al pie de la página, para búsquedas de cola larga. */
  textoExtendido: string;
  origen: Origen;
}

/** Sucursal física. Cada una genera una landing y una ficha InsuranceAgency. */
export interface Oficina {
  slug: string;
  /** Localidad, tal como se muestra al usuario. */
  localidad: string;
  calle: string;
  codigoPostal: string;
  provincia: string;
  telefono: string;
  /** Formato internacional sin signos, para wa.me y tel:. */
  telefonoE164: string;
  email: string;
  horarios: HorarioDia[];
  geo: { lat: number; lng: number };
  imagen: string;
  alt: string;
  /** Localidades que atiende esta oficina. Alimenta el SEO local. */
  zonas: string[];
  /** Párrafo único de la landing. Nunca repetido entre sucursales. */
  descripcion: string;
  esCasaCentral: boolean;
  origen: Origen;
}

export interface HorarioDia {
  /** Formato schema.org: Monday, Tuesday, etc. */
  dias: string[];
  desde: string;
  hasta: string;
}

/** Compañía o plataforma con la que opera PARH. */
export interface Compania {
  slug: string;
  nombre: string;
  logo: string;
  /** Qué es y para qué sirve. Reemplaza al genérico "Cotiza rapido y facil". */
  descripcion: string;
  /** Link al cotizador del tercero. Se abre después del modal de captura. */
  cotizadorUrl: string;
  /** Qué se puede cotizar ahí. */
  cotiza: string[];
  /** Pendiente de autorización de uso de marca. Ver doc 06. */
  logoAutorizado: boolean;
  origen: Origen;
}

/** Métrica de la franja de confianza. */
export interface Metrica {
  valor: number;
  prefijo?: string;
  sufijo?: string;
  label: string;
  origen: Origen;
}

export interface Testimonio {
  id: string;
  nombre: string;
  localidad: string;
  producto: string;
  texto: string;
  estrellas: 1 | 2 | 3 | 4 | 5;
  origen: Origen;
}

/** Alcance de una pregunta frecuente. */
export type FaqScope = "general" | "contacto" | (string & {});

export interface Faq {
  id: string;
  pregunta: string;
  respuesta: string;
  /** "general", "contacto" o el slug de un producto. */
  scope: FaqScope;
  origen: Origen;
}

/** Metadatos de una ruta. Doc 03 sección 5.2. */
export interface MetaPagina {
  ruta: string;
  title: string;
  description: string;
  ogImage?: string;
  noindex?: boolean;
}

/** Rol dentro de la red de PARH. */
export type RolAsesor = "pas" | "organizador";

/**
 * Productor Asesor de Seguros u Organizador de la red de PARH.
 * Alimenta el directorio de /asesores/. Doc 03: el sitio actual no muestra
 * a nadie del equipo, y en seguros la cara visible es el producto.
 */
export interface Asesor {
  slug: string;
  nombre: string;
  rol: RolAsesor;
  /** Número de matrícula de la Superintendencia de Seguros de la Nación. */
  matriculaSSN: string | null;
  /** Localidades donde atiende. Alimenta el filtro por zona. */
  zonas: string[];
  /** Slugs de producto en los que se especializa. Alimenta el filtro. */
  especialidades: string[];
  telefono: string | null;
  telefonoE164: string | null;
  email: string | null;
  /** Ruta base de la foto, sin sufijo de ancho ni extensión. */
  foto?: string;
  /** Presentación breve, en primera persona del plural o tercera. */
  bio: string;
  /** Sucursal desde la que opera, si corresponde. */
  oficina?: string;
  origen: Origen;
}
