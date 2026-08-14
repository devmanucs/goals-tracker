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
import type { Concurso } from "@/features/estudos/data"
import { HOJE } from "@/lib/dates"

export function ConcursoFormDialog({ onAdd }: { onAdd: (concurso: Concurso) => void }) {
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [titulo, setTitulo] = useState("")
  const [banca, setBanca] = useState("")
  const [dataProva, setDataProva] = useState(HOJE)

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!titulo.trim() || !banca.trim() || !dataProva) return

    setSaving(true)
    setTimeout(() => {
      onAdd({
        id: crypto.randomUUID(),
        titulo: titulo.trim(),
        banca: banca.trim(),
        dataProva,
        status: "planejando",
      })
      setTitulo("")
      setBanca("")
      setSaving(false)
      setOpen(false)
    }, 400)
  }

  return (
    <DsSheet open={open} onOpenChange={setOpen}>
      <DsSheetTrigger render={<DsButton />}>
        <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} data-icon="inline-start" />
        Novo concurso
      </DsSheetTrigger>
      <DsSheetContent side="right">
        <form onSubmit={handleSubmit} className="flex h-full flex-col">
          <DsSheetHeader>
            <DsSheetTitle>Cadastrar concurso</DsSheetTitle>
            <DsSheetDescription>Cadastre o concurso ou cargo que você está estudando.</DsSheetDescription>
          </DsSheetHeader>
          <DsSheetPanel className="flex-1">
            <DsFieldGroup>
              <DsField>
                <DsFieldLabel htmlFor="titulo-concurso">Nome do concurso / cargo</DsFieldLabel>
                <DsInput id="titulo-concurso" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
              </DsField>
              <DsField orientation="responsive">
                <DsField>
                  <DsFieldLabel htmlFor="banca">Banca</DsFieldLabel>
                  <DsInput id="banca" value={banca} onChange={(e) => setBanca(e.target.value)} required />
                </DsField>
                <DsField>
                  <DsFieldLabel htmlFor="data-prova">Data da prova</DsFieldLabel>
                  <DsInput
                    id="data-prova"
                    type="date"
                    value={dataProva}
                    onChange={(e) => setDataProva(e.target.value)}
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
