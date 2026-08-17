import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductoDetalle } from "@/components/producto/producto-detalle";
import { productosEmpresas, slugsEmpresas } from "@/content/productos-empresas";
import { metadataDe } from "@/content/sitio";

export function generateStaticParams() {
  return slugsEmpresas.map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return metadataDe(`/empresas/${slug}/`);
}

export default async function ProductoEmpresasPage({ params }: Props) {
  const { slug } = await params;
  const producto = productosEmpresas.find((p) => p.slug === slug);
  if (!producto) notFound();

  return <ProductoDetalle producto={producto} />;
}
