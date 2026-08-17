"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { sitio } from "@/content/sitio";

const MENSAJES: Record<string, string> = {
  lead_corto: "Recibimos tu consulta.",
  contacto: "Recibimos tu mensaje.",
  diagnostico: "Recibimos tu diagnóstico.",
};

/** Separado del page.tsx porque `useSearchParams` necesita un Suspense boundary. */
export function GraciasContenido() {
  const params = useSearchParams();
  const origen = params.get("origen") ?? "";
  const titulo = MENSAJES[origen] ?? "Recibimos tu mensaje.";

  return (
    <div className="container-parh section-parh max-w-lg text-center">
      <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-parh-cyan-50">
        <CheckCircle2 className="size-7 text-parh-success" aria-hidden="true" />
      </span>

      <h1 className="mt-5 text-3xl">{titulo}</h1>
      <p className="mt-3 text-lg text-parh-slate-600">
        Te respondemos el mismo día hábil. Si es urgente, también podés
        escribirnos por WhatsApp al{" "}
        <span data-numeric>{sitio.telefono}</span>.
      </p>

      <Button size="cta-lg" className="mt-7" asChild>
        <Link href="/">Volver al inicio</Link>
      </Button>
    </div>
  );
}
