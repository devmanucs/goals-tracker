import * as React from "react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export type DsCollapsibleProps = React.ComponentProps<typeof Collapsible>
export function DsCollapsible(props: DsCollapsibleProps) {
  return <Collapsible {...props} />
}

export type DsCollapsibleTriggerProps = React.ComponentProps<typeof CollapsibleTrigger>
export function DsCollapsibleTrigger(props: DsCollapsibleTriggerProps) {
  return <CollapsibleTrigger {...props} />
}

export type DsCollapsibleContentProps = React.ComponentProps<typeof CollapsibleContent>
export function DsCollapsibleContent(props: DsCollapsibleContentProps) {
  return <CollapsibleContent {...props} />
}
