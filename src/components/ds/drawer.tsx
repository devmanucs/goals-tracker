import * as React from "react"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerSwipeHandle,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export type DsDrawerProps = React.ComponentProps<typeof Drawer>
export function DsDrawer(props: DsDrawerProps) {
  return <Drawer {...props} />
}

export type DsDrawerPortalProps = React.ComponentProps<typeof DrawerPortal>
export function DsDrawerPortal(props: DsDrawerPortalProps) {
  return <DrawerPortal {...props} />
}

export type DsDrawerOverlayProps = React.ComponentProps<typeof DrawerOverlay>
export function DsDrawerOverlay(props: DsDrawerOverlayProps) {
  return <DrawerOverlay {...props} />
}

export type DsDrawerSwipeHandleProps = React.ComponentProps<
  typeof DrawerSwipeHandle
>
export function DsDrawerSwipeHandle(props: DsDrawerSwipeHandleProps) {
  return <DrawerSwipeHandle {...props} />
}

export type DsDrawerTriggerProps = React.ComponentProps<typeof DrawerTrigger>
export function DsDrawerTrigger(props: DsDrawerTriggerProps) {
  return <DrawerTrigger {...props} />
}

export type DsDrawerCloseProps = React.ComponentProps<typeof DrawerClose>
export function DsDrawerClose(props: DsDrawerCloseProps) {
  return <DrawerClose {...props} />
}

export type DsDrawerContentProps = React.ComponentProps<typeof DrawerContent>
export function DsDrawerContent(props: DsDrawerContentProps) {
  return <DrawerContent {...props} />
}

export type DsDrawerHeaderProps = React.ComponentProps<typeof DrawerHeader>
export function DsDrawerHeader(props: DsDrawerHeaderProps) {
  return <DrawerHeader {...props} />
}

export type DsDrawerFooterProps = React.ComponentProps<typeof DrawerFooter>
export function DsDrawerFooter(props: DsDrawerFooterProps) {
  return <DrawerFooter {...props} />
}

export type DsDrawerTitleProps = React.ComponentProps<typeof DrawerTitle>
export function DsDrawerTitle(props: DsDrawerTitleProps) {
  return <DrawerTitle {...props} />
}

export type DsDrawerDescriptionProps = React.ComponentProps<
  typeof DrawerDescription
>
export function DsDrawerDescription(props: DsDrawerDescriptionProps) {
  return <DrawerDescription {...props} />
}
