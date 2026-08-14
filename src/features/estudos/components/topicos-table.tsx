"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { BookOpen01Icon, CheckmarkCircle02Icon, Clock01Icon, Refresh01Icon } from "@hugeicons/core-free-icons"

import { DsBadge } from "@/components/ds/badge"
import {
  DsSelect,
  DsSelectContent,
  DsSelectItem,
  DsSelectTrigger,
  DsSelectValue,
} from "@/components/ds/select"
import { DsTable, DsTableBody, DsTableCell, DsTableHead, DsTableHeader, DsTableRow } from "@/components/ds/table"
import type { StatusTopico, TopicoEstudo } from "@/features/estudos/data"
import { STATUS_TOPICO_LABEL } from "@/features/estudos/data"
import { formatarData } from "@/lib/dates"

const STATUS_ICON: Record<StatusTopico, typeof Clock01Icon> = {
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
              <DsBadge variant="secondary">{topico.materia}</DsBadge>
            </DsTableCell>
            <DsTableCell>
              <DsBadge variant={topico.peso >= 8 ? "default" : "outline"}>{topico.peso}</DsBadge>
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
