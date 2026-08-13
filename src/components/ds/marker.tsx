import * as React from "react"

import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"

export type DsMarkerProps = React.ComponentProps<typeof Marker>
export function DsMarker(props: DsMarkerProps) {
  return <Marker {...props} />
}

export type DsMarkerIconProps = React.ComponentProps<typeof MarkerIcon>
export function DsMarkerIcon(props: DsMarkerIconProps) {
  return <MarkerIcon {...props} />
}

export type DsMarkerContentProps = React.ComponentProps<typeof MarkerContent>
export function DsMarkerContent(props: DsMarkerContentProps) {
  return <MarkerContent {...props} />
}
