import * as React from "react"

import { AspectRatio } from "@/components/ui/aspect-ratio"

export type DsAspectRatioProps = React.ComponentProps<typeof AspectRatio>
export function DsAspectRatio(props: DsAspectRatioProps) {
  return <AspectRatio {...props} />
}
