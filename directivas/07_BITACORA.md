# 07. Bitácora de ejecución

Hallazgos y desvíos del plan durante la programación. Se actualiza al cierre de cada sprint.

---

## Sprint 0. Fundaciones (completo)

### Entregado

- Proyecto en `parh-web/`. Next.js 15.5.22, React 19.1, TypeScript strict, Tailwind v4
- `output: 'export'` + `trailingSlash: true`. `npm run build` genera `/out` con HTML estático
- shadcn/ui inicializado con base Radix, preset Nova. 13 componentes
- Tokens de PARH en `globals.css` reemplazando el tema neutro de shadcn. Sin dark mode
- Inter Tight + Inter con `next/font/google`
- `scripts/check-copy.mjs` y `scripts/optimize-images.mjs`
- 31 skills en `.claude/skills/`
- Los 7 documentos del plan copiados a `parh-web/directivas/`

### Desvío 1. Ningún componente de cult-ui entró al proyecto

El registro `cult-ui.com/r/*.json` devolvió 429 (rate limit), así que se clonó el repo y se evaluaron los componentes contra las reglas del doc 04 sección 8.2. Los tres candidatos se descartaron:

| Componente | Motivo del descarte |
|---|---|
| `texture-card` | Es un `bg-gradient-to-b` con cuatro `div` de bordes anidados y clases de dark mode. Viola directamente la prohibición de gradientes en tarjetas y de bordes decorativos |
| `logo-carousel` | 541 líneas con 14 logos de tecnológicas (Apple, Vercel, Stripe, OpenAI) hardcodeados como SVG inline. No acepta los logos por prop. Es una demo, no un componente reutilizable |
| `minimal-card` | Altura fija de 190 px, `<img>` crudo en vez de `next/image`, sombras apiladas en valores arbitrarios y radios `rounded-[24px]` que saltean los tokens |

**Lo que sí se toma de cult-ui:** las dos skills de su repo, que son el aporte más valioso.

- `components-build`: la especificación de components.build (16 categorías de reglas sobre composición, accesibilidad, estado, tipos y styling), co-firmada por Hayden Bleasel y shadcn
- `fixing-motion-performance`: diagnóstico de performance en animaciones

Los componentes propios (`ProductCard`, `CarrierLogos`, `OfficeCard`) se construyen siguiendo el patrón de composición de esa especificación, con los tokens de PARH.

**Nota:** si el registro de cult-ui se destraba, vale reevaluar. Pero ninguno de los tres candidatos pasa las reglas anti IA que definimos, así que no es un bloqueo.

### Desvío 2. `form.tsx` no existe en el registro nuevo de shadcn

Con base Radix, `npx shadcn add form` completa sin crear el archivo. En el Sprint 6 se escribe un wrapper propio sobre react-hook-form, que además queda más simple que el de shadcn.

### Hallazgo 1. El barrel de `radix-ui` inflaba el bundle

El `Button` de shadcn hace `import { Slot } from "radix-ui"`. Ese barrel arrastraba buena parte del paquete: la página de prueba pesaba **82,6 kB** con un solo botón.

Solución en `next.config.ts`:

```ts
experimental: { optimizePackageImports: ["radix-ui"] }
```

Resultado: **82,6 kB → 5,47 kB** en la página, y First Load JS de **185 kB → 108 kB**. Detectarlo en Sprint 0 evitó que las 22 páginas heredaran el problema.

### Hallazgo 2. Las variables de `next/font` van en `<html>`, no en `<body>`

`globals.css` aplica `font-family` sobre `html`. Con las variables de la fuente puestas en `<body>`, `var(--font-inter)` no existe en ese punto de la cascada, la declaración queda inválida y el navegador cae a Times New Roman. Verificado en el navegador: `fontFamily` daba `"Times New Roman"`.

Corregido poniendo `className={inter.variable + interTight.variable}` en `<html>`.

**Regla:** si en algún momento se mueve el `font-family` base, revisar que la variable esté definida en el mismo elemento o en un ancestro.

### Hallazgo 3. `npm audit` reporta 3 vulnerabilidades altas sin fix en la línea 15

`postcss` y `sharp`, ambos dentro de `next@15.5.22`. El único fix es subir a Next 16, que es cambio mayor.

Decisión: quedarse en Next 15 (stack aprobado). Las dos son de tiempo de build y no viajan al HTML estático que se sube al servidor. Se instaló `sharp@0.35.3` como dependencia directa, que cubre nuestro uso en `optimize-images.mjs`.

**Revisar** cuando se evalúe la migración a Next 16.

### Verificación en navegador

| Chequeo | Resultado |
|---|---|
| `lang` | `es-AR` |
| Titulares | Inter Tight 700, tracking -1,68 px |
| Cuerpo | Inter |
| Botón primario | `rgb(24, 48, 128)`, que es `#183080` |
| Radio de botón | 16 px |
| Eyebrow | `#00639b`, mayúsculas |
| Contenedor | 1200 px |
| Logo WebP | carga a 417x195 |
| Overflow horizontal a 375 px | ninguno |
| `npm run build` | genera `/out` con `index.html` |
| `npm run check-copy` | sin observaciones, y probado en negativo: detecta guion largo, cursiva, emoji y lista negra |

### Pendiente para el cliente

El logo entregado es un JPEG de 418x186 con fondo blanco. Para el header hace falta **SVG, o PNG con fondo transparente a mayor resolución**. Con el JPEG actual el logo no se puede poner sobre el footer azul.

---

## Sprint 1. Contenido tipado (completo)

### Entregado

9 archivos en `src/content/`, con todo el texto del sitio tipado y en un solo lugar. Ningún string de copy queda hardcodeado en un componente.

| Archivo | Contenido |
|---|---|
| `types.ts` | Tipos de todo el contenido, incluido `Origen` |
| `productos-personas.ts` | 6 coberturas con qué cubre, qué no cubre, para quién y texto extendido |
| `productos-empresas.ts` | 4 coberturas del segmento de mayor margen |
| `oficinas.ts` | Las 4 sucursales con NAP, geo, horarios y zonas |
| `companias.ts` | Las 6 compañías con descripción real de cada una |
| `metricas.ts` | Franja de confianza |
| `testimonios.ts` | 6 testimonios de maqueta |
| `faqs.ts` | 18 preguntas, generales y por producto |
| `diagnostico.ts` | Motor del lead magnet: 6 pasos, ramificación y 15 reglas de puntos ciegos |
| `sitio.ts` | Datos globales, copy verbatim, copy nuevo y metadatos de las 22 rutas |

### Decisión. Cómo se marcan los datos inventados

Como el sitio es un prototipo y Roberto todavía no entregó los datos reales, cada registro lleva un campo `origen: "real" | "placeholder"`.

`npm run placeholders` recorre `src/content` y lista todo lo pendiente de reemplazar. Hoy son **44 registros**:

| Archivo | Pendientes |
|---|---|
| `faqs.ts` | 17 |
| `productos-personas.ts` | 6 |
| `companias.ts` | 6 |
| `oficinas.ts` | 4 |
| `productos-empresas.ts` | 4 |
| `testimonios.ts` | 6 |
| `metricas.ts` | 1 |

El script admite `--strict`, que hace fallar el comando si queda alguno. **Se activa en el pipeline recién en el deploy real**, para que sea imposible publicar datos inventados por olvido.

Qué es real y qué no:

- **Real:** direcciones, códigos postales y coordenadas de las 4 sucursales (salen de los links de Google Maps del sitio actual), URLs de los 6 cotizadores con los códigos de productor de Roberto, el teléfono, el mail, las redes, los 20 años, la razón social PARH APS SRL (del logo) y todo el copy heredado de parh.com.ar
- **Inventado:** horarios, zonas atendidas, descripciones de sucursal, descripciones de compañías, los 6 testimonios, la cantidad de clientes asegurados y el detalle de coberturas de cada producto

Los **testimonios** merecen una aclaración aparte: publicar testimonios inventados de un negocio real no es una opción. La fuente práctica de reemplazo son las reseñas de Google Business Profile de las 4 sucursales, que ya existen y no requieren pedir autorización una por una.

### Verificación

| Chequeo | Resultado |
|---|---|
| `npm run typecheck` | Sin errores |
| `npm run check-copy` | 12 archivos, sin observaciones. Ni un guion largo ni una cursiva en unas 2.500 líneas de copy |
| `npm run check-diagnostico` | 11 pruebas pasaron |
| `npm run build` | Cadena completa en verde, exporta a `/out` |

### Hallazgo 4. El motor del diagnóstico necesitaba pruebas propias

Es la única parte del contenido con lógica (predicados de ramificación y de puntos ciegos), así que el typecheck no alcanzaba. Se agregó `scripts/check-diagnostico.mts`, que corre con el type stripping nativo de Node 24 sin necesidad de instalar un runner.

Cubre: el salteo de pasos cuando no hay seguro, que toda combinación de respuestas produzca al menos un hallazgo, el tope de 5 hallazgos, que no haya ids duplicados y el armado del mensaje de WhatsApp. Está enganchado al `npm run build`.

Detalle de implementación: el archivo se llama `.mts` y no `.ts` para que Node lo trate como módulo ES sin tener que poner `"type": "module"` en el `package.json`, que afectaría a Next.

### Hallazgo 5. `next dev` y `next build` no pueden correr a la vez

En Windows, tener el servidor de desarrollo levantado mientras se corre `next build` hace que webpack crashee escribiendo `.next`, y el error que tira son 40 KB de bundle minificado sin ninguna pista útil.

**Regla: parar el preview antes de buildear.** Si aparece un crash de `bundle5.js` sin mensaje, es esto y no el código.

**Resuelto de raíz en el Sprint 2.** Ver hallazgo 6.

---

## Sprint 2. Layout y navegación (completo)

### Entregado

| Archivo | Qué hace |
|---|---|
| `lib/whatsapp.ts` | Links de WhatsApp con mensaje prellenado según el contexto, y `tel:` |
| `lib/analytics.ts` | Wrapper de los 7 eventos del doc 03 sección 5.7. Ningún componente habla directo con gtag ni con fbq |
| `lib/schema.ts` | Generadores de JSON-LD: InsuranceAgency, Organization, WebSite, Service, FAQPage, BreadcrumbList |
| `components/ui/icono.tsx` | Mapa de íconos, para que `src/content` siga siendo texto puro sin imports de React |
| `components/ui/iconos-redes.tsx` | Glifos propios de Instagram, Facebook y LinkedIn |
| `components/layout/header.tsx` | Header sticky con mega menú de dos ramas |
| `components/layout/menu-mobile.tsx` | Sheet con acordeones |
| `components/layout/barra-mobile.tsx` | Barra fija de Llamar y WhatsApp |
| `components/layout/footer.tsx` | Footer de 4 columnas |
| `components/layout/logo.tsx` | Variante oscura (imagen) y clara (tipográfica, para el footer azul) |
| `components/seo/json-ld.tsx` y `breadcrumbs.tsx` | Inyección de schema y migas |
| `app/not-found.tsx` | 404 con accesos a los 10 productos |

### Desvío 3. Se ampliaron las variantes del Button de shadcn

El preset Nova dimensiona los botones para UI de aplicación: el `default` es `h-8` y el `lg` es `h-9`. Para una web comercial son chicos y quedan **por debajo del área táctil mínima de 44 px** que exige el doc 04 sección 5.

Se agregaron dos tamaños, `cta` (h-11) y `cta-lg` (h-13), y una variante `onDark` para el celeste sobre fondo azul. Además se corrigió el hover del primario: shadcn usa `hover:bg-primary/80`, que **aclara** el botón, y el doc 04 sección 2.3 pide que oscurezca.

### Hallazgo 6. Tailwind no escaneaba `src/components` en el servidor de desarrollo

El síntoma fue el mega menú renderizando dentro del flujo del header, de 746 px de alto, en vez de flotar. La causa: `position: static` porque la clase `md:absolute` que trae el `navigation-menu` de shadcn **no existía en el CSS de desarrollo**.

Comparación de los dos CSS:

| | Dev | Build |
|---|---|---|
| Tamaño | 50 KB | 86,5 KB |
| Media queries | 15 | 22 |
| `md:absolute` | ausente | presente |

Es decir, **el build de producción estaba bien y solo fallaba el preview**, que es el peor caso posible porque el preview es la herramienta de verificación.

Solución en `globals.css`:

```css
@source "../**/*.{ts,tsx}";
```

Resultado: el CSS de dev pasó de 50 KB a 112 KB y de 15 a 24 media queries.

**Regla:** si un estilo responsive anda en el build pero no en dev, es detección de fuentes, no el componente.

### Hallazgo 7. `distDir` separado por modo

Los choques entre `next dev` y `next build` (hallazgo 5 y la corrupción de CSS de arriba) salían todos de compartir el directorio `.next`. En vez de depender de acordarse de limpiar, se separaron:

```ts
distDir: process.env.NODE_ENV === "production" ? ".next-build" : ".next"
```

Verificado: ahora `npm run build` corre en verde con el servidor de desarrollo levantado.

### Hallazgo 8. Lucide v1 ya no exporta íconos de marca

`Instagram`, `Facebook` y `Linkedin` no existen más en `lucide-react`. Se escribieron glifos propios en `components/ui/iconos-redes.tsx`, con las mismas convenciones del set (viewBox 24, trazo 2, `currentColor`) para que combinen.

### Hallazgo 9. Falso positivo del guardarraíl con `not-italic`

La regla de cursiva marcaba `not-italic`, que justamente **quita** la cursiva. Corregido con un lookbehind: `/(?<!not-)\b(italic|font-italic)\b/`.

### Hallazgo 10. `tailwind-merge` no dedupe clases con variante

El `SheetContent` de shadcn trae `data-[side=right]:w-3/4`. Un `w-full` pelado no le gana, porque para tailwind-merge son propiedades de contextos distintos. El menú mobile salía a 281 px en un viewport de 375.

Se corrige repitiendo la misma variante: `data-[side=right]:w-full`. Ahora ocupa los 375 px.

### Aviso de verificación. El scroll programático no dispara eventos en este navegador

Durante un rato pareció que el header no se compactaba al hacer scroll. En realidad `window.scrollTo()` **no emite el evento `scroll`** en el navegador de la herramienta: de tres intentos de scroll, el listener recibió cero eventos, y el único que llegó fue un `dispatchEvent` manual. Con ese evento, el estado cambió correctamente a compacto.

**Regla para verificar de acá en adelante:** para probar comportamiento ligado al scroll hay que disparar `window.dispatchEvent(new Event('scroll'))` a mano, o el resultado es un falso negativo.

### Verificación en navegador

| Chequeo | Resultado |
|---|---|
| Título de la Home | "Bróker de Seguros en Morón, Luján y Mercedes \| PARH" |
| JSON-LD | Organization y WebSite presentes y parseables |
| `h1` por página | 1 |
| Imágenes sin `alt` | 0 |
| Mega menú | Flota en absoluto, 585x539, sin desbordar a la derecha, con los 6 productos más el panel del diagnóstico |
| Escape en el mega menú | Cierra (`aria-expanded=false`) y devuelve el foco al trigger |
| Skip link | Es el primer tabbable y se hace visible al enfocarlo |
| Foco visible | `rgb(0, 160, 224)` 2px solid, que es el celeste del logo |
| Header compacto al scrollear | Verificado con evento real |
| Mobile 375 px | Sin overflow horizontal |
| Menú mobile | Ancho completo, foco atrapado, acordeones con ítems de 44 px exactos |
| Barra fija mobile | 56 px por acción, WhatsApp con mensaje prellenado |
| 404 | Renderiza con la plantilla de título y los 10 productos |
| `npm run build` con dev corriendo | En verde |

---

## Sprint 3. Home (completo)

### Entregado

Los 11 bloques del orden decidido en el doc 02 sección D: Hero con toggle, MetricsBar, StepsBlock, ProductGrid (con el mismo toggle sincronizado), CarrierLogos, WhyBroker, Testimonials (carrusel Embla), OfficesGrid, DiagnosticoTeaser, FaqSection (con schema) y FinalCta. Más el componente `<Imagen>`, que resuelve cómo programar con imágenes que todavía no existen.

### Decisión. El componente `<Imagen>`

Roberto va a generar las imágenes de producto por IA y hoy no hay ninguna salvo el logo. En vez de romper el build o mostrar imágenes rotas, `<Imagen base="..." alt="...">` consulta un registro (`IMAGENES_LISTAS` en `lib/imagenes.ts`) y:

- Si la imagen no está lista, dibuja un marcador con la proporción exacta (`aspect-ratio`), un ícono y el nombre de archivo esperado
- Si está lista, sirve un `<img>` con `srcSet` real de los 3 anchos que genera `optimize-images.mjs`

Activar una imagen es una línea: agregar su ruta a `IMAGENES_LISTAS`. El layout ya queda definitivo desde ahora, así que cuando lleguen las imágenes no hay que retocar nada de la Home.

### Hallazgo 11. `next/image` con `unoptimized` no puede generar `srcSet`

Con `output: 'export'` no hay optimizador de Next en runtime. `unoptimized` hace que `next/image` sirva un único archivo tal cual, y **no acepta un prop `srcSet` manual** (error de tipos: la prop no existe en ese modo). Como sí generamos tres anchos reales con sharp, la solución correcta es un `<img>` nativo con `srcSet` del navegador en lugar de forzarlo dentro de `next/image`. Se implementó así en `<Imagen>`, con `loading`, `fetchPriority` y `decoding` manuales para no perder lo que `next/image` daba gratis.

### Desvío 4. `OfficeCard` necesitaba `"use client"`

El build falló con "Event handlers cannot be passed to Client Component props": `OfficeCard` dispara `evento("office_directions_click")` en un `onClick`, pero se renderizaba desde `page.tsx`, que es un Server Component. Se agregó la directiva al archivo.

### Hallazgo 12 (límite del entorno de verificación, no del código). El pane no compone frames

Al probar los toggles Personas/Empresas y el contador animado de la franja de métricas, el contenido envuelto en `AnimatePresence` y los contadores basados en `requestAnimationFrame` quedaron congelados en su estado inicial pese a esperas de hasta 3 segundos.

Diagnóstico: el `<h2>` de la grilla, que cambia por una condición simple sin animación, **sí** actualizó a "Seguros para tu negocio" al hacer clic. Es decir, el estado de React cambia correctamente. Lo que no avanza es específicamente lo que depende de `requestAnimationFrame` (las transiciones de Motion y el conteo de `MetricsBar`), porque el navegador pausa `rAF` en pestañas que no están componiendo frames, y este pane repite el mismo error ya visto con `computer.screenshot`: *"the Browser pane is not displayed, so the page is not compositing frames"*.

**No es un bug de la Home.** Es una limitación de esta herramienta de verificación cuando el pane no está visualmente abierto. En una pestaña real y visible, `rAF` corre normal.

**Qué se verificó en su lugar**, todo sin depender de compositing: ausencia de errores de consola, estructura del DOM, `aria-selected` y `aria-expanded`, conteo de `h1`, cero imágenes sin `alt`, los 4 JSON-LD (Organization, WebSite, InsuranceAgency, FAQPage), el acordeón de FAQ abriendo con contenido real, meta description y canonical, y layout responsive a 375 px (sin overflow, 1 columna, la franja de métricas mantiene 2 columnas).

**Pendiente de verificación visual:** el toggle animado del hero/grilla y el conteo de la franja de métricas hay que verlos en un navegador real (o con el pane abierto por el usuario) para confirmar la animación en sí. La lógica está revisada y es la misma que ya funciona en el header (Sprint 2), donde si se dispara el evento a mano sí se refleja el cambio de estado.

### Verificación en navegador

| Chequeo | Resultado |
|---|---|
| `npm run typecheck` | Sin errores |
| `npm run build` | En verde, incluidos check-copy (34 archivos) y check-diagnostico (11/11) |
| Consola | Sin errores ni warnings |
| `h1` | 1 |
| Imágenes sin `alt` | 0 de 1 real + 16 placeholders con `aria-label` |
| JSON-LD | Organization, WebSite, InsuranceAgency, FAQPage, los 4 parseables |
| FAQ | Abre y muestra la respuesta real |
| Estado de React en el toggle | Confirmado que cambia (vía el `h2` no animado) |
| Mobile 375 px | Sin overflow horizontal, 1 columna, métricas en 2 |
| CTA final | Los 2 botones, "Hacer el diagnóstico" y "Escribinos por WhatsApp" |
| Meta description y canonical | Coinciden con el doc 03 |

---

## Sprint 4. Páginas de producto (completo)

### Entregado

Plantilla única `components/producto/producto-detalle.tsx`, renderizada por `app/seguros/[slug]/page.tsx` y `app/empresas/[slug]/page.tsx` con `generateStaticParams`. Genera las **10 páginas de producto**. Más los hubs `/seguros/` y `/empresas/` con `components/producto/hub-productos.tsx`, compartido entre ambos.

Componentes nuevos: `CoberturaColumnas` (qué cubre / qué no cubre, en gris y no en rojo porque es información, no una alarma), `ParaQuien`, `CompaniasProducto` (filtra por `producto.companias` y linkea directo al cotizador de cada una), `ContactoRapido` y `CtaDoble`.

### Decisión. `ContactoRapido` en lugar de un formulario a medio hacer

El roadmap (doc 06, tarea 4.3) pide "Hero de producto con imagen y LeadForm corto al lado", pero el `LeadForm` con validación real y el endpoint de envío recién se arman en el Sprint 6. Construir ahora un formulario que todavía no envía nada sería dejar una función a medio terminar.

En su lugar, `ContactoRapido` es una tarjeta con las dos acciones que **sí funcionan hoy**: WhatsApp con el producto ya en el mensaje, y llamar. El formulario la va a reemplazar en el Sprint 6 sin tener que tocar el layout de la página.

### Hallazgo 13. Next 15 tipa `params` como `Promise`

`generateStaticParams` sigue síncrono, pero `generateMetadata` y el componente de página reciben `params: Promise<{ slug: string }>` y hay que hacer `await`. El build tiraba `Type '{ params: { slug: string } }' does not satisfy the constraint 'PageProps'` hasta corregirlo. Afecta a cualquier ruta dinámica nueva que se agregue de acá en adelante (sucursales en el Sprint 5).

### Desvío 5. `CompaniasProducto` necesitaba `"use client"`

Mismo patrón que `OfficeCard` en el Sprint 3: dispara `evento("cotizador_externo_click")` en un `onClick` sin ser client component. Ya son dos veces que aparece este error; **regla para lo que sigue: todo componente con un `onClick` lleva `"use client"` desde que se escribe**, no esperar a que el build lo marque.

### Hallazgo 14. El título se duplicaba en toda página que no fuera la Home

`/seguros/automotor/` cargaba como *"Seguro Automotor en Morón y Zona Oeste \| PARH Seguros \| PARH"*. El layout raíz define `template: "%s | PARH"` para las páginas que no fijan su propio título, pero los títulos del doc 03 sección 5.2 **ya incluyen la marca completa**. El template se aplicaba igual y duplicaba el sufijo.

Se resolvió centralizando la metadata en un helper nuevo, `metadataDe(ruta)` en `content/sitio.ts`, que arma `title: { absolute: meta.title }`. La forma `absolute` le dice a Next que ese título es final y que no debe pasar por ningún template del padre. Las 4 páginas que generaban su propia metadata (Home, los 2 hubs y las 2 plantillas de producto) se reescribieron para usarlo, lo que además borró bastante código duplicado.

**Curiosidad de diagnóstico:** con el título como string plano, la Home *no* mostraba el problema y las páginas hijas sí. La causa concreta de esa diferencia no quedó clara y tampoco importa: `title: { absolute }` la evita en cualquier profundidad de ruta, así que es la forma que se usa de acá en adelante para toda metadata nueva.

### Hallazgo 15. Con `distDir` personalizado, el export estático no sale en `/out`

Al revisar dónde había quedado el HTML generado, no había ningún `/out` en la raíz del proyecto. Con `output: 'export'`, Next escribe el sitio estático final **dentro de `distDir`** cuando `distDir` no es el default. Como el Sprint 2 lo cambió a `.next-build` en producción (hallazgo 7, para que dev y build no se pisen), el sitio exportado completo (`index.html`, `seguros/`, `empresas/`, `img/`, `_next/`, `favicon.ico`, `404.html`, 3,8 MB en total) está en `.next-build/`, no en `/out`.

No es un bug: es el comportamiento documentado de Next para export estático con `distDir` custom. Se corrigió el comentario de `next.config.ts` y el paso 2-3 del doc 05 sección 8, que todavía decían `/out`.

### Verificación en navegador

| Chequeo | Resultado |
|---|---|
| `npm run typecheck` | Sin errores |
| `npm run build` | En verde, 17 rutas generadas (10 producto + 2 hub + Home + 404, con dev server corriendo) |
| Título de `/seguros/automotor/` | Correcto, sin duplicar, tras el fix |
| `h1` por página de producto | 1 |
| JSON-LD en página de producto | Organization, WebSite, Service, BreadcrumbList, FAQPage. Los 5 parseables |
| Breadcrumbs | "Inicio > Seguros > Seguro Automotor" y "Inicio > Empresas > Responsabilidad Civil" |
| FAQ específica por producto | Muestra solo las preguntas de ese `scope` (probado en RC: 2 preguntas correctas) |
| FAQ ausente donde no hay preguntas | Confirmado en `/seguros/vida/`: la sección no se renderiza, sin bloque vacío |
| Compañías por producto | Filtradas correctamente (RC: Federación Patronal + San Cristóbal + ATM; Vida: Federación Patronal + San Cristóbal) |
| WhatsApp con contexto | El link trae el nombre del producto en el mensaje prellenado |
| Imágenes sin `alt` | 0 |
| Hub `/empresas/` | Los 4 productos y el CTA al diagnóstico con la URL correcta |
| Ruta inexistente `/seguros/no-existe/` | `notFound()` muestra la 404 |

---

## Sprint 5. Oficinas y SEO local (completo)

### Entregado

`/oficinas/` (índice) y `/oficinas/[slug]/` (las 4 landings), con `components/oficina/oficina-detalle.tsx` como plantilla: NAP completo, horarios, mapa embebido lazy, zonas atendidas, ficha `InsuranceAgency` con `geo` real, y el bloque "Qué podés resolver acá" que enlaza hacia los productos. Enlazado inverso agregado en `ContactoRapido`: cada página de producto ahora linkea a `/oficinas/`.

### Hallazgo 16. `oficina.mapsUrl` era un placeholder roto, no un dato pendiente

Al construir el botón "Cómo llegar" encontré que `mapsUrl` en `content/oficinas.ts` era el mismo string genérico (`https://maps.app.goo.gl/`) repetido en las 4 sucursales, sin llevar a ningún lado. A diferencia del resto de los datos inventados del sprint 1, esto no era algo para completar después: era información que **ya teníamos** y estaba mal aprovechada, porque `geo` (lat/lng) sí es un dato real, extraído de los links de Google Maps del sitio actual.

Se resolvió sacando el campo `mapsUrl` del tipo `Oficina` y calculando el link siempre desde `geo`, en `lib/maps.ts`:

- `linkComoLlegar(oficina)`: `google.com/maps/dir/?api=1&destination=lat,lng`
- `linkMapaEmbebido(oficina)`: `google.com/maps?q=lat,lng&z=15&output=embed`, que **no necesita API key**

Con esto el botón "Cómo llegar" y el mapa embebido de las 4 sucursales funcionan de verdad desde este sprint, sin esperar ningún dato nuevo de Roberto. `OfficeCard` (Sprint 3) se actualizó para usar el mismo helper.

**Lección:** cuando un campo de contenido parece un placeholder pero el dato real ya está disponible en otro campo (acá, `geo`), conviene derivarlo en vez de dejarlo pendiente. Vale la pena revisar el resto de `content/*.ts` con este criterio en un sprint de limpieza.

### Desvío 6. Se extrajo `lib/horarios.ts`

`rangoDias()` estaba duplicada palabra por palabra en `OfficeCard` (Sprint 3) y se iba a repetir en `OficinaDetalle`. Como es la tercera vez que la misma lógica exacta hace falta, se extrajo a `lib/horarios.ts` con `rangoDias()` y `textoHorario()`, y `OfficeCard` se actualizó para importarla.

### Hallazgo 17. Caché de webpack corrupta en dev, no relacionada con el código

Al verificar `/oficinas/moron/` la página devolvió un 500 con `Cannot find module './611.js'` desde `webpack-runtime.js`. No era un error de compilación (`npm run typecheck` y `npm run build` estaban en verde en ese momento): era el `.next` de desarrollo con artefactos viejos, probablemente por los sucesivos "full reload" de Fast Refresh a lo largo de los sprints.

**Solución:** parar el servidor, borrar `.next` (no `.next-build`, que es el de producción y no se tocó) y reiniciar. Bastó eso.

**Regla:** si una ruta nueva tira `Cannot find module './N.js'` en dev con el build en verde, es caché corrupta de webpack, no el código. Limpiar `.next` antes de salir a debuggear componentes.

**Reapareció una variante durante la verificación del navegador del usuario:** `Runtime TypeError: Cannot read properties of undefined (reading 'call')` en `webpack.js`. El log del servidor mostró la causa exacta: `Could not find the module "...segment-explorer-node.js#SegmentViewNode" in the React Client Manifest`, es decir, el manifest de React Server Components había quedado desincronizado del árbol de chunks, otra vez por los sucesivos "full reload" de Fast Refresh durante los renombres y borrados de archivos del Sprint 5. Misma solución: parar el server, `rm -rf .next`, reiniciar. Verificado sin errores en consola ni en `preview_logs` después, en Home, las 4 oficinas y una página de producto.

**Regla ampliada:** cualquier error de runtime en dev que mencione `webpack.js`, `webpack-runtime.js` o el "React Client/Server Manifest", sin importar el mensaje exacto (`Cannot find module`, `Cannot read properties of undefined`, etc.), es este mismo problema de caché. No es señal de revisar componentes.

---

## Sprint 6. Conversión (completo)

El sprint que define el retorno del proyecto: todo lo que hoy en parh.com.ar deriva tráfico sin capturar nada.

### Entregado

| Pieza | Archivo |
|---|---|
| Validaciones | `lib/validaciones.ts` (zod, mensajes en castellano) |
| Envío de leads | `lib/enviar-lead.ts`, wrapper de `fetch` a `lead.php` |
| Honeypot reutilizable | `components/forms/honeypot.tsx` |
| `LeadForm` | `components/forms/lead-form.tsx`, variantes "corto" y "contacto" |
| `QuoteModal` | `components/forms/quote-modal.tsx`, captura previa a derivar. Doc 03 sección 2.3 |
| `/cotizar/` | Las 6 compañías envueltas en `QuoteModal` |
| `DiagnosticoWizard` | `components/diagnostico/*`, `useReducer` sobre el motor del Sprint 1 |
| `/diagnostico/` | Wizard completo con resultado en pantalla, nunca PDF ni espera de mail |
| `/contacto/` | Formulario completo + las 4 oficinas |
| `/gracias/` | `noindex`, mensaje según el formulario de origen |
| `lead.php` | Endpoint endurecido: origen, honeypot, rate limit, saneo, mail, respaldo CSV fuera del webroot |
| GA4 + Meta Pixel | `components/analytics/ga4-pixel.tsx`, solo si hay ID y hubo consentimiento |
| Banner de consentimiento | `components/analytics/consent-banner.tsx`, Ley 25.326 |

### Decisión. Dónde vive el respaldo CSV del endpoint

Al escribir `lead.php` encontré que un respaldo en CSV dentro de `public/api/` quedaría en una ruta pública adivinable (`/api/leads.csv`), exponiendo nombres, teléfonos y emails a cualquiera que la probara. En vez de aceptar ese riesgo o inventar un mecanismo de ofuscación poco confiable, el respaldo se guarda en una carpeta configurable **fuera del webroot** (`LEAD_BACKUP_DIR`, en `lead.config.php`, que no viaja en el repo). Sin esa config, el endpoint simplemente no guarda respaldo: el mail sigue siendo el registro principal y el formulario no se rompe. `lead.config.example.php` documenta el patrón de ruta típico de CloudPanel.

### Decisión. `mail()` en vez de SMTP autenticado

El doc 05 prefería SMTP para evitar spam, pero implementarlo bien a mano (sin una librería como PHPMailer, que sumaría una dependencia de Composer sin poder auditarla acá) es fácil de hacer mal. Se usa `mail()`, que funciona out-of-the-box en CloudPanel, con headers fijos (`From`, `Content-Type`) y el único dato de usuario que entra en un header (`Reply-To`) pasado por `sanearLinea()`, que corta cualquier salto de línea antes de tocarlo. Nada de headers construidos por concatenación directa de input, que es la causa clásica de header injection. Migrar a SMTP autenticado más adelante es un cambio acotado a una función.

### Hallazgo 18. `npm run typecheck` no cubre el patrón `react-hook-form` + Radix `Select`

Nada que reportar como bug, pero vale la nota: el `Select` de shadcn no expone un `register` nativo de RHF (es un componente controlado de Radix), así que el campo "¿Cómo nos encontraste?" en `/contacto/` se conecta con `Controller` en vez de `register`. Si se agrega un `Select` en otro formulario más adelante, usar el mismo patrón.

### Hallazgo 19 (el más largo del proyecto). El pane sin compositing también rompe la verificación de formularios, no solo las animaciones

Al probar el `DiagnosticoWizard` de punta a punta until el envío, aparecieron errores de validación (`Ingresá tu nombre completo`) para campos que el DOM mostraba con el valor correcto ya cargado. Pasé varias vueltas descartando causas: inyección de caracteres raros, timing de eventos, `register` de react-hook-form, hasta la más simple.

La causa real, confirmada con una prueba limpia (página recién cargada, un solo intento, `form.requestSubmit()` directo): **no había ningún bug**. Lo que pasaba es que en los intentos anteriores había reenviado el mismo formulario varias veces sin recargar la página, y el mismo problema de compositing pausado que ya afecta a `AnimatePresence` (Sprint 3, hallazgo 12) también deja mensajes de error viejos pegados en el DOM entre un intento y el siguiente, porque el commit de React que debería sacarlos no llega a pintar. Con una carga fresca y un solo envío, tanto `/diagnostico/` como `/contacto/` validaron bien y mostraron el mensaje de error esperado de `enviarLead()` (`"Algo falló de nuestro lado..."`), que es exactamente lo correcto: no hay PHP corriendo en el servidor de desarrollo, así que `lead.php` nunca puede devolver un 200 real acá.

Un síntoma adicional del mismo problema: `read_page` (el snapshot de accesibilidad) solo mostraba el primer campo de texto de un paso del wizard y omitía los siguientes, y los `ref` de una captura vieja apuntaban a coordenadas que ya no correspondían al elemento correcto tras un cambio de paso (un clic con un `ref` viejo terminó navegando a la Home por error). **Regla nueva:** en este pane, para wizards o formularios detrás de una transición animada, no confiar en `read_page`/`ref` de una captura anterior al último cambio de paso; usar `document.querySelectorAll` con texto exacto o `closest('form').requestSubmit()`, y siempre sobre una carga de página fresca cuando el intento anterior falló.

**Lo que sí queda probado como código correcto**, con evidencia concreta:
- Las 11 pruebas automatizadas de `check-diagnostico.mts` (sin ninguna dependencia de DOM ni animación)
- El wizard completo, paso a paso, con clics reales por texto: 6→4 pasos al responder "No tengo" (confirma el salteo), hasta llegar al formulario de contacto
- `/diagnostico/` y `/contacto/`, cada uno en una carga fresca, validando y manejando el error de red correctamente
- El `QuoteModal`: abre con el título de la compañía correcta, "No hace falta, llevame directo" abre `window.open` con la URL real del cotizador (interceptada y verificada) y cierra el modal

### Verificación en navegador

| Chequeo | Resultado |
|---|---|
| `npm run typecheck` | Sin errores |
| `npm run build` | 26 páginas, en verde, con dev server corriendo |
| Wizard: salteo de pasos | "No tengo" pasa de 6 a 4 pasos totales, salta compañía y vencimiento |
| Wizard: validación del paso de contacto | Sin campos vacíos aceptados, mensajes en castellano |
| Wizard: envío | Llega hasta `enviarLead()`, maneja el error de red sin romper la UI |
| `/contacto/`: envío | Mismo comportamiento, formulario completo con selector "Cómo nos encontraste" |
| `QuoteModal` | Título dinámico por compañía, honeypot presente, "llevame directo" abre la URL real sin exigir el formulario, cierra el modal |
| `/cotizar/` | Las 6 compañías, cero imágenes sin `alt` |
| Consentimiento | Banner visible con Aceptar/Rechazar, offset correcto sobre la barra mobile |
| `lead.php` | Revisado a mano línea por línea (sin PHP local para lint). **Pendiente: probar en staging real antes de producción**, tal como indica el doc 05 |

### Verificación en navegador

| Chequeo | Resultado |
|---|---|
| `npm run typecheck` | Sin errores |
| `npm run build` | En verde, con dev corriendo, las 4 sucursales generadas |
| Título y `h1` de `/oficinas/moron/` | Correctos, un solo `h1` |
| Breadcrumbs | "Inicio > Oficinas > Morón" |
| JSON-LD `InsuranceAgency` | `geo` y `openingHoursSpecification` con los datos reales |
| Iframe del mapa | `src` con las coordenadas correctas, `loading="lazy"` |
| "Cómo llegar" | Funcional y **distinto en cada una de las 4 sucursales** (antes eran 4 links idénticos y rotos) |
| WhatsApp de la sucursal | Mensaje con el nombre de la localidad |
| Enlace inverso producto → oficinas | Presente y con el href correcto en `/seguros/hogar/` |
| "Qué podés resolver acá" en la sucursal | Enlaza a 5 productos reales más los 2 hubs |
| Imágenes sin `alt` | 0 |
