"use client"

import { useMemo, useState } from "react"
import moment from "moment"
import "moment/locale/pt-br"
import { momentLocalizer, type Event as CalendarEvent } from "react-big-calendar"

import ShadcnBigCalendar from "@/components/shadcn-big-calendar/shadcn-big-calendar"
import { DsBadge } from "@/components/ds/badge"
import { DsItem, DsItemContent, DsItemDescription, DsItemGroup, DsItemTitle } from "@/components/ds/item"
import type { StatusTopico, TopicoEstudo } from "@/features/estudos/data"
import { STATUS_TOPICO_LABEL } from "@/features/estudos/data"
import { formatarDataCompleta, parseDate, HOJE } from "@/lib/dates"

moment.locale("pt-br")
const localizer = momentLocalizer(moment)

const EVENT_VARIANT: Record<StatusTopico, string> = {
  pendente: "event-variant-outline",
  estudando: "event-variant-primary",
  estudado: "event-variant-secondary",
  revisao: "event-variant-secondary",
}

type TopicoEvent = CalendarEvent & { resource: TopicoEstudo }

export function CalendarioTopicos({ topicos }: { topicos: TopicoEstudo[] }) {
  const [selected, setSelected] = useState<Date>(parseDate(topicos[0]?.dataAgendada ?? HOJE))

  const events = useMemo<TopicoEvent[]>(
    () =>
      topicos.map((t) => ({
        title: t.titulo,
        start: parseDate(t.dataAgendada),
        end: parseDate(t.dataAgendada),
        allDay: true,
        resource: t,
      })),
    [topicos]
  )

  const topicosNoDia = topicos.filter(
    (t) => parseDate(t.dataAgendada).toDateString() === selected.toDateString()
  )

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="min-w-0 flex-1 overflow-hidden rounded-xl border">
        <ShadcnBigCalendar
          localizer={localizer}
          events={events}
          views={["month"]}
          defaultView="month"
          date={selected}
          onNavigate={setSelected}
          style={{ height: 560 }}
          popup
          selectable
          onSelectSlot={(slot) => setSelected(slot.start)}
          onSelectEvent={(event) => setSelected((event as TopicoEvent).start ?? selected)}
          eventPropGetter={(event) => {
            const resource = (event as TopicoEvent).resource as TopicoEstudo
            return { className: EVENT_VARIANT[resource.status] }
          }}
        />
      </div>
      <div className="w-full lg:w-72 lg:shrink-0">
        <p className="mb-3 text-sm font-medium">{formatarDataCompleta(selected.toISOString().slice(0, 10))}</p>
        {topicosNoDia.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhum tópico agendado para esse dia.</p>
        ) : (
          <DsItemGroup>
            {topicosNoDia.map((topico) => (
              <DsItem key={topico.id} variant="outline" size="sm">
                <DsItemContent>
                  <DsItemTitle>{topico.titulo}</DsItemTitle>
                  <DsItemDescription>{topico.materia}</DsItemDescription>
                </DsItemContent>
                <DsBadge variant="outline">peso {topico.peso}</DsBadge>
                <DsBadge variant="secondary">{STATUS_TOPICO_LABEL[topico.status]}</DsBadge>
              </DsItem>
            ))}
          </DsItemGroup>
        )}
      </div>
    </div>
  )
}
