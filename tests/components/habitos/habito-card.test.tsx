import { render, screen } from "@testing-library/react"

import { HabitoCard } from "@/features/habitos/components/habito-card"
import type { Habito } from "@/features/habitos/types"

function habito(overrides: Partial<Habito> = {}): Habito {
  return {
    id: "h1",
    nome: "Beber água",
    unidade: "L",
    frequencia: "diaria",
    metaValor: 2,
    icone: "water",
    createdAt: "2026-08-01T00:00:00.000Z",
    progresso: {
      inicio: "2026-08-13",
      fim: "2026-08-13",
      atual: 1.2,
      meta: 2,
      percentual: 60,
      batido: false,
    },
    streak: { atual: 3, periodoAtualBatido: false, recorde: 7 },
    registrosRecentes: [],
    ...overrides,
  }
}

describe("HabitoCard", () => {
  it("mostra nome, meta e unidade", () => {
    render(<HabitoCard habito={habito()} />)

    expect(screen.getByText("Beber água")).toBeInTheDocument()
    expect(screen.getByText("2 L por dia")).toBeInTheDocument()
  })

  it("leva para o detalhe do hábito", () => {
    render(<HabitoCard habito={habito()} />)
    expect(screen.getByRole("link")).toHaveAttribute("href", "/habitos/h1")
  })

  it("mostra o streak atual, e não o recorde", () => {
    render(<HabitoCard habito={habito({ streak: { atual: 3, periodoAtualBatido: false, recorde: 7 } })} />)

    expect(screen.getByText("3")).toBeInTheDocument()
    expect(screen.queryByText("7")).not.toBeInTheDocument()
  })

  it("mostra o progresso do período vigente", () => {
    render(<HabitoCard habito={habito()} />)

    expect(screen.getByText("1.2 de 2 L")).toBeInTheDocument()
    expect(screen.getByText("60%")).toBeInTheDocument()
  })

  it("mostra streak zero sem quebrar", () => {
    render(<HabitoCard habito={habito({ streak: { atual: 0, periodoAtualBatido: false, recorde: 0 } })} />)
    expect(screen.getByText("0")).toBeInTheDocument()
  })

  it("usa o rótulo certo para hábito semanal", () => {
    render(<HabitoCard habito={habito({ frequencia: "semanal", metaValor: 15, unidade: "km" })} />)
    expect(screen.getByText("15 km por semana")).toBeInTheDocument()
  })

  it("mostra 100% quando a meta foi batida", () => {
    render(
      <HabitoCard
        habito={habito({
          progresso: { inicio: "x", fim: "y", atual: 2.5, meta: 2, percentual: 100, batido: true },
        })}
      />,
    )
    expect(screen.getByText("100%")).toBeInTheDocument()
  })
})
