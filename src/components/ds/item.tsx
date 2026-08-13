import * as React from "react"

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"

export type DsItemProps = React.ComponentProps<typeof Item>
export function DsItem(props: DsItemProps) {
  return <Item {...props} />
}

export type DsItemMediaProps = React.ComponentProps<typeof ItemMedia>
export function DsItemMedia(props: DsItemMediaProps) {
  return <ItemMedia {...props} />
}

export type DsItemContentProps = React.ComponentProps<typeof ItemContent>
export function DsItemContent(props: DsItemContentProps) {
  return <ItemContent {...props} />
}

export type DsItemActionsProps = React.ComponentProps<typeof ItemActions>
export function DsItemActions(props: DsItemActionsProps) {
  return <ItemActions {...props} />
}

export type DsItemGroupProps = React.ComponentProps<typeof ItemGroup>
export function DsItemGroup(props: DsItemGroupProps) {
  return <ItemGroup {...props} />
}

export type DsItemSeparatorProps = React.ComponentProps<typeof ItemSeparator>
export function DsItemSeparator(props: DsItemSeparatorProps) {
  return <ItemSeparator {...props} />
}

export type DsItemTitleProps = React.ComponentProps<typeof ItemTitle>
export function DsItemTitle(props: DsItemTitleProps) {
  return <ItemTitle {...props} />
}

export type DsItemDescriptionProps = React.ComponentProps<
  typeof ItemDescription
>
export function DsItemDescription(props: DsItemDescriptionProps) {
  return <ItemDescription {...props} />
}

export type DsItemHeaderProps = React.ComponentProps<typeof ItemHeader>
export function DsItemHeader(props: DsItemHeaderProps) {
  return <ItemHeader {...props} />
}

export type DsItemFooterProps = React.ComponentProps<typeof ItemFooter>
export function DsItemFooter(props: DsItemFooterProps) {
  return <ItemFooter {...props} />
}
