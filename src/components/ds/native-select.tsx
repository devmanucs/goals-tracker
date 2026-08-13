import * as React from "react"

import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select"

export type DsNativeSelectProps = React.ComponentProps<typeof NativeSelect>
export function DsNativeSelect(props: DsNativeSelectProps) {
  return <NativeSelect {...props} />
}

export type DsNativeSelectOptGroupProps = React.ComponentProps<
  typeof NativeSelectOptGroup
>
export function DsNativeSelectOptGroup(props: DsNativeSelectOptGroupProps) {
  return <NativeSelectOptGroup {...props} />
}

export type DsNativeSelectOptionProps = React.ComponentProps<
  typeof NativeSelectOption
>
export function DsNativeSelectOption(props: DsNativeSelectOptionProps) {
  return <NativeSelectOption {...props} />
}
