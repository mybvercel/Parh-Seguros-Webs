/**
 * Datos globales del sitio y metadatos por ruta. Doc 03 sección 5.2.
 */

import type { MetaPagina } from "./types";

export const sitio = {
  /** Razón social, tomada del logo entregado. */
  razonSocial: "PARH APS SRL",
  /** Nombre comercial, verbatim de parh.com.ar. */
  nombre: "Grupo PARH Bróker de Seguros",
  nombreCorto: "PARH",
  claim: "Broker de Seguros",
  /** Definir www o sin www antes del deploy y ser consistente. Doc 03 sección 5.1. */
  url: "https://www.parh.com.ar",
  email: "info@parh.com.ar",
  telefono: "11 2244 5022",
  telefonoE164: "5491122445022",
  whatsappDirecto: "https://wa.me/message/HQLGWMR2P4FDD1",
  /**
   * Bot de WhatsApp de PARH. Responde al instante y las 24 horas, a diferencia
   * del número principal, que lo atiende una persona en horario hábil.
   * Se ofrece como alternativa, nunca en reemplazo: el diferencial de PARH es
   * justamente que del otro lado hay alguien (doc 01, cuello de botella 2).
   */
  botTelefono: "11 7246 1415",
  botTelefonoE164: "5491172461415",
  redes: {
    instagram: "https://www.instagram.com/seguros_para_vos",
    facebook: "https://www.facebook.com/share/1BoVx73Hmi/",
    linkedin: "https://www.linkedin.com/in/parh/",
  },
  /** PENDIENTE: número de matrícula de Productor Asesor de Seguros (SSN). */
  matriculaSSN: null as string | null,
} as const;

/** Copy verbatim de parh.com.ar. Doc 03 sección 4.2. No se reescribe. */
export const copyHeredado = {
  heroTitulo: "Atención Diferente, Resultados Sorprendentes",
  heroSubtitulo: "Hacemos que recibas la atención que mereces",
  cta: "Contactanos",
  sobreNosotros:
    "Con más de 20 años de trayectoria en el rubro, nuestra empresa se destaca por brindar soluciones confiables y eficientes a cada cliente. Nos enfocamos en la calidad del servicio y la seguridad, ofreciendo coberturas adaptadas a cada necesidad. Nuestra experiencia y compromiso nos convierten en la mejor elección para proteger lo que más valoras.",
  atencionDiferente:
    "Brindamos una atención única, enfocada en el detalle y en las necesidades reales de nuestros clientes. Nuestro compromiso con la excelencia y la innovación nos permite generar resultados que superan expectativas, construyendo confianza con nuestros asegurados y asesores.",
  compromisoYSeguridad:
    "Nuestro compromiso es tu tranquilidad. Trabajamos con responsabilidad y dedicación para brindarte la seguridad que necesitas, ayudándote a proteger lo que más amas, con soluciones confiables y a tu medida.",
  yMas:
    "Estamos disponibles para cotizar todo lo que necesites. Contactanos y acomodamos el seguro a tu medida.",
} as const;

/** Copy nuevo aprobado en el doc 03 sección 4.3. */
export const copyNuevo = {
  fricciónCta: "Sin spam. Sin compromiso. Te responde una persona el mismo día hábil.",
  pasos: [
    {
      numero: 1,
      titulo: "Contanos qué necesitás",
      texto:
        "Por WhatsApp, por teléfono o desde el formulario. En dos minutos sabemos qué querés proteger.",
    },
    {
      numero: 2,
      titulo: "Comparamos entre las compañías",
      texto:
        "Trabajamos con Federación Patronal, San Cristóbal, ATM y otras. Te llevamos las opciones que tienen sentido para tu caso.",
    },
    {
      numero: 3,
      titulo: "Te acompañamos siempre",
      texto:
        "Desde que firmás la póliza hasta el día que tengas un siniestro. Del otro lado siempre hay una persona.",
    },
  ],
  porQueBroker: {
    titulo: "Un cotizador online te da un precio. Nosotros te damos un asesor.",
    bajada:
      "Comparar precios lo hace cualquiera. Lo difícil es saber qué te conviene y que haya alguien atendiéndote el día que pase algo.",
    puntos: [
      "Comparamos entre varias compañías, no vendemos una sola.",
      "Cuatro oficinas donde podés venir a hablar con alguien.",
      "Te acompañamos en la gestión del siniestro, que es cuando el seguro realmente importa.",
      "Más de 20 años haciendo esto, con oficinas propias y alcance en todo el país.",
    ],
  },
} as const;

/** Metadatos por ruta. Títulos hasta 60 caracteres, descripciones hasta 155. */
export const metadatos: MetaPagina[] = [
  {
    ruta: "/",
    title: "Bróker de Seguros en Morón, Luján y Mercedes | PARH",
    description:
      "Bróker independiente con más de 20 años. Comparamos entre varias compañías y te acompañamos también en el siniestro. 4 oficinas en el Oeste.",
  },
  {
    ruta: "/seguros/",
    title: "Seguros para Personas y Familias | PARH Seguros",
    description:
      "Auto, moto, hogar, vida, retiro, accidentes personales, viajes y celular. Comparamos entre varias compañías y te asesoramos sin cargo.",
  },
  {
    ruta: "/seguros/automotor/",
    title: "Seguro Automotor en Morón y Zona Oeste | PARH Seguros",
    description:
      "Coberturas para tu auto, camioneta, casa rodante y tráiler. Comparamos entre varias compañías y te asesoramos sin cargo. Cotizá hoy.",
  },
  {
    ruta: "/seguros/motovehiculo/",
    title: "Seguro para Moto en Zona Oeste | PARH Seguros",
    description:
      "Coberturas para tu moto adaptadas a lo que realmente necesitás. Responsabilidad civil, robo e incendio, todo riesgo. Cotizá en minutos.",
  },
  {
    ruta: "/seguros/hogar/",
    title: "Seguro de Hogar en Morón y Zona Oeste | PARH Seguros",
    description:
      "Protegé tu casa contra incendio, robo, daños por agua y granizo. Te ayudamos a elegir la suma asegurada correcta.",
  },
  {
    ruta: "/seguros/vida/",
    title: "Seguro de Vida | PARH Bróker de Seguros",
    description:
      "Coberturas para proteger a los tuyos en momentos difíciles. Te explicamos las opciones sin vueltas y sin letra chica.",
  },
  {
    ruta: "/seguros/retiro/",
    title: "Seguro de Retiro | PARH Bróker de Seguros",
    description:
      "Armá tu retiro con tranquilidad. Coberturas a medida para proyectos personales y ahorro de largo plazo.",
  },
  {
    ruta: "/seguros/accidentes-personales/",
    title: "Seguro de Accidentes Personales | PARH Seguros",
    description:
      "Cobertura para independientes, deportistas, alumnos y empleados sin ART. Consultá tu caso con un asesor.",
  },
  {
    ruta: "/seguros/asistencia-al-viajero/",
    title: "Asistencia al Viajero | PARH Seguros",
    description:
      "Cobertura médica y de equipaje para tus viajes. Cotizá y emití online en minutos, o consultanos por tu destino.",
  },
  {
    ruta: "/seguros/seguro-de-celular/",
    title: "Seguro de Celular | PARH Seguros",
    description:
      "Cubrí tu celular ante robo y rotura de pantalla. Cotizá y emití online en minutos desde la web.",
  },
  {
    ruta: "/empresas/",
    title: "Seguros para Empresas y Comercios | PARH Seguros",
    description:
      "ART, caución, responsabilidad civil, integral de comercio y seguro técnico. Asesoramiento para PyMEs de todo el país.",
  },
  {
    ruta: "/empresas/responsabilidad-civil/",
    title: "Seguro de Responsabilidad Civil | PARH Seguros",
    description:
      "RC Profesional, Construcción y Montaje, Demolición, Eventos y Maquinarias. Protegé tu actividad ante reclamos de terceros.",
  },
  {
    ruta: "/empresas/integral-de-comercio/",
    title: "Integral de Comercio | Seguro para tu Local | PARH",
    description:
      "Cobertura para locales, oficinas, restaurantes y hoteles. Continuidad del negocio ante incendio, robo y daños.",
  },
  {
    ruta: "/empresas/seguro-tecnico/",
    title: "Seguro Técnico para Equipos y Obras | PARH Seguros",
    description:
      "Equipos electrónicos, rotura de maquinarias, contratista y riesgo de construcción y montaje. Cotizá con un asesor.",
  },
  {
    ruta: "/empresas/accidentes-personales/",
    title: "Accidentes Personales para Empresas | PARH Seguros",
    description:
      "Cobertura para monotributistas, personal eventual y alumnos que no están alcanzados por una ART.",
  },
  {
    ruta: "/empresas/art/",
    title: "ART para tu Empresa | PARH Seguros",
    description:
      "Cobertura obligatoria para tu personal en relación de dependencia. Te ayudamos a elegir la ART que mejor responde el día del accidente.",
  },
  {
    ruta: "/empresas/caucion/",
    title: "Seguro de Caución | Garantías y Licitaciones | PARH",
    description:
      "La garantía que te piden para licitaciones, obras y alquileres, sin inmovilizar plata. Armamos la carpeta y la presentamos con vos.",
  },
  {
    ruta: "/cotizar/",
    title: "Cotizá tu Seguro Online | PARH Bróker de Seguros",
    description:
      "Cotizadores de Federación Patronal, San Cristóbal, ATM y más. Si preferís, cotizamos nosotros por vos y comparamos.",
  },
  {
    ruta: "/diagnostico/",
    title: "Diagnóstico de Cobertura en 90 Segundos | PARH Seguros",
    description:
      "Respondé 6 preguntas y te decimos qué riesgos podrían estar sin cubrir. Gratis, sin compromiso y sin dar datos de tarjeta.",
  },
  {
    ruta: "/oficinas/",
    title: "Nuestras Oficinas | PARH Bróker de Seguros",
    description:
      "Morón, Marcos Paz, Mercedes y Luján. Cuatro oficinas donde podés venir a hablar con un asesor en persona.",
  },
  {
    ruta: "/oficinas/moron/",
    title: "Bróker de Seguros en Morón | PARH",
    description:
      "Oficina en Av. Gral. Miguel de Azcuénaga 705, Morón. Asesoramiento en seguros de auto, hogar, vida y comercio.",
  },
  {
    ruta: "/oficinas/marcos-paz/",
    title: "Bróker de Seguros en Marcos Paz | PARH",
    description:
      "Oficina en Melgar 2034, Marcos Paz. Te asesoramos en persona sobre la cobertura que necesitás.",
  },
  {
    ruta: "/oficinas/mercedes/",
    title: "Bróker de Seguros en Mercedes | PARH",
    description:
      "Oficina en Calle 18 nro. 409, Mercedes. Seguros para personas, comercios y profesionales.",
  },
  {
    ruta: "/oficinas/lujan/",
    title: "Bróker de Seguros en Luján | PARH",
    description:
      "Oficina en Av. Constitución 1612, Luján. Asesoramiento personal en seguros para tu familia o tu negocio.",
  },
  {
    ruta: "/asesores/",
    title: "Organizadores y Asesores | PARH Seguros",
    description:
      "Productores Asesores de Seguros que trabajan exclusivo con PARH. Buscá por zona y hablá directo con quien atiende la tuya.",
  },
  {
    ruta: "/nosotros/",
    title: "Quiénes Somos | PARH Bróker de Seguros",
    description:
      "Más de 20 años asesorando. Bróker independiente con 4 sucursales y acuerdos con más de 15 compañías.",
  },
  {
    ruta: "/contacto/",
    title: "Contacto | PARH Bróker de Seguros",
    description:
      "Escribinos por WhatsApp al 11 2244 5022 o dejanos tu consulta. Te respondemos el mismo día hábil.",
  },
  {
    ruta: "/gracias/",
    title: "Gracias por tu consulta | PARH Seguros",
    description: "Recibimos tu mensaje. Te respondemos el mismo día hábil.",
    noindex: true,
  },
];

export function getMeta(ruta: string): MetaPagina | undefined {
  return metadatos.find((m) => m.ruta === ruta);
}

/**
 * `Metadata` de Next.js para una ruta, lista para exportar desde `page.tsx`.
 *
 * Los títulos del doc 03 sección 5.2 ya incluyen la marca completa
 * ("... | PARH Seguros"). El layout raíz define `template: "%s | PARH"`
 * para páginas que no seteen su propio título, así que acá se usa
 * `title: { absolute }` para que estos títulos completos no se dupliquen
 * ("... | PARH Seguros | PARH").
 */
export function metadataDe(ruta: string): import("next").Metadata {
  const meta = getMeta(ruta);
  if (!meta) return {};

  return {
    title: { absolute: meta.title },
    description: meta.description,
    alternates: { canonical: ruta },
    robots: meta.noindex ? { index: false, follow: true } : undefined,
    openGraph: { title: meta.title, description: meta.description },
  };
}
