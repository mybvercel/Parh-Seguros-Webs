import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductoDetalle } from "@/components/producto/producto-detalle";
import { productosPersonas, slugsPersonas } from "@/content/productos-personas";
import { metadataDe } from "@/content/sitio";

export function generateStaticParams() {
  return slugsPersonas.map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return metadataDe(`/seguros/${slug}/`);
}

export default async function ProductoPersonasPage({ params }: Props) {
  const { slug } = await params;
  const producto = productosPersonas.find((p) => p.slug === slug);
  if (!producto) notFound();

  return <ProductoDetalle producto={producto} />;
}
