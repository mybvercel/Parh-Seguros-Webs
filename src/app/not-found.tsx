import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Icono } from "@/components/ui/icono";
import { navEmpresas, navPersonas } from "@/components/layout/nav-data";

export const metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="container-parh section-parh">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-3 text-3xl">No encontramos esta página</h1>
      <p className="mt-3 max-w-prose text-lg text-parh-slate-600">
        Puede que el enlace esté viejo o que la dirección tenga un error. Te
        dejamos los accesos más buscados.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button size="cta" asChild>
          <Link href="/cotizar/">Cotizar un seguro</Link>
        </Button>
        <Button size="cta" variant="outline" asChild>
          <Link href="/">Volver al inicio</Link>
        </Button>
      </div>

      <div className="mt-12 grid gap-10 sm:grid-cols-2">
        {[
          { titulo: "Seguros para personas", items: navPersonas },
          { titulo: "Seguros para empresas", items: navEmpresas },
        ].map(({ titulo, items }) => (
          <div key={titulo}>
            <h2 className="font-heading text-base font-semibold text-parh-blue-900">
              {titulo}
            </h2>
            <ul className="mt-4 space-y-1">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex min-h-11 items-center gap-3 rounded-md px-2 text-sm font-medium text-parh-blue-900 transition-colors hover:bg-parh-cyan-50"
                  >
                    {item.icono ? (
                      <Icono
                        nombre={item.icono}
                        className="size-5 shrink-0 text-parh-cyan-600"
                      />
                    ) : null}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
