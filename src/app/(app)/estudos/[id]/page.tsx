import { notFound } from "next/navigation"

import { ConcursoDetail } from "@/features/estudos/components/concurso-detail"
import { getConcurso, getTopicosDoConcurso } from "@/features/estudos/data"

export default async function ConcursoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const concurso = getConcurso(id)

  if (!concurso) {
    notFound()
  }

  return <ConcursoDetail concurso={concurso} topicosIniciais={getTopicosDoConcurso(concurso.id)} />
}
