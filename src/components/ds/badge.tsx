import * as React from "react"

import { Badge } from "@/components/ui/badge"

export type DsBadgeProps = React.ComponentProps<typeof Badge>
export function DsBadge(props: DsBadgeProps) {
  return <Badge {...props} />
}
