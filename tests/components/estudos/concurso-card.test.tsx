import { render, screen } from "@testing-library/react"

import { ConcursoCard } from "@/features/estudos/components/concurso-card"
import type { Concurso } from "@/features/estudos/types"

function concurso(overrides: Partial<Concurso> = {}): Concurso {
  return {
    id: "c1",
    titulo: "Analista Judiciário — TRT",
    banca: "FGV",
    dataProva: "2026-11-22",
    status: "estudando",
    createdAt: "2026-08-01T00:00:00.000Z",
    progresso: { total: 10, concluidos: 4, percentual: 40 },
    diasAteProva: 91,
    ...overrides,
  }
}

describe("ConcursoCard", () => {
  it("mostra título, banca e rótulo do status", () => {
    render(<ConcursoCard concurso={concurso()} />)

    expect(screen.getByText("Analista Judiciário — TRT")).toBeInTheDocument()
    expect(screen.getByText("Banca: FGV")).toBeInTheDocument()
    expect(screen.getByText("Estudando")).toBeInTheDocument()
  })

  it("leva para o detalhe do concurso", () => {
    render(<ConcursoCard concurso={concurso()} />)
    expect(screen.getByRole("link")).toHaveAttribute("href", "/estudos/c1")
  })

  it("mostra o progresso que veio da API", () => {
    render(<ConcursoCard concurso={concurso({ progresso: { total: 10, concluidos: 4, percentual: 40 } })} />)
    expect(screen.getByText("40%")).toBeInTheDocument()
  })

  it("mostra a contagem regressiva quando a prova ainda vem", () => {
    render(<ConcursoCard concurso={concurso({ diasAteProva: 91 })} />)
    expect(screen.getByText(/faltam 91 dias/)).toBeInTheDocument()
  })

  it("omite a contagem quando a prova já passou", () => {
    render(<ConcursoCard concurso={concurso({ diasAteProva: -3 })} />)
    expect(screen.queryByText(/faltam/)).not.toBeInTheDocument()
  })

  it("mostra a contagem no dia da prova", () => {
    render(<ConcursoCard concurso={concurso({ diasAteProva: 0 })} />)
    expect(screen.getByText(/faltam 0 dias/)).toBeInTheDocument()
  })

  it("mostra 0% em concurso sem tópico, sem quebrar", () => {
    render(<ConcursoCard concurso={concurso({ progresso: { total: 0, concluidos: 0, percentual: 0 } })} />)
    expect(screen.getByText("0%")).toBeInTheDocument()
  })
})
