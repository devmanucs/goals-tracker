import * as React from "react"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export type DsDialogProps = React.ComponentProps<typeof Dialog>
export function DsDialog(props: DsDialogProps) {
  return <Dialog {...props} />
}

export type DsDialogCloseProps = React.ComponentProps<typeof DialogClose>
export function DsDialogClose(props: DsDialogCloseProps) {
  return <DialogClose {...props} />
}

export type DsDialogContentProps = React.ComponentProps<typeof DialogContent>
export function DsDialogContent(props: DsDialogContentProps) {
  return <DialogContent {...props} />
}

export type DsDialogDescriptionProps = React.ComponentProps<typeof DialogDescription>
export function DsDialogDescription(props: DsDialogDescriptionProps) {
  return <DialogDescription {...props} />
}

export type DsDialogFooterProps = React.ComponentProps<typeof DialogFooter>
export function DsDialogFooter(props: DsDialogFooterProps) {
  return <DialogFooter {...props} />
}

export type DsDialogHeaderProps = React.ComponentProps<typeof DialogHeader>
export function DsDialogHeader(props: DsDialogHeaderProps) {
  return <DialogHeader {...props} />
}

export type DsDialogOverlayProps = React.ComponentProps<typeof DialogOverlay>
export function DsDialogOverlay(props: DsDialogOverlayProps) {
  return <DialogOverlay {...props} />
}

export type DsDialogPortalProps = React.ComponentProps<typeof DialogPortal>
export function DsDialogPortal(props: DsDialogPortalProps) {
  return <DialogPortal {...props} />
}

export type DsDialogTitleProps = React.ComponentProps<typeof DialogTitle>
export function DsDialogTitle(props: DsDialogTitleProps) {
  return <DialogTitle {...props} />
}

export type DsDialogTriggerProps = React.ComponentProps<typeof DialogTrigger>
export function DsDialogTrigger(props: DsDialogTriggerProps) {
  return <DialogTrigger {...props} />
}
