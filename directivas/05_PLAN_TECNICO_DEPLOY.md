# 05. Plan técnico, stack y despliegue

---

## 1. La pregunta del hosting, resuelta

**Contexto:** el sitio está en CloudPanel (Nginx) con un site builder PHP. No tenés acceso directo al panel y no sabés si admite otros lenguajes.

**Respuesta corta: sí se puede, y hay tres caminos.** CloudPanel soporta nativamente sitios Node.js con reverse proxy de Nginx y gestión de versión de Node y puerto de la app desde el panel ([documentación de CloudPanel](https://www.cloudpanel.io/docs/v2/frontend-area/settings/), [guía de instalación de apps Node en CloudPanel](https://www.bitdoze.com/install-cloudpanel-host-nodejs/)).

Ahora bien, la mejor decisión técnica no es la que más se puede, es la que menos depende de un panel que no controlás.

### Comparación de opciones

| | **A. Next.js export estático a CloudPanel** | **B. Next.js Node en CloudPanel** | **C. Vercel + DNS** |
|---|---|---|---|
| Cómo funciona | `output: 'export'` genera HTML, CSS y JS puros. Se suben por SFTP a la carpeta actual del sitio | Se crea un site tipo Node.js, se corre con PM2 en un puerto, Nginx hace reverse proxy | Se despliega en Vercel y se apuntan los DNS de parh.com.ar |
| Requiere acceso a CloudPanel | Solo SFTP o el file manager | Sí, acceso completo al panel más SSH | No, solo acceso al panel de DNS del dominio |
| Riesgo de que no funcione | **Muy bajo.** Es HTML estático, anda en cualquier servidor | Medio. Depende de versión de Node, permisos, PM2, systemd | Bajo, pero mueve el hosting fuera del control del cliente |
| SSR, ISR, rutas API | No | Sí | Sí |
| Formularios | Necesita endpoint externo (ver sección 5) | Route Handlers de Next | Route Handlers de Next |
| Velocidad | Máxima. Nginx sirviendo archivos | Muy buena | Muy buena, con CDN global |
| Costo | Cero adicional | Cero adicional | Gratis en Hobby, pago si es comercial |
| Rollback | Copiar la carpeta anterior | Reiniciar PM2 con el build anterior | Un clic |
| Mantenimiento | Ninguno | Actualizaciones de Node, PM2 caído, reinicios | Ninguno |

### Decisión recomendada: **Opción A, export estático a CloudPanel**

Razones:

1. **El sitio no necesita servidor.** Son 22 páginas de contenido, sin login, sin base de datos, sin catálogo dinámico. Todo se puede prerenderizar en build.
2. **No dependés de que CloudPanel coopere.** Subís archivos y listo. Si mañana el cliente cambia de hosting, el sitio se mueve en cinco minutos.
3. **SEO idéntico o mejor.** El HTML sale prerenderizado con todos los metadatos y el JSON-LD. Google no distingue estático de SSR.
4. **Cero superficie de ataque.** No hay proceso Node corriendo, no hay PHP ejecutándose, no hay versiones que parchear.
5. **Seguís desarrollando en Next.js, React, TypeScript y Tailwind**, que es lo que pediste. El export es solo el formato de salida.

**Plan B, por si aparece un requisito que exija servidor:** migrar a la opción B (Node en CloudPanel) o C (Vercel). El código es el mismo, solo cambia `next.config.ts`. No hay que reescribir nada.

### Sobre hacerlo en PHP

Se puede, pero no conviene. Un sitio PHP a mano implicaría reconstruir el sistema de componentes, el manejo de rutas, la optimización de imágenes y el build de CSS que Next.js ya trae resuelto. El único argumento a favor de PHP era la compatibilidad con el hosting, y el export estático la resuelve mejor: **el resultado final que se sube al servidor es HTML plano, todavía más compatible que PHP.**

La única pieza que sí conviene resolver en PHP es el endpoint de envío del formulario. Ver sección 5.

---

## 2. Stack

| Capa | Elección | Versión | Por qué |
|---|---|---|---|
| Framework | Next.js, App Router | 15.x | Pedido explícito. `output: 'export'` para estático |
| Runtime UI | React | 19.x | Va con Next 15 |
| Lenguaje | TypeScript | 5.x, `strict: true` | Menos errores en tiempo de build |
| Estilos | Tailwind CSS | v4 | Config en CSS con `@theme`, sin `tailwind.config.js` |
| Componentes base | shadcn/ui | latest | Componentes en el repo, no dependencia. Radix por debajo, accesible |
| Componentes de efecto | **cult-ui** | latest | Pedido explícito. Se usa selectivamente, ver sección 3 |
| Primitivas accesibles | Radix UI | via shadcn | Dialog, Accordion, Tabs, NavigationMenu |
| Animación | Motion (ex Framer Motion) | 12.x | Solo lo definido en el doc 04, sección 7 |
| Íconos | Lucide React | latest | Consistente, tree-shakeable |
| Formularios | react-hook-form + zod | latest | Validación tipada, mensajes en español |
| Carrusel | Embla Carousel | latest | Accesible y liviano |
| Fuentes | `next/font/google` | nativo | Autohospedadas, sin request a Google |
| Imágenes | `next/image` con loader custom | nativo | En export estático se usa `unoptimized: true` y se preoptimizan las imágenes con `sharp` en un script de build |
| Analítica | GA4 + Meta Pixel via `next/script` | nativo | Carga en `afterInteractive` |
| Lint y formato | ESLint + Prettier | latest | Regla custom para prohibir el guion largo, ver sección 7 |

**Sin instalar:** ninguna librería de UI adicional, ningún CMS, ninguna base de datos, ninguna dependencia de gráficos. El contenido va en archivos TypeScript tipados dentro de `/content`.

---

## 3. Instalación de shadcn/ui y cult-ui

### 3.1 Orden de comandos

```bash
npx create-next-app@latest parh-web --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

```bash
cd parh-web
npx shadcn@latest init
```

```bash
npx shadcn@latest add button card accordion dialog tabs navigation-menu input textarea select label form separator sheet badge
```

cult-ui se consume por el registro de shadcn, no como paquete npm:

```bash
npx shadcn@latest add https://cult-ui.com/r/[componente].json
```

Componentes de cult-ui candidatos, a evaluar uno por uno contra las reglas anti-slop del doc 04:

| Componente cult-ui | Uso previsto | Riesgo |
|---|---|---|
| `texture-card` | Tarjetas de producto | Bajo. Aporta textura sutil |
| `marquee` / logo carousel | Franja de compañías | Bajo, si se configura lento y pausable |
| `family-button` | Botón flotante de contacto en mobile | Medio. Evaluar si no compite con la barra fija |
| `dynamic-island` | Descartado | Alto. Es efectista, no corresponde al rubro |
| `gradient-heading` | **Descartado** | Alto. Los gradientes en titulares están prohibidos |
| `bg-animate-*` | **Descartado** | Alto. Blobs y fondos animados prohibidos |

**Criterio:** cult-ui entra donde suma sofisticación real. Todo componente que agregue gradiente, blob, glass o efecto llamativo se descarta, sin importar lo bien hecho que esté.

### 3.2 Skills de emilkowalski

```bash
npx skills@latest add emilkowalski/skills
```

Emil Kowalski es el autor de Sonner y Vaul, y sus skills apuntan a la calidad del detalle en animación e interacción de interfaz. Se instalan y se usan como guía de revisión para el doc 04 sección 7. Lo que aporte se toma, lo que choque con la sobriedad del rubro se descarta.

### 3.3 Instalación de las skills locales del proyecto

Las skills de `Parh Seguros/Skills/` se copian a `.claude/skills/` del proyecto para que estén activas:

```
.claude/skills/
├── frontend-design/          desde Skills/Frontend/Diseño Frontend/
├── visual-design-foundations/
├── interaction-design/
├── responsive-design/
├── brand-guidelines/
├── color-palette/
├── design-system-patterns/
├── design-system-starter/
├── seo-audit/
├── seo-meta/
├── schema-markup/
├── responsive-images/
├── programmatic-seo/
├── audit-website/
├── api-design-principles/
├── architecture-decision-records/
├── architecture-patterns/
├── error-handling-patterns/
├── reducing-entropy/
├── nodejs-backend-patterns/
└── backend-to-frontend-handoff-docs/
```

Cada carpeta necesita su `SKILL.md` con frontmatter (`name`, `description`). El .md original se renombra o se envuelve.

---

## 4. Estructura del proyecto

```
parh-web/
├── .claude/
│   ├── skills/                    Skills instaladas
│   └── settings.local.json
├── directivas/                    Los 6 documentos de este plan
├── public/
│   ├── img/
│   │   ├── README.md              Manifiesto de imágenes con specs
│   │   ├── productos/
│   │   ├── oficinas/
│   │   ├── companias/
│   │   └── og/
│   ├── favicon.ico, icon.svg, apple-icon.png
│   └── robots.txt
├── scripts/
│   ├── optimize-images.mjs        sharp: convierte a WebP y genera tamaños
│   └── check-copy.mjs             falla el build si encuentra guion largo o italic
├── src/
│   ├── app/
│   │   ├── layout.tsx             fuentes, JSON-LD global, Header, Footer
│   │   ├── page.tsx               Home
│   │   ├── not-found.tsx
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   ├── seguros/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx    generateStaticParams desde /content
│   │   ├── empresas/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── oficinas/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── cotizar/page.tsx
│   │   ├── diagnostico/page.tsx
│   │   ├── nosotros/page.tsx
│   │   ├── contacto/page.tsx
│   │   ├── gracias/page.tsx
│   │   ├── politica-de-privacidad/page.tsx
│   │   └── terminos-y-condiciones/page.tsx
│   ├── components/
│   │   ├── ui/                    shadcn + cult-ui
│   │   ├── layout/                Header, Footer, MegaMenu, StickyMobileBar
│   │   ├── sections/              Hero, MetricsBar, StepsBlock, CarrierLogos,
│   │   │                          ProductGrid, Testimonials, OfficesGrid, FaqSection, FinalCta
│   │   ├── forms/                 LeadForm, QuoteModal, DiagnosticoWizard
│   │   └── seo/                   JsonLd, Breadcrumbs
│   ├── content/                   FUENTE DE VERDAD DEL CONTENIDO
│   │   ├── productos-personas.ts
│   │   ├── productos-empresas.ts
│   │   ├── oficinas.ts
│   │   ├── companias.ts
│   │   ├── testimonios.ts
│   │   ├── faqs.ts
│   │   ├── metricas.ts
│   │   └── diagnostico.ts         preguntas, ramas y reglas de los puntos ciegos
│   ├── lib/
│   │   ├── schema.ts              generadores de JSON-LD
│   │   ├── analytics.ts           wrapper de eventos
│   │   ├── whatsapp.ts            armado de links con mensaje prellenado
│   │   └── utils.ts
│   └── styles/
│       └── globals.css            @theme de Tailwind v4 con los tokens del doc 04
├── next.config.ts
├── tsconfig.json
└── package.json
```

**Principio clave:** todo el texto vive en `/src/content/*.ts`, tipado. Ningún string de contenido hardcodeado en un componente. Esto permite auditar el copy de todo el sitio con un solo `grep` y hace trivial la corrección de textos sin tocar la UI.

---

## 5. Formularios: cómo se envían sin servidor Node

Cuatro formularios: contacto general, lead corto de producto, lead de empresas y el diagnóstico.

### Solución recomendada: endpoint PHP propio en el mismo dominio

Un solo archivo `public/api/lead.php` que se sube junto al build. El servidor ya corre PHP, así que funciona sin configurar nada.

Responsabilidades del endpoint:
1. Validar el origen (`Origin` o `Referer` del propio dominio)
2. Honeypot: campo oculto que, si viene lleno, descarta el envío en silencio
3. Rate limit simple por IP en archivo temporal
4. Validar y sanitizar los campos
5. Enviar el mail a `info@parh.com.ar` con `mail()` o SMTP autenticado (preferible SMTP, `mail()` termina en spam)
6. Guardar una línea en un CSV local como respaldo
7. Devolver JSON `{ ok: true }`
8. El front redirige a `/gracias/`

**Endurecimiento obligatorio:** sin `mail()` con headers construidos por concatenación de input del usuario (riesgo de header injection). Validar el email con `filter_var`. Nunca interpolar input en el `Subject` ni en el `From`.

### Alternativas si no hay acceso para subir el PHP

| Opción | Costo | Pro | Contra |
|---|---|---|---|
| Web3Forms | Gratis hasta 250/mes | Cero backend, un `access_key` | Los datos pasan por un tercero |
| Formspree | Gratis 50/mes, luego pago | Panel con historial | Límite bajo |
| Resend + Cloudflare Worker | Gratis en tiers bajos | Control total, dominio propio | Requiere configurar DNS y SPF/DKIM |

**Decisión:** intentar primero el PHP propio. Si no se consigue acceso de escritura, Web3Forms como puente y migrar después.

### WhatsApp como canal paralelo

Todos los CTA de WhatsApp arman el link con mensaje prellenado según el contexto:

```
https://wa.me/5491122405022?text=Hola%20PARH,%20quiero%20cotizar%20un%20seguro%20de%20[producto]%20(vengo%20de%20la%20web)
```

El helper vive en `lib/whatsapp.ts` y dispara el evento `whatsapp_click` antes de navegar.

---

## 6. Configuración de Next.js

```ts
// next.config.ts
import type { NextConfig } from 'next'

const config: NextConfig = {
  output: 'export',
  trailingSlash: true,        // genera /ruta/index.html, coincide con las URLs actuales
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: false },
  typescript: { ignoreBuildErrors: false },
}

export default config
```

`trailingSlash: true` es importante: el sitio actual usa `/Inicio/` con barra final, y mantenerlo evita una capa extra de redirecciones.

Las imágenes se preoptimizan con `scripts/optimize-images.mjs` (sharp) antes del build, generando WebP en tres anchos por imagen, y los componentes usan `<picture>` con `srcset`.

---

## 7. Guardarraíles automáticos anti IA

Un script que corre en `pretest` y en CI, y que **falla el build**:

```js
// scripts/check-copy.mjs
// Recorre src/content/**/*.ts y src/**/*.tsx
// Falla si encuentra:
//   1. Los caracteres — (U+2014) o – (U+2013) en cualquier string
//   2. La secuencia " -- "
//   3. La clase "italic" o "font-italic" o style fontStyle: 'italic'
//   4. Emojis en archivos de /content
//   5. Cualquier término de la lista negra del doc 04 sección 8.1
```

Regla de ESLint complementaria: `no-restricted-syntax` sobre literales de texto que contengan esos caracteres.

Esto convierte la instrucción "que no parezca IA" en algo que la máquina verifica sola en cada commit, no en algo que depende de que alguien se acuerde de revisarlo.

---

## 8. Proceso de despliegue

### Fase de staging

1. Subdominio `nuevo.parh.com.ar` apuntando a una carpeta distinta en CloudPanel, o preview de Vercel
2. `robots.txt` con `Disallow: /` en staging para que Google no lo indexe
3. Roberto revisa y aprueba

### Día del deploy

1. Backup completo del sitio actual (archivos y configuración de Nginx) antes de tocar nada
2. `npm run build` genera el HTML estático en `.next-build/` (no en `/out`: el proyecto separa el directorio de build de dev y de producción, ver bitácora sprint 4)
3. Subir el contenido de `.next-build/` a la raíz del sitio por SFTP
4. Subir `api/lead.php`
5. Aplicar las 301 en Nginx (`location = /Inicio/ { return 301 /; }` y las demás del doc 03 sección 5.1)
6. Verificar SSL y redirección de http a https
7. Probar los 4 formularios en producción
8. Enviar el nuevo `sitemap.xml` a Google Search Console
9. Solicitar reindexación de la Home
10. Verificar el `robots.txt` (hoy da 404)
11. Correr Lighthouse y PageSpeed Insights
12. Validar el JSON-LD con la Rich Results Test de Google
13. Confirmar que GA4 y el Pixel registran eventos

### Rollback

La carpeta del sitio anterior queda respaldada en el servidor. Volver atrás es renombrar dos carpetas. Menos de 2 minutos.

### Post deploy, primeras 2 semanas

- Monitorear cobertura y errores 404 en Search Console
- Revisar posiciones de las keywords principales
- Contar leads por formulario
- Ajustar copy según el comportamiento real

---

## 9. Rendimiento objetivo

| Métrica | Objetivo | Actual estimado |
|---|---|---|
| Lighthouse Performance (mobile) | mayor o igual a 95 | por debajo de 60 |
| Lighthouse Accessibility | 100 | por debajo de 70 (17 imágenes sin alt) |
| Lighthouse Best Practices | mayor o igual a 95 | |
| Lighthouse SEO | 100 | por debajo de 80 |
| LCP | menor a 2,0 s | |
| CLS | menor a 0,05 | |
| INP | menor a 200 ms | |
| Peso de la Home | menor a 500 KB | por encima de 2 MB |
| Requests de la Home | menor a 30 | 62 |
