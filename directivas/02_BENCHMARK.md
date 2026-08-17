# 02. Benchmark de referentes

Tres sitios analizados. Uno es el modelo elegido (Worth Insurance). Los otros dos aportan piezas puntuales.
Para cada uno: qué se toma, qué se descarta y por qué.

---

## A. worthinsurance.com — MODELO PRINCIPAL

Broker de seguros de Florida, multi-compañía, mismo modelo de negocio que PARH: no fabrica el seguro, compara y asesora.

### Estructura de página, sección por sección

1. Nav persistente: logo, Personal / Business / Resources / Company, buscador, botón "Get a Quote"
2. Hero: titular + subtítulo + **toggle Personal / Business** que cambia la grilla de productos abajo
3. Coverage Spotlight: 3 tarjetas destacadas de los productos estrella
4. Grilla de productos personales (8 tarjetas con imagen)
5. Grilla de productos comerciales (6 tarjetas)
6. Blog destacado (3 artículos con imagen)
7. Hub de recursos (5 categorías con ícono y descripción)
8. Franja de logos de compañías: "Trusted options from leading carriers"
9. Propuesta de valor + CTA grande: "Save on Insurance Without the Hassle" con la línea de fricción cero "No spam. No obligation. Secure form."
10. Testimonios: 12 reseñas 5 estrellas **con nombre del asesor que atendió**
11. Grilla completa de compañías (24+ logos) con link a "ver todas"
12. Contenido reciente agrupado por tema
13. Descripciones extendidas por producto, con doble CTA "Learn More" + "Find My Rate"
14. Tarjetas de ubicación (2 oficinas)
15. FAQ con 8 preguntas desplegables
16. Footer amplio con navegación por producto, recursos, legales, redes y sello de la Cámara de Comercio

### Qué funciona y por qué (esto es lo que replicamos)

| Patrón | Por qué funciona | Cómo lo aplicamos a PARH |
|---|---|---|
| **Toggle Personal / Empresas en el hero** | Segmenta al visitante en el primer segundo sin obligarlo a leer un menú | Toggle `Personas / Empresas` que intercambia la grilla. Resuelve de una el cuello de botella #3 (el segmento empresas escondido) |
| **Grilla de productos con imagen, cada uno con URL propia** | Cada producto es una landing que rankea sola | 6 páginas de personas + 4 de empresas, cada una con su ruta |
| **Franja de logos de compañías** | Prueba social instantánea, transfiere la confianza de la aseguradora al broker | Federación Patronal, San Cristóbal, ATM, Cardinal, Banco del Sol, SeguroCell. Es el arma de PARH contra los cotizadores online |
| **Testimonios con nombre del asesor** | Personaliza. No es "la empresa fue buena", es "Alex me atendió" | Testimonios con nombre + localidad + producto contratado |
| **Doble CTA por producto: "Learn More" + "Find My Rate"** | Atiende al que investiga y al que ya decidió, sin obligar a elegir | "Ver cobertura" (secundario, ghost) + "Cotizar" (primario, sólido) |
| **Micro-copy que baja la fricción bajo el CTA** | "No spam. No obligation. Secure form." desarma la objeción justo en el momento del clic | "Sin spam. Sin compromiso. Te responde una persona." |
| **FAQ desplegable al final** | Captura long tail y mata objeciones sin agrandar el cuerpo de la página | FAQ por página de producto + FAQ general, con schema `FAQPage` |
| **Tarjetas de ubicación** | Ancla la operación a un lugar físico, señal de confianza y de SEO local | 4 sucursales, cada una con landing propia |
| **Descripciones extendidas por producto abajo de la grilla** | Le da al buscador texto sustancioso sin ensuciar la parte visible | Bloque de texto largo al pie de cada página de producto |
| **Paleta navy + blanco + acento** | Convención de servicios financieros, transmite estabilidad | Coincide con el azul y celeste del logo de PARH |

### Qué se descarta de Worth

| Defecto | Por qué no lo copiamos |
|---|---|
| **Home larguísima (16 secciones)** | Worth es un marketplace con cientos de páginas. PARH necesita una Home de 9 a 10 bloques que se lean en 30 segundos. Longitud sin sustancia es peor que nada |
| **Repetición de las grillas de compañías** | La misma tira de logos aparece dos veces con distinto tamaño. Redundante. Nosotros la mostramos una vez |
| **Cuatro secciones de blog distintas** | Blog destacado + contenido reciente + comparativas + recursos. Fragmentado. Unificamos en una sola sección "Recursos" con 3 piezas y un link al índice |
| **Páginas "alternativa a X"** | Táctica de SEO comparativo agresivo. No aplica al mercado argentino ni al tamaño de PARH |
| **Volumen de datos en el copy de producto** | "averaging $4,419 annually" queda viejo enseguida y en Argentina con inflación es directamente inviable. Nunca poner precios fijos |
| **Densidad tipográfica** | Bloques de texto muy compactos. Vamos a dar más aire |

---

## B. heffins.com (Heffernan Insurance Brokers)

Broker corporativo grande, independiente desde 1988.

### Qué se toma

| Patrón | Aplicación a PARH |
|---|---|
| **"Independiente desde 1988"** como bandera | PARH: "Bróker independiente. Más de 20 años." La independencia es el argumento central de un bróker: no vende una compañía, compara varias |
| **Métricas duras en "Our Story"**: tasa de retención de clientes, monto donado | PARH puede mostrar: años, cantidad de oficinas, cantidad de compañías con las que opera, clientes asegurados. Números concretos, nunca inventados |
| **Segmentación clara en el nav**: Business / Personal / Health / Financial | Confirma la decisión de separar Personas y Empresas desde la navegación |
| **Badges de premios y reconocimientos** | Si PARH tiene matrícula SSN, membresías o certificados de compañías, van visibles. En seguros la credencial vale |
| **Teléfono grande en el header** | Público de 45+ que prefiere llamar antes que llenar un formulario. Va el teléfono clicable en el header, no solo WhatsApp |

### Qué se descarta

- **Home como pila de bloques CTA verticales sin jerarquía.** Cinco mensajes de marca apilados, todos con el mismo peso. El visitante no sabe qué es primero. PARH necesita una jerarquía clara: hero > productos > prueba > acción
- **Tono corporativo distante.** "embracing insurtech and AI with purpose" es lenguaje de holding, no de un bróker de barrio. PARH gana siendo cercano, no corporativo
- **Navegación de varios niveles con menús enormes.** PARH tiene 10 productos, no 200. Un menú simple de 2 niveles alcanza

---

## C. nextinsurance.com (ERGO NEXT)

Insurtech directo al consumidor, 100 % digital, PyMEs de EE.UU. Modelo de negocio distinto (ellos son la compañía), pero la ejecución de conversión es de primer nivel.

### Qué se toma

| Patrón | Aplicación a PARH |
|---|---|
| **Grilla de tipos de seguro dentro del hero, cada uno con su propio CTA** | Entrada directa al producto desde arriba de todo. Elimina un scroll completo |
| **Barra de métricas de confianza**: "750K+ asegurados / 100 % acceso online / 1.300+ rubros / 4,7 de 5" | Franja de 4 métricas verificables de PARH bajo el hero. Formato ideal, contenido honesto |
| **Proceso de 3 pasos con íconos**: "Contanos qué hacés / Elegí el plan / Recibí tu certificado" | **Este es el bloque que más falta hace en PARH.** Hoy nadie entiende cómo se trabaja con un bróker. Traducción: "1. Contanos qué querés asegurar. 2. Comparamos entre las compañías con las que operamos. 3. Te acompañamos en la póliza y en el siniestro." Desarma la objeción "¿para qué un intermediario?" |
| **Buscador por rubro / profesión** | Versión chica y realista: un selector de rubro en el formulario de Empresas (comercio, gastronomía, oficina, construcción, evento, taller) |
| **Micro-copy de expectativa**: "Get a quote and buy in less than 10 minutes" | "Te respondemos el mismo día hábil." Compromiso concreto y cumplible |
| **Badges de terceros** (Trustpilot, Investopedia) | Reseñas de Google Business Profile embebidas. Es la prueba social que sí existe en Argentina |

### Qué se descarta

| Defecto | Por qué |
|---|---|
| **Precios en el hero** ("desde $19/mes") | Con inflación argentina un precio publicado envejece en semanas y genera reclamos. Nunca |
| **Promesa de compra 100 % online sin humano** | Es exactamente lo contrario del diferencial de PARH. PARH gana porque hay una persona. No competir en el terreno del rival |
| **Footer gigante con 50+ links** | SEO de otra escala. PARH necesita un footer de 4 columnas legible |
| **Estética de startup**: ilustraciones planas, mucho color, tono juguetón | No transmite solidez para un producto que se compra por miedo. PARH necesita sobriedad |
| **Logos de integraciones** (QuickBooks, Square) | No aplica |

---

## D. Síntesis: la fórmula PARH

La Home nueva toma el esqueleto de Worth, la sobriedad y el argumento de independencia de Heffernan, y los bloques de conversión de NEXT.

### Orden de bloques de la Home (decidido)

```
01  Header sticky: logo, nav, teléfono clicable, botón "Cotizar"
02  Hero con toggle Personas / Empresas + grilla de productos (patrón NEXT)
03  Franja de 4 métricas de confianza (patrón NEXT, contenido honesto)
04  Cómo trabajamos: 3 pasos (patrón NEXT, el bloque que más falta)
05  Productos en detalle: grilla con imagen, según el toggle (patrón Worth)
06  Compañías con las que operamos: franja de logos (patrón Worth)
07  Por qué un bróker y no un cotizador online: comparación honesta (argumento Heffernan)
08  Prueba social: testimonios con nombre, localidad y producto (patrón Worth)
09  Nuestras 4 oficinas: tarjetas con foto, dirección, horario y "Cómo llegar" (patrón Worth)
10  Lead magnet: Diagnóstico de cobertura en 90 segundos (aporte propio, ver doc 03)
11  FAQ desplegable (patrón Worth)
12  CTA final con micro-copy de fricción cero (patrón Worth)
13  Footer de 4 columnas
```

### Lo que ninguno de los tres tiene y PARH sí va a tener

1. **Captura del dato antes de derivar al cotizador externo.** Los tres mandan al usuario a su propio flujo. PARH deriva a compañías de terceros, así que necesita un paso propio previo. Esto es lo que resuelve el cuello de botella #1.
2. **Landings por sucursal con contenido único.** Worth tiene 2 tarjetas de ubicación sin página. PARH va a tener 4 páginas locales completas.
3. **Diagnóstico de cobertura interactivo** como lead magnet real, no un PDF genérico. Detalle en `03_ESTRATEGIA_ARQUITECTURA_SEO.md`.
