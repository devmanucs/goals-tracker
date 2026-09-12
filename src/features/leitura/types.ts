/**
 * Tipos e constantes do módulo de Leitura.
 *
 * Os tipos espelham o que a API devolve (ver docs/INTEGRACAO.md). O cálculo que
 * antes vivia em data.ts virou endpoint — quem manda nos números é o backend.
 */

export type StatusLivro = "quero_ler" | "lendo" | "lido" | "abandonado"

export interface Livro {
  id: string
  titulo: string
  autor: string
  totalPaginas: number
  status: StatusLivro
  corCapa: string | null
  /** Preenchidos pela busca no catálogo; nulos num cadastro manual. */
  capaUrl: string | null
  sinopse: string | null
  isbn: string | null
  anoPublicacao: number | null
  createdAt: string
  /** Derivados do registro mais recente, já vêm prontos da API. */
  paginaAtual: number
  percentual: number
  ultimaLeitura: string | null
}

export interface RegistroLeitura {
  id: string
  livroId: string
  data: string
  paginaAtual: number
  observacao: string | null
}

export interface EstatisticasLeitura {
  livrosLidos: number
  livrosLendo: number
  livrosQueroLer: number
  livrosAbandonados: number
  paginasLidasTotal: number
  ritmoMedioDiario: number
  diasComRegistro: number
  periodo: { de: string | null; ate: string | null } | null
}

export const STATUS_LIVRO_LABEL: Record<StatusLivro, string> = {
  quero_ler: "Quero ler",
  lendo: "Lendo",
  lido: "Lido",
  abandonado: "Abandonado",
}

export const META_ANUAL_LEITURA = 12

/** Paleta das capas — as mesmas cores de gráfico do tema (ver docs/DESIGN.md). */
export const CORES_CAPA = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
]

/** Cor estável a partir do título, para livro sem corCapa definida. */
export function corDaCapa(livro: Pick<Livro, "titulo" | "corCapa">) {
  if (livro.corCapa) return livro.corCapa

  let hash = 0
  for (let i = 0; i < livro.titulo.length; i++) {
    hash = (hash * 31 + livro.titulo.charCodeAt(i)) >>> 0
  }
  return CORES_CAPA[hash % CORES_CAPA.length]
}
