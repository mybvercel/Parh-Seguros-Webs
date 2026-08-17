/**
 * Eventos de conversión. Doc 03 sección 5.7.
 *
 * Hoy parh.com.ar no tiene ni Analytics ni Pixel ni página de gracias, así que
 * es imposible saber cuántos clientes trae la web. Este wrapper centraliza el
 * disparo para que ningún componente hable directo con gtag ni con fbq.
 *
 * GA4 y el Pixel se cargan en el Sprint 6. Mientras tanto las llamadas quedan
 * en cola y no rompen nada.
 */

export type EventoNombre =
  | "lead_form_submit"
  | "whatsapp_click"
  | "phone_click"
  | "cotizador_externo_click"
  | "diagnostico_start"
  | "diagnostico_complete"
  | "office_directions_click";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function evento(nombre: EventoNombre, params: Params = {}): void {
  if (typeof window === "undefined") return;

  // GA4. Si todavía no cargó, dataLayer acumula y se procesa al inicializar.
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: nombre, ...params });
  window.gtag?.("event", nombre, params);

  // Meta Pixel. Solo los eventos que representan un lead.
  if (nombre === "lead_form_submit" || nombre === "diagnostico_complete") {
    window.fbq?.("track", "Lead", params);
  }

  if (process.env.NODE_ENV === "development") {
    console.info(`[analytics] ${nombre}`, params);
  }
}
