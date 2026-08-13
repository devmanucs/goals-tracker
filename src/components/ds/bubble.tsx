import * as React from "react"

import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "@/components/ui/bubble"

export type DsBubbleGroupProps = React.ComponentProps<typeof BubbleGroup>
export function DsBubbleGroup(props: DsBubbleGroupProps) {
  return <BubbleGroup {...props} />
}

export type DsBubbleProps = React.ComponentProps<typeof Bubble>
export function DsBubble(props: DsBubbleProps) {
  return <Bubble {...props} />
}

export type DsBubbleContentProps = React.ComponentProps<typeof BubbleContent>
export function DsBubbleContent(props: DsBubbleContentProps) {
  return <BubbleContent {...props} />
}

export type DsBubbleReactionsProps = React.ComponentProps<typeof BubbleReactions>
export function DsBubbleReactions(props: DsBubbleReactionsProps) {
  return <BubbleReactions {...props} />
}
