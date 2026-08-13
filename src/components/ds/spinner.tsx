import * as React from "react"

import { Spinner } from "@/components/ui/spinner"

export type DsSpinnerProps = React.ComponentProps<typeof Spinner>
export function DsSpinner(props: DsSpinnerProps) {
  return <Spinner {...props} />
}
