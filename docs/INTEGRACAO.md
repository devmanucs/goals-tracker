# INTEGRACAO.md — Ligando o frontend na API

Estado atual: **o backend já implementa tudo que o frontend precisa para sair do mock**,
menos `/auth/me`, `/auth/logout`, a busca externa de livros e a retrospectiva.
Este documento é o contrato real, conferido contra o código do backend.

Backend: [devmanucs/goals-tracker-back](https://github.com/devmanucs/goals-tracker-back)
(Express 5 + Prisma 7 + SQLite em dev).

## Convenções do contrato

- **Base URL** configurável por `NEXT_PUBLIC_API_URL` (dev: `http://localhost:3333`).
  Não há prefixo `/api/v1` — as rotas estão na raiz.
- **Auth**: `Authorization: Bearer <token>` em tudo, menos `/auth/*` e `/health`.
  O `usuarioId` vem **sempre do token**, nunca do body.
- **Datas**: string `YYYY-MM-DD`, igual ao que o front já usa. O backend converte
  para `DateTime` na fronteira e devolve sempre no formato curto.
- **Enums**: `lower_snake_case` nas duas pontas (`quero_ler`, `revisao`, `diaria`).
  O UPPER_SNAKE do Prisma não vaza para a API.
- **Recurso de outro usuário devolve 404**, não 403 — responder 403 confirmaria que
  aquele id existe.

### Formato de erro

```ts
type ErroApi = {
  error: {
    message: string
    code?: "VALIDACAO" | "ERRO_INTERNO"
    issues?: { campo: string; mensagem: string }[]
  }
}
```

`400` validação · `401` sem token/token inválido · `404` não encontrado ou de outro
usuário · `500` erro interno.

## Endpoints por módulo

### Auth
| Método | Rota | Resposta |
|---|---|---|
| POST | `/auth/register` | `{ id, nome, email }` — **não devolve token** |
| POST | `/auth/login` | `{ token }` |

> Atenção: a rota é `/auth/register`, não `/auth/registrar` como sugerido no
> [API_ROUTES.md](API_ROUTES.md) original. E o registro **não** devolve token — depois
> de registrar é preciso chamar o login. `/auth/me` e `/auth/logout` ainda não existem.

### Leitura
| Método | Rota | Observação |
|---|---|---|
| GET | `/livros?status=lendo` | |
| POST | `/livros` | `{ titulo, autor, totalPaginas, status?, corCapa? }` |
| GET/PATCH/DELETE | `/livros/:id` | DELETE remove os registros em cascata |
| GET/POST | `/livros/:id/registros` | `{ data, paginaAtual, observacao? }` |
| PATCH/DELETE | `/registros-leitura/:id` | |
| GET | `/leitura/estatisticas?de=&ate=` | |

`GET /leitura/estatisticas` devolve:

```ts
{
  livrosLidos: number
  livrosLendo: number
  livrosQueroLer: number
  livrosAbandonados: number
  paginasLidasTotal: number
  ritmoMedioDiario: number
  diasComRegistro: number
  periodo: { de: string | null; ate: string | null } | null
}
```

### Estudos
| Método | Rota | Observação |
|---|---|---|
| GET/POST | `/concursos` | |
| GET/PATCH/DELETE | `/concursos/:id` | DELETE remove os tópicos em cascata |
| GET/POST | `/concursos/:id/topicos` | GET aceita `?ordenarPor=peso\|data&status=` |
| GET | `/concursos/:id/calendario?de=&ate=` | agrupado por data |
| GET | `/concursos/:id/progresso` | `{ total, concluidos, percentual }` |
| GET | `/concursos/:id/dias-ate-prova` | `{ dataProva, dias }` |
| GET/PATCH/DELETE | `/topicos/:id` | |
| GET | `/estudos/proximo-topico` | `null` quando não há |
| GET | `/estudos/calendario?de=&ate=` | todos os concursos do usuário |

O calendário vem como **lista ordenada**, não objeto — para o front iterar sem
depender da ordem de chaves de um JSON:

```ts
{ data: string; total: number; topicos: TopicoEstudo[] }[]
```

Alimenta `calendario-topicos.tsx` e `calendario-semana.tsx` direto.

### Hábitos
| Método | Rota | Observação |
|---|---|---|
| GET/POST | `/habitos` | `{ nome, unidade, frequencia?, metaValor, icone? }` |
| GET/PATCH/DELETE | `/habitos/:id` | |
| GET/POST | `/habitos/:id/registros` | GET aceita `?de=&ate=` |
| GET | `/habitos/:id/progresso-atual` | |
| GET | `/habitos/:id/streak` | |
| PATCH/DELETE | `/registros-habito/:id` | |

```ts
// GET /habitos/:id/progresso-atual
{ habitoId, unidade, frequencia, inicio, fim, atual, meta, percentual, batido }

// GET /habitos/:id/streak
{ habitoId, frequencia, atual, periodoAtualBatido, recorde }
```

### Dashboard
`GET /dashboard` — uma requisição para o `module-cards.tsx` inteiro:

```ts
{
  leitura: {
    livroAtual: (Livro & { paginaAtual, percentual, ultimaLeitura }) | null
    livrosLidos: number
    paginasLidasTotal: number
    ritmoMedioDiario: number
  }
  estudos: {
    proximoTopico: (TopicoEstudo & { concurso, emQuantosDias }) | null
    concursosAtivos: number
  }
  habitos: {
    total: number
    streaksAtivos: { habitoId, nome, unidade, frequencia, icone, streak, recorde, progresso }[]
    metasBatidasNoPeriodo: number
  }
}
```

## Diferenças entre o mock e o backend

Estas são as que **mudam número na tela**. Leia antes de trocar a fonte de dados.

### 1. Streak passou a ser realmente consecutivo

O mock só trata streak diário como sequência; para semanal/mensal,
`calcularStreakAgrupado` agrupa por **mês** (`data.slice(0, 7)`) mesmo quando a
frequência é semanal, e **conta períodos batidos sem exigir que sejam contíguos**.

O backend implementa o que o produto descreve: períodos consecutivos, com a janela
correta de cada frequência (dia; semana de segunda a domingo; mês do dia 1 ao último).

### 2. O período vigente não zera mais o streak

No mock, um hábito diário aparece com streak 0 toda manhã antes do primeiro registro —
a sequência quebra no dia de hoje, que ainda está em andamento.

No backend o período vigente só **soma** ao streak quando já bateu a meta; enquanto
corre, ele não derruba nada. `periodoAtualBatido` diz qual dos dois casos é, então a
UI pode mostrar "3 dias 🔥" e "faltam 0.8 L pra manter" ao mesmo tempo.

### 3. `paginasLidasTotal` mudou de significado

No mock é a soma das páginas atuais de todos os livros (`paginaAtualDoLivro`). No
backend é a soma dos **avanços** entre registros — o que a pessoa efetivamente leu
no período. Sem período informado os dois convergem; com `?de=&ate=` só o backend
faz sentido.

### 4. Ordenação por data estava invertida no front

Ver [IMPLEMENTACAO.md](IMPLEMENTACAO.md#armadilha-diasentre-não-é-comparador).
Já corrigido — mas se algum componente dependia do comportamento antigo, é aqui
que ele vai mudar.

### 5. `corCapa` e `icone` são opcionais no backend

O mock sempre tem valor. No backend vêm `null` quando não informados — trate o
fallback na UI (sugestão: derivar do hash do título, como `corDaMateria` já faz).

## Plano de migração

Um módulo por vez, do menos para o mais acoplado: **Leitura → Estudos → Hábitos →
Dashboard → Retrospectiva**.

**1. Cliente HTTP.** Criar `src/lib/api.ts` com um `fetch` que injeta a base URL e o
header `Authorization`, e converte `ErroApi` em `Error` com a mensagem já em português.

**2. Auth de verdade.** `login-form.tsx` chama `POST /auth/login`, guarda o token
(cookie `httpOnly` via route handler é melhor que `localStorage`) e redireciona.
Sem `/auth/me`, o nome do usuário na sidebar continua fixo por enquanto.

**3. Por módulo:**
   - Mantenha os **tipos** de `data.ts` — eles já batem com o backend.
   - Troque os seletores (`getLivros`, `getLivro`, …) por chamadas na página (Server
     Component), passando os dados por props.
   - **Apague** as funções derivadas (`estatisticasLeitura`, `progressoConcurso`,
     `streakDoHabito`, `progressoPeriodoAtual`, `proximoTopico`) — elas agora são
     endpoint. Duplicar a regra nos dois lados é o que faz o número divergir.
   - Após mutação, `revalidatePath` da rota afetada.

**4. `HOJE` sai.** Nenhuma tela deve mais importar a data fixa: quem calcula período
é o backend. Onde o front ainda precisar de "hoje" (input de data com default), use
a data do cliente — é só valor inicial de formulário.

**5. Retrospectiva.** Ainda **não tem endpoint**. Ou se implementa
`GET /retrospectiva?meses=6` no backend, ou a tela é montada por cima de
`/leitura/estatisticas` e `/concursos/:id/progresso` com um período por mês.

## Variáveis de ambiente

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3333
```

O backend sobe com CORS liberado (`cors()` sem origem restrita) — suficiente para
dev, mas precisa ser restringido antes de qualquer deploy.
