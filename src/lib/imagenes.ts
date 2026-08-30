/**
 * Registro de imágenes ya entregadas, con los anchos que existen de cada una.
 *
 * POR QUÉ GUARDA LOS ANCHOS: `optimize-images.mjs` no agranda una imagen que
 * ya es chica (`withoutEnlargement`), así que de un original de 500x500 solo
 * sale el ancho de 640. Si el `srcSet` ofreciera igual 1280 y 1920, el
 * navegador pediría archivos que no existen y se comería dos 404 por imagen.
 *
 * CÓMO ACTIVAR UNA IMAGEN
 * 1. Poner el original en `public/img/_source/<ruta>.jpg`
 * 2. Correr `npm run images`, que dice qué anchos generó
 * 3. Agregar acá la ruta base con esos anchos
 *
 * Especificaciones de cada una en `public/img/README.md`.
 */
export const ANCHOS_POSIBLES = [640, 1280, 1920] as const;

/** Ruta base sin sufijo ni extensión, con los anchos realmente generados. */
export const IMAGENES_LISTAS: Record<string, number[]> = {
  "/img/logo-parh": [640],
  "/img/hero/automotor": [640],
  "/img/hero/motovehiculo": [640],
  "/img/hero/hogar": [640],
  "/img/hero/vida": [640],
  "/img/hero/accidentes-personales": [640],
  "/img/hero/retiro": [640],
  "/img/asesores/dinamica-consultora": [640],
};

export function imagenLista(base: string): boolean {
  return base in IMAGENES_LISTAS;
}

/** Ancho más grande disponible, para el `src` de respaldo. */
export function anchoMayor(base: string): number {
  const anchos = IMAGENES_LISTAS[base];
  return anchos ? anchos[anchos.length - 1] : 640;
}

export function srcSet(base: string): string {
  const anchos = IMAGENES_LISTAS[base] ?? [640];
  return anchos.map((w) => `${base}-${w}.webp ${w}w`).join(", ");
}
