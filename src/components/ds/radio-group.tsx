import * as React from "react"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export type DsRadioGroupProps = React.ComponentProps<typeof RadioGroup>
export function DsRadioGroup(props: DsRadioGroupProps) {
  return <RadioGroup {...props} />
}

export type DsRadioGroupItemProps = React.ComponentProps<typeof RadioGroupItem>
export function DsRadioGroupItem(props: DsRadioGroupItemProps) {
  return <RadioGroupItem {...props} />
}
