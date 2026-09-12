import { notFound } from "next/navigation"

import { ApiError } from "@/lib/api"
import { listarRegistros, obterHabito } from "@/features/habitos/api"
import { HabitoDetail } from "@/features/habitos/components/habito-detail"

export default async function HabitoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  try {
    const [habito, registros] = await Promise.all([obterHabito(id), listarRegistros(id)])
    return <HabitoDetail habito={habito} registros={registros} />
  } catch (erro) {
    if (erro instanceof ApiError && erro.status === 404) notFound()
    throw erro
  }
}
