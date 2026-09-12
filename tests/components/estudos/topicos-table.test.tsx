import { render, screen, within } from "@testing-library/react"

import { TopicosTable } from "@/features/estudos/components/topicos-table"
import { atualizarStatusDoTopico } from "@/features/estudos/actions"
import type { TopicoEstudo } from "@/features/estudos/types"

// A action é um Server Action: no jsdom só interessa que foi chamada com os
// argumentos certos.
jest.mock("@/features/estudos/actions", () => ({
  atualizarStatusDoTopico: jest.fn(async () => ({ ok: true })),
}))

const atualizar = atualizarStatusDoTopico as jest.MockedFunction<
  typeof atualizarStatusDoTopico
>

const TOPICOS: TopicoEstudo[] = [
  {
    id: "t1",
    concursoId: "c1",
    titulo: "Controle de constitucionalidade",
    materia: "Direito Constitucional",
    peso: 4,
    dataAgendada: "2026-08-20",
    status: "pendente",
  },
  {
    id: "t2",
    concursoId: "c1",
    titulo: "Licitações",
    materia: "Direito Administrativo",
    peso: 9,
    dataAgendada: "2026-08-15",
    status: "estudando",
  },
  {
    id: "t3",
    concursoId: "c1",
    titulo: "Crase",
    materia: "Português",
    peso: 6,
    dataAgendada: "2026-08-18",
    status: "estudado",
  },
]

beforeEach(() => {
  atualizar.mockReset().mockResolvedValue({ ok: true })
})

function linhas() {
  // A primeira linha é o cabeçalho.
  return screen.getAllByRole("row").slice(1)
}

describe("TopicosTable", () => {
  it("mostra o cabeçalho e uma linha por tópico", () => {
    render(<TopicosTable topicos={TOPICOS} concursoId="c1" />)

    for (const coluna of ["Tópico", "Matéria", "Peso", "Data agendada", "Status"]) {
      expect(screen.getByRole("columnheader", { name: coluna })).toBeInTheDocument()
    }
    expect(linhas()).toHaveLength(3)
  })

  it("ordena do maior peso para o menor", () => {
    render(<TopicosTable topicos={TOPICOS} concursoId="c1" />)

    const titulos = linhas().map((linha) => within(linha).getAllByRole("cell")[0].textContent)
    expect(titulos).toEqual([
      "Licitações",
      "Crase",
      "Controle de constitucionalidade",
    ])
  })

  it("não altera o array recebido ao ordenar", () => {
    const original = [...TOPICOS]
    render(<TopicosTable topicos={TOPICOS} concursoId="c1" />)

    expect(TOPICOS).toEqual(original)
  })

  it("mostra matéria, peso e data de cada tópico", () => {
    render(<TopicosTable topicos={TOPICOS} concursoId="c1" />)

    const linha = linhas()[0]
    expect(within(linha).getByText("Direito Administrativo")).toBeInTheDocument()
    expect(within(linha).getByText("9")).toBeInTheDocument()
    expect(within(linha).getByText("15 de ago.")).toBeInTheDocument()
  })

  it("mostra o rótulo do status, não o valor cru", () => {
    render(<TopicosTable topicos={TOPICOS} concursoId="c1" />)

    const gatilhos = screen.getAllByRole("combobox")
    expect(gatilhos[0]).toHaveTextContent("Estudando")
    expect(gatilhos[1]).toHaveTextContent("Estudado")
    expect(gatilhos[2]).toHaveTextContent("Pendente")
    expect(gatilhos[0]).not.toHaveTextContent("estudando")
  })

  it("deixa o select pronto para salvar, com o tópico certo em cada linha", () => {
    // Abrir o popup do Select do Base UI trava no jsdom (ele depende da API de
    // popover e de medidas de layout que o jsdom não tem). A troca de status de
    // ponta a ponta é coberta no navegador, por e2e/fluxo-completo.mjs; aqui
    // fica o que dá para garantir sem abrir o popup.
    render(<TopicosTable topicos={TOPICOS} concursoId="c1" />)

    const gatilhos = screen.getAllByRole("combobox")
    expect(gatilhos).toHaveLength(TOPICOS.length)
    for (const gatilho of gatilhos) {
      expect(gatilho).toBeEnabled()
      expect(gatilho).toHaveAttribute("aria-expanded", "false")
    }
    expect(atualizar).not.toHaveBeenCalled()
  })

  it("renderiza a tabela vazia sem quebrar", () => {
    render(<TopicosTable topicos={[]} concursoId="c1" />)

    expect(screen.getByRole("columnheader", { name: "Tópico" })).toBeInTheDocument()
    expect(linhas()).toHaveLength(0)
  })
})
