import { ArrowUpRight } from "lucide-react";

import { Imagen } from "@/components/ui/imagen";
import { QuoteModal } from "@/components/forms/quote-modal";
import { companias } from "@/content/companias";

/**
 * Franja de compañías. Doc 02 sección D, patrón de Worth.
 * Es el arma de PARH contra los cotizadores online: multi-compañía real.
 *
 * Doc 04 sección 6.1: sin autoscroll infinito rápido. Estático y en grilla,
 * no un marquee, hasta tener los logos reales y su autorización de marca.
 *
 * Cada logo es un `QuoteModal` (el mismo de `/cotizar/`), no un logo suelto:
 * antes esta franja era puramente decorativa, sin ninguna acción, así que
 * ver el logo de Cardinal Assistance (asistencia al viajero) acá no llevaba
 * a ningún lado para cotizar. Ahora sí, con el mismo paso de captura previa.
 */
export function CarrierLogos() {
  return (
    <section className="border-y border-parh-slate-200 bg-parh-slate-50 py-12">
      <div className="container-parh">
        <p className="text-center text-sm font-medium text-parh-slate-600">
          Algunas de las compañías con las que trabajamos. Estas tienen cotizador online: tocá una para cotizar en el momento.
        </p>

        <ul className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {companias.map((c) => (
            <li key={c.slug}>
              <QuoteModal compania={c}>
                <button
                  type="button"
                  className="group flex w-full flex-col items-center gap-2 rounded-lg p-3 transition-colors hover:bg-white"
                >
                  <Imagen
                    base={c.logo}
                    alt={c.nombre}
                    aspect="16/9"
                    className="max-h-10 w-auto grayscale transition-[filter] duration-200 group-hover:grayscale-0"
                  />
                  <span className="flex items-center gap-1 text-xs font-medium text-parh-slate-600 opacity-0 transition-opacity group-hover:opacity-100">
                    Cotizar
                    <ArrowUpRight className="size-3" aria-hidden="true" />
                  </span>
                </button>
              </QuoteModal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
