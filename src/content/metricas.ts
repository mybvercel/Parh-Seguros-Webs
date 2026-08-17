import type { Metrica } from "./types";

/**
 * Franja de confianza. Doc 03 sección 4.3.
 *
 * REAL: los 20 años (declarados en parh.com.ar), las 4 oficinas y las
 * 6 compañías y plataformas (contadas de los links del sitio actual).
 *
 * INVENTADO: la cantidad de clientes asegurados. Es el único número que no
 * se puede derivar del sitio y necesita el dato de Roberto.
 *
 * Regla del doc 04 sección 8.2: nada de contadores animados con números
 * redondos falsos. Si el dato real no llega, esta métrica se saca.
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
    label: "oficinas en el Oeste bonaerense",
    origen: "real",
  },
  {
    valor: 6,
    label: "compañías y plataformas con las que operamos",
    origen: "real",
  },
  {
    valor: 3200,
    prefijo: "+",
    label: "clientes asegurados",
    origen: "placeholder",
  },
];
