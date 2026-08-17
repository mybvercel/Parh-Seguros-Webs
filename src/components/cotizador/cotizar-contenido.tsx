"use client";

import { useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Imagen } from "@/components/ui/imagen";
import { QuoteModal } from "@/components/forms/quote-modal";
import { companias } from "@/content/companias";

/** `/cotizar/`. Doc 06 sprint 6.5, sobre `QuoteModal` del sprint 6.6. */
export function CotizarContenido() {
  const params = useSearchParams();
  const producto = params.get("producto");

  return (
    <>
      <Breadcrumbs migas={[{ label: "Cotizar", href: "/cotizar/" }]} />

      <section className="container-parh pb-4">
        <h1 className="max-w-2xl text-4xl">Cotizá tu seguro online</h1>
        <p className="mt-4 max-w-xl text-lg text-parh-slate-600">
          Elegí una compañía para cotizar directo, o dejanos tu WhatsApp y
          cotizamos nosotros por vos.
          {producto ? ` Consulta sobre: ${producto}.` : null}
        </p>
      </section>

      <section className="section-parh">
        <div className="container-parh grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {companias.map((c) => (
            <QuoteModal key={c.slug} compania={c}>
              <button
                type="button"
                className="group flex h-full flex-col items-start gap-4 rounded-lg border border-parh-slate-200 bg-white p-6 text-left transition-all hover:-translate-y-0.5 hover:border-parh-blue-700 hover:shadow-parh-hover"
              >
                <Imagen
                  base={c.logo}
                  alt={c.nombre}
                  aspect="16/9"
                  className="max-h-10 w-auto"
                />

                <div>
                  <h2 className="text-lg">{c.nombre}</h2>
                  <p className="mt-1.5 text-sm text-parh-slate-600">
                    {c.descripcion}
                  </p>
                </div>

                <p className="mt-1.5 flex flex-wrap gap-1.5">
                  {c.cotiza.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-parh-slate-100 px-2.5 py-1 text-xs font-medium text-parh-slate-600"
                    >
                      {item}
                    </span>
                  ))}
                </p>

                <span className="mt-auto flex items-center gap-1 text-sm font-semibold text-parh-blue-700">
                  Cotizar con {c.nombre}
                  <ArrowRight
                    className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </button>
            </QuoteModal>
          ))}
        </div>
      </section>
    </>
  );
}
