import "server-only"

import { cookies } from "next/headers"

/**
 * A sessão é o JWT do backend guardado num cookie httpOnly.
 *
 * httpOnly de propósito: o token não fica acessível a JavaScript no navegador,
 * então um XSS não consegue lê-lo. É por isso que todas as chamadas à API saem
 * do servidor (Server Components e Server Actions) — o cliente nunca vê o token.
 */
const NOME_COOKIE = "gt_sessao"

/** Mesma validade do token emitido pelo backend (7 dias). */
const DURACAO_SEGUNDOS = 60 * 60 * 24 * 7

export async function lerSessao(): Promise<string | null> {
  const cookie = await cookies()
  return cookie.get(NOME_COOKIE)?.value ?? null
}

export async function gravarSessao(token: string) {
  const cookie = await cookies()
  cookie.set(NOME_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: DURACAO_SEGUNDOS,
  })
}

export async function apagarSessao() {
  const cookie = await cookies()
  cookie.delete(NOME_COOKIE)
}

/** Exportado para o proxy.ts, que checa só a presença do cookie. */
export const NOME_COOKIE_SESSAO = NOME_COOKIE
