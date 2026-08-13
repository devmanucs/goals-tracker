import * as React from "react"

import { Label } from "@/components/ui/label"

export type DsLabelProps = React.ComponentProps<typeof Label>
export function DsLabel(props: DsLabelProps) {
  return <Label {...props} />
}
