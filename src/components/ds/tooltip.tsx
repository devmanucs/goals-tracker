import * as React from "react"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export type DsTooltipProps = React.ComponentProps<typeof Tooltip>
export function DsTooltip(props: DsTooltipProps) {
  return <Tooltip {...props} />
}

export type DsTooltipTriggerProps = React.ComponentProps<typeof TooltipTrigger>
export function DsTooltipTrigger(props: DsTooltipTriggerProps) {
  return <TooltipTrigger {...props} />
}

export type DsTooltipContentProps = React.ComponentProps<typeof TooltipContent>
export function DsTooltipContent(props: DsTooltipContentProps) {
  return <TooltipContent {...props} />
}

export type DsTooltipProviderProps = React.ComponentProps<typeof TooltipProvider>
export function DsTooltipProvider(props: DsTooltipProviderProps) {
  return <TooltipProvider {...props} />
}
