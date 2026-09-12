"use client"

import { useRouter } from "next/navigation"

import { DsTabs, DsTabsList, DsTabsTrigger } from "@/components/ds/tabs"
import { STATUS_LIVRO_LABEL, type StatusLivro } from "@/features/leitura/types"

const FILTROS: Array<{ value: StatusLivro | "todos"; label: string }> = [
  { value: "todos", label: "Todos" },
  { value: "lendo", label: STATUS_LIVRO_LABEL.lendo },
  { value: "quero_ler", label: STATUS_LIVRO_LABEL.quero_ler },
  { value: "lido", label: STATUS_LIVRO_LABEL.lido },
  { value: "abandonado", label: STATUS_LIVRO_LABEL.abandonado },
]

/** O filtro é um parâmetro de URL, então quem refaz a busca é o servidor. */
export function FiltroStatus({ atual }: { atual: StatusLivro | "todos" }) {
  const router = useRouter()

  return (
    <DsTabs
      value={atual}
      onValueChange={(valor) =>
        router.push(valor === "todos" ? "/leitura" : `/leitura?status=${valor}`)
      }
    >
      <DsTabsList>
        {FILTROS.map((filtro) => (
          <DsTabsTrigger key={filtro.value} value={filtro.value}>
            {filtro.label}
          </DsTabsTrigger>
        ))}
      </DsTabsList>
    </DsTabs>
  )
}
