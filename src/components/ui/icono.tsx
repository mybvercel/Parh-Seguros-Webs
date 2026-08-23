import {
  Bike,
  Briefcase,
  Car,
  HardHat,
  HeartPulse,
  House,
  PiggyBank,
  FileCheck,
  Plane,
  Scale,
  ShieldCheck,
  ShieldPlus,
  Smartphone,
  Store,
  type LucideIcon,
} from "lucide-react";

import type { IconoKey } from "@/content/types";

/**
 * Mapa de íconos. El contenido guarda una clave, no un componente, para que
 * `src/content` quede libre de imports de React y siga siendo texto puro.
 *
 * Doc 04 sección 8.2: los íconos representan algo concreto (auto, casa, local).
 * Nada de íconos genéricos de "Seguridad" o "Confianza".
 */
const ICONOS: Record<IconoKey, LucideIcon> = {
  car: Car,
  bike: Bike,
  house: House,
  "heart-pulse": HeartPulse,
  "piggy-bank": PiggyBank,
  "shield-plus": ShieldPlus,
  scale: Scale,
  store: Store,
  "hard-hat": HardHat,
  briefcase: Briefcase,
  plane: Plane,
  smartphone: Smartphone,
  "shield-check": ShieldCheck,
  "file-check": FileCheck,
};

export function Icono({
  nombre,
  className,
}: {
  nombre: IconoKey;
  className?: string;
}) {
  const Componente = ICONOS[nombre];
  // Decorativo: el significado ya lo da el texto que acompaña al ícono.
  return <Componente className={className} aria-hidden="true" />;
}
