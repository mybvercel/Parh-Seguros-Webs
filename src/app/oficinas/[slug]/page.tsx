import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { OficinaDetalle } from "@/components/oficina/oficina-detalle";
import { getOficina, oficinas } from "@/content/oficinas";
import { metadataDe } from "@/content/sitio";

export function generateStaticParams() {
  return oficinas.map((o) => ({ slug: o.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return metadataDe(`/oficinas/${slug}/`);
}

export default async function OficinaPage({ params }: Props) {
  const { slug } = await params;
  const oficina = getOficina(slug);
  if (!oficina) notFound();

  return <OficinaDetalle oficina={oficina} />;
}
