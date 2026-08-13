import * as React from "react"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export type DsInputOTPProps = React.ComponentProps<typeof InputOTP>
export function DsInputOTP(props: DsInputOTPProps) {
  return <InputOTP {...props} />
}

export type DsInputOTPGroupProps = React.ComponentProps<typeof InputOTPGroup>
export function DsInputOTPGroup(props: DsInputOTPGroupProps) {
  return <InputOTPGroup {...props} />
}

export type DsInputOTPSlotProps = React.ComponentProps<typeof InputOTPSlot>
export function DsInputOTPSlot(props: DsInputOTPSlotProps) {
  return <InputOTPSlot {...props} />
}

export type DsInputOTPSeparatorProps = React.ComponentProps<
  typeof InputOTPSeparator
>
export function DsInputOTPSeparator(props: DsInputOTPSeparatorProps) {
  return <InputOTPSeparator {...props} />
}
