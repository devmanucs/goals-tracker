import * as React from "react"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export type DsPaginationProps = React.ComponentProps<typeof Pagination>
export function DsPagination(props: DsPaginationProps) {
  return <Pagination {...props} />
}

export type DsPaginationContentProps = React.ComponentProps<
  typeof PaginationContent
>
export function DsPaginationContent(props: DsPaginationContentProps) {
  return <PaginationContent {...props} />
}

export type DsPaginationEllipsisProps = React.ComponentProps<
  typeof PaginationEllipsis
>
export function DsPaginationEllipsis(props: DsPaginationEllipsisProps) {
  return <PaginationEllipsis {...props} />
}

export type DsPaginationItemProps = React.ComponentProps<
  typeof PaginationItem
>
export function DsPaginationItem(props: DsPaginationItemProps) {
  return <PaginationItem {...props} />
}

export type DsPaginationLinkProps = React.ComponentProps<
  typeof PaginationLink
>
export function DsPaginationLink(props: DsPaginationLinkProps) {
  return <PaginationLink {...props} />
}

export type DsPaginationNextProps = React.ComponentProps<
  typeof PaginationNext
>
export function DsPaginationNext(props: DsPaginationNextProps) {
  return <PaginationNext {...props} />
}

export type DsPaginationPreviousProps = React.ComponentProps<
  typeof PaginationPrevious
>
export function DsPaginationPrevious(props: DsPaginationPreviousProps) {
  return <PaginationPrevious {...props} />
}
