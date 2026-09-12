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
  DsSidebarHeader,
  DsSidebarMenu,
  DsSidebarMenuButton,
  DsSidebarMenuItem,
} from "@/components/ds/sidebar"
import { NavUser } from "@/components/nav-user"

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: Home01Icon },
  { href: "/leitura", label: "Leitura", icon: Book02Icon },
  { href: "/estudos", label: "Estudos", icon: GraduationCapIcon },
  { href: "/habitos", label: "Hábitos", icon: Target01Icon },
  { href: "/retrospectiva", label: "Retrospectiva", icon: Analytics01Icon },
]

export function AppSidebar({ usuario }: { usuario: { nome: string; email: string } }) {
  const pathname = usePathname()

  return (
    <DsSidebar collapsible="icon">
      <DsSidebarHeader>
        <DsSidebarMenu>
          <DsSidebarMenuItem>
            <DsSidebarMenuButton size="lg" render={<Link href="/" />} className="data-[slot=sidebar-menu-button]:p-1.5!">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <HugeiconsIcon icon={SparklesIcon} strokeWidth={2} className="size-3.5" />
              </span>
              <span className="text-base font-semibold">Metas</span>
            </DsSidebarMenuButton>
          </DsSidebarMenuItem>
        </DsSidebarMenu>
      </DsSidebarHeader>
      <DsSidebarContent>
        <DsSidebarGroup>
          <DsSidebarGroupContent>
            <DsSidebarMenu>
              {NAV_ITEMS.map((item) => {
                const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
                return (
                  <DsSidebarMenuItem key={item.href}>
                    <DsSidebarMenuButton isActive={isActive} tooltip={item.label} render={<Link href={item.href} />}>
                      <HugeiconsIcon icon={item.icon} strokeWidth={2} />
                      <span>{item.label}</span>
                    </DsSidebarMenuButton>
                  </DsSidebarMenuItem>
                )
              })}
            </DsSidebarMenu>
          </DsSidebarGroupContent>
        </DsSidebarGroup>
      </DsSidebarContent>
      <DsSidebarFooter>
        <NavUser usuario={usuario} />
      </DsSidebarFooter>
    </DsSidebar>
  )
}
