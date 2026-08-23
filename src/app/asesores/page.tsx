import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Button } from "@/components/ui/button";
import { DirectorioAsesores } from "@/components/asesores/directorio-asesores";
import { metadataDe } from "@/content/sitio";

export const metadata: Metadata = metadataDe("/asesores/");

export default function AsesoresPage() {
  return (
    <>
      <Breadcrumbs migas={[{ label: "Asesores", href: "/asesores/" }]} />

      <section className="container-parh pb-4">
        <h1 className="max-w-2xl text-4xl">Nuestros asesores</h1>
        <p className="mt-4 max-w-xl text-lg text-parh-slate-600">
          Organizadores y Productores Asesores de Seguros que trabajan de forma
          exclusiva con PARH. Buscá por zona y hablá directo con quien atiende
          la tuya.
        </p>
      </section>

      <section className="section-parh">
        <div className="container-parh">
          <DirectorioAsesores />

          <div className="mt-10 rounded-xl bg-parh-cyan-50 p-8 text-center sm:p-10">
            <h2 className="text-2xl text-parh-blue-900">
              ¿Sos productor y querés sumarte a la red?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-parh-slate-600">
              Trabajamos con productores en todo el país. Escribinos y te
              contamos cómo es operar con nosotros.
            </p>
            <Button size="cta-lg" className="mt-5" asChild>
              <Link href="/contacto/">Hablar con nosotros</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
