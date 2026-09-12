import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { CommandMenu } from "@/components/command-menu"

const push = jest.fn()
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: (href: string) => push(href) }),
}))

const INDICE = {
  livros: [{ id: "l1", titulo: "Duna", autor: "Frank Herbert" }],
  concursos: [{ id: "c1", titulo: "TRF 5", banca: "FCC" }],
  habitos: [{ id: "h1", nome: "Correr" }],
}

let fetchMock: jest.Mock

beforeEach(() => {
  push.mockReset()
  fetchMock = jest.fn(() =>
    Promise.resolve({ ok: true, json: () => Promise.resolve(INDICE) } as Response),
  )
  global.fetch = fetchMock as unknown as typeof fetch
})

/** Ctrl+K é escutado no document, não no botão. */
function atalho() {
  fireEvent.keyDown(document, { key: "k", ctrlKey: true })
}

describe("CommandMenu", () => {
  it("mostra o gatilho com o atalho antes de abrir", () => {
    render(<CommandMenu />)

    expect(screen.getByText("Buscar...")).toBeInTheDocument()
    expect(screen.getByText("Ctrl K")).toBeInTheDocument()
    expect(screen.queryByPlaceholderText(/Buscar seção/)).not.toBeInTheDocument()
  })

  it("abre e fecha com Ctrl+K", async () => {
    render(<CommandMenu />)

    atalho()
    expect(await screen.findByPlaceholderText(/Buscar seção/)).toBeInTheDocument()

    atalho()
    await waitFor(() =>
      expect(screen.queryByPlaceholderText(/Buscar seção/)).not.toBeInTheDocument(),
    )
  })

  it("abre pelo clique no gatilho e lista as seções", async () => {
    const usuario = userEvent.setup()
    // Índice vazio: "Hábitos" é seção e também título de grupo, e o teste aqui
    // é sobre as seções fixas.
    fetchMock.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ livros: [], concursos: [], habitos: [] }),
      } as Response),
    )
    render(<CommandMenu />)

    await usuario.click(screen.getByRole("button", { name: /Buscar/ }))

    expect(await screen.findByText("Dashboard")).toBeInTheDocument()
    for (const secao of ["Leitura", "Estudos", "Hábitos", "Retrospectiva"]) {
      expect(screen.getByText(secao)).toBeInTheDocument()
    }
  })

  it("navega para a seção escolhida e fecha o diálogo", async () => {
    const usuario = userEvent.setup()
    render(<CommandMenu />)

    atalho()
    await usuario.click(await screen.findByText("Leitura"))

    expect(push).toHaveBeenCalledWith("/leitura")
    await waitFor(() =>
      expect(screen.queryByPlaceholderText(/Buscar seção/)).not.toBeInTheDocument(),
    )
  })

  it("traz livros, concursos e hábitos do índice", async () => {
    render(<CommandMenu />)

    atalho()

    expect(await screen.findByText("Duna")).toBeInTheDocument()
    expect(screen.getByText("Frank Herbert")).toBeInTheDocument()
    expect(screen.getByText("TRF 5")).toBeInTheDocument()
    expect(screen.getByText("FCC")).toBeInTheDocument()
    expect(screen.getByText("Correr")).toBeInTheDocument()
  })

  it("navega para um item do índice", async () => {
    const usuario = userEvent.setup()
    render(<CommandMenu />)

    atalho()
    await usuario.click(await screen.findByText("Duna"))

    expect(push).toHaveBeenCalledWith("/leitura/l1")
  })

  it("busca o índice só na primeira abertura", async () => {
    render(<CommandMenu />)

    atalho()
    await screen.findByText("Duna")
    atalho()
    await waitFor(() =>
      expect(screen.queryByPlaceholderText(/Buscar seção/)).not.toBeInTheDocument(),
    )
    atalho()
    await screen.findByText("Duna")

    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it("segue funcionando quando o índice falha", async () => {
    fetchMock.mockImplementation(() => Promise.reject(new Error("offline")))
    render(<CommandMenu />)

    atalho()

    expect(await screen.findByText("Dashboard")).toBeInTheDocument()
    await waitFor(() => expect(screen.queryByText("Duna")).not.toBeInTheDocument())
  })
})
