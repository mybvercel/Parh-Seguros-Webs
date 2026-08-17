/**
 * Envío de leads al endpoint PHP. Doc 05 sección 5.
 *
 * `public/api/lead.php` se sube junto al build estático: el servidor de
 * CloudPanel ya corre PHP, así que no hace falta un backend Node aparte.
 */

export interface RespuestaLead {
  ok: boolean;
  error?: string;
}

export class ErrorEnvioLead extends Error {}

export async function enviarLead(
  formulario: string,
  datos: Record<string, unknown>,
): Promise<void> {
  let respuesta: Response;

  try {
    respuesta = await fetch("/api/lead.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formulario, ...datos }),
    });
  } catch {
    throw new ErrorEnvioLead(
      "No pudimos conectar con el servidor. Probá de nuevo o escribinos por WhatsApp.",
    );
  }

  if (!respuesta.ok) {
    throw new ErrorEnvioLead(
      "Algo falló de nuestro lado. Probá de nuevo o escribinos por WhatsApp.",
    );
  }

  const cuerpo: RespuestaLead = await respuesta.json().catch(() => ({ ok: false }));
  if (!cuerpo.ok) {
    throw new ErrorEnvioLead(
      cuerpo.error ?? "No pudimos enviar el formulario. Probá de nuevo.",
    );
  }
}
