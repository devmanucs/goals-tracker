# PRODUCT.md — Goals Tracker

## Visão / Problema
Apps existentes de tracking de hábitos têm atrito: Kindle não sincroniza progresso de
livro físico, Goodreads é todo em inglês e preso à conta Amazon (não dá pra editar
manualmente), e cada hábito acaba precisando de um app diferente. A proposta é um
webapp pessoal e multiusuário de acompanhamento de metas/hábitos, com **entrada manual
como escolha deliberada** (dá mais controle e consistência que sync automático), começando
por dois domínios concretos — Leitura e Estudos — mais um módulo genérico de hábitos.

## Usuários
Multiusuário desde o v1: cada pessoa (ex: a própria usuária e a Shara) tem conta e dados
isolados. Uso pessoal de produtividade, sem features sociais/compartilhadas no v1.

## Módulos do V1

### 1. Leitura
- Cadastro manual de livros: título, autor, total de páginas, status
  (quero ler / lendo / lido / abandonado).
- Registro de progresso manual: data + página atual (ou páginas lidas no dia).
- Estatísticas: livros lidos no período, páginas lidas, ritmo médio.

### 2. Estudos (concursos)
- Cadastro manual de um **concurso**: nome do concurso/cargo, banca, data da prova.
- Cadastro manual dos tópicos do edital: título, matéria/disciplina, **peso/prioridade**
  (reflete a importância do tópico na prova — ex: nº de questões no edital) e data
  agendada para estudo.
- Ordenação dos tópicos por peso/prioridade, para decidir o que estudar primeiro.
- Visualização em calendário do que estudar em cada dia.
- Marcar tópicos como pendente / estudando / estudado / revisão.
- **Fora do MVP:** upload de PDF do edital/cronograma com extração automática dos
  tópicos e pesos (ver Fase 2).

### 3. Hábitos genéricos
- CRUD de hábitos/metas com **contador numérico**: nome, unidade (ex: L, km, vezes),
  frequência (diário/semanal/etc.) e valor-meta por período (ex: "2L de água por dia",
  "5km por semana").
- Registro manual de valores por data (ex: "hoje bebi 1.5L"), somando contra a meta do
  período vigente.
- Cálculo de streak (períodos em que a meta foi batida) e progresso acumulado do
  período atual (ex: "3.2L de 5L essa semana").
- Base extensível para outros hábitos além de leitura/estudos.

## Cross-cutting: Dashboard & Retrospectiva
- Dashboard inicial: resumo do progresso atual dos três módulos (streaks, livro atual,
  próximo tópico de estudo).
- Tela de estatísticas/retrospectiva: resumo agregando dados por período (mês/ano),
  pensada para um "levantamento de fim de ano" — o dado é sempre 100% da própria usuária,
  sem depender de conta de terceiros.

## Fora de escopo no V1 (documentado para depois)
- Parsing/OCR de PDF de cronograma de estudos (Fase 2).
- Qualquer integração com Kindle/Goodreads/Amazon.
- Compartilhamento de dados entre usuários / features sociais.
- Notificações/lembretes automáticos.

## Modelo de dados (conceitual — não é o schema final)

```typescript
interface Usuario {
  id: string
  nome: string
  email: string
}

// Leitura
interface Livro {
  id: string
  usuarioId: string
  titulo: string
  autor: string
  totalPaginas: number
  status: "quero_ler" | "lendo" | "lido" | "abandonado"
}

interface RegistroLeitura {
  id: string
  livroId: string
  data: string
  paginaAtual: number
  observacao?: string
}

// Estudos (concursos)
interface Concurso {
  id: string
  usuarioId: string
  titulo: string
  banca: string
  dataProva: string
  status: string
}

interface TopicoEstudo {
  id: string
  concursoId: string
  titulo: string
  materia: string
  peso: number
  dataAgendada: string
  status: "pendente" | "estudando" | "estudado" | "revisao"
}

// Hábitos genéricos
interface Habito {
  id: string
  usuarioId: string
  nome: string
  unidade: string
  frequencia: "diaria" | "semanal" | "mensal"
  metaValor: number
}

interface RegistroHabito {
  id: string
  habitoId: string
  data: string
  valor: number
}
```

## Fase 2 (visão futura)
Quando o backend começar: upload de PDF do edital/cronograma de estudos →
parsing/transcrição → extração automática dos tópicos, pesos/prioridades e datas →
populamento automático do calendário de Estudos.

## Decisões técnicas em aberto
- Autenticação/provider (nada escolhido ainda).
- Banco de dados/ORM (nada escolhido ainda — sem Prisma/Drizzle no projeto hoje).
- Biblioteca/abordagem de parsing de PDF para a Fase 2.

## Notas de arquitetura
- O projeto já tem uma base completa de componentes shadcn/base-ui em
  `src/components/ui` e `src/components/ds` — reusar, não duplicar.
- Seguir o padrão de feature modules em `src/features/<feature>/components`
  (hoje vazio) para código específico de cada módulo (leitura, estudos, habitos).
