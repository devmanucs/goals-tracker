import * as React from "react"

import {
  Frame,
  FrameDescription,
  FrameFooter,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "@/components/ui/frame"
import { cn } from "@/lib/utils"

export type DsFrameProps = React.ComponentProps<typeof Frame>
export function DsFrame(props: DsFrameProps) {
  return <Frame {...props} />
}

export type DsFramePanelProps = React.ComponentProps<typeof FramePanel>
export function DsFramePanel(props: DsFramePanelProps) {
  return <FramePanel {...props} />
}

export type DsFrameHeaderProps = React.ComponentProps<typeof FrameHeader>
export function DsFrameHeader(props: DsFrameHeaderProps) {
  return <FrameHeader {...props} />
}

export type DsFrameTitleProps = React.ComponentProps<typeof FrameTitle>
export function DsFrameTitle({ className, ...props }: DsFrameTitleProps) {
  return <FrameTitle className={cn("font-heading", className)} {...props} />
}

export type DsFrameDescriptionProps = React.ComponentProps<typeof FrameDescription>
export function DsFrameDescription(props: DsFrameDescriptionProps) {
  return <FrameDescription {...props} />
}

export type DsFrameFooterProps = React.ComponentProps<typeof FrameFooter>
export function DsFrameFooter(props: DsFrameFooterProps) {
  return <FrameFooter {...props} />
}
