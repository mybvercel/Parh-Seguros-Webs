"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import { Button } from "@/components/ui/button";
import { HeroCardTile } from "@/components/sections/hero-card";
import { heroEmpresas, heroPersonas } from "@/content/hero-destacados";
import { copyHeredado, copyNuevo } from "@/content/sitio";
import type { Segmento } from "@/content/types";

/**
 * Hero con toggle Personas / Empresas. Doc 02 sección D.
 *
 * Estructura inspirada en worthinsurance.com (título centrado, selector de
 * segmento, grilla grande de coberturas debajo) pero con la paleta de PARH
 * (celeste, no amarillo) y sin la tipografía serif ni el banner de Worth.
 * El copy del H1 y del subtítulo es verbatim de parh.com.ar, doc 03 sección
 * 4.1: no se reescribe, solo se reordena el layout alrededor.
 */
const [tituloPrimeraParte, tituloSegundaParte] = copyHeredado.heroTitulo.split(", ");

export function Hero() {
  const [segmento, setSegmento] = useState<Segmento>("personas");
  const cards = segmento === "personas" ? heroPersonas : heroEmpresas;

  return (
    <section className="border-b border-parh-slate-200 bg-gradient-to-b from-parh-cyan-50 to-white">
      <div className="container-parh py-14 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Bróker de seguros</p>

          <h1 className="mt-3 text-4xl">
            {/* Split del copy verbatim (doc 03 sección 4.1) solo para el
                subrayado visual; el texto reconstruido es idéntico al original. */}
            {tituloPrimeraParte},{" "}
            <span className="relative inline-block">
              {tituloSegundaParte}
              <svg
                viewBox="0 0 300 14"
                aria-hidden="true"
                className="absolute -bottom-1.5 left-0 h-3 w-full text-parh-cyan-400"
              >
                <path
                  d="M2 9c40-8 80-8 148-6 60 2 100 2 148-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-5 text-xl text-parh-slate-600">
            {copyHeredado.heroSubtitulo}
          </p>

          <div
            role="tablist"
            aria-label="Elegí qué querés proteger"
            className="mx-auto mt-8 grid w-fit grid-cols-2 gap-1 rounded-full bg-white p-1 shadow-parh-sm ring-1 ring-parh-slate-200"
          >
            {(["personas", "empresas"] as const).map((s) => (
              <button
                key={s}
                type="button"
                role="tab"
                aria-selected={segmento === s}
                onClick={() => setSegmento(s)}
                className={`min-h-11 rounded-full px-8 text-sm font-semibold transition-colors ${
                  segmento === s
                    ? "bg-parh-blue-700 text-white"
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
            className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
          >
            {cards.map((card) => (
              <HeroCardTile key={card.slug} card={card} />
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex flex-col items-center gap-3">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button size="cta-lg" asChild>
              <Link href="/diagnostico/">Hacer el diagnóstico</Link>
            </Button>
            <Button size="cta-lg" variant="outline" asChild>
              <Link href="/cotizar/">{copyHeredado.cta}</Link>
            </Button>
          </div>
          <p className="text-sm text-parh-slate-600">{copyNuevo.fricciónCta}</p>
        </div>
      </div>
    </section>
  );
}
