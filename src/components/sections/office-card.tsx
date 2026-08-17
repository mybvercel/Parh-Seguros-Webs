"use client";

import Link from "next/link";
import { Clock, MapPin } from "lucide-react";

import { Imagen } from "@/components/ui/imagen";
import type { Oficina } from "@/content/types";
import { evento } from "@/lib/analytics";
import { textoHorario } from "@/lib/horarios";
import { linkComoLlegar } from "@/lib/maps";

/** Tarjeta de sucursal. Doc 02 sección D, patrón de Worth. */
export function OfficeCard({ oficina }: { oficina: Oficina }) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-parh-sm">
      <Imagen base={oficina.imagen} alt={oficina.alt} aspect="16/10" />

      <div className="p-5">
        <h3 className="text-lg">
          <Link href={`/oficinas/${oficina.slug}/`}>{oficina.localidad}</Link>
        </h3>

        <p className="mt-2 flex items-start gap-2 text-sm text-parh-slate-600">
          <MapPin className="mt-0.5 size-4 shrink-0 text-parh-cyan-600" aria-hidden="true" />
          {oficina.calle}
        </p>

        <ul className="mt-1.5 space-y-0.5">
          {oficina.horarios.map((h, i) => (
            <li
              key={i}
              className="flex items-center gap-2 text-sm text-parh-slate-600"
            >
              <Clock className="size-4 shrink-0 text-parh-cyan-600" aria-hidden="true" />
              <span data-numeric>{textoHorario(h)}</span>
            </li>
          ))}
        </ul>

        <a
          href={linkComoLlegar(oficina)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => evento("office_directions_click", { sucursal: oficina.slug })}
          className="mt-4 inline-flex items-center text-sm font-semibold text-parh-blue-700 hover:underline"
        >
          Cómo llegar
        </a>
      </div>
    </div>
  );
}
