import "server-only"

import { api } from "@/lib/api"
import type {
  Concurso,
  DiaDoCalendario,
  DiasAteProva,
  ProgressoConcurso,
  ProximoTopico,
  TopicoEstudo,
} from "./types"

export function listarConcursos() {
  return api.get<Concurso[]>("/concursos")
}

export function obterConcurso(id: string) {
  return api.get<Concurso>(`/concursos/${id}`)
}

/** `ordenarPor=peso` traz os tópicos mais pesados primeiro. */
export function listarTopicos(concursoId: string, ordenarPor: "peso" | "data" = "data") {
  return api.get<TopicoEstudo[]>(`/concursos/${concursoId}/topicos?ordenarPor=${ordenarPor}`)
}

export function progressoDoConcurso(concursoId: string) {
  return api.get<ProgressoConcurso>(`/concursos/${concursoId}/progresso`)
}

export function diasAteProva(concursoId: string) {
  return api.get<DiasAteProva>(`/concursos/${concursoId}/dias-ate-prova`)
}

export function calendarioDoConcurso(concursoId: string) {
  return api.get<DiaDoCalendario[]>(`/concursos/${concursoId}/calendario`)
}

export function proximoTopico() {
  return api.get<ProximoTopico>("/estudos/proximo-topico")
}
