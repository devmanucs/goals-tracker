import * as React from "react"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export type DsSheetProps = React.ComponentProps<typeof Sheet>
export function DsSheet(props: DsSheetProps) {
  return <Sheet {...props} />
}

export type DsSheetTriggerProps = React.ComponentProps<typeof SheetTrigger>
export function DsSheetTrigger(props: DsSheetTriggerProps) {
  return <SheetTrigger {...props} />
}

export type DsSheetCloseProps = React.ComponentProps<typeof SheetClose>
export function DsSheetClose(props: DsSheetCloseProps) {
  return <SheetClose {...props} />
}

export type DsSheetContentProps = React.ComponentProps<typeof SheetContent>
export function DsSheetContent(props: DsSheetContentProps) {
  return <SheetContent {...props} />
}

export type DsSheetHeaderProps = React.ComponentProps<typeof SheetHeader>
export function DsSheetHeader(props: DsSheetHeaderProps) {
  return <SheetHeader {...props} />
}

export type DsSheetFooterProps = React.ComponentProps<typeof SheetFooter>
export function DsSheetFooter(props: DsSheetFooterProps) {
  return <SheetFooter {...props} />
}

export type DsSheetTitleProps = React.ComponentProps<typeof SheetTitle>
export function DsSheetTitle(props: DsSheetTitleProps) {
  return <SheetTitle {...props} />
}

export type DsSheetDescriptionProps = React.ComponentProps<typeof SheetDescription>
export function DsSheetDescription(props: DsSheetDescriptionProps) {
  return <SheetDescription {...props} />
}
