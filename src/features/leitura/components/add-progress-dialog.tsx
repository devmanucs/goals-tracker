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
import { DsTextarea } from "@/components/ds/textarea"
import type { RegistroLeitura } from "@/features/leitura/data"
import { HOJE } from "@/lib/dates"

export function AddProgressDialog({
  livroId,
  totalPaginas,
  paginaAtual,
  onAdd,
}: {
  livroId: string
  totalPaginas: number
  paginaAtual: number
  onAdd: (registro: RegistroLeitura) => void
}) {
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [data, setData] = useState(HOJE)
  const [pagina, setPagina] = useState(String(paginaAtual))
  const [observacao, setObservacao] = useState("")

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const paginaNum = Number(pagina)
    if (!data || !paginaNum || paginaNum < 0) return

    setSaving(true)
    setTimeout(() => {
      onAdd({
        id: crypto.randomUUID(),
        livroId,
        data,
        paginaAtual: Math.min(paginaNum, totalPaginas),
        observacao: observacao.trim() || undefined,
      })
      setObservacao("")
      setSaving(false)
      setOpen(false)
    }, 400)
  }

  return (
    <DsSheet open={open} onOpenChange={setOpen}>
      <DsSheetTrigger render={<DsButton size="sm" />}>
        <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} data-icon="inline-start" />
        Registrar progresso
      </DsSheetTrigger>
      <DsSheetContent side="bottom" className="mx-auto max-w-lg">
        <form onSubmit={handleSubmit} className="flex h-full flex-col">
          <DsSheetHeader>
            <DsSheetTitle>Registrar progresso</DsSheetTitle>
            <DsSheetDescription>Até qual página você chegou?</DsSheetDescription>
          </DsSheetHeader>
          <DsSheetPanel className="flex-1">
            <DsFieldGroup>
              <DsField orientation="responsive">
                <DsField>
                  <DsFieldLabel htmlFor="data-registro">Data</DsFieldLabel>
                  <DsInput id="data-registro" type="date" value={data} onChange={(e) => setData(e.target.value)} required />
                </DsField>
                <DsField>
                  <DsFieldLabel htmlFor="pagina-atual">Página atual</DsFieldLabel>
                  <DsInput
                    id="pagina-atual"
                    type="number"
                    min={0}
                    max={totalPaginas}
                    value={pagina}
                    onChange={(e) => setPagina(e.target.value)}
                    required
                  />
                </DsField>
              </DsField>
              <DsField>
                <DsFieldLabel htmlFor="observacao">Observação (opcional)</DsFieldLabel>
                <DsTextarea
                  id="observacao"
                  value={observacao}
                  onChange={(e) => setObservacao(e.target.value)}
                  placeholder="Alguma impressão sobre a leitura de hoje..."
                />
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
