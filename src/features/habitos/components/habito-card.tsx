import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { Fire03Icon } from "@hugeicons/core-free-icons"

import { DsFrame, DsFrameFooter, DsFrameHeader, DsFramePanel, DsFrameTitle } from "@/components/ds/frame"
import { DsProgress, DsProgressIndicator, DsProgressTrack } from "@/components/ds/progress"
import { StreakHeatmap } from "@/features/habitos/components/streak-heatmap"
import type { Habito } from "@/features/habitos/data"
import {
  FREQUENCIA_LABEL,
  getRegistrosDoHabito,
  progressoPeriodoAtual,
  streakDoHabito,
} from "@/features/habitos/data"

export function HabitoCard({ habito }: { habito: Habito }) {
  const progresso = progressoPeriodoAtual(habito.id)
  const streak = streakDoHabito(habito.id)
  const registros = getRegistrosDoHabito(habito.id)

  return (
    <Link href={`/habitos/${habito.id}`} className="group block h-full">
      <DsFramePanel className="flex h-full flex-col gap-0 p-0 transition-shadow duration-200 group-hover:shadow-md">
        <DsFrameHeader className="flex-row items-start justify-between gap-2">
          <DsFrameTitle>{habito.nome}</DsFrameTitle>
          <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
            <HugeiconsIcon icon={Fire03Icon} strokeWidth={2} className="size-3.5" />
            {streak}
          </span>
        </DsFrameHeader>
        <div className="flex flex-1 flex-col gap-3 px-5 pb-4">
          <p className="text-sm text-muted-foreground">
            {habito.metaValor} {habito.unidade} {FREQUENCIA_LABEL[habito.frequencia]}
          </p>
          <StreakHeatmap habito={habito} registros={registros} semanas={1} />
        </div>
        <DsFrameFooter className="border-t">
          <DsProgress value={progresso.percentual}>
            <span className="text-xs text-muted-foreground">
              {progresso.atual} de {progresso.meta} {habito.unidade}
            </span>
            <span className="ml-auto text-xs font-medium tabular-nums">{progresso.percentual}%</span>
            <DsProgressTrack>
              <DsProgressIndicator />
            </DsProgressTrack>
          </DsProgress>
        </DsFrameFooter>
      </DsFramePanel>
    </Link>
  )
}
