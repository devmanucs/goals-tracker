import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"

import { DsFramePanel } from "@/components/ds/frame"
import { CountUp } from "@/components/react-bits/count-up"

export type Stat = {
  label: string
  value: number
  decimals?: number
  suffix?: string
  prefix?: string
  hint?: string
  icon?: IconSvgElement
}

export function StatStrip({ stats }: { stats: Stat[] }) {
  return (
    <DsFramePanel className="grid grid-cols-1 divide-y p-0 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
      {stats.map((stat) => (
        <div key={stat.label} className="flex items-start justify-between gap-3 px-5 py-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">{stat.label}</span>
            <span className="font-heading text-2xl font-medium tabular-nums">
              <CountUp to={stat.value} decimals={stat.decimals ?? 0} suffix={stat.suffix ?? ""} prefix={stat.prefix ?? ""} />
            </span>
            {stat.hint && <span className="truncate text-xs text-muted-foreground">{stat.hint}</span>}
          </div>
          {stat.icon && (
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <HugeiconsIcon icon={stat.icon} strokeWidth={2} className="size-4" />
            </span>
          )}
        </div>
      ))}
    </DsFramePanel>
  )
}
