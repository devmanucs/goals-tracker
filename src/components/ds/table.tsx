import * as React from "react"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export type DsTableProps = React.ComponentProps<typeof Table>
export function DsTable(props: DsTableProps) {
  return <Table {...props} />
}

export type DsTableHeaderProps = React.ComponentProps<typeof TableHeader>
export function DsTableHeader(props: DsTableHeaderProps) {
  return <TableHeader {...props} />
}

export type DsTableBodyProps = React.ComponentProps<typeof TableBody>
export function DsTableBody(props: DsTableBodyProps) {
  return <TableBody {...props} />
}

export type DsTableFooterProps = React.ComponentProps<typeof TableFooter>
export function DsTableFooter(props: DsTableFooterProps) {
  return <TableFooter {...props} />
}

export type DsTableRowProps = React.ComponentProps<typeof TableRow>
export function DsTableRow(props: DsTableRowProps) {
  return <TableRow {...props} />
}

export type DsTableHeadProps = React.ComponentProps<typeof TableHead>
export function DsTableHead(props: DsTableHeadProps) {
  return <TableHead {...props} />
}

export type DsTableCellProps = React.ComponentProps<typeof TableCell>
export function DsTableCell(props: DsTableCellProps) {
  return <TableCell {...props} />
}

export type DsTableCaptionProps = React.ComponentProps<typeof TableCaption>
export function DsTableCaption(props: DsTableCaptionProps) {
  return <TableCaption {...props} />
}
