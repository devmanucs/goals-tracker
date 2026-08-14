"use client"

import { useMemo, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft01Icon, ArrowRight01Icon, Alert02Icon } from "@hugeicons/core-free-icons"

import { cn } from "@/lib/utils"
import { DsButton } from "@/components/ds/button"
import { DsButtonGroup } from "@/components/ds/button-group"
import { DsTooltip, DsTooltipContent, DsTooltipProvider, DsTooltipTrigger } from "@/components/ds/tooltip"
import { PesoIndicator } from "@/features/estudos/components/peso-indicator"
import type { TopicoEstudo } from "@/features/estudos/data"
import { corDaMateria, STATUS_TOPICO_LABEL } from "@/features/estudos/data"
import { diasEntre, formatarData, HOJE, parseDate } from "@/lib/dates"

const DIAS_SEMANA = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"]

function inicioDaSemana(date: Date) {
  const d = new Date(date)
  d.setDate(d.getDate() - d.getDay())
  d.setHours(12, 0, 0, 0)
  return d
}

function isoDe(date: Date) {
  return date.toISOString().slice(0, 10)
}

function addDias(date: Date, quantidade: number) {
  const d = new Date(date)
  d.setDate(d.getDate() + quantidade)
  return d
}

export function CalendarioSemana({ topicos }: { topicos: TopicoEstudo[] }) {
  const [ancora, setAncora] = useState(() => inicioDaSemana(parseDate(HOJE)))

  const dias = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => {
        const data = new Date(ancora)
        data.setDate(ancora.getDate() + i)
        return data
      }),
    [ancora]
  )

  const topicosPorDia = useMemo(() => {
    const mapa = new Map<string, TopicoEstudo[]>()
    for (const topico of topicos) {
      const lista = mapa.get(topico.dataAgendada) ?? []
      lista.push(topico)
      mapa.set(topico.dataAgendada, lista)
    }
    for (const lista of mapa.values()) lista.sort((a, b) => b.peso - a.peso)
    return mapa
  }, [topicos])

  const fim = dias[6]
  const label = `${formatarData(isoDe(ancora))} – ${formatarData(isoDe(fim))}`

  return (
    <DsTooltipProvider>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <DsButtonGroup>
            <DsButton
              variant="outline"
              size="icon-sm"
              onClick={() => setAncora((a) => addDias(a, -7))}
              aria-label="Semana anterior"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} />
            </DsButton>
            <DsButton variant="outline" size="sm" onClick={() => setAncora(inicioDaSemana(parseDate(HOJE)))}>
              Hoje
            </DsButton>
            <DsButton
              variant="outline"
              size="icon-sm"
              onClick={() => setAncora((a) => addDias(a, 7))}
              aria-label="Próxima semana"
            >
              <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
            </DsButton>
          </DsButtonGroup>
        </div>

        <div className="overflow-x-auto rounded-lg">
          <div className="grid w-full min-w-[840px] grid-cols-7 gap-px bg-border">
            {dias.map((dia) => {
              const iso = isoDe(dia)
              const ehHoje = iso === HOJE
              const topicosDoDia = topicosPorDia.get(iso) ?? []

              return (
                <div key={iso} className="flex min-h-64 flex-col bg-card">
                  <div
                    className={cn(
                      "flex shrink-0 flex-col items-center gap-0.5 border-b border-border px-1 py-2",
                      ehHoje && "bg-primary/8"
                    )}
                  >
                    <span className="text-[0.65rem] font-medium tracking-wide text-muted-foreground uppercase">
                      {DIAS_SEMANA[dia.getDay()]}
                    </span>
                    <span
                      className={cn(
                        "flex size-6 items-center justify-center rounded-full text-sm font-medium tabular-nums",
                        ehHoje && "bg-primary text-primary-foreground"
                      )}
                    >
                      {dia.getDate()}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5 p-1.5">
                    {topicosDoDia.map((topico) => {
                      const atrasado =
                        diasEntre(topico.dataAgendada, HOJE) > 0 &&
                        (topico.status === "pendente" || topico.status === "estudando")

                      return (
                        <DsTooltip key={topico.id}>
                          <DsTooltipTrigger
                            render={
                              <div
                                className={cn(
                                  "flex flex-col gap-1 rounded-lg border border-border bg-background p-1.5 text-left",
                                  atrasado && "border-destructive/40"
                                )}
                              />
                            }
                          >
                            <p className="line-clamp-2 text-xs leading-snug font-medium text-foreground">
                              {topico.titulo}
                            </p>
                            <div className="flex items-center justify-between gap-1">
                              <span className="flex min-w-0 items-center gap-1 text-[0.7rem] text-muted-foreground">
                                <span
                                  className="size-1.5 shrink-0 rounded-full"
                                  style={{ backgroundColor: corDaMateria(topico.materia) }}
                                  aria-hidden="true"
                                />
                                <span className="truncate">{topico.materia}</span>
                              </span>
                              <PesoIndicator peso={topico.peso} showValue={false} className="shrink-0" />
                            </div>
                            {atrasado && (
                              <span className="flex items-center gap-1 text-[0.7rem] font-medium text-destructive">
                                <HugeiconsIcon icon={Alert02Icon} strokeWidth={2} className="size-3" />
                                Atrasado
                              </span>
                            )}
                          </DsTooltipTrigger>
                          <DsTooltipContent className="flex flex-col gap-1">
                            <p className="font-medium">{topico.titulo}</p>
                            <p className="text-xs text-muted-foreground">
                              {topico.materia} · peso {topico.peso} · {STATUS_TOPICO_LABEL[topico.status]}
                            </p>
                          </DsTooltipContent>
                        </DsTooltip>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </DsTooltipProvider>
  )
}
