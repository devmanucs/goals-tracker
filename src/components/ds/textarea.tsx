import * as React from "react"

import { Textarea } from "@/components/ui/textarea"

export type DsTextareaProps = React.ComponentProps<typeof Textarea>
export function DsTextarea(props: DsTextareaProps) {
  return <Textarea {...props} />
}
