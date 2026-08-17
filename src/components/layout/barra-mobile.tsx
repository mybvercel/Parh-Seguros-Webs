"use client";

import { MessageCircle, Phone } from "lucide-react";

import { sitio } from "@/content/sitio";
import { evento } from "@/lib/analytics";
import { linkTelefono, linkWhatsapp } from "@/lib/whatsapp";

/**
 * Barra fija inferior en mobile. Doc 03 sección 3.2.
 * Es el patrón de mayor conversión en este rubro: dos acciones, sin decisiones.
 *
 * El padding inferior respeta `safe-area-inset` para no quedar tapada por la
 * barra de gestos del iPhone.
 */
export function BarraMobile() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-parh-slate-200 bg-white/95 backdrop-blur lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-2">
        <a
          href={linkTelefono()}
          onClick={() => evento("phone_click", { location: "barra_mobile" })}
          className="flex min-h-14 items-center justify-center gap-2 border-r border-parh-slate-200 text-sm font-semibold text-parh-blue-900"
        >
          <Phone className="size-5 text-parh-cyan-600" aria-hidden="true" />
          Llamar
        </a>
        <a
          href={linkWhatsapp()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => evento("whatsapp_click", { location: "barra_mobile" })}
          className="flex min-h-14 items-center justify-center gap-2 bg-parh-blue-700 text-sm font-semibold text-white"
        >
          <MessageCircle className="size-5" aria-hidden="true" />
          WhatsApp
        </a>
      </div>
      <span className="sr-only">
        Contacto rápido con {sitio.nombreCorto}
      </span>
    </div>
  );
}
