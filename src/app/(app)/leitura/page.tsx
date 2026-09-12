import { DefinirBreadcrumb } from "@/components/breadcrumb-context"
import { DsEmpty, DsEmptyContent, DsEmptyDescription, DsEmptyHeader, DsEmptyMedia, DsEmptyTitle } from "@/components/ds/empty"
import { DsFramePanel } from "@/components/ds/frame"
import { Illustration } from "@/components/illustration"
import { StatStrip } from "@/components/stat-card"
import { estatisticasLeitura, listarLivros } from "@/features/leitura/api"
import { BookCard } from "@/features/leitura/components/book-card"
import { BookFormDialog } from "@/features/leitura/components/book-form-dialog"
import { FiltroStatus } from "@/features/leitura/components/filtro-status"
import { META_ANUAL_LEITURA, type StatusLivro } from "@/features/leitura/types"

/**
 * Server Component: busca na API e passa por props. O filtro vive na URL
 * (?status=lendo) em vez de estado local — assim a lista filtrada é
 * compartilhável e o próprio backend faz o filtro.
 */
export default async function LeituraPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const { status } = await searchParams
  const filtro = (status ?? "todos") as StatusLivro | "todos"

  const [livros, stats] = await Promise.all([
    listarLivros(filtro === "todos" ? undefined : filtro),
    estatisticasLeitura(),
  ])

  // A conta está vazia quando não há livro nenhum — e não quando o filtro
  // simplesmente não encontrou nada.
  const contaVazia = filtro === "todos" && livros.length === 0
  const metaPercentual = Math.min(
    100,
    Math.round((stats.livrosLidos / META_ANUAL_LEITURA) * 100),
  )
  const ano = new Date().getFullYear()

  return (
    <div className="flex flex-1 flex-col">
      <DefinirBreadcrumb items={[{ label: "Leitura" }]} />
      <div className="flex flex-1 flex-col gap-6 p-6 md:p-8">
        <div className="flex items-center justify-between gap-4">
          <h1 className="font-heading text-xl font-medium">Leitura</h1>
          {!contaVazia && <BookFormDialog />}
        </div>

        {contaVazia ? (
          <DsEmpty className="py-16">
            <DsEmptyHeader>
              <DsEmptyMedia variant="default">
                <Illustration name="reading" />
              </DsEmptyMedia>
              <DsEmptyTitle>Nenhum livro cadastrado</DsEmptyTitle>
              <DsEmptyDescription>
                Adicione o primeiro livro para começar a acompanhar sua leitura.
              </DsEmptyDescription>
            </DsEmptyHeader>
            <DsEmptyContent>
              <BookFormDialog />
            </DsEmptyContent>
          </DsEmpty>
        ) : (
          <>
            <DsFramePanel className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Meta de leitura {ano}</p>
                <p className="mt-0.5">
                  <span className="font-heading text-lg font-medium tabular-nums">
                    {stats.livrosLidos}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {" "}
                    de {META_ANUAL_LEITURA} livros
                  </span>
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
                {
                  label: "Ritmo médio",
                  value: stats.ritmoMedioDiario,
                  decimals: 1,
                  suffix: " pág./dia",
                },
              ]}
            />

            <FiltroStatus atual={filtro} />

            {livros.length === 0 ? (
              <p className="py-12 text-center text-sm text-muted-foreground">
                Nenhum livro com esse status ainda.
              </p>
            ) : (
              <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {livros.map((livro) => (
                  <BookCard key={livro.id} livro={livro} />
                ))}
              </section>
            )}
          </>
        )}
      </div>
    </div>
  )
}
