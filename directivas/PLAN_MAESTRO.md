# PARH Seguros. Plan maestro del rediseño

Proyecto independiente. No comparte código, stack ni contexto con ningún otro trabajo.
Cliente: Roberto Corvalán, Grupo PARH Bróker de Seguros.
Fecha del plan: 4 de agosto de 2026.

---

## Documentos

| Doc | Contenido |
|---|---|
| [01_AUDITORIA.md](directivas/01_AUDITORIA.md) | Auditoría técnica, SEO, UX y de negocio del sitio actual. Cuellos de botella y cliente ideal |
| [02_BENCHMARK.md](directivas/02_BENCHMARK.md) | Análisis de Worth, Heffernan y NEXT. Qué se toma, qué se descarta. Estructura final de la Home |
| [03_ESTRATEGIA_ARQUITECTURA_SEO.md](directivas/03_ESTRATEGIA_ARQUITECTURA_SEO.md) | Posicionamiento, lead magnet, mapa del sitio, copy verbatim, metadatos, schema, redirecciones y medición |
| [04_DESIGN_SYSTEM.md](directivas/04_DESIGN_SYSTEM.md) | Color, tipografía, espaciado, componentes, movimiento, reglas anti IA y manifiesto de imágenes |
| [05_PLAN_TECNICO_DEPLOY.md](directivas/05_PLAN_TECNICO_DEPLOY.md) | Stack, resolución del problema de hosting CloudPanel, estructura del repo, formularios y despliegue |
| [06_ROADMAP.md](directivas/06_ROADMAP.md) | 10 sprints con tareas y criterios de aceptación. Lista de bloqueantes para Roberto |

---

## Resumen en una página

### El problema

parh.com.ar tiene **4 URLs, de las cuales 3 son copias literales entre sí**. La cuarta, `/Sobre-nosotros/`, todavía muestra texto de la plantilla sin editar: un teléfono español `+34 917 81 68 62`, el mail `info@site.info` y la frase "Añade el lema de tu negocio haciendo doble clic".

Medido, el on-page está muy por debajo del mínimo: el `<title>` de la home es literalmente `Inicio`, la meta description está vacía, hay 4 `<h1>`, las **17 imágenes no tienen `alt`**, no hay una sola línea de Schema.org, no hay `canonical`, `robots.txt` devuelve 404 y las imágenes pesan 1,9 MB sin un solo WebP.

El sitio posiciona por marca y por Google Business Profile, no por la web. Hay ranking sobre la mesa que nadie está levantando.

### El problema de negocio, que es más grave

1. **La web deriva, no captura.** Seis de los siete CTA de la home mandan al usuario afuera del dominio. El dato del prospecto queda en el sistema de Federación Patronal o de San Cristóbal, no en el de PARH. Quien abandona el cotizador a mitad de camino se pierde para siempre.
2. **El producto de mayor margen está escondido.** Responsabilidad Civil, Integral de Comercio y Seguro Técnico no aparecen en la home ni en el menú. Viven en un acordeón dentro de la página con texto de plantilla.
3. **Cuatro oficinas sin presencia digital local.** Morón, Marcos Paz, Mercedes y Luján, cuatro mercados con demanda real y competencia casi nula, reducidos a cuatro links a Google Maps.
4. **La promesa no está demostrada.** "Atención diferencial" sin un testimonio, sin una cara, sin un logo de compañía y sin un número.
5. **Cero medición.** Sin Analytics, sin Pixel, sin página de gracias. Roberto no puede saber cuántos clientes le trajo la web.

### La solución

**22 páginas** en lugar de 4, construidas en Next.js 15 con React 19, TypeScript y Tailwind v4, sobre shadcn/ui y cult-ui.

- Home con toggle **Personas / Empresas** que resuelve de una la invisibilidad del segmento rentable
- **10 páginas de producto**, cada una con su URL, su schema y su formulario
- **4 landings de sucursal** con schema `InsuranceAgency`, la mayor oportunidad de SEO local del proyecto
- **Captura antes de derivar:** un modal de un paso antes de mandar al cotizador de la compañía. Recupera entre el 30 y el 50 % de los datos que hoy se pierden por completo
- **Lead magnet propio:** "Diagnóstico de cobertura en 90 segundos". Seis preguntas y devuelve los puntos ciegos de la cobertura del usuario. Captura el dato más valioso del negocio, que es la **fecha de vencimiento de la póliza actual**
- **Prueba social visible:** logos de las 6 compañías, testimonios con nombre y localidad, fotos reales de las oficinas y del equipo, métricas verificables
- Bloque **"Cómo trabajamos"** en 3 pasos, que hoy no existe y explica para qué sirve un bróker
- SEO completo: metadatos por página, JSON-LD, WebP con `srcset`, sitemap, robots y las 301 desde las URLs viejas

### El hosting, resuelto

CloudPanel sí soporta Node.js, pero la mejor decisión es no depender de eso. Se compila Next.js con `output: 'export'` y se suben **archivos HTML, CSS y JS puros** a la carpeta actual del sitio. Anda en cualquier servidor, es más rápido que PHP, no requiere tocar la configuración del panel y el rollback es renombrar una carpeta. El desarrollo sigue siendo Next.js, React y Tailwind tal como pediste. Solo el formulario necesita un endpoint, y ese sí conviene en PHP porque el servidor ya lo corre.

### El copy

**No se inventa nada.** El texto actual de PARH se usa literal. Las únicas correcciones autorizadas son tildes, el Title Case forzado (que en español es un error tipográfico), el texto de plantilla que quedó publicado y el año del footer. Se escribe texto nuevo solo donde hoy no hay nada, en el mismo registro rioplatense.

### Que no parezca hecho con IA

No es una intención, es un guardarraíl automático. Un script corre en cada build y **falla la compilación** si encuentra un guion largo, una cursiva decorativa, un emoji en el contenido o cualquier término de la lista negra. Más una checklist de UI que prohíbe gradientes de marca, glassmorphism, blobs, las tres tarjetitas con ícono genérico y las fotos de stock de gente de traje.

---

## Decisiones ya tomadas

| Decisión | Valor |
|---|---|
| Modelo de referencia | Worth Insurance, con bloques de conversión de NEXT y el argumento de independencia de Heffernan |
| Stack | Next.js 15 + React 19 + TypeScript + Tailwind v4 + shadcn/ui + cult-ui + Motion |
| Salida | Export estático a CloudPanel. Plan B: Node en CloudPanel o Vercel |
| Color primario | `#183080`, extraído por muestreo del logo real |
| Color de acento | `#00A0E0`, extraído del logo real |
| Tipografía | Inter Tight en titulares, Inter en cuerpo. Prohibida Poppins, que es la actual |
| Formularios | Endpoint PHP propio. Alternativa: Web3Forms |
| Lead magnet | Diagnóstico de cobertura interactivo de 6 pasos |
| Páginas fase 1 | 22 |

---

## Qué sigue

1. **Roberto revisa y aprueba el plan.**
2. Roberto junta los 13 insumos bloqueantes listados al final del doc 06 (fotos de oficinas, foto del equipo, horarios, matrícula SSN, testimonios, números reales, accesos).
3. Arranca el **Sprint 0** de la fase de programación.

Las imágenes de producto generadas por IA las hace Roberto. Se programa con placeholders del tamaño exacto y un manifiesto con las especificaciones de cada una, en el doc 04 sección 9.
