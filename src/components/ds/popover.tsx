import * as React from "react"

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

export type DsPopoverProps = React.ComponentProps<typeof Popover>
export function DsPopover(props: DsPopoverProps) {
  return <Popover {...props} />
}

export type DsPopoverTriggerProps = React.ComponentProps<
  typeof PopoverTrigger
>
export function DsPopoverTrigger(props: DsPopoverTriggerProps) {
  return <PopoverTrigger {...props} />
}

export type DsPopoverContentProps = React.ComponentProps<
  typeof PopoverContent
>
export function DsPopoverContent(props: DsPopoverContentProps) {
  return <PopoverContent {...props} />
}

export type DsPopoverHeaderProps = React.ComponentProps<typeof PopoverHeader>
export function DsPopoverHeader(props: DsPopoverHeaderProps) {
  return <PopoverHeader {...props} />
}

export type DsPopoverTitleProps = React.ComponentProps<typeof PopoverTitle>
export function DsPopoverTitle(props: DsPopoverTitleProps) {
  return <PopoverTitle {...props} />
}

export type DsPopoverDescriptionProps = React.ComponentProps<
  typeof PopoverDescription
>
export function DsPopoverDescription(props: DsPopoverDescriptionProps) {
  return <PopoverDescription {...props} />
}
