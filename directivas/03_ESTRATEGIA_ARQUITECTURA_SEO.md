# 03. Estrategia, arquitectura de información, copy y SEO

---

## 1. Posicionamiento

**Categoría:** bróker de seguros independiente, multi-compañía, con oficinas físicas en el Oeste y Noroeste del GBA.

**Contra quién compite realmente:**

| Competidor | Su ventaja | Cómo lo gana PARH |
|---|---|---|
| Cotizadores online (123seguro, Mercado Libre Seguros) | Precio, velocidad, sin fricción | Cuando hay siniestro, ahí no hay nadie. PARH tiene 4 oficinas y una persona con nombre |
| Venta directa de la compañía | Marca conocida | La compañía solo te ofrece su producto. PARH compara entre varias |
| Productor individual del barrio | Cercanía | PARH tiene la misma cercanía más estructura, 4 oficinas y acuerdos con más compañías |
| Bancos y tarjetas | Comodidad del débito automático | Cobertura genérica, sin asesoramiento, letra chica |

**Declaración de posicionamiento (uso interno, no va literal en la web):**

> Para familias, comercios y profesionales del Oeste bonaerense que necesitan estar bien cubiertos sin volverse expertos en seguros, PARH es un bróker independiente con más de 20 años y 4 oficinas que compara entre varias compañías y acompaña la póliza de punta a punta, incluido el siniestro. A diferencia de un cotizador online, del otro lado siempre hay una persona.

**Los tres argumentos que sostienen todo el sitio:**

1. **Independencia.** No trabajamos para una compañía, trabajamos para vos. Comparamos entre Federación Patronal, San Cristóbal, ATM y otras.
2. **Presencia física.** Cuatro oficinas: Morón, Marcos Paz, Mercedes y Luján. Podés venir a hablar con alguien.
3. **Acompañamiento en el siniestro.** El momento en que el seguro importa de verdad es el único que ningún cotizador online cubre.

---

## 2. El lead magnet

### 2.1 Por qué el lead magnet es un cotizador propio y no un PDF

Un ebook descargable en seguros tiene tasa de conversión baja y calidad de lead peor: descarga gente que quiere leer, no gente que quiere contratar. Lo que sí funciona en este rubro es **una herramienta que le devuelve al usuario información sobre su propia situación**.

Además resuelve el cuello de botella #1: hoy el 100 % del tráfico de cotización se va afuera sin dejar dato.

### 2.2 Lead magnet principal: "Diagnóstico de cobertura en 90 segundos"

Ruta: `/diagnostico/`
Formato: cuestionario multi-paso, una pregunta por pantalla, barra de progreso, sin login.

**Flujo:**

| Paso | Pregunta | Opciones |
|---|---|---|
| 1 | ¿Qué querés proteger? | Mi auto o moto / Mi casa / Mi comercio o empresa / A mi familia / Mi actividad profesional |
| 2 | (ramifica según el paso 1) ¿Tenés seguro hoy? | Sí, hace años / Sí, lo saqué hace poco / No tengo |
| 3 | ¿Con qué compañía? | Lista + "No me acuerdo" |
| 4 | ¿Cuándo vence tu póliza? | Este mes / En 1 a 3 meses / En más de 3 meses / No sé |
| 5 | ¿Qué es lo que más te preocupa? | Que me aumenten / Que no me cubran cuando lo necesite / No entender qué tengo contratado / Estar pagando de más |
| 6 | Datos de contacto | Nombre, WhatsApp, email, localidad |

**Entregable inmediato en pantalla (no PDF, no espera de mail):**

Un informe con:
- Un resumen de su perfil de riesgo
- **Entre 3 y 5 "puntos ciegos" detectados** según sus respuestas. Ejemplos reales por rama:
  - Auto: "Marcaste que no sabés si tenés cobertura de granizo. En Buenos Aires es la causa número uno de daño parcial en verano."
  - Comercio: "Un Integral de Comercio sin cláusula de Responsabilidad Civil hacia terceros te deja expuesto si un cliente se lastima adentro del local."
  - Hogar: "El robo en la vía pública de objetos personales suele quedar afuera de la póliza básica de hogar."
  - Profesional: "Si firmás proyectos o informes, la RC Profesional te protege de un reclamo por error u omisión. Muchos colegios ya la exigen."
- Un CTA: "Un asesor de PARH revisa tu diagnóstico y te contesta hoy" con botón de WhatsApp prellenado con el resumen

**Lo que gana PARH:**
- El dato completo del prospecto, calificado, con rama y con **fecha de vencimiento de póliza** (el dato más valioso que existe en este negocio: permite volver a llamar justo antes del vencimiento)
- Un motivo concreto para iniciar la conversación, no un "hola quiero info"
- Base de datos propia para renovaciones y cross-selling

**Lo que gana el usuario:** claridad sobre qué tiene y qué le falta, en 90 segundos, gratis y sin que le vendan nada todavía.

### 2.3 Captura previa al cotizador externo (secundario pero crítico)

Los seis links a cotizadores externos dejan de ser links directos. Cada uno abre un modal de un solo paso:

```
Antes de llevarte al cotizador de [Federación Patronal]
Dejanos tu nombre y WhatsApp. Si el cotizador se te complica
o querés que comparemos con otra compañía, te escribimos nosotros.

[Nombre] [WhatsApp]
[ Continuar al cotizador ]   ·   Preferís que cotice yo por vos? Escribinos
```

Con un checkbox de "No hace falta, llevame directo" para no bloquear a quien no quiere dar el dato. Se estima recuperación del 30 al 50 % de los datos que hoy se pierden por completo.

### 2.4 Lead magnets de apoyo (fase 2, cuando exista blog)

- **Personas:** "Cómo leer tu póliza de auto: las 7 cosas que casi nadie mira antes de firmar" (PDF)
- **Empresas:** "Checklist de coberturas para tu comercio: las 12 que deberías tener y las 4 que casi nadie contrata" (PDF)
- **Profesionales:** "RC Profesional: quién la necesita y qué pasa si no la tenés" (PDF)

---

## 3. Arquitectura de información

### 3.1 Mapa del sitio nuevo

```
/                                       Home
│
├── /seguros/                           Hub Personas
│   ├── /seguros/automotor/
│   ├── /seguros/motovehiculo/
│   ├── /seguros/hogar/
│   ├── /seguros/vida/
│   ├── /seguros/retiro/
│   └── /seguros/accidentes-personales/
│
├── /empresas/                          Hub Empresas
│   ├── /empresas/responsabilidad-civil/
│   ├── /empresas/integral-de-comercio/
│   ├── /empresas/seguro-tecnico/
│   └── /empresas/accidentes-personales/
│
├── /cotizar/                           Hub de cotización (propio + 6 externos explicados)
├── /diagnostico/                       Lead magnet
│
├── /nosotros/                          Quiénes somos, equipo, trayectoria
│
├── /oficinas/                          Índice de sucursales
│   ├── /oficinas/moron/
│   ├── /oficinas/marcos-paz/
│   ├── /oficinas/mercedes/
│   └── /oficinas/lujan/
│
├── /contacto/
├── /gracias/                           Página de conversión (noindex)
│
├── /recursos/                          Blog (fase 2)
│   └── /recursos/[slug]/
│
├── /politica-de-privacidad/
└── /terminos-y-condiciones/
```

**Total fase 1: 22 páginas indexables** (contra 4 actuales, de las cuales 3 son duplicados).

### 3.2 Navegación

**Header (desktop):**
```
[Logo PARH]   Personas ▾   Empresas ▾   Cotizar   Oficinas   Nosotros      11 2240 5022   [Cotizar ahora]
```

- `Personas ▾` despliega mega-menú de 2 columnas: los 6 productos con ícono y bajada de una línea, más un panel lateral "¿No sabés qué necesitás? Hacé el diagnóstico"
- `Empresas ▾` igual con los 4 productos
- Teléfono clicable (`tel:+541122405022`), visible en desktop, en el menú en mobile
- Botón primario `Cotizar ahora` que va a `/cotizar/`
- Header sticky con reducción de altura al hacer scroll

**Mobile:**
- Logo + botón de menú
- Menú full screen con acordeones para Personas y Empresas
- **Barra fija inferior** con dos acciones: `Llamar` y `WhatsApp`. Es el patrón de mayor conversión en mobile para este rubro

**Footer, 4 columnas:**
1. Logo, una línea de descripción, matrícula SSN si corresponde, redes
2. Seguros para personas (6 links)
3. Seguros para empresas (4 links)
4. Oficinas (4 links) + Contacto + Legales

---

## 4. Estrategia de copy

### 4.1 Regla base

**El copy que ya existe en parh.com.ar se usa literal.** No se reescribe, no se "mejora", no se reemplaza por copy de IA. Ese texto ya rankea y ya suena a Roberto.

Correcciones permitidas, y solo estas:

1. **Tildes y ortografía:** "Cotiza rapido, facil" → "Cotizá rápido y fácil". "Lujan" → "Luján". "Marcos paz" → "Marcos Paz". "Azuenaga" → "Azcuénaga" (está mal escrito en la Home y bien en el footer).
2. **Sacar el Title Case forzado.** "Coberturas Para Tu Auto, Camioneta, Casa Rodante, Tráiler Y Más." → "Coberturas para tu auto, camioneta, casa rodante, tráiler y más."
3. **Eliminar el texto de plantilla:** "Añade el lema de tu negocio haciendo doble clic", "+34 917 81 68 62", "info@site.info".
4. **Actualizar el año** del footer.

Texto nuevo se escribe **solo donde hoy no existe nada** (páginas de producto, sucursales, FAQ, bloque "Cómo trabajamos"), en el mismo registro: rioplatense, voseo, directo, sin adornos.

### 4.2 Copy verbatim rescatado del sitio actual

| Bloque | Texto exacto a conservar |
|---|---|
| Marca | Grupo PARH Bróker de Seguros |
| Titular hero | Atención Diferencial, Resultados Sorprendentes |
| Subtítulo hero | Queremos que recibas la atención que mereces |
| CTA | Contactanos |
| Sobre nosotros | Con más de 20 años de trayectoria en el rubro, nuestra empresa se destaca por brindar soluciones confiables y eficientes a cada cliente. Nos enfocamos en la calidad del servicio y la seguridad, ofreciendo coberturas adaptadas a cada necesidad. Nuestra experiencia y compromiso nos convierten en la mejor elección para proteger lo que más valoras. |
| Atención diferente | Brindamos una atención única, enfocada en el detalle y en las necesidades reales de nuestros clientes. Nuestro compromiso con la excelencia y la innovación nos permite generar resultados que superan expectativas, construyendo confianza con nuestros asegurados y asesores. |
| Compromiso y Seguridad | Nuestro compromiso es tu tranquilidad. Trabajamos con responsabilidad y dedicación para brindarte la seguridad que necesitas, ayudándote a proteger lo que más amas, con soluciones confiables y a tu medida |
| Automotor | Coberturas para tu auto, camioneta, casa rodante, tráiler y más. |
| Motovehículo | Coberturas para tu moto adecuada a las necesidades del asegurado. |
| Hogar | Coberturas para proteger tu hogar y cuidar lo más importante. |
| Vida | Coberturas para proteger a aquellos que amas en momentos difíciles. |
| Retiro | Coberturas a la medida para llegar al retiro con tranquilidad y para armar proyectos personales. |
| Y más | Estamos disponibles para cotizar todo lo que necesites. Contactanos y acomodamos el seguro a tu medida. |
| Responsabilidad Civil | Es una cobertura que protege a individuos y empresas ante posibles reclamaciones por daños a terceros. Es fundamental para garantizar seguridad financiera y cumplir con obligaciones legales. Tipos de RC: RC Profesional, RC Construcción y Montaje, RC Demolición, RC Eventos, RC Maquinarias, entre otras. |
| Integral de Comercio | Es una cobertura diseñada para proteger negocios, oficinas y locales comerciales ante diversos riesgos que pueden afectar su actividad. Su objetivo es garantizar la continuidad del negocio y minimizar pérdidas económicas en caso de siniestros. Pueden contratarlo: locales comerciales, oficinas y estudios profesionales, restaurantes y bares, hoteles y alojamientos. |
| Seguro Técnico | Esta cobertura está diseñada para proteger equipos electrónicos, maquinaria, herramientas y obras de construcción ante daños accidentales, imprevistos o fallas operativas. Es una cobertura clave para empresas y profesionales que dependen de tecnología y equipos especializados. Tipos de seguro técnico: Equipos Electrónicos, Rotura de Maquinarias, Contratista, Riesgo de Construcción y Montaje. |
| Accidentes Personales | Esta cobertura protege a una persona ante imprevistos que puedan causar lesiones, invalidez o fallecimiento debido a un accidente. Es una opción clave para trabajadores independientes, deportistas y cualquier persona que quiera contar con respaldo financiero en caso de un evento inesperado. Pueden contratarlo: trabajadores independientes y profesionales, deportistas y atletas, estudiantes y alumnos, empleados que no posean ART. |

### 4.3 Copy nuevo aprobado (bloques que hoy no existen)

**Bloque "Cómo trabajamos" (3 pasos):**

```
1. Contanos qué necesitás
   Por WhatsApp, por teléfono o desde el formulario. En dos minutos
   sabemos qué querés proteger.

2. Comparamos entre las compañías
   Trabajamos con Federación Patronal, San Cristóbal, ATM y otras.
   Te llevamos las opciones que tienen sentido para tu caso.

3. Te acompañamos siempre
   Desde que firmás la póliza hasta el día que tengas un siniestro.
   Del otro lado siempre hay una persona.
```

**Bloque "Por qué un bróker":**

```
Titular:  Un cotizador online te da un precio. Nosotros te damos un asesor.
Bajada:   Comparar precios lo hace cualquiera. Lo difícil es saber qué te
          conviene y que haya alguien atendiéndote el día que pase algo.

- Comparamos entre varias compañías, no vendemos una sola.
- Cuatro oficinas donde podés venir a hablar con alguien.
- Te acompañamos en la gestión del siniestro, que es cuando el seguro
  realmente importa.
- Más de 20 años haciendo esto en el Oeste bonaerense.
```

**Micro-copy de fricción bajo los CTA:**
```
Sin spam. Sin compromiso. Te responde una persona el mismo día hábil.
```

**Franja de métricas (llenar con datos reales confirmados por Roberto):**
```
+20 años   ·   4 oficinas   ·   6 compañías y plataformas   ·   [N] clientes asegurados
```

### 4.4 Prohibiciones de copy (ver también doc 04, sección 8)

- Sin guion largo. Ni `—` ni `–` ni `--`. Usar punto, coma, dos puntos o paréntesis
- Sin cursivas decorativas. La cursiva solo se admite en el nombre propio de una ley o publicación
- Sin emojis en el copy de la página
- Sin etiquetas tipo "✨ Nuevo", "🚀 Potenciado por IA", ni pills decorativas sobre el titular
- Sin las frases: "En el mundo de hoy", "Elevá tu", "Desbloqueá", "No es solo X, es Y", "Descubrí el poder de", "Transformá tu", "La solución definitiva", "Confianza que perdura"
- Sin superlativos vacíos: "la mejor", "líder del mercado", "número uno", salvo que haya un dato que lo respalde
- Sin precios ni porcentajes de descuento fijos
- Voseo consistente en toda la web. Nunca "tú" ni "usted"

---

## 5. SEO

### 5.1 Redirecciones 301 obligatorias

Se aplican el mismo día del deploy. Sin esto se pierde el posicionamiento actual.

| Origen (actual) | Destino (nuevo) |
|---|---|
| `/Inicio/` | `/` |
| `/Inicio` | `/` |
| `/Sobre-nosotros/` | `/nosotros/` |
| `/Cotizador-ON-LINE/` | `/cotizar/` |
| `/Oficinas/` | `/oficinas/` |
| `http://` cualquier ruta | `https://` misma ruta |
| `parh.com.ar/*` | `www.parh.com.ar/*` (elegir una sola versión y ser consistente) |

Además: 404 personalizada con buscador y links a los productos principales.

### 5.2 Metadatos por página

Formato: `título hasta 60 caracteres` · `description hasta 155`.

| Ruta | Title | Description |
|---|---|---|
| `/` | Bróker de Seguros en Morón, Luján y Mercedes \| PARH | Bróker independiente con más de 20 años. Comparamos entre varias compañías y te acompañamos también en el siniestro. 4 oficinas en el Oeste. |
| `/seguros/automotor/` | Seguro Automotor en Morón y Zona Oeste \| PARH Seguros | Coberturas para tu auto, camioneta, casa rodante y tráiler. Comparamos entre varias compañías y te asesoramos sin cargo. Cotizá hoy. |
| `/seguros/motovehiculo/` | Seguro para Moto en Zona Oeste \| PARH Seguros | Coberturas para tu moto adaptadas a lo que realmente necesitás. Responsabilidad civil, robo e incendio, todo riesgo. Cotizá en minutos. |
| `/seguros/hogar/` | Seguro de Hogar en Morón y Zona Oeste \| PARH Seguros | Protegé tu casa contra incendio, robo, daños por agua y granizo. Te ayudamos a elegir la suma asegurada correcta. |
| `/seguros/vida/` | Seguro de Vida \| PARH Bróker de Seguros | Coberturas para proteger a los tuyos en momentos difíciles. Te explicamos las opciones sin vueltas y sin letra chica. |
| `/seguros/retiro/` | Seguro de Retiro \| PARH Bróker de Seguros | Armá tu retiro con tranquilidad. Coberturas a medida para proyectos personales y ahorro de largo plazo. |
| `/seguros/accidentes-personales/` | Seguro de Accidentes Personales \| PARH Seguros | Cobertura para independientes, deportistas, alumnos y empleados sin ART. Consultá tu caso con un asesor. |
| `/empresas/` | Seguros para Empresas y Comercios \| PARH Seguros | Responsabilidad civil, integral de comercio, seguro técnico y accidentes personales. Asesoramiento para PyMEs del Oeste bonaerense. |
| `/empresas/responsabilidad-civil/` | Seguro de Responsabilidad Civil \| PARH Seguros | RC Profesional, Construcción y Montaje, Demolición, Eventos y Maquinarias. Protegé tu actividad ante reclamos de terceros. |
| `/empresas/integral-de-comercio/` | Integral de Comercio \| Seguro para tu Local \| PARH | Cobertura para locales, oficinas, restaurantes y hoteles. Continuidad del negocio ante incendio, robo y daños. |
| `/empresas/seguro-tecnico/` | Seguro Técnico para Equipos y Obras \| PARH Seguros | Equipos electrónicos, rotura de maquinarias, contratista y riesgo de construcción y montaje. Cotizá con un asesor. |
| `/cotizar/` | Cotizá tu Seguro Online \| PARH Bróker de Seguros | Cotizadores de Federación Patronal, San Cristóbal, ATM y más. Si preferís, cotizamos nosotros por vos y comparamos. |
| `/diagnostico/` | Diagnóstico de Cobertura en 90 Segundos \| PARH Seguros | Respondé 6 preguntas y te decimos qué riesgos podrían estar sin cubrir. Gratis, sin compromiso y sin dar datos de tarjeta. |
| `/oficinas/moron/` | Bróker de Seguros en Morón \| PARH | Oficina en Av. Gral. Miguel de Azcuénaga 705, Morón. Asesoramiento en seguros de auto, hogar, vida y comercio. |
| `/oficinas/marcos-paz/` | Bróker de Seguros en Marcos Paz \| PARH | Oficina en Melgar 2035, Marcos Paz. Te asesoramos en persona sobre la cobertura que necesitás. |
| `/oficinas/mercedes/` | Bróker de Seguros en Mercedes \| PARH | Oficina en Calle 18 nro. 409, Mercedes. Seguros para personas, comercios y profesionales. |
| `/oficinas/lujan/` | Bróker de Seguros en Luján \| PARH | Oficina en Lavalle 416, Luján. Asesoramiento personal en seguros para tu familia o tu negocio. |
| `/nosotros/` | Quiénes Somos \| PARH Bróker de Seguros | Más de 20 años asesorando en el Oeste bonaerense. Bróker independiente con 4 oficinas y acuerdos con varias compañías. |
| `/contacto/` | Contacto \| PARH Bróker de Seguros | Escribinos por WhatsApp al 11 2240 5022 o dejanos tu consulta. Te respondemos el mismo día hábil. |

### 5.3 Keywords objetivo

**Transaccionales locales (prioridad máxima, baja competencia, alta intención):**
- broker de seguros Morón / Marcos Paz / Mercedes / Luján
- productor de seguros Morón / zona oeste
- seguro de auto Morón, seguro de moto zona oeste
- seguro de comercio Morón, integral de comercio Luján
- responsabilidad civil profesional Buenos Aires

**Transaccionales de producto:**
- cotizar seguro automotor, seguro motovehículo, seguro de hogar
- seguro técnico equipos electrónicos, RC construcción y montaje, RC eventos
- accidentes personales sin ART

**Informacionales (fase 2, para blog):**
- qué cubre el seguro contra todo riesgo
- diferencia entre responsabilidad civil y todo riesgo
- qué es la franquicia en un seguro
- qué necesito para asegurar un comercio
- cómo se hace la denuncia de un siniestro
- qué es un bróker de seguros y en qué se diferencia de la compañía

### 5.4 Schema.org (JSON-LD)

Todo se implementa como JSON-LD en `<head>`. Nada de microdata inline.

| Tipo | Dónde | Contenido |
|---|---|---|
| `InsuranceAgency` (subtipo de `LocalBusiness` y `FinancialService`) | Home + cada `/oficinas/[slug]/` | name, image, url, telephone, email, address (PostalAddress completo), geo, openingHoursSpecification, areaServed, priceRange, sameAs con Instagram, Facebook y LinkedIn |
| `Organization` | Home | Entidad matriz Grupo PARH, con `department` apuntando a las 4 sucursales |
| `WebSite` + `SearchAction` | Home | Sitelinks searchbox |
| `Service` | Cada página de producto | serviceType, provider (referencia a la Organization), areaServed, hasOfferCatalog con los tipos de cobertura |
| `FAQPage` | Cada producto con FAQ + `/contacto/` | Preguntas y respuestas reales |
| `BreadcrumbList` | Todas menos Home | Ruta de navegación |

Las 4 fichas de `InsuranceAgency` deben coincidir **exactamente** (nombre, dirección, teléfono) con las fichas de Google Business Profile. Cualquier diferencia en el formato de la dirección debilita la señal local. Verificar con Roberto antes de publicar.

### 5.5 Local SEO fuera del sitio (tarea para Roberto, fuera del alcance de programación)

- Reclamar y completar las 4 fichas de Google Business Profile, una por sucursal
- Categoría primaria: "Agencia de seguros". Secundarias: "Compañía de seguros de automóviles", "Agente de seguros"
- Fotos reales de cada oficina, horarios, servicios, área de cobertura
- Pedir reseñas sistemáticamente al cerrar cada póliza. Un link corto de reseña por WhatsApp
- Publicar en cada ficha una vez por mes
- NAP idéntico en web, GBP, Instagram, Facebook y LinkedIn

### 5.6 Checklist técnico de SEO en el build

- [ ] `<html lang="es-AR">`
- [ ] Un solo `<h1>` por página
- [ ] Jerarquía h1 > h2 > h3 sin saltos
- [ ] `alt` descriptivo en las 100 % de las imágenes
- [ ] `canonical` autorreferencial en cada página
- [ ] Open Graph completo con `og:image` de 1200x630 propia por sección
- [ ] `twitter:card = summary_large_image`
- [ ] `sitemap.xml` generado en build, enviado a Search Console el día del deploy
- [ ] `robots.txt` con `Sitemap:` (hoy da 404)
- [ ] Todas las imágenes en WebP con `srcset` y `sizes`
- [ ] `loading="lazy"` en todo menos la imagen del hero, que va con `priority`
- [ ] `width` y `height` explícitos en todas las imágenes (evita CLS)
- [ ] Fuentes autohospedadas con `next/font` y `font-display: swap`
- [ ] LCP menor a 2,5 s en 4G simulado
- [ ] CLS menor a 0,1
- [ ] Peso total de la Home menor a 500 KB
- [ ] `/gracias/` con `noindex`

### 5.7 Medición

| Evento | Se dispara cuando |
|---|---|
| `lead_form_submit` | Se envía cualquier formulario (con parámetro `form_id`) |
| `whatsapp_click` | Clic en cualquier botón de WhatsApp (con `location`) |
| `phone_click` | Clic en el teléfono |
| `cotizador_externo_click` | Clic en un cotizador de tercero (con `compania`) |
| `diagnostico_start` | Se responde la primera pregunta |
| `diagnostico_complete` | Se envían los datos de contacto |
| `office_directions_click` | Clic en "Cómo llegar" (con `sucursal`) |

Herramientas: GA4 + Meta Pixel, cargados con `next/script` en `afterInteractive` para no penalizar el LCP. Banner de consentimiento simple (Ley 25.326 de Protección de Datos Personales) con opción de rechazar.
