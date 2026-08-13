import * as React from "react"

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export type DsContextMenuProps = React.ComponentProps<typeof ContextMenu>
export function DsContextMenu(props: DsContextMenuProps) {
  return <ContextMenu {...props} />
}

export type DsContextMenuTriggerProps = React.ComponentProps<typeof ContextMenuTrigger>
export function DsContextMenuTrigger(props: DsContextMenuTriggerProps) {
  return <ContextMenuTrigger {...props} />
}

export type DsContextMenuContentProps = React.ComponentProps<typeof ContextMenuContent>
export function DsContextMenuContent(props: DsContextMenuContentProps) {
  return <ContextMenuContent {...props} />
}

export type DsContextMenuItemProps = React.ComponentProps<typeof ContextMenuItem>
export function DsContextMenuItem(props: DsContextMenuItemProps) {
  return <ContextMenuItem {...props} />
}

export type DsContextMenuCheckboxItemProps = React.ComponentProps<typeof ContextMenuCheckboxItem>
export function DsContextMenuCheckboxItem(props: DsContextMenuCheckboxItemProps) {
  return <ContextMenuCheckboxItem {...props} />
}

export type DsContextMenuRadioItemProps = React.ComponentProps<typeof ContextMenuRadioItem>
export function DsContextMenuRadioItem(props: DsContextMenuRadioItemProps) {
  return <ContextMenuRadioItem {...props} />
}

export type DsContextMenuLabelProps = React.ComponentProps<typeof ContextMenuLabel>
export function DsContextMenuLabel(props: DsContextMenuLabelProps) {
  return <ContextMenuLabel {...props} />
}

export type DsContextMenuSeparatorProps = React.ComponentProps<typeof ContextMenuSeparator>
export function DsContextMenuSeparator(props: DsContextMenuSeparatorProps) {
  return <ContextMenuSeparator {...props} />
}

export type DsContextMenuShortcutProps = React.ComponentProps<typeof ContextMenuShortcut>
export function DsContextMenuShortcut(props: DsContextMenuShortcutProps) {
  return <ContextMenuShortcut {...props} />
}

export type DsContextMenuGroupProps = React.ComponentProps<typeof ContextMenuGroup>
export function DsContextMenuGroup(props: DsContextMenuGroupProps) {
  return <ContextMenuGroup {...props} />
}

export type DsContextMenuPortalProps = React.ComponentProps<typeof ContextMenuPortal>
export function DsContextMenuPortal(props: DsContextMenuPortalProps) {
  return <ContextMenuPortal {...props} />
}

export type DsContextMenuSubProps = React.ComponentProps<typeof ContextMenuSub>
export function DsContextMenuSub(props: DsContextMenuSubProps) {
  return <ContextMenuSub {...props} />
}

export type DsContextMenuSubContentProps = React.ComponentProps<typeof ContextMenuSubContent>
export function DsContextMenuSubContent(props: DsContextMenuSubContentProps) {
  return <ContextMenuSubContent {...props} />
}

export type DsContextMenuSubTriggerProps = React.ComponentProps<typeof ContextMenuSubTrigger>
export function DsContextMenuSubTrigger(props: DsContextMenuSubTriggerProps) {
  return <ContextMenuSubTrigger {...props} />
}

export type DsContextMenuRadioGroupProps = React.ComponentProps<typeof ContextMenuRadioGroup>
export function DsContextMenuRadioGroup(props: DsContextMenuRadioGroupProps) {
  return <ContextMenuRadioGroup {...props} />
}
