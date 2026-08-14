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
import type { Livro, StatusLivro } from "@/features/leitura/data"
import { STATUS_LIVRO_LABEL } from "@/features/leitura/data"

const CORES = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"]

export function BookFormDialog({ onAdd }: { onAdd: (livro: Livro) => void }) {
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [titulo, setTitulo] = useState("")
  const [autor, setAutor] = useState("")
  const [totalPaginas, setTotalPaginas] = useState("")
  const [status, setStatus] = useState<StatusLivro>("quero_ler")

  function reset() {
    setTitulo("")
    setAutor("")
    setTotalPaginas("")
    setStatus("quero_ler")
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!titulo.trim() || !autor.trim() || !totalPaginas) return

    setSaving(true)
    setTimeout(() => {
      onAdd({
        id: crypto.randomUUID(),
        titulo: titulo.trim(),
        autor: autor.trim(),
        totalPaginas: Number(totalPaginas),
        status,
        corCapa: CORES[Math.floor(Math.random() * CORES.length)],
      })
      reset()
      setSaving(false)
      setOpen(false)
    }, 400)
  }

  return (
    <DsSheet open={open} onOpenChange={setOpen}>
      <DsSheetTrigger render={<DsButton />}>
        <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} data-icon="inline-start" />
        Novo livro
      </DsSheetTrigger>
      <DsSheetContent side="right">
        <form onSubmit={handleSubmit} className="flex h-full flex-col">
          <DsSheetHeader>
            <DsSheetTitle>Cadastrar livro</DsSheetTitle>
            <DsSheetDescription>Adicione um livro para acompanhar seu progresso de leitura.</DsSheetDescription>
          </DsSheetHeader>
          <DsSheetPanel className="flex-1">
            <DsFieldGroup>
              <DsField>
                <DsFieldLabel htmlFor="titulo">Título</DsFieldLabel>
                <DsInput id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
              </DsField>
              <DsField>
                <DsFieldLabel htmlFor="autor">Autor</DsFieldLabel>
                <DsInput id="autor" value={autor} onChange={(e) => setAutor(e.target.value)} required />
              </DsField>
              <DsField orientation="responsive">
                <DsField>
                  <DsFieldLabel htmlFor="paginas">Total de páginas</DsFieldLabel>
                  <DsInput
                    id="paginas"
                    type="number"
                    min={1}
                    value={totalPaginas}
                    onChange={(e) => setTotalPaginas(e.target.value)}
                    required
                  />
                </DsField>
                <DsField>
                  <DsFieldLabel htmlFor="status">Status</DsFieldLabel>
                  <DsSelect value={status} onValueChange={(value) => setStatus(value as StatusLivro)}>
                    <DsSelectTrigger id="status" className="w-full">
                      <DsSelectValue />
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
            <DsButton type="submit" loading={saving}>
              Salvar
            </DsButton>
          </DsSheetFooter>
        </form>
      </DsSheetContent>
    </DsSheet>
  )
}
