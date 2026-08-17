"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Campo } from "@/components/forms/campo";
import { Honeypot } from "@/components/forms/honeypot";
import { schemaLeadCorto, type LeadCorto } from "@/lib/validaciones";
import { enviarLead } from "@/lib/enviar-lead";
import { evento } from "@/lib/analytics";
import { linkWhatsapp } from "@/lib/whatsapp";
import type { Compania } from "@/content/types";

/**
 * Modal de captura previa a derivar al cotizador de un tercero.
 * Doc 03 sección 2.3.
 *
 * Los seis cotizadores hoy mandan el 100% del tráfico afuera del dominio sin
 * dejar ningún dato: si el usuario abandona el formulario de la compañía a
 * mitad de camino, PARH nunca se entera. Este paso intermedio recupera parte
 * de ese dato antes de derivar, con la opción explícita de saltearlo para no
 * bloquear a quien no quiere completarlo.
 */
export function QuoteModal({
  compania,
  children,
}: {
  compania: Compania;
  children: React.ReactNode;
}) {
  const [abierto, setAbierto] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const { register, handleSubmit, formState, reset } = useForm<LeadCorto>({
    resolver: zodResolver(schemaLeadCorto),
    defaultValues: { nombre: "", whatsapp: "", producto: compania.slug, honeypot: "" },
  });

  function irAlCotizador() {
    evento("cotizador_externo_click", { compania: compania.slug });
    window.open(compania.cotizadorUrl, "_blank", "noopener,noreferrer");
    setAbierto(false);
    reset();
  }

  async function alEnviar(datos: LeadCorto) {
    setEnviando(true);
    try {
      await enviarLead("cotizador_previo", { ...datos, compania: compania.slug });
      evento("lead_form_submit", { form_id: "cotizador_previo" });
    } catch {
      // Si falla el envío del dato, igual dejamos que la persona cotice:
      // el objetivo de este paso es capturar, nunca bloquear.
    } finally {
      setEnviando(false);
      irAlCotizador();
    }
  }

  return (
    <Dialog open={abierto} onOpenChange={setAbierto}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Antes de llevarte al cotizador de {compania.nombre}</DialogTitle>
          <DialogDescription>
            Dejanos tu nombre y WhatsApp. Si el cotizador se te complica o
            querés que comparemos con otra compañía, te escribimos nosotros.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(alEnviar)} className="space-y-4" noValidate>
          <Honeypot register={register} />

          <Campo id="qm-nombre" label="Nombre" error={formState.errors.nombre?.message}>
            <Input id="qm-nombre" autoComplete="name" {...register("nombre")} />
          </Campo>

          <Campo id="qm-whatsapp" label="WhatsApp" error={formState.errors.whatsapp?.message}>
            <Input
              id="qm-whatsapp"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="11 2345 6789"
              {...register("whatsapp")}
            />
          </Campo>

          <Button type="submit" size="cta" className="w-full" disabled={enviando}>
            {enviando ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
            Continuar al cotizador
          </Button>

          <div className="flex flex-col items-center gap-1.5 text-center text-sm">
            <button
              type="button"
              onClick={irAlCotizador}
              className="text-parh-slate-600 underline underline-offset-2 hover:text-parh-blue-700"
            >
              No hace falta, llevame directo
            </button>
            <a
              href={linkWhatsapp({ contexto: `que coticen por mí en ${compania.nombre}` })}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => evento("whatsapp_click", { location: `cotizador_${compania.slug}` })}
              className="font-semibold text-parh-blue-700 hover:underline"
            >
              ¿Preferís que cotice yo por vos? Escribinos
            </a>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
