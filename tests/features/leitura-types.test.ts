import { corDaCapa, CORES_CAPA, STATUS_LIVRO_LABEL } from "@/features/leitura/types"

describe("corDaCapa", () => {
  it("respeita a cor já salva no livro", () => {
    expect(corDaCapa({ titulo: "Duna", corCapa: "var(--chart-2)" })).toBe("var(--chart-2)")
  })

  it("deriva uma cor do título quando não há cor salva", () => {
    expect(CORES_CAPA).toContain(corDaCapa({ titulo: "Duna", corCapa: null }))
  })

  it("é estável: o mesmo título dá sempre a mesma cor", () => {
    const primeira = corDaCapa({ titulo: "Torto Arado", corCapa: null })
    const segunda = corDaCapa({ titulo: "Torto Arado", corCapa: null })
    expect(primeira).toBe(segunda)
  })

  it("distribui títulos diferentes entre as cores", () => {
    const titulos = ["Duna", "Sapiens", "A Hora da Estrela", "O Nome do Vento", "1984", "Torto Arado"]
    const cores = new Set(titulos.map((titulo) => corDaCapa({ titulo, corCapa: null })))
    // Não precisa usar todas, mas não pode colapsar tudo numa cor só.
    expect(cores.size).toBeGreaterThan(1)
  })

  it("não quebra com título vazio", () => {
    expect(CORES_CAPA).toContain(corDaCapa({ titulo: "", corCapa: null }))
  })

  it("lida com acento e emoji sem estourar", () => {
    expect(CORES_CAPA).toContain(corDaCapa({ titulo: "Ação 🚀 Coração", corCapa: null }))
  })
})

describe("STATUS_LIVRO_LABEL", () => {
  it("tem rótulo para os quatro status", () => {
    expect(Object.keys(STATUS_LIVRO_LABEL).sort()).toEqual([
      "abandonado",
      "lendo",
      "lido",
      "quero_ler",
    ])
  })

  it("nenhum rótulo é vazio", () => {
    for (const rotulo of Object.values(STATUS_LIVRO_LABEL)) {
      expect(rotulo.trim().length).toBeGreaterThan(0)
    }
  })
})
