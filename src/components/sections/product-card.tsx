import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Imagen } from "@/components/ui/imagen";
import type { Producto } from "@/content/types";

/**
 * Tarjeta de producto. Doc 04 sección 6.2.
 *
 * Toda la tarjeta es clicable hacia la página de producto, con "Cotizar" como
 * acción anidada. Hover: de shadow-sm a shadow-hover y 2px hacia arriba.
 * Sin borde y sombra a la vez, por regla del doc 04.
 */
export function ProductCard({ producto, href }: { producto: Producto; href: string }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-parh-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-parh-hover">
      <Imagen base={producto.imagen} alt={producto.alt} aspect="4/3" />

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg">
          <Link href={href} className="after:absolute after:inset-0">
            {producto.nombre}
          </Link>
        </h3>
        <p className="mt-1.5 text-sm text-parh-slate-600">{producto.bajada}</p>

        <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-parh-blue-700">
          Ver cobertura
          <ArrowRight
            className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* z-10 para quedar por encima del after:inset-0 del título y seguir siendo clicable aparte. */}
      <div className="relative z-10 border-t border-parh-slate-100 p-3">
        <Button size="cta" className="w-full" asChild>
          <Link href={`/cotizar/?producto=${producto.slug}`}>Cotizar</Link>
        </Button>
      </div>
    </div>
  );
}
