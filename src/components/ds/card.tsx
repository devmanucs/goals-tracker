import * as React from "react"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export type DsCardProps = React.ComponentProps<typeof Card>
export function DsCard(props: DsCardProps) {
  return <Card {...props} />
}

export type DsCardHeaderProps = React.ComponentProps<typeof CardHeader>
export function DsCardHeader(props: DsCardHeaderProps) {
  return <CardHeader {...props} />
}

export type DsCardFooterProps = React.ComponentProps<typeof CardFooter>
export function DsCardFooter(props: DsCardFooterProps) {
  return <CardFooter {...props} />
}

export type DsCardTitleProps = React.ComponentProps<typeof CardTitle>
export function DsCardTitle(props: DsCardTitleProps) {
  return <CardTitle {...props} />
}

export type DsCardActionProps = React.ComponentProps<typeof CardAction>
export function DsCardAction(props: DsCardActionProps) {
  return <CardAction {...props} />
}

export type DsCardDescriptionProps = React.ComponentProps<typeof CardDescription>
export function DsCardDescription(props: DsCardDescriptionProps) {
  return <CardDescription {...props} />
}

export type DsCardContentProps = React.ComponentProps<typeof CardContent>
export function DsCardContent(props: DsCardContentProps) {
  return <CardContent {...props} />
}
