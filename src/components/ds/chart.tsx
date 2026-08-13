import * as React from "react"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export type DsChartContainerProps = React.ComponentProps<typeof ChartContainer>
export function DsChartContainer(props: DsChartContainerProps) {
  return <ChartContainer {...props} />
}

export type DsChartTooltipProps = React.ComponentProps<typeof ChartTooltip>
export function DsChartTooltip(props: DsChartTooltipProps) {
  return <ChartTooltip {...props} />
}

export type DsChartTooltipContentProps = React.ComponentProps<typeof ChartTooltipContent>
export function DsChartTooltipContent(props: DsChartTooltipContentProps) {
  return <ChartTooltipContent {...props} />
}

export type DsChartLegendProps = React.ComponentProps<typeof ChartLegend>
export function DsChartLegend(props: DsChartLegendProps) {
  return <ChartLegend {...props} />
}

export type DsChartLegendContentProps = React.ComponentProps<typeof ChartLegendContent>
export function DsChartLegendContent(props: DsChartLegendContentProps) {
  return <ChartLegendContent {...props} />
}

export type DsChartStyleProps = React.ComponentProps<typeof ChartStyle>
export function DsChartStyle(props: DsChartStyleProps) {
  return <ChartStyle {...props} />
}
