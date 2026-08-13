import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

export type DsSidebarProviderProps = React.ComponentProps<typeof SidebarProvider>
export function DsSidebarProvider(props: DsSidebarProviderProps) {
  return <SidebarProvider {...props} />
}

export type DsSidebarProps = React.ComponentProps<typeof Sidebar>
export function DsSidebar(props: DsSidebarProps) {
  return <Sidebar {...props} />
}

export type DsSidebarContentProps = React.ComponentProps<typeof SidebarContent>
export function DsSidebarContent(props: DsSidebarContentProps) {
  return <SidebarContent {...props} />
}

export type DsSidebarFooterProps = React.ComponentProps<typeof SidebarFooter>
export function DsSidebarFooter(props: DsSidebarFooterProps) {
  return <SidebarFooter {...props} />
}

export type DsSidebarGroupProps = React.ComponentProps<typeof SidebarGroup>
export function DsSidebarGroup(props: DsSidebarGroupProps) {
  return <SidebarGroup {...props} />
}

export type DsSidebarGroupActionProps = React.ComponentProps<typeof SidebarGroupAction>
export function DsSidebarGroupAction(props: DsSidebarGroupActionProps) {
  return <SidebarGroupAction {...props} />
}

export type DsSidebarGroupContentProps = React.ComponentProps<typeof SidebarGroupContent>
export function DsSidebarGroupContent(props: DsSidebarGroupContentProps) {
  return <SidebarGroupContent {...props} />
}

export type DsSidebarGroupLabelProps = React.ComponentProps<typeof SidebarGroupLabel>
export function DsSidebarGroupLabel(props: DsSidebarGroupLabelProps) {
  return <SidebarGroupLabel {...props} />
}

export type DsSidebarHeaderProps = React.ComponentProps<typeof SidebarHeader>
export function DsSidebarHeader(props: DsSidebarHeaderProps) {
  return <SidebarHeader {...props} />
}

export type DsSidebarInputProps = React.ComponentProps<typeof SidebarInput>
export function DsSidebarInput(props: DsSidebarInputProps) {
  return <SidebarInput {...props} />
}

export type DsSidebarInsetProps = React.ComponentProps<typeof SidebarInset>
export function DsSidebarInset(props: DsSidebarInsetProps) {
  return <SidebarInset {...props} />
}

export type DsSidebarMenuProps = React.ComponentProps<typeof SidebarMenu>
export function DsSidebarMenu(props: DsSidebarMenuProps) {
  return <SidebarMenu {...props} />
}

export type DsSidebarMenuActionProps = React.ComponentProps<typeof SidebarMenuAction>
export function DsSidebarMenuAction(props: DsSidebarMenuActionProps) {
  return <SidebarMenuAction {...props} />
}

export type DsSidebarMenuBadgeProps = React.ComponentProps<typeof SidebarMenuBadge>
export function DsSidebarMenuBadge(props: DsSidebarMenuBadgeProps) {
  return <SidebarMenuBadge {...props} />
}

export type DsSidebarMenuButtonProps = React.ComponentProps<typeof SidebarMenuButton>
export function DsSidebarMenuButton(props: DsSidebarMenuButtonProps) {
  return <SidebarMenuButton {...props} />
}

export type DsSidebarMenuItemProps = React.ComponentProps<typeof SidebarMenuItem>
export function DsSidebarMenuItem(props: DsSidebarMenuItemProps) {
  return <SidebarMenuItem {...props} />
}

export type DsSidebarMenuSkeletonProps = React.ComponentProps<typeof SidebarMenuSkeleton>
export function DsSidebarMenuSkeleton(props: DsSidebarMenuSkeletonProps) {
  return <SidebarMenuSkeleton {...props} />
}

export type DsSidebarMenuSubProps = React.ComponentProps<typeof SidebarMenuSub>
export function DsSidebarMenuSub(props: DsSidebarMenuSubProps) {
  return <SidebarMenuSub {...props} />
}

export type DsSidebarMenuSubButtonProps = React.ComponentProps<typeof SidebarMenuSubButton>
export function DsSidebarMenuSubButton(props: DsSidebarMenuSubButtonProps) {
  return <SidebarMenuSubButton {...props} />
}

export type DsSidebarMenuSubItemProps = React.ComponentProps<typeof SidebarMenuSubItem>
export function DsSidebarMenuSubItem(props: DsSidebarMenuSubItemProps) {
  return <SidebarMenuSubItem {...props} />
}

export type DsSidebarRailProps = React.ComponentProps<typeof SidebarRail>
export function DsSidebarRail(props: DsSidebarRailProps) {
  return <SidebarRail {...props} />
}

export type DsSidebarSeparatorProps = React.ComponentProps<typeof SidebarSeparator>
export function DsSidebarSeparator(props: DsSidebarSeparatorProps) {
  return <SidebarSeparator {...props} />
}

export type DsSidebarTriggerProps = React.ComponentProps<typeof SidebarTrigger>
export function DsSidebarTrigger(props: DsSidebarTriggerProps) {
  return <SidebarTrigger {...props} />
}

export const useDsSidebar = useSidebar
