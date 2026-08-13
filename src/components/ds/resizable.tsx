import * as React from "react"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export type DsResizableHandleProps = React.ComponentProps<typeof ResizableHandle>
export function DsResizableHandle(props: DsResizableHandleProps) {
  return <ResizableHandle {...props} />
}

export type DsResizablePanelProps = React.ComponentProps<typeof ResizablePanel>
export function DsResizablePanel(props: DsResizablePanelProps) {
  return <ResizablePanel {...props} />
}

export type DsResizablePanelGroupProps = React.ComponentProps<typeof ResizablePanelGroup>
export function DsResizablePanelGroup(props: DsResizablePanelGroupProps) {
  return <ResizablePanelGroup {...props} />
}
