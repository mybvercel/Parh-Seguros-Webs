import { linkMapaEmbebido } from "@/lib/maps";
import type { Oficina } from "@/content/types";

/**
 * Mapa embebido sin API key de Google Maps, vía el parámetro `output=embed`.
 * Doc 06 sprint 5.2: "mapa embebido lazy".
 */
export function MapaEmbebido({ oficina }: { oficina: Oficina }) {
  return (
    <div className="overflow-hidden rounded-lg border border-parh-slate-200">
      <iframe
        src={linkMapaEmbebido(oficina)}
        title={`Mapa de la oficina de PARH en ${oficina.localidad}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="aspect-[16/10] w-full"
      />
    </div>
  );
}
