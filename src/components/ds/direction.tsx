import * as React from "react"

import { DirectionProvider } from "@/components/ui/direction"

export type DsDirectionProviderProps = React.ComponentProps<
  typeof DirectionProvider
>
export function DsDirectionProvider(props: DsDirectionProviderProps) {
  return <DirectionProvider {...props} />
}
