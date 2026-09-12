# Goals Tracker

Webapp pessoal e multiusuário de acompanhamento de metas — Leitura, Estudos
(concursos) e Hábitos — com **entrada manual como escolha deliberada**.

Frontend em Next.js 16 + React 19 + Tailwind v4 + shadcn/base-ui.
Backend em [devmanucs/goals-tracker-back](https://github.com/devmanucs/goals-tracker-back).

## Rodando

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

Os dados ainda vêm dos mocks em `src/features/*/data.ts`. Para ligar na API,
ver [docs/INTEGRACAO.md](docs/INTEGRACAO.md).

## Scripts

| Script | O que faz |
|---|---|
| `pnpm dev` | Servidor de desenvolvimento |
| `pnpm build` / `pnpm start` | Build e produção |
| `pnpm lint` | ESLint |
| `pnpm format` | Prettier |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm test` | Jest |
| `pnpm test:watch` | Jest em watch |
| `pnpm test:coverage` | Jest com cobertura |

## Documentação

Tudo em [`docs/`](docs/README.md):

- [PRODUCT.md](docs/PRODUCT.md) — visão, escopo do V1, o que ficou pra fase 2
- [DESIGN.md](docs/DESIGN.md) — tokens, componentes, padrões de tela
- [IMPLEMENTACAO.md](docs/IMPLEMENTACAO.md) — como o frontend está organizado
- [INTEGRACAO.md](docs/INTEGRACAO.md) — contrato da API e plano de migração dos mocks
- [API_ROUTES.md](docs/API_ROUTES.md) — mapa original das rotas pedidas ao backend
- [TESTES.md](docs/TESTES.md) — o que é testado e como rodar

## Adicionando componentes shadcn

```bash
npx shadcn@latest add button
```

Os primitivos caem em `src/components/ui`. Nas telas, prefira os wrappers `Ds*`
de `src/components/ds` — ver [DESIGN.md](docs/DESIGN.md).
