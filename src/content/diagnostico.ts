/**
 * Motor del "Diagnóstico de cobertura en 90 segundos". Doc 03 sección 2.2.
 *
 * Es el lead magnet principal. Resuelve el cuello de botella #1: hoy el 100 %
 * del tráfico de cotización se va a un cotizador de tercero sin dejar dato.
 *
 * El dato más valioso que captura no es el contacto, es `vencimiento`: saber
 * cuándo vence la póliza actual permite volver a llamar en el momento justo.
 *
 * Las reglas de puntos ciegos son declarativas a propósito. Agregar un
 * hallazgo nuevo es agregar un objeto acá, sin tocar el wizard.
 */

export type Objeto = "auto-moto" | "hogar" | "comercio" | "familia" | "profesion";
export type Tiene = "hace-anios" | "hace-poco" | "no-tengo";
export type Vencimiento = "este-mes" | "1-a-3-meses" | "mas-de-3-meses" | "no-se";
export type Preocupacion =
  | "aumentos"
  | "que-no-cubra"
  | "no-entiendo"
  | "pago-de-mas";

export interface Respuestas {
  objeto?: Objeto;
  tiene?: Tiene;
  compania?: string;
  vencimiento?: Vencimiento;
  preocupacion?: Preocupacion;
  nombre?: string;
  whatsapp?: string;
  email?: string;
  localidad?: string;
}

export interface Opcion<T extends string = string> {
  value: T;
  label: string;
  /** Línea de apoyo debajo de la opción. Opcional. */
  ayuda?: string;
}

export interface Paso {
  id: keyof Respuestas | "contacto";
  titulo: string;
  ayuda?: string;
  tipo: "opcion" | "contacto";
  opciones?: Opcion[];
  /** Si está definido, el paso solo se muestra para estos objetos. */
  soloSi?: (r: Respuestas) => boolean;
}

export const PASOS: Paso[] = [
  {
    id: "objeto",
    titulo: "¿Qué querés proteger?",
    tipo: "opcion",
    opciones: [
      { value: "auto-moto", label: "Mi auto o mi moto" },
      { value: "hogar", label: "Mi casa o departamento" },
      { value: "comercio", label: "Mi comercio o mi empresa" },
      { value: "familia", label: "A mi familia" },
      { value: "profesion", label: "Mi actividad profesional" },
    ],
  },
  {
    id: "tiene",
    titulo: "¿Tenés seguro hoy?",
    tipo: "opcion",
    opciones: [
      { value: "hace-anios", label: "Sí, hace años" },
      { value: "hace-poco", label: "Sí, lo saqué hace poco" },
      { value: "no-tengo", label: "No tengo" },
    ],
  },
  {
    id: "compania",
    titulo: "¿Con qué compañía?",
    ayuda: "Si no te acordás, no importa. Es solo para orientarnos.",
    tipo: "opcion",
    soloSi: (r) => r.tiene !== "no-tengo",
    opciones: [
      { value: "federacion-patronal", label: "Federación Patronal" },
      { value: "san-cristobal", label: "San Cristóbal" },
      { value: "atm", label: "ATM Seguros" },
      { value: "otra", label: "Otra compañía" },
      { value: "no-me-acuerdo", label: "No me acuerdo" },
    ],
  },
  {
    id: "vencimiento",
    titulo: "¿Cuándo vence tu póliza?",
    tipo: "opcion",
    soloSi: (r) => r.tiene !== "no-tengo",
    opciones: [
      { value: "este-mes", label: "Este mes" },
      { value: "1-a-3-meses", label: "En 1 a 3 meses" },
      { value: "mas-de-3-meses", label: "En más de 3 meses" },
      { value: "no-se", label: "No sé" },
    ],
  },
  {
    id: "preocupacion",
    titulo: "¿Qué es lo que más te preocupa?",
    tipo: "opcion",
    opciones: [
      { value: "aumentos", label: "Que me sigan aumentando" },
      { value: "que-no-cubra", label: "Que no me cubran cuando lo necesite" },
      { value: "no-entiendo", label: "No entender qué tengo contratado" },
      { value: "pago-de-mas", label: "Estar pagando de más" },
    ],
  },
  {
    id: "contacto",
    titulo: "Listo. ¿A dónde te mandamos el diagnóstico?",
    ayuda: "Sin spam. Sin compromiso. Te responde una persona el mismo día hábil.",
    tipo: "contacto",
  },
];

/** Un hallazgo del informe. */
export interface PuntoCiego {
  id: string;
  titulo: string;
  detalle: string;
  /** Slug del producto relacionado, para linkear a la página que corresponde. */
  producto?: string;
  cuando: (r: Respuestas) => boolean;
}

/**
 * Reglas de puntos ciegos.
 *
 * Escritas de más general a más específico. La pantalla de resultado muestra
 * las primeras 5 que coincidan, para que el informe no se vuelva un muro.
 */
export const PUNTOS_CIEGOS: PuntoCiego[] = [
  // Sin seguro
  {
    id: "sin-cobertura",
    titulo: "Hoy estás sin cobertura",
    detalle:
      "Es el escenario más caro de todos, porque cualquier siniestro lo pagás entero de tu bolsillo. En auto además la responsabilidad civil es obligatoria por ley.",
    cuando: (r) => r.tiene === "no-tengo",
  },

  // Póliza vieja
  {
    id: "suma-desactualizada",
    titulo: "Tu suma asegurada probablemente quedó vieja",
    detalle:
      "Una póliza de hace años suele tener montos que ya no alcanzan para reponer nada. Si el valor asegurado quedó por debajo del valor real, la compañía puede pagar de forma proporcional y cobrás una fracción de lo que perdiste.",
    producto: "hogar",
    cuando: (r) => r.tiene === "hace-anios" && r.objeto === "hogar",
  },
  {
    id: "poliza-sin-revisar",
    titulo: "Hace años que nadie te revisa la póliza",
    detalle:
      "Las coberturas cambian, aparecen cláusulas nuevas y los precios entre compañías se mueven todo el tiempo. Una póliza que no se revisa hace años casi siempre tiene algo que ajustar.",
    cuando: (r) => r.tiene === "hace-anios" && r.objeto !== "hogar",
  },

  // Vencimiento
  {
    id: "vence-ya",
    titulo: "Tu póliza vence este mes",
    detalle:
      "Es el mejor momento para comparar. Antes de que se renueve sola con el aumento que decida la compañía, podemos ver qué ofrecen las otras.",
    cuando: (r) => r.vencimiento === "este-mes",
  },
  {
    id: "no-sabe-vencimiento",
    titulo: "No sabés cuándo vence tu póliza",
    detalle:
      "Vale la pena averiguarlo. La renovación automática es el momento donde más se acumulan los aumentos, porque pasa sin que nadie lo revise.",
    cuando: (r) => r.vencimiento === "no-se",
  },

  // Auto y moto
  {
    id: "auto-granizo",
    titulo: "Revisá si tenés cobertura de granizo",
    detalle:
      "En Buenos Aires el granizo es la causa más frecuente de daño parcial, y en muchas pólizas es una cobertura adicional que hay que contratar aparte.",
    producto: "automotor",
    cuando: (r) => r.objeto === "auto-moto",
  },
  {
    id: "auto-franquicia",
    titulo: "Puede que no sepas cuál es tu franquicia",
    detalle:
      "La franquicia es la parte del daño que queda a tu cargo. Es la variable que más cambia el precio y la que más sorpresas genera el día del siniestro.",
    producto: "automotor",
    cuando: (r) =>
      r.objeto === "auto-moto" &&
      (r.preocupacion === "no-entiendo" || r.preocupacion === "que-no-cubra"),
  },

  // Hogar
  {
    id: "hogar-robo-calle",
    titulo: "El robo en la vía pública suele quedar afuera",
    detalle:
      "La póliza básica de hogar cubre lo que pasa dentro de la casa. El celular, la notebook o la bicicleta fuera de la vivienda necesitan una cláusula específica.",
    producto: "hogar",
    cuando: (r) => r.objeto === "hogar",
  },

  // Comercio
  {
    id: "comercio-rc",
    titulo: "Fijate si tu póliza incluye responsabilidad civil hacia terceros",
    detalle:
      "Es el punto ciego más común en un integral de comercio. Muchas coberturas económicas cubren incendio y robo, pero dejan afuera el siniestro más probable de todos, que es un cliente que se lastima dentro del local.",
    producto: "integral-de-comercio",
    cuando: (r) => r.objeto === "comercio",
  },
  {
    id: "comercio-mercaderia",
    titulo: "El valor de la mercadería casi nunca está actualizado",
    detalle:
      "Si el stock creció y la suma asegurada quedó igual, ante un siniestro se aplica una reducción proporcional sobre lo que cobrás.",
    producto: "integral-de-comercio",
    cuando: (r) => r.objeto === "comercio" && r.tiene !== "no-tengo",
  },

  // Profesional
  {
    id: "rc-profesional",
    titulo: "Si firmás proyectos o informes, te falta RC Profesional",
    detalle:
      "Cubre el reclamo de un cliente por un error u omisión en tu trabajo. Muchos colegios profesionales y la mayoría de las licitaciones ya la exigen.",
    producto: "responsabilidad-civil",
    cuando: (r) => r.objeto === "profesion",
  },
  {
    id: "profesional-sin-art",
    titulo: "Si trabajás por tu cuenta, no tenés ART",
    detalle:
      "Un accidente que te deje sin poder facturar no tiene ningún respaldo. Accidentes personales cubre justamente ese hueco y es de costo bajo.",
    producto: "accidentes-personales",
    cuando: (r) => r.objeto === "profesion" || r.objeto === "comercio",
  },

  // Familia
  {
    id: "vida-postergado",
    titulo: "La prima del seguro de vida se fija por la edad que tenés hoy",
    detalle:
      "Es el producto que más se posterga y el que más barato sale cuanto antes se contrata. Cada año que pasa, la misma cobertura cuesta más.",
    producto: "vida",
    cuando: (r) => r.objeto === "familia",
  },
  {
    id: "vida-sin-cobertura",
    titulo: "Revisá quién queda cubierto si vos faltás",
    detalle:
      "Si sos el principal sostén económico de tu casa, el seguro de vida no es para vos, es para los que quedan.",
    producto: "vida",
    cuando: (r) => r.objeto === "familia" && r.tiene === "no-tengo",
  },

  // Preocupación
  {
    id: "aumentos-comparar",
    titulo: "Los aumentos no son iguales en todas las compañías",
    detalle:
      "Cada aseguradora ajusta con su propio criterio. Comparar al vencimiento es la única forma de saber si el aumento que te mandaron es razonable.",
    cuando: (r) => r.preocupacion === "aumentos" || r.preocupacion === "pago-de-mas",
  },
];

/** Devuelve hasta `max` hallazgos para las respuestas dadas. */
export function calcularPuntosCiegos(r: Respuestas, max = 5): PuntoCiego[] {
  return PUNTOS_CIEGOS.filter((p) => p.cuando(r)).slice(0, max);
}

/** Pasos que corresponden mostrar según lo respondido hasta el momento. */
export function pasosVisibles(r: Respuestas): Paso[] {
  return PASOS.filter((p) => !p.soloSi || p.soloSi(r));
}

const ETIQUETA_OBJETO: Record<Objeto, string> = {
  "auto-moto": "auto o moto",
  hogar: "casa",
  comercio: "comercio o empresa",
  familia: "familia",
  profesion: "actividad profesional",
};

/** Resumen para prellenar el mensaje de WhatsApp. Doc 03 sección 2.2. */
export function resumenParaWhatsapp(r: Respuestas): string {
  const partes = ["Hola PARH, hice el diagnóstico en la web."];

  if (r.objeto) partes.push(`Quiero proteger mi ${ETIQUETA_OBJETO[r.objeto]}.`);
  if (r.tiene === "no-tengo") partes.push("Hoy no tengo seguro.");
  if (r.vencimiento === "este-mes") partes.push("Mi póliza vence este mes.");
  if (r.nombre) partes.push(`Mi nombre es ${r.nombre}.`);

  return partes.join(" ");
}
