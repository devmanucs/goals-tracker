import { cn } from "@/lib/utils"

describe("cn", () => {
  it("junta classes", () => {
    expect(cn("a", "b")).toBe("a b")
  })

  it("ignora valores falsos", () => {
    expect(cn("a", false && "b", undefined, null, "c")).toBe("a c")
  })

  it("resolve conflito do tailwind mantendo a última", () => {
    // É para isso que existe o tailwind-merge: "p-4 p-2" vira "p-2".
    expect(cn("p-4", "p-2")).toBe("p-2")
  })

  it("não confunde classes de eixos diferentes", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2")
  })

  it("aceita objeto condicional", () => {
    expect(cn({ ativo: true, inativo: false })).toBe("ativo")
  })

  it("devolve string vazia sem argumentos", () => {
    expect(cn()).toBe("")
  })
})
