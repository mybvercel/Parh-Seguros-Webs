import type { Metadata } from "next";

import { HubOficinas } from "@/components/oficina/hub-oficinas";
import { metadataDe } from "@/content/sitio";

export const metadata: Metadata = metadataDe("/oficinas/");

export default function OficinasHubPage() {
  return <HubOficinas />;
}
