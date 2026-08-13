import * as React from "react"

import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/components/ui/message"

export type DsMessageGroupProps = React.ComponentProps<typeof MessageGroup>
export function DsMessageGroup(props: DsMessageGroupProps) {
  return <MessageGroup {...props} />
}

export type DsMessageProps = React.ComponentProps<typeof Message>
export function DsMessage(props: DsMessageProps) {
  return <Message {...props} />
}

export type DsMessageAvatarProps = React.ComponentProps<typeof MessageAvatar>
export function DsMessageAvatar(props: DsMessageAvatarProps) {
  return <MessageAvatar {...props} />
}

export type DsMessageContentProps = React.ComponentProps<
  typeof MessageContent
>
export function DsMessageContent(props: DsMessageContentProps) {
  return <MessageContent {...props} />
}

export type DsMessageFooterProps = React.ComponentProps<typeof MessageFooter>
export function DsMessageFooter(props: DsMessageFooterProps) {
  return <MessageFooter {...props} />
}

export type DsMessageHeaderProps = React.ComponentProps<typeof MessageHeader>
export function DsMessageHeader(props: DsMessageHeaderProps) {
  return <MessageHeader {...props} />
}
