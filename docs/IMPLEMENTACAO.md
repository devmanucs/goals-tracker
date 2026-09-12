# IMPLEMENTACAO.md — Frontend

Como o frontend está organizado hoje, e as decisões que valem a pena conhecer antes
de mexer.

## Stack

- **Next.js 16** com App Router e React 19 (Server Components por padrão).
- **Tailwind v4** — configuração vive no CSS (`@theme inline`), não há `tailwind.config`.
- **shadcn/base-ui** (`style: base-luma`) para os primitivos.
- **zod** para validação de formulário — os mesmos schemas do contrato da API.
- **recharts** nos gráficos, **react-big-calendar** no calendário de estudos.
- **HugeIcons** para ícones, **unDraw** para ilustrações.
- **jest + testing-library** para teste.

## Estrutura

```
src/
  app/
    (app)/            # shell autenticado: sidebar + conteúdo
      page.tsx        # dashboard
      leitura/        # lista + [id] detalhe
      estudos/
      habitos/
      retrospectiva/
    login/
  components/
    ui/               # primitivos shadcn (gerados; não editar à mão)
    ds/               # wrappers Ds* do design system
    ...               # componentes do app
  features/
    <modulo>/
      components/     # componentes só daquele módulo
      data.ts         # dados + lógica do módulo (hoje mockado)
  hooks/
  lib/
    dates.ts          # utilitários de data
    utils.ts          # cn()
```

A regra de ouro: **componente específico de módulo mora em `features/<modulo>/components`**.
`src/components/` é só para o que atravessa módulos.

## A camada `data.ts`

Cada módulo tem um `data.ts` que hoje faz três coisas ao mesmo tempo:

1. guarda os dados mockados;
2. expõe seletores (`getLivro`, `getTopicosPorPeso`, …);
3. implementa a lógica derivada (`estatisticasLeitura`, `streakDoHabito`, …).

Foi a escolha certa para construir a UI sem backend, mas é também o ponto que muda
quando a API entrar — ver [INTEGRACAO.md](INTEGRACAO.md). As funções derivadas foram
portadas para o backend, que agora é a fonte de verdade desses cálculos.

### Data de referência fixa

`src/lib/dates.ts` exporta `HOJE = "2026-08-13"`, uma data **fixa**. Isso existe
por dois motivos: evita mismatch de hidratação entre servidor e cliente, e mantém
os exemplos de streak e contagem regressiva estáveis nas capturas de tela.

Ao ligar na API, `HOJE` sai e o "hoje" passa a vir do servidor (ver INTEGRACAO.md).

### Datas são strings `YYYY-MM-DD`

O app inteiro trata data como string ISO curta, nunca `Date`. É comparável com `<`,
ordenável com `localeCompare`, serializável e imune a fuso. `parseDate` só converte
para `Date` na hora de formatar, e ancora ao **meio-dia** (`T12:00:00`) — ancorar à
meia-noite faria a data escorregar um dia em fuso negativo.

### Armadilha: `diasEntre` não é comparador

`diasEntre(a, b)` devolve `b - a` — é uma **distância orientada**, pensada para
"quantos dias faltam", não para ordenar. Usada como comparador de `sort`, ela ordena
do mais recente para o mais antigo, e um `.at(-1)` depois disso devolve o registro
mais **antigo**.

Isso era um bug real: `paginaAtualDoLivro` reportava a primeira página registrada em
vez da atual, e `proximoTopico` devolvia o tópico mais distante em vez do mais próximo.
Corrigido com o comparador explícito `compararDatas`, e coberto por teste em
`tests/lib/dates.test.ts`. **Para ordenar por data, use `compararDatas`.**

## Server vs Client Components

Páginas são Server Components por padrão. `"use client"` só onde há estado, efeito
ou hook de navegação — é o caso da sidebar (`usePathname`), dos diálogos de formulário,
dos gráficos e do `CountUp`.

Ao trocar os mocks por fetch, o padrão preferido é: a **página** (server) busca os
dados e passa por props para os componentes de apresentação. Só use fetch no cliente
onde houver interação que revalide (formulário, filtro).

## Convenções

- Sem ponto e vírgula, aspas duplas, 2 espaços (`.prettierrc`).
- Nomes de domínio em **português** (`livro`, `topico`, `habito`, `registro`), termos
  de framework em inglês. Vale para variável, tipo, rota e campo de API.
- `cn()` de `@/lib/utils` para compor classe condicional.
- Import por alias `@/`, nunca caminho relativo longo.

## Dívidas conhecidas

- `src/components/ui/pagination.tsx` e `src/hooks/use-theme-toggle.ts` têm erro de
  typecheck pré-existente (prop `nativeButton` e redeclaração de `startViewTransition`).
  Não afetam runtime, mas deixam `pnpm typecheck` vermelho.
- `login-form.tsx` ainda só faz `router.push("/")`, sem chamar a API.
- A retrospectiva tem a janela de meses fixada em `2026-08-13` dentro de `ultimosMeses`.
