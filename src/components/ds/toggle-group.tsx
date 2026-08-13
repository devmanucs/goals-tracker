import * as React from "react"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export type DsToggleGroupProps = React.ComponentProps<typeof ToggleGroup>
export function DsToggleGroup(props: DsToggleGroupProps) {
  return <ToggleGroup {...props} />
}

export type DsToggleGroupItemProps = React.ComponentProps<typeof ToggleGroupItem>
export function DsToggleGroupItem(props: DsToggleGroupItemProps) {
  return <ToggleGroupItem {...props} />
}
