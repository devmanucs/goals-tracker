"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { Calendar03Icon } from "@hugeicons/core-free-icons"

import { DefinirBreadcrumb } from "@/components/breadcrumb-context"
import { DsFrame, DsFramePanel } from "@/components/ds/frame"
import { DsTabs, DsTabsContent, DsTabsList, DsTabsTrigger } from "@/components/ds/tabs"
import { CalendarioTopicos } from "@/features/estudos/components/calendario-topicos"
import { TopicoFormDialog } from "@/features/estudos/components/topico-form-dialog"
import { TopicosTable } from "@/features/estudos/components/topicos-table"
import type { Concurso, TopicoEstudo } from "@/features/estudos/types"
import { formatarDataCompleta } from "@/lib/dates"

export function ConcursoDetail({
  concurso,
  topicos,
}: {
  concurso: Concurso
  topicos: TopicoEstudo[]
}) {
  // O total e o percentual vêm da API junto do concurso; só a quebra por status
  // é contada aqui, a partir da lista que a própria página buscou.
  const estudando = topicos.filter((t) => t.status === "estudando").length
  const contagem = {
    estudados: concurso.progresso.concluidos,
    estudando,
    pendentes: topicos.length - concurso.progresso.concluidos - estudando,
    percentual: concurso.progresso.percentual,
  }

  const dias = concurso.diasAteProva

  return (
    <div className="flex flex-1 flex-col">
      <DefinirBreadcrumb items={[{ label: "Estudos", href: "/estudos" }, { label: concurso.titulo }]} />

      <div className="flex flex-1 flex-col gap-6 p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-heading text-xl font-medium text-balance">{concurso.titulo}</h1>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <HugeiconsIcon icon={Calendar03Icon} strokeWidth={2} className="size-4" />
              {concurso.banca} · prova em {formatarDataCompleta(concurso.dataProva)}
              {dias >= 0 && <span> · faltam {dias} dias</span>}
            </p>
          </div>
          <TopicoFormDialog concursoId={concurso.id} />
        </div>

        {topicos.length > 0 && (
          <DsFramePanel>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Progresso do edital</p>
                <p className="mt-1 font-heading text-3xl font-medium tabular-nums">{contagem.percentual}%</p>
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm">
                <LegendaProgresso cor="bg-primary" label="Estudado" valor={contagem.estudados} />
                <LegendaProgresso cor="bg-secondary" label="Estudando" valor={contagem.estudando} />
                <LegendaProgresso cor="bg-muted" label="Pendente" valor={contagem.pendentes} />
              </div>
            </div>
            <div className="mt-4 flex h-2.5 overflow-hidden rounded-full bg-muted">
              {contagem.estudados > 0 && (
                <div
                  className="bg-primary transition-[width] duration-300"
                  style={{ width: `${(contagem.estudados / topicos.length) * 100}%` }}
                />
              )}
              {contagem.estudando > 0 && (
                <div
                  className="bg-secondary transition-[width] duration-300"
                  style={{ width: `${(contagem.estudando / topicos.length) * 100}%` }}
                />
              )}
            </div>
          </DsFramePanel>
        )}

        <DsFrame>
          {topicos.length === 0 ? (
            <DsFramePanel className="py-12 text-center text-sm text-muted-foreground">
              Nenhum tópico cadastrado ainda. Adicione os tópicos do edital para começar a priorizar os estudos.
            </DsFramePanel>
          ) : (
            <DsFramePanel className="p-0">
              <DsTabs defaultValue="topicos" className="p-5">
                <DsTabsList>
                  <DsTabsTrigger value="topicos">Tópicos</DsTabsTrigger>
                  <DsTabsTrigger value="calendario">Calendário</DsTabsTrigger>
                </DsTabsList>
                <DsTabsContent value="topicos" className="-mx-5">
                  <TopicosTable topicos={topicos} concursoId={concurso.id} />
                </DsTabsContent>
                <DsTabsContent value="calendario">
                  <CalendarioTopicos topicos={topicos} />
                </DsTabsContent>
              </DsTabs>
            </DsFramePanel>
          )}
        </DsFrame>
      </div>
    </div>
  )
}

function LegendaProgresso({ cor, label, valor }: { cor: string; label: string; valor: number }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`size-2 shrink-0 rounded-full ${cor}`} aria-hidden="true" />
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium tabular-nums">{valor}</span>
    </span>
  )
}
