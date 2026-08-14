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
import {
  DsSelect,
  DsSelectContent,
  DsSelectItem,
  DsSelectTrigger,
  DsSelectValue,
} from "@/components/ds/select"
import type { FrequenciaHabito, Habito } from "@/features/habitos/data"
import { FREQUENCIA_LABEL } from "@/features/habitos/data"

export function HabitoFormDialog({ onAdd }: { onAdd: (habito: Habito) => void }) {
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [nome, setNome] = useState("")
  const [unidade, setUnidade] = useState("")
  const [metaValor, setMetaValor] = useState("")
  const [frequencia, setFrequencia] = useState<FrequenciaHabito>("diaria")

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!nome.trim() || !unidade.trim() || !metaValor) return

    setSaving(true)
    setTimeout(() => {
      onAdd({
        id: crypto.randomUUID(),
        nome: nome.trim(),
        unidade: unidade.trim(),
        metaValor: Number(metaValor),
        frequencia,
        icone: "water",
      })
      setNome("")
      setUnidade("")
      setMetaValor("")
      setSaving(false)
      setOpen(false)
    }, 400)
  }

  return (
    <DsSheet open={open} onOpenChange={setOpen}>
      <DsSheetTrigger render={<DsButton />}>
        <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} data-icon="inline-start" />
        Novo hábito
      </DsSheetTrigger>
      <DsSheetContent side="right">
        <form onSubmit={handleSubmit} className="flex h-full flex-col">
          <DsSheetHeader>
            <DsSheetTitle>Cadastrar hábito</DsSheetTitle>
            <DsSheetDescription>Defina um hábito com contador numérico e meta por período.</DsSheetDescription>
          </DsSheetHeader>
          <DsSheetPanel className="flex-1">
            <DsFieldGroup>
              <DsField>
                <DsFieldLabel htmlFor="nome-habito">Nome</DsFieldLabel>
                <DsInput
                  id="nome-habito"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: Beber água"
                  required
                />
              </DsField>
              <DsField orientation="responsive">
                <DsField>
                  <DsFieldLabel htmlFor="unidade">Unidade</DsFieldLabel>
                  <DsInput
                    id="unidade"
                    value={unidade}
                    onChange={(e) => setUnidade(e.target.value)}
                    placeholder="L, km, vezes..."
                    required
                  />
                </DsField>
                <DsField>
                  <DsFieldLabel htmlFor="meta-valor">Meta por período</DsFieldLabel>
                  <DsInput
                    id="meta-valor"
                    type="number"
                    min={0.1}
                    step="any"
                    value={metaValor}
                    onChange={(e) => setMetaValor(e.target.value)}
                    required
                  />
                </DsField>
              </DsField>
              <DsField>
                <DsFieldLabel htmlFor="frequencia">Frequência</DsFieldLabel>
                <DsSelect value={frequencia} onValueChange={(v) => setFrequencia(v as FrequenciaHabito)}>
                  <DsSelectTrigger id="frequencia" className="w-full">
                    <DsSelectValue />
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
            <DsButton type="submit" loading={saving}>
              Salvar
            </DsButton>
          </DsSheetFooter>
        </form>
      </DsSheetContent>
    </DsSheet>
  )
}
