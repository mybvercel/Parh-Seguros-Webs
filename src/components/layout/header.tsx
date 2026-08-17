"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Phone } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Icono } from "@/components/ui/icono";
import { Logo } from "@/components/layout/logo";
import { MenuMobile } from "@/components/layout/menu-mobile";
import { navEmpresas, navPersonas, navSimple, type NavItem } from "./nav-data";
import { sitio } from "@/content/sitio";
import { evento } from "@/lib/analytics";
import { linkTelefono } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/** Panel de un desplegable: los productos de la rama más un atajo al diagnóstico. */
function PanelProductos({
  items,
  hubHref,
  hubLabel,
}: {
  items: NavItem[];
  hubHref: string;
  hubLabel: string;
}) {
  return (
    <div className="grid w-[38rem] grid-cols-[1fr_15rem] gap-6 p-5">
      <ul className="grid grid-cols-2 gap-1">
        {items.map((item) => (
          <li key={item.href}>
            <NavigationMenuLink asChild>
              <Link
                href={item.href}
                className="flex gap-3 rounded-md p-3 transition-colors hover:bg-parh-cyan-50"
              >
                {item.icono ? (
                  <Icono
                    nombre={item.icono}
                    className="mt-0.5 size-5 shrink-0 text-parh-cyan-600"
                  />
                ) : null}
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-parh-blue-900">
                    {item.label}
                  </span>
                  <span className="mt-0.5 block text-xs leading-snug text-parh-slate-600">
                    {item.descripcion}
                  </span>
                </span>
              </Link>
            </NavigationMenuLink>
          </li>
        ))}
      </ul>

      <div className="flex flex-col justify-between rounded-lg bg-parh-blue-900 p-5">
        <div>
          <p className="font-heading text-base font-semibold text-white">
            ¿No sabés qué necesitás?
          </p>
          <p className="mt-2 text-sm leading-snug text-parh-cyan-100">
            Respondé 6 preguntas y te decimos qué riesgos podrían estar sin
            cubrir.
          </p>
        </div>
        <div className="mt-5 space-y-2">
          <NavigationMenuLink asChild>
            <Link href="/diagnostico/">
              <Button variant="onDark" size="cta" className="w-full" asChild>
                <span>Hacer el diagnóstico</span>
              </Button>
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link
              href={hubHref}
              className="block text-center text-xs font-medium text-parh-cyan-300 underline underline-offset-4"
            >
              {hubLabel}
            </Link>
          </NavigationMenuLink>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  // El header se compacta al hacer scroll. Doc 04 sección 7.
  const [compacto, setCompacto] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompacto(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-white/95 backdrop-blur transition-shadow duration-250",
        compacto ? "border-b border-parh-slate-200 shadow-parh-sm" : "border-b border-transparent",
      )}
    >
      <div
        className={cn(
          "container-parh flex items-center justify-between gap-4 transition-[height] duration-250",
          compacto ? "h-16" : "h-20",
        )}
      >
        <Logo />

        <NavigationMenu className="hidden lg:flex" viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Personas</NavigationMenuTrigger>
              <NavigationMenuContent>
                <PanelProductos
                  items={navPersonas}
                  hubHref="/seguros/"
                  hubLabel="Ver todos los seguros para personas"
                />
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Empresas</NavigationMenuTrigger>
              <NavigationMenuContent>
                <PanelProductos
                  items={navEmpresas}
                  hubHref="/empresas/"
                  hubLabel="Ver todos los seguros para empresas"
                />
              </NavigationMenuContent>
            </NavigationMenuItem>

            {navSimple.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink asChild>
                  <Link
                    href={item.href}
                    className="inline-flex h-9 items-center rounded-md px-3 text-sm font-medium text-parh-blue-900 transition-colors hover:bg-parh-cyan-50"
                  >
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          {/* Público de 45+ que prefiere llamar antes que llenar un formulario.
              Doc 02 sección B. */}
          <a
            href={linkTelefono()}
            onClick={() => evento("phone_click", { location: "header" })}
            className="hidden items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-parh-blue-900 transition-colors hover:bg-parh-cyan-50 md:inline-flex"
          >
            <Phone className="size-4 text-parh-cyan-600" aria-hidden="true" />
            <span data-numeric>{sitio.telefono}</span>
          </a>

          <Button size="cta" className="hidden sm:inline-flex" asChild>
            <Link href="/cotizar/">Cotizar ahora</Link>
          </Button>

          <MenuMobile />
        </div>
      </div>
    </header>
  );
}
