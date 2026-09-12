import "server-only"

import { api } from "@/lib/api"
import type { Habito, RegistroHabito } from "./types"

export function listarHabitos() {
  return api.get<Habito[]>("/habitos")
}

export function obterHabito(id: string) {
  return api.get<Habito>(`/habitos/${id}`)
}

export function listarRegistros(habitoId: string) {
  return api.get<RegistroHabito[]>(`/habitos/${habitoId}/registros`)
}
