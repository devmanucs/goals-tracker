import { api, ApiError } from "@/lib/api"
import { lerSessao } from "@/lib/sessao"

// `server-only` lança fora do servidor; no jest o módulo não precisa fazer nada.
jest.mock("server-only", () => ({}))
jest.mock("@/lib/sessao", () => ({ lerSessao: jest.fn(async () => null) }))

const lerSessaoMock = lerSessao as jest.MockedFunction<typeof lerSessao>

let fetchMock: jest.Mock

/** Monta uma Response como a que o backend devolveria. */
function resposta(status: number, corpo?: unknown) {
  return {
    status,
    ok: status >= 200 && status < 300,
    text: async () => (corpo === undefined ? "" : JSON.stringify(corpo)),
  } as Response
}

beforeEach(() => {
  lerSessaoMock.mockReset().mockResolvedValue(null)
  fetchMock = jest.fn(() => Promise.resolve(resposta(200, { ok: true })))
  global.fetch = fetchMock as unknown as typeof fetch
})

/** Os argumentos da última chamada ao fetch. */
function chamada() {
  const [url, init] = fetchMock.mock.calls.at(-1) as [string, RequestInit]
  return { url, init, headers: init.headers as Record<string, string> }
}

describe("api", () => {
  it("prefixa o caminho com a URL base", async () => {
    await api.get("/livros")

    expect(chamada().url).toBe("http://localhost:3333/livros")
  })

  it("não cacheia: os dados são por usuário", async () => {
    await api.get("/livros")

    expect(chamada().init.cache).toBe("no-store")
  })

  it("manda o token do cookie no Authorization", async () => {
    lerSessaoMock.mockResolvedValue("jwt-abc")

    await api.get("/livros")

    expect(chamada().headers.Authorization).toBe("Bearer jwt-abc")
  })

  it("omite o Authorization quando não há sessão", async () => {
    await api.get("/livros")

    expect(chamada().headers.Authorization).toBeUndefined()
  })

  it("serializa o corpo e marca o Content-Type no post", async () => {
    await api.post("/livros", { titulo: "Duna" })

    const { init, headers } = chamada()
    expect(init.method).toBe("POST")
    expect(init.body).toBe('{"titulo":"Duna"}')
    expect(headers["Content-Type"]).toBe("application/json")
  })

  it("não manda corpo nem Content-Type num post sem payload", async () => {
    await api.post("/auth/logout")

    const { init, headers } = chamada()
    expect(init.body).toBeUndefined()
    expect(headers["Content-Type"]).toBeUndefined()
  })

  it("usa o método certo em patch e delete", async () => {
    await api.patch("/livros/1", { paginas: 10 })
    expect(chamada().init.method).toBe("PATCH")

    await api.delete("/livros/1")
    expect(chamada().init.method).toBe("DELETE")
  })

  it("devolve o JSON da resposta", async () => {
    fetchMock.mockResolvedValue(resposta(200, { id: "1", titulo: "Duna" }))

    await expect(api.get("/livros/1")).resolves.toEqual({ id: "1", titulo: "Duna" })
  })

  it("devolve undefined no 204, sem tentar parsear corpo", async () => {
    fetchMock.mockResolvedValue({
      status: 204,
      ok: true,
      text: async () => {
        throw new Error("não deveria ler o corpo de um 204")
      },
    } as unknown as Response)

    await expect(api.delete("/livros/1")).resolves.toBeUndefined()
  })

  it("trata corpo vazio num 200 como null", async () => {
    fetchMock.mockResolvedValue(resposta(200))

    await expect(api.get("/livros")).resolves.toBeNull()
  })

  it("converte erro do backend em ApiError com message, status e code", async () => {
    fetchMock.mockResolvedValue(
      resposta(404, { error: { message: "Livro não encontrado", code: "NAO_ENCONTRADO" } }),
    )

    const erro = await api.get("/livros/999").catch((e: unknown) => e)

    expect(erro).toBeInstanceOf(ApiError)
    expect(erro).toMatchObject({
      name: "ApiError",
      message: "Livro não encontrado",
      status: 404,
      code: "NAO_ENCONTRADO",
    })
  })

  it("preserva os issues por campo do backend", async () => {
    const issues = [{ campo: "email", mensagem: "E-mail inválido" }]
    fetchMock.mockResolvedValue(resposta(400, { error: { message: "Dados inválidos", issues } }))

    const erro = (await api.post("/auth/login", {}).catch((e: unknown) => e)) as ApiError

    expect(erro.issues).toEqual(issues)
  })

  it("usa mensagem padrão quando o erro vem sem corpo", async () => {
    fetchMock.mockResolvedValue(resposta(500))

    const erro = (await api.get("/livros").catch((e: unknown) => e)) as ApiError

    expect(erro.message).toBe("Não foi possível completar a operação")
    expect(erro.status).toBe(500)
  })

  it("marca 401 como não autenticado, e só ele", async () => {
    expect(new ApiError("x", 401).naoAutenticado).toBe(true)
    expect(new ApiError("x", 403).naoAutenticado).toBe(false)
    expect(new ApiError("x", 500).naoAutenticado).toBe(false)
  })

  it("deixa o chamador sobrescrever headers", async () => {
    await api.get("/livros", { headers: { Accept: "text/plain" } })

    expect(chamada().headers.Accept).toBe("text/plain")
  })
})
