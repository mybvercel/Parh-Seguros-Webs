import type { HorarioDia } from "@/content/types";

const DIA_CORTO: Record<string, string> = {
  Monday: "Lun",
  Tuesday: "Mar",
  Wednesday: "Mié",
  Thursday: "Jue",
  Friday: "Vie",
  Saturday: "Sáb",
  Sunday: "Dom",
};

/** "Monday..Friday" → "Lun a Vie". Usado en OfficeCard y en la landing de sucursal. */
export function rangoDias(dias: string[]): string {
  if (dias.length === 1) return DIA_CORTO[dias[0]];
  return `${DIA_CORTO[dias[0]]} a ${DIA_CORTO[dias[dias.length - 1]]}`;
}

export function textoHorario(h: HorarioDia): string {
  return `${rangoDias(h.dias)} de ${h.desde} a ${h.hasta}`;
}
