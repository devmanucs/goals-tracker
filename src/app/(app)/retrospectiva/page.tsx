import { AppHeader } from "@/components/app-header"
import { DsCard, DsCardContent } from "@/components/ds/card"
import { Illustration } from "@/components/illustration"
import { StatStrip } from "@/components/stat-card"
import { RetrospectivaCharts } from "@/features/retrospectiva/components/retrospectiva-charts"
import {
  habitosConcluidosPorMes,
  paginasLidasPorMes,
  resumoRetrospectiva,
  topicosEstudadosPorMes,
} from "@/features/retrospectiva/data"

export default function RetrospectivaPage() {
  const resumo = resumoRetrospectiva()

  return (
    <div className="flex min-h-svh flex-col">
      <AppHeader items={[{ label: "Retrospectiva" }]} />
      <div className="flex flex-1 flex-col gap-6 p-6 md:p-8">
        <h1 className="font-heading text-xl font-medium">Retrospectiva</h1>
        <DsCard className="overflow-hidden">
          <DsCardContent className="flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-md">
              <h2 className="font-heading text-lg font-medium">100% dos seus dados, em um só lugar</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Um resumo do que você leu, estudou e manteve como hábito — pronto para o seu levantamento de fim de
                ano.
              </p>
            </div>
            <Illustration name="winners" size={140} className="shrink-0" />
          </DsCardContent>
        </DsCard>

        <StatStrip
          stats={[
            { label: "Livros lidos", value: resumo.livrosLidos },
            { label: "Páginas lidas", value: resumo.paginasLidas },
            { label: "Tópicos estudados", value: resumo.topicosEstudados },
            { label: "Maior streak", value: resumo.maiorStreak },
          ]}
        />

        <RetrospectivaCharts
          paginas6={paginasLidasPorMes(6)}
          paginas12={paginasLidasPorMes(12)}
          topicos6={topicosEstudadosPorMes(6)}
          topicos12={topicosEstudadosPorMes(12)}
          habitos6={habitosConcluidosPorMes(6)}
          habitos12={habitosConcluidosPorMes(12)}
        />
      </div>
    </div>
  )
}
