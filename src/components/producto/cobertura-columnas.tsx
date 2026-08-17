import { Check, X } from "lucide-react";

/**
 * "Qué cubre" y "Qué no cubre". Doc 04 sección 6, doc 06 sprint 4.4.
 *
 * Es el diferencial real que casi ningún competidor publica. El "no cubre"
 * usa gris, no rojo: es información, no una alarma de error.
 */
export function CoberturaColumnas({
  cubre,
  noCubre,
}: {
  cubre: string[];
  noCubre: string[];
}) {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      <div>
        <h3 className="text-lg">Qué cubre</h3>
        <ul className="mt-4 space-y-3">
          {cubre.map((item) => (
            <li key={item} className="flex gap-2.5 text-sm text-parh-slate-600">
              <Check
                className="mt-0.5 size-4 shrink-0 text-parh-success"
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg">Qué no cubre</h3>
        <ul className="mt-4 space-y-3">
          {noCubre.map((item) => (
            <li key={item} className="flex gap-2.5 text-sm text-parh-slate-600">
              <X className="mt-0.5 size-4 shrink-0 text-parh-slate-400" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
