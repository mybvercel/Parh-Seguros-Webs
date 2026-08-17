"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";

import { ProductCard } from "@/components/sections/product-card";
import { productosEmpresas } from "@/content/productos-empresas";
import { productosPersonas } from "@/content/productos-personas";
import type { Segmento } from "@/content/types";

/**
 * Grilla de productos conectada al mismo toggle Personas / Empresas del hero.
 * Doc 02 sección D. 1 columna en mobile, 2 en md, 3 en lg. Doc 04 sección 5.
 */
export function ProductGrid() {
  const [segmento, setSegmento] = useState<Segmento>("personas");
  const productos = segmento === "personas" ? productosPersonas : productosEmpresas;
  const rutaBase = segmento === "personas" ? "/seguros" : "/empresas";
  const hub = segmento === "personas" ? "/seguros/" : "/empresas/";

  return (
    <section className="section-parh bg-white">
      <div className="container-parh">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Coberturas</p>
            <h2 className="mt-3 text-3xl">
              {segmento === "personas" ? "Seguros para vos y tu familia" : "Seguros para tu negocio"}
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Elegí qué querés proteger"
            className="inline-flex gap-1 self-start rounded-lg bg-parh-slate-100 p-1"
          >
            {(["personas", "empresas"] as const).map((s) => (
              <button
                key={s}
                type="button"
                role="tab"
                aria-selected={segmento === s}
                onClick={() => setSegmento(s)}
                className={`min-h-10 rounded-md px-4 text-sm font-semibold transition-colors ${
                  segmento === s
                    ? "bg-white text-parh-blue-900 shadow-parh-sm"
                    : "text-parh-slate-600 hover:text-parh-blue-900"
                }`}
              >
                {s === "personas" ? "Personas" : "Empresas"}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={segmento}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {productos.map((p) => (
              <ProductCard key={p.slug} producto={p} href={`${rutaBase}/${p.slug}/`} />
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 text-center">
          <Link
            href={hub}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-parh-blue-700 hover:underline"
          >
            Ver todos los seguros para{" "}
            {segmento === "personas" ? "personas" : "empresas"}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
