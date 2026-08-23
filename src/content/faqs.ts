import type { Faq } from "./types";

/**
 * Preguntas frecuentes. Alimentan el acordeón y el schema FAQPage.
 * Doc 02 sección A: capturan cola larga y matan objeciones sin agrandar la
 * parte visible de la página.
 *
 * Escritas para el prototipo. Las respuestas son correctas en términos
 * generales del mercado argentino, pero el alcance concreto depende de la
 * póliza de cada compañía, así que van marcadas como placeholder hasta que
 * Roberto las valide.
 */
export const faqs: Faq[] = [
  // Generales
  {
    id: "que-es-broker",
    scope: "general",
    pregunta: "¿Qué es un bróker de seguros y en qué se diferencia de la compañía?",
    respuesta:
      "La compañía fabrica y emite la póliza, y solo te puede ofrecer sus propios productos. Un bróker es independiente: trabaja con varias compañías, compara las opciones y te asesora sobre cuál conviene en tu caso. Además te acompaña en la gestión del siniestro, que es cuando el seguro realmente importa.",
    origen: "placeholder",
  },
  {
    id: "cuanto-cuesta-asesoramiento",
    scope: "general",
    pregunta: "¿Cobran algo por asesorar o por cotizar?",
    respuesta:
      "No. El asesoramiento y la cotización no tienen costo para vos. Un bróker cobra una comisión de la compañía sobre la póliza emitida, así que el precio que pagás es el mismo que si contrataras directo.",
    origen: "placeholder",
  },
  {
    id: "cambiar-de-compania",
    scope: "general",
    pregunta: "Ya tengo seguro con otra compañía. ¿Puedo cambiarme?",
    respuesta:
      "Sí, y no hace falta esperar al vencimiento en la mayoría de los casos. Podés pedir la baja y contratar la nueva póliza sin quedarte sin cobertura ni un día. Traenos la póliza actual y te decimos si conviene cambiar o si estás mejor donde estás.",
    origen: "placeholder",
  },
  {
    id: "atencion-siniestro",
    scope: "general",
    pregunta: "Si tengo un siniestro, ¿a quién llamo?",
    respuesta:
      "A nosotros. Hacés la denuncia con tu asesor y nos ocupamos del trámite con la compañía, del seguimiento y de los reclamos si algo se traba. No vas a tener que explicarle tu caso a un operador distinto cada vez que llamás.",
    origen: "placeholder",
  },
  {
    id: "zona-cobertura",
    scope: "general",
    pregunta: "¿Atienden en todo el país?",
    respuesta:
      "Sí. Tenemos cuatro sucursales, en Morón, Marcos Paz, Mercedes y Luján, donde podés venir a hablar en persona. Pero la póliza se gestiona a distancia por WhatsApp o por mail sin ningún problema, así que trabajamos con clientes de todo el país.",
    origen: "placeholder",
  },
  {
    id: "que-necesito-para-cotizar",
    scope: "general",
    pregunta: "¿Qué datos necesito para pedir una cotización?",
    respuesta:
      "Para auto o moto, la marca, el modelo, el año y el código postal donde duerme el vehículo. Para hogar, la dirección y una idea del valor del contenido. Para comercio, el rubro, la superficie y el valor de la mercadería. Si no tenés todo a mano, escribinos igual y lo vemos juntos.",
    origen: "placeholder",
  },

  // Automotor
  {
    id: "auto-todo-riesgo",
    scope: "automotor",
    pregunta: "¿Conviene contratar todo riesgo?",
    respuesta:
      "Depende del valor del auto y de cuánto podrías afrontar de tu bolsillo ante un choque. Todo riesgo con franquicia cubre el daño propio a partir de un monto, y ese monto es el que define si la póliza tiene sentido para vos. En autos de valor bajo suele convenir una cobertura intermedia con robo, incendio y granizo.",
    origen: "placeholder",
  },
  {
    id: "auto-franquicia",
    scope: "automotor",
    pregunta: "¿Qué es la franquicia?",
    respuesta:
      "Es la parte del daño que queda a tu cargo. Si la franquicia es de un monto determinado y el arreglo cuesta menos que eso, la compañía no paga nada. Cuanto más alta la franquicia, más barata la póliza. Es la variable que más cambia el precio entre una cotización y otra.",
    origen: "placeholder",
  },
  {
    id: "auto-granizo",
    scope: "automotor",
    pregunta: "¿El granizo está incluido?",
    respuesta:
      "No siempre. En muchas pólizas es una cobertura adicional con su propia franquicia. Conviene revisarlo, porque en Buenos Aires el granizo es la causa más frecuente de daño parcial y las reparaciones son caras.",
    origen: "placeholder",
  },

  // Hogar
  {
    id: "hogar-suma-asegurada",
    scope: "hogar",
    pregunta: "¿Cómo sé si mi suma asegurada está bien?",
    respuesta:
      "Preguntate cuánto costaría hoy reponer todo el contenido de tu casa. Si el número de tu póliza es bastante menor, estás subasegurado y ante un siniestro la compañía puede pagar de forma proporcional. Es el error más común y es gratis revisarlo.",
    origen: "placeholder",
  },
  {
    id: "hogar-inquilino",
    scope: "hogar",
    pregunta: "Soy inquilino. ¿Necesito seguro de hogar?",
    respuesta:
      "El edificio lo asegura el propietario, pero tus cosas y tu responsabilidad hacia los vecinos no. Si se rompe un caño y le arruinás el departamento al de abajo, el reclamo te llega a vos. Para un inquilino conviene una póliza de contenido más responsabilidad civil.",
    origen: "placeholder",
  },

  // Integral de comercio
  {
    id: "comercio-rc",
    scope: "integral-de-comercio",
    pregunta: "¿El integral de comercio cubre si un cliente se lastima adentro?",
    respuesta:
      "Solo si la póliza incluye la cláusula de responsabilidad civil hacia terceros. Muchas coberturas económicas la dejan afuera, y es justamente el siniestro más probable en un local con público. Revisá ese punto antes que ningún otro.",
    origen: "placeholder",
  },
  {
    id: "comercio-alquiler",
    scope: "integral-de-comercio",
    pregunta: "Me piden el seguro para firmar el alquiler del local. ¿Cuánto tarda?",
    respuesta:
      "Con los datos completos del local y del rubro, la emisión suele resolverse en pocos días hábiles. Si lo necesitás con urgencia para una firma, avisanos y lo priorizamos.",
    origen: "placeholder",
  },

  // Responsabilidad civil
  {
    id: "rc-cual-necesito",
    scope: "responsabilidad-civil",
    pregunta: "¿Qué tipo de responsabilidad civil necesito?",
    respuesta:
      "Depende de la actividad. La RC Profesional cubre el error u omisión de quien presta un servicio técnico, la de Construcción y Montaje cubre la obra en ejecución, la de Eventos cubre el daño a un asistente y la de Maquinarias cubre el daño que causa el equipo. Contratar la que no corresponde equivale a no tener nada. Contanos qué te están pidiendo y lo resolvemos.",
    origen: "placeholder",
  },
  {
    id: "rc-certificado",
    scope: "responsabilidad-civil",
    pregunta: "Necesito el certificado para presentar en una licitación. ¿Lo emiten?",
    respuesta:
      "Sí. Decinos qué límite de suma asegurada y qué cláusulas te exigen en el pliego, y armamos la póliza con el certificado que corresponde.",
    origen: "placeholder",
  },

  // Contacto
  {
    id: "contacto-horarios",
    scope: "contacto",
    pregunta: "¿En qué horario atienden?",
    respuesta:
      "Las cuatro oficinas atienden de lunes a viernes de 9 a 18. Por WhatsApp podés escribirnos cuando quieras y te respondemos el mismo día hábil.",
    origen: "placeholder",
  },
  {
    id: "contacto-tiempo-respuesta",
    scope: "contacto",
    pregunta: "¿Cuánto tardan en responder?",
    respuesta:
      "El mismo día hábil. Si escribís un fin de semana, te contestamos el lunes a primera hora.",
    origen: "placeholder",
  },
];

/** FAQs de un alcance: "general", "contacto" o el slug de un producto. */
export function getFaqs(scope: string): Faq[] {
  return faqs.filter((f) => f.scope === scope);
}
