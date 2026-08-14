"use client"

import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { PlusSignIcon } from "@hugeicons/core-free-icons"

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
import { DsField, DsFieldGroup, DsFieldLabel } from "@/components/ds/field"
import { DsInput } from "@/components/ds/input"
import { HOJE } from "@/lib/dates"
import type { TopicoEstudo } from "@/features/estudos/data"

export function TopicoFormDialog({
  concursoId,
  onAdd,
}: {
  concursoId: string
  onAdd: (topico: TopicoEstudo) => void
}) {
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [titulo, setTitulo] = useState("")
  const [materia, setMateria] = useState("")
  const [peso, setPeso] = useState("5")
  const [dataAgendada, setDataAgendada] = useState(HOJE)

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!titulo.trim() || !materia.trim() || !dataAgendada) return

    setSaving(true)
    setTimeout(() => {
      onAdd({
        id: crypto.randomUUID(),
        concursoId,
        titulo: titulo.trim(),
        materia: materia.trim(),
        peso: Math.min(10, Math.max(1, Number(peso) || 1)),
        dataAgendada,
        status: "pendente",
      })
      setTitulo("")
      setMateria("")
      setPeso("5")
      setSaving(false)
      setOpen(false)
    }, 400)
  }

  return (
    <DsSheet open={open} onOpenChange={setOpen}>
      <DsSheetTrigger render={<DsButton size="sm" />}>
        <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} data-icon="inline-start" />
        Novo tópico
      </DsSheetTrigger>
      <DsSheetContent side="right">
        <form onSubmit={handleSubmit} className="flex h-full flex-col">
          <DsSheetHeader>
            <DsSheetTitle>Cadastrar tópico</DsSheetTitle>
            <DsSheetDescription>Adicione um tópico do edital com seu peso/prioridade.</DsSheetDescription>
          </DsSheetHeader>
          <DsSheetPanel className="flex-1">
            <DsFieldGroup>
              <DsField>
                <DsFieldLabel htmlFor="titulo-topico">Título do tópico</DsFieldLabel>
                <DsInput id="titulo-topico" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
              </DsField>
              <DsField>
                <DsFieldLabel htmlFor="materia">Matéria / disciplina</DsFieldLabel>
                <DsInput id="materia" value={materia} onChange={(e) => setMateria(e.target.value)} required />
              </DsField>
              <DsField orientation="responsive">
                <DsField>
                  <DsFieldLabel htmlFor="peso">Peso (1–10)</DsFieldLabel>
                  <DsInput
                    id="peso"
                    type="number"
                    min={1}
                    max={10}
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)}
                    required
                  />
                </DsField>
                <DsField>
                  <DsFieldLabel htmlFor="data-agendada">Data agendada</DsFieldLabel>
                  <DsInput
                    id="data-agendada"
                    type="date"
                    value={dataAgendada}
                    onChange={(e) => setDataAgendada(e.target.value)}
                    required
                  />
                </DsField>
              </DsField>
            </DsFieldGroup>
          </DsSheetPanel>
          <DsSheetFooter>
            <DsButton type="submit" loading={saving}>
              Salvar
            </DsButton>
          </DsSheetFooter>
        </form>
      </DsSheetContent>
    </DsSheet>
  )
}
