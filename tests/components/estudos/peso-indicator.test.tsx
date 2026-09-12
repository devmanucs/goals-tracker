import { render, screen } from "@testing-library/react"

import { PesoIndicator } from "@/features/estudos/components/peso-indicator"

function preenchidas(container: HTMLElement) {
  return container.querySelectorAll(".bg-primary").length
}

describe("PesoIndicator", () => {
  it("desenha sempre cinco barras", () => {
    const { container } = render(<PesoIndicator peso={5} />)
    expect(container.querySelectorAll(".w-1")).toHaveLength(5)
  })

  it("preenche proporcionalmente ao peso", () => {
    expect(preenchidas(render(<PesoIndicator peso={10} />).container)).toBe(5)
    expect(preenchidas(render(<PesoIndicator peso={6} />).container)).toBe(3)
    expect(preenchidas(render(<PesoIndicator peso={2} />).container)).toBe(1)
  })

  it("não passa de cinco barras com peso acima do máximo", () => {
    expect(preenchidas(render(<PesoIndicator peso={99} />).container)).toBe(5)
  })

  it("não fica negativo com peso zero ou negativo", () => {
    expect(preenchidas(render(<PesoIndicator peso={0} />).container)).toBe(0)
    expect(preenchidas(render(<PesoIndicator peso={-5} />).container)).toBe(0)
  })

  it("explica o peso no title, já que as barras são decorativas", () => {
    const { container } = render(<PesoIndicator peso={7} />)
    expect(container.querySelector("[title]")).toHaveAttribute("title", "Peso 7 de 10")
    // As barras em si ficam escondidas do leitor de tela.
    expect(container.querySelector("[aria-hidden='true']")).toBeInTheDocument()
  })

  it("mostra o número quando pedido", () => {
    render(<PesoIndicator peso={8} showValue />)
    expect(screen.getByText("8")).toBeInTheDocument()
  })
})
