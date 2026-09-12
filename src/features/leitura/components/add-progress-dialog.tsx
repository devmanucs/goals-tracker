"use client"

import { useActionState, useEffect, useState } from "react"
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
import { DsTextarea } from "@/components/ds/textarea"
import { registrarProgresso, type EstadoDaAcao } from "@/features/leitura/actions"

const ESTADO_INICIAL: EstadoDaAcao = {}

export function AddProgressDialog({
  livroId,
  totalPaginas,
  paginaAtual,
}: {
  livroId: string
  totalPaginas: number
  paginaAtual: number
}) {
  const [open, setOpen] = useState(false)
  const [estado, acao, salvando] = useActionState(
    registrarProgresso.bind(null, livroId),
    ESTADO_INICIAL,
  )

  useEffect(() => {
    if (estado.ok) setOpen(false)
  }, [estado])

  // Data de hoje do próprio navegador: aqui ela é só o valor inicial do campo,
  // quem calcula período de verdade é o backend.
  const hoje = new Date().toISOString().slice(0, 10)

  return (
    <DsSheet open={open} onOpenChange={setOpen}>
      <DsSheetTrigger render={<DsButton size="sm" />}>
        <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} data-icon="inline-start" />
        Registrar progresso
      </DsSheetTrigger>
      <DsSheetContent side="bottom" className="mx-auto max-w-lg">
        <form key={String(open)} action={acao} className="flex h-full flex-col">
          <DsSheetHeader>
            <DsSheetTitle>Registrar progresso</DsSheetTitle>
            <DsSheetDescription>Até qual página você chegou?</DsSheetDescription>
          </DsSheetHeader>
          <DsSheetPanel className="flex-1">
            <DsFieldGroup>
              {estado.mensagem && (
                <DsAlert variant="destructive">
                  <DsAlertDescription>{estado.mensagem}</DsAlertDescription>
                </DsAlert>
              )}
              <DsField orientation="responsive">
                <DsField>
                  <DsFieldLabel htmlFor="data">Data</DsFieldLabel>
                  <DsInput
                    id="data"
                    name="data"
                    type="date"
                    defaultValue={hoje}
                    aria-invalid={Boolean(estado.erros?.data)}
                    required
                  />
                  {estado.erros?.data && (
                    <DsFieldDescription className="text-destructive">{estado.erros.data}</DsFieldDescription>
                  )}
                </DsField>
                <DsField>
                  <DsFieldLabel htmlFor="paginaAtual">Página atual</DsFieldLabel>
                  <DsInput
                    id="paginaAtual"
                    name="paginaAtual"
                    type="number"
                    min={0}
                    max={totalPaginas}
                    defaultValue={paginaAtual}
                    aria-invalid={Boolean(estado.erros?.paginaAtual)}
                    required
                  />
                  {estado.erros?.paginaAtual && (
                    <DsFieldDescription className="text-destructive">
                      {estado.erros.paginaAtual}
                    </DsFieldDescription>
                  )}
                </DsField>
              </DsField>
              <DsField>
                <DsFieldLabel htmlFor="observacao">Observação (opcional)</DsFieldLabel>
                <DsTextarea
                  id="observacao"
                  name="observacao"
                  placeholder="Alguma impressão sobre a leitura de hoje..."
                />
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
