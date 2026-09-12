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
import { criarConcurso, type EstadoDaAcao } from "@/features/estudos/actions"
import { STATUS_CONCURSO_LABEL, type StatusConcurso } from "@/features/estudos/types"

const ESTADO_INICIAL: EstadoDaAcao = {}

export function ConcursoFormDialog() {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<StatusConcurso>("planejando")
  const [estado, acao, salvando] = useActionState(
    async (anterior: EstadoDaAcao, formData: FormData) => {
      const resultado = await criarConcurso(anterior, formData)
      if (resultado.ok) setOpen(false)
      return resultado
    },
    ESTADO_INICIAL,
  )

  const hoje = new Date().toISOString().slice(0, 10)

  return (
    <DsSheet open={open} onOpenChange={setOpen}>
      <DsSheetTrigger render={<DsButton />}>
        <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} data-icon="inline-start" />
        Novo concurso
      </DsSheetTrigger>
      <DsSheetContent side="right">
        <form key={String(open)} action={acao} className="flex h-full flex-col">
          <DsSheetHeader>
            <DsSheetTitle>Cadastrar concurso</DsSheetTitle>
            <DsSheetDescription>Cadastre o concurso ou cargo que você está estudando.</DsSheetDescription>
          </DsSheetHeader>
          <DsSheetPanel className="flex-1">
            <DsFieldGroup>
              {estado.mensagem && (
                <DsAlert variant="destructive">
                  <DsAlertDescription>{estado.mensagem}</DsAlertDescription>
                </DsAlert>
              )}
              <DsField>
                <DsFieldLabel htmlFor="titulo">Nome do concurso / cargo</DsFieldLabel>
                <DsInput id="titulo" name="titulo" aria-invalid={Boolean(estado.erros?.titulo)} required />
                {estado.erros?.titulo && (
                  <DsFieldDescription className="text-destructive">{estado.erros.titulo}</DsFieldDescription>
                )}
              </DsField>
              <DsField orientation="responsive">
                <DsField>
                  <DsFieldLabel htmlFor="banca">Banca</DsFieldLabel>
                  <DsInput id="banca" name="banca" aria-invalid={Boolean(estado.erros?.banca)} required />
                  {estado.erros?.banca && (
                    <DsFieldDescription className="text-destructive">{estado.erros.banca}</DsFieldDescription>
                  )}
                </DsField>
                <DsField>
                  <DsFieldLabel htmlFor="dataProva">Data da prova</DsFieldLabel>
                  <DsInput
                    id="dataProva"
                    name="dataProva"
                    type="date"
                    defaultValue={hoje}
                    aria-invalid={Boolean(estado.erros?.dataProva)}
                    required
                  />
                  {estado.erros?.dataProva && (
                    <DsFieldDescription className="text-destructive">
                      {estado.erros.dataProva}
                    </DsFieldDescription>
                  )}
                </DsField>
              </DsField>
              <DsField>
                <DsFieldLabel htmlFor="status">Status</DsFieldLabel>
                <input type="hidden" name="status" value={status} />
                <DsSelect value={status} onValueChange={(v) => setStatus(v as StatusConcurso)}>
                  <DsSelectTrigger id="status" className="w-full">
                    <DsSelectValue>{(valor) => STATUS_CONCURSO_LABEL[valor as StatusConcurso]}</DsSelectValue>
                  </DsSelectTrigger>
                  <DsSelectContent>
                    {Object.entries(STATUS_CONCURSO_LABEL).map(([value, label]) => (
                      <DsSelectItem key={value} value={value}>
                        {label}
                      </DsSelectItem>
                    ))}
                  </DsSelectContent>
                </DsSelect>
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
