/**
 * Íconos de redes, dibujados a mano.
 *
 * Lucide v1 dejó de exportar los íconos de marca (Instagram, Facebook,
 * Linkedin), así que no se pueden importar. Estos son glifos simples,
 * construidos con las mismas convenciones que Lucide: viewBox de 24, trazo de
 * 2 y `currentColor`, para que combinen con el resto del set.
 */

type Props = React.SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

export function IconoInstagram(props: Props) {
  return (
    <svg {...base} {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconoFacebook(props: Props) {
  return (
    <svg {...base} {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M15 8h-1.5A1.5 1.5 0 0 0 12 9.5V12" />
      <path d="M12 12v6" />
      <path d="M10 13h4" />
    </svg>
  );
}

export function IconoLinkedin(props: Props) {
  return (
    <svg {...base} {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M7 10v7" />
      <circle cx="7" cy="7" r="1" fill="currentColor" stroke="none" />
      <path d="M11 17v-4a2.5 2.5 0 0 1 5 0v4" />
      <path d="M11 10v7" />
    </svg>
  );
}
