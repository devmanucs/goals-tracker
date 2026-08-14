import { Book02Icon, BookOpen01Icon, Fire03Icon, GraduationCapIcon } from "@hugeicons/core-free-icons"

import { AppHeader } from "@/components/app-header"
import { StatStrip } from "@/components/stat-card"
import { formatarDataCompleta } from "@/lib/dates"
import { estatisticasLeitura } from "@/features/leitura/data"
import { concursos, diasAteProva } from "@/features/estudos/data"
import { getHabitos, streakDoHabito } from "@/features/habitos/data"
import {
  EstudosSummaryCard,
  HabitosSummaryCard,
  LeituraSummaryCard,
} from "@/features/dashboard/components/module-cards"

export default function DashboardPage() {
  const leitura = estatisticasLeitura()
  const habitos = getHabitos()
  const maiorStreak = Math.max(0, ...habitos.map((h) => streakDoHabito(h.id)))
  const proximoConcurso = [...concursos].sort(
    (a, b) => (diasAteProva(a.id) ?? Infinity) - (diasAteProva(b.id) ?? Infinity)
  )[0]

  return (
    <div className="flex min-h-svh flex-col">
      <AppHeader items={[{ label: "Dashboard" }]} />
      <div className="flex flex-1 flex-col gap-6 p-6 md:p-8">
        <div>
          <h2 className="font-heading text-xl font-medium">Olá, Manuella</h2>
          <p className="text-sm text-muted-foreground">
            Resumo do seu progresso — hoje é {formatarDataCompleta("2026-08-13")}.
          </p>
        </div>

        <StatStrip
          stats={[
            { label: "Livros lidos", value: leitura.livrosLidos, icon: Book02Icon },
            { label: "Páginas lidas", value: leitura.paginasLidasTotal, icon: BookOpen01Icon },
            { label: "Maior streak ativo", value: maiorStreak, icon: Fire03Icon },
            ...(proximoConcurso
              ? [
                  {
                    label: "Dias até a prova",
                    value: diasAteProva(proximoConcurso.id) ?? 0,
                    hint: proximoConcurso.titulo,
                    icon: GraduationCapIcon,
                  },
                ]
              : []),
          ]}
        />

        <section className="grid gap-4 lg:grid-cols-3">
          <LeituraSummaryCard />
          <EstudosSummaryCard />
          <HabitosSummaryCard />
        </section>
      </div>
    </div>
  )
}
