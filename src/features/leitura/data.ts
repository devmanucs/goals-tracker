import { diasEntre, HOJE } from "@/lib/dates"

export const META_ANUAL_LEITURA = 12

export type StatusLivro = "quero_ler" | "lendo" | "lido" | "abandonado"

export interface Livro {
  id: string
  titulo: string
  autor: string
  totalPaginas: number
  status: StatusLivro
  corCapa: string
}

export interface RegistroLeitura {
  id: string
  livroId: string
  data: string
  paginaAtual: number
  observacao?: string
}

export const STATUS_LIVRO_LABEL: Record<StatusLivro, string> = {
  quero_ler: "Quero ler",
  lendo: "Lendo",
  lido: "Lido",
  abandonado: "Abandonado",
}

export const livros: Livro[] = [
  {
    id: "l1",
    titulo: "A Hora da Estrela",
    autor: "Clarice Lispector",
    totalPaginas: 96,
    status: "lendo",
    corCapa: "var(--chart-3)",
  },
  {
    id: "l2",
    titulo: "Duna",
    autor: "Frank Herbert",
    totalPaginas: 688,
    status: "lendo",
    corCapa: "var(--chart-1)",
  },
  {
    id: "l3",
    titulo: "Torto Arado",
    autor: "Itamar Vieira Junior",
    totalPaginas: 264,
    status: "lido",
    corCapa: "var(--chart-4)",
  },
  {
    id: "l4",
    titulo: "O Nome do Vento",
    autor: "Patrick Rothfuss",
    totalPaginas: 662,
    status: "lido",
    corCapa: "var(--chart-2)",
  },
  {
    id: "l5",
    titulo: "Sapiens",
    autor: "Yuval Noah Harari",
    totalPaginas: 464,
    status: "quero_ler",
    corCapa: "var(--chart-5)",
  },
  {
    id: "l6",
    titulo: "O Guia do Mochileiro das Galáxias",
    autor: "Douglas Adams",
    totalPaginas: 224,
    status: "abandonado",
    corCapa: "var(--chart-3)",
  },
]

export const registrosLeitura: RegistroLeitura[] = [
  { id: "r1", livroId: "l1", data: "2026-08-02", paginaAtual: 20 },
  { id: "r2", livroId: "l1", data: "2026-08-05", paginaAtual: 41 },
  { id: "r3", livroId: "l1", data: "2026-08-09", paginaAtual: 68 },
  { id: "r4", livroId: "l1", data: "2026-08-12", paginaAtual: 84, observacao: "Quase terminando, reta final ótima." },
  { id: "r5", livroId: "l2", data: "2026-07-20", paginaAtual: 60 },
  { id: "r6", livroId: "l2", data: "2026-07-28", paginaAtual: 145 },
  { id: "r7", livroId: "l2", data: "2026-08-04", paginaAtual: 210 },
  { id: "r8", livroId: "l2", data: "2026-08-11", paginaAtual: 268 },
  { id: "r9", livroId: "l3", data: "2026-06-10", paginaAtual: 90 },
  { id: "r10", livroId: "l3", data: "2026-06-18", paginaAtual: 190 },
  { id: "r11", livroId: "l3", data: "2026-06-25", paginaAtual: 264, observacao: "Terminado! Livro incrível." },
  { id: "r12", livroId: "l4", data: "2026-05-02", paginaAtual: 300 },
  { id: "r13", livroId: "l4", data: "2026-05-14", paginaAtual: 520 },
  { id: "r14", livroId: "l4", data: "2026-05-22", paginaAtual: 662 },
]

export function getLivros() {
  return livros
}

export function getLivro(id: string) {
  return livros.find((l) => l.id === id)
}

export function getRegistrosDoLivro(livroId: string) {
  return registrosLeitura
    .filter((r) => r.livroId === livroId)
    .sort((a, b) => diasEntre(a.data, b.data))
}

export function paginaAtualDoLivro(livroId: string) {
  const registros = getRegistrosDoLivro(livroId)
  return registros.at(-1)?.paginaAtual ?? 0
}

export function livrosLidosNoAno(ano = HOJE.slice(0, 4)) {
  return livros.filter((l) => {
    if (l.status !== "lido") return false
    const ultima = getRegistrosDoLivro(l.id).at(-1)?.data
    return ultima ? ultima.slice(0, 4) === ano : true
  }).length
}

export function livroEmAndamento() {
  return livros.find((l) => l.status === "lendo")
}

export function estatisticasLeitura() {
  const totalPaginasLidas = livros.reduce((acc, l) => acc + paginaAtualDoLivro(l.id), 0)

  const diasComRegistro = new Set(registrosLeitura.map((r) => r.data)).size
  const totalPaginasRegistradas = registrosLeitura.reduce((acc, r, _i, arr) => {
    const anterior = [...arr]
      .filter((o) => o.livroId === r.livroId && o.data < r.data)
      .sort((a, b) => diasEntre(a.data, b.data))
      .at(-1)
    const delta = r.paginaAtual - (anterior?.paginaAtual ?? 0)
    return acc + Math.max(delta, 0)
  }, 0)

  return {
    livrosLidos: livros.filter((l) => l.status === "lido").length,
    livrosLendo: livros.filter((l) => l.status === "lendo").length,
    paginasLidasTotal: totalPaginasLidas,
    ritmoMedioDiario: Math.round((totalPaginasRegistradas / Math.max(diasComRegistro, 1)) * 10) / 10,
  }
}
