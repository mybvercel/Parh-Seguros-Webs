import Link from "next/link";
import { ClipboardCheck } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * Entrada al lead magnet principal desde la Home. Doc 03 sección 2.2.
 * Resuelve el cuello de botella #1: hoy el 100% del tráfico de cotización
 * se va a un tercero sin dejar dato en PARH.
 */
export function DiagnosticoTeaser() {
  return (
    <section className="section-parh bg-white">
      <div className="container-parh">
        <div className="grid gap-8 rounded-xl bg-parh-cyan-50 p-8 sm:p-12 lg:grid-cols-[auto_1fr_auto] lg:items-center">
          <span className="hidden size-16 shrink-0 items-center justify-center rounded-full bg-parh-blue-700 lg:flex">
            <ClipboardCheck className="size-8 text-white" aria-hidden="true" />
          </span>

          <div>
            <p className="eyebrow">Gratis, en 90 segundos</p>
            <h2 className="mt-3 text-3xl">
              ¿Sabés si tu cobertura actual tiene algo sin cubrir?
            </h2>
            <p className="mt-3 max-w-xl text-parh-slate-600">
              Respondé 6 preguntas y te decimos qué riesgos podrían estar
              afuera de tu póliza. Sin dar datos de tarjeta y sin ningún
              compromiso.
            </p>
          </div>

          <Button size="cta-lg" className="lg:whitespace-nowrap" asChild>
            <Link href="/diagnostico/">Hacer el diagnóstico</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
