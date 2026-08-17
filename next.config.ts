import type { NextConfig } from "next";

/*
  Salida estática. Doc 05 sección 1, opción A.
  `npm run build` genera HTML, CSS y JS puros que se suben por SFTP a la
  carpeta actual del sitio en CloudPanel. No hace falta Node en el server.

  Con output: 'export', el HTML final se escribe directo en `distDir` (no en
  un /out separado): así lo documenta Next cuando distDir no es el default.
  Como abajo distDir es ".next-build" en producción, ESA es la carpeta que se
  sube al servidor, no "/out". Confirmado en bitácora, sprint 4.

  trailingSlash: true mantiene el formato de URL que ya usa parh.com.ar
  (/Inicio/, /Oficinas/), así las 301 son uno a uno y no hay saltos extra.

  images.unoptimized es obligatorio con output: 'export'. Las imágenes se
  preoptimizan a WebP con scripts/optimize-images.mjs antes del build.
*/
const nextConfig: NextConfig = {
  // `next dev` y `next build` comparten .next y en Windows se pisan: el dev
  // server termina sirviendo CSS parcial y webpack a veces crashea al escribir.
  // Con directorios separados el problema desaparece. Ver bitácora, hallazgo 6.
  // Efecto colateral (esperado): el export estático sale en esta carpeta.
  distDir: process.env.NODE_ENV === "production" ? ".next-build" : ".next",
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  experimental: {
    // shadcn importa desde el barrel `radix-ui` (import { Slot } from "radix-ui").
    // Sin esto, un solo Button arrastra buena parte del paquete al bundle.
    optimizePackageImports: ["radix-ui"],
  },
};

export default nextConfig;
