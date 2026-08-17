"use client";

import { ArrowUpRight } from "lucide-react";

import { evento } from "@/lib/analytics";
import type { Compania } from "@/content/types";

/**
 * Compañías con las que se puede cotizar este producto. Doc 06 sprint 4.6.
 *
 * Enlaza directo al cotizador del tercero. El modal de captura previa (doc 03
 * sección 2.3) se agrega en el Sprint 6 envolviendo este mismo link: no tiene
 * sentido construir la mitad de un flujo de captura antes de tener el resto.
 */
export function CompaniasProducto({ companias }: { companias: Compania[] }) {
  if (companias.length === 0) return null;

  return (
    <div>
      <h3 className="text-lg">Compañías con las que podés cotizar esto</h3>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {companias.map((c) => (
          <li key={c.slug}>
            <a
              href={c.cotizadorUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => evento("cotizador_externo_click", { compania: c.slug })}
              className="flex items-center justify-between gap-3 rounded-lg border border-parh-slate-200 p-4 transition-colors hover:border-parh-blue-700 hover:bg-parh-cyan-50"
            >
              <span>
                <span className="block text-sm font-semibold text-parh-blue-900">
                  {c.nombre}
                </span>
                <span className="mt-0.5 block text-xs text-parh-slate-600">
                  Cotizador propio de la compañía
                </span>
              </span>
              <ArrowUpRight
                className="size-4 shrink-0 text-parh-cyan-600"
                aria-hidden="true"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
