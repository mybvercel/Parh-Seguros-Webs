import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Icono } from "@/components/ui/icono";
import { navEmpresas, navPersonas } from "@/components/layout/nav-data";

/**
 * "Qué podés resolver acá". Doc 06 sprint 5.3 y 5.5: enlazado interno entre
 * oficinas y productos. Las 4 sucursales comparten el mismo catálogo, así
 * que se muestra una selección representativa con link a los hubs completos.
 */
export function QueResolver() {
  const destacados = [...navPersonas.slice(0, 3), ...navEmpresas.slice(0, 2)];

  return (
    <div>
      <h2 className="text-2xl">Qué podés resolver acá</h2>
      <p className="mt-2 text-parh-slate-600">
        Todas nuestras oficinas atienden el mismo catálogo completo, para
        personas y para empresas.
      </p>

      <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
        {destacados.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="flex min-h-11 items-center gap-3 rounded-md border border-parh-slate-200 px-3.5 py-2.5 text-sm font-medium text-parh-blue-900 transition-colors hover:border-parh-blue-700 hover:bg-parh-cyan-50"
            >
              {item.icono ? (
                <Icono nombre={item.icono} className="size-5 shrink-0 text-parh-cyan-600" />
              ) : null}
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <Link href="/seguros/" className="inline-flex items-center gap-1 font-semibold text-parh-blue-700 hover:underline">
          Ver todos los seguros para personas
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
        <Link href="/empresas/" className="inline-flex items-center gap-1 font-semibold text-parh-blue-700 hover:underline">
          Ver todos los seguros para empresas
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
