"use client"

import { useState } from "react"
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from "recharts"

import { DsCard, DsCardContent, DsCardHeader, DsCardTitle } from "@/components/ds/card"
import { DsChartContainer, DsChartTooltip, DsChartTooltipContent } from "@/components/ds/chart"
import { DsTabs, DsTabsList, DsTabsTrigger } from "@/components/ds/tabs"

type MesDado<T extends string> = { mes: string } & Record<T, number>

export function RetrospectivaCharts({
  paginas6: paginas6meses,
  paginas12: paginas12meses,
  topicos6,
  topicos12,
  habitos6,
  habitos12,
}: {
  paginas6: MesDado<"paginas">[]
  paginas12: MesDado<"paginas">[]
  topicos6: MesDado<"topicos">[]
  topicos12: MesDado<"topicos">[]
  habitos6: MesDado<"percentual">[]
  habitos12: MesDado<"percentual">[]
}) {
  const [periodo, setPeriodo] = useState<"mes" | "ano">("mes")
  const paginas = periodo === "mes" ? paginas6meses : paginas12meses
  const topicos = periodo === "mes" ? topicos6 : topicos12
  const habitos = periodo === "mes" ? habitos6 : habitos12

  return (
    <div className="flex flex-col gap-6">
      <DsTabs value={periodo} onValueChange={(v) => setPeriodo(v as "mes" | "ano")}>
        <DsTabsList>
          <DsTabsTrigger value="mes">Últimos 6 meses</DsTabsTrigger>
          <DsTabsTrigger value="ano">Últimos 12 meses</DsTabsTrigger>
        </DsTabsList>
      </DsTabs>

      <div className="grid gap-4 lg:grid-cols-2">
        <DsCard>
          <DsCardHeader>
            <DsCardTitle>Páginas lidas por mês</DsCardTitle>
          </DsCardHeader>
          <DsCardContent>
            <DsChartContainer config={{ paginas: { label: "Páginas", color: "var(--chart-1)" } }} className="aspect-auto h-56 w-full">
              <BarChart data={paginas} margin={{ left: 0, right: 12, top: 8, bottom: 0 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="mes" tickLine={false} axisLine={false} tickMargin={8} />
                <DsChartTooltip content={<DsChartTooltipContent indicator="dot" />} />
                <Bar dataKey="paginas" fill="var(--color-paginas)" radius={6} />
              </BarChart>
            </DsChartContainer>
          </DsCardContent>
        </DsCard>

        <DsCard>
          <DsCardHeader>
            <DsCardTitle>Tópicos estudados por mês</DsCardTitle>
          </DsCardHeader>
          <DsCardContent>
            <DsChartContainer config={{ topicos: { label: "Tópicos", color: "var(--chart-3)" } }} className="aspect-auto h-56 w-full">
              <BarChart data={topicos} margin={{ left: 0, right: 12, top: 8, bottom: 0 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="mes" tickLine={false} axisLine={false} tickMargin={8} />
                <DsChartTooltip content={<DsChartTooltipContent indicator="dot" />} />
                <Bar dataKey="topicos" fill="var(--color-topicos)" radius={6} />
              </BarChart>
            </DsChartContainer>
          </DsCardContent>
        </DsCard>

        <DsCard className="lg:col-span-2">
          <DsCardHeader>
            <DsCardTitle>Hábitos com meta batida (% dos hábitos ativos)</DsCardTitle>
          </DsCardHeader>
          <DsCardContent>
            <DsChartContainer
              config={{ percentual: { label: "Metas batidas", color: "var(--chart-4)" } }}
              className="aspect-auto h-56 w-full"
            >
              <LineChart data={habitos} margin={{ left: 0, right: 12, top: 8, bottom: 0 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="mes" tickLine={false} axisLine={false} tickMargin={8} />
                <DsChartTooltip content={<DsChartTooltipContent indicator="line" />} />
                <Line
                  dataKey="percentual"
                  type="monotone"
                  stroke="var(--color-percentual)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-percentual)" }}
                />
              </LineChart>
            </DsChartContainer>
          </DsCardContent>
        </DsCard>
      </div>
    </div>
  )
}
