import * as React from "react"

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export type DsAlertProps = React.ComponentProps<typeof Alert>
export function DsAlert(props: DsAlertProps) {
  return <Alert {...props} />
}

export type DsAlertTitleProps = React.ComponentProps<typeof AlertTitle>
export function DsAlertTitle(props: DsAlertTitleProps) {
  return <AlertTitle {...props} />
}

export type DsAlertDescriptionProps = React.ComponentProps<typeof AlertDescription>
export function DsAlertDescription(props: DsAlertDescriptionProps) {
  return <AlertDescription {...props} />
}

export type DsAlertActionProps = React.ComponentProps<typeof AlertAction>
export function DsAlertAction(props: DsAlertActionProps) {
  return <AlertAction {...props} />
}
