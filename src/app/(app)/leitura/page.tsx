"use client"

import { useMemo, useState } from "react"

import { AppHeader } from "@/components/app-header"
import { DsEmpty, DsEmptyContent, DsEmptyDescription, DsEmptyHeader, DsEmptyMedia, DsEmptyTitle } from "@/components/ds/empty"
import { DsFramePanel } from "@/components/ds/frame"
import { DsTabs, DsTabsList, DsTabsTrigger } from "@/components/ds/tabs"
import { Illustration } from "@/components/illustration"
import { StatStrip } from "@/components/stat-card"
import { BookCard } from "@/features/leitura/components/book-card"
import { BookFormDialog } from "@/features/leitura/components/book-form-dialog"
import type { Livro, StatusLivro } from "@/features/leitura/data"
import {
  estatisticasLeitura,
  livros as livrosIniciais,
  livrosLidosNoAno,
  META_ANUAL_LEITURA,
  paginaAtualDoLivro,
  STATUS_LIVRO_LABEL,
} from "@/features/leitura/data"
import { HOJE } from "@/lib/dates"

const FILTROS: Array<{ value: StatusLivro | "todos"; label: string }> = [
  { value: "todos", label: "Todos" },
  { value: "lendo", label: STATUS_LIVRO_LABEL.lendo },
  { value: "quero_ler", label: STATUS_LIVRO_LABEL.quero_ler },
  { value: "lido", label: STATUS_LIVRO_LABEL.lido },
  { value: "abandonado", label: STATUS_LIVRO_LABEL.abandonado },
]

export default function LeituraPage() {
  const [livros, setLivros] = useState<Livro[]>(livrosIniciais)
  const [filtro, setFiltro] = useState<StatusLivro | "todos">("todos")

  const stats = useMemo(() => estatisticasLeitura(), [])
  const lidosNoAno = useMemo(() => livrosLidosNoAno(), [])
  const metaPercentual = Math.min(100, Math.round((lidosNoAno / META_ANUAL_LEITURA) * 100))
  const ano = HOJE.slice(0, 4)
  const livrosFiltrados = useMemo(
    () => (filtro === "todos" ? livros : livros.filter((l) => l.status === filtro)),
    [livros, filtro]
  )

  return (
    <div className="flex min-h-svh flex-col">
      <AppHeader items={[{ label: "Leitura" }]} />
      <div className="flex flex-1 flex-col gap-6 p-6 md:p-8">
        <div className="flex items-center justify-between gap-4">
          <h1 className="font-heading text-xl font-medium">Leitura</h1>
          {livros.length > 0 && (
            <BookFormDialog onAdd={(livro) => setLivros((prev) => [livro, ...prev])} />
          )}
        </div>
        {livros.length === 0 ? (
          <EmptyLeitura onAdd={(livro) => setLivros((prev) => [livro, ...prev])} />
        ) : (
          <>
            <DsFramePanel className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Meta de leitura {ano}</p>
                <p className="mt-0.5">
                  <span className="font-heading text-lg font-medium tabular-nums">{lidosNoAno}</span>
                  <span className="text-sm text-muted-foreground"> de {META_ANUAL_LEITURA} livros</span>
                </p>
              </div>
              <div className="h-2 w-full max-w-52 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-[width] duration-300"
                  style={{ width: `${metaPercentual}%` }}
                />
              </div>
            </DsFramePanel>

            <StatStrip
              stats={[
                { label: "Lendo agora", value: stats.livrosLendo },
                { label: "Livros lidos", value: stats.livrosLidos },
                { label: "Páginas lidas", value: stats.paginasLidasTotal },
                { label: "Ritmo médio", value: stats.ritmoMedioDiario, decimals: 1, suffix: " pág./dia" },
              ]}
            />

            <DsTabs value={filtro} onValueChange={(v) => setFiltro(v as StatusLivro | "todos")}>
              <DsTabsList>
                {FILTROS.map((f) => (
                  <DsTabsTrigger key={f.value} value={f.value}>
                    {f.label}
                  </DsTabsTrigger>
                ))}
              </DsTabsList>
            </DsTabs>

            {livrosFiltrados.length === 0 ? (
              <p className="py-12 text-center text-sm text-muted-foreground">
                Nenhum livro com esse status ainda.
              </p>
            ) : (
              <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {livrosFiltrados.map((livro) => (
                  <BookCard key={livro.id} livro={livro} paginaAtual={paginaAtualDoLivro(livro.id)} />
                ))}
              </section>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function EmptyLeitura({ onAdd }: { onAdd: (livro: Livro) => void }) {
  return (
    <DsEmpty className="py-16">
      <DsEmptyHeader>
        <DsEmptyMedia variant="default">
          <Illustration name="reading" />
        </DsEmptyMedia>
        <DsEmptyTitle>Nenhum livro cadastrado</DsEmptyTitle>
        <DsEmptyDescription>Adicione o primeiro livro para começar a acompanhar sua leitura.</DsEmptyDescription>
      </DsEmptyHeader>
      <DsEmptyContent>
        <BookFormDialog onAdd={onAdd} />
      </DsEmptyContent>
    </DsEmpty>
  )
}
