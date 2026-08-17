import { productosEmpresas } from "@/content/productos-empresas";
import { productosPersonas } from "@/content/productos-personas";
import { oficinas } from "@/content/oficinas";
import type { IconoKey } from "@/content/types";

/** Un ítem del mega menú o del menú mobile. */
export interface NavItem {
  href: string;
  label: string;
  descripcion?: string;
  icono?: IconoKey;
}

export const navPersonas: NavItem[] = productosPersonas.map((p) => ({
  href: `/seguros/${p.slug}/`,
  label: p.nombre,
  descripcion: p.bajada,
  icono: p.icono,
}));

export const navEmpresas: NavItem[] = productosEmpresas.map((p) => ({
  href: `/empresas/${p.slug}/`,
  label: p.nombre,
  descripcion: p.bajada,
  icono: p.icono,
}));

export const navOficinas: NavItem[] = oficinas.map((o) => ({
  href: `/oficinas/${o.slug}/`,
  label: o.localidad,
  descripcion: o.calle,
}));

/** Enlaces sueltos del header, después de los dos desplegables. */
export const navSimple: NavItem[] = [
  { href: "/cotizar/", label: "Cotizar" },
  { href: "/oficinas/", label: "Oficinas" },
  { href: "/nosotros/", label: "Nosotros" },
];
