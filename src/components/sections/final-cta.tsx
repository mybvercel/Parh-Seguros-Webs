import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { copyNuevo } from "@/content/sitio";
import { linkWhatsapp } from "@/lib/whatsapp";

/** CTA final con micro-copy de fricción cero. Doc 02 sección D, patrón de Worth. */
export function FinalCta() {
  return (
    <section className="bg-parh-blue-900 py-16 sm:py-20">
      <div className="container-parh text-center">
        <h2 className="text-3xl text-white">
          Contanos qué querés proteger y comparamos por vos
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-lg text-parh-cyan-100">
          {copyNuevo.fricciónCta}
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Button size="cta-lg" variant="onDark" asChild>
            <Link href="/diagnostico/">Hacer el diagnóstico</Link>
          </Button>
          <Button
            size="cta-lg"
            variant="outline"
            className="border-parh-cyan-300/40 bg-transparent text-white hover:bg-parh-blue-800 hover:text-white"
            asChild
          >
            <a
              href={linkWhatsapp()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="size-5" aria-hidden="true" />
              Escribinos por WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
