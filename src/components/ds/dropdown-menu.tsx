import * as React from "react"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type DsDropdownMenuProps = React.ComponentProps<typeof DropdownMenu>
export function DsDropdownMenu(props: DsDropdownMenuProps) {
  return <DropdownMenu {...props} />
}

export type DsDropdownMenuPortalProps = React.ComponentProps<
  typeof DropdownMenuPortal
>
export function DsDropdownMenuPortal(props: DsDropdownMenuPortalProps) {
  return <DropdownMenuPortal {...props} />
}

export type DsDropdownMenuTriggerProps = React.ComponentProps<
  typeof DropdownMenuTrigger
>
export function DsDropdownMenuTrigger(props: DsDropdownMenuTriggerProps) {
  return <DropdownMenuTrigger {...props} />
}

export type DsDropdownMenuContentProps = React.ComponentProps<
  typeof DropdownMenuContent
>
export function DsDropdownMenuContent(props: DsDropdownMenuContentProps) {
  return <DropdownMenuContent {...props} />
}

export type DsDropdownMenuGroupProps = React.ComponentProps<
  typeof DropdownMenuGroup
>
export function DsDropdownMenuGroup(props: DsDropdownMenuGroupProps) {
  return <DropdownMenuGroup {...props} />
}

export type DsDropdownMenuLabelProps = React.ComponentProps<
  typeof DropdownMenuLabel
>
export function DsDropdownMenuLabel(props: DsDropdownMenuLabelProps) {
  return <DropdownMenuLabel {...props} />
}

export type DsDropdownMenuItemProps = React.ComponentProps<
  typeof DropdownMenuItem
>
export function DsDropdownMenuItem(props: DsDropdownMenuItemProps) {
  return <DropdownMenuItem {...props} />
}

export type DsDropdownMenuCheckboxItemProps = React.ComponentProps<
  typeof DropdownMenuCheckboxItem
>
export function DsDropdownMenuCheckboxItem(
  props: DsDropdownMenuCheckboxItemProps
) {
  return <DropdownMenuCheckboxItem {...props} />
}

export type DsDropdownMenuRadioGroupProps = React.ComponentProps<
  typeof DropdownMenuRadioGroup
>
export function DsDropdownMenuRadioGroup(
  props: DsDropdownMenuRadioGroupProps
) {
  return <DropdownMenuRadioGroup {...props} />
}

export type DsDropdownMenuRadioItemProps = React.ComponentProps<
  typeof DropdownMenuRadioItem
>
export function DsDropdownMenuRadioItem(props: DsDropdownMenuRadioItemProps) {
  return <DropdownMenuRadioItem {...props} />
}

export type DsDropdownMenuSeparatorProps = React.ComponentProps<
  typeof DropdownMenuSeparator
>
export function DsDropdownMenuSeparator(props: DsDropdownMenuSeparatorProps) {
  return <DropdownMenuSeparator {...props} />
}

export type DsDropdownMenuShortcutProps = React.ComponentProps<
  typeof DropdownMenuShortcut
>
export function DsDropdownMenuShortcut(props: DsDropdownMenuShortcutProps) {
  return <DropdownMenuShortcut {...props} />
}

export type DsDropdownMenuSubProps = React.ComponentProps<
  typeof DropdownMenuSub
>
export function DsDropdownMenuSub(props: DsDropdownMenuSubProps) {
  return <DropdownMenuSub {...props} />
}

export type DsDropdownMenuSubTriggerProps = React.ComponentProps<
  typeof DropdownMenuSubTrigger
>
export function DsDropdownMenuSubTrigger(
  props: DsDropdownMenuSubTriggerProps
) {
  return <DropdownMenuSubTrigger {...props} />
}

export type DsDropdownMenuSubContentProps = React.ComponentProps<
  typeof DropdownMenuSubContent
>
export function DsDropdownMenuSubContent(
  props: DsDropdownMenuSubContentProps
) {
  return <DropdownMenuSubContent {...props} />
}
