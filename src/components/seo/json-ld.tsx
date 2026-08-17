/**
 * Inyección de JSON-LD. Doc 03 sección 5.4.
 *
 * parh.com.ar hoy no tiene una sola línea de Schema.org, con 4 sucursales
 * físicas que deberían estar declaradas como InsuranceAgency.
 *
 * Se usa `<script type="application/ld+json">` y nunca microdata inline.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // El contenido es nuestro y está tipado. Se escapa `<` para cerrar la
      // posibilidad de romper el script si algún día entra texto del usuario.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
