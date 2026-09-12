import { buscarNoCatalogo, detalharDoCatalogo } from "@/features/leitura/catalogo"

let fetchMock: jest.Mock

function resposta(corpo: unknown, ok = true) {
  return { ok, json: async () => corpo } as Response
}

beforeEach(() => {
  fetchMock = jest.fn(() => Promise.resolve(resposta({ resultados: [] })))
  global.fetch = fetchMock as unknown as typeof fetch
})

const LIVRO = {
  chave: "/works/OL27448W",
  titulo: "Duna",
  autor: "Frank Herbert",
  totalPaginas: 688,
  capaUrl: null,
  anoPublicacao: 1965,
  isbn: null,
}

describe("buscarNoCatalogo", () => {
  it("chama a rota do próprio app, não a API externa", async () => {
    await buscarNoCatalogo("duna")

    expect(fetchMock).toHaveBeenCalledWith("/api/livros/buscar?q=duna")
  })

  it("codifica o termo na query", async () => {
    await buscarNoCatalogo("crônica de uma morte & cia")

    expect(fetchMock.mock.calls[0][0]).toBe(
      "/api/livros/buscar?q=cr%C3%B4nica%20de%20uma%20morte%20%26%20cia",
    )
  })

  it("devolve a lista de resultados", async () => {
    fetchMock.mockResolvedValue(resposta({ fonte: "openlibrary", cache: false, resultados: [LIVRO] }))

    await expect(buscarNoCatalogo("duna")).resolves.toEqual([LIVRO])
  })

  it("devolve lista vazia quando a resposta vem sem resultados", async () => {
    fetchMock.mockResolvedValue(resposta({ fonte: "openlibrary" }))

    await expect(buscarNoCatalogo("duna")).resolves.toEqual([])
  })

  it("lança com a mensagem que o backend mandou", async () => {
    fetchMock.mockResolvedValue(
      resposta({ error: { message: "Catálogo externo indisponível" } }, false),
    )

    await expect(buscarNoCatalogo("duna")).rejects.toThrow("Catálogo externo indisponível")
  })

  it("usa mensagem padrão quando o erro não tem corpo legível", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      json: async () => {
        throw new SyntaxError("Unexpected token")
      },
    } as unknown as Response)

    await expect(buscarNoCatalogo("duna")).rejects.toThrow("Não foi possível buscar no catálogo")
  })
})

describe("detalharDoCatalogo", () => {
  it("manda a chave como query param, codificada", async () => {
    fetchMock.mockResolvedValue(resposta({ ...LIVRO, sinopse: null, assuntos: [] }))

    await detalharDoCatalogo("/works/OL27448W")

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/livros/buscar/detalhe?chave=%2Fworks%2FOL27448W",
    )
  })

  it("devolve o detalhe com sinopse e assuntos", async () => {
    const detalhe = { ...LIVRO, sinopse: "Em um futuro distante...", assuntos: ["Ficção"] }
    fetchMock.mockResolvedValue(resposta(detalhe))

    await expect(detalharDoCatalogo(LIVRO.chave)).resolves.toEqual(detalhe)
  })

  it("lança com a mensagem do backend", async () => {
    fetchMock.mockResolvedValue(resposta({ error: { message: "Livro não encontrado" } }, false))

    await expect(detalharDoCatalogo("/works/X")).rejects.toThrow("Livro não encontrado")
  })

  it("usa mensagem padrão quando o erro vem sem message", async () => {
    fetchMock.mockResolvedValue(resposta({ error: {} }, false))

    await expect(detalharDoCatalogo("/works/X")).rejects.toThrow(
      "Não foi possível carregar o livro",
    )
  })
})
