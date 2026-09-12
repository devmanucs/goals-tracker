import {
  corDaMateria,
  diasAteProva,
  getConcurso,
  getConcursos,
  getTopicosDoConcurso,
  getTopicosPorPeso,
  progressoConcurso,
  proximoTopico,
  STATUS_TOPICO_LABEL,
} from "@/features/estudos/data";
import { HOJE } from "@/lib/dates";

describe("estudos — acesso aos dados", () => {
  it("encontra um concurso por id", () => {
    expect(getConcurso("c1")?.banca).toBe("FGV");
  });

  it("devolve undefined para id inexistente", () => {
    expect(getConcurso("nao-existe")).toBeUndefined();
  });

  it("só devolve tópicos do concurso pedido", () => {
    expect(getTopicosDoConcurso("c2").every((t) => t.concursoId === "c2")).toBe(true);
  });

  it("tem rótulo para todo status de tópico", () => {
    for (const concurso of getConcursos()) {
      for (const topico of getTopicosDoConcurso(concurso.id)) {
        expect(STATUS_TOPICO_LABEL[topico.status]).toBeTruthy();
      }
    }
  });
});

describe("estudos — ordenação por peso", () => {
  it("ordena do maior para o menor peso", () => {
    const pesos = getTopicosPorPeso("c1").map((t) => t.peso);
    expect(pesos).toEqual([...pesos].sort((a, b) => b - a));
  });

  it("não perde nem duplica tópicos ao ordenar", () => {
    expect(getTopicosPorPeso("c1")).toHaveLength(getTopicosDoConcurso("c1").length);
  });
});

describe("estudos — progresso do concurso", () => {
  it("conta 'estudado' e 'revisao' como concluídos", () => {
    // c1 tem 10 tópicos: 3 estudados + 1 em revisão = 40%.
    expect(progressoConcurso("c1")).toBe(40);
  });

  it("devolve 0 para concurso sem nenhum tópico concluído", () => {
    expect(progressoConcurso("c2")).toBe(0);
  });

  it("devolve 0 (e não NaN) para concurso inexistente", () => {
    expect(progressoConcurso("nao-existe")).toBe(0);
  });
});

describe("estudos — próximo tópico", () => {
  const proximo = proximoTopico();

  it("é o tópico agendado MAIS CEDO de hoje em diante", () => {
    // O primeiro tópico não-estudado a partir de 2026-08-13 é t1.
    expect(proximo?.id).toBe("t1");
  });

  it("nunca devolve um tópico já estudado", () => {
    expect(proximo?.status).not.toBe("estudado");
  });

  it("nunca devolve um tópico no passado", () => {
    expect(proximo!.dataAgendada >= HOJE).toBe(true);
  });
});

describe("estudos — auxiliares", () => {
  it("diasAteProva devolve null para concurso inexistente", () => {
    expect(diasAteProva("nao-existe")).toBeNull();
  });

  it("diasAteProva conta os dias até a data da prova", () => {
    expect(diasAteProva("c1")).toBeGreaterThan(0);
  });

  it("corDaMateria é estável para a mesma matéria", () => {
    expect(corDaMateria("Direito Administrativo")).toBe(
      corDaMateria("Direito Administrativo"),
    );
  });

  it("corDaMateria sempre devolve uma cor do tema", () => {
    expect(corDaMateria("Qualquer Matéria")).toMatch(/^var\(--chart-[1-5]\)$/);
  });
});
