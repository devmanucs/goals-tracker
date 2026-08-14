import { notFound } from "next/navigation"

import { HabitoDetail } from "@/features/habitos/components/habito-detail"
import { getHabito, getRegistrosDoHabito } from "@/features/habitos/data"

export default async function HabitoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const habito = getHabito(id)

  if (!habito) {
    notFound()
  }

  return <HabitoDetail habito={habito} registrosIniciais={getRegistrosDoHabito(habito.id)} />
}
