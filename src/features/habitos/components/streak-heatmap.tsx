import { cn } from "@/lib/utils"
import { progressoDoDia, type Habito, type RegistroRecente } from "@/features/habitos/types"
import { formatarDataCompleta } from "@/lib/dates"

const DIAS_SEMANA = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"]

// O heatmap é visual e relativo a "agora", então usa a data do próprio
// navegador. Streak e progresso, que são números do produto, vêm da API.
const HOJE_ISO = new Date().toISOString().slice(0, 10)

function fimDaSemanaAtual() {
  const hoje = new Date(`${HOJE_ISO}T12:00:00`)
  const d = new Date(hoje)
  d.setDate(hoje.getDate() + (6 - hoje.getDay()))
  return d
}

function isoDe(date: Date) {
  return date.toISOString().slice(0, 10)
}

function corDaIntensidade(percentual: number) {
  if (percentual <= 0) return "bg-muted"
  if (percentual < 0.4) return "bg-primary/30"
  if (percentual < 0.75) return "bg-primary/60"
  return "bg-primary"
}

export function StreakHeatmap({
  habito,
  registros,
  semanas = 12,
  className,
}: {
  habito: Habito
  registros: RegistroRecente[]
  semanas?: number
  className?: string
}) {
  const fim = fimDaSemanaAtual()
  const inicio = new Date(fim)
  inicio.setDate(fim.getDate() - (semanas * 7 - 1))

  const dias = Array.from({ length: semanas * 7 }, (_, i) => {
    const data = new Date(inicio)
    data.setDate(inicio.getDate() + i)
    return data
  })

  return (
    <div className={cn("flex items-start gap-1.5", className)}>
      {semanas > 1 && (
        <div className="grid grid-rows-7 gap-[3px] pt-px text-[0.6rem] text-muted-foreground">
          {DIAS_SEMANA.map((dia, i) => (
            <span key={dia} className="flex h-2.5 items-center sm:h-3">
              {i % 2 === 1 ? dia : ""}
            </span>
          ))}
        </div>
      )}
      <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
        {dias.map((dia) => {
          const iso = isoDe(dia)
          const futuro = iso > HOJE_ISO
          const { valor, percentual } = progressoDoDia(habito, registros, iso)

          return (
            <span
              key={iso}
              title={futuro ? undefined : `${formatarDataCompleta(iso)} · ${valor} ${habito.unidade}`}
              className={cn(
                "size-2.5 rounded-sm sm:size-3",
                futuro ? "border border-dashed border-border" : corDaIntensidade(percentual)
              )}
            />
          )
        })}
      </div>
    </div>
  )
}
