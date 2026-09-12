import { NextResponse } from "next/server"

import { api, ApiError } from "@/lib/api"
import { lerSessao } from "@/lib/sessao"
import type { Concurso } from "@/features/estudos/types"
import type { Habito } from "@/features/habitos/types"
import type { Livro } from "@/features/leitura/types"

/**
 * Índice da busca do Ctrl K.
 *
 * Existe como Route Handler porque a paleta é um componente de cliente e não
 * pode falar com a API direto — o token vive num cookie httpOnly. Carregado sob
 * demanda, na primeira vez que a paleta abre, para não pesar em toda navegação.
 */
export async function GET() {
  if (!(await lerSessao())) {
    return NextResponse.json({ error: { message: "Não autenticado" } }, { status: 401 })
  }

  try {
    const [livros, concursos, habitos] = await Promise.all([
      api.get<Livro[]>("/livros"),
      api.get<Concurso[]>("/concursos"),
      api.get<Habito[]>("/habitos"),
    ])

    return NextResponse.json({
      livros: livros.map((l) => ({ id: l.id, titulo: l.titulo, autor: l.autor })),
      concursos: concursos.map((c) => ({ id: c.id, titulo: c.titulo, banca: c.banca })),
      habitos: habitos.map((h) => ({ id: h.id, nome: h.nome })),
    })
  } catch (erro) {
    const status = erro instanceof ApiError ? erro.status : 500
    return NextResponse.json(
      { error: { message: "Não foi possível carregar a busca" } },
      { status },
    )
  }
}
