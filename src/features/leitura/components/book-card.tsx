import Link from "next/link"

import { DsBadge } from "@/components/ds/badge"
import { DsFrameFooter, DsFrameHeader, DsFramePanel, DsFrameTitle } from "@/components/ds/frame"
import { DsProgress, DsProgressIndicator, DsProgressTrack } from "@/components/ds/progress"
import type { Livro } from "@/features/leitura/data"
import { STATUS_LIVRO_LABEL } from "@/features/leitura/data"

export function BookCard({ livro, paginaAtual }: { livro: Livro; paginaAtual: number }) {
  const percentual = Math.round((paginaAtual / livro.totalPaginas) * 100)
  const emProgresso = livro.status === "lendo" || livro.status === "lido"

  return (
    <Link href={`/leitura/${livro.id}`} className="group block h-full">
      <DsFramePanel className="flex h-full flex-col gap-0 p-0 transition-shadow duration-200 group-hover:shadow-md">
        <DsFrameHeader className="pb-2">
          <DsFrameTitle className="line-clamp-2 text-balance">{livro.titulo}</DsFrameTitle>
        </DsFrameHeader>
        <div className="flex flex-1 gap-3 px-5 pb-4">
          <div className="h-20 w-14 shrink-0 rounded-md" style={{ backgroundColor: livro.corCapa }} />
          <div className="flex min-w-0 flex-col gap-1.5">
            <p className="truncate text-xs text-muted-foreground">{livro.autor}</p>
            <DsBadge variant="outline" className="w-fit text-muted-foreground">
              {STATUS_LIVRO_LABEL[livro.status]}
            </DsBadge>
          </div>
        </div>
        {emProgresso && (
          <DsFrameFooter className="border-t">
            <DsProgress value={percentual}>
              <span className="text-xs text-muted-foreground">
                {paginaAtual}/{livro.totalPaginas} pág.
              </span>
              <span className="ml-auto text-xs font-medium tabular-nums">{percentual}%</span>
              <DsProgressTrack>
                <DsProgressIndicator />
              </DsProgressTrack>
            </DsProgress>
          </DsFrameFooter>
        )}
      </DsFramePanel>
    </Link>
  )
}
