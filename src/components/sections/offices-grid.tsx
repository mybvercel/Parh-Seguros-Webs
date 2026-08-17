import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { OfficeCard } from "@/components/sections/office-card";
import { oficinas } from "@/content/oficinas";

/** Grilla de las 4 sucursales. 1 en mobile, 2 en md, 4 en lg. Doc 04 sección 5. */
export function OfficesGrid() {
  return (
    <section className="section-parh bg-parh-slate-50">
      <div className="container-parh">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Dónde estamos</p>
            <h2 className="mt-3 text-3xl">Nuestras cuatro oficinas</h2>
          </div>

          <Link
            href="/oficinas/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-parh-blue-700 hover:underline"
          >
            Ver todas las oficinas
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {oficinas.map((o) => (
            <OfficeCard key={o.slug} oficina={o} />
          ))}
        </div>
      </div>
    </section>
  );
}
