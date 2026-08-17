import type { Metadata } from "next";
import { Suspense } from "react";

import { CotizarContenido } from "@/components/cotizador/cotizar-contenido";
import { metadataDe } from "@/content/sitio";

export const metadata: Metadata = metadataDe("/cotizar/");

export default function CotizarPage() {
  return (
    <Suspense>
      <CotizarContenido />
    </Suspense>
  );
}
