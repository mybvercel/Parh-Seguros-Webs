"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Phone } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Icono } from "@/components/ui/icono";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navEmpresas, navPersonas, navSimple, type NavItem } from "./nav-data";
import { sitio } from "@/content/sitio";
import { evento } from "@/lib/analytics";
import { linkTelefono } from "@/lib/whatsapp";

function ListaProductos({
  items,
  onNavigate,
}: {
  items: NavItem[];
  onNavigate: () => void;
}) {
  return (
    <ul className="space-y-1 pb-2">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            onClick={onNavigate}
            className="flex min-h-11 items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-parh-blue-900 transition-colors hover:bg-parh-cyan-50"
          >
            {item.icono ? (
              <Icono
                nombre={item.icono}
                className="size-5 shrink-0 text-parh-cyan-600"
              />
            ) : null}
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function MenuMobile() {
  const [abierto, setAbierto] = useState(false);
  const cerrar = () => setAbierto(false);

  return (
    <Sheet open={abierto} onOpenChange={setAbierto}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="cta"
          className="lg:hidden"
          aria-label="Abrir el menú"
        >
          <Menu className="size-6" aria-hidden="true" />
        </Button>
      </SheetTrigger>

      {/* shadcn trae `data-[side=right]:w-3/4`. Como es una clase con variante,
          tailwind-merge no la dedupe contra un `w-full` pelado: hay que repetir
          la misma variante para ganarle. En mobile el menú va a ancho completo. */}
      <SheetContent
        side="right"
        className="data-[side=right]:w-full overflow-y-auto p-0 sm:max-w-sm"
      >
        <SheetHeader className="border-b border-parh-slate-200 px-5 py-4">
          <SheetTitle className="font-heading text-lg text-parh-blue-900">
            Menú
          </SheetTitle>
        </SheetHeader>

        <nav className="px-3 py-3">
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="personas">
              <AccordionTrigger className="px-3 text-base font-semibold text-parh-blue-900">
                Personas
              </AccordionTrigger>
              <AccordionContent>
                <ListaProductos items={navPersonas} onNavigate={cerrar} />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="empresas">
              <AccordionTrigger className="px-3 text-base font-semibold text-parh-blue-900">
                Empresas
              </AccordionTrigger>
              <AccordionContent>
                <ListaProductos items={navEmpresas} onNavigate={cerrar} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <ul className="mt-2 space-y-1">
            {navSimple.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={cerrar}
                  className="flex min-h-11 items-center rounded-md px-3 py-2 text-base font-semibold text-parh-blue-900 transition-colors hover:bg-parh-cyan-50"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3 border-t border-parh-slate-200 px-5 py-5">
          <Button size="cta" className="w-full" asChild>
            <Link href="/diagnostico/" onClick={cerrar}>
              Hacer el diagnóstico
            </Link>
          </Button>
          <a
            href={linkTelefono()}
            onClick={() => {
              evento("phone_click", { location: "menu_mobile" });
              cerrar();
            }}
            className="flex min-h-11 items-center justify-center gap-2 text-sm font-semibold text-parh-blue-900"
          >
            <Phone className="size-4 text-parh-cyan-600" aria-hidden="true" />
            <span data-numeric>{sitio.telefono}</span>
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
