"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon, Search01Icon } from "@hugeicons/core-free-icons"

import { DsButton } from "@/components/ds/button"
import { DsField, DsFieldDescription, DsFieldLabel } from "@/components/ds/field"
import { DsInput } from "@/components/ds/input"
import { DsSpinner } from "@/components/ds/spinner"
import { CapaDoLivro } from "@/features/leitura/components/capa-do-livro"
import { useDebounce } from "@/hooks/use-debounce"
import {
  buscarNoCatalogo,
  detalharDoCatalogo,
  type LivroDoCatalogo,
} from "@/features/leitura/catalogo"

/** O que o formulário recebe quando um livro é escolhido. */
export interface LivroEscolhido extends LivroDoCatalogo {
  sinopse: string | null
}

/**
 * Busca um livro no catálogo externo e devolve os dados para o formulário
 * preencher. A sinopse só é buscada no livro escolhido: trazê-la para cada item
 * da lista custaria uma requisição por resultado.
 */
export function BuscaNoCatalogo({
  escolhido,
  aoEscolher,
  aoLimpar,
}: {
  escolhido: LivroEscolhido | null
  aoEscolher: (livro: LivroEscolhido) => void
  aoLimpar: () => void
}) {
  const [termo, setTermo] = useState("")
  const [carregandoDetalhe, setCarregandoDetalhe] = useState<string | null>(null)
  const [erroDetalhe, setErroDetalhe] = useState<string | null>(null)

  // Sem o atraso, cada tecla viraria uma consulta à API pública.
  const termoBuscado = useDebounce(termo.trim())

  const {
    data: resultados = [],
    isFetching,
    error,
  } = useQuery({
    // A chave inclui o termo: o React Query guarda cada busca separadamente e
    // não repete uma consulta que já fez.
    queryKey: ["catalogo", "buscar", termoBuscado],
    queryFn: () => buscarNoCatalogo(termoBuscado),
    enabled: termoBuscado.length >= 2,
  })

  async function escolher(livro: LivroDoCatalogo) {
    setCarregandoDetalhe(livro.chave)
    setErroDetalhe(null)

    try {
      const detalhe = await detalharDoCatalogo(livro.chave)
      aoEscolher({
        ...livro,
        // O detalhe tem sinopse e capa maior; o resto (autor, páginas, ano) só
        // existe no resultado da busca, então o da busca tem precedência.
        sinopse: detalhe.sinopse,
        capaUrl: livro.capaUrl ?? detalhe.capaUrl,
      })
    } catch {
      // A sinopse é um bônus: sem ela o cadastro segue com o que a busca trouxe.
      setErroDetalhe("Não foi possível carregar a sinopse; o resto foi preenchido.")
      aoEscolher({ ...livro, sinopse: null })
    } finally {
      setCarregandoDetalhe(null)
    }
  }

  if (escolhido) {
    return (
      <DsField>
        <DsFieldLabel>Livro do catálogo</DsFieldLabel>
        <div className="flex items-start gap-3 rounded-lg border p-3">
          <CapaDoLivro url={escolhido.capaUrl} titulo={escolhido.titulo} className="h-16 w-11" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{escolhido.titulo}</p>
            <p className="truncate text-xs text-muted-foreground">
              {escolhido.autor ?? "Autor desconhecido"}
              {escolhido.anoPublicacao ? ` · ${escolhido.anoPublicacao}` : ""}
            </p>
            {escolhido.sinopse && (
              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                {escolhido.sinopse}
              </p>
            )}
          </div>
          <DsButton
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Escolher outro livro"
            onClick={() => {
              aoLimpar()
              setTermo("")
              setErroDetalhe(null)
            }}
          >
            <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
          </DsButton>
        </div>
        {erroDetalhe && (
          <DsFieldDescription className="text-destructive">{erroDetalhe}</DsFieldDescription>
        )}
        <DsFieldDescription>
          Os campos abaixo já vieram preenchidos — dá para ajustar qualquer um.
        </DsFieldDescription>
      </DsField>
    )
  }

  return (
    <DsField>
      <DsFieldLabel htmlFor="busca-catalogo">Buscar no catálogo (opcional)</DsFieldLabel>
      <div className="relative">
        <HugeiconsIcon
          icon={Search01Icon}
          strokeWidth={2}
          className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <DsInput
          id="busca-catalogo"
          className="pl-8"
          placeholder="Digite o nome do livro..."
          value={termo}
          onChange={(e) => setTermo(e.target.value)}
          autoComplete="off"
        />
        {isFetching && (
          <DsSpinner className="absolute top-1/2 right-2.5 size-4 -translate-y-1/2" />
        )}
      </div>

      {error && (
        <DsFieldDescription className="text-destructive">
          {(error as Error).message}
        </DsFieldDescription>
      )}

      {termoBuscado.length >= 2 && !isFetching && resultados.length === 0 && !error && (
        <DsFieldDescription>
          Nenhum livro encontrado. Dá para preencher na mão abaixo.
        </DsFieldDescription>
      )}

      {resultados.length > 0 && (
        <ul className="max-h-64 divide-y overflow-y-auto rounded-lg border">
          {resultados.map((livro) => (
            <li key={livro.chave}>
              <button
                type="button"
                disabled={carregandoDetalhe !== null}
                onClick={() => void escolher(livro)}
                className="flex w-full items-center gap-3 p-2.5 text-left hover:bg-accent disabled:opacity-60"
              >
                <CapaDoLivro url={livro.capaUrl} titulo={livro.titulo} className="h-12 w-8" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{livro.titulo}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {livro.autor ?? "Autor desconhecido"}
                    {livro.anoPublicacao ? ` · ${livro.anoPublicacao}` : ""}
                    {livro.totalPaginas ? ` · ${livro.totalPaginas} pág.` : ""}
                  </span>
                </span>
                {carregandoDetalhe === livro.chave && <DsSpinner className="size-4" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </DsField>
  )
}

