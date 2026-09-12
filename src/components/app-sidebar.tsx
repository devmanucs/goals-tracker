"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Analytics01Icon,
  Book02Icon,
  GraduationCapIcon,
  Home01Icon,
  SparklesIcon,
  Target01Icon,
} from "@hugeicons/core-free-icons"

import {
  DsSidebar,
  DsSidebarContent,
  DsSidebarFooter,
  DsSidebarGroup,
  DsSidebarGroupContent,
  DsSidebarGroupLabel,
  DsSidebarHeader,
  DsSidebarMenu,
  DsSidebarMenuButton,
  DsSidebarMenuItem,
  DsSidebarSeparator,
} from "@/components/ds/sidebar"
import { NavUser } from "@/components/nav-user"

/**
 * Navegação agrupada: um rótulo por bloco, com divisória entre eles. Os três
 * módulos do produto ficam juntos; dashboard e retrospectiva, que olham para
 * todos eles, ficam separados.
 */
const GRUPOS = [
  {
    rotulo: "Geral",
    itens: [{ href: "/", label: "Dashboard", icon: Home01Icon }],
  },
  {
    rotulo: "Acompanhamento",
    itens: [
      { href: "/leitura", label: "Leitura", icon: Book02Icon },
      { href: "/estudos", label: "Estudos", icon: GraduationCapIcon },
      { href: "/habitos", label: "Hábitos", icon: Target01Icon },
    ],
  },
  {
    rotulo: "Análise",
    itens: [{ href: "/retrospectiva", label: "Retrospectiva", icon: Analytics01Icon }],
  },
]

export function AppSidebar({ usuario }: { usuario: { nome: string; email: string } }) {
  const pathname = usePathname()

  return (
    <DsSidebar collapsible="icon" className="top-11 h-[calc(100svh-2.75rem)]">
      <DsSidebarHeader>
        <DsSidebarMenu>
          <DsSidebarMenuItem>
            <DsSidebarMenuButton
              size="lg"
              render={<Link href="/" />}
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <HugeiconsIcon icon={SparklesIcon} strokeWidth={2} className="size-4" />
              </span>
              <span className="grid flex-1 text-left leading-tight">
                <span className="truncate text-sm font-semibold">Metas</span>
                <span className="truncate text-xs text-muted-foreground">
                  Acompanhamento pessoal
                </span>
              </span>
            </DsSidebarMenuButton>
          </DsSidebarMenuItem>
        </DsSidebarMenu>
      </DsSidebarHeader>

      <DsSidebarSeparator className="mx-0" />

      <DsSidebarContent>
        {GRUPOS.map((grupo, indice) => (
          <DsSidebarGroup key={grupo.rotulo}>
            <DsSidebarGroupLabel className="text-[0.68rem] font-medium tracking-wide text-muted-foreground uppercase">
              {grupo.rotulo}
            </DsSidebarGroupLabel>
            <DsSidebarGroupContent>
              <DsSidebarMenu>
                {grupo.itens.map((item) => {
                  const ativo =
                    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)

                  return (
                    <DsSidebarMenuItem key={item.href}>
                      <DsSidebarMenuButton
                        isActive={ativo}
                        tooltip={item.label}
                        render={<Link href={item.href} />}
                      >
                        <HugeiconsIcon icon={item.icon} strokeWidth={2} />
                        <span>{item.label}</span>
                      </DsSidebarMenuButton>
                    </DsSidebarMenuItem>
                  )
                })}
              </DsSidebarMenu>
            </DsSidebarGroupContent>
            {indice < GRUPOS.length - 1 && <DsSidebarSeparator className="mt-2 mb-0" />}
          </DsSidebarGroup>
        ))}
      </DsSidebarContent>

      <DsSidebarSeparator className="mx-0" />

      <DsSidebarFooter>
        <NavUser usuario={usuario} />
      </DsSidebarFooter>
    </DsSidebar>
  )
}
