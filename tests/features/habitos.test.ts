import {
  getHabito,
  getHabitos,
  getRegistrosDoHabito,
  progressoDoDia,
  progressoPeriodoAtual,
  streakDoHabito,
  type Habito,
  type RegistroHabito,
} from "@/features/habitos/data";

// Estes testes fixam o comportamento das funções puras de hábitos, que são a
// parte mais delicada de portar para o backend (ver docs/INTEGRACAO.md).

describe("habitos — acesso aos dados", () => {
  it("devolve os hábitos do mock", () => {
    expect(getHabitos().length).toBeGreaterThan(0);
  });

  it("encontra um hábito por id", () => {
    expect(getHabito("h1")?.nome).toBe("Beber água");
  });

  it("devolve undefined para id inexistente", () => {
    expect(getHabito("nao-existe")).toBeUndefined();
  });

  it("devolve os registros ordenados por data", () => {
    const datas = getRegistrosDoHabito("h1").map((r) => r.data);
    expect([...datas]).toEqual([...datas].sort());
  });

  it("não mistura registros de hábitos diferentes", () => {
    expect(getRegistrosDoHabito("h1").every((r) => r.habitoId === "h1")).toBe(true);
  });
});

describe("habitos — progresso do período atual", () => {
  it("soma os registros do dia para um hábito diário", () => {
    // h1 = beber água, meta 2 L/dia. Registro de 2026-08-13 (HOJE) é 1.2 L.
    const progresso = progressoPeriodoAtual("h1");
    expect(progresso.meta).toBe(2);
    expect(progresso.atual).toBe(1.2);
    expect(progresso.percentual).toBe(60);
  });

  it("acumula a semana inteira para um hábito semanal", () => {
    // h2 = correr, meta 15 km/semana. A semana de HOJE começa em 2026-08-10,
    // então entram os registros de 11/08 (4 km) e 13/08 (3 km).
    const progresso = progressoPeriodoAtual("h2");
    expect(progresso.meta).toBe(15);
    expect(progresso.atual).toBe(7);
  });

  it("devolve zerado para hábito inexistente, sem quebrar", () => {
    expect(progressoPeriodoAtual("nao-existe")).toEqual({
      atual: 0,
      meta: 0,
      percentual: 0,
    });
  });

  it("nunca passa de 100% no percentual", () => {
    for (const habito of getHabitos()) {
      expect(progressoPeriodoAtual(habito.id).percentual).toBeLessThanOrEqual(100);
    }
  });
});

describe("habitos — streak", () => {
  it("devolve 0 para o hábito diário cujo dia de hoje não bateu a meta", () => {
    // h1 em 2026-08-13 registrou 1.2 L contra meta de 2 L.
    expect(streakDoHabito("h1")).toBe(0);
  });

  it("devolve um número não-negativo para todos os hábitos", () => {
    for (const habito of getHabitos()) {
      expect(streakDoHabito(habito.id)).toBeGreaterThanOrEqual(0);
    }
  });

  it("devolve 0 para hábito inexistente", () => {
    expect(streakDoHabito("nao-existe")).toBe(0);
  });
});

describe("habitos — progresso de um dia isolado", () => {
  const habitoDiario: Habito = {
    id: "x",
    nome: "Teste",
    unidade: "L",
    frequencia: "diaria",
    metaValor: 2,
    icone: "water",
  };

  const registros: RegistroHabito[] = [
    { id: "a", habitoId: "x", data: "2026-08-13", valor: 1 },
    { id: "b", habitoId: "x", data: "2026-08-13", valor: 0.5 },
    { id: "c", habitoId: "x", data: "2026-08-12", valor: 3 },
  ];

  it("soma os registros do dia pedido", () => {
    expect(progressoDoDia(habitoDiario, registros, "2026-08-13").valor).toBe(1.5);
  });

  it("calcula o percentual contra a meta diária", () => {
    expect(progressoDoDia(habitoDiario, registros, "2026-08-13").percentual).toBe(0.75);
  });

  it("limita o percentual em 1 mesmo estourando a meta", () => {
    expect(progressoDoDia(habitoDiario, registros, "2026-08-12").percentual).toBe(1);
  });

  it("usa a meta rateada por dia em hábitos semanais", () => {
    // 15 km/semana -> referência diária de 15/7 km.
    const semanal = { ...habitoDiario, frequencia: "semanal" as const, metaValor: 15 };
    const umDia = [{ id: "d", habitoId: "x", data: "2026-08-13", valor: 15 / 7 }];
    expect(progressoDoDia(semanal, umDia, "2026-08-13").percentual).toBeCloseTo(1, 5);
  });

  it("devolve zero em dia sem registro", () => {
    expect(progressoDoDia(habitoDiario, registros, "2026-08-01")).toEqual({
      valor: 0,
      percentual: 0,
    });
  });
});
