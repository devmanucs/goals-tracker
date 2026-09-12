import type { Livro } from "@/features/leitura/types"
import type { StatusTopico } from "@/features/estudos/types"
import type { Habito } from "@/features/habitos/types"

/** Resposta de GET /dashboard — uma requisição para a tela inteira. */
export interface ResumoDashboard {
  leitura: {
    livroAtual: Livro | null
    livrosLidos: number
    paginasLidasTotal: number
    ritmoMedioDiario: number
  }
  estudos: {
    proximoTopico:
      | {
          id: string
          titulo: string
          materia: string
          peso: number
          dataAgendada: string
          status: StatusTopico
          concurso: {
            id: string
            titulo: string
            dataProva: string
            diasAteProva: number
          }
          emQuantosDias: number
        }
      | null
    concursosAtivos: number
  }
  habitos: {
    total: number
    lista: Habito[]
    comStreakAtivo: number
    metasBatidasNoPeriodo: number
  }
}
