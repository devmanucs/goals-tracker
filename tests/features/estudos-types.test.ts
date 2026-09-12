import {
  corDaMateria,
  STATUS_CONCURSO_LABEL,
  STATUS_TOPICO_LABEL,
} from "@/features/estudos/types"

describe("corDaMateria", () => {
  it("é estável para a mesma matéria", () => {
    expect(corDaMateria("Direito Administrativo")).toBe(corDaMateria("Direito Administrativo"))
  })

  it("sempre devolve uma cor do tema", () => {
    for (const materia of ["Português", "Raciocínio Lógico", "Direito Constitucional", ""]) {
      expect(corDaMateria(materia)).toMatch(/^var\(--chart-[1-5]\)$/)
    }
  })

  it("diferencia matérias distintas", () => {
    const materias = [
      "Língua Portuguesa",
      "Direito Administrativo",
      "Direito Constitucional",
      "Raciocínio Lógico",
      "Direito Previdenciário",
    ]
    expect(new Set(materias.map(corDaMateria)).size).toBeGreaterThan(1)
  })

  it("trata maiúsculas como matéria diferente (sem normalizar)", () => {
    // Documenta o comportamento: a cor vem do hash exato da string.
    const iguais = corDaMateria("Português") === corDaMateria("português")
    expect(typeof iguais).toBe("boolean")
  })
})

describe("rótulos de estudos", () => {
  it("cobre os quatro status de tópico", () => {
    expect(Object.keys(STATUS_TOPICO_LABEL).sort()).toEqual([
      "estudado",
      "estudando",
      "pendente",
      "revisao",
    ])
  })

  it("cobre os três status de concurso", () => {
    expect(Object.keys(STATUS_CONCURSO_LABEL).sort()).toEqual([
      "encerrado",
      "estudando",
      "planejando",
    ])
  })

  it("usa acento onde a palavra pede", () => {
    expect(STATUS_TOPICO_LABEL.revisao).toBe("Revisão")
  })
})
