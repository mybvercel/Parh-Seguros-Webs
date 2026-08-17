import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { DiagnosticoWizard } from "@/components/diagnostico/diagnostico-wizard";
import { metadataDe } from "@/content/sitio";

export const metadata: Metadata = metadataDe("/diagnostico/");

export default function DiagnosticoPage() {
  return (
    <>
      <Breadcrumbs migas={[{ label: "Diagnóstico", href: "/diagnostico/" }]} />

      <section className="container-parh section-parh max-w-xl">
        <p className="eyebrow">Gratis, en 90 segundos</p>
        <h1 className="mt-3 text-3xl">Diagnóstico de cobertura</h1>
        <p className="mt-2 text-parh-slate-600">
          Respondé estas preguntas y te decimos qué riesgos podrían estar sin
          cubrir en lo que ya tenés.
        </p>

        <div className="mt-8">
          <DiagnosticoWizard />
        </div>
      </section>
    </>
  );
}
