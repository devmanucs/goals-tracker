import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { LoginForm } from "@/components/login-form"
import { entrar, registrar } from "@/features/auth/actions"

// As actions são Server Actions: importam `server-only` e o cookie da sessão,
// que não existem no jsdom. O formulário só precisa saber que foram chamadas.
jest.mock("@/features/auth/actions", () => ({
  entrar: jest.fn(async () => ({})),
  registrar: jest.fn(async () => ({})),
}))

const entrarMock = entrar as jest.MockedFunction<typeof entrar>
const registrarMock = registrar as jest.MockedFunction<typeof registrar>

beforeEach(() => {
  entrarMock.mockReset().mockResolvedValue({})
  registrarMock.mockReset().mockResolvedValue({})
})

/** Lê o FormData que a action recebeu, como um objeto simples. */
function camposEnviados(mock: jest.MockedFunction<typeof entrar>) {
  const formData = mock.mock.calls[0][1]
  return Object.fromEntries(formData.entries())
}

describe("LoginForm", () => {
  it("abre no modo de entrar, sem o campo de nome", () => {
    render(<LoginForm />)

    expect(screen.getByText("Bem-vinda de volta")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Entrar" })).toBeInTheDocument()
    expect(screen.queryByLabelText("Nome")).not.toBeInTheDocument()
  })

  it("troca para o modo de registro e pede o nome", async () => {
    const usuario = userEvent.setup()
    render(<LoginForm />)

    await usuario.click(screen.getByRole("button", { name: "Criar conta" }))

    expect(screen.getByText("Criar sua conta")).toBeInTheDocument()
    expect(screen.getByLabelText("Nome")).toBeInTheDocument()
    expect(screen.getByText("Mínimo de 6 caracteres.")).toBeInTheDocument()
  })

  it("limpa os campos ao trocar de modo", async () => {
    const usuario = userEvent.setup()
    render(<LoginForm />)

    await usuario.type(screen.getByLabelText("E-mail"), "ana@exemplo.com")
    await usuario.click(screen.getByRole("button", { name: "Criar conta" }))
    await usuario.click(screen.getByRole("button", { name: "Entrar" }))

    expect(screen.getByLabelText("E-mail")).toHaveValue("")
  })

  it("envia e-mail e senha para a action de entrar", async () => {
    const usuario = userEvent.setup()
    render(<LoginForm />)

    await usuario.type(screen.getByLabelText("E-mail"), "ana@exemplo.com")
    await usuario.type(screen.getByLabelText("Senha"), "segredo123")
    await usuario.click(screen.getByRole("button", { name: "Entrar" }))

    await waitFor(() => expect(entrarMock).toHaveBeenCalled())
    expect(camposEnviados(entrarMock)).toEqual({
      email: "ana@exemplo.com",
      senha: "segredo123",
    })
    expect(registrarMock).not.toHaveBeenCalled()
  })

  it("envia o nome junto no modo de registro", async () => {
    const usuario = userEvent.setup()
    render(<LoginForm />)

    await usuario.click(screen.getByRole("button", { name: "Criar conta" }))
    await usuario.type(screen.getByLabelText("Nome"), "Ana")
    await usuario.type(screen.getByLabelText("E-mail"), "ana@exemplo.com")
    await usuario.type(screen.getByLabelText("Senha"), "segredo123")
    await usuario.click(screen.getByRole("button", { name: "Criar conta" }))

    await waitFor(() => expect(registrarMock).toHaveBeenCalled())
    expect(camposEnviados(registrarMock as never)).toEqual({
      nome: "Ana",
      email: "ana@exemplo.com",
      senha: "segredo123",
    })
    expect(entrarMock).not.toHaveBeenCalled()
  })

  it("mostra a mensagem de erro geral devolvida pela action", async () => {
    const usuario = userEvent.setup()
    entrarMock.mockResolvedValue({ mensagem: "E-mail ou senha inválidos" })
    render(<LoginForm />)

    await usuario.type(screen.getByLabelText("E-mail"), "ana@exemplo.com")
    await usuario.type(screen.getByLabelText("Senha"), "errada")
    await usuario.click(screen.getByRole("button", { name: "Entrar" }))

    expect(await screen.findByText("E-mail ou senha inválidos")).toBeInTheDocument()
  })

  it("marca o campo com erro e mostra a mensagem dele", async () => {
    const usuario = userEvent.setup()
    entrarMock.mockResolvedValue({ erros: { senha: "Senha muito curta" } })
    render(<LoginForm />)

    await usuario.type(screen.getByLabelText("E-mail"), "ana@exemplo.com")
    await usuario.type(screen.getByLabelText("Senha"), "123")
    await usuario.click(screen.getByRole("button", { name: "Entrar" }))

    expect(await screen.findByText("Senha muito curta")).toBeInTheDocument()
    expect(screen.getByLabelText("Senha")).toHaveAttribute("aria-invalid", "true")
    expect(screen.getByLabelText("E-mail")).not.toHaveAttribute("aria-invalid", "true")
  })

  it("não carrega para a outra aba o erro da aba atual", async () => {
    const usuario = userEvent.setup()
    entrarMock.mockResolvedValue({ mensagem: "E-mail ou senha inválidos" })
    render(<LoginForm />)

    await usuario.type(screen.getByLabelText("E-mail"), "ana@exemplo.com")
    await usuario.type(screen.getByLabelText("Senha"), "errada")
    await usuario.click(screen.getByRole("button", { name: "Entrar" }))
    await screen.findByText("E-mail ou senha inválidos")

    await usuario.click(screen.getByRole("button", { name: "Criar conta" }))

    expect(screen.queryByText("E-mail ou senha inválidos")).not.toBeInTheDocument()
  })
})
