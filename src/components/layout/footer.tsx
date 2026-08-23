import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import {
  IconoFacebook,
  IconoInstagram,
  IconoLinkedin,
} from "@/components/ui/iconos-redes";
import { Logo } from "@/components/layout/logo";
import { navEmpresas, navOficinas, navPersonas } from "./nav-data";
import { casaCentral } from "@/content/oficinas";
import { sitio } from "@/content/sitio";
import { linkTelefono } from "@/lib/whatsapp";

const REDES = [
  { href: sitio.redes.instagram, label: "Instagram", Icono: IconoInstagram },
  { href: sitio.redes.facebook, label: "Facebook", Icono: IconoFacebook },
  { href: sitio.redes.linkedin, label: "LinkedIn", Icono: IconoLinkedin },
];

function Columna({
  titulo,
  items,
}: {
  titulo: string;
  items: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="font-heading text-sm font-semibold text-white">{titulo}</h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-sm text-parh-cyan-100 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-parh-blue-900 pb-20 lg:pb-0">
      <div className="container-parh py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo variante="claro" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-parh-cyan-100">
              Bróker independiente con más de 20 años. Comparamos entre varias
              compañías y te acompañamos también en el siniestro.
            </p>

            {/* globals.css ya normaliza font-style en address. */}
            <address className="mt-5 space-y-2.5 text-sm text-parh-cyan-100">
              <a
                href={linkTelefono()}
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <Phone className="size-4 shrink-0 text-parh-cyan-300" aria-hidden="true" />
                <span data-numeric>{sitio.telefono}</span>
              </a>
              <a
                href={`mailto:${sitio.email}`}
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <Mail className="size-4 shrink-0 text-parh-cyan-300" aria-hidden="true" />
                {sitio.email}
              </a>
              <span className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-parh-cyan-300" aria-hidden="true" />
                <span>
                  {casaCentral.calle}, {casaCentral.localidad}
                </span>
              </span>
            </address>

            <ul className="mt-5 flex gap-2">
              {REDES.map(({ href, label, Icono }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${sitio.nombreCorto} en ${label}`}
                    className="flex size-11 items-center justify-center rounded-md text-parh-cyan-100 transition-colors hover:bg-parh-blue-800 hover:text-white"
                  >
                    <Icono className="size-5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <Columna titulo="Seguros para personas" items={navPersonas} />
          <Columna titulo="Seguros para empresas" items={navEmpresas} />

          <div className="space-y-8">
            <Columna titulo="Oficinas" items={navOficinas} />
            <Columna
              titulo="PARH"
              items={[
                { href: "/nosotros/", label: "Quiénes somos" },
                { href: "/asesores/", label: "Asesores" },
                { href: "/cotizar/", label: "Cotizar" },
                { href: "/diagnostico/", label: "Diagnóstico de cobertura" },
                { href: "/contacto/", label: "Contacto" },
              ]}
            />
          </div>
        </div>

        <div className="mt-12 border-t border-parh-blue-800 pt-6">
          <div className="flex flex-col gap-3 text-xs text-parh-cyan-100 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {sitio.razonSocial}. Todos los derechos
              reservados.
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              <li>
                <Link
                  href="/politica-de-privacidad/"
                  className="transition-colors hover:text-white"
                >
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/terminos-y-condiciones/"
                  className="transition-colors hover:text-white"
                >
                  Términos y condiciones
                </Link>
              </li>
            </ul>
          </div>

          {/* PENDIENTE: matrícula de Productor Asesor de Seguros (SSN).
              Es un dato que corresponde exhibir y hoy no lo tenemos. */}
          {sitio.matriculaSSN ? (
            <p className="mt-3 text-xs text-parh-cyan-100">
              Productor Asesor de Seguros, matrícula SSN {sitio.matriculaSSN}.
            </p>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
