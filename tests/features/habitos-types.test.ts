import { FREQUENCIA_LABEL, progressoDoDia } from "@/features/habitos/types"

const diario = { frequencia: "diaria" as const, metaValor: 2 }
const semanal = { frequencia: "semanal" as const, metaValor: 14 }
const mensal = { frequencia: "mensal" as const, metaValor: 60 }

describe("progressoDoDia", () => {
  it("soma os registros do dia pedido", () => {
    const registros = [
      { data: "2026-08-13", valor: 1 },
      { data: "2026-08-13", valor: 0.5 },
      { data: "2026-08-12", valor: 9 },
    ]
    expect(progressoDoDia(diario, registros, "2026-08-13").valor).toBe(1.5)
  })

  it("calcula a intensidade contra a meta diária", () => {
    const registros = [{ data: "2026-08-13", valor: 1 }]
    expect(progressoDoDia(diario, registros, "2026-08-13").percentual).toBe(0.5)
  })

  it("satura em 1 quando estoura a meta", () => {
    const registros = [{ data: "2026-08-13", valor: 100 }]
    expect(progressoDoDia(diario, registros, "2026-08-13").percentual).toBe(1)
  })

  it("rateia a meta semanal pelos sete dias", () => {
    // 14 por semana = 2 por dia de referência.
    const registros = [{ data: "2026-08-13", valor: 2 }]
    expect(progressoDoDia(semanal, registros, "2026-08-13").percentual).toBe(1)
  })

  it("rateia a meta mensal por trinta dias", () => {
    // 60 por mês = 2 por dia de referência.
    const registros = [{ data: "2026-08-13", valor: 1 }]
    expect(progressoDoDia(mensal, registros, "2026-08-13").percentual).toBe(0.5)
  })

  it("devolve zero em dia sem registro", () => {
    expect(progressoDoDia(diario, [], "2026-08-13")).toEqual({ valor: 0, percentual: 0 })
  })

  it("não divide por zero quando a meta é zero", () => {
    const semMeta = { frequencia: "diaria" as const, metaValor: 0 }
    const resultado = progressoDoDia(semMeta, [{ data: "2026-08-13", valor: 5 }], "2026-08-13")
    expect(resultado.percentual).toBe(0)
    expect(Number.isNaN(resultado.percentual)).toBe(false)
  })

  it("ignora registros de outros dias", () => {
    const registros = [
      { data: "2026-08-01", valor: 50 },
      { data: "2026-08-31", valor: 50 },
    ]
    expect(progressoDoDia(diario, registros, "2026-08-13").valor).toBe(0)
  })
})

describe("FREQUENCIA_LABEL", () => {
  it("cobre as três frequências", () => {
    expect(Object.keys(FREQUENCIA_LABEL).sort()).toEqual(["diaria", "mensal", "semanal"])
  })
})
