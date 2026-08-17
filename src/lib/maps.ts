import type { Oficina } from "@/content/types";

/**
 * Links de Google Maps calculados desde `geo`, no desde `oficina.mapsUrl`.
 *
 * `mapsUrl` en content/oficinas.ts es un placeholder roto: el mismo string
 * genérico repetido en las 4 sucursales, que no lleva a ningún lado. Las
 * coordenadas de `geo` en cambio son reales (vienen de los links de Google
 * Maps que ya usa parh.com.ar), así que se arma el link desde ahí. Funciona
 * ya, sin esperar ningún dato nuevo de Roberto.
 */
export function linkComoLlegar(oficina: Oficina): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${oficina.geo.lat},${oficina.geo.lng}`;
}

/** URL del embed sin necesitar API key de Google Maps. */
export function linkMapaEmbebido(oficina: Oficina): string {
  return `https://www.google.com/maps?q=${oficina.geo.lat},${oficina.geo.lng}&z=15&output=embed`;
}
