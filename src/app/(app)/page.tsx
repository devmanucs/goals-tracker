import { Book02Icon, BookOpen01Icon, Fire03Icon, GraduationCapIcon } from "@hugeicons/core-free-icons"

import { DefinirBreadcrumb } from "@/components/breadcrumb-context"
import { StatStrip } from "@/components/stat-card"
import { resumoDashboard } from "@/features/dashboard/api"
import {
  EstudosSummaryCard,
  HabitosSummaryCard,
  LeituraSummaryCard,
} from "@/features/dashboard/components/module-cards"
import { usuarioLogado } from "@/features/auth/data"

export default async function DashboardPage() {
  // Uma requisição para a tela inteira: o backend agrega os três módulos.
  const [usuario, resumo] = await Promise.all([usuarioLogado(), resumoDashboard()])

  const maiorStreak = Math.max(0, ...resumo.habitos.lista.map((h) => h.streak.atual))
  const proximaProva = resumo.estudos.proximoTopico?.concurso

  const hoje = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })

  return (
    <div className="flex flex-1 flex-col">
      <DefinirBreadcrumb items={[{ label: "Dashboard" }]} />
      <div className="flex flex-1 flex-col gap-6 p-6 md:p-8">
        <div>
          <h2 className="font-heading text-xl font-medium">
            Olá, {usuario.nome.split(" ")[0]}
          </h2>
          <p className="text-sm text-muted-foreground">
            Resumo do seu progresso — hoje é {hoje}.
          </p>
        </div>

        <StatStrip
          stats={[
            { label: "Livros lidos", value: resumo.leitura.livrosLidos, icon: Book02Icon },
            {
              label: "Páginas lidas",
              value: resumo.leitura.paginasLidasTotal,
              icon: BookOpen01Icon,
            },
            { label: "Maior streak ativo", value: maiorStreak, icon: Fire03Icon },
            ...(proximaProva
              ? [
                  {
                    label: "Dias até a prova",
                    value: proximaProva.diasAteProva,
                    hint: proximaProva.titulo,
                    icon: GraduationCapIcon,
                  },
                ]
              : []),
          ]}
        />

        <section className="grid gap-4 lg:grid-cols-3">
          <LeituraSummaryCard leitura={resumo.leitura} />
          <EstudosSummaryCard estudos={resumo.estudos} />
          <HabitosSummaryCard habitos={resumo.habitos} />
        </section>
      </div>
    </div>
  )
}
