import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { copyNuevo } from "@/content/sitio";
import { linkWhatsapp } from "@/lib/whatsapp";

/** CTA doble al pie de la página de producto. Doc 06 sprint 4.9. */
export function CtaDoble({ producto, nombreCotizador }: { producto: string; nombreCotizador: string }) {
  return (
    <div className="rounded-xl bg-parh-blue-900 p-8 text-center sm:p-10">
      <h2 className="text-2xl text-white">¿Avanzamos con tu {nombreCotizador}?</h2>
      <p className="mx-auto mt-2 max-w-md text-parh-cyan-100">
        {copyNuevo.fricciónCta}
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Button size="cta-lg" variant="onDark" asChild>
          <Link href={`/cotizar/?producto=${producto}`}>Cotizar online</Link>
        </Button>
        <Button
          size="cta-lg"
          variant="outline"
          className="border-parh-cyan-300/40 bg-transparent text-white hover:bg-parh-blue-800 hover:text-white"
          asChild
        >
          <a href={linkWhatsapp({ contexto: producto })} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="size-5" aria-hidden="true" />
            Hablar con un asesor
          </a>
        </Button>
      </div>
    </div>
  );
}
