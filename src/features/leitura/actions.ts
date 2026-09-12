"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

import { api, ApiError } from "@/lib/api"
import { CORES_CAPA } from "./types"

/**
 * Mutações do módulo. Toda escrita passa por aqui: é o único caminho em que o
 * cookie httpOnly é lido e o token chega à API.
 */

export interface EstadoDaAcao {
  ok?: boolean
  mensagem?: string
  erros?: Record<string, string>
}

/** Traduz falha de validação (zod local ou issues do backend) em erro por campo. */
function comoErro(erro: unknown): EstadoDaAcao {
  if (erro instanceof ApiError) {
    const erros: Record<string, string> = {}
    for (const issue of erro.issues ?? []) {
      if (!erros[issue.campo]) erros[issue.campo] = issue.mensagem
    }
    return {
      mensagem: erro.message,
      ...(Object.keys(erros).length ? { erros } : {}),
    }
  }
  return { mensagem: "Não foi possível conectar à API. Ela está rodando?" }
}

function deZod(erro: z.ZodError): EstadoDaAcao {
  const erros: Record<string, string> = {}
  for (const issue of erro.issues) {
    const campo = String(issue.path[0])
    if (!erros[campo]) erros[campo] = issue.message
  }
  return { erros }
}

const livroSchema = z.object({
  titulo: z.string().min(1, "O título é obrigatório"),
  autor: z.string().min(1, "O autor é obrigatório"),
  totalPaginas: z.coerce
    .number()
    .int("Use um número inteiro")
    .positive("O total de páginas deve ser maior que zero"),
  status: z.enum(["quero_ler", "lendo", "lido", "abandonado"]),
})

export async function criarLivro(
  _anterior: EstadoDaAcao,
  formData: FormData,
): Promise<EstadoDaAcao> {
  const validacao = livroSchema.safeParse({
    titulo: formData.get("titulo"),
    autor: formData.get("autor"),
    totalPaginas: formData.get("totalPaginas"),
    status: formData.get("status"),
  })

  if (!validacao.success) return deZod(validacao.error)

  try {
    await api.post("/livros", {
      ...validacao.data,
      // Cor sorteada na criação; depois fica fixa no registro.
      corCapa: CORES_CAPA[Math.floor(Math.random() * CORES_CAPA.length)],
    })
  } catch (erro) {
    return comoErro(erro)
  }

  revalidatePath("/leitura")
  revalidatePath("/")
  return { ok: true }
}

export async function atualizarStatusDoLivro(id: string, status: string) {
  try {
    await api.patch(`/livros/${id}`, { status })
  } catch (erro) {
    return comoErro(erro)
  }

  revalidatePath("/leitura")
  revalidatePath(`/leitura/${id}`)
  revalidatePath("/")
  return { ok: true }
}

export async function deletarLivro(id: string) {
  try {
    await api.delete(`/livros/${id}`)
  } catch (erro) {
    return comoErro(erro)
  }

  revalidatePath("/leitura")
  revalidatePath("/")
  redirect("/leitura")
}

const registroSchema = z.object({
  data: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Informe uma data válida"),
  paginaAtual: z.coerce
    .number()
    .int("Use um número inteiro")
    .min(0, "A página não pode ser negativa"),
  observacao: z.string().trim().max(500).optional(),
})

export async function registrarProgresso(
  livroId: string,
  _anterior: EstadoDaAcao,
  formData: FormData,
): Promise<EstadoDaAcao> {
  const observacao = String(formData.get("observacao") ?? "").trim()

  const validacao = registroSchema.safeParse({
    data: formData.get("data"),
    paginaAtual: formData.get("paginaAtual"),
    ...(observacao ? { observacao } : {}),
  })

  if (!validacao.success) return deZod(validacao.error)

  try {
    await api.post(`/livros/${livroId}/registros`, validacao.data)
  } catch (erro) {
    return comoErro(erro)
  }

  revalidatePath(`/leitura/${livroId}`)
  revalidatePath("/leitura")
  revalidatePath("/")
  return { ok: true }
}

export async function deletarRegistro(id: string, livroId: string) {
  try {
    await api.delete(`/registros-leitura/${id}`)
  } catch (erro) {
    return comoErro(erro)
  }

  revalidatePath(`/leitura/${livroId}`)
  revalidatePath("/leitura")
  return { ok: true }
}
