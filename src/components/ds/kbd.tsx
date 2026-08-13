import * as React from "react"

import { Kbd, KbdGroup } from "@/components/ui/kbd"

export type DsKbdProps = React.ComponentProps<typeof Kbd>
export function DsKbd(props: DsKbdProps) {
  return <Kbd {...props} />
}

export type DsKbdGroupProps = React.ComponentProps<typeof KbdGroup>
export function DsKbdGroup(props: DsKbdGroupProps) {
  return <KbdGroup {...props} />
}
