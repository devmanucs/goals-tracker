import * as React from "react"

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"

export type DsMenubarProps = React.ComponentProps<typeof Menubar>
export function DsMenubar(props: DsMenubarProps) {
  return <Menubar {...props} />
}

export type DsMenubarPortalProps = React.ComponentProps<typeof MenubarPortal>
export function DsMenubarPortal(props: DsMenubarPortalProps) {
  return <MenubarPortal {...props} />
}

export type DsMenubarMenuProps = React.ComponentProps<typeof MenubarMenu>
export function DsMenubarMenu(props: DsMenubarMenuProps) {
  return <MenubarMenu {...props} />
}

export type DsMenubarTriggerProps = React.ComponentProps<
  typeof MenubarTrigger
>
export function DsMenubarTrigger(props: DsMenubarTriggerProps) {
  return <MenubarTrigger {...props} />
}

export type DsMenubarContentProps = React.ComponentProps<
  typeof MenubarContent
>
export function DsMenubarContent(props: DsMenubarContentProps) {
  return <MenubarContent {...props} />
}

export type DsMenubarGroupProps = React.ComponentProps<typeof MenubarGroup>
export function DsMenubarGroup(props: DsMenubarGroupProps) {
  return <MenubarGroup {...props} />
}

export type DsMenubarSeparatorProps = React.ComponentProps<
  typeof MenubarSeparator
>
export function DsMenubarSeparator(props: DsMenubarSeparatorProps) {
  return <MenubarSeparator {...props} />
}

export type DsMenubarLabelProps = React.ComponentProps<typeof MenubarLabel>
export function DsMenubarLabel(props: DsMenubarLabelProps) {
  return <MenubarLabel {...props} />
}

export type DsMenubarItemProps = React.ComponentProps<typeof MenubarItem>
export function DsMenubarItem(props: DsMenubarItemProps) {
  return <MenubarItem {...props} />
}

export type DsMenubarShortcutProps = React.ComponentProps<
  typeof MenubarShortcut
>
export function DsMenubarShortcut(props: DsMenubarShortcutProps) {
  return <MenubarShortcut {...props} />
}

export type DsMenubarCheckboxItemProps = React.ComponentProps<
  typeof MenubarCheckboxItem
>
export function DsMenubarCheckboxItem(props: DsMenubarCheckboxItemProps) {
  return <MenubarCheckboxItem {...props} />
}

export type DsMenubarRadioGroupProps = React.ComponentProps<
  typeof MenubarRadioGroup
>
export function DsMenubarRadioGroup(props: DsMenubarRadioGroupProps) {
  return <MenubarRadioGroup {...props} />
}

export type DsMenubarRadioItemProps = React.ComponentProps<
  typeof MenubarRadioItem
>
export function DsMenubarRadioItem(props: DsMenubarRadioItemProps) {
  return <MenubarRadioItem {...props} />
}

export type DsMenubarSubProps = React.ComponentProps<typeof MenubarSub>
export function DsMenubarSub(props: DsMenubarSubProps) {
  return <MenubarSub {...props} />
}

export type DsMenubarSubTriggerProps = React.ComponentProps<
  typeof MenubarSubTrigger
>
export function DsMenubarSubTrigger(props: DsMenubarSubTriggerProps) {
  return <MenubarSubTrigger {...props} />
}

export type DsMenubarSubContentProps = React.ComponentProps<
  typeof MenubarSubContent
>
export function DsMenubarSubContent(props: DsMenubarSubContentProps) {
  return <MenubarSubContent {...props} />
}
