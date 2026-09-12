"use client"

import { useMemo, useState } from "react"
import moment from "moment"
import "moment/locale/pt-br"
import { momentLocalizer, type Event as CalendarEvent, type ToolbarProps } from "react-big-calendar"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons"

import ShadcnBigCalendar from "@/components/shadcn-big-calendar/shadcn-big-calendar"
import { DsBadge } from "@/components/ds/badge"
import { DsButton } from "@/components/ds/button"
import { DsButtonGroup } from "@/components/ds/button-group"
import { PesoIndicator } from "@/features/estudos/components/peso-indicator"
import { CalendarioSemana } from "@/features/estudos/components/calendario-semana"
import type { StatusTopico, TopicoEstudo } from "@/features/estudos/data"
import { corDaMateria, STATUS_TOPICO_LABEL } from "@/features/estudos/data"
import { formatarDataCompleta, parseDate, HOJE } from "@/lib/dates"

type Visao = "mes" | "semana"

moment.locale("pt-br")
const localizer = momentLocalizer(moment)

const EVENT_VARIANT: Record<StatusTopico, string> = {
  pendente: "event-variant-outline",
  estudando: "event-variant-primary",
  estudado: "event-variant-secondary",
  revisao: "event-variant-secondary",
}

type TopicoEvent = CalendarEvent & { resource: TopicoEstudo }

function CalendarioToolbar({ label, onNavigate }: ToolbarProps<TopicoEvent, object>) {
  return (
    <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
      <p className="text-sm font-semibold capitalize">{label}</p>
      <DsButtonGroup>
        <DsButton
          variant="outline"
          size="icon-sm"
          onClick={() => onNavigate("PREV")}
          aria-label="Mês anterior"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} />
        </DsButton>
        <DsButton variant="outline" size="sm" onClick={() => onNavigate("TODAY")}>
          Hoje
        </DsButton>
        <DsButton
          variant="outline"
          size="icon-sm"
          onClick={() => onNavigate("NEXT")}
          aria-label="Próximo mês"
        >
          <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
        </DsButton>
      </DsButtonGroup>
    </div>
  )
}

export function CalendarioTopicos({ topicos }: { topicos: TopicoEstudo[] }) {
  const [visao, setVisao] = useState<Visao>("semana")
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
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <DsButtonGroup>
          <DsButton
            variant={visao === "mes" ? "secondary" : "outline"}
            size="sm"
            onClick={() => setVisao("mes")}
          >
            Mês
          </DsButton>
          <DsButton
            variant={visao === "semana" ? "secondary" : "outline"}
            size="sm"
            onClick={() => setVisao("semana")}
          >
            Semana
          </DsButton>
        </DsButtonGroup>
      </div>

      {visao === "semana" ? (
        <CalendarioSemana topicos={topicos} />
      ) : (
        <div className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-lg">
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
              components={{ toolbar: CalendarioToolbar }}
              onSelectSlot={(slot) => setSelected(slot.start)}
              onSelectEvent={(event) => setSelected((event as TopicoEvent).start ?? selected)}
              eventPropGetter={(event) => {
                const resource = (event as TopicoEvent).resource as TopicoEstudo
                return { className: EVENT_VARIANT[resource.status] }
              }}
            />
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium">{formatarDataCompleta(selected.toISOString().slice(0, 10))}</p>
            {topicosNoDia.length === 0 ? (
              <p className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                Nenhum tópico agendado para esse dia.
              </p>
            ) : (
              <div className="flex flex-wrap gap-3">
                {topicosNoDia.map((topico) => (
                  <div
                    key={topico.id}
                    className="flex min-w-56 flex-1 flex-col gap-2 rounded-xl border border-border bg-card p-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-foreground">{topico.titulo}</p>
                      <DsBadge variant="secondary" className="shrink-0">
                        {STATUS_TOPICO_LABEL[topico.status]}
                      </DsBadge>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
                        <span
                          className="size-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: corDaMateria(topico.materia) }}
                          aria-hidden="true"
                        />
                        <span className="truncate">{topico.materia}</span>
                      </span>
                      <PesoIndicator peso={topico.peso} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
