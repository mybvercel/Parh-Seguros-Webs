import type { Metrica } from "./types";

/**
 * Franja de confianza. Doc 03 sección 4.3.
 *
 * Todos los números los confirmó el cliente (2026-08-12), así que dejan de
 * ser placeholder. La cantidad de compañías pasó de 6 a 15: las 6 que estaban
 * eran solo las que tienen cotizador online enlazado desde parh.com.ar, no
 * el total con el que PARH opera.
 *
 * Regla del doc 04 sección 8.2: nada de contadores animados con números
 * redondos falsos. Estos son los que dio el cliente.
 */
export const metricas: Metrica[] = [
  {
    valor: 20,
    prefijo: "+",
    sufijo: " años",
    label: "de trayectoria en el rubro",
    origen: "real",
  },
  {
    valor: 4,
    label: "sucursales",
    origen: "real",
  },
  {
    valor: 15,
    label: "compañías con las que operamos",
    origen: "real",
  },
  {
    valor: 10000,
    prefijo: "+",
    label: "clientes asegurados",
    origen: "real",
  },
];
