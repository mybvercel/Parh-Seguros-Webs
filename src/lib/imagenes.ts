/**
 * Registro de imágenes ya entregadas.
 *
 * Roberto genera las imágenes de producto por IA y todavía no están. Mientras
 * tanto el componente `<Imagen>` dibuja un placeholder con el nombre de archivo
 * y la proporción exacta que espera, así el layout ya queda definitivo y el
 * reemplazo no mueve nada.
 *
 * CÓMO ACTIVAR UNA IMAGEN
 * 1. Poner el original en `public/img/_source/<ruta>.jpg`
 * 2. Correr `npm run images`
 * 3. Agregar la ruta base a esta lista
 *
 * Especificaciones de cada una en `public/img/README.md`.
 */
export const IMAGENES_LISTAS = new Set<string>([
  "/img/logo-parh",
  "/img/hero/automotor",
  "/img/hero/motovehiculo",
  "/img/hero/hogar",
  "/img/hero/vida",
  "/img/hero/accidentes-personales",
  "/img/hero/retiro",
]);

export function imagenLista(base: string): boolean {
  return IMAGENES_LISTAS.has(base);
}

/** Anchos que genera `scripts/optimize-images.mjs`. */
export const ANCHOS = [640, 1280, 1920] as const;

export function srcSet(base: string): string {
  return ANCHOS.map((w) => `${base}-${w}.webp ${w}w`).join(", ");
}
