/**
 * Tipos e constantes do módulo de Hábitos. Streak e progresso agora são
 * calculados pelo backend (ver docs/INTEGRACAO.md) — aqui fica só apresentação.
 */

export type FrequenciaHabito = "diaria" | "semanal" | "mensal"

export interface RegistroHabito {
  id: string
  habitoId: string
  data: string
  valor: number
}

/** Registro no formato enxuto que a listagem devolve junto do hábito. */
export interface RegistroRecente {
  data: string
  valor: number
}

export interface ProgressoPeriodo {
  inicio: string
  fim: string
  atual: number
  meta: number
  percentual: number
  batido: boolean
}

export interface Streak {
  atual: number
  /** Se o período vigente já bateu a meta — ele não derruba o streak enquanto corre. */
  periodoAtualBatido: boolean
  recorde: number
}

export interface Habito {
  id: string
  nome: string
  unidade: string
  frequencia: FrequenciaHabito
  metaValor: number
  icone: string | null
  createdAt: string
  /** Derivados, já vêm prontos da API. */
  progresso: ProgressoPeriodo
  streak: Streak
  registrosRecentes: RegistroRecente[]
}

export const FREQUENCIA_LABEL: Record<FrequenciaHabito, string> = {
  diaria: "por dia",
  semanal: "por semana",
  mensal: "por mês",
}

export const ICONES_HABITO = ["water", "run", "meditation", "sleep"] as const

/**
 * Intensidade de um dia no heatmap. É math de apresentação (quanto do dia
 * "acendeu"), por isso continua no frontend: a meta de um hábito semanal é
 * rateada pelos 7 dias só para colorir a célula.
 */
export function progressoDoDia(
  habito: Pick<Habito, "frequencia" | "metaValor">,
  registros: RegistroRecente[],
  data: string,
) {
  const valor = registros
    .filter((r) => r.data === data)
    .reduce((acc, r) => acc + r.valor, 0)

  const referencia =
    habito.frequencia === "diaria"
      ? habito.metaValor
      : habito.frequencia === "semanal"
        ? habito.metaValor / 7
        : habito.metaValor / 30

  return { valor, percentual: referencia > 0 ? Math.min(1, valor / referencia) : 0 }
}
