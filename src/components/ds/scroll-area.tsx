import * as React from "react"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export type DsScrollAreaProps = React.ComponentProps<typeof ScrollArea>
export function DsScrollArea(props: DsScrollAreaProps) {
  return <ScrollArea {...props} />
}

export type DsScrollBarProps = React.ComponentProps<typeof ScrollBar>
export function DsScrollBar(props: DsScrollBarProps) {
  return <ScrollBar {...props} />
}
