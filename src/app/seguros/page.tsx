import type { Metadata } from "next";

import { HubProductos } from "@/components/producto/hub-productos";
import { productosPersonas } from "@/content/productos-personas";
import { metadataDe } from "@/content/sitio";

export const metadata: Metadata = metadataDe("/seguros/");

export default function SegurosHubPage() {
  return (
    <HubProductos
      titulo="Seguros para vos y tu familia"
      bajada="Auto, moto, hogar, vida, retiro y accidentes personales. Comparamos entre varias compañías y te asesoramos sin cargo."
      productos={productosPersonas}
      rutaBase="/seguros"
      migaLabel="Seguros"
    />
  );
}
