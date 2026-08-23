"use client";

import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";

import { AsesorCard } from "@/components/asesores/asesor-card";
import { asesores, zonasAsesores } from "@/content/asesores";
import type { RolAsesor } from "@/content/types";

type FiltroRol = RolAsesor | "todos";

const ROLES: { value: FiltroRol; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "pas", label: "Productores Asesores" },
  { value: "organizador", label: "Organizadores" },
];

/**
 * Directorio filtrable. Patrón de buscatucoach.com/coaches, recortado a lo que
 * este caso necesita: zona y rol.
 *
 * Se dejaron afuera a propósito los filtros de precio y de género que tiene la
 * referencia. En seguros el asesor no cobra al cliente (la comisión la paga la
 * compañía), así que un filtro de precio no aplica, y filtrar personas por
 * género en un contexto profesional no aporta.
 */
export function DirectorioAsesores() {
  const [zona, setZona] = useState<string>("todas");
  const [rol, setRol] = useState<FiltroRol>("todos");

  const resultados = useMemo(
    () =>
      asesores.filter(
        (a) =>
          (zona === "todas" || a.zonas.includes(zona)) &&
          (rol === "todos" || a.rol === rol),
      ),
    [zona, rol],
  );

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-xl border border-parh-slate-200 bg-parh-slate-50 p-5 sm:flex-row sm:items-end">
        <div className="sm:w-64">
          <label
            htmlFor="filtro-zona"
            className="block text-sm font-medium text-parh-blue-900"
          >
            Zona
          </label>
          <select
            id="filtro-zona"
            value={zona}
            onChange={(e) => setZona(e.target.value)}
            className="mt-1.5 h-11 w-full rounded-md border border-parh-slate-200 bg-white px-3 text-sm text-parh-blue-900"
          >
            <option value="todas">Todas las zonas</option>
            {zonasAsesores.map((z) => (
              <option key={z} value={z}>
                {z}
              </option>
            ))}
          </select>
        </div>

        <div
          role="group"
          aria-label="Filtrar por rol"
          className="flex flex-wrap gap-2"
        >
          {ROLES.map((r) => (
            <button
              key={r.value}
              type="button"
              aria-pressed={rol === r.value}
              onClick={() => setRol(r.value)}
              className={`min-h-11 rounded-full px-4 text-sm font-semibold transition-colors ${
                rol === r.value
                  ? "bg-parh-blue-700 text-white"
                  : "bg-white text-parh-slate-600 ring-1 ring-parh-slate-200 hover:text-parh-blue-900"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-5 text-sm text-parh-slate-600" aria-live="polite">
        {resultados.length === 1
          ? "1 asesor"
          : `${resultados.length} asesores`}
      </p>

      {resultados.length > 0 ? (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {resultados.map((a) => (
            <AsesorCard key={a.slug} asesor={a} />
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-parh-slate-200 bg-white p-10 text-center">
          <SearchX
            className="mx-auto size-8 text-parh-slate-400"
            aria-hidden="true"
          />
          <p className="mt-3 font-semibold text-parh-blue-900">
            No hay asesores para esa combinación
          </p>
          <p className="mt-1 text-sm text-parh-slate-600">
            Probá con otra zona, o escribinos y te derivamos con el que
            corresponde.
          </p>
        </div>
      )}
    </div>
  );
}
