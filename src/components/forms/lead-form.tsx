"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Campo } from "@/components/forms/campo";
import { Honeypot } from "@/components/forms/honeypot";
import {
  OPCIONES_COMO_NOS_ENCONTRASTE,
  schemaContacto,
  schemaLeadCorto,
  type Contacto,
  type LeadCorto,
} from "@/lib/validaciones";
import { enviarLead, ErrorEnvioLead } from "@/lib/enviar-lead";
import { evento } from "@/lib/analytics";

/**
 * Formulario de captura de leads. Doc 06 sprint 6.1.
 *
 * Dos variantes reales (doc 05 sección 4):
 * - "corto": nombre y WhatsApp. Se usa en el `QuoteModal` de captura previa.
 * - "contacto": formulario completo de `/contacto/`.
 */
type Props =
  | { variant: "corto"; producto?: string; onSuccess?: () => void }
  | { variant: "contacto"; producto?: undefined; onSuccess?: () => void };

export function LeadForm(props: Props) {
  const router = useRouter();
  const [enviando, setEnviando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState<string | null>(null);

  const formCorto = useForm<LeadCorto>({
    resolver: zodResolver(schemaLeadCorto),
    defaultValues: { nombre: "", whatsapp: "", producto: props.producto ?? "", honeypot: "" },
  });

  const formContacto = useForm<Contacto>({
    resolver: zodResolver(schemaContacto),
    defaultValues: {
      nombre: "",
      email: "",
      whatsapp: "",
      mensaje: "",
      honeypot: "",
    },
  });

  async function alEnviar(formulario: string, datos: Record<string, unknown>) {
    setErrorEnvio(null);
    setEnviando(true);
    try {
      await enviarLead(formulario, datos);
      evento("lead_form_submit", { form_id: formulario });
      props.onSuccess?.();
      router.push(`/gracias/?origen=${formulario}`);
    } catch (e) {
      setErrorEnvio(
        e instanceof ErrorEnvioLead ? e.message : "No pudimos enviar el formulario.",
      );
    } finally {
      setEnviando(false);
    }
  }

  if (props.variant === "corto") {
    const { register, handleSubmit, formState } = formCorto;
    return (
      <form
        onSubmit={handleSubmit((datos) => alEnviar("lead_corto", datos))}
        className="space-y-4"
        noValidate
      >
        <Honeypot register={register} />

        <Campo id="lc-nombre" label="Nombre" error={formState.errors.nombre?.message}>
          <Input id="lc-nombre" autoComplete="name" {...register("nombre")} />
        </Campo>

        <Campo id="lc-whatsapp" label="WhatsApp" error={formState.errors.whatsapp?.message}>
          <Input
            id="lc-whatsapp"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="11 2345 6789"
            {...register("whatsapp")}
          />
        </Campo>

        {errorEnvio ? (
          <p role="alert" className="text-sm text-parh-error">
            {errorEnvio}
          </p>
        ) : null}

        <Button type="submit" size="cta" className="w-full" disabled={enviando}>
          {enviando ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
          {enviando ? "Enviando..." : "Enviar"}
        </Button>
      </form>
    );
  }

  const { register, handleSubmit, control, formState } = formContacto;
  return (
    <form
      onSubmit={handleSubmit((datos) => alEnviar("contacto", datos))}
      className="space-y-4"
      noValidate
    >
      <Honeypot register={register} />

      <div className="grid gap-4 sm:grid-cols-2">
        <Campo id="ct-nombre" label="Nombre" error={formState.errors.nombre?.message}>
          <Input id="ct-nombre" autoComplete="name" {...register("nombre")} />
        </Campo>

        <Campo id="ct-whatsapp" label="WhatsApp" error={formState.errors.whatsapp?.message}>
          <Input
            id="ct-whatsapp"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="11 2345 6789"
            {...register("whatsapp")}
          />
        </Campo>
      </div>

      <Campo id="ct-email" label="Email" error={formState.errors.email?.message}>
        <Input id="ct-email" type="email" autoComplete="email" {...register("email")} />
      </Campo>

      <Campo id="ct-como" label="¿Cómo nos encontraste?" error={formState.errors.comoNosEncontraste?.message}>
        <Controller
          control={control}
          name="comoNosEncontraste"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="ct-como" className="w-full">
                <SelectValue placeholder="Elegí una opción" />
              </SelectTrigger>
              <SelectContent>
                {OPCIONES_COMO_NOS_ENCONTRASTE.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </Campo>

      <Campo id="ct-mensaje" label="Mensaje" error={formState.errors.mensaje?.message}>
        <Textarea id="ct-mensaje" rows={4} {...register("mensaje")} />
      </Campo>

      {errorEnvio ? (
        <p role="alert" className="text-sm text-parh-error">
          {errorEnvio}
        </p>
      ) : null}

      <Button type="submit" size="cta" className="w-full" disabled={enviando}>
        {enviando ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
        {enviando ? "Enviando..." : "Enviar consulta"}
      </Button>
    </form>
  );
}
