import { NextResponse } from "next/server"

import { api, ApiError } from "@/lib/api"
import { lerSessao } from "@/lib/sessao"

/**
 * Proxy da busca no catálogo externo.
 *
 * Existe porque a busca é digitada, e portanto acontece no cliente — que não
 * pode falar com a API direto, já que o token vive num cookie httpOnly.
 */
export async function GET(request: Request) {
  if (!(await lerSessao())) {
    return NextResponse.json({ error: { message: "Não autenticado" } }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const termo = (searchParams.get("q") ?? "").trim()

  // O backend recusaria com 400; responder aqui evita a ida desnecessária.
  if (termo.length < 2) return NextResponse.json({ resultados: [] })

  const query = new URLSearchParams({ q: termo, limite: searchParams.get("limite") ?? "8" })

  try {
    return NextResponse.json(await api.get(`/livros/buscar-externo?${query}`))
  } catch (erro) {
    const status = erro instanceof ApiError ? erro.status : 503
    const message =
      erro instanceof ApiError ? erro.message : "Não foi possível buscar no catálogo"
    return NextResponse.json({ error: { message } }, { status })
  }
}
