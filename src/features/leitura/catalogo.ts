/** Tipos e chamadas da busca no catálogo externo, do lado do cliente. */

export interface LivroDoCatalogo {
  chave: string
  titulo: string
  autor: string | null
  totalPaginas: number | null
  capaUrl: string | null
  anoPublicacao: number | null
  isbn: string | null
}

export interface DetalheDoCatalogo extends LivroDoCatalogo {
  sinopse: string | null
  assuntos: string[]
}

interface RespostaDaBusca {
  fonte: string
  cache: boolean
  resultados: LivroDoCatalogo[]
}

async function lerErro(resposta: Response, padrao: string) {
  try {
    const corpo = (await resposta.json()) as { error?: { message?: string } }
    return corpo.error?.message ?? padrao
  } catch {
    return padrao
  }
}

export async function buscarNoCatalogo(termo: string): Promise<LivroDoCatalogo[]> {
  const resposta = await fetch(`/api/livros/buscar?q=${encodeURIComponent(termo)}`)

  if (!resposta.ok) {
    throw new Error(await lerErro(resposta, "Não foi possível buscar no catálogo"))
  }

  const dados = (await resposta.json()) as Partial<RespostaDaBusca>
  return dados.resultados ?? []
}

export async function detalharDoCatalogo(chave: string): Promise<DetalheDoCatalogo> {
  const resposta = await fetch(
    `/api/livros/buscar/detalhe?chave=${encodeURIComponent(chave)}`,
  )

  if (!resposta.ok) {
    throw new Error(await lerErro(resposta, "Não foi possível carregar o livro"))
  }

  return (await resposta.json()) as DetalheDoCatalogo
}
