# TESTES.md

## Frontend (jest)

```bash
pnpm test            # roda tudo
pnpm test:watch      # modo watch
pnpm test:coverage   # com cobertura
```

Configuração em `jest.config.ts`, usando `next/jest` — ele cuida do SWC, dos aliases
`@/`, do CSS e das imagens. `jest.setup.ts` carrega os matchers do
`@testing-library/jest-dom`. Ambiente `jsdom`.

### O que é testado

```
tests/
  lib/dates.test.ts          # parse, diasEntre, compararDatas, formatação
  features/leitura.test.ts   # seletores, página atual, estatísticas
  features/estudos.test.ts   # ordenação por peso, progresso, próximo tópico
  features/habitos.test.ts   # progresso do período, streak, progresso do dia
```

O foco é a **lógica pura** de `features/*/data.ts` e `lib/dates.ts` — é onde ficam as
regras que também existem no backend, e onde um erro silencioso muda o número na tela
sem quebrar nada.

Dois testes merecem atenção porque documentam armadilhas reais:

- `dates.test.ts` fixa que **`diasEntre` NÃO serve de comparador** de ordenação
  (ele devolve `b - a`). Usá-lo em `sort` ordena ao contrário, e foi a causa de
  `paginaAtualDoLivro` reportar a primeira página em vez da atual. Use `compararDatas`.
- `leitura.test.ts` fixa que `paginaAtualDoLivro` usa o registro **mais recente**.

### O que não é testado (ainda)

- Componentes de UI. `@testing-library/react` e `user-event` já estão instalados;
  os alvos que mais valem são os diálogos de formulário (validação zod + submit)
  e `streak-heatmap.tsx`.
- Páginas e navegação.
- Nada que dependa da API — quando os mocks saírem, o teste de componente vai
  precisar de mock do cliente HTTP (`src/lib/api.ts`).

### Ao escrever teste novo

- Um `expect` por comportamento; nome de teste em português, descrevendo a regra.
- Teste o **caso de borda**: id inexistente, lista vazia, divisão por zero. A maior
  parte dos bugs desta base está aí, não no caminho feliz.
- Nada de snapshot de markup: quebra a cada ajuste de design e não afirma nada.

## Backend (vitest)

No repo [goals-tracker-back](https://github.com/devmanucs/goals-tracker-back):

```bash
pnpm test
```

- `tests/unit/` — funções puras: streak nas três frequências, janelas de período,
  páginas lidas por delta, progresso de concurso, datas, enums.
- `tests/integracao/` — rotas de ponta a ponta com supertest, com destaque para os
  testes de **isolamento entre usuários** (toda rota é verificada contra um segundo
  usuário tentando ler/editar/apagar o recurso do primeiro).

O banco de teste (`prisma/test.db`) é recriado a cada execução e o `dev.db` nunca
é tocado.
