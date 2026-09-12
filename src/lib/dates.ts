// Data de referência fixa para os dados mockados (evita mismatch de hidratação
// e mantém os exemplos de streak/contagem regressiva consistentes).
export const HOJE = "2026-08-13"

export function hojeDate() {
  return new Date(`${HOJE}T12:00:00`)
}

export function parseDate(iso: string) {
  return new Date(`${iso}T12:00:00`)
}

export function diasEntre(a: string, b: string) {
  const ms = parseDate(b).getTime() - parseDate(a).getTime()
  return Math.round(ms / (1000 * 60 * 60 * 24))
}

/**
 * Comparador para `Array.sort`, do mais antigo para o mais recente.
 *
 * Não use `diasEntre` como comparador: ele devolve `b - a`, ou seja, ordena
 * ao contrário — e um `.at(-1)` depois disso devolve o registro mais ANTIGO
 * em vez do mais recente. Datas ISO ordenam corretamente como texto.
 */
export function compararDatas(a: string, b: string) {
  return a.localeCompare(b)
}

export function formatarData(iso: string, options?: Intl.DateTimeFormatOptions) {
  return parseDate(iso).toLocaleDateString("pt-BR", options ?? { day: "2-digit", month: "short" })
}

export function formatarDataCompleta(iso: string) {
  return parseDate(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })
}
