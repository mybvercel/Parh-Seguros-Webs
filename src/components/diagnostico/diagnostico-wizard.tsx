"use client";

import { useReducer } from "react";
import { AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

import { Progreso } from "@/components/diagnostico/progreso";
import { PasoOpcion } from "@/components/diagnostico/paso-opcion";
import { PasoContacto } from "@/components/diagnostico/paso-contacto";
import { ResultadoDiagnostico } from "@/components/diagnostico/resultado-diagnostico";
import {
  calcularPuntosCiegos,
  pasosVisibles,
  type Respuestas,
} from "@/content/diagnostico";
import type { DiagnosticoContacto } from "@/lib/validaciones";
import { enviarLead, ErrorEnvioLead } from "@/lib/enviar-lead";
import { evento } from "@/lib/analytics";

/**
 * Motor del wizard. Doc 06 sprint 6.7. Las preguntas, la ramificación y las
 * reglas de puntos ciegos viven en content/diagnostico.ts (Sprint 1) y ya
 * tienen sus propias pruebas en scripts/check-diagnostico.mts.
 */
interface Estado {
  pasoIndex: number;
  respuestas: Respuestas;
  fase: "preguntas" | "enviando" | "resultado";
  errorEnvio: string | null;
}

type Accion =
  | { tipo: "RESPONDER"; campo: keyof Respuestas; valor: string }
  | { tipo: "VOLVER" }
  | { tipo: "ENVIANDO" }
  | { tipo: "ENVIO_OK"; contacto: DiagnosticoContacto }
  | { tipo: "ENVIO_ERROR"; mensaje: string };

const ESTADO_INICIAL: Estado = {
  pasoIndex: 0,
  respuestas: {},
  fase: "preguntas",
  errorEnvio: null,
};

function reducer(estado: Estado, accion: Accion): Estado {
  switch (accion.tipo) {
    case "RESPONDER": {
      const respuestas = { ...estado.respuestas, [accion.campo]: accion.valor };
      const visibles = pasosVisibles(respuestas);
      const posicionActual = visibles.findIndex((p) => p.id === accion.campo);
      const pasoIndex = Math.min(posicionActual + 1, visibles.length - 1);
      return { ...estado, respuestas, pasoIndex };
    }
    case "VOLVER":
      return { ...estado, pasoIndex: Math.max(0, estado.pasoIndex - 1) };
    case "ENVIANDO":
      return { ...estado, fase: "enviando", errorEnvio: null };
    case "ENVIO_OK":
      return {
        ...estado,
        fase: "resultado",
        respuestas: {
          ...estado.respuestas,
          nombre: accion.contacto.nombre,
          whatsapp: accion.contacto.whatsapp,
          email: accion.contacto.email,
          localidad: accion.contacto.localidad,
        },
      };
    case "ENVIO_ERROR":
      return { ...estado, fase: "preguntas", errorEnvio: accion.mensaje };
  }
}

export function DiagnosticoWizard() {
  const [estado, dispatch] = useReducer(reducer, ESTADO_INICIAL);
  const visibles = pasosVisibles(estado.respuestas);
  const paso = visibles[estado.pasoIndex];

  function elegir(campo: keyof Respuestas, valor: string) {
    if (estado.pasoIndex === 0) evento("diagnostico_start");
    dispatch({ tipo: "RESPONDER", campo, valor });
  }

  async function enviarContacto(datos: DiagnosticoContacto) {
    dispatch({ tipo: "ENVIANDO" });
    try {
      // El dato más valioso de todo el negocio: la fecha de vencimiento de
      // la póliza actual. Permite volver a llamar en el momento justo.
      // Doc 03 sección 2.2.
      await enviarLead("diagnostico", { ...estado.respuestas, ...datos });
      evento("diagnostico_complete", { objeto: estado.respuestas.objeto });
      dispatch({ tipo: "ENVIO_OK", contacto: datos });
    } catch (e) {
      dispatch({
        tipo: "ENVIO_ERROR",
        mensaje:
          e instanceof ErrorEnvioLead
            ? e.message
            : "No pudimos generar tu diagnóstico. Probá de nuevo.",
      });
    }
  }

  if (estado.fase === "resultado") {
    return (
      <ResultadoDiagnostico
        hallazgos={calcularPuntosCiegos(estado.respuestas)}
        respuestas={estado.respuestas}
        nombre={estado.respuestas.nombre ?? ""}
      />
    );
  }

  return (
    <div>
      <Progreso actual={estado.pasoIndex} total={visibles.length} />

      <div className="mt-6 min-h-[22rem]">
        <AnimatePresence mode="wait">
          {paso.tipo === "opcion" ? (
            <PasoOpcion
              key={paso.id}
              paso={paso}
              onElegir={(valor) => elegir(paso.id as keyof Respuestas, valor)}
            />
          ) : (
            <PasoContacto
              key={paso.id}
              paso={paso}
              onEnviar={enviarContacto}
              onVolver={() => dispatch({ tipo: "VOLVER" })}
              enviando={estado.fase === "enviando"}
              error={estado.errorEnvio}
            />
          )}
        </AnimatePresence>
      </div>

      {estado.pasoIndex > 0 && paso.tipo === "opcion" ? (
        <Button variant="ghost" size="cta" className="mt-4" onClick={() => dispatch({ tipo: "VOLVER" })}>
          <ChevronLeft className="size-4" aria-hidden="true" />
          Atrás
        </Button>
      ) : null}
    </div>
  );
}
