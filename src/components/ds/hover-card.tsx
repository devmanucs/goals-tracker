import * as React from "react"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

export type DsHoverCardProps = React.ComponentProps<typeof HoverCard>
export function DsHoverCard(props: DsHoverCardProps) {
  return <HoverCard {...props} />
}

export type DsHoverCardTriggerProps = React.ComponentProps<
  typeof HoverCardTrigger
>
export function DsHoverCardTrigger(props: DsHoverCardTriggerProps) {
  return <HoverCardTrigger {...props} />
}

export type DsHoverCardContentProps = React.ComponentProps<
  typeof HoverCardContent
>
export function DsHoverCardContent(props: DsHoverCardContentProps) {
  return <HoverCardContent {...props} />
}
