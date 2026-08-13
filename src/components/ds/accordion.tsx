import * as React from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export type DsAccordionProps = React.ComponentProps<typeof Accordion>
export function DsAccordion(props: DsAccordionProps) {
  return <Accordion {...props} />
}

export type DsAccordionItemProps = React.ComponentProps<typeof AccordionItem>
export function DsAccordionItem(props: DsAccordionItemProps) {
  return <AccordionItem {...props} />
}

export type DsAccordionTriggerProps = React.ComponentProps<typeof AccordionTrigger>
export function DsAccordionTrigger(props: DsAccordionTriggerProps) {
  return <AccordionTrigger {...props} />
}

export type DsAccordionContentProps = React.ComponentProps<typeof AccordionContent>
export function DsAccordionContent(props: DsAccordionContentProps) {
  return <AccordionContent {...props} />
}
