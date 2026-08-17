import { ImageOff } from "lucide-react";

import { imagenLista, srcSet } from "@/lib/imagenes";
import { cn } from "@/lib/utils";

/**
 * Imagen responsive con srcset real. Doc 03 sección 5.6 y doc 05 sección 6.
 *
 * Con `output: 'export'` no hay optimizador de Next en runtime: `next/image`
 * con `unoptimized` sirve un único archivo y no puede generar variantes de
 * ancho a partir de un solo `src`. Como sí generamos tres anchos reales con
 * `scripts/optimize-images.mjs` (sharp), acá se arma un `<img>` con `srcSet`
 * nativo del navegador en lugar de forzarlo dentro de `next/image`.
 *
 * Doc 04 sección 9: las imágenes de producto las genera Roberto por IA y hoy
 * no existen. Mientras no estén en `IMAGENES_LISTAS`, se dibuja un marcador
 * con la proporción exacta y el nombre del archivo que falta, para que el
 * layout final ya quede correcto y el reemplazo no mueva nada.
 */
export function Imagen({
  base,
  alt,
  aspect = "4/3",
  priority = false,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  className,
}: {
  base: string;
  alt: string;
  aspect?: "16/9" | "4/3" | "16/10" | "1.91/1";
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const relacion = aspect.replace("/", " / ");

  if (!imagenLista(base)) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex flex-col items-center justify-center gap-2 bg-parh-slate-100 text-parh-slate-400",
          className,
        )}
        style={{ aspectRatio: relacion }}
      >
        <ImageOff className="size-8" aria-hidden="true" />
        <span className="px-4 text-center text-xs font-medium" data-numeric>
          {base}.webp
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- ver comentario de arriba
    <img
      src={`${base}-1280.webp`}
      srcSet={srcSet(base)}
      sizes={sizes}
      alt={alt}
      width={1280}
      height={aspect === "4/3" ? 960 : aspect === "16/10" ? 800 : aspect === "1.91/1" ? 670 : 720}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={cn("h-full w-full object-cover", className)}
      style={{ aspectRatio: relacion }}
    />
  );
}
