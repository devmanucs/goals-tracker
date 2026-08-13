import * as React from "react"

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export type DsBreadcrumbProps = React.ComponentProps<typeof Breadcrumb>
export function DsBreadcrumb(props: DsBreadcrumbProps) {
  return <Breadcrumb {...props} />
}

export type DsBreadcrumbListProps = React.ComponentProps<typeof BreadcrumbList>
export function DsBreadcrumbList(props: DsBreadcrumbListProps) {
  return <BreadcrumbList {...props} />
}

export type DsBreadcrumbItemProps = React.ComponentProps<typeof BreadcrumbItem>
export function DsBreadcrumbItem(props: DsBreadcrumbItemProps) {
  return <BreadcrumbItem {...props} />
}

export type DsBreadcrumbLinkProps = React.ComponentProps<typeof BreadcrumbLink>
export function DsBreadcrumbLink(props: DsBreadcrumbLinkProps) {
  return <BreadcrumbLink {...props} />
}

export type DsBreadcrumbPageProps = React.ComponentProps<typeof BreadcrumbPage>
export function DsBreadcrumbPage(props: DsBreadcrumbPageProps) {
  return <BreadcrumbPage {...props} />
}

export type DsBreadcrumbSeparatorProps = React.ComponentProps<typeof BreadcrumbSeparator>
export function DsBreadcrumbSeparator(props: DsBreadcrumbSeparatorProps) {
  return <BreadcrumbSeparator {...props} />
}

export type DsBreadcrumbEllipsisProps = React.ComponentProps<typeof BreadcrumbEllipsis>
export function DsBreadcrumbEllipsis(props: DsBreadcrumbEllipsisProps) {
  return <BreadcrumbEllipsis {...props} />
}
