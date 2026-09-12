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
      types.ts        # tipos do contrato + constantes de apresentação
      api.ts          # leituras da API (server-only)
      actions.ts      # mutações (Server Actions)
  hooks/
  lib/
    dates.ts          # utilitários de data
    utils.ts          # cn()
```

A regra de ouro: **componente específico de módulo mora em `features/<modulo>/components`**.
`src/components/` é só para o que atravessa módulos.

## As três camadas de cada módulo

O `data.ts` mockado foi substituído por três arquivos com responsabilidades
separadas:

- **`types.ts`** — os tipos do contrato com a API, mais constantes e math de
  apresentação (rótulos, `corDaMateria`, `progressoDoDia` do heatmap).
- **`api.ts`** — as leituras. É `server-only`: quem lê o cookie de sessão e monta
  o `Authorization` é o servidor.
- **`actions.ts`** — as mutações, como Server Actions, cada uma revalidando as
  rotas afetadas.

Nenhum cálculo de produto mora mais aqui. Streak, progresso de período, páginas
lidas por delta e as séries da retrospectiva são do backend — ver
[INTEGRACAO.md](INTEGRACAO.md).

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

### Fechar diálogo depois da action

Os formulários usam `useActionState`. Para fechar a gaveta só quando a action dá
certo, o fechamento acontece **dentro do fluxo da action**, não num `useEffect`:

```tsx
const [estado, acao, salvando] = useActionState(
  async (anterior, formData) => {
    const resultado = await criarLivro(anterior, formData)
    if (resultado.ok) setOpen(false)
    return resultado
  },
  ESTADO_INICIAL,
)
```

`setState` dentro de efeito dispara render em cascata — e a regra
`react-hooks/set-state-in-effect` reprova, com razão.

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

## Verificação

```bash
pnpm lint        # eslint
pnpm typecheck   # tsc --noEmit
pnpm test        # jest
pnpm build       # next build
```

Os quatro rodam no CI a cada pull request — ver
[`.github/workflows/ci.yml`](../.github/workflows/ci.yml). O `build` é o passo que
mais pega coisa: além de compilar, o Next resolve as rotas e roda o TypeScript
sobre o grafo inteiro.

Os roteiros em `e2e/` rodam o app contra a API de verdade e ficam fora do CI de
propósito — precisam dos dois servidores no ar. Ver [TESTES.md](TESTES.md).

## Dívidas conhecidas

- `src/components/ui/**` e `src/hooks/use-mobile.ts` são gerados pelo CLI do
  shadcn e disparam `react-hooks/set-state-in-effect`. Corrigir à mão seria
  desfeito na próxima geração, então a regra fica como **aviso** só nesses
  caminhos (ver `eslint.config.mjs`) e segue como erro no código que é nosso.
- A busca externa de livros (`/livros/buscar-externo`, proxy do Open Library) está
  no [API_ROUTES.md](API_ROUTES.md) mas não foi implementada.
- Não há edição nem exclusão de livro, concurso, tópico e hábito pela interface —
  os endpoints existem, faltam as telas.
