import "server-only"

import { lerSessao } from "@/lib/sessao"

/**
 * Cliente HTTP da API (repo goals-tracker-back).
 *
 * Roda só no servidor: é ele que lê o cookie httpOnly e monta o header
 * Authorization. Nenhum componente de cliente chama a API direto — quem precisa
 * mutar dados passa por uma Server Action.
 */
const BASE_URL = process.env.API_URL ?? "http://localhost:3333"

/** Formato de erro do backend: `{ error: { message, code?, issues? } }`. */
interface CorpoDeErro {
  error?: {
    message?: string
    code?: string
    issues?: { campo: string; mensagem: string }[]
  }
}

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code?: string,
    readonly issues?: { campo: string; mensagem: string }[],
  ) {
    super(message)
    this.name = "ApiError"
  }

  /** 401 = token ausente, inválido ou revogado por logout. */
  get naoAutenticado() {
    return this.status === 401
  }
}

type Opcoes = Omit<RequestInit, "body"> & {
  body?: unknown
  /** Por padrão nada é cacheado: os dados são por usuário e mudam a cada ação. */
  cache?: RequestCache
}

async function requisitar<T>(caminho: string, opcoes: Opcoes = {}): Promise<T> {
  const { body, headers, ...resto } = opcoes
  const token = await lerSessao()

  const resposta = await fetch(`${BASE_URL}${caminho}`, {
    ...resto,
    cache: opcoes.cache ?? "no-store",
    headers: {
      Accept: "application/json",
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  })

  // 204 (deletes e logout) não tem corpo para parsear.
  if (resposta.status === 204) return undefined as T

  const texto = await resposta.text()
  const dados = texto ? JSON.parse(texto) : null

  if (!resposta.ok) {
    const erro = (dados ?? {}) as CorpoDeErro
    throw new ApiError(
      erro.error?.message ?? "Não foi possível completar a operação",
      resposta.status,
      erro.error?.code,
      erro.error?.issues,
    )
  }

  return dados as T
}

export const api = {
  get: <T>(caminho: string, opcoes?: Opcoes) =>
    requisitar<T>(caminho, { ...opcoes, method: "GET" }),

  post: <T>(caminho: string, body?: unknown, opcoes?: Opcoes) =>
    requisitar<T>(caminho, { ...opcoes, method: "POST", body }),

  patch: <T>(caminho: string, body?: unknown, opcoes?: Opcoes) =>
    requisitar<T>(caminho, { ...opcoes, method: "PATCH", body }),

  delete: <T>(caminho: string, opcoes?: Opcoes) =>
    requisitar<T>(caminho, { ...opcoes, method: "DELETE" }),
}
