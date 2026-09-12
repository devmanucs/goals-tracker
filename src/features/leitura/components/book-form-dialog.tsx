"use client"

import { useActionState, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { PlusSignIcon } from "@hugeicons/core-free-icons"

import { DsAlert, DsAlertDescription } from "@/components/ds/alert"
import { DsButton } from "@/components/ds/button"
import {
  DsSheet,
  DsSheetContent,
  DsSheetDescription,
  DsSheetFooter,
  DsSheetHeader,
  DsSheetPanel,
  DsSheetTitle,
  DsSheetTrigger,
} from "@/components/ds/sheet"
import { DsField, DsFieldDescription, DsFieldGroup, DsFieldLabel } from "@/components/ds/field"
import { DsInput } from "@/components/ds/input"
import {
  DsSelect,
  DsSelectContent,
  DsSelectItem,
  DsSelectTrigger,
  DsSelectValue,
} from "@/components/ds/select"
import { criarLivro, type EstadoDaAcao } from "@/features/leitura/actions"
import {
  BuscaNoCatalogo,
  type LivroEscolhido,
} from "@/features/leitura/components/busca-no-catalogo"
import { STATUS_LIVRO_LABEL, type StatusLivro } from "@/features/leitura/types"

const ESTADO_INICIAL: EstadoDaAcao = {}

export function BookFormDialog() {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<StatusLivro>("quero_ler")
  // Quando vem do catálogo, os campos abaixo nascem preenchidos — e seguem
  // editáveis, porque a mediana de páginas do catálogo erra com frequência.
  const [doCatalogo, setDoCatalogo] = useState<LivroEscolhido | null>(null)
  // A action revalida a rota; aqui só fechamos a gaveta quando ela dá certo.
  const [estado, acao, salvando] = useActionState(
    async (anterior: EstadoDaAcao, formData: FormData) => {
      const resultado = await criarLivro(anterior, formData)
      if (resultado.ok) {
        setOpen(false)
        setDoCatalogo(null)
      }
      return resultado
    },
    ESTADO_INICIAL,
  )

  return (
    <DsSheet open={open} onOpenChange={setOpen}>
      <DsSheetTrigger render={<DsButton />}>
        <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} data-icon="inline-start" />
        Novo livro
      </DsSheetTrigger>
      <DsSheetContent side="right">
        {/*
          key remonta o form a cada abertura (limpando o que sobrou da anterior)
          e a cada escolha no catálogo, para os campos abaixo assumirem os novos
          defaultValue.
        */}
        <form
          key={`${String(open)}-${doCatalogo?.chave ?? "manual"}`}
          action={acao}
          className="flex h-full flex-col"
        >
          <DsSheetHeader>
            <DsSheetTitle>Cadastrar livro</DsSheetTitle>
            <DsSheetDescription>Adicione um livro para acompanhar seu progresso de leitura.</DsSheetDescription>
          </DsSheetHeader>
          <DsSheetPanel className="flex-1">
            <DsFieldGroup>
              {estado.mensagem && (
                <DsAlert variant="destructive">
                  <DsAlertDescription>{estado.mensagem}</DsAlertDescription>
                </DsAlert>
              )}

              <BuscaNoCatalogo
                escolhido={doCatalogo}
                aoEscolher={setDoCatalogo}
                aoLimpar={() => setDoCatalogo(null)}
              />

              {/* O que veio do catálogo e não tem campo visível viaja escondido */}
              <input type="hidden" name="capaUrl" value={doCatalogo?.capaUrl ?? ""} />
              <input type="hidden" name="sinopse" value={doCatalogo?.sinopse ?? ""} />
              <input type="hidden" name="isbn" value={doCatalogo?.isbn ?? ""} />
              <input
                type="hidden"
                name="anoPublicacao"
                value={doCatalogo?.anoPublicacao ?? ""}
              />

              <DsField>
                <DsFieldLabel htmlFor="titulo">Título</DsFieldLabel>
                <DsInput
                  id="titulo"
                  name="titulo"
                  defaultValue={doCatalogo?.titulo ?? ""}
                  aria-invalid={Boolean(estado.erros?.titulo)}
                  required
                />
                {estado.erros?.titulo && (
                  <DsFieldDescription className="text-destructive">{estado.erros.titulo}</DsFieldDescription>
                )}
              </DsField>
              <DsField>
                <DsFieldLabel htmlFor="autor">Autor</DsFieldLabel>
                <DsInput
                  id="autor"
                  name="autor"
                  defaultValue={doCatalogo?.autor ?? ""}
                  aria-invalid={Boolean(estado.erros?.autor)}
                  required
                />
                {estado.erros?.autor && (
                  <DsFieldDescription className="text-destructive">{estado.erros.autor}</DsFieldDescription>
                )}
              </DsField>
              <DsField orientation="responsive">
                <DsField>
                  <DsFieldLabel htmlFor="totalPaginas">Total de páginas</DsFieldLabel>
                  <DsInput
                    id="totalPaginas"
                    name="totalPaginas"
                    type="number"
                    min={1}
                    defaultValue={doCatalogo?.totalPaginas ?? ""}
                    aria-invalid={Boolean(estado.erros?.totalPaginas)}
                    required
                  />
                  {estado.erros?.totalPaginas && (
                    <DsFieldDescription className="text-destructive">
                      {estado.erros.totalPaginas}
                    </DsFieldDescription>
                  )}
                </DsField>
                <DsField>
                  <DsFieldLabel htmlFor="status">Status</DsFieldLabel>
                  {/* O Select não é um input nativo, então o valor vai num hidden */}
                  <input type="hidden" name="status" value={status} />
                  <DsSelect value={status} onValueChange={(value) => setStatus(value as StatusLivro)}>
                    <DsSelectTrigger id="status" className="w-full">
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
                </DsField>
              </DsField>
            </DsFieldGroup>
          </DsSheetPanel>
          <DsSheetFooter>
            <DsButton type="submit" loading={salvando}>
              Salvar
            </DsButton>
          </DsSheetFooter>
        </form>
      </DsSheetContent>
    </DsSheet>
  )
}
