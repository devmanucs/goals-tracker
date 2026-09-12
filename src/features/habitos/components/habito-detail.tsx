"use client"

import { useMemo, useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { HugeiconsIcon } from "@hugeicons/react"
import { Fire03Icon } from "@hugeicons/core-free-icons"

import { AppHeader } from "@/components/app-header"
import { DsCard, DsCardContent, DsCardHeader, DsCardTitle } from "@/components/ds/card"
import { DsChartContainer, DsChartTooltip, DsChartTooltipContent } from "@/components/ds/chart"
import { DsItem, DsItemContent, DsItemGroup, DsItemTitle } from "@/components/ds/item"
import { DsProgress, DsProgressIndicator, DsProgressTrack } from "@/components/ds/progress"
import { AddRegistroHabitoDialog } from "@/features/habitos/components/add-registro-habito-dialog"
import { StreakHeatmap } from "@/features/habitos/components/streak-heatmap"
import type { Habito, RegistroHabito } from "@/features/habitos/data"
import { FREQUENCIA_LABEL } from "@/features/habitos/data"
import { diasEntre, formatarData, formatarDataCompleta, HOJE } from "@/lib/dates"

function calcularProgresso(habito: Habito, registros: RegistroHabito[]) {
  const hoje = new Date(`${HOJE}T12:00:00`)
  let inicio = HOJE
  if (habito.frequencia === "semanal") {
    const diff = hoje.getDay() === 0 ? 6 : hoje.getDay() - 1
    const d = new Date(hoje)
    d.setDate(hoje.getDate() - diff)
    inicio = d.toISOString().slice(0, 10)
  } else if (habito.frequencia === "mensal") {
    inicio = `${HOJE.slice(0, 7)}-01`
  }
  const atual = registros
    .filter((r) => diasEntre(inicio, r.data) >= 0 && diasEntre(r.data, HOJE) >= 0)
    .reduce((acc, r) => acc + r.valor, 0)
  return {
    atual: Math.round(atual * 10) / 10,
    percentual: Math.min(100, Math.round((atual / habito.metaValor) * 100)),
  }
}

function calcularStreak(habito: Habito, registros: RegistroHabito[]) {
  if (habito.frequencia !== "diaria") {
    const totalPorSemana = new Map<string, number>()
    for (const r of registros) {
      const chave = r.data.slice(0, 7)
      totalPorSemana.set(chave, (totalPorSemana.get(chave) ?? 0) + r.valor)
    }
    return [...totalPorSemana.values()].filter((v) => v >= habito.metaValor).length
  }
  const porData = new Map(registros.map((r) => [r.data, r.valor]))
  let streak = 0
  const cursor = new Date(`${HOJE}T12:00:00`)
  for (let i = 0; i < 365; i++) {
    const iso = cursor.toISOString().slice(0, 10)
    const valor = porData.get(iso) ?? 0
    if (valor >= habito.metaValor) {
      streak++
      cursor.setDate(cursor.getDate() - 1)
    } else break
  }
  return streak
}

export function HabitoDetail({
  habito,
  registrosIniciais,
}: {
  habito: Habito
  registrosIniciais: RegistroHabito[]
}) {
  const [registros, setRegistros] = useState<RegistroHabito[]>(registrosIniciais)

  const registrosOrdenados = useMemo(
    () => [...registros].sort((a, b) => a.data.localeCompare(b.data)),
    [registros]
  )
  const progresso = calcularProgresso(habito, registros)
  const streak = calcularStreak(habito, registros)

  const chartData = registrosOrdenados.map((r) => ({
    data: formatarData(r.data),
    valor: r.valor,
  }))

  return (
    <div className="flex min-h-svh flex-col">
      <AppHeader items={[{ label: "Hábitos", href: "/habitos" }, { label: habito.nome }]} />

      <div className="flex flex-1 flex-col gap-6 p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-heading text-xl font-medium">{habito.nome}</h1>
            <p className="text-sm text-muted-foreground">
              Meta: {habito.metaValor} {habito.unidade} {FREQUENCIA_LABEL[habito.frequencia]}
            </p>
          </div>
          <AddRegistroHabitoDialog
            habitoId={habito.id}
            unidade={habito.unidade}
            onAdd={(registro) => setRegistros((prev) => [...prev, registro])}
          />
        </div>
        <section className="grid gap-4 sm:grid-cols-2">
          <DsCard>
            <DsCardContent className="flex flex-col gap-2">
              <div className="flex items-baseline justify-between">
                <p className="text-sm font-medium">Progresso do período atual</p>
                <p className="text-sm text-muted-foreground">
                  {progresso.atual} de {habito.metaValor} {habito.unidade}
                </p>
              </div>
              <DsProgress value={progresso.percentual}>
                <span className="ml-auto text-sm font-medium tabular-nums">{progresso.percentual}%</span>
                <DsProgressTrack>
                  <DsProgressIndicator />
                </DsProgressTrack>
              </DsProgress>
            </DsCardContent>
          </DsCard>
          <DsCard>
            <DsCardContent className="flex flex-col justify-center gap-1">
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <HugeiconsIcon icon={Fire03Icon} strokeWidth={2} className="size-3.5" />
                Streak atual
              </p>
              <p className="font-heading text-2xl font-medium tabular-nums">
                {streak} {habito.frequencia === "diaria" ? "dias" : "períodos"}
              </p>
            </DsCardContent>
          </DsCard>
        </section>

        <DsCard>
          <DsCardHeader>
            <DsCardTitle>Consistência</DsCardTitle>
          </DsCardHeader>
          <DsCardContent className="overflow-x-auto">
            <StreakHeatmap habito={habito} registros={registros} semanas={12} />
          </DsCardContent>
        </DsCard>

        {chartData.length > 1 && (
          <DsCard>
            <DsCardHeader>
              <DsCardTitle>Registros ao longo do tempo</DsCardTitle>
            </DsCardHeader>
            <DsCardContent>
              <DsChartContainer
                config={{ valor: { label: `Valor (${habito.unidade})`, color: "var(--chart-2)" } }}
                className="aspect-auto h-56 w-full"
              >
                <BarChart data={chartData} margin={{ left: 0, right: 12, top: 8, bottom: 0 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="data" tickLine={false} axisLine={false} tickMargin={8} />
                  <DsChartTooltip content={<DsChartTooltipContent indicator="dot" />} />
                  <Bar dataKey="valor" fill="var(--color-valor)" radius={6} />
                </BarChart>
              </DsChartContainer>
            </DsCardContent>
          </DsCard>
        )}

        <DsCard>
          <DsCardHeader>
            <DsCardTitle>Histórico de registros</DsCardTitle>
          </DsCardHeader>
          <DsCardContent>
            {registrosOrdenados.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhum registro ainda.</p>
            ) : (
              <DsItemGroup>
                {[...registrosOrdenados].reverse().map((registro) => (
                  <DsItem key={registro.id} variant="outline">
                    <DsItemContent>
                      <DsItemTitle>{formatarDataCompleta(registro.data)}</DsItemTitle>
                    </DsItemContent>
                    <span className="text-sm font-medium tabular-nums">
                      {registro.valor} {habito.unidade}
                    </span>
                  </DsItem>
                ))}
              </DsItemGroup>
            )}
          </DsCardContent>
        </DsCard>
      </div>
    </div>
  )
}
