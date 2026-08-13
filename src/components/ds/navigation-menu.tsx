import * as React from "react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export type DsNavigationMenuProps = React.ComponentProps<
  typeof NavigationMenu
>
export function DsNavigationMenu(props: DsNavigationMenuProps) {
  return <NavigationMenu {...props} />
}

export type DsNavigationMenuListProps = React.ComponentProps<
  typeof NavigationMenuList
>
export function DsNavigationMenuList(props: DsNavigationMenuListProps) {
  return <NavigationMenuList {...props} />
}

export type DsNavigationMenuItemProps = React.ComponentProps<
  typeof NavigationMenuItem
>
export function DsNavigationMenuItem(props: DsNavigationMenuItemProps) {
  return <NavigationMenuItem {...props} />
}

export type DsNavigationMenuTriggerProps = React.ComponentProps<
  typeof NavigationMenuTrigger
>
export function DsNavigationMenuTrigger(props: DsNavigationMenuTriggerProps) {
  return <NavigationMenuTrigger {...props} />
}

export type DsNavigationMenuContentProps = React.ComponentProps<
  typeof NavigationMenuContent
>
export function DsNavigationMenuContent(props: DsNavigationMenuContentProps) {
  return <NavigationMenuContent {...props} />
}

export type DsNavigationMenuPositionerProps = React.ComponentProps<
  typeof NavigationMenuPositioner
>
export function DsNavigationMenuPositioner(
  props: DsNavigationMenuPositionerProps
) {
  return <NavigationMenuPositioner {...props} />
}

export type DsNavigationMenuLinkProps = React.ComponentProps<
  typeof NavigationMenuLink
>
export function DsNavigationMenuLink(props: DsNavigationMenuLinkProps) {
  return <NavigationMenuLink {...props} />
}

export type DsNavigationMenuIndicatorProps = React.ComponentProps<
  typeof NavigationMenuIndicator
>
export function DsNavigationMenuIndicator(
  props: DsNavigationMenuIndicatorProps
) {
  return <NavigationMenuIndicator {...props} />
}
