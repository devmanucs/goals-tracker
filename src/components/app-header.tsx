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
import { DsSeparator } from "@/components/ds/separator"
import { ThemeToggle } from "@/components/theme-toggle"

export type Crumb = { label: string; href?: string }

export function AppHeader({ items }: { items: Crumb[] }) {
  return (
    <header className="flex h-10 shrink-0 items-center gap-2 border-b px-3 md:px-4">
      <DsSidebarTrigger className="-ml-1 size-7" />
      <DsSeparator orientation="vertical" className="mx-1 h-4" />
      <DsBreadcrumb className="min-w-0 flex-1">
        <DsBreadcrumbList className="flex-nowrap text-xs">
          {items.map((item, index) => {
            const isLast = index === items.length - 1
            return (
              <Fragment key={`${item.label}-${index}`}>
                <DsBreadcrumbItem className={isLast ? "min-w-0 truncate" : undefined}>
                  {item.href && !isLast ? (
                    <DsBreadcrumbLink render={<Link href={item.href} />}>{item.label}</DsBreadcrumbLink>
                  ) : (
                    <DsBreadcrumbPage className="truncate">{item.label}</DsBreadcrumbPage>
                  )}
                </DsBreadcrumbItem>
                {!isLast && <DsBreadcrumbSeparator />}
              </Fragment>
            )
          })}
        </DsBreadcrumbList>
      </DsBreadcrumb>
      <ThemeToggle />
    </header>
  )
}
