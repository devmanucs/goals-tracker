import * as React from "react"

import { Skeleton } from "@/components/ui/skeleton"

export type DsSkeletonProps = React.ComponentProps<typeof Skeleton>
export function DsSkeleton(props: DsSkeletonProps) {
  return <Skeleton {...props} />
}
