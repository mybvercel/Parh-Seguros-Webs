import Link from "next/link";

import { Icono } from "@/components/ui/icono";
import { imagenLista } from "@/lib/imagenes";
import type { HeroCard as HeroCardData } from "@/content/hero-destacados";

/**
 * Tarjeta grande del hero. Inspirada en el patrón de worthinsurance.com
 * (grilla de 3D-icons, título abajo), adaptada a la paleta de PARH.
 * Doc 02 sección A/D.
 *
 * Sin fondo de color detrás del ícono/foto: un cuadrado celeste dentro de
 * la tarjeta blanca duplicaba el marco y quedaba "caja dentro de caja".
 * La foto va redondeada y flotando directo sobre el blanco de la tarjeta.
 * Cuando `imagen` existe, `object-contain` (no `object-cover`): son renders
 * aislados, no fotos de escena, así que recortarlas se ve mal.
 * Sin foto, cae al mismo ícono de Lucide que usa el resto del sitio.
 *
 * Sin `srcSet`: los originales de estas 6 fotos son renders de 500x500,
 * `optimize-images.mjs` solo puede generar el ancho de 640 sin agrandar
 * ("withoutEnlargement"), y pedir los anchos 1280/1920 que no existen
 * generaría 404 en la red. Con 640w alcanza de sobra para un tile de ~200px.
 */
export function HeroCardTile({ card }: { card: HeroCardData }) {
  const tieneImagen = card.imagen && imagenLista(card.imagen);

  return (
    <Link
      href={card.href}
      className="group flex flex-col items-center gap-3 rounded-2xl border border-parh-slate-200 bg-white p-4 text-center transition-all duration-200 hover:-translate-y-1 hover:border-parh-blue-700 hover:shadow-parh-hover sm:p-5"
    >
      <span className="flex aspect-square w-full items-center justify-center">
        {tieneImagen ? (
          // Mismo motivo que components/ui/imagen.tsx: srcSet real necesita <img> nativo.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`${card.imagen}-640.webp`}
            alt={card.alt}
            width={640}
            height={640}
            loading="eager"
            decoding="async"
            className="h-full w-full rounded-xl object-contain transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <Icono
            nombre={card.icono}
            className="size-14 text-parh-cyan-600 transition-transform duration-300 group-hover:scale-110 sm:size-16"
          />
        )}
      </span>

      <span className="text-sm font-semibold text-parh-blue-900 sm:text-base">
        {card.nombre}
      </span>

      {card.online ? (
        <span className="rounded-full bg-parh-cyan-50 px-2.5 py-1 text-[0.6875rem] font-semibold text-parh-cyan-700">
          Cotizás online
        </span>
      ) : null}
    </Link>
  );
}
