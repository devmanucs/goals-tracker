import { diasEntre, HOJE } from "@/lib/dates"

export type FrequenciaHabito = "diaria" | "semanal" | "mensal"

export interface Habito {
  id: string
  nome: string
  unidade: string
  frequencia: FrequenciaHabito
  metaValor: number
  icone: "water" | "run" | "meditation" | "sleep"
}

export interface RegistroHabito {
  id: string
  habitoId: string
  data: string
  valor: number
}

export const FREQUENCIA_LABEL: Record<FrequenciaHabito, string> = {
  diaria: "por dia",
  semanal: "por semana",
  mensal: "por mês",
}

export const habitos: Habito[] = [
  { id: "h1", nome: "Beber água", unidade: "L", frequencia: "diaria", metaValor: 2, icone: "water" },
  { id: "h2", nome: "Correr", unidade: "km", frequencia: "semanal", metaValor: 15, icone: "run" },
  { id: "h3", nome: "Meditar", unidade: "min", frequencia: "diaria", metaValor: 10, icone: "meditation" },
]

export const registrosHabito: RegistroHabito[] = [
  { id: "rh1", habitoId: "h1", data: "2026-08-07", valor: 2.1 },
  { id: "rh2", habitoId: "h1", data: "2026-08-08", valor: 1.8 },
  { id: "rh3", habitoId: "h1", data: "2026-08-09", valor: 2.4 },
  { id: "rh4", habitoId: "h1", data: "2026-08-10", valor: 2 },
  { id: "rh5", habitoId: "h1", data: "2026-08-11", valor: 1.5 },
  { id: "rh6", habitoId: "h1", data: "2026-08-12", valor: 2.2 },
  { id: "rh7", habitoId: "h1", data: "2026-08-13", valor: 1.2 },
  { id: "rh8", habitoId: "h2", data: "2026-08-04", valor: 5 },
  { id: "rh9", habitoId: "h2", data: "2026-08-06", valor: 6 },
  { id: "rh10", habitoId: "h2", data: "2026-08-11", valor: 4 },
  { id: "rh11", habitoId: "h2", data: "2026-08-13", valor: 3 },
  { id: "rh12", habitoId: "h3", data: "2026-08-09", valor: 10 },
  { id: "rh13", habitoId: "h3", data: "2026-08-10", valor: 15 },
  { id: "rh14", habitoId: "h3", data: "2026-08-11", valor: 10 },
  { id: "rh15", habitoId: "h3", data: "2026-08-12", valor: 8 },
]

export function getHabitos() {
  return habitos
}

export function getHabito(id: string) {
  return habitos.find((h) => h.id === id)
}

export function getRegistrosDoHabito(habitoId: string) {
  return registrosHabito
    .filter((r) => r.habitoId === habitoId)
    .sort((a, b) => diasEntre(a.data, b.data))
}

function inicioDoPeriodo(habito: Habito) {
  const hoje = new Date(`${HOJE}T12:00:00`)
  if (habito.frequencia === "diaria") return HOJE
  if (habito.frequencia === "semanal") {
    const diaSemana = hoje.getDay()
    const diff = diaSemana === 0 ? 6 : diaSemana - 1
    const inicio = new Date(hoje)
    inicio.setDate(hoje.getDate() - diff)
    return inicio.toISOString().slice(0, 10)
  }
  return `${HOJE.slice(0, 7)}-01`
}

export function progressoPeriodoAtual(habitoId: string) {
  const habito = getHabito(habitoId)
  if (!habito) return { atual: 0, meta: 0, percentual: 0 }
  const inicio = inicioDoPeriodo(habito)
  const atual = getRegistrosDoHabito(habitoId)
    .filter((r) => diasEntre(inicio, r.data) >= 0 && diasEntre(r.data, HOJE) >= 0)
    .reduce((acc, r) => acc + r.valor, 0)
  return {
    atual: Math.round(atual * 10) / 10,
    meta: habito.metaValor,
    percentual: Math.min(100, Math.round((atual / habito.metaValor) * 100)),
  }
}

export function streakDoHabito(habitoId: string) {
  const habito = getHabito(habitoId)
  if (!habito || habito.frequencia !== "diaria") {
    return calcularStreakAgrupado(habitoId)
  }
  const registros = getRegistrosDoHabito(habitoId)
  const porData = new Map(registros.map((r) => [r.data, r.valor]))
  let streak = 0
  const cursor = new Date(`${HOJE}T12:00:00`)
  for (let i = 0; i < 365; i++) {
    const iso = cursor.toISOString().slice(0, 10)
    const valor = porData.get(iso) ?? 0
    if (valor >= habito.metaValor) {
      streak++
      cursor.setDate(cursor.getDate() - 1)
    } else {
      break
    }
  }
  return streak
}

function calcularStreakAgrupado(habitoId: string) {
  const habito = getHabito(habitoId)
  if (!habito) return 0
  const registros = getRegistrosDoHabito(habitoId)
  const totalPorSemana = new Map<string, number>()
  for (const r of registros) {
    const chave = r.data.slice(0, 7)
    totalPorSemana.set(chave, (totalPorSemana.get(chave) ?? 0) + r.valor)
  }
  return [...totalPorSemana.values()].filter((v) => v >= habito.metaValor).length
}
