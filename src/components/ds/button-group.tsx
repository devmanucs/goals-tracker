import * as React from "react"

import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group"

export type DsButtonGroupProps = React.ComponentProps<typeof ButtonGroup>
export function DsButtonGroup(props: DsButtonGroupProps) {
  return <ButtonGroup {...props} />
}

export type DsButtonGroupSeparatorProps = React.ComponentProps<typeof ButtonGroupSeparator>
export function DsButtonGroupSeparator(props: DsButtonGroupSeparatorProps) {
  return <ButtonGroupSeparator {...props} />
}

export type DsButtonGroupTextProps = React.ComponentProps<typeof ButtonGroupText>
export function DsButtonGroupText(props: DsButtonGroupTextProps) {
  return <ButtonGroupText {...props} />
}
