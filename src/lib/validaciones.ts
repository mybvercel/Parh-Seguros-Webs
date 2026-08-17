import { z } from "zod";

/**
 * Esquemas de validación de formularios. Doc 06 sprint 6.1.
 * Mensajes en castellano rioplatense, en el mismo registro que el resto del copy.
 */

const nombre = z
  .string()
  .trim()
  .min(2, "Ingresá tu nombre completo")
  .max(80, "Ese nombre es demasiado largo");

const whatsapp = z
  .string()
  .trim()
  .min(8, "Ingresá un número de WhatsApp válido")
  .max(20, "Ese número es demasiado largo")
  .regex(/^[\d\s()+-]+$/, "Usá solo números, espacios y guiones");

const email = z.email("Ingresá un email válido");

const mensaje = z
  .string()
  .trim()
  .min(5, "Contanos brevemente qué necesitás")
  .max(1000, "El mensaje es demasiado largo");

/** Campo trampa. Si llega con contenido, el envío se descarta en el backend. */
const honeypot = z.string().max(0, "").optional().or(z.literal(""));

export const schemaLeadCorto = z.object({
  nombre,
  whatsapp,
  producto: z.string().optional(),
  honeypot,
});
export type LeadCorto = z.infer<typeof schemaLeadCorto>;

export const schemaContacto = z.object({
  nombre,
  email,
  whatsapp,
  comoNosEncontraste: z
    .enum(["google", "instagram", "facebook", "recomendacion", "otro"])
    .optional(),
  mensaje,
  honeypot,
});
export type Contacto = z.infer<typeof schemaContacto>;

export const schemaDiagnosticoContacto = z.object({
  nombre,
  whatsapp,
  email: z.email("Ingresá un email válido").optional().or(z.literal("")),
  localidad: z.string().trim().max(80).optional(),
  honeypot,
});
export type DiagnosticoContacto = z.infer<typeof schemaDiagnosticoContacto>;

export const OPCIONES_COMO_NOS_ENCONTRASTE = [
  { value: "google", label: "Buscando en Google" },
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "recomendacion", label: "Me lo recomendó alguien" },
  { value: "otro", label: "Otro" },
] as const;
