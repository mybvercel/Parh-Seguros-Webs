import type { Metadata } from "next";
import { Suspense } from "react";

import { GraciasContenido } from "./gracias-contenido";
import { metadataDe } from "@/content/sitio";

export const metadata: Metadata = metadataDe("/gracias/");

export default function GraciasPage() {
  return (
    <Suspense>
      <GraciasContenido />
    </Suspense>
  );
}
