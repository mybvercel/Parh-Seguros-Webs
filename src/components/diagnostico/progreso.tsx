/** Barra de progreso del wizard. Doc 03 sección 2.2. */
export function Progreso({ actual, total }: { actual: number; total: number }) {
  const porcentaje = Math.round(((actual + 1) / total) * 100);

  return (
    <div>
      <div
        role="progressbar"
        aria-valuenow={porcentaje}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Paso ${actual + 1} de ${total}`}
        className="h-1.5 w-full overflow-hidden rounded-full bg-parh-slate-100"
      >
        <div
          className="h-full rounded-full bg-parh-blue-700 transition-[width] duration-300 ease-out"
          style={{ width: `${porcentaje}%` }}
        />
      </div>
      <p className="mt-2 text-xs font-medium text-parh-slate-600" data-numeric>
        Paso {actual + 1} de {total}
      </p>
    </div>
  );
}
