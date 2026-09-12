# TESTES.md

## Frontend (jest)

```bash
pnpm test            # roda tudo
pnpm test:watch      # modo watch
pnpm test:coverage   # com cobertura
```

Configuração em `jest.config.ts`, usando `next/jest` — ele cuida do SWC, dos aliases
`@/`, do CSS e das imagens. Ambiente `jsdom`. O `jest.setup.ts` carrega os matchers
do `@testing-library/jest-dom` e stuba três APIs de layout que o jsdom não tem
(`ResizeObserver`, `matchMedia` e `scrollIntoView`) — sem elas, qualquer teste que
abra diálogo ou command menu quebra com `ReferenceError`.

### O que é testado

```
tests/lib/dates.test.ts                          # parse, diasEntre, compararDatas, formatação
tests/lib/utils.test.ts                          # cn (merge de classes do Tailwind)
tests/lib/api.test.ts                            # cliente HTTP: header, 204, ApiError, issues
tests/features/leitura-types.test.ts             # corDaCapa e rótulos de status
tests/features/estudos-types.test.ts             # corDaMateria e rótulos
tests/features/habitos-types.test.ts             # progressoDoDia e frequências
tests/features/catalogo.test.ts                  # buscar/detalhar: URL, encoding, erro
tests/hooks/use-debounce.test.ts                 # atraso, cancelamento, troca de valor
tests/components/breadcrumb-context.test.tsx     # registro por contexto, sem re-registro à toa
tests/components/command-menu.test.tsx           # Ctrl+K, índice buscado uma vez, navegação
tests/components/auth/login-form.test.tsx        # troca de modo, envio, erro por campo
tests/components/leitura/                        # capa com fallback, card, filtro, busca no catálogo
tests/components/estudos/                        # peso, card de concurso, tabela de tópicos
tests/components/habitos/                        # heatmap de streak e card
tests/utils/render-com-query.tsx                 # helper: render com QueryClientProvider próprio
```

Os testes dos `features/*/data.ts` foram removidos junto com os mocks: eles
exercitavam dados que não existem mais. As regras que eles cobriam (streak,
progresso, páginas por delta) agora são do backend, onde têm 177 testes.

O `dates.test.ts` fixa uma armadilha real: **`diasEntre` NÃO serve de comparador**
de ordenação, porque devolve `b - a`. Usá-lo em `sort` ordena ao contrário, e foi
a causa de `paginaAtualDoLivro` reportar a primeira página em vez da atual. Para
ordenar por data, use `compararDatas`.

### Limite conhecido: o popup do Select trava no jsdom

Abrir o `Select` do Base UI (clique no gatilho) **pendura o teste** — ele depende da
API de popover e de medidas de layout que o jsdom não implementa, e o `act` nunca
resolve. Por isso `topicos-table.test.tsx` cobre ordenação, rótulos e estado do
gatilho, mas não a escolha de uma opção; a troca de status de ponta a ponta fica
com o `e2e/fluxo-completo.mjs`, que roda no Chromium de verdade. Se um teste novo
travar sem mensagem, suspeite disso antes de qualquer outra coisa.

### Mocks que todo teste de componente precisa

- Server Action (`features/*/actions.ts`): `jest.mock` no módulo inteiro. Elas
  importam `server-only` e o cookie da sessão, que não existem no jsdom.
- `src/lib/api.ts`: além do mock de `@/lib/sessao`, precisa de
  `jest.mock("server-only", () => ({}))`.
- `next/navigation`: mock do `useRouter`/`useSearchParams` nos componentes que
  navegam ou leem a query string.
- React Query: use `renderComQuery` de `tests/utils/` — um `QueryClient` por teste,
  com `retry: false`, senão o cache vaza de um teste para o outro e o teste de erro
  espera as tentativas.

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
- `e2e/busca-catalogo.mjs` — busca no catálogo externo, escolha de um resultado,
  preenchimento automático do formulário, sinopse no detalhe, e que a edição
  manual de um campo prevalece sobre o que veio do catálogo. Para rodar contra um
  catálogo controlado em vez da Open Library, suba a API com `CATALOGO_BASE_URL`
  apontando para um servidor que imite o `/search.json`.
- `e2e/fluxo-completo.mjs` — cria conta, cadastra livro, concurso, tópico e
  hábito, confere o percentual, a troca de status, o streak, a agregação do
  dashboard e da retrospectiva, e que **uma segunda conta não enxerga nada da
  primeira**.

Ficam **fora do CI** de propósito: dependem dos dois servidores no ar.

### O que não é testado (ainda)

- Diálogos de formulário (`*-form-dialog.tsx`): usam `Select` e `Sheet` do Base UI,
  que esbarram no limite acima.
- Páginas e navegação fora do que o e2e cobre.
- `app-sidebar.tsx` e `nav-user.tsx`: dependem do provider de sidebar e do tema.

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
