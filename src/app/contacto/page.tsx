import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { LeadForm } from "@/components/forms/lead-form";
import { oficinas } from "@/content/oficinas";
import { metadataDe, sitio } from "@/content/sitio";
import { linkTelefono } from "@/lib/whatsapp";
import { textoHorario } from "@/lib/horarios";

export const metadata: Metadata = metadataDe("/contacto/");

export default function ContactoPage() {
  return (
    <>
      <Breadcrumbs migas={[{ label: "Contacto", href: "/contacto/" }]} />

      <section className="container-parh pb-4">
        <h1 className="max-w-2xl text-4xl">Contacto</h1>
        <p className="mt-4 max-w-xl text-lg text-parh-slate-600">
          Escribinos por WhatsApp al <span data-numeric>{sitio.telefono}</span>{" "}
          o dejanos tu consulta acá abajo. Te respondemos el mismo día hábil.
        </p>
      </section>

      <section className="section-parh">
        <div className="container-parh grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="rounded-lg border border-parh-slate-200 bg-white p-6 sm:p-8">
            <LeadForm variant="contacto" />
          </div>

          <div>
            <a
              href={linkTelefono()}
              className="flex items-center gap-2.5 text-lg font-semibold text-parh-blue-900 hover:text-parh-blue-700"
            >
              <Phone className="size-5 text-parh-cyan-600" aria-hidden="true" />
              <span data-numeric>{sitio.telefono}</span>
            </a>
            <a
              href={`mailto:${sitio.email}`}
              className="mt-2 flex items-center gap-2.5 text-parh-slate-600 hover:text-parh-blue-700"
            >
              <Mail className="size-4 text-parh-cyan-600" aria-hidden="true" />
              {sitio.email}
            </a>

            <h2 className="mt-8 text-lg">Nuestras oficinas</h2>
            <ul className="mt-4 space-y-5">
              {oficinas.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/oficinas/${o.slug}/`}
                    className="font-semibold text-parh-blue-900 hover:text-parh-blue-700"
                  >
                    {o.localidad}
                  </Link>
                  <p className="mt-0.5 flex items-start gap-2 text-sm text-parh-slate-600">
                    <MapPin className="mt-0.5 size-3.5 shrink-0 text-parh-cyan-600" aria-hidden="true" />
                    {o.calle}
                  </p>
                  {o.horarios.map((h, i) => (
                    <p key={i} className="ml-5 text-sm text-parh-slate-600" data-numeric>
                      {textoHorario(h)}
                    </p>
                  ))}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
