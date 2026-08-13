import * as React from "react"

import { Calendar, CalendarDayButton } from "@/components/ui/calendar"

export type DsCalendarProps = React.ComponentProps<typeof Calendar>
export function DsCalendar(props: DsCalendarProps) {
  return <Calendar {...props} />
}

export type DsCalendarDayButtonProps = React.ComponentProps<typeof CalendarDayButton>
export function DsCalendarDayButton(props: DsCalendarDayButtonProps) {
  return <CalendarDayButton {...props} />
}
