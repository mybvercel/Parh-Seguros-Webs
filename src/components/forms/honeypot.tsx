import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

/**
 * Campo trampa para bots. Doc 05 sección 5.
 *
 * Oculto por posición, no por `display:none`: algunos bots ignoran los
 * campos con `display:none` pero igual completan los que están fuera de
 * pantalla. Invisible también para lectores de pantalla y fuera del
 * recorrido de tabulación, así que a una persona real nunca lo ve.
 * Si `lead.php` recibe este campo con contenido, descarta el envío en
 * silencio (responde éxito igual, para no delatarle al bot que fue detectado).
 */
export function Honeypot<T extends FieldValues>({
  register,
}: {
  register: UseFormRegister<T>;
}) {
  return (
    <div
      aria-hidden="true"
      className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden"
    >
      <label htmlFor="empresa_web">Dejá este campo vacío</label>
      <input
        id="empresa_web"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        {...register("honeypot" as Path<T>)}
      />
    </div>
  );
}
