import * as React from "react"

import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "@/components/ui/progress"

export type DsProgressProps = React.ComponentProps<typeof Progress>
export function DsProgress(props: DsProgressProps) {
  return <Progress {...props} />
}

export type DsProgressTrackProps = React.ComponentProps<typeof ProgressTrack>
export function DsProgressTrack(props: DsProgressTrackProps) {
  return <ProgressTrack {...props} />
}

export type DsProgressIndicatorProps = React.ComponentProps<typeof ProgressIndicator>
export function DsProgressIndicator(props: DsProgressIndicatorProps) {
  return <ProgressIndicator {...props} />
}

export type DsProgressLabelProps = React.ComponentProps<typeof ProgressLabel>
export function DsProgressLabel(props: DsProgressLabelProps) {
  return <ProgressLabel {...props} />
}

export type DsProgressValueProps = React.ComponentProps<typeof ProgressValue>
export function DsProgressValue(props: DsProgressValueProps) {
  return <ProgressValue {...props} />
}
