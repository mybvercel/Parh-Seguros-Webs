import type { Producto } from "./types";

/**
 * Seguros para personas.
 *
 * `nombre` y `bajada` son copy verbatim de parh.com.ar, con las únicas
 * correcciones autorizadas del doc 03 sección 4.1: tildes y quitar el Title
 * Case forzado, que en español es un error tipográfico.
 *
 * El resto (introducción, qué cubre, qué no cubre, para quién y texto
 * extendido) está escrito para el prototipo y espera revisión de Roberto,
 * porque el alcance real depende de la póliza de cada compañía.
 * Por eso `origen: "placeholder"`.
 */
export const productosPersonas: Producto[] = [
  {
    slug: "automotor",
    segmento: "personas",
    nombre: "Seguro Automotor",
    titulo: "Seguro automotor",
    bajada: "Coberturas para tu auto, camioneta, casa rodante, tráiler y más.",
    icono: "car",
    imagen: "/img/productos/seguro-automotor",
    alt: "Auto estacionado frente a una casa en un barrio del Oeste bonaerense",
    introduccion:
      "El seguro de auto es obligatorio, pero no todas las pólizas cubren lo mismo. Te ayudamos a entender qué estás contratando y comparamos entre las compañías con las que trabajamos para que pagues por lo que realmente necesitás.",
    cubre: [
      "Responsabilidad civil hacia terceros, que es la cobertura mínima que exige la ley",
      "Robo e incendio, total o parcial",
      "Destrucción total por accidente",
      "Daños por granizo, que en Buenos Aires es la causa más común de daño parcial",
      "Cristales, cerraduras y ópticas",
      "Auxilio mecánico, remolque y asistencia al viajero",
      "Todo riesgo con franquicia, si querés cobertura de daño propio",
    ],
    noCubre: [
      "Siniestros con el conductor alcoholizado o sin registro vigente",
      "Uso comercial del vehículo si la póliza se contrató como particular",
      "Desgaste por uso, fallas mecánicas y mantenimiento",
      "Objetos personales dentro del vehículo, salvo que se contrate la cláusula",
      "Participación en carreras o pruebas de velocidad",
    ],
    paraQuien: [
      "Autos y camionetas particulares",
      "Vehículos de trabajo, con la actividad declarada",
      "Casas rodantes y tráilers",
      "Autos de más de 10 años, que suelen quedar afuera de las cotizaciones online",
    ],
    companias: ["federacion-patronal", "san-cristobal", "atm"],
    textoExtendido:
      "Contratar el seguro del auto suele resolverse mirando solo el precio, y ahí es donde aparecen los problemas. Dos pólizas con la misma prima pueden tener franquicias muy distintas, distinto alcance en granizo o límites de responsabilidad civil que no alcanzan ante un reclamo grande. Nosotros comparamos entre varias compañías y te explicamos en qué se diferencian, sin la letra chica. Si tenés un siniestro, hacés la denuncia con nosotros y te acompañamos en la gestión hasta que se resuelva. Atendemos en Morón, Marcos Paz, Mercedes y Luján.",
    origen: "placeholder",
  },
  {
    slug: "motovehiculo",
    segmento: "personas",
    nombre: "Seguro Motovehículo",
    titulo: "Seguro para moto",
    bajada: "Coberturas para tu moto adecuada a las necesidades del asegurado.",
    icono: "bike",
    imagen: "/img/productos/seguro-motovehiculo",
    alt: "Moto estacionada en una calle de barrio",
    introduccion:
      "La moto es el vehículo con más siniestralidad y el que más cuesta asegurar bien. Te armamos una cobertura que se ajuste al uso real que le das, sea para trabajar o para moverte todos los días.",
    cubre: [
      "Responsabilidad civil hacia terceros",
      "Robo total, que es el riesgo principal en moto",
      "Incendio total o parcial",
      "Accidentes personales para el conductor",
      "Casco y accesorios, si se declaran en la póliza",
      "Auxilio y remolque",
    ],
    noCubre: [
      "Robo de accesorios no declarados",
      "Siniestros sin casco reglamentario, según la compañía",
      "Uso en reparto o mensajería si se contrató como uso particular",
      "Conductor sin licencia de la categoría correspondiente",
    ],
    paraQuien: [
      "Motos de uso particular",
      "Quienes trabajan en reparto, declarando la actividad",
      "Ciclomotores y scooters",
      "Cuatriciclos",
    ],
    companias: ["federacion-patronal", "atm"],
    textoExtendido:
      "En moto la diferencia entre una póliza y otra se nota el día del siniestro. Muchas coberturas económicas solo incluyen responsabilidad civil, así que si te roban la moto no cobrás nada. Otras cubren robo total pero exigen requisitos de guardado que conviene conocer antes de firmar. Si usás la moto para trabajar, declararlo es clave: una póliza de uso particular puede rechazar el siniestro si ocurrió durante un reparto. Te explicamos todo esto antes de que contrates, no después.",
    origen: "placeholder",
  },
  {
    slug: "hogar",
    segmento: "personas",
    nombre: "Seguro de Hogar",
    titulo: "Seguro de hogar",
    bajada: "Coberturas para proteger tu hogar y cuidar lo más importante.",
    icono: "house",
    imagen: "/img/productos/seguro-hogar",
    alt: "Frente de una casa de barrio en el conurbano bonaerense",
    introduccion:
      "La mayoría de las pólizas de hogar se contratan con sumas aseguradas que quedaron viejas. Si el monto no acompañó la inflación, ante un siniestro cobrás una fracción de lo que perdiste. Revisamos tu caso y ajustamos la cobertura.",
    cubre: [
      "Incendio del edificio y del contenido",
      "Robo y hurto del contenido",
      "Daños por agua, por ejemplo rotura de caños",
      "Granizo, viento y tormenta",
      "Responsabilidad civil hacia vecinos y terceros",
      "Cristales y artefactos eléctricos",
      "Asistencia con plomero, electricista y cerrajero",
    ],
    noCubre: [
      "Robo en la vía pública de objetos personales, salvo cláusula específica",
      "Daños por falta de mantenimiento o humedad progresiva",
      "Objetos de valor no declarados, como joyas y obras de arte",
      "Bicicletas y equipos electrónicos fuera de la vivienda, salvo extensión",
      "Daños en viviendas deshabitadas por períodos largos",
    ],
    paraQuien: [
      "Casas y departamentos propios",
      "Inquilinos, que necesitan cubrir el contenido y la responsabilidad civil",
      "Propietarios que alquilan, para proteger el edificio",
      "Consorcios, con póliza integral",
    ],
    companias: ["federacion-patronal", "san-cristobal", "atm"],
    textoExtendido:
      "El error más común en el seguro de hogar es la suma asegurada desactualizada. Una póliza tomada hace cinco años con un contenido de valor X hoy cubre bastante menos de lo que costaría reponer esas mismas cosas. El segundo error es asumir que todo está incluido: el robo de objetos personales en la calle, la bicicleta, la notebook fuera de casa y las joyas suelen requerir cláusulas aparte. Revisamos tu póliza actual sin cargo y te decimos qué te falta, aunque después decidas quedarte donde estás.",
    origen: "placeholder",
  },
  {
    slug: "vida",
    segmento: "personas",
    nombre: "Seguro de Vida",
    titulo: "Seguro de vida",
    bajada: "Coberturas para proteger a aquellos que amas en momentos difíciles.",
    icono: "heart-pulse",
    imagen: "/img/productos/seguro-vida",
    alt: "Familia en el living de su casa",
    introduccion:
      "Un seguro de vida no es para vos, es para los que quedan. Sirve para que una familia no tenga que resolver un problema económico en el peor momento posible. Te explicamos las opciones sin vueltas.",
    cubre: [
      "Fallecimiento por cualquier causa",
      "Invalidez total y permanente",
      "Enfermedades graves, según el plan",
      "Doble indemnización por accidente, si se contrata",
      "Adelanto de capital por enfermedad terminal, en algunos planes",
    ],
    noCubre: [
      "Enfermedades preexistentes no declaradas al contratar",
      "Suicidio dentro del período de carencia que fija la póliza",
      "Actividades de riesgo no declaradas",
      "Siniestros durante el período de carencia inicial",
    ],
    paraQuien: [
      "Quien es el principal sostén económico de una familia",
      "Padres y madres con hijos menores",
      "Quien tiene un crédito hipotecario o deudas a largo plazo",
      "Socios de una empresa, para cubrir la participación",
    ],
    companias: ["federacion-patronal", "san-cristobal"],
    textoExtendido:
      "El seguro de vida es el producto que más se posterga y el que menos cuesta cuando se contrata joven. La prima se fija según la edad al momento de tomar la póliza, así que esperar sale caro. Hay dos grandes familias: los seguros temporarios, que cubren un plazo determinado con una prima baja, y los de vida entera, que además acumulan un valor de rescate. Cuál conviene depende de para qué lo querés. Nos sentamos con vos, entendemos tu situación y te mostramos las opciones de las compañías con las que trabajamos.",
    origen: "placeholder",
  },
  {
    slug: "retiro",
    segmento: "personas",
    nombre: "Seguro de Retiro",
    titulo: "Seguro de retiro",
    bajada:
      "Coberturas a la medida para llegar al retiro con tranquilidad y para armar proyectos personales.",
    icono: "piggy-bank",
    imagen: "/img/productos/seguro-retiro",
    alt: "Pareja mayor caminando en un parque",
    introduccion:
      "Un seguro de retiro es un plan de ahorro de largo plazo con respaldo de una compañía de seguros. Sirve para complementar la jubilación o para juntar capital con un objetivo concreto.",
    cubre: [
      "Acumulación de capital con aportes periódicos",
      "Renta vitalicia al momento del retiro",
      "Rescate total o parcial, según las condiciones del plan",
      "Cobertura por fallecimiento durante la etapa de aportes",
      "Posibilidad de suspender aportes sin perder lo acumulado",
    ],
    noCubre: [
      "Rendimiento garantizado por encima de lo que fija la póliza",
      "Rescates dentro del período mínimo de permanencia, sin penalidad",
      "Protección contra la inflación, salvo en planes en moneda extranjera",
    ],
    paraQuien: [
      "Trabajadores independientes sin aportes jubilatorios regulares",
      "Quien quiere complementar la jubilación estatal",
      "Empresas que arman planes de beneficios para su personal",
      "Quien ahorra con un objetivo a diez años o más",
    ],
    companias: ["federacion-patronal", "san-cristobal"],
    textoExtendido:
      "En Argentina el ahorro de largo plazo tiene una dificultad evidente, que es la inflación. Por eso conviene entender bien en qué moneda está expresado el plan, cuál es el rendimiento mínimo garantizado y qué pasa si un año no podés hacer los aportes. Son preguntas que hay que hacer antes de firmar, no después. Te mostramos los números reales de cada opción, incluidos los costos de administración, que es donde suelen estar las diferencias entre una compañía y otra.",
    origen: "placeholder",
  },
  {
    slug: "accidentes-personales",
    segmento: "personas",
    nombre: "Accidentes Personales",
    titulo: "Seguro de accidentes personales",
    bajada:
      "Cobertura ante imprevistos que puedan causar lesiones, invalidez o fallecimiento debido a un accidente.",
    icono: "shield-plus",
    imagen: "/img/productos/accidentes-personales",
    alt: "Persona trabajando en su oficio con equipo de protección",
    introduccion:
      "Esta cobertura protege a una persona ante imprevistos que puedan causar lesiones, invalidez o fallecimiento debido a un accidente. Es una opción clave para trabajadores independientes, deportistas y cualquier persona que quiera contar con respaldo financiero en caso de un evento inesperado.",
    cubre: [
      "Muerte accidental",
      "Invalidez total o parcial permanente por accidente",
      "Asistencia médica y farmacéutica derivada del accidente",
      "Renta diaria por internación, según el plan",
      "Cobertura las 24 horas o solo en horario de actividad, a elección",
    ],
    noCubre: [
      "Enfermedades, porque solo cubre accidentes",
      "Accidentes bajo efecto de alcohol o estupefacientes",
      "Deportes de riesgo no declarados al contratar",
      "Lesiones autoinfligidas",
    ],
    paraQuien: [
      "Trabajadores independientes y profesionales",
      "Deportistas y atletas",
      "Estudiantes y alumnos",
      "Empleados que no posean ART",
    ],
    companias: ["federacion-patronal", "san-cristobal", "atm"],
    textoExtendido:
      "Accidentes personales es la cobertura que más se subestima y la que más rápido se necesita. Un monotributista que se fractura una mano deja de facturar el día que se lastima, sin ningún respaldo. Lo mismo pasa con quien trabaja por su cuenta en un oficio, con los deportistas amateur y con los alumnos de talleres y escuelas deportivas. Es una póliza de costo bajo que cubre justamente el escenario en el que no hay ART ni licencia paga. Consultanos tu caso y te armamos el plan según la actividad y el horario de exposición.",
    origen: "placeholder",
  },
  {
    slug: "asistencia-al-viajero",
    segmento: "personas",
    nombre: "Asistencia al Viajero",
    titulo: "Asistencia al viajero",
    bajada: "Cobertura médica y de equipaje para tus viajes al exterior o dentro del país.",
    icono: "plane",
    imagen: "/img/productos/asistencia-al-viajero",
    alt: "Valija y pasaporte listos para un viaje",
    introduccion:
      "Muchos países la exigen para dejarte entrar, y aun donde no la piden, una urgencia médica en el exterior se paga en moneda extranjera y sin obra social. Es de las coberturas más baratas que existe y de las que más se agradece el día que se usa.",
    cubre: [
      "Asistencia médica por enfermedad o accidente durante el viaje",
      "Medicamentos recetados por el médico de la asistencia",
      "Urgencias odontológicas",
      "Pérdida, robo o demora de equipaje",
      "Demora o cancelación de vuelos, según el plan",
      "Repatriación sanitaria y traslado de familiar",
      "Cobertura para el espacio Schengen, que exige un mínimo asegurado",
    ],
    noCubre: [
      "Enfermedades preexistentes, salvo la urgencia por descompensación según el plan",
      "Embarazo a partir de la semana que fije la póliza",
      "Deportes de riesgo o de nieve sin la cláusula específica contratada",
      "Tratamientos programados con anterioridad al viaje",
      "Siniestros ocurridos antes de la fecha de inicio de la cobertura",
    ],
    paraQuien: [
      "Quien viaja al exterior por turismo o por trabajo",
      "Estudiantes que viajan por intercambio",
      "Quien viaja a Europa, donde la asistencia es obligatoria para entrar",
      "Quien viaja dentro del país y quiere cobertura fuera de su zona de obra social",
    ],
    companias: ["cardinal-assistance"],
    textoExtendido:
      "Es una de las dos coberturas que en PARH se pueden cotizar y emitir enteramente online, en minutos, desde el cotizador de Cardinal Assistance. Antes de contratar conviene mirar el tope de cobertura médica (varios destinos exigen un mínimo, y el espacio Schengen lo pide por escrito), si cubre deportes en caso de que vayas a la nieve, y cómo se activa la asistencia estando allá. El precio importa, pero esos tres puntos son los que definen si la póliza te sirve. Si tenés dudas con el destino o con una condición médica previa, escribinos antes de contratar y lo revisamos juntos.",
    origen: "placeholder",
  },
  {
    slug: "seguro-de-celular",
    segmento: "personas",
    nombre: "Seguro de Celular",
    titulo: "Seguro de celular",
    bajada: "Cobertura para tu celular ante robo y rotura accidental de pantalla.",
    icono: "smartphone",
    imagen: "/img/productos/seguro-de-celular",
    alt: "Celular con la pantalla protegida",
    introduccion:
      "Un celular de gama media hoy cuesta lo que varios meses de una póliza de auto, y es lo que más se rompe y lo que más se roba. La póliza de hogar no lo cubre en la calle, así que si te lo arrebatan quedás sin nada.",
    cubre: [
      "Robo y hurto del equipo",
      "Rotura accidental de pantalla, que es el siniestro más frecuente",
      "Daño por líquidos, según el plan",
      "Reposición del equipo o reparación en taller autorizado",
    ],
    noCubre: [
      "Extravío sin denuncia policial de robo",
      "Desgaste, rayones y daño estético que no afecten el funcionamiento",
      "Equipos comprados en el exterior sin factura, según la compañía",
      "Fallas de fábrica, que corresponden a la garantía del fabricante",
      "Accesorios, salvo que se declaren aparte",
    ],
    paraQuien: [
      "Quien usa el celular para trabajar y no puede quedarse sin él",
      "Quien tiene un equipo de gama media o alta",
      "Quien se mueve mucho en transporte público",
      "Padres y madres que le compran el primer celular a un hijo",
    ],
    companias: ["segurocell"],
    textoExtendido:
      "Junto con la asistencia al viajero, es la otra cobertura que se cotiza y se emite 100 % online desde la web, en el cotizador de SeguroCell. Lo importante a revisar es qué franquicia tiene la rotura de pantalla (en algunos planes cubrís casi todo el arreglo, en otros pagás una parte), si la reposición es por un equipo nuevo o reacondicionado, y qué plazo tenés para hacer la denuncia. Es de las pólizas más baratas del catálogo y de las que más rápido se recupera lo que costó.",
    origen: "placeholder",
  },
];

export const slugsPersonas = productosPersonas.map((p) => p.slug);
