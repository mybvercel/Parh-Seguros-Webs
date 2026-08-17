"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

import { metricas } from "@/content/metricas";

/**
 * Franja de confianza. Doc 02 sección D, patrón de NEXT.
 * Contador animado una sola vez al entrar en viewport. Doc 04 sección 7.
 */
function Contador({ valor }: { valor: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const enVista = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!enVista) return;

    // Respeta prefers-reduced-motion: si el usuario lo pide, va directo al final.
    const prefiereMenosMovimiento = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefiereMenosMovimiento) {
      setN(valor);
      return;
    }

    const duracionMs = 1200;
    const inicio = performance.now();

    let frame: number;
    const tick = (ahora: number) => {
      const t = Math.min((ahora - inicio) / duracionMs, 1);
      const easeOut = 1 - (1 - t) ** 3;
      setN(Math.round(valor * easeOut));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [enVista, valor]);

  return (
    <span ref={ref} data-numeric>
      {n.toLocaleString("es-AR")}
    </span>
  );
}

export function MetricsBar() {
  return (
    <section className="border-b border-parh-slate-200 bg-white">
      <div className="container-parh grid grid-cols-2 gap-y-8 py-10 sm:grid-cols-4 sm:py-12">
        {metricas.map((m) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <p className="font-heading text-3xl font-bold text-parh-blue-900">
              {m.prefijo}
              <Contador valor={m.valor} />
              {m.sufijo}
            </p>
            <p className="mt-1 text-sm text-parh-slate-600">{m.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
