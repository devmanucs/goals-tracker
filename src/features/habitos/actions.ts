"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

import { api, ApiError } from "@/lib/api"

export interface EstadoDaAcao {
  ok?: boolean
  mensagem?: string
  erros?: Record<string, string>
}

function comoErro(erro: unknown): EstadoDaAcao {
  if (erro instanceof ApiError) {
    const erros: Record<string, string> = {}
    for (const issue of erro.issues ?? []) {
      if (!erros[issue.campo]) erros[issue.campo] = issue.mensagem
    }
    return { mensagem: erro.message, ...(Object.keys(erros).length ? { erros } : {}) }
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

const habitoSchema = z.object({
  nome: z.string().min(1, "O nome é obrigatório"),
  unidade: z.string().min(1, "Informe a unidade (L, km, min...)").max(20),
  frequencia: z.enum(["diaria", "semanal", "mensal"]),
  metaValor: z.coerce.number().positive("A meta deve ser maior que zero"),
  icone: z.string().max(40).optional(),
})

export async function criarHabito(
  _anterior: EstadoDaAcao,
  formData: FormData,
): Promise<EstadoDaAcao> {
  const icone = String(formData.get("icone") ?? "")

  const validacao = habitoSchema.safeParse({
    nome: formData.get("nome"),
    unidade: formData.get("unidade"),
    frequencia: formData.get("frequencia"),
    metaValor: formData.get("metaValor"),
    ...(icone ? { icone } : {}),
  })

  if (!validacao.success) return deZod(validacao.error)

  try {
    await api.post("/habitos", validacao.data)
  } catch (erro) {
    return comoErro(erro)
  }

  revalidatePath("/habitos")
  revalidatePath("/")
  return { ok: true }
}

export async function deletarHabito(id: string) {
  try {
    await api.delete(`/habitos/${id}`)
  } catch (erro) {
    return comoErro(erro)
  }

  revalidatePath("/habitos")
  revalidatePath("/")
  redirect("/habitos")
}

const registroSchema = z.object({
  data: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Informe uma data válida"),
  valor: z.coerce.number().min(0, "O valor não pode ser negativo"),
})

export async function registrarValor(
  habitoId: string,
  _anterior: EstadoDaAcao,
  formData: FormData,
): Promise<EstadoDaAcao> {
  const validacao = registroSchema.safeParse({
    data: formData.get("data"),
    valor: formData.get("valor"),
  })

  if (!validacao.success) return deZod(validacao.error)

  try {
    await api.post(`/habitos/${habitoId}/registros`, validacao.data)
  } catch (erro) {
    return comoErro(erro)
  }

  revalidatePath(`/habitos/${habitoId}`)
  revalidatePath("/habitos")
  revalidatePath("/")
  return { ok: true }
}
