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
import { STATUS_LIVRO_LABEL, type StatusLivro } from "@/features/leitura/types"

const ESTADO_INICIAL: EstadoDaAcao = {}

export function BookFormDialog() {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<StatusLivro>("quero_ler")
  // A action revalida a rota; aqui só fechamos a gaveta quando ela dá certo.
  const [estado, acao, salvando] = useActionState(
    async (anterior: EstadoDaAcao, formData: FormData) => {
      const resultado = await criarLivro(anterior, formData)
      if (resultado.ok) setOpen(false)
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
        {/* key remonta o form a cada abertura, limpando o que sobrou da anterior */}
        <form key={String(open)} action={acao} className="flex h-full flex-col">
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
              <DsField>
                <DsFieldLabel htmlFor="titulo">Título</DsFieldLabel>
                <DsInput id="titulo" name="titulo" aria-invalid={Boolean(estado.erros?.titulo)} required />
                {estado.erros?.titulo && (
                  <DsFieldDescription className="text-destructive">{estado.erros.titulo}</DsFieldDescription>
                )}
              </DsField>
              <DsField>
                <DsFieldLabel htmlFor="autor">Autor</DsFieldLabel>
                <DsInput id="autor" name="autor" aria-invalid={Boolean(estado.erros?.autor)} required />
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
