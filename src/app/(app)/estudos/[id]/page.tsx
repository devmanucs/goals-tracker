import { notFound } from "next/navigation"

import { ApiError } from "@/lib/api"
import { listarTopicos, obterConcurso } from "@/features/estudos/api"
import { ConcursoDetail } from "@/features/estudos/components/concurso-detail"

export default async function ConcursoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  try {
    // Ordenado por peso: é a ordem em que a tabela apresenta os tópicos.
    const [concurso, topicos] = await Promise.all([
      obterConcurso(id),
      listarTopicos(id, "peso"),
    ])
    return <ConcursoDetail concurso={concurso} topicos={topicos} />
  } catch (erro) {
    if (erro instanceof ApiError && erro.status === 404) notFound()
    throw erro
  }
}
