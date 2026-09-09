import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { OfficeCard } from "@/components/sections/office-card";
import { oficinas } from "@/content/oficinas";

/** Índice `/oficinas/`. Doc 06 sprint 5.1. */
export function HubOficinas() {
  return (
    <>
      <Breadcrumbs migas={[{ label: "Oficinas", href: "/oficinas/" }]} />

      <section className="container-parh pb-4 text-center">
        <h1 className="text-4xl">Nuestras cuatro oficinas</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-parh-slate-600">
          Morón, Marcos Paz, Mercedes y Luján. Cuatro oficinas donde podés
          venir a hablar con un asesor en persona.
        </p>
      </section>

      <section className="section-parh">
        <div className="container-parh grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {oficinas.map((o) => (
            <OfficeCard key={o.slug} oficina={o} />
          ))}
        </div>
      </section>
    </>
  );
}
