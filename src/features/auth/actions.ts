"use server"

import { redirect } from "next/navigation"

import { api, ApiError } from "@/lib/api"
import { apagarSessao, gravarSessao } from "@/lib/sessao"
import { entrarSchema, registrarSchema } from "./schema"

/**
 * Estado devolvido pelas actions para o `useActionState` do formulário.
 * `erros` é por campo; `mensagem` é o erro geral (credencial inválida, API fora).
 */
export interface EstadoDoFormulario {
  mensagem?: string
  erros?: Record<string, string>
}

/** Converte issues do zod (client) ou do backend no mesmo formato por campo. */
function porCampo(issues: { campo: string; mensagem: string }[]) {
  const erros: Record<string, string> = {}
  for (const issue of issues) {
    if (!erros[issue.campo]) erros[issue.campo] = issue.mensagem
  }
  return erros
}

export async function entrar(
  _anterior: EstadoDoFormulario,
  formData: FormData,
): Promise<EstadoDoFormulario> {
  const validacao = entrarSchema.safeParse({
    email: formData.get("email"),
    senha: formData.get("senha"),
  })

  if (!validacao.success) {
    return {
      erros: porCampo(
        validacao.error.issues.map((i) => ({
          campo: String(i.path[0]),
          mensagem: i.message,
        })),
      ),
    }
  }

  try {
    const { token } = await api.post<{ token: string }>("/auth/login", validacao.data)
    await gravarSessao(token)
  } catch (erro) {
    if (erro instanceof ApiError) {
      return {
        mensagem: erro.message,
        ...(erro.issues ? { erros: porCampo(erro.issues) } : {}),
      }
    }
    return { mensagem: "Não foi possível conectar à API. Ela está rodando?" }
  }

  // Fora do try: redirect funciona lançando uma exceção, que o catch engoliria.
  redirect("/")
}

export async function registrar(
  _anterior: EstadoDoFormulario,
  formData: FormData,
): Promise<EstadoDoFormulario> {
  const validacao = registrarSchema.safeParse({
    nome: formData.get("nome"),
    email: formData.get("email"),
    senha: formData.get("senha"),
  })

  if (!validacao.success) {
    return {
      erros: porCampo(
        validacao.error.issues.map((i) => ({
          campo: String(i.path[0]),
          mensagem: i.message,
        })),
      ),
    }
  }

  try {
    // O backend não devolve token no registro, então já emendamos o login.
    await api.post("/auth/register", validacao.data)
    const { token } = await api.post<{ token: string }>("/auth/login", {
      email: validacao.data.email,
      senha: validacao.data.senha,
    })
    await gravarSessao(token)
  } catch (erro) {
    if (erro instanceof ApiError) {
      return {
        mensagem: erro.message,
        ...(erro.issues ? { erros: porCampo(erro.issues) } : {}),
      }
    }
    return { mensagem: "Não foi possível conectar à API. Ela está rodando?" }
  }

  redirect("/")
}

export async function sair() {
  try {
    // Revoga o token no backend; sem isso ele seguiria válido por 7 dias.
    await api.post("/auth/logout")
  } catch {
    // Se o token já estava inválido, o logout local basta.
  }

  await apagarSessao()
  redirect("/login")
}
