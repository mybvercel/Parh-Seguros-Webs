# 01. Auditoría de parh.com.ar

Fecha del relevamiento: 4 de agosto de 2026
Auditor: infraestructura web + consultoría de negocio
Alcance: sitio público completo (4 URLs), stack técnico, SEO on-page, UX, copy y modelo de captación.

---

## 1. Qué es PARH (datos verificados en el sitio)

| Dato | Valor |
|---|---|
| Nombre comercial | Grupo PARH Bróker de Seguros |
| Titular | Roberto Corvalán (confirmado en el link de San Cristóbal: `sancristobal.com.ar/pas/roberto-corvalan`) |
| Trayectoria declarada | Más de 20 años |
| Email | info@parh.com.ar |
| Teléfono / WhatsApp | 11 2240 5022 (`wa.me/message/HQLGWMR2P4FDD1`) |
| Casa central | Av. Gral. Miguel de Azcuénaga 705, Morón, Buenos Aires |
| Sucursales | Marcos Paz (Melgar 2035), Mercedes (Calle 18 nro. 409), Luján (Lavalle 416) |
| Redes | Instagram `@seguros_para_vos`, Facebook, LinkedIn `/in/parh` |
| Promesa de marca | "Atención Diferencial, Resultados Sorprendentes" |

### Compañías y plataformas con las que opera (extraídas de los links de cotización)

1. **Federación Patronal** (`online.fedpat.com.ar`) con código de productor 21278
2. **ATM Seguros** (`ecommerce.atmseguros.com.ar`) con sale-center propio
3. **San Cristóbal** (`sancristobal.com.ar/pas/roberto-corvalan`)
4. **Banco del Sol** (apertura de cuenta, `open.bancodelsol.com`)
5. **Cardinal Assistance** (`cardinalassistance.com/ref/parhseguros`)
6. **SeguroCell** (seguro de celular, con PID de afiliado)

Esto es un activo importante y hoy está desperdiciado: son seis acuerdos comerciales presentados como seis cajitas idénticas con el mismo texto genérico ("Cotiza rapido, facil y sin problemas!") y sin explicar qué es cada una.

### Catálogo real de productos

**Visible en la Home (personas):**
- Seguro Automotor
- Seguro Motovehículo
- Seguro de Hogar
- Seguro de Vida
- Seguro de Retiro

**Escondido en `/Sobre-nosotros/` (empresas y profesionales, ticket alto):**
- Responsabilidad Civil (Profesional, Construcción y Montaje, Demolición, Eventos, Maquinarias)
- Integral de Comercio (locales, oficinas y estudios profesionales, restaurantes y bares, hoteles)
- Seguro Técnico (Equipos Electrónicos, Rotura de Maquinarias, Contratista, Riesgo de Construcción y Montaje)
- Accidentes Personales (independientes, deportistas, alumnos, empleados sin ART)

**Diagnóstico:** el negocio de mayor margen y menor rotación está en la página que menos tráfico recibe, mezclado con texto de plantilla sin editar. Esto solo ya justifica el rediseño.

---

## 2. Auditoría técnica

### 2.1 Stack actual

| Componente | Detectado |
|---|---|
| Servidor / panel | CloudPanel (Nginx) |
| Lenguaje | PHP (site builder tipo WYSIWYG, no un CMS estándar) |
| Frontend | Bootstrap 3/4 + jQuery 3.5.1 + Font Awesome 4.7 + flag-icon-css |
| CSS | `bootstrap.min.css`, `site.css`, `common.css`, `3.css` (nombres autogenerados por el builder) |
| Build | Ninguno. CSS y JS servidos crudos con querystring de versión (`?ts=1784053316`) |

Las hojas `common.css` y `3.css` con timestamp y los nombres de imagen tipo `48b4399f7ef013449de8dfeced84d539_600x624.53531598513_140.75942644716x-0_889.00690387679x624.53531598513.png` confirman un **constructor visual drag-and-drop**. No hay plantillas ni componentes reutilizables: cada página es HTML absoluto e independiente. Por eso tres de las cuatro páginas terminaron siendo copias.

**Consecuencia práctica:** no se puede "arreglar" este sitio editando. Cualquier cambio estructural obliga a rehacerlo. Reescribir desde cero es más barato que parchear.

### 2.2 Rendimiento

| Métrica | Valor medido |
|---|---|
| Peso total de imágenes | **1.931 KB (1,9 MB)** en 17 imágenes |
| Imagen más pesada | 316 KB (PNG) |
| Formatos usados | JPEG y PNG. **Cero WebP, cero AVIF** |
| `srcset` / `sizes` | No implementado |
| `loading="lazy"` | No implementado |
| Requests | 62 |
| DOMContentLoaded (cacheado) | 213 ms |

1,9 MB de imágenes sin optimizar en un sitio brochure es un problema serio de Core Web Vitals en 4G, que es como navega la mayor parte del público de Morón, Marcos Paz, Mercedes y Luján. Convertir a WebP con `srcset` recorta esto a menos de 300 KB sin perder calidad percibida.

### 2.3 SEO on-page: el diagnóstico honesto

El sitio posiciona por marca y por Google Business Profile, no por SEO on-page. El on-page está, medido, muy por debajo del mínimo.

| Chequeo | Estado | Detalle |
|---|---|---|
| `<title>` | **Crítico** | Es literalmente `Inicio`. Sin marca, sin keyword, sin localidad. Las otras: `Sobre nosotros`, `Cotizador ON LINE`, `Oficinas` |
| `meta description` | **Crítico** | Vacía (`""`) en todas las páginas |
| `og:image` | **Crítico** | Vacío. Al compartir por WhatsApp no aparece imagen |
| `og:description` | **Crítico** | Vacío |
| `<link rel="canonical">` | **Ausente** | Sin canonical, con contenido duplicado x3 |
| Jerarquía de encabezados | **Rota** | 4 `<h1>` en la Home. Un `<h1>` envuelve un párrafo entero de 40 palabras. `<h3>TIPOS DE SEGUROS</h3>` aparece por encima de los `<h2>` de cada producto |
| `alt` en imágenes | **Crítico** | **17 de 17 imágenes sin atributo alt.** Cero accesibilidad, cero SEO de imágenes |
| JSON-LD / Schema.org | **Ausente** | 0 bloques. Sin `InsuranceAgency`, sin `LocalBusiness`, sin `FAQPage` |
| `robots.txt` | **Ausente** | Devuelve 404 |
| `sitemap.xml` | Presente | 864 bytes, solo las 4 URLs |
| `lang` | Incorrecto | `es-es` (España). Debe ser `es-AR` |
| Contenido duplicado | **Crítico** | `/Inicio/`, `/Cotizador-ON-LINE/` y `/Oficinas/` tienen el mismo contenido palabra por palabra |
| URLs | Malas | Mayúsculas y guiones raros: `/Cotizador-ON-LINE/`, `/Sobre-nosotros/` |
| Blog / contenido | Ausente | Cero páginas de contenido. Cero captura de long tail |
| Páginas por localidad | Ausentes | 4 sucursales reales y ninguna landing local |

**Traducción a negocio:** PARH tiene autoridad local ganada por años de operación offline y por el perfil de Google, no por la web. La web hoy no aporta, resta. Corregir esto es la fruta más baja que existe: hay ranking que se está dejando sobre la mesa.

### 2.4 Errores de contenido en producción

Estos están online ahora mismo, en `/Sobre-nosotros/`:

1. `Añade el lema de tu negocio haciendo doble clic` (instrucción del editor visual, publicada)
2. `+34 917 81 68 62` (prefijo +34 = España. No es un teléfono de PARH)
3. `info@site.info` (mail de la plantilla)
4. Un bloque "Suscribirse" que no está conectado a ninguna lista

Un prospecto que llega a esa página y ve un teléfono español pierde la confianza al instante. En seguros la confianza es el producto.

### 2.5 Otros hallazgos

- Footer dice `© 2025` (desactualizado)
- Formulario de contacto con campo "¿Cómo nos encontraste?" con opciones sin capitalizar: `Encontrado en Google`, `Enlace seguido desde otro sitio web`, `amigo me dijo`
- No hay página de gracias tras el envío del formulario, por lo tanto **no hay forma de medir conversiones**
- No se detectó Google Analytics ni Meta Pixel. Cero medición
- El logo carga como imagen sin alt, con nombre de archivo hash

---

## 3. Auditoría de UX y diseño

### 3.1 Estructura de la Home actual

```
Logo grande + "Grupo PARH Bróker de Seguros"
Hero: "Atención Diferencial, Resultados Sorprendentes"
      "Queremos que recibas la atención que mereces" + botón Contactanos (WhatsApp)
Sobre nosotros (párrafo de 60 palabras)
COTIZADORES ON LINE (6 tarjetas con el MISMO texto genérico)
TIPOS DE SEGUROS (6 tarjetas de producto)
CONTACTOS (dirección + form)
4 sucursales con "Como llegar"
Footer
```

### 3.2 Problemas de experiencia

| # | Problema | Impacto |
|---|---|---|
| 1 | **Seis tarjetas idénticas sin identificar la compañía.** El usuario no sabe si está por cotizar auto, moto, celular o abrir una cuenta bancaria | Parálisis por decisión, clics al azar, abandono |
| 2 | **Los seis links salen del sitio a un tercero.** El usuario se va a fedpat, ATM o San Cristóbal y PARH no se entera de nada | Fuga total del lead. Si abandona a mitad, PARH nunca lo sabe. Cero recuperación, cero remarketing |
| 3 | **Un único formulario genérico** al final de la Home | Sin segmentación por producto. El asesor recibe "hola quiero info" y arranca de cero |
| 4 | **Único CTA visible es WhatsApp**, sin contexto previo | Conversaciones frías. Alto costo de atención por lead |
| 5 | **Cero prueba social.** Sin testimonios, sin logos de compañías, sin números, sin caras del equipo | "Atención diferencial" es una afirmación sin evidencia. Nadie la cree |
| 6 | **Título en Title Case forzado** en todo el copy: "Coberturas Para Tu Auto, Camioneta, Casa Rodante, Tráiler Y Más." | En español el Title Case es un error tipográfico. Se lee amateur |
| 7 | **Faltan tildes** en textos clave: "Cotiza rapido, facil y sin problemas!", "Abri tu cuenta", "Lujan", "Marcos paz" | Erosiona la percepción de profesionalismo |
| 8 | **Sin jerarquía visual.** Todo compite: el logo es enorme, el h1 y el párrafo tienen peso similar | El ojo no sabe dónde ir. No hay una acción obvia |
| 9 | **Segmento empresas invisible.** RC, Integral de Comercio y Seguro Técnico no existen en la Home ni en el menú | Se pierde el producto de mayor ticket y mayor retención |
| 10 | **Sin páginas de producto.** Cada seguro es una tarjeta con una línea, sin destino | Sin URL propia no hay ranking por "seguro de hogar Morón" ni nada parecido |
| 11 | **Sin páginas de sucursal.** Cuatro localidades con demanda local desatendida | Se regala el SEO local a la competencia |
| 12 | **Sin página de gracias ni tracking** | Imposible saber cuántos leads genera la web, ni cuánto vale |

---

## 4. Análisis de consultoría: los cuellos de botella de PARH

Esto ya no es sobre la web. Es sobre el negocio que la web debería alimentar.

### Cuello de botella #1: el sitio no captura, deriva

Seis de los siete CTA de la Home mandan al usuario fuera del dominio (cinco cotizadores externos y WhatsApp). PARH construyó una **página de enlaces**, no un embudo. El dato del prospecto queda en el sistema de la compañía aseguradora, no en el de PARH.

**Costo estimado:** de cada 100 visitas que hacen clic en un cotizador externo, la industria reporta 15 a 25 % de finalización. Los otros 75 a 85 abandonan a mitad del formulario y PARH no tiene ni el nombre ni el teléfono para recuperarlos.

**Solución:** capturar el dato **antes** de derivar. Un paso propio de PARH que pida nombre, WhatsApp y qué quiere asegurar, y recién ahí abra el cotizador de la compañía. El lead queda en casa aunque el usuario abandone después.

### Cuello de botella #2: la propuesta de valor no está demostrada

"Atención Diferencial, Resultados Sorprendentes" y "más de 20 años de trayectoria" son afirmaciones. Ningún prospecto compra afirmaciones en un mercado donde todos dicen lo mismo.

Lo que PARH sí tiene y no está mostrando:
- 4 oficinas físicas (algo que Mercado Libre Seguros o un cotizador online no tienen)
- Acuerdos con Federación Patronal, San Cristóbal, ATM, Cardinal (multi-compañía = comparación real, no una sola oferta)
- Un asesor con nombre y apellido detrás (Roberto Corvalán, matriculado, con perfil público en San Cristóbal)
- Más de 20 años de siniestros gestionados

**Solución:** convertir cada afirmación en evidencia visible. Fotos reales de las oficinas, logos de las compañías, un contador de años, testimonios con nombre y localidad, y sobre todo el argumento que gana en Argentina: **"cuando tengas un siniestro, te atiende una persona, no un chatbot"**.

### Cuello de botella #3: el segmento rentable está escondido

Un seguro de auto deja una comisión chica, se renueva con presión de precio y el cliente compara todos los años. Un Integral de Comercio, una RC Profesional o un Seguro Técnico de una constructora dejan comisiones varias veces mayores, se renuevan por inercia y el cliente rara vez compara.

Hoy: **cero presencia en la Home, cero en el menú, cero páginas propias.** Vive en un acordeón dentro de la página con texto de plantilla.

**Solución:** un eje "Empresas" de primer nivel en la navegación, con página propia por cobertura y un formulario distinto (más largo, más calificador) al de personas.

### Cuello de botella #4: cuatro sucursales sin presencia digital local

Morón, Marcos Paz, Mercedes y Luján. Cuatro mercados locales donde PARH tiene oficina física y la competencia probablemente no. Búsquedas como "broker de seguros Marcos Paz", "seguro de comercio Mercedes", "productor de seguros Luján" son de altísima intención y bajísima competencia.

Hoy: las cuatro direcciones aparecen como cuatro tarjetitas con un link a Google Maps. Sin página, sin horario, sin teléfono local, sin schema `LocalBusiness`.

**Solución:** una landing por sucursal con contenido único, horarios, mapa embebido, teléfono, foto de la oficina y schema `InsuranceAgency`. Es el mayor retorno por unidad de esfuerzo de todo el proyecto.

### Cuello de botella #5: cero medición

Sin Analytics, sin Pixel, sin página de gracias, sin eventos de conversión. Roberto no puede responder "¿cuántos clientes me trajo la web el mes pasado?". Si no se mide, no se puede mejorar ni justificar inversión en pauta.

**Solución:** GA4 + Meta Pixel + eventos nombrados (`lead_form`, `whatsapp_click`, `cotizador_externo_click`, `diagnostico_completado`) + `/gracias/` como página de conversión.

### Cuello de botella #6: cero contenido, cero autoridad

Sin blog ni recursos, PARH no captura ninguna búsqueda informativa ("qué cubre el seguro contra todo riesgo", "cuánto sale asegurar una moto en 2026", "qué es la franquicia"). Esas búsquedas son el 80 % del volumen y son donde se genera confianza antes de la compra.

---

## 5. Cliente ideal (ICP)

Derivado del catálogo real, la ubicación de las oficinas y las compañías con las que opera.

### ICP primario A: dueño de PyME o comercio del Oeste y Noroeste del GBA

- Comercio, restaurante, oficina profesional, estudio, constructora chica, taller
- Zona: Morón, Marcos Paz, Mercedes, Luján, Ituzaingó, Merlo, Moreno, General Rodríguez
- Facturación: pequeña a mediana, sin área de riesgos propia
- Dolor: no sabe si está bien cubierto, le da miedo el "no cubierto" en un siniestro, no tiene tiempo de comparar
- Gatillo: apertura o mudanza de local, exigencia de un contrato o licitación, un siniestro cercano, aumento de la póliza actual
- Qué valora: que alguien le explique en criollo, que lo atiendan cuando pase algo, cercanía física
- Productos: Integral de Comercio, RC, Seguro Técnico, Accidentes Personales, flota

### ICP primario B: familia de clase media del Oeste con auto y casa

- 30 a 60 años, uno o dos vehículos, casa o departamento propio
- Zona: mismo radio
- Dolor: la póliza aumenta todos los años, no entiende la letra chica, cuando llama a la compañía lo atiende un bot
- Gatillo: renovación anual, compra de auto o moto, mudanza, un choque
- Qué valora: precio comparado entre varias compañías, y un teléfono con una persona del otro lado
- Productos: Automotor, Motovehículo, Hogar

### ICP secundario C: profesional independiente

- Arquitecto, ingeniero, contador, médico, técnico, organizador de eventos
- Dolor: un cliente o un colegio profesional le exige RC Profesional y no sabe por dónde empezar
- Gatillo: requisito contractual, urgente
- Productos: RC Profesional, Accidentes Personales, Seguro Técnico

### ICP secundario D: aliado / asesor

El copy actual menciona "construyendo confianza con nuestros asegurados **y asesores**". Sugiere una red de productores aliados. Vale una sección chica de "Trabajá con nosotros" o "Sumate a la red PARH" si Roberto lo confirma.

---

## 6. Resumen ejecutivo del diagnóstico

| Área | Nota | Comentario |
|---|---|---|
| Marca y trayectoria | 8/10 | Activo real y sólido, 20 años y 4 oficinas |
| Catálogo de productos | 8/10 | Amplio, con productos de alto margen |
| Acuerdos con compañías | 8/10 | Multi-compañía real, es el diferencial contra los cotizadores online |
| Diseño visual | 2/10 | Template genérico, sin jerarquía, sin identidad |
| Arquitectura de información | 1/10 | 4 URLs, 3 idénticas, el mejor producto escondido |
| SEO on-page | 2/10 | Sin title, sin description, sin alt, sin schema, contenido duplicado |
| Rendimiento | 3/10 | 1,9 MB de imágenes sin optimizar |
| Captación de leads | 2/10 | Deriva el tráfico afuera sin capturar el dato |
| Medición | 0/10 | Inexistente |
| Contenido | 0/10 | Inexistente |

**Conclusión:** el negocio está sano, la web no lo representa ni lo alimenta. No es un rediseño cosmético, es reconstruir el activo digital sobre una base que ya tiene demanda real.

---

## 7. Riesgos a controlar en la migración

| Riesgo | Mitigación |
|---|---|
| Perder el posicionamiento actual | 301 desde las 4 URLs viejas a las nuevas, mantener el texto que ya rankea, `sitemap.xml` nuevo enviado a Search Console el día del deploy |
| No tener acceso al panel CloudPanel | Definir el método de deploy antes de programar. Ver `05_PLAN_TECNICO_DEPLOY.md` |
| Que el formulario deje de andar | Testear el endpoint de mail en staging antes de cortar el sitio viejo |
| Depender de imágenes que todavía no existen | Programar con placeholders del tamaño exacto y un manifiesto de imágenes. Ver `04_DESIGN_SYSTEM.md` |
| Que el sitio nuevo parezca hecho con IA | Reglas duras de copy y de UI. Ver `04_DESIGN_SYSTEM.md`, sección 8 |
