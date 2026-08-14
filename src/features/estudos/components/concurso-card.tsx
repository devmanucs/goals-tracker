import Link from "next/link"

import { DsBadge } from "@/components/ds/badge"
import { DsFrameFooter, DsFrameHeader, DsFramePanel, DsFrameTitle } from "@/components/ds/frame"
import { DsProgress, DsProgressIndicator, DsProgressTrack } from "@/components/ds/progress"
import type { Concurso } from "@/features/estudos/data"
import { diasAteProva, progressoConcurso } from "@/features/estudos/data"
import { formatarDataCompleta } from "@/lib/dates"

const STATUS_LABEL: Record<Concurso["status"], string> = {
  planejando: "Planejando",
  estudando: "Estudando",
  encerrado: "Encerrado",
}

export function ConcursoCard({ concurso }: { concurso: Concurso }) {
  const percentual = progressoConcurso(concurso.id)
  const dias = diasAteProva(concurso.id)

  return (
    <Link href={`/estudos/${concurso.id}`} className="group block h-full">
      <DsFramePanel className="flex h-full flex-col gap-0 p-0 transition-shadow duration-200 group-hover:shadow-md">
        <DsFrameHeader className="flex-row items-start justify-between gap-2">
          <DsFrameTitle className="text-balance">{concurso.titulo}</DsFrameTitle>
          <DsBadge variant="outline" className="shrink-0 text-muted-foreground">
            {STATUS_LABEL[concurso.status]}
          </DsBadge>
        </DsFrameHeader>
        <div className="flex flex-1 flex-col gap-1.5 px-5 pb-4 text-sm text-muted-foreground">
          <p>Banca: {concurso.banca}</p>
          <p>
            Prova em {formatarDataCompleta(concurso.dataProva)}
            {dias !== null && dias >= 0 && <span className="text-foreground"> · faltam {dias} dias</span>}
          </p>
        </div>
        <DsFrameFooter className="border-t">
          <DsProgress value={percentual}>
            <span className="text-xs text-muted-foreground">Tópicos estudados</span>
            <span className="ml-auto text-xs font-medium tabular-nums">{percentual}%</span>
            <DsProgressTrack>
              <DsProgressIndicator />
            </DsProgressTrack>
          </DsProgress>
        </DsFrameFooter>
      </DsFramePanel>
    </Link>
  )
}
