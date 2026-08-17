import type { Testimonio } from "./types";

/**
 * Prueba social. Doc 02 sección A: el patrón de Worth Insurance es el
 * testimonio con nombre de la persona que atendió, no un elogio genérico.
 *
 * TODOS INVENTADOS. Son maquetas para ver cómo se comporta el componente con
 * textos de distinto largo.
 *
 * ANTES DE PUBLICAR hay que reemplazarlos por reseñas reales con autorización.
 * La fuente más práctica son las reseñas de Google Business Profile de las
 * 4 sucursales, que ya existen y no requieren pedir permiso uno por uno.
 * Publicar testimonios inventados de un negocio real no es una opción.
 */
export const testimonios: Testimonio[] = [
  {
    id: "t1",
    nombre: "Marcela D.",
    localidad: "Morón",
    producto: "Seguro de hogar",
    texto:
      "Tenía la casa asegurada por un monto de hace años y ni me había dado cuenta. Me lo revisaron sin cargo y me explicaron qué iba a pasar si tenía un siniestro con esa suma. Lo actualicé al día siguiente.",
    estrellas: 5,
    origen: "placeholder",
  },
  {
    id: "t2",
    nombre: "Diego F.",
    localidad: "Marcos Paz",
    producto: "Integral de comercio",
    texto:
      "Abrí el local en enero y necesitaba el seguro para el contrato de alquiler. Me lo resolvieron en dos días y me avisaron que la póliza que había cotizado por mi cuenta no incluía responsabilidad civil.",
    estrellas: 5,
    origen: "placeholder",
  },
  {
    id: "t3",
    nombre: "Silvia R.",
    localidad: "Luján",
    producto: "Seguro automotor",
    texto:
      "Me chocaron y no tenía idea de cómo hacer la denuncia. Los llamé y se encargaron ellos de todo el trámite con la compañía. Eso es lo que después no te da un cotizador online.",
    estrellas: 5,
    origen: "placeholder",
  },
  {
    id: "t4",
    nombre: "Hernán L.",
    localidad: "Mercedes",
    producto: "Responsabilidad civil profesional",
    texto:
      "Un cliente me pidió RC Profesional y yo no sabía ni por dónde empezar. Me explicaron qué tipo necesitaba según lo que firmo y lo emitieron en la semana.",
    estrellas: 5,
    origen: "placeholder",
  },
  {
    id: "t5",
    nombre: "Paula G.",
    localidad: "Castelar",
    producto: "Seguro para moto",
    texto:
      "Uso la moto para trabajar y en la aseguradora anterior nunca me lo habían preguntado. Acá me avisaron que si tenía un siniestro repartiendo me lo podían rechazar. Cambié la póliza.",
    estrellas: 5,
    origen: "placeholder",
  },
  {
    id: "t6",
    nombre: "Roberto M.",
    localidad: "Ituzaingó",
    producto: "Seguro de vida",
    texto:
      "Venía postergando esto hace años. Me mostraron las opciones con los números al lado, sin presionarme para que contratara la más cara.",
    estrellas: 5,
    origen: "placeholder",
  },
];
