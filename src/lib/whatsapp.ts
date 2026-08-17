import { sitio } from "@/content/sitio";

/**
 * Armado de links de WhatsApp con mensaje prellenado. Doc 05 sección 5.
 *
 * El mensaje cambia según desde dónde se hace clic, así el asesor sabe de qué
 * habla la persona antes de contestar. Hoy en parh.com.ar todos los botones
 * abren el mismo chat vacío, así que toda conversación arranca de cero.
 */

export interface WhatsappOpts {
  /** Producto o contexto desde el que se abre el chat. */
  contexto?: string;
  /** Mensaje completo, si se quiere reemplazar el armado automático. */
  mensaje?: string;
}

export function linkWhatsapp({ contexto, mensaje }: WhatsappOpts = {}): string {
  const texto =
    mensaje ??
    (contexto
      ? `Hola PARH, quiero consultar por ${contexto}. Vengo de la web.`
      : "Hola PARH, quiero hacer una consulta. Vengo de la web.");

  return `https://wa.me/${sitio.telefonoE164}?text=${encodeURIComponent(texto)}`;
}

/** Link `tel:` en formato internacional. */
export function linkTelefono(e164: string = sitio.telefonoE164): string {
  return `tel:+${e164}`;
}
