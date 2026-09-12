import {
  compararDatas,
  diasEntre,
  formatarData,
  formatarDataCompleta,
  HOJE,
  hojeDate,
  parseDate,
} from "@/lib/dates";

describe("lib/dates", () => {
  it("ancora as datas ao meio-dia para não escorregar de fuso", () => {
    // Parsear "2026-08-13" direto no Date daria meia-noite UTC, que vira
    // 12/08 em qualquer fuso negativo. O T12:00:00 evita isso.
    expect(parseDate("2026-08-13").getDate()).toBe(13);
    expect(parseDate("2026-01-01").getMonth()).toBe(0);
  });

  it("hojeDate usa a data de referência fixa HOJE", () => {
    expect(hojeDate().toISOString().slice(0, 10)).toBe(HOJE);
  });

  describe("diasEntre", () => {
    it("conta dias para frente", () => {
      expect(diasEntre("2026-08-01", "2026-08-13")).toBe(12);
    });

    it("devolve negativo para trás", () => {
      expect(diasEntre("2026-08-13", "2026-08-01")).toBe(-12);
    });

    it("devolve 0 para a mesma data", () => {
      expect(diasEntre("2026-08-13", "2026-08-13")).toBe(0);
    });

    it("atravessa a virada de ano", () => {
      expect(diasEntre("2025-12-31", "2026-01-01")).toBe(1);
    });

    it("NÃO serve como comparador de ordenação", () => {
      // Armadilha documentada: diasEntre devolve `b - a`, então usado como
      // comparador ele ordena do mais recente para o mais antigo. Use
      // compararDatas. Este teste existe para o comportamento não voltar
      // a ser confundido com ordenação crescente.
      const datas = ["2026-08-09", "2026-08-02", "2026-08-05"];
      expect([...datas].sort((a, b) => diasEntre(a, b))).toEqual([
        "2026-08-09",
        "2026-08-05",
        "2026-08-02",
      ]);
    });
  });

  describe("compararDatas", () => {
    it("ordena do mais antigo para o mais recente", () => {
      const datas = ["2026-08-09", "2026-08-02", "2026-08-05"];
      expect([...datas].sort(compararDatas)).toEqual([
        "2026-08-02",
        "2026-08-05",
        "2026-08-09",
      ]);
    });

    it("devolve 0 para datas iguais", () => {
      expect(compararDatas("2026-08-13", "2026-08-13")).toBe(0);
    });

    it("ordena corretamente atravessando meses e anos", () => {
      const datas = ["2026-01-05", "2025-12-31", "2026-02-01"];
      expect([...datas].sort(compararDatas)).toEqual([
        "2025-12-31",
        "2026-01-05",
        "2026-02-01",
      ]);
    });
  });

  describe("formatação", () => {
    it("formata em pt-BR no formato curto", () => {
      expect(formatarData("2026-08-13")).toMatch(/13/);
    });

    it("formata a data completa com o ano", () => {
      expect(formatarDataCompleta("2026-08-13")).toMatch(/2026/);
    });
  });
});
