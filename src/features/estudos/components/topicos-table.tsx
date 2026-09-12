"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { BookOpen01Icon, CheckmarkCircle02Icon, Clock01Icon, Refresh01Icon } from "@hugeicons/core-free-icons"

import {
  DsSelect,
  DsSelectContent,
  DsSelectItem,
  DsSelectTrigger,
  DsSelectValue,
} from "@/components/ds/select"
import { DsTable, DsTableBody, DsTableCell, DsTableHead, DsTableHeader, DsTableRow } from "@/components/ds/table"
import type { StatusTopico, TopicoEstudo } from "@/features/estudos/data"
import { corDaMateria, STATUS_TOPICO_LABEL } from "@/features/estudos/data"
import { formatarData } from "@/lib/dates"
import { PesoIndicator } from "@/features/estudos/components/peso-indicator"

export const STATUS_ICON: Record<StatusTopico, typeof Clock01Icon> = {
  pendente: Clock01Icon,
  estudando: BookOpen01Icon,
  estudado: CheckmarkCircle02Icon,
  revisao: Refresh01Icon,
}

export function TopicosTable({
  topicos,
  onStatusChange,
}: {
  topicos: TopicoEstudo[]
  onStatusChange: (topicoId: string, status: StatusTopico) => void
}) {
  const ordenados = [...topicos].sort((a, b) => b.peso - a.peso)

  return (
    <DsTable>
      <DsTableHeader>
        <DsTableRow>
          <DsTableHead>Tópico</DsTableHead>
          <DsTableHead>Matéria</DsTableHead>
          <DsTableHead>Peso</DsTableHead>
          <DsTableHead>Data agendada</DsTableHead>
          <DsTableHead>Status</DsTableHead>
        </DsTableRow>
      </DsTableHeader>
      <DsTableBody>
        {ordenados.map((topico) => (
          <DsTableRow key={topico.id}>
            <DsTableCell className="max-w-64 font-medium text-wrap">{topico.titulo}</DsTableCell>
            <DsTableCell>
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <span
                  className="size-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: corDaMateria(topico.materia) }}
                  aria-hidden="true"
                />
                {topico.materia}
              </span>
            </DsTableCell>
            <DsTableCell>
              <PesoIndicator peso={topico.peso} />
            </DsTableCell>
            <DsTableCell className="text-muted-foreground">{formatarData(topico.dataAgendada)}</DsTableCell>
            <DsTableCell>
              <DsSelect
                value={topico.status}
                onValueChange={(value) => onStatusChange(topico.id, value as StatusTopico)}
              >
                <DsSelectTrigger size="sm">
                  <HugeiconsIcon icon={STATUS_ICON[topico.status]} strokeWidth={2} className="size-3.5" />
                  <DsSelectValue />
                </DsSelectTrigger>
                <DsSelectContent>
                  {Object.entries(STATUS_TOPICO_LABEL).map(([value, label]) => (
                    <DsSelectItem key={value} value={value}>
                      {label}
                    </DsSelectItem>
                  ))}
                </DsSelectContent>
              </DsSelect>
            </DsTableCell>
          </DsTableRow>
        ))}
      </DsTableBody>
    </DsTable>
  )
}
