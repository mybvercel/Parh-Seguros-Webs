import type { Metadata } from "next";

import { HubProductos } from "@/components/producto/hub-productos";
import { productosEmpresas } from "@/content/productos-empresas";
import { metadataDe } from "@/content/sitio";

export const metadata: Metadata = metadataDe("/empresas/");

export default function EmpresasHubPage() {
  return (
    <HubProductos
      titulo="Seguros para tu negocio"
      bajada="Responsabilidad civil, integral de comercio, seguro técnico y accidentes personales. Asesoramiento para PyMEs del Oeste bonaerense."
      productos={productosEmpresas}
      rutaBase="/empresas"
      migaLabel="Empresas"
    />
  );
}
