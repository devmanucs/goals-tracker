import * as React from "react"

import { Checkbox } from "@/components/ui/checkbox"

export type DsCheckboxProps = React.ComponentProps<typeof Checkbox>
export function DsCheckbox(props: DsCheckboxProps) {
  return <Checkbox {...props} />
}
