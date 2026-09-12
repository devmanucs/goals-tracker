/** Resposta de GET /retrospectiva?meses=N. */
export interface Retrospectiva {
  meses: number
  paginasLidasPorMes: { mes: string; paginas: number }[]
  topicosEstudadosPorMes: { mes: string; topicos: number }[]
  habitosConcluidosPorMes: { mes: string; percentual: number }[]
  resumo: {
    livrosLidos: number
    paginasLidas: number
    topicosEstudados: number
    maiorStreak: number
  }
}
