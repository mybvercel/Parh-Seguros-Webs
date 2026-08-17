import { copyNuevo } from "@/content/sitio";

/**
 * "Cómo trabajamos" en 3 pasos. Doc 02 sección D, patrón de NEXT.
 * Es el bloque que más falta hace: hoy nadie explica en parh.com.ar cómo
 * funciona trabajar con un bróker en lugar de contratar directo.
 */
export function StepsBlock() {
  return (
    <section className="section-parh bg-parh-slate-50">
      <div className="container-parh">
        <div className="max-w-2xl">
          <p className="eyebrow">Cómo trabajamos</p>
          <h2 className="mt-3 text-3xl">Tres pasos, sin vueltas</h2>
        </div>

        <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
          {copyNuevo.pasos.map((paso, i) => (
            <li key={paso.numero} className="relative">
              {/* Línea conectora entre pasos, solo en desktop. */}
              {i < copyNuevo.pasos.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute top-6 left-[calc(50%+1.75rem)] hidden h-px w-[calc(100%-3.5rem)] bg-parh-slate-200 md:block"
                />
              ) : null}

              <span
                className="flex size-12 items-center justify-center rounded-full bg-parh-blue-700 font-heading text-lg font-bold text-white"
                data-numeric
              >
                {paso.numero}
              </span>
              <h3 className="mt-4 text-xl">{paso.titulo}</h3>
              <p className="mt-2 text-parh-slate-600">{paso.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
