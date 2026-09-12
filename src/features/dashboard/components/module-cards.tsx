import { ArrowRight02Icon, Fire03Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"
import type { ReactNode } from "react"

import { DsBadge } from "@/components/ds/badge"
import { DsFrame, DsFrameFooter, DsFrameHeader, DsFramePanel, DsFrameTitle } from "@/components/ds/frame"
import { DsProgress, DsProgressIndicator, DsProgressTrack } from "@/components/ds/progress"
import { PesoIndicator } from "@/features/estudos/components/peso-indicator"
import { corDaMateria, diasAteProva, getConcurso, proximoTopico, STATUS_TOPICO_LABEL } from "@/features/estudos/data"
import { getHabitos, progressoPeriodoAtual, streakDoHabito } from "@/features/habitos/data"
import {
  estatisticasLeitura,
  getRegistrosDoLivro,
  livroEmAndamento,
  livrosLidosNoAno,
  META_ANUAL_LEITURA,
} from "@/features/leitura/data"
import { formatarDataCompleta, HOJE } from "@/lib/dates"

function CardShell({
  href,
  title,
  footer,
  children,
}: {
  href: string
  title: string
  footer?: ReactNode
  children: ReactNode
}) {
  return (
    <Link href={href} className="group block h-full">
      <DsFrame className="h-full transition-shadow duration-200 group-hover:shadow-md">
        <DsFrameHeader className="flex-row items-center justify-between gap-2 pb-2">
          <DsFrameTitle>{title}</DsFrameTitle>
          <HugeiconsIcon
            icon={ArrowRight02Icon}
            strokeWidth={2}
            className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
          />
        </DsFrameHeader>
        <DsFramePanel className="flex-1">{children}</DsFramePanel>
        {footer && <DsFrameFooter>{footer}</DsFrameFooter>}
      </DsFrame>
    </Link>
  )
}

export function LeituraSummaryCard() {
  const livro = livroEmAndamento()
  const stats = estatisticasLeitura()

  if (!livro) {
    return (
      <CardShell href="/leitura" title="Leitura">
        <p className="text-sm text-muted-foreground">Nenhum livro em andamento no momento.</p>
      </CardShell>
    )
  }

  const paginaAtual = getRegistrosDoLivro(livro.id).at(-1)?.paginaAtual ?? 0
  const percentual = Math.round((paginaAtual / livro.totalPaginas) * 100)

  return (
    <CardShell
      href="/leitura"
      title="Leitura"
      footer={
        <DsProgress value={percentual}>
          <span className="text-xs text-muted-foreground">
            pág. {paginaAtual} de {livro.totalPaginas}
          </span>
          <span className="ml-auto text-xs font-medium tabular-nums">{percentual}%</span>
          <DsProgressTrack>
            <DsProgressIndicator />
          </DsProgressTrack>
        </DsProgress>
      }
    >
      <div className="flex items-start gap-3">
        <span
          className="mt-0.5 h-14 w-10 shrink-0 rounded-lg"
          style={{ backgroundColor: livro.corCapa }}
          aria-hidden
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{livro.titulo}</p>
          <p className="truncate text-xs text-muted-foreground">{livro.autor}</p>
        </div>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        {stats.livrosLidos} livros lidos · meta {HOJE.slice(0, 4)}: {livrosLidosNoAno()}/{META_ANUAL_LEITURA}
      </p>
    </CardShell>
  )
}

export function EstudosSummaryCard() {
  const topico = proximoTopico()

  if (!topico) {
    return (
      <CardShell href="/estudos" title="Estudos">
        <p className="text-sm text-muted-foreground">Nenhum tópico agendado.</p>
      </CardShell>
    )
  }

  const concurso = getConcurso(topico.concursoId)
  const dias = concurso ? diasAteProva(concurso.id) : null

  return (
    <CardShell href="/estudos" title="Estudos">
      <p className="text-xs text-muted-foreground">Próximo tópico</p>
      <p className="mt-0.5 text-sm font-medium">{topico.titulo}</p>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span
            className="size-1.5 shrink-0 rounded-full"
            style={{ backgroundColor: corDaMateria(topico.materia) }}
            aria-hidden="true"
          />
          {topico.materia}
        </span>
        <PesoIndicator peso={topico.peso} />
        <DsBadge variant="outline" className="text-muted-foreground">
          {STATUS_TOPICO_LABEL[topico.status]}
        </DsBadge>
      </div>
      {concurso && dias !== null && (
        <p className="mt-3 text-xs text-muted-foreground">
          {concurso.titulo} · prova em {dias} dias ({formatarDataCompleta(concurso.dataProva)})
        </p>
      )}
    </CardShell>
  )
}

export function HabitosSummaryCard() {
  const habitos = getHabitos()

  return (
    <CardShell href="/habitos" title="Hábitos">
      <div className="flex flex-col gap-3">
        {habitos.map((habito) => {
          const progresso = progressoPeriodoAtual(habito.id)
          const streak = streakDoHabito(habito.id)
          return (
            <div key={habito.id} className="flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-medium">{habito.nome}</span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <HugeiconsIcon icon={Fire03Icon} strokeWidth={2} className="size-3.5" />
                    {streak}
                  </span>
                </div>
                <DsProgress value={progresso.percentual} className="mt-1.5">
                  <span className="sr-only">
                    {progresso.atual} de {progresso.meta} {habito.unidade}
                  </span>
                  <DsProgressTrack>
                    <DsProgressIndicator />
                  </DsProgressTrack>
                </DsProgress>
              </div>
            </div>
          )
        })}
      </div>
    </CardShell>
  )
}
