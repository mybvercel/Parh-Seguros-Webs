import { Icono } from "@/components/ui/icono";
import { anchoMayor, imagenLista, srcSet } from "@/lib/imagenes";
import { cn } from "@/lib/utils";
import type { IconoKey } from "@/content/types";

/**
 * Imagen responsive con srcset real. Doc 03 sección 5.6 y doc 05 sección 6.
 *
 * Con `output: 'export'` no hay optimizador de Next en runtime: `next/image`
 * con `unoptimized` sirve un único archivo y no puede generar variantes de
 * ancho a partir de un solo `src`. Como sí generamos anchos reales con
 * `scripts/optimize-images.mjs` (sharp), acá se arma un `<img>` con `srcSet`
 * nativo del navegador en lugar de forzarlo dentro de `next/image`.
 *
 * FALTA LA IMAGEN: en vez de un cartel de "imagen rota", se dibuja el ícono
 * del producto sobre el celeste de la marca. Queda como una pieza gráfica
 * intencional en lugar de un error, y el layout final ya es el definitivo:
 * cuando llegue la foto, se reemplaza y no se mueve nada.
 */
export function Imagen({
  base,
  alt,
  aspect = "4/3",
  priority = false,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  className,
  icono,
  ajuste = "cover",
}: {
  base: string;
  alt: string;
  aspect?: "16/9" | "4/3" | "16/10" | "1.91/1";
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Ícono de respaldo mientras no exista la foto. */
  icono?: IconoKey;
  /**
   * `contain` para renders con fondo transparente, que recortados se ven mal.
   * `cover` para fotos de escena, que sí conviene recortar.
   */
  ajuste?: "cover" | "contain";
}) {
  const relacion = aspect.replace("/", " / ");

  if (!imagenLista(base)) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex items-center justify-center bg-parh-cyan-50",
          className,
        )}
        style={{ aspectRatio: relacion }}
      >
        {icono ? (
          <Icono nombre={icono} className="size-12 text-parh-cyan-500/70" />
        ) : (
          <span className="font-heading text-2xl font-bold text-parh-cyan-500/50">
            PARH
          </span>
        )}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${base}-${anchoMayor(base)}.webp`}
      srcSet={srcSet(base)}
      sizes={sizes}
      alt={alt}
      width={1280}
      height={aspect === "4/3" ? 960 : aspect === "16/10" ? 800 : aspect === "1.91/1" ? 670 : 720}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={cn(
        "h-full w-full",
        ajuste === "contain" ? "object-contain p-6" : "object-cover",
        className,
      )}
      style={{ aspectRatio: relacion }}
    />
  );
}
