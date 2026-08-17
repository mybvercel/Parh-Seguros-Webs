import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbList, type Miga } from "@/lib/schema";

/**
 * Ruta de navegación, visible y en schema. Se pasa sin el Inicio, que se agrega
 * acá para que ninguna página se lo olvide.
 */
export function Breadcrumbs({ migas }: { migas: Miga[] }) {
  const todas: Miga[] = [{ label: "Inicio", href: "/" }, ...migas];

  return (
    <>
      <JsonLd data={breadcrumbList(todas)} />
      <nav aria-label="Ruta de navegación" className="container-parh py-4">
        <ol className="flex flex-wrap items-center gap-1 text-xs text-parh-slate-600">
          {todas.map((m, i) => {
            const ultima = i === todas.length - 1;
            return (
              <li key={m.href} className="flex items-center gap-1">
                {i > 0 ? (
                  <ChevronRight
                    className="size-3 text-parh-slate-400"
                    aria-hidden="true"
                  />
                ) : null}
                {ultima ? (
                  <span aria-current="page" className="font-medium text-parh-blue-900">
                    {m.label}
                  </span>
                ) : (
                  <Link href={m.href} className="transition-colors hover:text-parh-blue-700">
                    {m.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
