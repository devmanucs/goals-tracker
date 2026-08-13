import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export type DsSelectProps = React.ComponentProps<typeof Select>
export function DsSelect(props: DsSelectProps) {
  return <Select {...props} />
}

export type DsSelectContentProps = React.ComponentProps<typeof SelectContent>
export function DsSelectContent(props: DsSelectContentProps) {
  return <SelectContent {...props} />
}

export type DsSelectGroupProps = React.ComponentProps<typeof SelectGroup>
export function DsSelectGroup(props: DsSelectGroupProps) {
  return <SelectGroup {...props} />
}

export type DsSelectItemProps = React.ComponentProps<typeof SelectItem>
export function DsSelectItem(props: DsSelectItemProps) {
  return <SelectItem {...props} />
}

export type DsSelectLabelProps = React.ComponentProps<typeof SelectLabel>
export function DsSelectLabel(props: DsSelectLabelProps) {
  return <SelectLabel {...props} />
}

export type DsSelectScrollDownButtonProps = React.ComponentProps<typeof SelectScrollDownButton>
export function DsSelectScrollDownButton(props: DsSelectScrollDownButtonProps) {
  return <SelectScrollDownButton {...props} />
}

export type DsSelectScrollUpButtonProps = React.ComponentProps<typeof SelectScrollUpButton>
export function DsSelectScrollUpButton(props: DsSelectScrollUpButtonProps) {
  return <SelectScrollUpButton {...props} />
}

export type DsSelectSeparatorProps = React.ComponentProps<typeof SelectSeparator>
export function DsSelectSeparator(props: DsSelectSeparatorProps) {
  return <SelectSeparator {...props} />
}

export type DsSelectTriggerProps = React.ComponentProps<typeof SelectTrigger>
export function DsSelectTrigger(props: DsSelectTriggerProps) {
  return <SelectTrigger {...props} />
}

export type DsSelectValueProps = React.ComponentProps<typeof SelectValue>
export function DsSelectValue(props: DsSelectValueProps) {
  return <SelectValue {...props} />
}
