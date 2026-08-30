import { Building2, Mail, MapPin, Phone, User } from "lucide-react";

import { direccionesAsesores } from "@/content/asesores";
import { imagenLista } from "@/lib/imagenes";
import type { Asesor } from "@/content/types";

const ROL_LABEL: Record<Asesor["rol"], string> = {
  organizador: "Organizador",
  pas: "Productor Asesor",
};

/**
 * Tarjeta del directorio de asesores.
 *
 * Sin foto real cae a un avatar con la inicial, en vez de romper la grilla o
 * usar una foto de stock: el doc 04 sección 8.2 prohíbe avatares genéricos,
 * porque en un directorio de personas reales una cara inventada es peor que
 * ninguna cara.
 */
export function AsesorCard({ asesor }: { asesor: Asesor }) {
  const tieneFoto = asesor.foto && imagenLista(asesor.foto);
  const esLogo = asesor.tipoImagen === "logo";
  const direccion = direccionesAsesores[asesor.slug];
  const inicial = asesor.nombre.trim().charAt(0).toUpperCase();

  return (
    <article className="flex flex-col rounded-xl border border-parh-slate-200 bg-white p-5 transition-all hover:border-parh-blue-700 hover:shadow-parh-hover">
      <div className="flex items-center gap-3">
        <span
          className={`flex size-14 shrink-0 items-center justify-center overflow-hidden bg-parh-cyan-50 ${
            esLogo ? "rounded-lg" : "rounded-full"
          }`}
        >
          {tieneFoto ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`${asesor.foto}-640.webp`}
              alt={asesor.nombre}
              width={640}
              height={640}
              loading="lazy"
              decoding="async"
              className={
                esLogo
                  ? "h-full w-full object-contain p-1"
                  : "h-full w-full object-cover"
              }
            />
          ) : (
            <span
              aria-hidden="true"
              className="font-heading text-xl font-bold text-parh-cyan-700"
            >
              {inicial || <User className="size-6" />}
            </span>
          )}
        </span>

        <div className="min-w-0">
          <h3 className="text-base">{asesor.nombre}</h3>
          <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-parh-cyan-700">
            {ROL_LABEL[asesor.rol]}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm text-parh-slate-600">{asesor.bio}</p>

      <p className="mt-4 flex items-start gap-2 text-sm text-parh-slate-600">
        <MapPin
          className="mt-0.5 size-4 shrink-0 text-parh-cyan-600"
          aria-hidden="true"
        />
        {asesor.zonas.join(", ")}
      </p>

      {direccion ? (
        <p className="mt-1.5 flex items-start gap-2 text-sm text-parh-slate-600">
          <Building2
            className="mt-0.5 size-4 shrink-0 text-parh-cyan-600"
            aria-hidden="true"
          />
          {direccion}
        </p>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
        {asesor.telefonoE164 ? (
          <a
            href={`tel:+${asesor.telefonoE164}`}
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-parh-blue-700 hover:underline"
          >
            <Phone className="size-4" aria-hidden="true" />
            <span data-numeric>{asesor.telefono}</span>
          </a>
        ) : null}

        {asesor.email ? (
          <a
            href={`mailto:${asesor.email}`}
            className="inline-flex min-h-11 items-center gap-1.5 break-all text-sm font-semibold text-parh-blue-700 hover:underline"
          >
            <Mail className="size-4 shrink-0" aria-hidden="true" />
            Escribir
          </a>
        ) : null}
      </div>

      {asesor.matriculaSSN ? (
        <p className="mt-3 text-xs text-parh-slate-400" data-numeric>
          Matrícula SSN {asesor.matriculaSSN}
        </p>
      ) : null}
    </article>
  );
}
