"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Campo } from "@/components/forms/campo";
import { Honeypot } from "@/components/forms/honeypot";
import {
  schemaDiagnosticoContacto,
  type DiagnosticoContacto,
} from "@/lib/validaciones";
import type { Paso } from "@/content/diagnostico";

/** Último paso del wizard: los datos de contacto. Doc 03 sección 2.2, paso 6. */
export function PasoContacto({
  paso,
  onEnviar,
  onVolver,
  enviando,
  error,
}: {
  paso: Paso;
  onEnviar: (datos: DiagnosticoContacto) => void;
  onVolver: () => void;
  enviando: boolean;
  error: string | null;
}) {
  const { register, handleSubmit, formState } = useForm<DiagnosticoContacto>({
    resolver: zodResolver(schemaDiagnosticoContacto),
    defaultValues: { nombre: "", whatsapp: "", email: "", localidad: "", honeypot: "" },
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <h2 className="text-2xl">{paso.titulo}</h2>
      {paso.ayuda ? (
        <p className="mt-1.5 text-sm text-parh-slate-600">{paso.ayuda}</p>
      ) : null}

      <form onSubmit={handleSubmit(onEnviar)} className="mt-6 space-y-4" noValidate>
        <Honeypot register={register} />

        <Campo id="dg-nombre" label="Nombre" error={formState.errors.nombre?.message}>
          <Input id="dg-nombre" autoComplete="name" {...register("nombre")} />
        </Campo>

        <Campo id="dg-whatsapp" label="WhatsApp" error={formState.errors.whatsapp?.message}>
          <Input
            id="dg-whatsapp"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="11 2345 6789"
            {...register("whatsapp")}
          />
        </Campo>

        <div className="grid gap-4 sm:grid-cols-2">
          <Campo id="dg-email" label="Email (opcional)" error={formState.errors.email?.message}>
            <Input id="dg-email" type="email" autoComplete="email" {...register("email")} />
          </Campo>

          <Campo id="dg-localidad" label="Localidad (opcional)">
            <Input id="dg-localidad" autoComplete="address-level2" {...register("localidad")} />
          </Campo>
        </div>

        {error ? (
          <p role="alert" className="text-sm text-parh-error">
            {error}
          </p>
        ) : null}

        <div className="flex items-center gap-3 pt-1">
          <Button
            type="button"
            variant="ghost"
            onClick={onVolver}
            disabled={enviando}
          >
            Atrás
          </Button>
          <Button type="submit" size="cta" className="flex-1" disabled={enviando}>
            {enviando ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
            {enviando ? "Enviando..." : "Ver mi diagnóstico"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
