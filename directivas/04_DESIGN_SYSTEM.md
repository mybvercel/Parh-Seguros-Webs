# 04. Sistema de diseño PARH

---

## 1. Dirección de arte

**Palabra clave: solidez tranquila.**

El seguro se compra por miedo y se valora por confianza. El diseño no tiene que ser llamativo, tiene que ser creíble. Referencia mental: la sobriedad de un banco privado bien diseñado, no la de una insurtech de Silicon Valley.

Tres principios que gobiernan cada decisión:

1. **Aire antes que densidad.** Espaciado generoso, secciones que respiran. Un sitio apretado se lee como barato.
2. **Una acción obvia por pantalla.** En cada scroll el usuario debe saber cuál es el próximo paso sin pensarlo.
3. **Todo lo que se afirma se muestra.** Nada de "atención diferencial" sin una cara, un nombre, un testimonio o una foto de la oficina al lado.

---

## 2. Color

### 2.1 Origen

Los colores se extrajeron del logo real de PARH mediante muestreo de píxeles:
- Azul dominante: `rgb(32, 48, 128)` aproximado
- Celeste de acento: `rgb(0, 160, 224)` aproximado
- Azul medio de transición: `rgb(0, 80, 144)` aproximado

La paleta se construye a partir de esos tres valores, no de una elección arbitraria.

### 2.2 Tokens de color

```css
/* Azul PARH: identidad, fondos oscuros, texto de titular */
--parh-blue-950: #061436;
--parh-blue-900: #0B1F52;
--parh-blue-800: #12276B;
--parh-blue-700: #183080;  /* PRIMARIO. Extraído del logo */
--parh-blue-600: #21419E;
--parh-blue-500: #2E56C4;

/* Celeste PARH: acento, CTA secundarios, íconos, detalles */
--parh-cyan-700: #00639B;
--parh-cyan-600: #0080C4;
--parh-cyan-500: #00A0E0;  /* ACENTO. Extraído del logo */
--parh-cyan-400: #38BDF0;
--parh-cyan-300: #7FD4F7;
--parh-cyan-100: #D5EEFB;
--parh-cyan-50:  #EDF7FD;  /* fondo de sección suave */

/* Neutrales */
--parh-ink:      #0D1526;  /* texto principal */
--parh-slate-600:#475569;  /* texto secundario */
--parh-slate-400:#94A3B8;  /* texto terciario, placeholders */
--parh-slate-200:#E2E8F0;  /* bordes */
--parh-slate-100:#F1F5F9;  /* fondo alterno */
--parh-slate-50: #F8FAFC;
--parh-white:    #FFFFFF;

/* Semánticos */
--parh-success:  #0E9F6E;
--parh-warning:  #D97706;
--parh-error:    #DC2626;
```

### 2.3 Reglas de uso

| Uso | Color |
|---|---|
| Fondo por defecto de página | `--parh-white` |
| Fondo de sección alterna | `--parh-slate-50` o `--parh-cyan-50` |
| Fondo de sección oscura (hero secundario, CTA final, footer) | `--parh-blue-900` |
| Texto sobre blanco | `--parh-ink` |
| Texto secundario sobre blanco | `--parh-slate-600` |
| Titulares | `--parh-blue-900` |
| Botón primario | fondo `--parh-blue-700`, texto blanco. Hover: `--parh-blue-800` |
| Botón secundario | borde `--parh-slate-200`, texto `--parh-blue-700`, fondo blanco. Hover: fondo `--parh-cyan-50` |
| Botón sobre fondo oscuro | fondo `--parh-cyan-500`, texto `--parh-blue-950` |
| Íconos y detalles de acento | `--parh-cyan-500` |
| Links en texto | `--parh-blue-700` con subrayado de 1 px y offset de 3 px |

### 2.4 Prohibiciones de color

- **Nada de gradientes de marca en botones ni en tarjetas.** Los gradientes azul a violeta son la firma visual de todo sitio generado por IA. Un solo gradiente sutil permitido: el overlay oscuro sobre la imagen del hero, y solo de negro a transparente
- **Nada de morado, violeta, fucsia, lima ni naranja.** La paleta es azul, celeste, blanco y grises. Punto
- **Nada de glassmorphism** (fondos translúcidos con blur sobre formas de colores)
- **Nada de "blobs" ni manchas orgánicas de fondo**
- Máximo dos colores de marca visibles a la vez en una misma sección
- El celeste `--parh-cyan-500` es acento, no fondo de sección grande

### 2.5 Contraste

Todo texto debe cumplir WCAG AA: 4,5:1 en texto normal, 3:1 en texto de 24 px o mayor. Verificar especialmente `--parh-cyan-500` sobre blanco, que **no cumple** para texto pequeño. El celeste sobre blanco se usa solo para íconos, bordes y texto de 24 px en negrita o mayor. Para texto chico sobre blanco usar `--parh-cyan-700`.

---

## 3. Tipografía

### 3.1 Elección

**Titulares: Inter Tight**
**Cuerpo: Inter**

Razones:
- Las dos son de Google Fonts, autohospedables con `next/font/google`, sin request externo y sin costo
- Inter Tight tiene el tracking más cerrado que un titular necesita, sin cambiar de familia. La pareja se ve intencional, no arbitraria
- Inter tiene números tabulares (`font-variant-numeric: tabular-nums`), necesarios para direcciones, teléfonos y sumas aseguradas
- Soporte completo de acentos y `ñ` para español rioplatense
- **No es Poppins** (la fuente actual del sitio y la más usada en templates genéricos), **no es Montserrat**, **no es Roboto**

**Alternativa si se quiere más carácter:** General Sans de Fontshare para titulares, manteniendo Inter en cuerpo. Requiere autohospedar los archivos woff2 a mano. Decisión de Roberto, no bloquea el desarrollo.

**Prohibido:** Poppins, Montserrat, Nunito, Quicksand, Raleway, Playfair Display. Todas leen a plantilla.

### 3.2 Escala tipográfica

Fluida con `clamp()`, mobile primero.

```css
--text-xs:   0.75rem;                                  /* 12px  legales, captions */
--text-sm:   0.875rem;                                 /* 14px  labels, meta */
--text-base: 1rem;                                     /* 16px  cuerpo mobile */
--text-lg:   clamp(1.0625rem, 1rem + 0.3vw, 1.125rem); /* 17-18 cuerpo desktop */
--text-xl:   clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem);  /* 20-24 bajada */
--text-2xl:  clamp(1.5rem, 1.3rem + 1vw, 1.875rem);    /* 24-30 h3 */
--text-3xl:  clamp(1.875rem, 1.6rem + 1.4vw, 2.5rem);  /* 30-40 h2 */
--text-4xl:  clamp(2.25rem, 1.8rem + 2.2vw, 3.5rem);   /* 36-56 h1 */
--text-5xl:  clamp(2.75rem, 2rem + 3.5vw, 4.5rem);     /* 44-72 hero */
```

### 3.3 Reglas tipográficas

| Elemento | Familia | Peso | Tracking | Line height |
|---|---|---|---|---|
| Hero h1 | Inter Tight | 700 | -0.03em | 1.05 |
| h2 | Inter Tight | 700 | -0.02em | 1.15 |
| h3 | Inter Tight | 600 | -0.01em | 1.25 |
| Bajada de sección | Inter | 400 | 0 | 1.5 |
| Cuerpo | Inter | 400 | 0 | 1.65 |
| Botón | Inter | 600 | 0 | 1 |
| Label de formulario | Inter | 500 | 0 | 1.4 |
| Eyebrow (rótulo de sección) | Inter | 600 | 0.08em, mayúsculas | 1 |

- **Medida de línea:** entre 60 y 75 caracteres en cuerpo. `max-width: 65ch`
- **Nada de `text-transform: uppercase`** salvo en el eyebrow de sección y en los labels de las tarjetas de sucursal
- **Nada de Title Case en español.** Solo mayúscula inicial y nombres propios
- **Nada de `font-style: italic`.** Prohibido como recurso decorativo, sin excepciones en titulares, bajadas, testimonios ni citas. Para destacar se usa peso o color, nunca cursiva
- Los testimonios van entre comillas angulares o rectas, en redonda, no en cursiva

---

## 4. Espaciado, radios y sombras

```css
/* Escala de espaciado, base 4px */
--space-1: 0.25rem;  --space-2: 0.5rem;   --space-3: 0.75rem;
--space-4: 1rem;     --space-5: 1.25rem;  --space-6: 1.5rem;
--space-8: 2rem;     --space-10: 2.5rem;  --space-12: 3rem;
--space-16: 4rem;    --space-20: 5rem;    --space-24: 6rem;
--space-32: 8rem;

/* Padding vertical de sección */
--section-y: clamp(3.5rem, 2rem + 6vw, 7rem);

/* Contenedor */
--container-max: 1200px;
--container-pad: clamp(1rem, 0.5rem + 2vw, 2rem);

/* Radios */
--radius-sm: 6px;    /* inputs, badges */
--radius-md: 10px;   /* botones */
--radius-lg: 16px;   /* tarjetas */
--radius-xl: 24px;   /* bloques destacados, imágenes de producto */
--radius-full: 9999px;

/* Sombras: sutiles, azuladas, nunca negras puras */
--shadow-sm: 0 1px 2px rgba(11, 31, 82, 0.06);
--shadow-md: 0 4px 12px rgba(11, 31, 82, 0.08);
--shadow-lg: 0 12px 32px rgba(11, 31, 82, 0.10);
--shadow-hover: 0 8px 24px rgba(11, 31, 82, 0.12);
```

**Regla de radios:** un solo radio por familia de componente. Las tarjetas todas en `--radius-lg`. Nada de mezclar 8, 12 y 20 px en la misma sección.

---

## 5. Grilla y responsive

- **Mobile first, siempre.** Se diseña y se programa a 375 px y se escala hacia arriba
- Breakpoints: `sm 640` · `md 768` · `lg 1024` · `xl 1280`
- Contenedor máximo 1200 px, centrado
- Grilla de productos: 1 columna en mobile, 2 en `md`, 3 en `lg`
- Grilla de sucursales: 1 en mobile, 2 en `md`, 4 en `lg`
- **Se usan container queries** para los componentes de tarjeta, de modo que se adapten al contenedor y no al viewport
- Área táctil mínima 44x44 px en todo elemento interactivo
- **Barra fija inferior en mobile** con `Llamar` y `WhatsApp`, con `padding-bottom: env(safe-area-inset-bottom)`

---

## 6. Componentes

### 6.1 Inventario

| Componente | Base | Notas |
|---|---|---|
| `Button` | shadcn/ui | Variantes: `primary`, `secondary`, `ghost`, `onDark`. Tamaños: `sm`, `md`, `lg` |
| `Header` | custom | Sticky, se achica al hacer scroll, mega-menú en desktop, drawer en mobile |
| `MegaMenu` | Radix NavigationMenu | Dos columnas de productos con ícono y bajada |
| `Hero` | custom | Con toggle Personas / Empresas |
| `SegmentToggle` | Radix Tabs | Cambia la grilla de productos. Estado en URL (`?seg=empresas`) para que sea compartible |
| `ProductCard` | shadcn Card + cult-ui | Imagen, título, bajada, doble CTA |
| `MetricsBar` | custom | 4 métricas con contador animado al entrar en viewport |
| `StepsBlock` | custom | 3 pasos, numerados, con línea conectora en desktop |
| `CarrierLogos` | cult-ui marquee | Logos en escala de grises, color al hover. **Sin autoscroll infinito rápido**, movimiento lento y pausable |
| `Testimonial` | custom | Nombre, localidad, producto, estrellas. Carrusel accesible con Embla |
| `OfficeCard` | custom | Foto, dirección, teléfono, horario, mapa, "Cómo llegar" |
| `Accordion` / `FAQ` | Radix Accordion | Con `FAQPage` schema generado del mismo dato |
| `LeadForm` | react-hook-form + zod | Variantes: `corto` (nombre, whatsapp), `personas`, `empresas` |
| `QuoteModal` | Radix Dialog | Captura antes de derivar al cotizador externo |
| `DiagnosticoWizard` | custom | Multi-paso, barra de progreso, estado en `useReducer`, resultado en cliente |
| `StickyMobileBar` | custom | Llamar + WhatsApp |
| `Breadcrumbs` | custom | Con schema `BreadcrumbList` |
| `Footer` | custom | 4 columnas |

### 6.2 Anatomía de la tarjeta de producto

```
┌────────────────────────────────┐
│  [imagen 4:3, WebP, radius-lg] │
│                                │
├────────────────────────────────┤
│  Seguro Automotor        (h3)  │
│  Coberturas para tu auto,      │
│  camioneta, casa rodante,      │
│  tráiler y más.          (p)   │
│                                │
│  [Ver cobertura] [Cotizar]     │
└────────────────────────────────┘
```

- Toda la tarjeta es clicable hacia la página de producto, con el botón `Cotizar` como acción anidada
- Hover: elevación de `--shadow-md` a `--shadow-hover` y desplazamiento de 2 px hacia arriba, en 200 ms
- Sin borde y sombra al mismo tiempo. Se elige uno

---

## 7. Movimiento

Se usa **Motion (antes Framer Motion)**, con moderación.

| Dónde | Qué | Duración |
|---|---|---|
| Entrada de secciones | fade + translateY de 16 px, `whileInView` con `once: true` | 400 ms, `ease: [0.16, 1, 0.3, 1]` |
| Hover de tarjeta | elevación + 2 px arriba | 200 ms |
| Header al hacer scroll | reducción de altura y aparición del borde inferior | 250 ms |
| Toggle Personas / Empresas | crossfade del contenido con `AnimatePresence` | 250 ms |
| Acordeón | altura animada por Radix | 200 ms |
| Contadores de métricas | conteo desde 0 al entrar en viewport, una sola vez | 1200 ms |
| Wizard del diagnóstico | slide horizontal entre pasos | 300 ms |

**Reglas:**
- `prefers-reduced-motion: reduce` desactiva todo movimiento no esencial. Obligatorio
- Sin parallax en el hero. Sin scroll hijacking. Sin animaciones que se disparen dos veces
- Sin efectos de texto letra por letra
- Sin marquee rápido. El carrusel de logos se mueve lento y se pausa al hover
- Nada debe demorar el LCP

---

## 8. Reglas duras anti "esto lo hizo una IA"

Esta sección se aplica en la revisión de cada componente y de cada línea de copy. Si algo de la lista aparece, se rechaza.

### 8.1 En el copy

| Prohibido | Por qué | Qué se usa en su lugar |
|---|---|---|
| Guion largo `—` o `–` o `--` | Es el tic más reconocible del texto generado. **Regla de tolerancia cero en todo el sitio** | Punto, coma, dos puntos o paréntesis |
| Cursiva decorativa | Segunda marca más reconocible | Peso 600 o color |
| Etiquetas y pills sobre el titular ("Nuevo", "Con IA", "★ Destacado") | Ruido de template | Nada. Si el titular necesita una etiqueta, el titular está mal |
| Emojis en el copy | No corresponde al rubro | Íconos SVG de la librería |
| "En un mundo donde...", "En la era de..." | Apertura de ensayo generado | Ir directo al beneficio |
| "No es solo X, es Y" | Estructura antitética de IA | Una afirmación simple |
| "Elevá", "Desbloqueá", "Potenciá", "Transformá", "Revolucioná" | Verbos de marketing vacío | Verbos concretos: comparamos, cotizamos, te acompañamos |
| Tríadas de adjetivos ("rápido, simple y confiable") | Ritmo de IA | Un adjetivo, o ninguno |
| "Descubrí el poder de" | Cliché | El beneficio directo |
| Preguntas retóricas como titular ("¿Sabías que...?") | Relleno | Afirmación |
| Superlativos sin dato ("los mejores", "líderes") | No es creíble ni legalmente prolijo | Datos verificables |

### 8.2 En la UI

| Prohibido | Qué se hace en su lugar |
|---|---|
| Gradiente azul a violeta en botones o fondos | Color plano |
| Glassmorphism | Superficie sólida con sombra sutil |
| Blobs orgánicos de fondo | Fondo plano o imagen real |
| Tres tarjetas idénticas con ícono genérico y dos líneas de texto | Contenido con densidad y jerarquía distintas por tarjeta |
| Íconos de línea genéricos para "Seguridad", "Rapidez", "Confianza" | Íconos que representen algo concreto (auto, casa, moto, local) o directamente fotos |
| Fotos de stock de gente de traje dándose la mano | Fotos reales de las oficinas y del equipo. Si no hay, mejor sin foto |
| Hero centrado con dos botones y un mockup flotante | Hero asimétrico con imagen real y una sola acción principal |
| Sombras negras difusas gigantes | Sombras azuladas sutiles de la escala definida |
| Avatares generados o testimonios inventados | Testimonios reales con nombre y localidad, o sin testimonios |
| Contadores animados con números redondos falsos | Números reales confirmados por Roberto |
| Dark mode sin motivo | El sitio es claro. Sin toggle de tema |
| Bordes de 1 px en todo | Separar con espacio y fondo, no con líneas |

### 8.3 Checklist de revisión antes de aprobar cualquier pantalla

- [ ] `grep` de `—`, `–` y `--` en todos los archivos de contenido: cero resultados
- [ ] `grep` de `italic`: cero resultados en clases de utilidad
- [ ] Ninguna sección tiene tres tarjetas iguales con ícono decorativo
- [ ] Cada afirmación de la página tiene un respaldo visible cerca
- [ ] Un lector que no conoce PARH puede decir en qué ciudad opera en menos de 5 segundos
- [ ] La pantalla se ve bien en 375 px sin scroll horizontal
- [ ] Todo el texto de la pantalla podría haberlo escrito Roberto

---

## 9. Manifiesto de imágenes

Las imágenes las genera Roberto por IA. Se programa con placeholders del tamaño exacto y estas especificaciones. Ver `/public/img/README.md` que se creará en la fase de programación.

| Archivo | Uso | Dimensiones | Aspecto | Notas de contenido |
|---|---|---|---|---|
| `hero-home.webp` | Hero de la Home | 1920x1080 | 16:9 | Escena cálida y realista. Familia o comerciante argentino. Nada de traje corporativo genérico |
| `seguro-automotor.webp` | Tarjeta y hero de producto | 1200x900 | 4:3 | Auto en calle de barrio argentino |
| `seguro-motovehiculo.webp` | idem | 1200x900 | 4:3 | Moto urbana |
| `seguro-hogar.webp` | idem | 1200x900 | 4:3 | Casa de barrio del conurbano |
| `seguro-vida.webp` | idem | 1200x900 | 4:3 | Familia, tono cálido, sin dramatismo |
| `seguro-retiro.webp` | idem | 1200x900 | 4:3 | Pareja mayor, luz natural |
| `accidentes-personales.webp` | idem | 1200x900 | 4:3 | Persona trabajando, oficio |
| `responsabilidad-civil.webp` | idem | 1200x900 | 4:3 | Obra o profesional en actividad |
| `integral-comercio.webp` | idem | 1200x900 | 4:3 | Local comercial de barrio |
| `seguro-tecnico.webp` | idem | 1200x900 | 4:3 | Maquinaria o equipo electrónico |
| `oficina-moron.webp` | Página de sucursal | 1600x1000 | 16:10 | **Foto real de la oficina**, no IA |
| `oficina-marcos-paz.webp` | idem | 1600x1000 | 16:10 | Foto real |
| `oficina-mercedes.webp` | idem | 1600x1000 | 16:10 | Foto real |
| `oficina-lujan.webp` | idem | 1600x1000 | 16:10 | Foto real |
| `equipo.webp` | Página Nosotros | 1600x1000 | 16:10 | **Foto real del equipo.** Este es el activo de confianza más importante de todo el sitio |
| `og-default.webp` | Open Graph | 1200x630 | 1.91:1 | Logo sobre fondo azul + claim |
| `og-[seccion].webp` | Open Graph por sección | 1200x630 | 1.91:1 | Uno por rama de producto |
| Logos de compañías | Franja de carriers | SVG o PNG 400px de ancho | libre | Federación Patronal, San Cristóbal, ATM, Cardinal, Banco del Sol, SeguroCell. **Pedir autorización de uso de marca a cada compañía antes de publicar** |

**Reglas para las imágenes generadas por IA:**
- Fotorrealistas, nunca ilustración vectorial ni 3D
- Luz natural, tonos que convivan con el azul de la paleta
- Contexto argentino reconocible (calles, casas, autos, comercios de acá)
- Sin texto dentro de la imagen
- Sin manos ni caras en primer plano si el generador no las resuelve bien
- Todas convertidas a WebP con calidad 80 antes de subir
- Cada una necesita su `alt` descriptivo escrito a mano

---

## 10. Accesibilidad (mínimos no negociables)

- Contraste AA en todo el texto
- Foco visible con `outline: 2px solid var(--parh-cyan-500); outline-offset: 2px` en todos los elementos interactivos
- Navegación completa por teclado, incluidos el mega-menú, el carrusel y el wizard
- `aria-label` en los botones que solo tienen ícono
- Formularios con `<label>` real asociado, errores anunciados con `aria-live`
- Skip link "Ir al contenido" como primer elemento enfocable
- Landmarks semánticos: `header`, `nav`, `main`, `footer`, `section` con `aria-labelledby`
- Los mapas embebidos con `title` en el `iframe`
- `prefers-reduced-motion` respetado
