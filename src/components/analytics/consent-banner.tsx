"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Ga4Pixel } from "@/components/analytics/ga4-pixel";

const CLAVE = "parh_consent";
type Consentimiento = "aceptado" | "rechazado";

/**
 * Banner de consentimiento simple. Doc 03 sección 5.7: Ley 25.326 de
 * Protección de Datos Personales, con opción de rechazar.
 *
 * Sin analítica por default. Solo se cargan GA4 y el Pixel si la persona
 * elige "Aceptar". La decisión se guarda en localStorage y no se vuelve a
 * preguntar.
 */
export function ConsentBanner() {
  const [consentimiento, setConsentimiento] = useState<Consentimiento | null>(null);
  const [listo, setListo] = useState(false);

  useEffect(() => {
    const guardado = window.localStorage.getItem(CLAVE) as Consentimiento | null;
    setConsentimiento(guardado);
    setListo(true);
  }, []);

  function elegir(valor: Consentimiento) {
    window.localStorage.setItem(CLAVE, valor);
    setConsentimiento(valor);
  }

  if (!listo || consentimiento) {
    return consentimiento === "aceptado" ? <Ga4Pixel /> : null;
  }

  return (
    // bottom compensa la altura de BarraMobile (56px + safe-area), que
    // también es fixed bottom-0 en mobile. En lg para arriba BarraMobile
    // está oculta, así que el banner vuelve a bottom-0. Va como clase
    // arbitraria de Tailwind (no `style`) para que el breakpoint `lg:` la
    // pueda pisar: un `style` inline siempre le gana a cualquier clase.
    <div className="fixed inset-x-0 bottom-[calc(3.5rem+env(safe-area-inset-bottom))] z-50 border-t border-parh-slate-200 bg-white p-4 shadow-parh-lg sm:p-5 lg:bottom-0">
      <div className="container-parh flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-parh-slate-600">
          Usamos cookies para entender cómo se usa el sitio y mejorar tu
          experiencia. Podés aceptar o rechazar.{" "}
          <Link href="/politica-de-privacidad/" className="font-semibold text-parh-blue-700 hover:underline">
            Leer más
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" size="cta" onClick={() => elegir("rechazado")}>
            Rechazar
          </Button>
          <Button size="cta" onClick={() => elegir("aceptado")}>
            Aceptar
          </Button>
        </div>
      </div>
    </div>
  );
}
