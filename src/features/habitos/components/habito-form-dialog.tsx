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
import { criarHabito, type EstadoDaAcao } from "@/features/habitos/actions"
import { FREQUENCIA_LABEL, type FrequenciaHabito } from "@/features/habitos/types"

const ESTADO_INICIAL: EstadoDaAcao = {}

export function HabitoFormDialog() {
  const [open, setOpen] = useState(false)
  const [frequencia, setFrequencia] = useState<FrequenciaHabito>("diaria")
  const [estado, acao, salvando] = useActionState(
    async (anterior: EstadoDaAcao, formData: FormData) => {
      const resultado = await criarHabito(anterior, formData)
      if (resultado.ok) setOpen(false)
      return resultado
    },
    ESTADO_INICIAL,
  )

  return (
    <DsSheet open={open} onOpenChange={setOpen}>
      <DsSheetTrigger render={<DsButton />}>
        <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} data-icon="inline-start" />
        Novo hábito
      </DsSheetTrigger>
      <DsSheetContent side="right">
        <form key={String(open)} action={acao} className="flex h-full flex-col">
          <DsSheetHeader>
            <DsSheetTitle>Cadastrar hábito</DsSheetTitle>
            <DsSheetDescription>Defina um hábito com contador numérico e meta por período.</DsSheetDescription>
          </DsSheetHeader>
          <DsSheetPanel className="flex-1">
            <DsFieldGroup>
              {estado.mensagem && (
                <DsAlert variant="destructive">
                  <DsAlertDescription>{estado.mensagem}</DsAlertDescription>
                </DsAlert>
              )}
              <DsField>
                <DsFieldLabel htmlFor="nome">Nome</DsFieldLabel>
                <DsInput
                  id="nome"
                  name="nome"
                  placeholder="Ex: Beber água"
                  aria-invalid={Boolean(estado.erros?.nome)}
                  required
                />
                {estado.erros?.nome && (
                  <DsFieldDescription className="text-destructive">{estado.erros.nome}</DsFieldDescription>
                )}
              </DsField>
              <DsField orientation="responsive">
                <DsField>
                  <DsFieldLabel htmlFor="unidade">Unidade</DsFieldLabel>
                  <DsInput
                    id="unidade"
                    name="unidade"
                    placeholder="L, km, vezes..."
                    aria-invalid={Boolean(estado.erros?.unidade)}
                    required
                  />
                  {estado.erros?.unidade && (
                    <DsFieldDescription className="text-destructive">{estado.erros.unidade}</DsFieldDescription>
                  )}
                </DsField>
                <DsField>
                  <DsFieldLabel htmlFor="metaValor">Meta por período</DsFieldLabel>
                  <DsInput
                    id="metaValor"
                    name="metaValor"
                    type="number"
                    min={0.1}
                    step="any"
                    aria-invalid={Boolean(estado.erros?.metaValor)}
                    required
                  />
                  {estado.erros?.metaValor && (
                    <DsFieldDescription className="text-destructive">
                      {estado.erros.metaValor}
                    </DsFieldDescription>
                  )}
                </DsField>
              </DsField>
              <DsField>
                <DsFieldLabel htmlFor="frequencia">Frequência</DsFieldLabel>
                <input type="hidden" name="frequencia" value={frequencia} />
                <DsSelect value={frequencia} onValueChange={(v) => setFrequencia(v as FrequenciaHabito)}>
                  <DsSelectTrigger id="frequencia" className="w-full">
                    <DsSelectValue>{(valor) => `Meta ${FREQUENCIA_LABEL[valor as FrequenciaHabito]}`}</DsSelectValue>
                  </DsSelectTrigger>
                  <DsSelectContent>
                    {Object.entries(FREQUENCIA_LABEL).map(([value, label]) => (
                      <DsSelectItem key={value} value={value}>
                        Meta {label}
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
