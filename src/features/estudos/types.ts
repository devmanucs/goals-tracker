/**
 * Tipos e constantes do módulo de Estudos. Espelham o contrato da API
 * (ver docs/INTEGRACAO.md); os cálculos derivados viraram endpoint.
 */

export type StatusConcurso = "planejando" | "estudando" | "encerrado"
export type StatusTopico = "pendente" | "estudando" | "estudado" | "revisao"

export interface Concurso {
  id: string
  titulo: string
  banca: string
  dataProva: string
  status: StatusConcurso
  createdAt: string
  /** Derivados dos tópicos, já vêm prontos da API. */
  progresso: ProgressoConcurso
  diasAteProva: number
}

export interface TopicoEstudo {
  id: string
  concursoId: string
  titulo: string
  materia: string
  peso: number
  dataAgendada: string
  status: StatusTopico
}

/** GET /concursos/:id/progresso */
export interface ProgressoConcurso {
  total: number
  concluidos: number
  percentual: number
}

/** GET /concursos/:id/dias-ate-prova */
export interface DiasAteProva {
  dataProva: string
  dias: number
}

/** Um dia da visão calendário. */
export interface DiaDoCalendario {
  data: string
  total: number
  topicos: TopicoEstudo[]
}

/** GET /estudos/proximo-topico */
export type ProximoTopico =
  | (TopicoEstudo & {
      concurso: { id: string; titulo: string }
      emQuantosDias: number
    })
  | null

export const STATUS_TOPICO_LABEL: Record<StatusTopico, string> = {
  pendente: "Pendente",
  estudando: "Estudando",
  estudado: "Estudado",
  revisao: "Revisão",
}

export const STATUS_CONCURSO_LABEL: Record<StatusConcurso, string> = {
  planejando: "Planejando",
  estudando: "Estudando",
  encerrado: "Encerrado",
}

const CORES_MATERIA = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
]

/** Cor estável por matéria — puramente visual, por isso continua no front. */
export function corDaMateria(materia: string) {
  let hash = 0
  for (let i = 0; i < materia.length; i++) {
    hash = (hash * 31 + materia.charCodeAt(i)) >>> 0
  }
  return CORES_MATERIA[hash % CORES_MATERIA.length]
}
