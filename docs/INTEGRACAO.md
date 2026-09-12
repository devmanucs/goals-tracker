# INTEGRACAO.md — Ligando o frontend na API

Estado atual: **o frontend já consome a API — não há mais mock.** Este documento é
o contrato real, conferido contra o código do backend e exercitado pelos roteiros
em `e2e/`.

Todos os itens do [API_ROUTES.md](API_ROUTES.md) estão implementados.

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
| GET | `/auth/me` | `{ id, nome, email, createdAt }` |
| POST | `/auth/logout` | 204 — revoga o token usado |

> Atenção: a rota é `/auth/register`, não `/auth/registrar` como sugerido no
> [API_ROUTES.md](API_ROUTES.md) original. E o registro **não** devolve token — a
> action `registrar` já emenda o login por causa disso.

`POST /auth/logout` **revoga de verdade**: o token entra numa lista de bloqueio e
para de valer na hora, em vez de só sumir do cliente. Depois dele, qualquer
requisição com aquele token dá 401. Só o dispositivo atual cai.

### Leitura
| Método | Rota | Observação |
|---|---|---|
| GET | `/livros?status=lendo` | |
| POST | `/livros` | `{ titulo, autor, totalPaginas, status?, corCapa? }` |
| GET/PATCH/DELETE | `/livros/:id` | DELETE remove os registros em cascata |
| GET/POST | `/livros/:id/registros` | `{ data, paginaAtual, observacao? }` |
| PATCH/DELETE | `/registros-leitura/:id` | |
| GET | `/leitura/estatisticas?de=&ate=` | |
| GET | `/livros/buscar-externo?q=&limite=` | Busca no catálogo (Open Library) |
| GET | `/livros/buscar-externo/detalhe?chave=` | Sinopse do livro escolhido |

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

### Busca no catálogo externo

Duas rotas, porque buscar a sinopse de cada item da lista custaria uma requisição
por resultado. A lista é um seletor; o texto só interessa depois de escolher.

```ts
// GET /livros/buscar-externo?q=duna&limite=8
{
  fonte: string       // qual provedor respondeu
  cache: boolean      // se veio do cache do backend
  resultados: {
    chave: string     // id no provedor, ex "/works/OL27448W"
    titulo: string
    autor: string | null
    totalPaginas: number | null
    capaUrl: string | null
    anoPublicacao: number | null
    isbn: string | null
  }[]
}

// GET /livros/buscar-externo/detalhe?chave=/works/OL27448W
// o acima, mais:
{ sinopse: string | null; assuntos: string[] }
```

Ambas **exigem token**. O backend limita a 30 buscas por minuto por usuário e
guarda o resultado em cache; ainda assim, o frontend só dispara a consulta depois
de 350 ms sem digitação e a partir de 2 caracteres.

No frontend, a busca é o **único** ponto que usa React Query (`queryKey:
["catalogo", "buscar", termo]`) — o resto do app é Server Component. Como o token
está num cookie `httpOnly`, o componente de cliente passa pelos route handlers
`/api/livros/buscar` e `/api/livros/buscar/detalhe`.

`Livro` ganhou `capaUrl`, `sinopse`, `isbn` e `anoPublicacao`, todos opcionais —
cadastro manual continua funcionando sem nenhum deles.

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

### Retrospectiva
`GET /retrospectiva?meses=6` (1 a 60, padrão 6) — as três séries mensais e o
resumo, no formato que o `retrospectiva-charts.tsx` espera:

```ts
{
  meses: number
  paginasLidasPorMes: { mes: string; paginas: number }[]
  topicosEstudadosPorMes: { mes: string; topicos: number }[]
  habitosConcluidosPorMes: { mes: string; percentual: number }[]
  resumo: { livrosLidos, paginasLidas, topicosEstudados, maiorStreak }
}
```

Meses sem dado vêm zerados, para o gráfico não ficar com buraco.

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
    lista: Habito[]          // todos, ordenados por streak
    comStreakAtivo: number
    metasBatidasNoPeriodo: number
  }
}
```

### Derivados que já vêm embutidos

Para a listagem não virar N+1, a API devolve os derivados junto da entidade:

| Entidade | Campos extras |
|---|---|
| `Livro` | `paginaAtual`, `percentual`, `ultimaLeitura` |
| `Concurso` | `progresso { total, concluidos, percentual }`, `diasAteProva` |
| `Habito` | `progresso`, `streak`, `registrosRecentes` (90 dias) |

Os endpoints isolados (`/concursos/:id/progresso`, `/habitos/:id/streak`…)
continuam existindo para quem quiser só o número.

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

## Como a integração ficou montada

Feita um módulo por vez, do menos para o mais acoplado: **Leitura → Estudos →
Hábitos → Dashboard → Retrospectiva**. O desenho final:

**Cliente HTTP** — `src/lib/api.ts`, `server-only`: injeta a base URL e o header
`Authorization`, e converte o `{ error: { … } }` do backend num `ApiError` tipado.

**Sessão** — o JWT vive num cookie `httpOnly` (`gt_sessao`), então JavaScript no
navegador não alcança o token e um XSS não consegue lê-lo. É por isso que toda
chamada à API sai do servidor: nenhum componente de cliente fala com a API direto.
`src/features/auth/data.ts` valida o token contra `/auth/me` e é o que de fato
protege as rotas; `src/proxy.ts` (em Next 16 o middleware virou Proxy) só faz a
checagem otimista de presença do cookie.

**Por módulo** — cada um tem `types.ts` (tipos e constantes de apresentação),
`api.ts` (leituras, `server-only`) e `actions.ts` (mutações, Server Actions). As
páginas são Server Components que buscam e passam por props; depois de mutar, a
action chama `revalidatePath`, então não existe cópia local do estado para sair de
sincronia com o servidor.

**Cálculo derivado saiu do front.** `estatisticasLeitura`, `progressoConcurso`,
`streakDoHabito`, `progressoPeriodoAtual` e `proximoTopico` viraram endpoint —
duplicar a regra nos dois lados é justamente o que faz o número divergir. No
frontend sobrou só math de apresentação: a cor da capa, a cor da matéria e a
intensidade de cada célula do heatmap.

**A data fixa `HOJE` saiu das telas.** Onde ainda é preciso um "hoje" — valor
inicial de campo de data, recorte visual do heatmap — usa-se a data do navegador.
Período e streak são responsabilidade do backend.

## Variáveis de ambiente

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3333
```

O backend sobe com CORS liberado (`cors()` sem origem restrita) — suficiente para
dev, mas precisa ser restringido antes de qualquer deploy.
