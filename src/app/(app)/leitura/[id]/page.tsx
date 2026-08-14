import { notFound } from "next/navigation"

import { LivroDetail } from "@/features/leitura/components/livro-detail"
import { getLivro, getRegistrosDoLivro } from "@/features/leitura/data"

export default async function LivroPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const livro = getLivro(id)

  if (!livro) {
    notFound()
  }

  return <LivroDetail livro={livro} registrosIniciais={getRegistrosDoLivro(livro.id)} />
}
