"use client";

import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Imagen } from "@/components/ui/imagen";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { QueResolver } from "@/components/oficina/que-resolver";
import { MapaEmbebido } from "@/components/oficina/mapa-embebido";
import { textoHorario } from "@/lib/horarios";
import { linkComoLlegar } from "@/lib/maps";
import { insuranceAgency } from "@/lib/schema";
import { evento } from "@/lib/analytics";
import { linkTelefono, linkWhatsapp } from "@/lib/whatsapp";
import type { Oficina } from "@/content/types";

/** Plantilla única de landing de sucursal. Doc 06 sprint 5.2. */
export function OficinaDetalle({ oficina }: { oficina: Oficina }) {
  return (
    <>
      <JsonLd data={insuranceAgency(oficina)} />

      <Breadcrumbs
        migas={[
          { label: "Oficinas", href: "/oficinas/" },
          { label: oficina.localidad, href: `/oficinas/${oficina.slug}/` },
        ]}
      />

      <section className="container-parh grid gap-10 pb-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <p className="eyebrow">
            {oficina.esCasaCentral ? "Casa central" : "Sucursal"}
          </p>
          <h1 className="mt-3 text-4xl">Bróker de seguros en {oficina.localidad}</h1>
          <p className="mt-4 max-w-xl text-lg text-parh-slate-600">
            {oficina.descripcion}
          </p>
        </div>

        <aside className="rounded-lg border border-parh-slate-200 bg-white p-6 shadow-parh-sm">
          <address className="space-y-3 text-sm not-italic text-parh-slate-600">
            <p className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-parh-cyan-600" aria-hidden="true" />
              <span>
                {oficina.calle}
                <br />
                {oficina.localidad}, {oficina.provincia}
              </span>
            </p>

            {oficina.horarios.map((h, i) => (
              <p key={i} className="flex items-start gap-2.5">
                <Clock className="mt-0.5 size-4 shrink-0 text-parh-cyan-600" aria-hidden="true" />
                <span data-numeric>{textoHorario(h)}</span>
              </p>
            ))}

            <a
              href={`mailto:${oficina.email}`}
              className="flex items-center gap-2.5 hover:text-parh-blue-700"
            >
              <Mail className="size-4 shrink-0 text-parh-cyan-600" aria-hidden="true" />
              {oficina.email}
            </a>
          </address>

          <div className="mt-5 space-y-2.5">
            <Button size="cta" className="w-full" asChild>
              <a
                href={linkWhatsapp({ contexto: `la oficina de ${oficina.localidad}` })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  evento("whatsapp_click", { location: `oficina_${oficina.slug}` })
                }
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Escribinos por WhatsApp
              </a>
            </Button>

            <Button size="cta" variant="outline" className="w-full" asChild>
              <a
                href={linkTelefono(oficina.telefonoE164)}
                onClick={() => evento("phone_click", { location: `oficina_${oficina.slug}` })}
              >
                <Phone className="size-4" aria-hidden="true" />
                <span data-numeric>{oficina.telefono}</span>
              </a>
            </Button>

            <a
              href={linkComoLlegar(oficina)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => evento("office_directions_click", { sucursal: oficina.slug })}
              className="block text-center text-sm font-semibold text-parh-blue-700 hover:underline"
            >
              Cómo llegar
            </a>
          </div>
        </aside>
      </section>

      <div className="container-parh mt-8">
        <Imagen
          base={oficina.imagen}
          alt={oficina.alt}
          aspect="16/10"
          priority
          sizes="(min-width: 1024px) 960px, 100vw"
          className="rounded-xl"
        />
      </div>

      <section className="section-parh space-y-14">
        <div className="container-parh">
          <MapaEmbebido oficina={oficina} />
        </div>

        <div className="container-parh">
          <h2 className="text-2xl">Zonas que atendemos desde acá</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {oficina.zonas.map((zona) => (
              <li
                key={zona}
                className="rounded-full bg-parh-cyan-50 px-4 py-1.5 text-sm font-medium text-parh-blue-900"
              >
                {zona}
              </li>
            ))}
          </ul>
        </div>

        <div className="container-parh">
          <QueResolver />
        </div>
      </section>
    </>
  );
}
