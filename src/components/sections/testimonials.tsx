"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { testimonios } from "@/content/testimonios";

/**
 * Prueba social. Doc 02 sección D, patrón de Worth: testimonio con nombre,
 * localidad y producto, no un elogio genérico.
 *
 * Carrusel accesible con Embla: navegable por teclado, con botones con
 * `aria-label` y sin autoplay que le saque el control al usuario.
 */
export function Testimonials() {
  const [emblaRef, embla] = useEmblaCarousel({ align: "start", loop: false });
  const [puedeAnterior, setPuedeAnterior] = useState(false);
  const [puedeSiguiente, setPuedeSiguiente] = useState(false);

  const actualizar = useCallback(() => {
    if (!embla) return;
    setPuedeAnterior(embla.canScrollPrev());
    setPuedeSiguiente(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    actualizar();
    embla.on("select", actualizar);
    embla.on("reInit", actualizar);
  }, [embla, actualizar]);

  return (
    <section className="section-parh bg-white">
      <div className="container-parh">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Lo que dicen nuestros clientes</p>
            <h2 className="mt-3 text-3xl">Atención con nombre y apellido</h2>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon-lg"
              aria-label="Testimonio anterior"
              disabled={!puedeAnterior}
              onClick={() => embla?.scrollPrev()}
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              size="icon-lg"
              aria-label="Testimonio siguiente"
              disabled={!puedeSiguiente}
              onClick={() => embla?.scrollNext()}
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </Button>
          </div>
        </div>

        <div className="mt-8 overflow-hidden" ref={emblaRef}>
          <div className="-ml-4 flex">
            {testimonios.map((t) => (
              <article
                key={t.id}
                className="min-w-0 shrink-0 grow-0 basis-full pl-4 sm:basis-1/2 lg:basis-1/3"
              >
                <div className="flex h-full flex-col rounded-lg bg-parh-slate-50 p-6">
                  <div className="flex gap-0.5" aria-hidden="true">
                    {Array.from({ length: t.estrellas }).map((_, i) => (
                      <Star
                        key={i}
                        className="size-4 fill-parh-cyan-500 text-parh-cyan-500"
                      />
                    ))}
                  </div>
                  <p className="mt-3 flex-1 text-parh-slate-600">
                    &ldquo;{t.texto}&rdquo;
                  </p>
                  <p className="mt-4 text-sm font-semibold text-parh-blue-900">
                    {t.nombre}
                    <span className="font-normal text-parh-slate-600">
                      {" "}
                      · {t.localidad} · {t.producto}
                    </span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
