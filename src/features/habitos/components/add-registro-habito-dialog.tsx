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
import type { RegistroHabito } from "@/features/habitos/data"
import { HOJE } from "@/lib/dates"

export function AddRegistroHabitoDialog({
  habitoId,
  unidade,
  onAdd,
}: {
  habitoId: string
  unidade: string
  onAdd: (registro: RegistroHabito) => void
}) {
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [data, setData] = useState(HOJE)
  const [valor, setValor] = useState("")

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const valorNum = Number(valor)
    if (!data || !valorNum || valorNum <= 0) return

    setSaving(true)
    setTimeout(() => {
      onAdd({ id: crypto.randomUUID(), habitoId, data, valor: valorNum })
      setValor("")
      setSaving(false)
      setOpen(false)
    }, 400)
  }

  return (
    <DsSheet open={open} onOpenChange={setOpen}>
      <DsSheetTrigger render={<DsButton size="sm" />}>
        <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} data-icon="inline-start" />
        Registrar valor
      </DsSheetTrigger>
      <DsSheetContent side="bottom" className="mx-auto max-w-lg">
        <form onSubmit={handleSubmit} className="flex h-full flex-col">
          <DsSheetHeader>
            <DsSheetTitle>Registrar valor</DsSheetTitle>
            <DsSheetDescription>Quanto você fez hoje, em {unidade}?</DsSheetDescription>
          </DsSheetHeader>
          <DsSheetPanel className="flex-1">
            <DsFieldGroup>
              <DsField orientation="responsive">
                <DsField>
                  <DsFieldLabel htmlFor="data-habito">Data</DsFieldLabel>
                  <DsInput id="data-habito" type="date" value={data} onChange={(e) => setData(e.target.value)} required />
                </DsField>
                <DsField>
                  <DsFieldLabel htmlFor="valor-habito">Valor ({unidade})</DsFieldLabel>
                  <DsInput
                    id="valor-habito"
                    type="number"
                    min={0.1}
                    step="any"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
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
