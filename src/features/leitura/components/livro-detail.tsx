"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { DefinirBreadcrumb } from "@/components/breadcrumb-context"
import { DsCard, DsCardContent, DsCardHeader, DsCardTitle } from "@/components/ds/card"
import { DsChartContainer, DsChartTooltip, DsChartTooltipContent } from "@/components/ds/chart"
import { DsItem, DsItemContent, DsItemDescription, DsItemGroup, DsItemMedia, DsItemTitle } from "@/components/ds/item"
import { DsProgress, DsProgressIndicator, DsProgressTrack } from "@/components/ds/progress"
import { AddProgressDialog } from "@/features/leitura/components/add-progress-dialog"
import { StatusLivroSelect } from "@/features/leitura/components/status-livro-select"
import { corDaCapa, type Livro, type RegistroLeitura } from "@/features/leitura/types"
import { compararDatas, formatarData, formatarDataCompleta } from "@/lib/dates"

export function LivroDetail({
  livro,
  registros,
}: {
  livro: Livro
  registros: RegistroLeitura[]
}) {
  // A API já devolve os registros em ordem cronológica; a ordenação aqui é só
  // uma garantia barata para o gráfico não depender disso.
  const registrosOrdenados = [...registros].sort((a, b) => compararDatas(a.data, b.data))

  // paginaAtual e percentual vêm calculados da API, junto do livro.
  const { paginaAtual, percentual } = livro

  const chartData = registrosOrdenados.map((r) => ({
    data: formatarData(r.data),
    pagina: r.paginaAtual,
  }))

  return (
    <div className="flex flex-1 flex-col">
      <DefinirBreadcrumb items={[{ label: "Leitura", href: "/leitura" }, { label: livro.titulo }]} />

      <div className="flex flex-1 flex-col gap-6 p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className="h-24 w-16 shrink-0 rounded-sm"
              style={{
                backgroundColor: corDaCapa(livro),
                boxShadow: "inset -5px 0 10px -5px rgba(0,0,0,0.35), 0 2px 4px rgba(0,0,0,0.15)",
              }}
            />
            <div>
              <h1 className="font-heading text-xl font-medium text-balance">{livro.titulo}</h1>
              <p className="mt-0.5 text-sm text-muted-foreground">{livro.autor}</p>
              <div className="mt-2">
                <StatusLivroSelect livroId={livro.id} status={livro.status} />
              </div>
            </div>
          </div>
          <AddProgressDialog
            livroId={livro.id}
            totalPaginas={livro.totalPaginas}
            paginaAtual={paginaAtual}
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
