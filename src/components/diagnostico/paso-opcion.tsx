import { motion } from "motion/react";

import type { Opcion, Paso } from "@/content/diagnostico";

/** Un paso de opción múltiple. Doc 03 sección 2.2: una pregunta por pantalla. */
export function PasoOpcion({
  paso,
  onElegir,
}: {
  paso: Paso;
  onElegir: (valor: string) => void;
}) {
  return (
    <motion.div
      key={paso.id}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <h2 className="text-2xl">{paso.titulo}</h2>
      {paso.ayuda ? (
        <p className="mt-1.5 text-sm text-parh-slate-600">{paso.ayuda}</p>
      ) : null}

      <div className="mt-6 space-y-2.5">
        {paso.opciones?.map((opcion: Opcion) => (
          <button
            key={opcion.value}
            type="button"
            onClick={() => onElegir(opcion.value)}
            className="flex w-full min-h-14 items-center justify-between rounded-lg border border-parh-slate-200 bg-white px-5 py-3.5 text-left text-base font-medium text-parh-blue-900 transition-colors hover:border-parh-blue-700 hover:bg-parh-cyan-50"
          >
            <span>
              {opcion.label}
              {opcion.ayuda ? (
                <span className="mt-0.5 block text-xs font-normal text-parh-slate-600">
                  {opcion.ayuda}
                </span>
              ) : null}
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
