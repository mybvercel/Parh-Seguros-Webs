import Link from "next/link";

import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { ProductCard } from "@/components/sections/product-card";
import { Button } from "@/components/ui/button";
import type { Producto } from "@/content/types";

/** Hub de `/seguros/` o `/empresas/`. Doc 06 sprint 4.11. */
export function HubProductos({
  titulo,
  bajada,
  productos,
  rutaBase,
  migaLabel,
}: {
  titulo: string;
  bajada: string;
  productos: Producto[];
  rutaBase: string;
  migaLabel: string;
}) {
  return (
    <>
      <Breadcrumbs migas={[{ label: migaLabel, href: `${rutaBase}/` }]} />

      <section className="container-parh pb-4">
        <h1 className="max-w-2xl text-4xl">{titulo}</h1>
        <p className="mt-4 max-w-xl text-lg text-parh-slate-600">{bajada}</p>
      </section>

      <section className="section-parh">
        <div className="container-parh">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productos.map((p) => (
              <ProductCard key={p.slug} producto={p} href={`${rutaBase}/${p.slug}/`} />
            ))}
          </div>

          <div className="mt-10 rounded-xl bg-parh-cyan-50 p-8 text-center sm:p-10">
            <h2 className="text-2xl text-parh-blue-900">¿No sabés cuál necesitás?</h2>
            <p className="mx-auto mt-2 max-w-md text-parh-slate-600">
              Respondé 6 preguntas y te decimos qué riesgos podrían estar sin
              cubrir en lo que ya tenés.
            </p>
            <Button size="cta-lg" className="mt-5" asChild>
              <Link href="/diagnostico/">Hacer el diagnóstico</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
