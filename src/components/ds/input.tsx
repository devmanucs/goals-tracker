import * as React from "react"

import { Input } from "@/components/ui/input"

export type DsInputProps = React.ComponentProps<typeof Input>
export function DsInput(props: DsInputProps) {
  return <Input {...props} />
}
