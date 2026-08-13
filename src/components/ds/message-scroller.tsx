import * as React from "react"

import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller"

export type DsMessageScrollerProviderProps = React.ComponentProps<
  typeof MessageScrollerProvider
>
export function DsMessageScrollerProvider(
  props: DsMessageScrollerProviderProps
) {
  return <MessageScrollerProvider {...props} />
}

export type DsMessageScrollerProps = React.ComponentProps<
  typeof MessageScroller
>
export function DsMessageScroller(props: DsMessageScrollerProps) {
  return <MessageScroller {...props} />
}

export type DsMessageScrollerViewportProps = React.ComponentProps<
  typeof MessageScrollerViewport
>
export function DsMessageScrollerViewport(
  props: DsMessageScrollerViewportProps
) {
  return <MessageScrollerViewport {...props} />
}

export type DsMessageScrollerContentProps = React.ComponentProps<
  typeof MessageScrollerContent
>
export function DsMessageScrollerContent(
  props: DsMessageScrollerContentProps
) {
  return <MessageScrollerContent {...props} />
}

export type DsMessageScrollerItemProps = React.ComponentProps<
  typeof MessageScrollerItem
>
export function DsMessageScrollerItem(props: DsMessageScrollerItemProps) {
  return <MessageScrollerItem {...props} />
}

export type DsMessageScrollerButtonProps = React.ComponentProps<
  typeof MessageScrollerButton
>
export function DsMessageScrollerButton(props: DsMessageScrollerButtonProps) {
  return <MessageScrollerButton {...props} />
}
