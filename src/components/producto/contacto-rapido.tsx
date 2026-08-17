"use client";

import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { copyNuevo, sitio } from "@/content/sitio";
import { evento } from "@/lib/analytics";
import { linkTelefono, linkWhatsapp } from "@/lib/whatsapp";

/**
 * Tarjeta de contacto rápido al lado del hero de producto. Doc 06 sprint 4.3.
 *
 * El roadmap la llama "LeadForm corto", pero el LeadForm con validación y
 * el endpoint de envío se arman recién en el Sprint 6 (doc 06). Construir acá
 * un formulario que todavía no envía nada sería dejar una función a medio
 * terminar, así que esta tarjeta ofrece las dos acciones que sí funcionan
 * hoy: WhatsApp con el producto ya en el mensaje, y llamar. El formulario
 * la reemplaza cuando esté listo, sin cambiar el layout de la página.
 */
export function ContactoRapido({ producto }: { producto: string }) {
  return (
    <aside className="rounded-lg border border-parh-slate-200 bg-white p-6 shadow-parh-sm">
      <p className="font-heading text-lg font-semibold text-parh-blue-900">
        Consultá por este seguro
      </p>
      <p className="mt-1.5 text-sm text-parh-slate-600">
        {copyNuevo.fricciónCta}
      </p>

      <div className="mt-5 space-y-2.5">
        <Button size="cta" className="w-full" asChild>
          <a
            href={linkWhatsapp({ contexto: producto })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => evento("whatsapp_click", { location: `producto_${producto}` })}
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            Escribinos por WhatsApp
          </a>
        </Button>

        <Button size="cta" variant="outline" className="w-full" asChild>
          <a
            href={linkTelefono()}
            onClick={() => evento("phone_click", { location: `producto_${producto}` })}
          >
            <Phone className="size-4" aria-hidden="true" />
            <span data-numeric>{sitio.telefono}</span>
          </a>
        </Button>
      </div>

      <Link
        href={`/cotizar/?producto=${producto}`}
        className="mt-4 block text-center text-sm font-semibold text-parh-blue-700 hover:underline"
      >
        Ver cotizadores online
      </Link>

      {/* Enlace inverso hacia las sucursales. Doc 06 sprint 5.5. */}
      <Link
        href="/oficinas/"
        className="mt-2 block text-center text-sm text-parh-slate-600 hover:text-parh-blue-700 hover:underline"
      >
        O vení a una de nuestras 4 oficinas
      </Link>
    </aside>
  );
}
