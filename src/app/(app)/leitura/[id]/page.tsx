import { notFound } from "next/navigation"

import { ApiError } from "@/lib/api"
import { listarRegistros, obterLivro } from "@/features/leitura/api"
import { LivroDetail } from "@/features/leitura/components/livro-detail"

export default async function LivroPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // O backend responde 404 tanto para id inexistente quanto para livro de outro
  // usuário — os dois viram a mesma tela de "não encontrado".
  let dados
  try {
    dados = await Promise.all([obterLivro(id), listarRegistros(id)])
  } catch (erro) {
    if (erro instanceof ApiError && erro.status === 404) notFound()
    throw erro
  }

  const [livro, registros] = dados
  return <LivroDetail livro={livro} registros={registros} />
}
