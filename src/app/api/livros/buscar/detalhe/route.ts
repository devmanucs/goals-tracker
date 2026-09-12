import { NextResponse } from "next/server"

import { api, ApiError } from "@/lib/api"
import { lerSessao } from "@/lib/sessao"

/** Detalhe de um livro do catálogo — é daqui que vem a sinopse. */
export async function GET(request: Request) {
  if (!(await lerSessao())) {
    return NextResponse.json({ error: { message: "Não autenticado" } }, { status: 401 })
  }

  const chave = new URL(request.url).searchParams.get("chave")
  if (!chave) {
    return NextResponse.json(
      { error: { message: "Informe a chave do livro" } },
      { status: 400 },
    )
  }

  const query = new URLSearchParams({ chave })

  try {
    return NextResponse.json(await api.get(`/livros/buscar-externo/detalhe?${query}`))
  } catch (erro) {
    const status = erro instanceof ApiError ? erro.status : 503
    const message =
      erro instanceof ApiError ? erro.message : "Não foi possível carregar o livro"
    return NextResponse.json({ error: { message } }, { status })
  }
}
