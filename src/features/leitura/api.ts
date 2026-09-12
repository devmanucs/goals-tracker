import "server-only"

import { api } from "@/lib/api"
import type {
  EstatisticasLeitura,
  Livro,
  RegistroLeitura,
  StatusLivro,
} from "./types"

/** Leituras da API do módulo. Só rodam no servidor. */

export function listarLivros(status?: StatusLivro) {
  const query = status ? `?status=${status}` : ""
  return api.get<Livro[]>(`/livros${query}`)
}

export function obterLivro(id: string) {
  return api.get<Livro>(`/livros/${id}`)
}

export function listarRegistros(livroId: string) {
  return api.get<RegistroLeitura[]>(`/livros/${livroId}/registros`)
}

export function estatisticasLeitura() {
  return api.get<EstatisticasLeitura>("/leitura/estatisticas")
}
