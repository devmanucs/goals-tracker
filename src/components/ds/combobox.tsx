import * as React from "react"

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox"

export type DsComboboxProps = React.ComponentProps<typeof Combobox>
export function DsCombobox(props: DsComboboxProps) {
  return <Combobox {...props} />
}

export type DsComboboxInputProps = React.ComponentProps<typeof ComboboxInput>
export function DsComboboxInput(props: DsComboboxInputProps) {
  return <ComboboxInput {...props} />
}

export type DsComboboxContentProps = React.ComponentProps<typeof ComboboxContent>
export function DsComboboxContent(props: DsComboboxContentProps) {
  return <ComboboxContent {...props} />
}

export type DsComboboxListProps = React.ComponentProps<typeof ComboboxList>
export function DsComboboxList(props: DsComboboxListProps) {
  return <ComboboxList {...props} />
}

export type DsComboboxItemProps = React.ComponentProps<typeof ComboboxItem>
export function DsComboboxItem(props: DsComboboxItemProps) {
  return <ComboboxItem {...props} />
}

export type DsComboboxGroupProps = React.ComponentProps<typeof ComboboxGroup>
export function DsComboboxGroup(props: DsComboboxGroupProps) {
  return <ComboboxGroup {...props} />
}

export type DsComboboxLabelProps = React.ComponentProps<typeof ComboboxLabel>
export function DsComboboxLabel(props: DsComboboxLabelProps) {
  return <ComboboxLabel {...props} />
}

export type DsComboboxCollectionProps = React.ComponentProps<typeof ComboboxCollection>
export function DsComboboxCollection(props: DsComboboxCollectionProps) {
  return <ComboboxCollection {...props} />
}

export type DsComboboxEmptyProps = React.ComponentProps<typeof ComboboxEmpty>
export function DsComboboxEmpty(props: DsComboboxEmptyProps) {
  return <ComboboxEmpty {...props} />
}

export type DsComboboxSeparatorProps = React.ComponentProps<typeof ComboboxSeparator>
export function DsComboboxSeparator(props: DsComboboxSeparatorProps) {
  return <ComboboxSeparator {...props} />
}

export type DsComboboxChipsProps = React.ComponentProps<typeof ComboboxChips>
export function DsComboboxChips(props: DsComboboxChipsProps) {
  return <ComboboxChips {...props} />
}

export type DsComboboxChipProps = React.ComponentProps<typeof ComboboxChip>
export function DsComboboxChip(props: DsComboboxChipProps) {
  return <ComboboxChip {...props} />
}

export type DsComboboxChipsInputProps = React.ComponentProps<typeof ComboboxChipsInput>
export function DsComboboxChipsInput(props: DsComboboxChipsInputProps) {
  return <ComboboxChipsInput {...props} />
}

export type DsComboboxTriggerProps = React.ComponentProps<typeof ComboboxTrigger>
export function DsComboboxTrigger(props: DsComboboxTriggerProps) {
  return <ComboboxTrigger {...props} />
}

export type DsComboboxValueProps = React.ComponentProps<typeof ComboboxValue>
export function DsComboboxValue(props: DsComboboxValueProps) {
  return <ComboboxValue {...props} />
}
