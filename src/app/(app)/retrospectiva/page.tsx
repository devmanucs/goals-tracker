import { DefinirBreadcrumb } from "@/components/breadcrumb-context"
import { DsCard, DsCardContent } from "@/components/ds/card"
import { Illustration } from "@/components/illustration"
import { StatStrip } from "@/components/stat-card"
import { retrospectiva } from "@/features/retrospectiva/api"
import { RetrospectivaCharts } from "@/features/retrospectiva/components/retrospectiva-charts"

export default async function RetrospectivaPage() {
  // As duas janelas que os gráficos alternam — o backend agrega cada uma.
  const [seisMeses, dozeMeses] = await Promise.all([retrospectiva(6), retrospectiva(12)])
  const { resumo } = dozeMeses

  return (
    <div className="flex flex-1 flex-col">
      <DefinirBreadcrumb items={[{ label: "Retrospectiva" }]} />
      <div className="flex flex-1 flex-col gap-6 p-6 md:p-8">
        <h1 className="font-heading text-xl font-medium">Retrospectiva</h1>
        <DsCard className="overflow-hidden">
          <DsCardContent className="flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-md">
              <h2 className="font-heading text-lg font-medium">
                100% dos seus dados, em um só lugar
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Um resumo do que você leu, estudou e manteve como hábito — pronto para o seu
                levantamento de fim de ano.
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
          paginas6={seisMeses.paginasLidasPorMes}
          paginas12={dozeMeses.paginasLidasPorMes}
          topicos6={seisMeses.topicosEstudadosPorMes}
          topicos12={dozeMeses.topicosEstudadosPorMes}
          habitos6={seisMeses.habitosConcluidosPorMes}
          habitos12={dozeMeses.habitosConcluidosPorMes}
        />
      </div>
    </div>
  )
}
