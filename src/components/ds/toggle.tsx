import * as React from "react"

import { Toggle, toggleVariants } from "@/components/ui/toggle"

export type DsToggleProps = React.ComponentProps<typeof Toggle>
export function DsToggle(props: DsToggleProps) {
  return <Toggle {...props} />
}

export { toggleVariants }
