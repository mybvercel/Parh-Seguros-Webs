import Image from "next/image";
import Link from "next/link";

import { sitio } from "@/content/sitio";
import { cn } from "@/lib/utils";

/**
 * PENDIENTE DEL CLIENTE: el logo entregado es un JPEG con fondo blanco, así que
 * no se puede poner sobre el footer azul sin que aparezca el recuadro.
 * Hace falta un SVG o un PNG con transparencia.
 *
 * Mientras tanto, `variante="claro"` dibuja el logotipo con tipografía sobre el
 * fondo oscuro, en lugar de forzar la imagen.
 */
export function Logo({
  variante = "oscuro",
  className,
}: {
  variante?: "oscuro" | "claro";
  className?: string;
}) {
  if (variante === "claro") {
    return (
      <Link
        href="/"
        className={cn("inline-flex flex-col leading-none", className)}
        aria-label={`${sitio.nombreCorto}, ir al inicio`}
      >
        <span className="font-heading text-2xl font-bold tracking-tight text-white">
          PARH
        </span>
        <span className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-parh-cyan-300">
          {sitio.claim}
        </span>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={cn("inline-block", className)}
      aria-label={`${sitio.nombreCorto}, ir al inicio`}
    >
      <Image
        src="/img/logo-parh-640.webp"
        alt={`${sitio.razonSocial}, ${sitio.claim.toLowerCase()}`}
        width={418}
        height={186}
        priority
        // El alto lo fija la clase. `width: auto` mantiene la proporción y
        // evita el warning de next/image por modificar una sola dimensión.
        style={{ width: "auto" }}
        className="h-10 w-auto sm:h-11"
      />
    </Link>
  );
}
