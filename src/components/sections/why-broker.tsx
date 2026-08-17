import { Check } from "lucide-react";

import { copyNuevo } from "@/content/sitio";

/**
 * "Por qué un bróker y no un cotizador online". Doc 02 sección D,
 * argumento de independencia tomado de Heffernan.
 */
export function WhyBroker() {
  const { titulo, bajada, puntos } = copyNuevo.porQueBroker;

  return (
    <section className="section-parh bg-parh-blue-900">
      <div className="container-parh grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow text-parh-cyan-300">Por qué un bróker</p>
          <h2 className="mt-3 text-3xl text-white">{titulo}</h2>
          <p className="mt-4 max-w-lg text-lg text-parh-cyan-100">{bajada}</p>
        </div>

        <ul className="space-y-4">
          {puntos.map((punto) => (
            <li key={punto} className="flex gap-3 rounded-lg bg-parh-blue-800 p-4">
              <Check
                className="mt-0.5 size-5 shrink-0 text-parh-cyan-400"
                aria-hidden="true"
              />
              <span className="text-white">{punto}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
