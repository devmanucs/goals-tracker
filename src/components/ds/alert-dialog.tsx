import * as React from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export type DsAlertDialogProps = React.ComponentProps<typeof AlertDialog>
export function DsAlertDialog(props: DsAlertDialogProps) {
  return <AlertDialog {...props} />
}

export type DsAlertDialogTriggerProps = React.ComponentProps<typeof AlertDialogTrigger>
export function DsAlertDialogTrigger(props: DsAlertDialogTriggerProps) {
  return <AlertDialogTrigger {...props} />
}

export type DsAlertDialogPortalProps = React.ComponentProps<typeof AlertDialogPortal>
export function DsAlertDialogPortal(props: DsAlertDialogPortalProps) {
  return <AlertDialogPortal {...props} />
}

export type DsAlertDialogOverlayProps = React.ComponentProps<typeof AlertDialogOverlay>
export function DsAlertDialogOverlay(props: DsAlertDialogOverlayProps) {
  return <AlertDialogOverlay {...props} />
}

export type DsAlertDialogContentProps = React.ComponentProps<typeof AlertDialogContent>
export function DsAlertDialogContent(props: DsAlertDialogContentProps) {
  return <AlertDialogContent {...props} />
}

export type DsAlertDialogHeaderProps = React.ComponentProps<typeof AlertDialogHeader>
export function DsAlertDialogHeader(props: DsAlertDialogHeaderProps) {
  return <AlertDialogHeader {...props} />
}

export type DsAlertDialogFooterProps = React.ComponentProps<typeof AlertDialogFooter>
export function DsAlertDialogFooter(props: DsAlertDialogFooterProps) {
  return <AlertDialogFooter {...props} />
}

export type DsAlertDialogMediaProps = React.ComponentProps<typeof AlertDialogMedia>
export function DsAlertDialogMedia(props: DsAlertDialogMediaProps) {
  return <AlertDialogMedia {...props} />
}

export type DsAlertDialogTitleProps = React.ComponentProps<typeof AlertDialogTitle>
export function DsAlertDialogTitle(props: DsAlertDialogTitleProps) {
  return <AlertDialogTitle {...props} />
}

export type DsAlertDialogDescriptionProps = React.ComponentProps<typeof AlertDialogDescription>
export function DsAlertDialogDescription(props: DsAlertDialogDescriptionProps) {
  return <AlertDialogDescription {...props} />
}

export type DsAlertDialogActionProps = React.ComponentProps<typeof AlertDialogAction>
export function DsAlertDialogAction(props: DsAlertDialogActionProps) {
  return <AlertDialogAction {...props} />
}

export type DsAlertDialogCancelProps = React.ComponentProps<typeof AlertDialogCancel>
export function DsAlertDialogCancel(props: DsAlertDialogCancelProps) {
  return <AlertDialogCancel {...props} />
}
