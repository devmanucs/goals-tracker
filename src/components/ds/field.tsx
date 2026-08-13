import * as React from "react"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"

export type DsFieldProps = React.ComponentProps<typeof Field>
export function DsField(props: DsFieldProps) {
  return <Field {...props} />
}

export type DsFieldLabelProps = React.ComponentProps<typeof FieldLabel>
export function DsFieldLabel(props: DsFieldLabelProps) {
  return <FieldLabel {...props} />
}

export type DsFieldDescriptionProps = React.ComponentProps<
  typeof FieldDescription
>
export function DsFieldDescription(props: DsFieldDescriptionProps) {
  return <FieldDescription {...props} />
}

export type DsFieldErrorProps = React.ComponentProps<typeof FieldError>
export function DsFieldError(props: DsFieldErrorProps) {
  return <FieldError {...props} />
}

export type DsFieldGroupProps = React.ComponentProps<typeof FieldGroup>
export function DsFieldGroup(props: DsFieldGroupProps) {
  return <FieldGroup {...props} />
}

export type DsFieldLegendProps = React.ComponentProps<typeof FieldLegend>
export function DsFieldLegend(props: DsFieldLegendProps) {
  return <FieldLegend {...props} />
}

export type DsFieldSeparatorProps = React.ComponentProps<
  typeof FieldSeparator
>
export function DsFieldSeparator(props: DsFieldSeparatorProps) {
  return <FieldSeparator {...props} />
}

export type DsFieldSetProps = React.ComponentProps<typeof FieldSet>
export function DsFieldSet(props: DsFieldSetProps) {
  return <FieldSet {...props} />
}

export type DsFieldContentProps = React.ComponentProps<typeof FieldContent>
export function DsFieldContent(props: DsFieldContentProps) {
  return <FieldContent {...props} />
}

export type DsFieldTitleProps = React.ComponentProps<typeof FieldTitle>
export function DsFieldTitle(props: DsFieldTitleProps) {
  return <FieldTitle {...props} />
}
