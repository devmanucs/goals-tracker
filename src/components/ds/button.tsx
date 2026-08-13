import * as React from "react"

import { Button } from "@/components/ui/button"

export type DsButtonProps = React.ComponentProps<typeof Button>
export function DsButton(props: DsButtonProps) {
  return <Button {...props} />
}
