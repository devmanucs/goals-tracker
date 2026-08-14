"use client"

import { useMemo, useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { AppHeader } from "@/components/app-header"
import { DsBadge } from "@/components/ds/badge"
import { DsCard, DsCardContent, DsCardHeader, DsCardTitle } from "@/components/ds/card"
import { DsChartContainer, DsChartTooltip, DsChartTooltipContent } from "@/components/ds/chart"
import { DsItem, DsItemContent, DsItemDescription, DsItemGroup, DsItemMedia, DsItemTitle } from "@/components/ds/item"
import { DsProgress, DsProgressIndicator, DsProgressTrack } from "@/components/ds/progress"
import { AddProgressDialog } from "@/features/leitura/components/add-progress-dialog"
import type { Livro, RegistroLeitura } from "@/features/leitura/data"
import { STATUS_LIVRO_LABEL } from "@/features/leitura/data"
import { formatarData, formatarDataCompleta } from "@/lib/dates"

export function LivroDetail({
  livro,
  registrosIniciais,
}: {
  livro: Livro
  registrosIniciais: RegistroLeitura[]
}) {
  const [registros, setRegistros] = useState<RegistroLeitura[]>(registrosIniciais)

  const registrosOrdenados = useMemo(
    () => [...registros].sort((a, b) => a.data.localeCompare(b.data)),
    [registros]
  )
  const paginaAtual = registrosOrdenados.at(-1)?.paginaAtual ?? 0
  const percentual = Math.round((paginaAtual / livro.totalPaginas) * 100)

  const chartData = registrosOrdenados.map((r) => ({
    data: formatarData(r.data),
    pagina: r.paginaAtual,
  }))

  return (
    <div className="flex min-h-svh flex-col">
      <AppHeader items={[{ label: "Leitura", href: "/leitura" }, { label: livro.titulo }]} />

      <div className="flex flex-1 flex-col gap-6 p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="h-24 w-16 shrink-0 rounded-md" style={{ backgroundColor: livro.corCapa }} />
            <div>
              <h1 className="font-heading text-xl font-medium text-balance">{livro.titulo}</h1>
              <p className="mt-0.5 text-sm text-muted-foreground">{livro.autor}</p>
              <DsBadge variant="outline" className="mt-2 text-muted-foreground">
                {STATUS_LIVRO_LABEL[livro.status]}
              </DsBadge>
            </div>
          </div>
          <AddProgressDialog
            livroId={livro.id}
            totalPaginas={livro.totalPaginas}
            paginaAtual={paginaAtual}
            onAdd={(registro) => setRegistros((prev) => [...prev, registro])}
          />
        </div>
        <DsCard>
          <DsCardContent className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between">
              <p className="text-sm font-medium">Progresso geral</p>
              <p className="text-sm text-muted-foreground">
                {paginaAtual} de {livro.totalPaginas} páginas
              </p>
            </div>
            <DsProgress value={percentual}>
              <span className="ml-auto text-sm font-medium tabular-nums">{percentual}%</span>
              <DsProgressTrack>
                <DsProgressIndicator />
              </DsProgressTrack>
            </DsProgress>
          </DsCardContent>
        </DsCard>

        {chartData.length > 1 && (
          <DsCard>
            <DsCardHeader>
              <DsCardTitle>Evolução da leitura</DsCardTitle>
            </DsCardHeader>
            <DsCardContent>
              <DsChartContainer
                config={{ pagina: { label: "Página", color: "var(--chart-1)" } }}
                className="aspect-auto h-56 w-full"
              >
                <AreaChart data={chartData} margin={{ left: 0, right: 12, top: 8, bottom: 0 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="data" tickLine={false} axisLine={false} tickMargin={8} />
                  <DsChartTooltip content={<DsChartTooltipContent indicator="dot" />} />
                  <Area
                    dataKey="pagina"
                    type="monotone"
                    fill="var(--color-pagina)"
                    fillOpacity={0.15}
                    stroke="var(--color-pagina)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </DsChartContainer>
            </DsCardContent>
          </DsCard>
        )}

        <DsCard>
          <DsCardHeader>
            <DsCardTitle>Histórico de progresso</DsCardTitle>
          </DsCardHeader>
          <DsCardContent>
            {registrosOrdenados.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhum registro ainda.</p>
            ) : (
              <DsItemGroup>
                {[...registrosOrdenados].reverse().map((registro) => (
                  <DsItem key={registro.id} variant="outline">
                    <DsItemMedia variant="icon">
                      <span className="flex size-8 items-center justify-center rounded-md bg-muted text-xs font-medium tabular-nums">
                        {registro.paginaAtual}
                      </span>
                    </DsItemMedia>
                    <DsItemContent>
                      <DsItemTitle>{formatarDataCompleta(registro.data)}</DsItemTitle>
                      {registro.observacao && <DsItemDescription>{registro.observacao}</DsItemDescription>}
                    </DsItemContent>
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
