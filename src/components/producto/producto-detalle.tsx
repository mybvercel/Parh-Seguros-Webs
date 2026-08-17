import { Icono } from "@/components/ui/icono";
import { Imagen } from "@/components/ui/imagen";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { FaqSection } from "@/components/sections/faq-section";
import { CoberturaColumnas } from "@/components/producto/cobertura-columnas";
import { ParaQuien } from "@/components/producto/para-quien";
import { CompaniasProducto } from "@/components/producto/companias-producto";
import { ContactoRapido } from "@/components/producto/contacto-rapido";
import { CtaDoble } from "@/components/producto/cta-doble";
import { getFaqs } from "@/content/faqs";
import { companias as todasLasCompanias } from "@/content/companias";
import { service } from "@/lib/schema";
import type { Producto, Segmento } from "@/content/types";

/**
 * Plantilla única de página de producto. Doc 06 sprint 4.1 y 4.2.
 * La renderizan `/seguros/[slug]/page.tsx` y `/empresas/[slug]/page.tsx`.
 */
export function ProductoDetalle({ producto }: { producto: Producto }) {
  const hub: Record<Segmento, { label: string; href: string }> = {
    personas: { label: "Seguros", href: "/seguros/" },
    empresas: { label: "Empresas", href: "/empresas/" },
  };
  const rutaBase = producto.segmento === "personas" ? "/seguros" : "/empresas";
  const companiasProducto = todasLasCompanias.filter((c) =>
    producto.companias.includes(c.slug),
  );
  const faqsProducto = getFaqs(producto.slug);

  return (
    <>
      <JsonLd
        data={service({
          nombre: producto.nombre,
          descripcion: producto.introduccion,
          ruta: `${rutaBase}/${producto.slug}/`,
          coberturas: producto.cubre,
        })}
      />

      <Breadcrumbs
        migas={[hub[producto.segmento], { label: producto.nombre, href: `${rutaBase}/${producto.slug}/` }]}
      />

      {/* Hero de producto */}
      <section className="container-parh grid gap-10 pb-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <div className="flex items-center gap-2 text-parh-cyan-600">
            <Icono nombre={producto.icono} className="size-6" />
            <p className="eyebrow">
              {producto.segmento === "personas" ? "Seguros para personas" : "Seguros para empresas"}
            </p>
          </div>
          <h1 className="mt-3 text-4xl">{producto.titulo}</h1>
          <p className="mt-4 max-w-xl text-lg text-parh-slate-600">
            {producto.introduccion}
          </p>
        </div>

        <ContactoRapido producto={producto.slug} />
      </section>

      <div className="container-parh mt-8">
        <Imagen
          base={producto.imagen}
          alt={producto.alt}
          aspect="16/9"
          priority
          sizes="(min-width: 1024px) 960px, 100vw"
          className="rounded-xl"
        />
      </div>

      <section className="section-parh space-y-14">
        <div className="container-parh">
          <CoberturaColumnas cubre={producto.cubre} noCubre={producto.noCubre} />
        </div>

        <div className="container-parh">
          <ParaQuien items={producto.paraQuien} />
        </div>

        <div className="container-parh">
          <CompaniasProducto companias={companiasProducto} />
        </div>

        <div className="container-parh max-w-3xl">
          <h3 className="text-lg">En profundidad</h3>
          <p className="prose-parh mt-4 text-parh-slate-600">
            {producto.textoExtendido}
          </p>
        </div>

        <div className="container-parh">
          <CtaDoble producto={producto.slug} nombreCotizador={producto.nombre.toLowerCase()} />
        </div>
      </section>

      {faqsProducto.length > 0 ? (
        <FaqSection
          items={faqsProducto}
          eyebrow="Preguntas sobre este seguro"
          titulo={`Dudas frecuentes sobre ${producto.nombre.toLowerCase()}`}
        />
      ) : null}
    </>
  );
}
