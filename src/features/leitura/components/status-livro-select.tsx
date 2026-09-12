"use client"

import { useTransition } from "react"

import {
  DsSelect,
  DsSelectContent,
  DsSelectItem,
  DsSelectTrigger,
  DsSelectValue,
} from "@/components/ds/select"
import { atualizarStatusDoLivro } from "@/features/leitura/actions"
import { STATUS_LIVRO_LABEL, type StatusLivro } from "@/features/leitura/types"

/** Troca o status do livro direto na tela de detalhe, sem abrir formulário. */
export function StatusLivroSelect({
  livroId,
  status,
}: {
  livroId: string
  status: StatusLivro
}) {
  const [salvando, iniciar] = useTransition()

  return (
    <DsSelect
      value={status}
      disabled={salvando}
      onValueChange={(valor) =>
        iniciar(() => void atualizarStatusDoLivro(livroId, String(valor)))
      }
    >
      <DsSelectTrigger size="sm" className="w-40" aria-label="Status do livro">
        {/* Sem a função de render, o trigger mostraria o valor cru ("lendo") */}
        <DsSelectValue>{(valor) => STATUS_LIVRO_LABEL[valor as StatusLivro]}</DsSelectValue>
      </DsSelectTrigger>
      <DsSelectContent>
        {Object.entries(STATUS_LIVRO_LABEL).map(([value, label]) => (
          <DsSelectItem key={value} value={value}>
            {label}
          </DsSelectItem>
        ))}
      </DsSelectContent>
    </DsSelect>
  )
}
