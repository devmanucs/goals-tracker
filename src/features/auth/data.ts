import "server-only"

import { cache } from "react"
import { redirect } from "next/navigation"

import { api, ApiError } from "@/lib/api"
import { lerSessao } from "@/lib/sessao"
import type { Usuario } from "./types"

/**
 * Camada de acesso a dados da sessão.
 *
 * `cache` do React memoiza dentro de um mesmo render: o layout e a página podem
 * chamar `usuarioLogado()` sem virar duas requisições a /auth/me.
 */

/** Usuário logado, ou null. Não redireciona — use em tela pública. */
export const usuarioAtual = cache(async (): Promise<Usuario | null> => {
  const token = await lerSessao()
  if (!token) return null

  try {
    return await api.get<Usuario>("/auth/me")
  } catch (erro) {
    // Token expirado ou revogado por logout em outro dispositivo: trata como
    // deslogado em vez de estourar a tela.
    if (erro instanceof ApiError && erro.naoAutenticado) return null
    throw erro
  }
})

/**
 * Idem, mas exige sessão: manda para o /login se não houver.
 *
 * É esta função — e não o proxy.ts — que de fato protege os dados. O proxy só
 * olha se o cookie existe; aqui o token é validado contra o backend.
 */
export async function usuarioLogado(): Promise<Usuario> {
  const usuario = await usuarioAtual()
  if (!usuario) redirect("/login")
  return usuario
}
