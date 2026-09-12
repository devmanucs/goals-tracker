import { notFound } from "next/navigation"

import { ApiError } from "@/lib/api"
import { listarTopicos, obterConcurso } from "@/features/estudos/api"
import { ConcursoDetail } from "@/features/estudos/components/concurso-detail"

export default async function ConcursoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // Ordenado por peso: é a ordem em que a tabela apresenta os tópicos.
  let dados
  try {
    dados = await Promise.all([obterConcurso(id), listarTopicos(id, "peso")])
  } catch (erro) {
    if (erro instanceof ApiError && erro.status === 404) notFound()
    throw erro
  }

  const [concurso, topicos] = dados
  return <ConcursoDetail concurso={concurso} topicos={topicos} />
}
