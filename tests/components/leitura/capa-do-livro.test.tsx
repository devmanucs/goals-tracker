import { fireEvent, render, screen } from "@testing-library/react"

import { CapaDoLivro } from "@/features/leitura/components/capa-do-livro"

describe("CapaDoLivro", () => {
  it("mostra a imagem quando há URL", () => {
    render(<CapaDoLivro url="https://capas.test/duna.jpg" titulo="Duna" />)

    const img = screen.getByRole("img", { name: "Capa de Duna" })
    expect(img).toHaveAttribute("src", "https://capas.test/duna.jpg")
  })

  it("carrega a imagem de forma preguiçosa", () => {
    render(<CapaDoLivro url="https://capas.test/duna.jpg" titulo="Duna" />)
    expect(screen.getByRole("img")).toHaveAttribute("loading", "lazy")
  })

  it("mostra o bloco reservado quando não há URL", () => {
    const { container } = render(<CapaDoLivro url={null} titulo="Duna" />)

    expect(screen.queryByRole("img")).not.toBeInTheDocument()
    // O bloco é decorativo: não deve ser anunciado por leitor de tela.
    expect(container.querySelector("[aria-hidden]")).toBeInTheDocument()
  })

  it("cai para o bloco reservado quando a imagem falha", () => {
    // A Open Library tem registro cujo cover aponta para imagem inexistente.
    render(<CapaDoLivro url="https://capas.test/quebrada.jpg" titulo="Duna" />)

    fireEvent.error(screen.getByRole("img"))

    expect(screen.queryByRole("img")).not.toBeInTheDocument()
  })

  it("aplica a cor de fundo quando não há capa", () => {
    const { container } = render(
      <CapaDoLivro url={null} titulo="Duna" corDeFundo="var(--chart-3)" />,
    )

    const bloco = container.querySelector("[aria-hidden]") as HTMLElement
    expect(bloco.style.backgroundColor).toBe("var(--chart-3)")
  })

  it("repassa a className recebida", () => {
    const { container } = render(
      <CapaDoLivro url={null} titulo="Duna" className="h-20 w-14" />,
    )
    expect(container.firstChild).toHaveClass("h-20", "w-14")
  })

  it("usa o título no texto alternativo, para leitor de tela", () => {
    render(<CapaDoLivro url="https://capas.test/x.jpg" titulo="Torto Arado" />)
    expect(screen.getByAltText("Capa de Torto Arado")).toBeInTheDocument()
  })
})
