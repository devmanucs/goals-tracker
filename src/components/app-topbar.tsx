"use client"

import { Fragment } from "react"
import Link from "next/link"

import {
  DsBreadcrumb,
  DsBreadcrumbItem,
  DsBreadcrumbLink,
  DsBreadcrumbList,
  DsBreadcrumbPage,
  DsBreadcrumbSeparator,
} from "@/components/ds/breadcrumb"
import { DsSidebarTrigger } from "@/components/ds/sidebar"
import { useBreadcrumb } from "@/components/breadcrumb-context"
import { CommandMenu } from "@/components/command-menu"
import { ThemeToggle } from "@/components/theme-toggle"

/**
 * Barra fina que atravessa a largura inteira, acima da sidebar: gatilho de
 * recolher, trilha de navegação, busca (Ctrl K) e alternância de tema.
 */
export function AppTopbar() {
  const items = useBreadcrumb()

  return (
    <header className="flex h-11 shrink-0 items-center gap-1 border-b bg-background px-2 md:px-3">
      <DsSidebarTrigger className="size-7" />

      <DsBreadcrumb className="ml-1 min-w-0 flex-1">
        <DsBreadcrumbList className="flex-nowrap gap-1.5 text-xs sm:gap-1.5">
          <DsBreadcrumbItem className="hidden sm:block">
            <DsBreadcrumbLink render={<Link href="/" />}>Metas</DsBreadcrumbLink>
          </DsBreadcrumbItem>
          {items.length > 0 && <DsBreadcrumbSeparator className="hidden sm:block" />}

          {items.map((item, index) => {
            const ultimo = index === items.length - 1
            return (
              <Fragment key={`${item.label}-${index}`}>
                <DsBreadcrumbItem className={ultimo ? "min-w-0 truncate" : undefined}>
                  {item.href && !ultimo ? (
                    <DsBreadcrumbLink render={<Link href={item.href} />}>
                      {item.label}
                    </DsBreadcrumbLink>
                  ) : (
                    <DsBreadcrumbPage className="truncate font-medium">
                      {item.label}
                    </DsBreadcrumbPage>
                  )}
                </DsBreadcrumbItem>
                {!ultimo && <DsBreadcrumbSeparator />}
              </Fragment>
            )
          })}
        </DsBreadcrumbList>
      </DsBreadcrumb>

      <CommandMenu />
      <ThemeToggle />
    </header>
  )
}
