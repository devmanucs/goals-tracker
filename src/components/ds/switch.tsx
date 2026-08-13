import * as React from "react"

import { Switch } from "@/components/ui/switch"

export type DsSwitchProps = React.ComponentProps<typeof Switch>
export function DsSwitch(props: DsSwitchProps) {
  return <Switch {...props} />
}
