import Link from "next/link";
import { motion } from "motion/react";
import { AlertTriangle, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { evento } from "@/lib/analytics";
import { linkWhatsapp } from "@/lib/whatsapp";
import type { PuntoCiego, Respuestas } from "@/content/diagnostico";

/**
 * Pantalla de resultado. Doc 03 sección 2.2: entregable inmediato en
 * pantalla, nunca un PDF ni una espera de mail.
 */
export function ResultadoDiagnostico({
  hallazgos,
  respuestas,
  nombre,
}: {
  hallazgos: PuntoCiego[];
  respuestas: Respuestas;
  nombre: string;
}) {
  const mensajeWhatsapp = resumenParaWhatsappConHallazgos(respuestas, nombre, hallazgos);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className="eyebrow">Tu diagnóstico</p>
      <h2 className="mt-3 text-3xl">
        {nombre ? `${nombre}, esto` : "Esto"} es lo que encontramos
      </h2>
      <p className="mt-2 text-parh-slate-600">
        {hallazgos.length === 1
          ? "Encontramos un punto para revisar."
          : `Encontramos ${hallazgos.length} puntos para revisar.`}{" "}
        No implica que tengas un problema, sí que vale la pena confirmarlo con
        un asesor.
      </p>

      <ul className="mt-6 space-y-3">
        {hallazgos.map((h) => (
          <li
            key={h.id}
            className="flex gap-3 rounded-lg border border-parh-slate-200 bg-white p-4"
          >
            <AlertTriangle
              className="mt-0.5 size-5 shrink-0 text-parh-warning"
              aria-hidden="true"
            />
            <div>
              <p className="font-semibold text-parh-blue-900">{h.titulo}</p>
              <p className="mt-1 text-sm text-parh-slate-600">{h.detalle}</p>
              {h.producto ? (
                <Link
                  href={rutaProducto(h.producto)}
                  className="mt-2 inline-block text-sm font-semibold text-parh-blue-700 hover:underline"
                >
                  Ver esta cobertura
                </Link>
              ) : null}
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 rounded-xl bg-parh-blue-900 p-6 text-center sm:p-8">
        <p className="text-lg text-white">
          Un asesor de PARH revisa tu diagnóstico y te contesta hoy
        </p>
        <Button size="cta-lg" variant="onDark" className="mt-4" asChild>
          <a
            href={linkWhatsapp({ mensaje: mensajeWhatsapp })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => evento("whatsapp_click", { location: "diagnostico_resultado" })}
          >
            <MessageCircle className="size-5" aria-hidden="true" />
            Hablar con un asesor
          </a>
        </Button>
      </div>
    </motion.div>
  );
}

const SLUGS_PERSONAS = new Set([
  "automotor",
  "motovehiculo",
  "hogar",
  "vida",
  "retiro",
  "accidentes-personales",
]);

function rutaProducto(slug: string): string {
  return SLUGS_PERSONAS.has(slug) ? `/seguros/${slug}/` : `/empresas/${slug}/`;
}

function resumenParaWhatsappConHallazgos(
  r: Respuestas,
  nombre: string,
  hallazgos: PuntoCiego[],
): string {
  const primeros = hallazgos.slice(0, 2).map((h) => `- ${h.titulo}`);
  return [
    `Hola PARH, hice el diagnóstico en la web${nombre ? `, soy ${nombre}` : ""}.`,
    "Me encontró estos puntos para revisar:",
    ...primeros,
    "¿Podemos hablarlo?",
  ].join("\n");
}
