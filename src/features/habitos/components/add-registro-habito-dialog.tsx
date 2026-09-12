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
import { registrarValor, type EstadoDaAcao } from "@/features/habitos/actions"

const ESTADO_INICIAL: EstadoDaAcao = {}

export function AddRegistroHabitoDialog({
  habitoId,
  unidade,
}: {
  habitoId: string
  unidade: string
}) {
  const [open, setOpen] = useState(false)
  const [estado, acao, salvando] = useActionState(
    async (anterior: EstadoDaAcao, formData: FormData) => {
      const resultado = await registrarValor(habitoId, anterior, formData)
      if (resultado.ok) setOpen(false)
      return resultado
    },
    ESTADO_INICIAL,
  )

  const hoje = new Date().toISOString().slice(0, 10)

  return (
    <DsSheet open={open} onOpenChange={setOpen}>
      <DsSheetTrigger render={<DsButton size="sm" />}>
        <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} data-icon="inline-start" />
        Registrar valor
      </DsSheetTrigger>
      <DsSheetContent side="bottom" className="mx-auto max-w-lg">
        <form key={String(open)} action={acao} className="flex h-full flex-col">
          <DsSheetHeader>
            <DsSheetTitle>Registrar valor</DsSheetTitle>
            <DsSheetDescription>Quanto você fez hoje, em {unidade}?</DsSheetDescription>
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
                  <DsFieldLabel htmlFor="valor">Valor ({unidade})</DsFieldLabel>
                  <DsInput
                    id="valor"
                    name="valor"
                    type="number"
                    min={0.1}
                    step="any"
                    aria-invalid={Boolean(estado.erros?.valor)}
                    required
                  />
                  {estado.erros?.valor && (
                    <DsFieldDescription className="text-destructive">{estado.erros.valor}</DsFieldDescription>
                  )}
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
