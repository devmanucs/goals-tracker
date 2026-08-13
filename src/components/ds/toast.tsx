import * as React from "react"

import {
  Toast,
  ToastAction,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  Toaster,
  ToastTitle,
  ToastViewport,
  createToastManager,
  toast,
  useToastManager,
} from "@/components/ui/toast"

export type DsToasterProps = React.ComponentProps<typeof Toaster>
export function DsToaster(props: DsToasterProps) {
  return <Toaster {...props} />
}

export type DsToastProps = React.ComponentProps<typeof Toast>
export function DsToast(props: DsToastProps) {
  return <Toast {...props} />
}

export type DsToastActionProps = React.ComponentProps<typeof ToastAction>
export function DsToastAction(props: DsToastActionProps) {
  return <ToastAction {...props} />
}

export type DsToastCloseProps = React.ComponentProps<typeof ToastClose>
export function DsToastClose(props: DsToastCloseProps) {
  return <ToastClose {...props} />
}

export type DsToastContentProps = React.ComponentProps<typeof ToastContent>
export function DsToastContent(props: DsToastContentProps) {
  return <ToastContent {...props} />
}

export type DsToastDescriptionProps = React.ComponentProps<typeof ToastDescription>
export function DsToastDescription(props: DsToastDescriptionProps) {
  return <ToastDescription {...props} />
}

export type DsToastPortalProps = React.ComponentProps<typeof ToastPortal>
export function DsToastPortal(props: DsToastPortalProps) {
  return <ToastPortal {...props} />
}

export type DsToastProviderProps = React.ComponentProps<typeof ToastProvider>
export function DsToastProvider(props: DsToastProviderProps) {
  return <ToastProvider {...props} />
}

export type DsToastTitleProps = React.ComponentProps<typeof ToastTitle>
export function DsToastTitle(props: DsToastTitleProps) {
  return <ToastTitle {...props} />
}

export type DsToastViewportProps = React.ComponentProps<typeof ToastViewport>
export function DsToastViewport(props: DsToastViewportProps) {
  return <ToastViewport {...props} />
}

export { createToastManager, toast, useToastManager }
