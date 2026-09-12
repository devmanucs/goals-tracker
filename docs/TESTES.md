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
tests/lib/dates.test.ts   # parse, diasEntre, compararDatas, formatação
```

Os testes dos `features/*/data.ts` foram removidos junto com os mocks: eles
exercitavam dados que não existem mais. As regras que eles cobriam (streak,
progresso, páginas por delta) agora são do backend, onde têm 148 testes.

O `dates.test.ts` fixa uma armadilha real: **`diasEntre` NÃO serve de comparador**
de ordenação, porque devolve `b - a`. Usá-lo em `sort` ordena ao contrário, e foi
a causa de `paginaAtualDoLivro` reportar a primeira página em vez da atual. Para
ordenar por data, use `compararDatas`.

## Ponta a ponta (`e2e/`)

Rodam o app de verdade no Chromium, contra a API de verdade:

```bash
# terminal A
cd ../goals-tracker-back && pnpm dev
# terminal B
pnpm dev
# terminal C
pnpm test:e2e
```

- `e2e/auth.mjs` — rota protegida redireciona, registro entra, sidebar traz os
  dados de `/auth/me`, cookie é `httpOnly` e invisível para JS, logado sai de
  `/login`, sair apaga a sessão e credencial errada mostra a mensagem do backend.
- `e2e/fluxo-completo.mjs` — cria conta, cadastra livro, concurso, tópico e
  hábito, confere o percentual, a troca de status, o streak, a agregação do
  dashboard e da retrospectiva, e que **uma segunda conta não enxerga nada da
  primeira**.

Ficam **fora do CI** de propósito: dependem dos dois servidores no ar.

### O que não é testado (ainda)

- Componentes de UI isolados. `@testing-library/react` e `user-event` já estão
  instalados; os alvos que mais valem são os diálogos de formulário e o
  `streak-heatmap.tsx`. Precisariam de mock do `src/lib/api.ts`.
- Páginas e navegação fora do que o e2e cobre.

### Ao escrever teste novo

- Um `expect` por comportamento; nome de teste em português, descrevendo a regra.
- Teste o **caso de borda**: id inexistente, lista vazia, divisão por zero. A maior
  parte dos bugs desta base está aí, não no caminho feliz.
- Nada de snapshot de markup: quebra a cada ajuste de design e não afirma nada.

## CI

`.github/workflows/ci.yml`, em todo pull request dos dois repos:

| Frontend | Backend |
|---|---|
| `pnpm lint` | `pnpm prisma:generate` |
| `pnpm typecheck` | `pnpm typecheck` |
| `pnpm test` | `prisma migrate deploy` num banco do zero |
| `pnpm build` | `prisma migrate status` |
| | `pnpm test` |
| | `pnpm smoke` |

No frontend, o **build** é o passo que mais pega coisa: além de compilar, o Next
resolve as rotas e roda o TypeScript sobre o grafo inteiro.

No backend, aplicar as migrations num banco limpo pega migration esquecida ou
fora de sincronia com o schema, e o **smoke** pega o que o typecheck não pega —
que o processo realmente sobe, que o `/health` responde e que rota protegida
exige token.

## Backend (vitest)

No repo [goals-tracker-back](https://github.com/devmanucs/goals-tracker-back):

```bash
pnpm test    # vitest
pnpm smoke   # sobe o servidor e bate no /health
```

- `tests/unit/` — funções puras: streak nas três frequências, janelas de período,
  páginas lidas por delta, progresso de concurso, séries da retrospectiva, datas,
  enums.
- `tests/integracao/` — rotas de ponta a ponta com supertest, com destaque para os
  testes de **isolamento entre usuários** (toda rota é verificada contra um segundo
  usuário tentando ler/editar/apagar o recurso do primeiro).

O banco de teste (`prisma/test.db`) é recriado a cada execução e o `dev.db` nunca
é tocado.
