# 06. Roadmap de ejecución

Fase 2 del proyecto: programación. Cada sprint tiene entregable verificable y criterio de aceptación.
Nada avanza al sprint siguiente si el anterior no pasa su criterio.

---

## Sprint 0. Fundaciones

**Objetivo:** el proyecto arranca, compila y tiene los guardarraíles puestos antes de escribir una línea de UI.

| # | Tarea | Detalle |
|---|---|---|
| 0.1 | Crear el proyecto | `create-next-app` con TypeScript, Tailwind v4, ESLint, App Router, src dir |
| 0.2 | Configurar `next.config.ts` | `output: 'export'`, `trailingSlash: true`, `images.unoptimized` |
| 0.3 | Inicializar shadcn/ui | `npx shadcn@latest init` y agregar los 15 componentes base |
| 0.4 | Instalar cult-ui | Solo los componentes aprobados en el doc 05 sección 3.1 |
| 0.5 | Instalar skills de emilkowalski | `npx skills@latest add emilkowalski/skills` |
| 0.6 | Copiar skills locales a `.claude/skills/` | Con su `SKILL.md` y frontmatter |
| 0.7 | Tokens de diseño en `globals.css` | Bloque `@theme` de Tailwind v4 con toda la paleta y la escala del doc 04 |
| 0.8 | Fuentes | Inter Tight y Inter con `next/font/google`, subset latin y latin-ext |
| 0.9 | Script `check-copy.mjs` | Guardarraíl anti guion largo, anti italic, lista negra de términos |
| 0.10 | Script `optimize-images.mjs` | sharp, WebP calidad 80, tres anchos por imagen |
| 0.11 | `public/img/README.md` | Manifiesto de imágenes del doc 04 sección 9 |
| 0.12 | Copiar los 6 documentos a `directivas/` | Los planes viven dentro del repo |

**Criterio de aceptación:** `npm run build` genera `/out`, `npm run check-copy` pasa, la página en blanco carga con las fuentes correctas y los tokens de color disponibles como clases de Tailwind.

---

## Sprint 1. Contenido tipado

**Objetivo:** todo el texto del sitio existe, tipado y en un solo lugar, antes de programar la UI. Esto evita el error clásico de escribir copy improvisado dentro de los componentes.

| # | Tarea | Archivo |
|---|---|---|
| 1.1 | Tipos del contenido | `src/content/types.ts` |
| 1.2 | Productos personas (6) con copy verbatim del doc 03 sección 4.2 | `productos-personas.ts` |
| 1.3 | Productos empresas (4) con copy verbatim | `productos-empresas.ts` |
| 1.4 | Oficinas (4) con NAP, horarios, coordenadas y link de maps | `oficinas.ts` |
| 1.5 | Compañías (6) con nombre, logo, link de cotizador y descripción real de cada una | `companias.ts` |
| 1.6 | Métricas de confianza | `metricas.ts` |
| 1.7 | FAQs: 6 generales + 4 por producto | `faqs.ts` |
| 1.8 | Testimonios (placeholder tipado hasta que Roberto los provea) | `testimonios.ts` |
| 1.9 | Preguntas, ramas y reglas de puntos ciegos del diagnóstico | `diagnostico.ts` |
| 1.10 | Metadatos de las 22 páginas | `src/content/seo.ts` |

**Bloqueante para Roberto:** hacen falta datos reales para 1.5 (descripción de cada compañía), 1.6 (números verificables), 1.8 (testimonios con autorización) y los horarios de las 4 oficinas. Ver sección "Lo que necesitamos de Roberto" al final.

**Criterio de aceptación:** `npm run check-copy` pasa sobre todo `/content`. Cero guiones largos, cero italic, cero términos de la lista negra. Todo el copy heredado está textual salvo las 4 correcciones autorizadas.

---

## Sprint 2. Layout y navegación

| # | Tarea |
|---|---|
| 2.1 | `layout.tsx`: fuentes, `lang="es-AR"`, skip link, JSON-LD de Organization y WebSite |
| 2.2 | `Header` sticky con reducción de altura al scroll |
| 2.3 | `MegaMenu` de Personas y Empresas con Radix NavigationMenu, navegable por teclado |
| 2.4 | Menú mobile en `Sheet` con acordeones |
| 2.5 | Teléfono clicable y botón `Cotizar ahora` |
| 2.6 | `StickyMobileBar` con Llamar y WhatsApp, respetando `safe-area-inset` |
| 2.7 | `Footer` de 4 columnas |
| 2.8 | `Breadcrumbs` con schema |
| 2.9 | `not-found.tsx` con buscador y links principales |
| 2.10 | Helper `lib/whatsapp.ts` y `lib/analytics.ts` |

**Criterio de aceptación:** navegación completa por teclado en desktop y mobile, foco siempre visible, sin scroll horizontal a 375 px, header y footer idénticos en las 22 rutas.

---

## Sprint 3. Home

Bloques en el orden definido en el doc 02 sección D.

| # | Bloque |
|---|---|
| 3.1 | `Hero` con toggle Personas / Empresas, estado sincronizado con la URL |
| 3.2 | `MetricsBar` con contadores animados una sola vez |
| 3.3 | `StepsBlock` de 3 pasos |
| 3.4 | `ProductGrid` conectada al toggle |
| 3.5 | `CarrierLogos` en escala de grises, movimiento lento, pausable |
| 3.6 | Bloque "Por qué un bróker y no un cotizador online" |
| 3.7 | `Testimonials` con Embla, accesible |
| 3.8 | `OfficesGrid` con las 4 sucursales |
| 3.9 | Bloque de entrada al diagnóstico |
| 3.10 | `FaqSection` con Radix Accordion + `FAQPage` schema |
| 3.11 | `FinalCta` con micro-copy de fricción |
| 3.12 | JSON-LD `InsuranceAgency` de la casa central |

**Criterio de aceptación:** Lighthouse mobile de la Home con 95+ en Performance y 100 en Accessibility y SEO, con imágenes placeholder. Un `h1` único. Revisión visual contra la checklist anti IA del doc 04 sección 8.3.

---

## Sprint 4. Páginas de producto

Plantilla única, 10 páginas generadas desde `/content` con `generateStaticParams`.

| # | Tarea |
|---|---|
| 4.1 | Plantilla `[slug]/page.tsx` para `/seguros/` |
| 4.2 | Plantilla `[slug]/page.tsx` para `/empresas/` |
| 4.3 | Hero de producto con imagen y `LeadForm` corto al lado |
| 4.4 | Bloque "Qué cubre" y "Qué no cubre" (este segundo es diferencial real, casi nadie lo pone) |
| 4.5 | Bloque "Para quién es" |
| 4.6 | Compañías disponibles para ese producto |
| 4.7 | FAQ específica del producto |
| 4.8 | Bloque de texto extendido al pie, para SEO |
| 4.9 | CTA doble: cotizar online y hablar con un asesor |
| 4.10 | JSON-LD `Service` + `FAQPage` + `BreadcrumbList` |
| 4.11 | Hubs `/seguros/` y `/empresas/` |

**Criterio de aceptación:** las 10 páginas construyen sin error, cada una con title y description únicos, un `h1` único y su JSON-LD válido en la Rich Results Test.

---

## Sprint 5. Oficinas y SEO local

| # | Tarea |
|---|---|
| 5.1 | Índice `/oficinas/` |
| 5.2 | Plantilla `/oficinas/[slug]/` con foto, NAP, horarios, mapa embebido lazy, teléfono local |
| 5.3 | Contenido único por sucursal: zonas que atiende, cómo llegar, qué se puede resolver ahí |
| 5.4 | JSON-LD `InsuranceAgency` por sucursal, con `geo` y `openingHoursSpecification` |
| 5.5 | Enlazado interno de cada producto hacia las oficinas y viceversa |
| 5.6 | Evento `office_directions_click` |

**Criterio de aceptación:** las 4 fichas de schema validan sin error y el NAP coincide carácter por carácter con Google Business Profile.

---

## Sprint 6. Conversión

El sprint que define el retorno del proyecto.

| # | Tarea |
|---|---|
| 6.1 | `LeadForm` con react-hook-form y zod, tres variantes, mensajes de error en castellano |
| 6.2 | Honeypot y validación de origen |
| 6.3 | Endpoint `api/lead.php` endurecido según doc 05 sección 5 |
| 6.4 | `/gracias/` con `noindex` y evento de conversión |
| 6.5 | `/cotizar/`: los 6 cotizadores con nombre de compañía, logo y descripción real de para qué sirve cada uno |
| 6.6 | `QuoteModal` de captura previa a la derivación externa, con opción de saltearlo |
| 6.7 | `DiagnosticoWizard`: 6 pasos, barra de progreso, navegación adelante y atrás, estado en `useReducer` |
| 6.8 | Motor de puntos ciegos: reglas declarativas en `content/diagnostico.ts` que mapean respuestas a hallazgos |
| 6.9 | Pantalla de resultado con los hallazgos y CTA de WhatsApp prellenado con el resumen |
| 6.10 | `/contacto/` con formulario completo, mapa y datos de las 4 oficinas |
| 6.11 | GA4 + Meta Pixel + los 7 eventos del doc 03 sección 5.7 |
| 6.12 | Banner de consentimiento simple con opción de rechazar |

**Criterio de aceptación:** los 4 formularios envían y llegan al mail. El diagnóstico se completa de punta a punta en mobile y en desktop. Los 7 eventos se ven en el DebugView de GA4.

---

## Sprint 7. Páginas restantes y legales

| # | Tarea |
|---|---|
| 7.1 | `/nosotros/` con la historia, foto del equipo, trayectoria, oficinas y matrícula SSN |
| 7.2 | `/politica-de-privacidad/` conforme a la Ley 25.326 |
| 7.3 | `/terminos-y-condiciones/` |
| 7.4 | Leyendas legales obligatorias del productor asesor de seguros (verificar requisitos de la SSN con Roberto) |
| 7.5 | `sitemap.ts` y `robots.ts` |
| 7.6 | Favicon, iconos y manifest |
| 7.7 | Imágenes Open Graph por sección |

---

## Sprint 8. Optimización y QA

| # | Tarea |
|---|---|
| 8.1 | Integrar las imágenes finales de Roberto y correr `optimize-images` |
| 8.2 | Escribir el `alt` de cada imagen a mano |
| 8.3 | Auditoría Lighthouse de las 22 páginas |
| 8.4 | QA cruzado: Chrome, Safari, Firefox, iOS Safari, Android Chrome |
| 8.5 | Prueba a 320, 375, 768, 1024, 1440 y 1920 px |
| 8.6 | Auditoría de accesibilidad con teclado y con lector de pantalla |
| 8.7 | Validación de todos los JSON-LD |
| 8.8 | Revisión final contra la checklist anti IA completa |
| 8.9 | Corrección ortográfica humana de todo el sitio |
| 8.10 | Prueba de carga de los formularios y verificación de que el mail no cae en spam |

---

## Sprint 9. Despliegue

Según el procedimiento del doc 05 sección 8. Incluye staging, backup, subida, 301, Search Console y verificación post deploy.

---

## Lo que necesitamos de Roberto antes de terminar el Sprint 1

Bloqueantes reales. Sin esto el sitio se llena de placeholders.

1. **Fotos reales de las 4 oficinas** (celular alcanza, con buena luz)
2. **Foto del equipo o al menos de Roberto.** Es el activo de confianza más importante de todo el sitio
3. **Horarios de atención de cada sucursal**
4. **Teléfono directo de cada sucursal**, si son distintos del general
5. **Número de matrícula de Productor Asesor de Seguros** (SSN) para el footer y los legales
6. **Números verificables para la franja de métricas:** cantidad de clientes asegurados, años exactos, cantidad de compañías
7. **Entre 6 y 10 testimonios reales** con nombre, localidad, producto y autorización para publicar. Si hay reseñas en Google Business Profile, se pueden usar esas
8. **Autorización de uso de logo** de Federación Patronal, San Cristóbal, ATM, Cardinal, Banco del Sol y SeguroCell
9. **Confirmación del catálogo:** si además trabaja ART, caución, flotas, transporte o mala praxis, hay que agregarlos
10. **Confirmación sobre la red de asesores:** el copy actual menciona "asesores". Si existe una red de productores aliados, merece su propia sección
11. **Acceso a Google Business Profile** de las 4 sucursales, o confirmación de quién las administra
12. **Acceso al hosting** o al menos credenciales SFTP y capacidad de editar la configuración de Nginx para las 301
13. **Cuentas de GA4 y Meta Business**, o autorización para crearlas

---

## Fase 3 (posterior al lanzamiento, fuera del alcance actual)

| Iniciativa | Impacto | Esfuerzo |
|---|---|---|
| Blog `/recursos/` con 12 artículos de las keywords informacionales del doc 03 sección 5.3 | Alto, sostenido | Medio |
| Landings programáticas por localidad y producto ("seguro de auto en Ituzaingó", "integral de comercio en Moreno") | Alto | Medio |
| Portal de autogestión: descarga de póliza y denuncia de siniestro online | Muy alto en retención | Alto |
| Automatización de renovaciones: recordatorio por WhatsApp 30 días antes del vencimiento, alimentado por el dato que captura el diagnóstico | Muy alto en ingresos | Medio |
| Campañas de Meta Ads segmentadas por localidad, con el diagnóstico como destino | Alto | Bajo |
| Los 3 PDF descargables del doc 03 sección 2.4 | Medio | Bajo |
| Versión en modo alto contraste | Bajo | Bajo |
