import { act, fireEvent, screen, waitFor } from "@testing-library/react"

import { BuscaNoCatalogo } from "@/features/leitura/components/busca-no-catalogo"
import { renderComQuery } from "../../utils/render-com-query"

const RESULTADOS = [
  {
    chave: "/works/OL27448W",
    titulo: "Duna",
    autor: "Frank Herbert",
    totalPaginas: 688,
    capaUrl: "https://capas.test/duna.jpg",
    anoPublicacao: 1965,
    isbn: "9780441172719",
  },
  {
    chave: "/works/OL99W",
    titulo: "Duna Messias",
    autor: "Frank Herbert",
    totalPaginas: 336,
    capaUrl: null,
    anoPublicacao: 1969,
    isbn: null,
  },
]

const DETALHE = { ...RESULTADOS[0], sinopse: "Em um futuro distante...", assuntos: ["Ficção"] }

function respostaOk(corpo: unknown) {
  return Promise.resolve({ ok: true, json: () => Promise.resolve(corpo) } as Response)
}

let fetchMock: jest.Mock

beforeEach(() => {
  jest.useFakeTimers()
  fetchMock = jest.fn((url: string) =>
    url.includes("/detalhe") ? respostaOk(DETALHE) : respostaOk({ resultados: RESULTADOS }),
  )
  global.fetch = fetchMock as unknown as typeof fetch
})

afterEach(() => {
  jest.useRealTimers()
  jest.restoreAllMocks()
})

/** Digita e deixa o debounce vencer. */
async function digitar(texto: string) {
  fireEvent.change(screen.getByLabelText(/Buscar no catálogo/), { target: { value: texto } })
  // O debounce é um setTimeout: sem avançar o relógio a busca nunca dispara.
  await act(async () => {
    jest.advanceTimersByTime(400)
  })
}

describe("BuscaNoCatalogo", () => {
  const props = { escolhido: null, aoEscolher: jest.fn(), aoLimpar: jest.fn() }

  it("não busca com menos de dois caracteres", async () => {
    renderComQuery(<BuscaNoCatalogo {...props} />)

    await digitar("d")
    await waitFor(() => expect(fetchMock).not.toHaveBeenCalled())
  })

  it("busca depois do debounce e lista os resultados", async () => {
    renderComQuery(<BuscaNoCatalogo {...props} />)

    await digitar("duna")

    await waitFor(() => expect(screen.getByText("Duna")).toBeInTheDocument())
    expect(screen.getByText("Duna Messias")).toBeInTheDocument()
  })

  it("codifica o termo na URL da busca", async () => {
    renderComQuery(<BuscaNoCatalogo {...props} />)

    await digitar("torto arado")

    await waitFor(() => expect(fetchMock).toHaveBeenCalled())
    expect(fetchMock.mock.calls[0][0]).toBe("/api/livros/buscar?q=torto%20arado")
  })

  it("mostra autor, ano e páginas de cada resultado", async () => {
    renderComQuery(<BuscaNoCatalogo {...props} />)

    await digitar("duna")

    await waitFor(() =>
      expect(screen.getByText(/Frank Herbert · 1965 · 688 pág\./)).toBeInTheDocument(),
    )
  })

  it("avisa quando a busca não encontra nada", async () => {
    fetchMock.mockImplementation(() => respostaOk({ resultados: [] }))
    renderComQuery(<BuscaNoCatalogo {...props} />)

    await digitar("livroinexistente")

    await waitFor(() =>
      expect(screen.getByText(/Nenhum livro encontrado/)).toBeInTheDocument(),
    )
  })

  it("mostra o erro quando a API falha", async () => {
    fetchMock.mockImplementation(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: { message: "Catálogo fora do ar" } }),
      } as Response),
    )
    renderComQuery(<BuscaNoCatalogo {...props} />)

    await digitar("duna")

    await waitFor(() => expect(screen.getByText("Catálogo fora do ar")).toBeInTheDocument())
  })

  it("busca a sinopse e devolve o livro escolhido", async () => {
    const aoEscolher = jest.fn()
    renderComQuery(<BuscaNoCatalogo {...props} aoEscolher={aoEscolher} />)

    await digitar("duna")
    await waitFor(() => expect(screen.getByText("Duna")).toBeInTheDocument())

    jest.useRealTimers()
    fireEvent.click(screen.getByText("Duna"))

    await waitFor(() => expect(aoEscolher).toHaveBeenCalled())
    expect(aoEscolher.mock.calls[0][0]).toMatchObject({
      titulo: "Duna",
      totalPaginas: 688,
      sinopse: "Em um futuro distante...",
    })
  })

  it("segue com o cadastro mesmo se a sinopse falhar", async () => {
    // A sinopse é um bônus: não pode bloquear o cadastro.
    const aoEscolher = jest.fn()
    fetchMock.mockImplementation((url: string) =>
      url.includes("/detalhe")
        ? Promise.resolve({ ok: false, json: () => Promise.resolve({}) } as Response)
        : respostaOk({ resultados: RESULTADOS }),
    )
    renderComQuery(<BuscaNoCatalogo {...props} aoEscolher={aoEscolher} />)

    await digitar("duna")
    await waitFor(() => expect(screen.getByText("Duna")).toBeInTheDocument())

    jest.useRealTimers()
    fireEvent.click(screen.getByText("Duna"))

    await waitFor(() => expect(aoEscolher).toHaveBeenCalled())
    expect(aoEscolher.mock.calls[0][0]).toMatchObject({ titulo: "Duna", sinopse: null })
  })

  it("mostra o cartão do livro já escolhido, no lugar da busca", () => {
    renderComQuery(
      <BuscaNoCatalogo
        {...props}
        escolhido={{ ...RESULTADOS[0], sinopse: "Em um futuro distante..." }}
      />,
    )

    expect(screen.getByText("Duna")).toBeInTheDocument()
    expect(screen.getByText(/Os campos abaixo já vieram preenchidos/)).toBeInTheDocument()
    expect(screen.queryByLabelText(/Buscar no catálogo/)).not.toBeInTheDocument()
  })

  it("permite trocar de livro pelo botão de limpar", () => {
    const aoLimpar = jest.fn()
    renderComQuery(
      <BuscaNoCatalogo
        {...props}
        aoLimpar={aoLimpar}
        escolhido={{ ...RESULTADOS[0], sinopse: null }}
      />,
    )

    fireEvent.click(screen.getByRole("button", { name: "Escolher outro livro" }))

    expect(aoLimpar).toHaveBeenCalled()
  })
})
