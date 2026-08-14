"use client"

import { useMemo, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Calendar03Icon } from "@hugeicons/core-free-icons"

import { AppHeader } from "@/components/app-header"
import { DsFrame, DsFramePanel } from "@/components/ds/frame"
import { DsProgress, DsProgressIndicator, DsProgressTrack } from "@/components/ds/progress"
import { DsTabs, DsTabsContent, DsTabsList, DsTabsTrigger } from "@/components/ds/tabs"
import { CalendarioTopicos } from "@/features/estudos/components/calendario-topicos"
import { TopicoFormDialog } from "@/features/estudos/components/topico-form-dialog"
import { TopicosTable } from "@/features/estudos/components/topicos-table"
import type { Concurso, StatusTopico, TopicoEstudo } from "@/features/estudos/data"
import { diasAteProva } from "@/features/estudos/data"
import { formatarDataCompleta } from "@/lib/dates"

export function ConcursoDetail({
  concurso,
  topicosIniciais,
}: {
  concurso: Concurso
  topicosIniciais: TopicoEstudo[]
}) {
  const [topicos, setTopicos] = useState<TopicoEstudo[]>(topicosIniciais)

  const percentual = useMemo(() => {
    if (topicos.length === 0) return 0
    const estudados = topicos.filter((t) => t.status === "estudado" || t.status === "revisao").length
    return Math.round((estudados / topicos.length) * 100)
  }, [topicos])

  const dias = diasAteProva(concurso.id)

  function handleStatusChange(topicoId: string, status: StatusTopico) {
    setTopicos((prev) => prev.map((t) => (t.id === topicoId ? { ...t, status } : t)))
  }

  return (
    <div className="flex min-h-svh flex-col">
      <AppHeader items={[{ label: "Estudos", href: "/estudos" }, { label: concurso.titulo }]} />

      <div className="flex flex-1 flex-col gap-6 p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-heading text-xl font-medium text-balance">{concurso.titulo}</h1>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <HugeiconsIcon icon={Calendar03Icon} strokeWidth={2} className="size-4" />
              {concurso.banca} · prova em {formatarDataCompleta(concurso.dataProva)}
              {dias !== null && dias >= 0 && <span> · faltam {dias} dias</span>}
            </p>
          </div>
          <TopicoFormDialog concursoId={concurso.id} onAdd={(t) => setTopicos((prev) => [t, ...prev])} />
        </div>
        <DsFrame>
          <DsFramePanel className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between">
              <p className="text-sm font-medium">Progresso do edital</p>
              <p className="text-sm text-muted-foreground">
                {topicos.filter((t) => t.status === "estudado" || t.status === "revisao").length} de {topicos.length} tópicos
              </p>
            </div>
            <DsProgress value={percentual}>
              <span className="ml-auto text-sm font-medium tabular-nums">{percentual}%</span>
              <DsProgressTrack>
                <DsProgressIndicator />
              </DsProgressTrack>
            </DsProgress>
          </DsFramePanel>

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
                  <TopicosTable topicos={topicos} onStatusChange={handleStatusChange} />
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
