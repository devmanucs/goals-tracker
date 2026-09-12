import { render } from "@testing-library/react"

import { StreakHeatmap } from "@/features/habitos/components/streak-heatmap"
import type { Habito } from "@/features/habitos/types"

const hoje = new Date().toISOString().slice(0, 10)
const diasAtras = (n: number) =>
  new Date(Date.now() - n * 86400000).toISOString().slice(0, 10)

const habito = {
  frequencia: "diaria",
  metaValor: 2,
  unidade: "L",
} as unknown as Habito

describe("StreakHeatmap", () => {
  it("desenha uma célula por dia das semanas pedidas", () => {
    const { container } = render(
      <StreakHeatmap habito={habito} registros={[]} semanas={4} />,
    )
    // 4 semanas x 7 dias.
    expect(container.querySelectorAll(".rounded-sm")).toHaveLength(28)
  })

  it("mostra os rótulos de dia da semana quando há mais de uma semana", () => {
    const { getByText } = render(
      <StreakHeatmap habito={habito} registros={[]} semanas={12} />,
    )
    expect(getByText("seg")).toBeInTheDocument()
  })

  it("omite os rótulos na versão de uma semana, usada no card", () => {
    const { queryByText } = render(
      <StreakHeatmap habito={habito} registros={[]} semanas={1} />,
    )
    expect(queryByText("seg")).not.toBeInTheDocument()
  })

  it("acende a célula do dia com registro", () => {
    const { container } = render(
      <StreakHeatmap habito={habito} registros={[{ data: hoje, valor: 2 }]} semanas={1} />,
    )
    expect(container.querySelectorAll(".bg-primary").length).toBeGreaterThan(0)
  })

  it("mostra o valor registrado no title da célula", () => {
    const { container } = render(
      <StreakHeatmap habito={habito} registros={[{ data: hoje, valor: 1.5 }]} semanas={1} />,
    )
    const comValor = [...container.querySelectorAll("[title]")].filter((el) =>
      el.getAttribute("title")?.includes("1.5 L"),
    )
    expect(comValor.length).toBe(1)
  })

  it("marca dias futuros com borda tracejada, e sem title", () => {
    const { container } = render(
      <StreakHeatmap habito={habito} registros={[]} semanas={1} />,
    )
    // A semana vai até sábado, então salvo domingo sempre há dia futuro ou o de hoje.
    const tracejados = container.querySelectorAll(".border-dashed")
    for (const celula of tracejados) {
      expect(celula.getAttribute("title")).toBeNull()
    }
  })

  it("dia sem registro fica com o tom neutro", () => {
    const { container } = render(
      <StreakHeatmap habito={habito} registros={[{ data: diasAtras(3), valor: 2 }]} semanas={1} />,
    )
    expect(container.querySelectorAll(".bg-muted").length).toBeGreaterThan(0)
  })
})
