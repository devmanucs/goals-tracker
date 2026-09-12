import { fireEvent, render, screen } from "@testing-library/react"

import { FiltroStatus } from "@/features/leitura/components/filtro-status"

const push = jest.fn()
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: (...args: unknown[]) => push(...args) }),
}))

beforeEach(() => push.mockClear())

describe("FiltroStatus", () => {
  it("mostra as cinco opções", () => {
    render(<FiltroStatus atual="todos" />)

    for (const rotulo of ["Todos", "Lendo", "Quero ler", "Lido", "Abandonado"]) {
      expect(screen.getByRole("tab", { name: rotulo })).toBeInTheDocument()
    }
  })

  it("marca a aba do filtro vigente", () => {
    render(<FiltroStatus atual="lendo" />)
    expect(screen.getByRole("tab", { name: "Lendo" })).toHaveAttribute("aria-selected", "true")
  })

  it("navega com o status na URL ao escolher um filtro", () => {
    render(<FiltroStatus atual="todos" />)

    fireEvent.click(screen.getByRole("tab", { name: "Lido" }))

    expect(push).toHaveBeenCalledWith("/leitura?status=lido")
  })

  it("volta para a URL limpa ao escolher Todos", () => {
    // Sem isso a URL ficaria com ?status=todos, que o backend não conhece.
    render(<FiltroStatus atual="lido" />)

    fireEvent.click(screen.getByRole("tab", { name: "Todos" }))

    expect(push).toHaveBeenCalledWith("/leitura")
  })

  it("usa o rótulo em português para quero_ler", () => {
    render(<FiltroStatus atual="quero_ler" />)
    expect(screen.getByRole("tab", { name: "Quero ler" })).toHaveAttribute(
      "aria-selected",
      "true",
    )
  })
})
