import {
  estatisticasLeitura,
  getLivro,
  getLivros,
  getRegistrosDoLivro,
  livroEmAndamento,
  livrosLidosNoAno,
  paginaAtualDoLivro,
  STATUS_LIVRO_LABEL,
} from "@/features/leitura/data";

describe("leitura — acesso aos dados", () => {
  it("encontra um livro por id", () => {
    expect(getLivro("l1")?.titulo).toBe("A Hora da Estrela");
  });

  it("devolve undefined para id inexistente", () => {
    expect(getLivro("nao-existe")).toBeUndefined();
  });

  it("tem rótulo para todo status usado nos livros", () => {
    for (const livro of getLivros()) {
      expect(STATUS_LIVRO_LABEL[livro.status]).toBeTruthy();
    }
  });

  it("devolve os registros do livro em ordem cronológica", () => {
    const datas = getRegistrosDoLivro("l1").map((r) => r.data);
    expect(datas).toEqual([...datas].sort());
  });

  it("não mistura registros de livros diferentes", () => {
    expect(getRegistrosDoLivro("l2").every((r) => r.livroId === "l2")).toBe(true);
  });

  it("devolve lista vazia para livro sem registro", () => {
    expect(getRegistrosDoLivro("l5")).toEqual([]);
  });
});

describe("leitura — página atual", () => {
  it("usa o registro MAIS RECENTE, não o primeiro", () => {
    // l1 vai de 20 -> 41 -> 68 -> 84. A página atual é 84.
    expect(paginaAtualDoLivro("l1")).toBe(84);
  });

  it("devolve 0 para livro sem nenhum registro", () => {
    expect(paginaAtualDoLivro("l5")).toBe(0);
  });

  it("nunca passa do total de páginas do livro", () => {
    for (const livro of getLivros()) {
      expect(paginaAtualDoLivro(livro.id)).toBeLessThanOrEqual(livro.totalPaginas);
    }
  });
});

describe("leitura — seletores do dashboard", () => {
  it("livroEmAndamento devolve um livro com status 'lendo'", () => {
    expect(livroEmAndamento()?.status).toBe("lendo");
  });

  it("livrosLidosNoAno conta só os lidos no ano pedido", () => {
    expect(livrosLidosNoAno("2026")).toBe(2);
    expect(livrosLidosNoAno("2020")).toBe(0);
  });
});

describe("leitura — estatísticas", () => {
  const stats = estatisticasLeitura();

  it("conta os livros por status", () => {
    expect(stats.livrosLidos).toBe(2);
    expect(stats.livrosLendo).toBe(2);
  });

  it("soma as páginas atuais de todos os livros", () => {
    // 84 (l1) + 268 (l2) + 264 (l3) + 662 (l4) = 1278.
    expect(stats.paginasLidasTotal).toBe(1278);
  });

  it("devolve um ritmo médio positivo com uma casa decimal", () => {
    expect(stats.ritmoMedioDiario).toBeGreaterThan(0);
    expect(Number(stats.ritmoMedioDiario.toFixed(1))).toBe(stats.ritmoMedioDiario);
  });
});
