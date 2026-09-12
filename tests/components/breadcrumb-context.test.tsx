import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useState } from "react"

import {
  BreadcrumbProvider,
  DefinirBreadcrumb,
  useBreadcrumb,
  type Crumb,
} from "@/components/breadcrumb-context"

/** Faz o papel do topbar: só lê o que a página registrou. */
function Trilha() {
  const items = useBreadcrumb()
  return <p data-testid="trilha">{items.map((i) => `${i.label}${i.href ?? ""}`).join(" > ")}</p>
}

describe("breadcrumb-context", () => {
  it("começa vazio quando nenhuma página registrou migalhas", () => {
    render(
      <BreadcrumbProvider>
        <Trilha />
      </BreadcrumbProvider>,
    )

    expect(screen.getByTestId("trilha")).toHaveTextContent("")
  })

  it("publica para o topbar o que a página registrou", () => {
    render(
      <BreadcrumbProvider>
        <Trilha />
        <DefinirBreadcrumb items={[{ label: "Leitura", href: "/leitura" }, { label: "Duna" }]} />
      </BreadcrumbProvider>,
    )

    expect(screen.getByTestId("trilha")).toHaveTextContent("Leitura/leitura > Duna")
  })

  it("não renderiza nada no lugar onde é usado", () => {
    const { container } = render(
      <BreadcrumbProvider>
        <DefinirBreadcrumb items={[{ label: "Estudos" }]} />
      </BreadcrumbProvider>,
    )

    expect(container).toBeEmptyDOMElement()
  })

  it("atualiza a trilha quando a página troca as migalhas", async () => {
    const usuario = userEvent.setup()

    function Pagina() {
      const [items, setItems] = useState<Crumb[]>([{ label: "Estudos" }])
      return (
        <>
          <DefinirBreadcrumb items={items} />
          <button onClick={() => setItems([{ label: "Hábitos" }])}>trocar</button>
        </>
      )
    }

    render(
      <BreadcrumbProvider>
        <Trilha />
        <Pagina />
      </BreadcrumbProvider>,
    )
    expect(screen.getByTestId("trilha")).toHaveTextContent("Estudos")

    await usuario.click(screen.getByRole("button", { name: "trocar" }))

    expect(screen.getByTestId("trilha")).toHaveTextContent("Hábitos")
  })

  it("não re-registra quando o array é novo mas o conteúdo é igual", async () => {
    const usuario = userEvent.setup()
    const registros: Crumb[][] = []

    function Espiao() {
      registros.push(useBreadcrumb())
      return null
    }

    function Pagina() {
      const [, forcar] = useState(0)
      return (
        <>
          {/* Array literal: uma referência nova a cada render. */}
          <DefinirBreadcrumb items={[{ label: "Estudos" }]} />
          <button onClick={() => forcar((n) => n + 1)}>re-render</button>
        </>
      )
    }

    render(
      <BreadcrumbProvider>
        <Espiao />
        <Pagina />
      </BreadcrumbProvider>,
    )
    const publicado = registros.at(-1)

    await usuario.click(screen.getByRole("button", { name: "re-render" }))

    // Mesma referência: o efeito não redefiniu o estado do provider.
    expect(registros.at(-1)).toBe(publicado)
  })

  it("usa o valor padrão do contexto fora do provider, sem quebrar", () => {
    render(<Trilha />)

    expect(screen.getByTestId("trilha")).toHaveTextContent("")
  })
})
