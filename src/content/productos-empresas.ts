import type { Producto } from "./types";

/**
 * Seguros para empresas, comercios y profesionales.
 *
 * Es el segmento de mayor margen y hoy está escondido en parh.com.ar, dentro
 * de un acordeón en la página que todavía tiene texto de plantilla.
 * Ver doc 01 sección 4, cuello de botella #3.
 *
 * `introduccion` y `paraQuien` toman el copy verbatim de /Sobre-nosotros/,
 * con las correcciones autorizadas del doc 03 sección 4.1.
 * El resto es contenido nuevo para el prototipo, pendiente de revisión.
 */
export const productosEmpresas: Producto[] = [
  {
    slug: "responsabilidad-civil",
    segmento: "empresas",
    nombre: "Responsabilidad Civil",
    titulo: "Seguro de responsabilidad civil",
    bajada: "Protegé tu actividad ante reclamos de terceros por daños.",
    icono: "scale",
    imagen: "/img/productos/responsabilidad-civil",
    alt: "Profesional supervisando una obra en construcción",
    introduccion:
      "Es una cobertura que protege a individuos y empresas ante posibles reclamaciones por daños a terceros. Es fundamental para garantizar seguridad financiera y cumplir con obligaciones legales.",
    cubre: [
      "Daños materiales causados a terceros durante la actividad",
      "Lesiones a terceros dentro del ámbito de trabajo",
      "Gastos de defensa legal ante un reclamo",
      "Responsabilidad civil cruzada entre contratistas",
      "Daños por trabajos terminados, según la póliza",
    ],
    noCubre: [
      "Daños a bienes propios de la empresa",
      "Multas y sanciones administrativas",
      "Incumplimientos contractuales que no deriven en un daño",
      "Actividades no declaradas en la póliza",
      "Daños causados con dolo",
    ],
    paraQuien: [
      "Profesionales que firman proyectos, informes o certificaciones",
      "Empresas de construcción y montaje",
      "Organizadores de eventos",
      "Operadores de maquinaria pesada",
      "Empresas de demolición",
    ],
    companias: ["federacion-patronal", "san-cristobal"],
    textoExtendido:
      "La responsabilidad civil es la cobertura que más se pide por contrato y la que menos se entiende. Hay varios tipos y no son intercambiables: la RC Profesional cubre el error u omisión de quien presta un servicio técnico, la RC de Construcción y Montaje cubre la obra en ejecución, la de Eventos cubre el daño a un asistente y la de Maquinarias cubre el daño causado por el equipo. Contratar la que no corresponde es equivalente a no tener nada. Los tipos que trabajamos son RC Profesional, RC Construcción y Montaje, RC Demolición, RC Eventos y RC Maquinarias, entre otras. Contanos qué te están pidiendo y armamos la póliza que corresponde.",
    origen: "placeholder",
  },
  {
    slug: "integral-de-comercio",
    segmento: "empresas",
    nombre: "Integral de Comercio",
    titulo: "Seguro integral de comercio",
    bajada: "Cobertura para locales, oficinas, restaurantes y hoteles.",
    icono: "store",
    imagen: "/img/productos/integral-comercio",
    alt: "Local comercial de barrio con las persianas abiertas",
    introduccion:
      "Es una cobertura diseñada para proteger negocios, oficinas y locales comerciales ante diversos riesgos que pueden afectar su actividad. Su objetivo es garantizar la continuidad del negocio y minimizar pérdidas económicas en caso de siniestros.",
    cubre: [
      "Incendio del local y de las mercaderías",
      "Robo de mercadería, equipamiento y dinero en caja",
      "Cristales del frente y vidrieras",
      "Daños por agua y por tormenta",
      "Responsabilidad civil hacia clientes dentro del local",
      "Equipos electrónicos del negocio",
      "Pérdida de beneficio por paralización de la actividad, según el plan",
    ],
    noCubre: [
      "Faltante de mercadería sin signos de robo, es decir el hurto interno",
      "Mercadería a la intemperie o fuera del local",
      "Daños por instalaciones eléctricas fuera de norma",
      "Actividades distintas a la declarada en la póliza",
      "Dinero en tránsito, salvo cláusula específica",
    ],
    paraQuien: [
      "Locales comerciales",
      "Oficinas y estudios profesionales",
      "Restaurantes y bares",
      "Hoteles y alojamientos",
    ],
    companias: ["federacion-patronal", "san-cristobal", "atm"],
    textoExtendido:
      "El punto ciego más frecuente en un integral de comercio es la responsabilidad civil hacia terceros. Muchas pólizas económicas cubren el incendio y el robo, pero dejan afuera el caso más probable de todos, que es un cliente que se lastima adentro del local. Un resbalón con una demanda posterior puede costar más que el stock completo. El segundo punto ciego es la suma asegurada de mercadería, que casi nunca se actualiza y termina generando una reducción proporcional al momento de cobrar. Revisamos tu póliza actual y te decimos dónde estás expuesto. Atendemos comercios en Morón, Marcos Paz, Mercedes, Luján y alrededores.",
    origen: "placeholder",
  },
  {
    slug: "seguro-tecnico",
    segmento: "empresas",
    nombre: "Seguro Técnico",
    titulo: "Seguro técnico",
    bajada: "Cobertura para equipos electrónicos, maquinaria y obras.",
    icono: "hard-hat",
    imagen: "/img/productos/seguro-tecnico",
    alt: "Maquinaria de obra y equipos electrónicos en un depósito",
    introduccion:
      "Esta cobertura está diseñada para proteger equipos electrónicos, maquinaria, herramientas y obras de construcción ante daños accidentales, imprevistos o fallas operativas. Es una cobertura clave para empresas y profesionales que dependen de tecnología y equipos especializados.",
    cubre: [
      "Daño accidental a equipos electrónicos",
      "Rotura de maquinaria por falla operativa",
      "Equipos y herramientas de contratistas, incluso en tránsito",
      "Todo riesgo de construcción y montaje durante la obra",
      "Daños por error de operación",
      "Gastos de flete y montaje para la reparación",
    ],
    noCubre: [
      "Desgaste natural, corrosión y mantenimiento",
      "Fallas cubiertas por la garantía del fabricante",
      "Equipos con más antigüedad que la que admite la compañía",
      "Pérdida de datos y software, salvo cláusula específica",
      "Daño por uso distinto al declarado",
    ],
    paraQuien: [
      "Constructoras y empresas de montaje",
      "Estudios de arquitectura e ingeniería",
      "Empresas con maquinaria propia",
      "Profesionales con equipamiento electrónico de alto valor",
      "Contratistas que trabajan en obra de terceros",
    ],
    companias: ["federacion-patronal", "san-cristobal"],
    textoExtendido:
      "El seguro técnico existe porque las pólizas generales no cubren el daño interno de un equipo. Un integral de comercio cubre el incendio que quema la máquina, pero no la rotura de la máquina por una falla propia. Esa diferencia es toda la razón de ser de esta cobertura. Los tipos que trabajamos son Equipos Electrónicos, Rotura de Maquinarias, Contratista y Riesgo de Construcción y Montaje. Si tu actividad depende de un equipo puntual, la pregunta útil es cuántos días podrías seguir facturando si ese equipo se rompe mañana. Si la respuesta es pocos, esta cobertura te corresponde.",
    origen: "placeholder",
  },
  {
    slug: "accidentes-personales",
    segmento: "empresas",
    nombre: "Accidentes Personales",
    titulo: "Accidentes personales para tu personal",
    bajada: "Cobertura para trabajadores y colaboradores que no poseen ART.",
    icono: "briefcase",
    imagen: "/img/productos/accidentes-personales",
    alt: "Grupo de trabajadores con equipo de protección personal",
    introduccion:
      "Cubre a las personas que trabajan con vos y que no están alcanzadas por una ART. Es habitual en monotributistas contratados, colaboradores eventuales, alumnos de talleres y personal de eventos.",
    cubre: [
      "Muerte accidental del trabajador",
      "Invalidez total o parcial permanente por accidente",
      "Asistencia médica derivada del accidente",
      "Cobertura en horario de actividad o las 24 horas",
      "Nómina variable, para personal eventual",
    ],
    noCubre: [
      "Enfermedades profesionales, que corresponden a la ART",
      "Personal en relación de dependencia, que debe tener ART por ley",
      "Accidentes fuera del horario cubierto, si se contrató acotado",
      "Actividades distintas a las declaradas",
    ],
    paraQuien: [
      "Empresas con monotributistas contratados",
      "Organizadores de eventos con personal eventual",
      "Escuelas deportivas y talleres con alumnos",
      "Clubes y asociaciones",
    ],
    companias: ["federacion-patronal", "atm"],
    textoExtendido:
      "Esta cobertura no reemplaza a la ART y es importante tenerlo claro. Si tenés personal en relación de dependencia, la ART es obligatoria por ley. Accidentes personales cubre el hueco que queda con todos los demás: el monotributista que te factura, el colaborador que viene por un evento puntual, el alumno del taller. Ese hueco es real y en general nadie lo tiene resuelto hasta que pasa algo. Contanos cómo está compuesto tu equipo y vemos qué corresponde en cada caso.",
    origen: "placeholder",
  },
];

export const slugsEmpresas = productosEmpresas.map((p) => p.slug);
