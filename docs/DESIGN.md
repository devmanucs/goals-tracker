# DESIGN.md — Goals Tracker

Sistema visual do app. O objetivo deste documento é que qualquer tela nova nasça
parecida com as que já existem, sem precisar garimpar componente por componente.

## Princípios

1. **Entrada manual é a feature, não a limitação.** Todo formulário precisa ser
   rápido de preencher: poucos campos, defaults sensatos, nada de wizard.
2. **O dado do usuário é o protagonista.** Números grandes, chrome discreto.
   Ilustração só onde não há dado (estado vazio).
3. **Progresso sempre visível.** Toda entidade com meta (livro, concurso, hábito)
   mostra onde está e quanto falta, não só o valor absoluto.
4. **Nada de cor semântica sozinha.** Status também vem por rótulo ou ícone.

## Tokens

Definidos em [`src/app/globals.css`](../src/app/globals.css), em `oklch`, com
tema claro em `:root` e escuro em `.dark`. **Nunca escreva cor literal em componente** —
use os tokens via classes Tailwind (`bg-card`, `text-muted-foreground`, ...).

### Cor

| Token | Uso |
|---|---|
| `--background` / `--foreground` | Fundo e texto da página |
| `--card` / `--card-foreground` | Superfície elevada (cards, painéis) |
| `--primary` | Azul sereno. Ação principal, item ativo da sidebar |
| `--secondary` | Âmbar. Destaque secundário |
| `--accent` | Rosa suave. Destaque pontual |
| `--muted` / `--muted-foreground` | Fundo neutro e texto de apoio |
| `--destructive` | Ações destrutivas (excluir) |
| `--border` / `--input` / `--ring` | Bordas, campos e foco |
| `--chart-1` … `--chart-5` | Séries de gráfico e capas de livro |

A paleta é **dessaturada de propósito** (croma entre 0.015 e 0.075 no tema claro).
O app é de uso diário e prolongado; cor saturada cansa. Os `--chart-*` são as únicas
cores com identidade própria, e são usados também como `corCapa` dos livros.

### Raio

`--radius: 0.9rem` é a base; `--radius-sm` até `--radius-4xl` são derivados por
multiplicação. Use a escala, não valores soltos.

### Tipografia

- `--font-heading` (serifada) para títulos e números grandes — classe `font-heading`.
- Sans padrão do sistema para o resto.
- **Todo número que muda em tempo real usa `tabular-nums`**, senão a largura pula.

## Camadas de componente

O projeto tem três níveis. Respeite a ordem: **reusar antes de criar**.

```
src/components/ui/   → primitivos shadcn/base-ui (não editar à mão; vêm do registry)
src/components/ds/   → wrappers do design system, prefixados com Ds
src/components/      → componentes do app (app-sidebar, stat-card, illustration…)
src/features/<x>/components/ → componentes específicos de um módulo
```

Nas telas, prefira os `Ds*` (`DsFramePanel`, `DsSidebar`, `DsButton`): é a camada
onde uma decisão de estilo pode ser tomada uma vez e valer para o app inteiro.

## Shell da aplicação

`src/app/(app)/layout.tsx` monta `DsSidebarProvider` + `AppSidebar` + `DsSidebarInset`.
A sidebar é `collapsible="icon"` e tem cinco destinos fixos: Dashboard, Leitura,
Estudos, Hábitos, Retrospectiva.

Ícones: **HugeIcons** (`@hugeicons/react` + `@hugeicons/core-free-icons`), sempre
via `<HugeiconsIcon icon={X} strokeWidth={2} />`. Não misture outra biblioteca de ícone.

## Padrões de tela

Toda tela de módulo segue a mesma espinha:

1. **Cabeçalho** — título + ação principal (um botão só).
2. **`StatStrip`** — faixa de 4 métricas com `CountUp` animado
   ([`src/components/stat-card.tsx`](../src/components/stat-card.tsx)).
3. **Conteúdo** — grid de cards, tabela ou calendário, conforme o módulo.
4. **Estado vazio** — `Illustration` + uma frase + o mesmo botão de ação principal.

Detalhe (`/leitura/[id]`, `/estudos/[id]`, `/habitos/[id]`): breadcrumb, cabeçalho
com progresso, e abaixo o histórico de registros.

### Formulários

Sempre em diálogo (`*-form-dialog.tsx`), nunca em página própria. Validação com zod,
os mesmos schemas que o backend usa como contrato. Um diálogo por entidade,
reaproveitado para criar e editar.

### Estados vazios

`Illustration` serve seis ilustrações do unDraw a partir de `public/illustrations/`:
`reading`, `studying`, `habits`, `progress`, `winners`, `empty`. Estado vazio nunca
é só texto cinza.

## Tema claro/escuro

`next-themes` via `ThemeProvider`, alternado por `ThemeToggle` com View Transitions
(`use-theme-toggle.ts`). Ao criar componente, **teste nos dois temas** — vários tokens
do escuro usam alpha (`oklch(1 0 0 / 8%)`) e quebram fundos opacos assumidos.

## Acessibilidade

- Contraste mínimo AA para texto sobre `--muted` e `--card`.
- Foco visível sempre: o reset global aplica `outline-ring/50`.
- Ilustração é decorativa: `alt=""` (já é o padrão em `Illustration`).
- Status nunca só por cor.

## Ao criar uma tela nova

- [ ] Reusou `Ds*` em vez de criar primitivo novo?
- [ ] Só usou token de cor, nada literal?
- [ ] Números com `tabular-nums`?
- [ ] Tem estado vazio com ilustração?
- [ ] Funciona nos dois temas?
- [ ] Funciona com a sidebar recolhida e em tela estreita?
