import * as React from "react"

import { Separator } from "@/components/ui/separator"

export type DsSeparatorProps = React.ComponentProps<typeof Separator>
export function DsSeparator(props: DsSeparatorProps) {
  return <Separator {...props} />
}
