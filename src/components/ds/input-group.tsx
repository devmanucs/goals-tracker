import * as React from "react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"

export type DsInputGroupProps = React.ComponentProps<typeof InputGroup>
export function DsInputGroup(props: DsInputGroupProps) {
  return <InputGroup {...props} />
}

export type DsInputGroupAddonProps = React.ComponentProps<
  typeof InputGroupAddon
>
export function DsInputGroupAddon(props: DsInputGroupAddonProps) {
  return <InputGroupAddon {...props} />
}

export type DsInputGroupButtonProps = React.ComponentProps<
  typeof InputGroupButton
>
export function DsInputGroupButton(props: DsInputGroupButtonProps) {
  return <InputGroupButton {...props} />
}

export type DsInputGroupTextProps = React.ComponentProps<
  typeof InputGroupText
>
export function DsInputGroupText(props: DsInputGroupTextProps) {
  return <InputGroupText {...props} />
}

export type DsInputGroupInputProps = React.ComponentProps<
  typeof InputGroupInput
>
export function DsInputGroupInput(props: DsInputGroupInputProps) {
  return <InputGroupInput {...props} />
}

export type DsInputGroupTextareaProps = React.ComponentProps<
  typeof InputGroupTextarea
>
export function DsInputGroupTextarea(props: DsInputGroupTextareaProps) {
  return <InputGroupTextarea {...props} />
}
