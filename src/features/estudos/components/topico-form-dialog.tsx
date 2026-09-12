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
import { criarTopico, type EstadoDaAcao } from "@/features/estudos/actions"

const ESTADO_INICIAL: EstadoDaAcao = {}

export function TopicoFormDialog({ concursoId }: { concursoId: string }) {
  const [open, setOpen] = useState(false)
  const [estado, acao, salvando] = useActionState(
    async (anterior: EstadoDaAcao, formData: FormData) => {
      const resultado = await criarTopico(concursoId, anterior, formData)
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
        Novo tópico
      </DsSheetTrigger>
      <DsSheetContent side="right">
        <form key={String(open)} action={acao} className="flex h-full flex-col">
          <DsSheetHeader>
            <DsSheetTitle>Cadastrar tópico</DsSheetTitle>
            <DsSheetDescription>Adicione um tópico do edital com seu peso/prioridade.</DsSheetDescription>
          </DsSheetHeader>
          <DsSheetPanel className="flex-1">
            <DsFieldGroup>
              {estado.mensagem && (
                <DsAlert variant="destructive">
                  <DsAlertDescription>{estado.mensagem}</DsAlertDescription>
                </DsAlert>
              )}
              <input type="hidden" name="status" value="pendente" />
              <DsField>
                <DsFieldLabel htmlFor="titulo">Título do tópico</DsFieldLabel>
                <DsInput id="titulo" name="titulo" aria-invalid={Boolean(estado.erros?.titulo)} required />
                {estado.erros?.titulo && (
                  <DsFieldDescription className="text-destructive">{estado.erros.titulo}</DsFieldDescription>
                )}
              </DsField>
              <DsField>
                <DsFieldLabel htmlFor="materia">Matéria / disciplina</DsFieldLabel>
                <DsInput id="materia" name="materia" aria-invalid={Boolean(estado.erros?.materia)} required />
                {estado.erros?.materia && (
                  <DsFieldDescription className="text-destructive">{estado.erros.materia}</DsFieldDescription>
                )}
              </DsField>
              <DsField orientation="responsive">
                <DsField>
                  <DsFieldLabel htmlFor="peso">Peso (1–10)</DsFieldLabel>
                  <DsInput
                    id="peso"
                    name="peso"
                    type="number"
                    min={1}
                    max={10}
                    defaultValue={5}
                    aria-invalid={Boolean(estado.erros?.peso)}
                    required
                  />
                  {estado.erros?.peso && (
                    <DsFieldDescription className="text-destructive">{estado.erros.peso}</DsFieldDescription>
                  )}
                </DsField>
                <DsField>
                  <DsFieldLabel htmlFor="dataAgendada">Data agendada</DsFieldLabel>
                  <DsInput
                    id="dataAgendada"
                    name="dataAgendada"
                    type="date"
                    defaultValue={hoje}
                    aria-invalid={Boolean(estado.erros?.dataAgendada)}
                    required
                  />
                  {estado.erros?.dataAgendada && (
                    <DsFieldDescription className="text-destructive">
                      {estado.erros.dataAgendada}
                    </DsFieldDescription>
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
