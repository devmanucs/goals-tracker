# API_ROUTES.md — Goals Tracker

Mapeamento de todas as rotas que o backend (Express + Prisma, repo separado) precisa
expor para o frontend atual (hoje mockado em `src/features/*/data.ts`) deixar de usar
dados locais e passar a consumir a API de verdade.

Convenções:
- Prefixo sugerido: `/api/v1`.
- Tudo (exceto `/auth/registrar`, `/auth/login` e a busca externa de livros) exige
  `Authorization: Bearer <token>`. O `usuarioId` sempre vem do token — nunca do body.
- Toda rota abaixo é implicitamente escopada ao usuário logado (queries com
  `where: { usuarioId }`), já que o app é multiusuário desde o v1.
- Datas em `YYYY-MM-DD` (string), como já é usado em `src/lib/dates.ts`.
- Padrão de erro sugerido: `{ error: { message: string, code?: string } }` com status
  HTTP apropriado (400 validação, 401 não autenticado, 404 não encontrado, 403 recurso
  de outro usuário).

---

## 1. Auth

Nada disso existe ainda — [login-form.tsx](src/components/login-form.tsx) hoje só faz
`router.push("/")` sem chamar API nenhuma.

| Método | Rota | Descrição |
|---|---|---|
| POST | `/auth/registrar` | `{ nome, email, senha }` → cria usuário, retorna token |
| POST | `/auth/login` | `{ email, senha }` → retorna token |
| POST | `/auth/logout` | invalida sessão/refresh token (se usar refresh token) |
| GET | `/auth/me` | retorna usuário logado (`{ id, nome, email }`) |

**Modelo:** `Usuario { id, nome, email, senhaHash }` (Prisma).

---

## 2. Leitura (livros)

Baseado em [features/leitura/data.ts](src/features/leitura/data.ts).

### Livros

| Método | Rota | Descrição |
|---|---|---|
| GET | `/livros` | lista os livros do usuário (suporta `?status=lendo`) |
| GET | `/livros/:id` | detalhe de um livro |
| POST | `/livros` | cria livro: `{ titulo, autor, totalPaginas, status, corCapa }` |
| PATCH | `/livros/:id` | edita campos parciais |
| DELETE | `/livros/:id` | remove livro (e seus registros, cascade) |

### Registros de progresso

| Método | Rota | Descrição |
|---|---|---|
| GET | `/livros/:id/registros` | histórico de progresso do livro, ordenado por data |
| POST | `/livros/:id/registros` | `{ data, paginaAtual, observacao? }` |
| PATCH | `/registros-leitura/:id` | edita um registro |
| DELETE | `/registros-leitura/:id` | remove um registro |

### Busca externa (o motivo dessa conversa)

| Método | Rota | Descrição |
|---|---|---|
| GET | `/livros/buscar-externo?q=titulo` | proxy pro Open Library/Google Books, resposta normalizada |

Resposta normalizada sugerida (independente do provider por trás):
```json
[
  {
    "titulo": "Duna",
    "autor": "Frank Herbert",
    "totalPaginas": 688,
    "capaUrl": "https://covers.openlibrary.org/b/id/12345-L.jpg",
    "sinopse": "...",
    "isbn": "9780441172719",
    "anoPublicacao": 1965
  }
]
```
Não precisa de auth (é só um proxy de busca), mas vale rate-limit por IP pra não vazar
sua cota da API externa.

### Estatísticas

| Método | Rota | Descrição |
|---|---|---|
| GET | `/leitura/estatisticas` | porta `estatisticasLeitura()` pro backend: `{ livrosLidos, livrosLendo, paginasLidasTotal, ritmoMedioDiario }` |

**Modelos:** `Livro { id, usuarioId, titulo, autor, totalPaginas, status, corCapa }`,
`RegistroLeitura { id, livroId, data, paginaAtual, observacao? }`.

---

## 3. Estudos (concursos)

Baseado em [features/estudos/data.ts](src/features/estudos/data.ts).

### Concursos

| Método | Rota | Descrição |
|---|---|---|
| GET | `/concursos` | lista concursos do usuário |
| GET | `/concursos/:id` | detalhe |
| POST | `/concursos` | `{ titulo, banca, dataProva, status }` |
| PATCH | `/concursos/:id` | edita |
| DELETE | `/concursos/:id` | remove (e tópicos, cascade) |

### Tópicos do edital

| Método | Rota | Descrição |
|---|---|---|
| GET | `/concursos/:id/topicos` | lista tópicos (suporta `?ordenarPor=peso`) |
| POST | `/concursos/:id/topicos` | `{ titulo, materia, peso, dataAgendada, status }` |
| PATCH | `/topicos/:id` | edita (inclui trocar `status`) |
| DELETE | `/topicos/:id` | remove |

### Derivados

| Método | Rota | Descrição |
|---|---|---|
| GET | `/concursos/:id/progresso` | porta `progressoConcurso()`: `{ percentual }` |
| GET | `/concursos/:id/dias-ate-prova` | porta `diasAteProva()` |
| GET | `/estudos/proximo-topico` | porta `proximoTopico()`, usado no dashboard |

**Modelos:** `Concurso { id, usuarioId, titulo, banca, dataProva, status }`,
`TopicoEstudo { id, concursoId, titulo, materia, peso, dataAgendada, status }`.

---

## 4. Hábitos genéricos

Baseado em [features/habitos/data.ts](src/features/habitos/data.ts).

### Hábitos

| Método | Rota | Descrição |
|---|---|---|
| GET | `/habitos` | lista hábitos do usuário |
| GET | `/habitos/:id` | detalhe |
| POST | `/habitos` | `{ nome, unidade, frequencia, metaValor, icone }` |
| PATCH | `/habitos/:id` | edita |
| DELETE | `/habitos/:id` | remove (e registros, cascade) |

### Registros

| Método | Rota | Descrição |
|---|---|---|
| GET | `/habitos/:id/registros` | histórico, ordenado por data |
| POST | `/habitos/:id/registros` | `{ data, valor }` |
| PATCH | `/registros-habito/:id` | edita |
| DELETE | `/registros-habito/:id` | remove |

### Derivados

Essa é a parte mais delicada de portar — `progressoPeriodoAtual` e `streakDoHabito` em
[data.ts](src/features/habitos/data.ts:78) têm lógica não-trivial (início de período
por frequência, streak diário vs. agrupado semanal/mensal). Recomendo portar essas
funções puras quase 1:1 pro backend.

| Método | Rota | Descrição |
|---|---|---|
| GET | `/habitos/:id/progresso-atual` | `{ atual, meta, percentual }` do período vigente |
| GET | `/habitos/:id/streak` | número de períodos com meta batida |

**Modelo:** `Habito { id, usuarioId, nome, unidade, frequencia, metaValor, icone }`,
`RegistroHabito { id, habitoId, data, valor }`.

---

## 5. Dashboard & Retrospectiva (cross-cutting)

Agregam dados dos três módulos — fazem mais sentido como endpoints próprios no back do
que o frontend buscar tudo solto e recalcular.

| Método | Rota | Descrição |
|---|---|---|
| GET | `/dashboard/resumo` | livro em andamento, próximo tópico, streaks — pro `module-cards.tsx` |
| GET | `/retrospectiva?meses=6` | `{ paginasLidasPorMes, topicosEstudadosPorMes, habitosConcluidosPorMes, resumo }` — pro `retrospectiva-charts.tsx`, portando [data.ts](src/features/retrospectiva/data.ts) |

---

## Resumo do schema Prisma (conceitual)

```prisma
model Usuario {
  id       String @id @default(cuid())
  nome     String
  email    String @unique
  senhaHash String

  livros    Livro[]
  concursos Concurso[]
  habitos   Habito[]
}

model Livro {
  id            String @id @default(cuid())
  usuarioId     String
  usuario       Usuario @relation(fields: [usuarioId], references: [id])
  titulo        String
  autor         String
  totalPaginas  Int
  status        String // quero_ler | lendo | lido | abandonado
  corCapa       String
  capaUrl       String? // preenchido se veio da busca externa
  registros     RegistroLeitura[]
}

model RegistroLeitura {
  id          String @id @default(cuid())
  livroId     String
  livro       Livro @relation(fields: [livroId], references: [id], onDelete: Cascade)
  data        String
  paginaAtual Int
  observacao  String?
}

model Concurso {
  id        String @id @default(cuid())
  usuarioId String
  usuario   Usuario @relation(fields: [usuarioId], references: [id])
  titulo    String
  banca     String
  dataProva String
  status    String
  topicos   TopicoEstudo[]
}

model TopicoEstudo {
  id           String @id @default(cuid())
  concursoId   String
  concurso     Concurso @relation(fields: [concursoId], references: [id], onDelete: Cascade)
  titulo       String
  materia      String
  peso         Int
  dataAgendada String
  status       String
}

model Habito {
  id          String @id @default(cuid())
  usuarioId   String
  usuario     Usuario @relation(fields: [usuarioId], references: [id])
  nome        String
  unidade     String
  frequencia  String // diaria | semanal | mensal
  metaValor   Float
  icone       String
  registros   RegistroHabito[]
}

model RegistroHabito {
  id       String @id @default(cuid())
  habitoId String
  habito   Habito @relation(fields: [habitoId], references: [id], onDelete: Cascade)
  data     String
  valor    Float
}
```

## O que ficou de fora de propósito (fora do MVP, ver PRODUCT.md)

- Upload/parsing de PDF de edital (Fase 2).
- Qualquer integração Kindle/Goodreads/Amazon.
- Notificações/lembretes.
- Compartilhamento entre usuários.
