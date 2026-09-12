import Link from "next/link"

import { DsBadge } from "@/components/ds/badge"
import { DsFrame, DsFrameFooter, DsFrameHeader, DsFramePanel, DsFrameTitle } from "@/components/ds/frame"
import { DsProgress, DsProgressIndicator, DsProgressTrack } from "@/components/ds/progress"
import { STATUS_CONCURSO_LABEL, type Concurso } from "@/features/estudos/types"
import { formatarDataCompleta } from "@/lib/dates"

// progresso e diasAteProva vêm prontos da API junto do concurso.
export function ConcursoCard({ concurso }: { concurso: Concurso }) {
  const percentual = concurso.progresso.percentual
  const dias = concurso.diasAteProva

  return (
    <Link href={`/estudos/${concurso.id}`} className="group block h-full">
      <DsFrame className="h-full transition-shadow duration-200 group-hover:shadow-md">
        <DsFrameHeader className="flex-row items-start justify-between gap-2">
          <DsFrameTitle className="text-balance">{concurso.titulo}</DsFrameTitle>
          <DsBadge variant="outline" className="shrink-0 text-muted-foreground">
            {STATUS_CONCURSO_LABEL[concurso.status]}
          </DsBadge>
        </DsFrameHeader>
        <DsFramePanel className="flex flex-1 flex-col gap-1.5 text-sm text-muted-foreground">
          <p>Banca: {concurso.banca}</p>
          <p>
            Prova em {formatarDataCompleta(concurso.dataProva)}
            {dias >= 0 && <span className="text-foreground"> · faltam {dias} dias</span>}
          </p>
        </DsFramePanel>
        <DsFrameFooter>
          <DsProgress value={percentual}>
            <span className="text-xs text-muted-foreground">Tópicos estudados</span>
            <span className="ml-auto text-xs font-medium tabular-nums">{percentual}%</span>
            <DsProgressTrack>
              <DsProgressIndicator />
            </DsProgressTrack>
          </DsProgress>
        </DsFrameFooter>
      </DsFrame>
    </Link>
  )
}
