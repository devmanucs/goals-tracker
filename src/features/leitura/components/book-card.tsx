import Link from "next/link"

import { DsBadge } from "@/components/ds/badge"
import { DsFrame, DsFrameFooter, DsFrameHeader, DsFramePanel, DsFrameTitle } from "@/components/ds/frame"
import { DsProgress, DsProgressIndicator, DsProgressTrack } from "@/components/ds/progress"
import { CapaDoLivro } from "@/features/leitura/components/capa-do-livro"
import { corDaCapa, STATUS_LIVRO_LABEL, type Livro } from "@/features/leitura/types"

// paginaAtual e percentual vêm prontos da API junto do livro, então o card não
// precisa de nenhuma requisição extra.
export function BookCard({ livro }: { livro: Livro }) {
  const emProgresso = livro.status === "lendo" || livro.status === "lido"

  return (
    <Link href={`/leitura/${livro.id}`} className="group block h-full">
      <DsFrame className="h-full transition-shadow duration-200 group-hover:shadow-md">
        <DsFrameHeader className="pb-2">
          <DsFrameTitle className="line-clamp-2 text-balance">{livro.titulo}</DsFrameTitle>
        </DsFrameHeader>
        <DsFramePanel className="flex flex-1 gap-3">
          <CapaDoLivro
            url={livro.capaUrl}
            titulo={livro.titulo}
            corDeFundo={corDaCapa(livro)}
            className="h-20 w-14"
          />
          <div className="flex min-w-0 flex-col gap-1.5">
            <p className="truncate text-xs text-muted-foreground">{livro.autor}</p>
            <DsBadge variant="outline" className="w-fit text-muted-foreground">
              {STATUS_LIVRO_LABEL[livro.status]}
            </DsBadge>
          </div>
        </DsFramePanel>
        {emProgresso && (
          <DsFrameFooter>
            <DsProgress value={livro.percentual}>
              <span className="text-xs text-muted-foreground">
                {livro.paginaAtual}/{livro.totalPaginas} pág.
              </span>
              <span className="ml-auto text-xs font-medium tabular-nums">{livro.percentual}%</span>
              <DsProgressTrack>
                <DsProgressIndicator />
              </DsProgressTrack>
            </DsProgress>
          </DsFrameFooter>
        )}
      </DsFrame>
    </Link>
  )
}
