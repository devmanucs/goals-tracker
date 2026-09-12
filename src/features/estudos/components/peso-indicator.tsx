import { cn } from "@/lib/utils"

const BARRAS = [6, 9, 12, 15, 18]

export function PesoIndicator({
  peso,
  showValue = true,
  className,
}: {
  peso: number
  showValue?: boolean
  className?: string
}) {
  const preenchidas = Math.min(5, Math.max(0, Math.round(peso / 2)))

  return (
    <span
      className={cn("inline-flex items-center gap-1.5", className)}
      title={`Peso ${peso} de 10`}
    >
      <span className="inline-flex items-end gap-0.5" aria-hidden="true">
        {BARRAS.map((altura, i) => (
          <span
            key={altura}
            className={cn(
              "w-1 rounded-full transition-colors",
              i < preenchidas ? "bg-primary" : "bg-muted"
            )}
            style={{ height: altura }}
          />
        ))}
      </span>
      {showValue && (
        <span className="text-xs font-medium text-muted-foreground tabular-nums">{peso}</span>
      )}
    </span>
  )
}
