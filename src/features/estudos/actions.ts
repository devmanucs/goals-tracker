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

const dataISO = (mensagem: string) => z.string().regex(/^\d{4}-\d{2}-\d{2}$/, mensagem)

const concursoSchema = z.object({
  titulo: z.string().min(1, "O título é obrigatório"),
  banca: z.string().min(1, "A banca é obrigatória"),
  dataProva: dataISO("Informe a data da prova"),
  status: z.enum(["planejando", "estudando", "encerrado"]),
})

export async function criarConcurso(
  _anterior: EstadoDaAcao,
  formData: FormData,
): Promise<EstadoDaAcao> {
  const validacao = concursoSchema.safeParse({
    titulo: formData.get("titulo"),
    banca: formData.get("banca"),
    dataProva: formData.get("dataProva"),
    status: formData.get("status"),
  })

  if (!validacao.success) return deZod(validacao.error)

  try {
    await api.post("/concursos", validacao.data)
  } catch (erro) {
    return comoErro(erro)
  }

  revalidatePath("/estudos")
  revalidatePath("/")
  return { ok: true }
}

export async function deletarConcurso(id: string) {
  try {
    await api.delete(`/concursos/${id}`)
  } catch (erro) {
    return comoErro(erro)
  }

  revalidatePath("/estudos")
  revalidatePath("/")
  redirect("/estudos")
}

const topicoSchema = z.object({
  titulo: z.string().min(1, "O título é obrigatório"),
  materia: z.string().min(1, "A matéria é obrigatória"),
  peso: z.coerce.number().int().min(1, "O peso vai de 1 a 10").max(10, "O peso vai de 1 a 10"),
  dataAgendada: dataISO("Informe a data agendada"),
  status: z.enum(["pendente", "estudando", "estudado", "revisao"]),
})

export async function criarTopico(
  concursoId: string,
  _anterior: EstadoDaAcao,
  formData: FormData,
): Promise<EstadoDaAcao> {
  const validacao = topicoSchema.safeParse({
    titulo: formData.get("titulo"),
    materia: formData.get("materia"),
    peso: formData.get("peso"),
    dataAgendada: formData.get("dataAgendada"),
    status: formData.get("status"),
  })

  if (!validacao.success) return deZod(validacao.error)

  try {
    await api.post(`/concursos/${concursoId}/topicos`, validacao.data)
  } catch (erro) {
    return comoErro(erro)
  }

  revalidatePath(`/estudos/${concursoId}`)
  revalidatePath("/")
  return { ok: true }
}

/** Usado pela tabela de tópicos para marcar pendente/estudando/estudado/revisão. */
export async function atualizarStatusDoTopico(
  id: string,
  concursoId: string,
  status: string,
) {
  try {
    await api.patch(`/topicos/${id}`, { status })
  } catch (erro) {
    return comoErro(erro)
  }

  revalidatePath(`/estudos/${concursoId}`)
  revalidatePath("/")
  return { ok: true }
}

export async function deletarTopico(id: string, concursoId: string) {
  try {
    await api.delete(`/topicos/${id}`)
  } catch (erro) {
    return comoErro(erro)
  }

  revalidatePath(`/estudos/${concursoId}`)
  revalidatePath("/")
  return { ok: true }
}
