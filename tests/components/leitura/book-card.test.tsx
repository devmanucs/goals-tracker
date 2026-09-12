import { render, screen } from "@testing-library/react"

import { BookCard } from "@/features/leitura/components/book-card"
import type { Livro } from "@/features/leitura/types"

function livro(overrides: Partial<Livro> = {}): Livro {
  return {
    id: "l1",
    titulo: "Duna",
    autor: "Frank Herbert",
    totalPaginas: 688,
    status: "lendo",
    corCapa: "var(--chart-1)",
    capaUrl: null,
    sinopse: null,
    isbn: null,
    anoPublicacao: null,
    createdAt: "2026-08-01T00:00:00.000Z",
    paginaAtual: 344,
    percentual: 50,
    ultimaLeitura: "2026-08-13",
    ...overrides,
  }
}

describe("BookCard", () => {
  it("mostra título, autor e rótulo do status", () => {
    render(<BookCard livro={livro()} />)

    expect(screen.getByText("Duna")).toBeInTheDocument()
    expect(screen.getByText("Frank Herbert")).toBeInTheDocument()
    expect(screen.getByText("Lendo")).toBeInTheDocument()
  })

  it("leva para o detalhe do livro", () => {
    render(<BookCard livro={livro()} />)
    expect(screen.getByRole("link")).toHaveAttribute("href", "/leitura/l1")
  })

  it("mostra o progresso vindo da API, sem recalcular", () => {
    render(<BookCard livro={livro({ paginaAtual: 344, percentual: 50 })} />)

    expect(screen.getByText("344/688 pág.")).toBeInTheDocument()
    expect(screen.getByText("50%")).toBeInTheDocument()
  })

  it("esconde a barra de progresso em livro que não foi começado", () => {
    render(<BookCard livro={livro({ status: "quero_ler", paginaAtual: 0, percentual: 0 })} />)
    expect(screen.queryByText(/pág\./)).not.toBeInTheDocument()
  })

  it("esconde a barra em livro abandonado", () => {
    render(<BookCard livro={livro({ status: "abandonado" })} />)
    expect(screen.queryByText(/pág\./)).not.toBeInTheDocument()
  })

  it("mostra a barra em livro lido", () => {
    render(<BookCard livro={livro({ status: "lido", percentual: 100 })} />)
    expect(screen.getByText("100%")).toBeInTheDocument()
  })

  it("usa a capa real quando o livro tem uma", () => {
    render(<BookCard livro={livro({ capaUrl: "https://capas.test/duna.jpg" })} />)
    expect(screen.getByRole("img", { name: "Capa de Duna" })).toBeInTheDocument()
  })

  it("cai na cor sólida quando não há capa", () => {
    render(<BookCard livro={livro({ capaUrl: null })} />)
    expect(screen.queryByRole("img")).not.toBeInTheDocument()
  })
})
