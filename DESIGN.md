---
name: Destrava
description: Um passo pequeno em destaque, num ambiente leve e acolhedor.
colors:
  background: "#F4F6F8"
  surface: "#FFFFFF"
  surfaceMuted: "#E9EEF1"
  border: "#D8E0E5"
  borderStrong: "#78868F"
  text: "#17222B"
  textSecondary: "#4A5866"
  primary: "#136F63"
  onPrimary: "#FFFFFF"
  hero: "#0F3D3A"
  onHero: "#FFFFFF"
  onHeroSecondary: "#CFE5DF"
  heroAction: "#9EE6C9"
  onHeroAction: "#0F3D3A"
  demoBackground: "#FFF4CC"
  demoText: "#6B4E00"
typography:
  display:
    fontFamily: "Roboto, system-ui, sans-serif"
    fontSize: "28px"
    fontWeight: 700
    lineHeight: "34px"
  title:
    fontFamily: "Roboto, system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 700
    lineHeight: "30px"
  heading:
    fontFamily: "Roboto, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: "24px"
  body:
    fontFamily: "Roboto, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "24px"
  bodyStrong:
    fontFamily: "Roboto, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: "24px"
  caption:
    fontFamily: "Roboto, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "20px"
  label:
    fontFamily: "Roboto, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: "20px"
  button:
    fontFamily: "Roboto, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: "20px"
  stat:
    fontFamily: "Roboto, system-ui, sans-serif"
    fontSize: "28px"
    fontWeight: 700
    lineHeight: "32px"
    fontFeature: "tnum"
  tabLabel:
    fontFamily: "Roboto, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: "16px"
rounded:
  md: "12px"
  lg: "20px"
  xl: "28px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  xxl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.onPrimary}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
    height: "48px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
    height: "48px"
  button-hero:
    backgroundColor: "{colors.heroAction}"
    textColor: "{colors.onHeroAction}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
    height: "48px"
  card-default:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "16px"
  card-muted:
    backgroundColor: "{colors.surfaceMuted}"
    rounded: "{rounded.lg}"
    padding: "16px"
  card-hero:
    backgroundColor: "{colors.hero}"
    textColor: "{colors.onHero}"
    typography: "{typography.display}"
    rounded: "{rounded.xl}"
    padding: "24px"
  demo-badge:
    backgroundColor: "{colors.demoBackground}"
    textColor: "{colors.demoText}"
    typography: "{typography.caption}"
    rounded: "{rounded.md}"
    padding: "12px"
  empty-state:
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
    padding: "24px 16px"
  stat-tile:
    textColor: "{colors.primary}"
    typography: "{typography.stat}"
  stat-tile-boxed:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.stat}"
    rounded: "{rounded.lg}"
    padding: "16px"
  task-list:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "0"
  task-item:
    textColor: "{colors.text}"
    typography: "{typography.bodyStrong}"
    padding: "16px"
  task-item-done:
    textColor: "{colors.textSecondary}"
    typography: "{typography.bodyStrong}"
    padding: "16px"
  outcome-row:
    textColor: "{colors.text}"
    typography: "{typography.body}"
  outcome-row-value:
    textColor: "{colors.primary}"
    typography: "{typography.bodyStrong}"
  section-header-action:
    textColor: "{colors.primary}"
    typography: "{typography.label}"
    padding: "0 4px"
    height: "48px"
  tab-bar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.textSecondary}"
    typography: "{typography.tabLabel}"
    height: "56px"
  tab-bar-active:
    textColor: "{colors.primary}"
    typography: "{typography.tabLabel}"
---

# Design System: Destrava

> Fonte da verdade: [src/theme/index.js](src/theme/index.js) (tokens) e
> [src/components/](src/components/) (componentes). Este documento descreve o que existe
> no código ao fim da Etapa 1.1. Se os dois divergirem, vale o código, e este arquivo deve
> ser atualizado.
>
> Unidades: os valores em `px` do cabeçalho correspondem às unidades independentes de
> densidade do React Native (dp no Android; sp para texto, que acompanha o tamanho de fonte
> do sistema).

## Overview

**Creative North Star: "O Primeiro Passo"**

Tudo na tela converge para uma única ação pequena em destaque, num ambiente calmo e
acolhedor que reduz a ansiedade antes de pedir qualquer coisa. O resto da tela fica quieto
e recuado. Na prática, isso é o card escuro "Seu próximo passo", cujo passo é o maior texto
da tela, com o botão verde-claro "Começar 5 minutos". Ele fica sobre um fundo
cinza-azulado claro onde listas, números e avisos usam superfícies brancas, bordas finas e
texto em dois tons de cinza-azulado.

O clima é **acolhedor, organizado e leve**. Acolhedor porque os cantos são generosos, os
botões têm forma de pílula e os textos não cobram nada. Organizado porque há uma escala
única de espaçamento em múltiplos de 4, uma escala tipográfica fechada e uma cor de ação
só. Leve porque a densidade é baixa: uma coluna, blocos separados por 16 dp e nenhuma
sombra.

Os componentes são **acolhedores e firmes**: formas suaves, mas um destaque inequívoco onde
está a ação principal. O sistema rejeita explicitamente três referências: gamificação,
produtividade agressiva e visual clínico/hospitalar (ver Do's and Don'ts).

**Key Characteristics:**
- Um único elemento de destaque forte por tela: o card Petróleo Profundo, com o passo no
  maior texto da tela.
- Uma cor de ação (Verde-Petróleo) sobre neutros frios.
- Plano: profundidade só por contraste de superfícies, nunca por sombra.
- Fonte do sistema, sem limite de ampliação no conteúdo das telas (a única exceção é o
  rótulo das abas).
- Cantos arredondados em toda parte; botões sempre em pílula.
- Um único feedback de toque para tudo o que é tocável.
- Somente tema claro, inclusive nos elementos nativos (`userInterfaceStyle: "light"`).

## Colors

Neutros frios e dessaturados sustentam uma única família verde-petróleo, que marca ação e
destaque. O amarelo é reservado ao aviso de demonstração.

### Primary
- **Verde-Petróleo** (`primary`): a cor de ação. Fundo do botão principal, contorno e texto
  do botão secundário, links de seção ("Ver todas"), aba ativa, números em destaque
  (StatTile, OutcomeRow e os números da frase "Nesta semana" na tela Hoje), ícone de tarefa
  concluída e ícone dos estados vazios.
- **Branco sobre Petróleo** (`onPrimary`): texto e ícone do botão principal.

### Secondary
- **Petróleo Profundo** (`hero`): fundo exclusivo do card "Seu próximo passo". É a versão
  mais escura da mesma família e o único bloco escuro da interface.
- **Branco** (`onHero`): o passo dentro do card de destaque.
- **Menta Esmaecida** (`onHeroSecondary`): textos de apoio dentro do card de destaque
  (rótulo "Seu próximo passo", "Passo 1 de 3", frase de permissão para parar).
- **Menta Clara** (`heroAction`): fundo do botão dentro do card de destaque ("Começar 5
  minutos"). Só aparece sobre o Petróleo Profundo.
- **Petróleo Profundo sobre Menta** (`onHeroAction`): texto e ícone desse botão. É o mesmo
  valor de `hero`.

### Tertiary
- **Amarelo-Aviso** (`demoBackground`) e **Ocre Escuro** (`demoText`): exclusivos do
  aviso "Modo demonstração". Não são cor de alerta, erro ou destaque.

### Neutral
- **Névoa Fria** (`background`): fundo de todas as telas.
- **Branco** (`surface`): cards padrão, listas de tarefas, StatTile em caixa, barra de
  abas e fundo do botão secundário.
- **Névoa Funda** (`surfaceMuted`): blocos informativos discretos (card "Sobre o
  Destrava").
- **Borda Suave** (`border`): borda de 1 dp dos cards padrão, divisórias finas entre
  tarefas e linha superior da barra de abas. Decorativa: não é usada para delimitar
  controles.
- **Cinza-Ardósia** (`borderStrong`): contorno tracejado dos estados vazios. É a única
  borda com contraste de elemento gráfico (3:1).
- **Tinta** (`text`): texto principal.
- **Ardósia** (`textSecondary`): subtítulos, legendas, resumo das tarefas, aviso "Próximo
  passo em destaque no card acima", aba inativa, ícone de tarefa pendente e título de
  tarefa concluída.

### Contrastes (WCAG 2.1)

Os pares abaixo estão comentados no topo de `src/theme/index.js` (mínimo de 4,5:1 para
texto comum e 3:1 para elemento gráfico):

| Par | Contraste |
|---|---|
| `text` / `background` | 14,91:1 |
| `textSecondary` / `background` | 6,73:1 |
| `primary` / `surface` | 6,03:1 |
| `onPrimary` / `primary` | 6,03:1 |
| `onHero` / `hero` | 12,01:1 |
| `onHeroSecondary` / `hero` | 9,11:1 |
| `onHeroAction` / `heroAction` | 8,36:1 |
| `demoText` / `demoBackground` | 7,02:1 |
| `textSecondary` / `surfaceMuted` | 6,24:1 |
| `borderStrong` / `background` | 3,46:1 (elemento gráfico) |

Pares que aparecem na interface mas não estão no comentário, calculados durante a
documentação (fórmula WCAG 2.1, 28/10/2026):

| Par | Onde aparece | Contraste |
|---|---|---|
| `text` / `surface` | títulos de tarefa, cards brancos | 16,15:1 |
| `textSecondary` / `surface` | legendas em cards brancos, aba inativa | 7,29:1 |
| `text` / `surfaceMuted` | rótulo do card "Sobre o Destrava" | 13,82:1 |
| `primary` / `background` | "Ver todas", ícone do estado vazio | 5,57:1 |
| `heroAction` / `hero` | botão contra o card (elemento gráfico) | 8,36:1 |
| `border` / `surface` e `border` / `background` | bordas decorativas | 1,34:1 e 1,23:1 |

### Named Rules
**The One Hero Rule.** O Petróleo Profundo aparece uma vez por tela, no card "Seu próximo
passo". Nenhum outro bloco escuro, banner ou destaque compete com ele.

**The One Action Color Rule.** Toda ação e todo destaque interativo usa o Verde-Petróleo.
A Menta Clara é a mesma ação, só que dentro do card escuro.

**The Yellow Means Demo Rule.** O amarelo existe só para avisar que os dados são de
demonstração. Ele sai junto com o aviso, na Etapa 2.

## Typography

**Display Font:** fonte do sistema (Roboto no Android, SF Pro no iOS)
**Body Font:** fonte do sistema (a mesma)

**Character:** uma família só, a do aparelho. É legível, familiar e acompanha o tamanho de
fonte escolhido pelo usuário. A hierarquia vem de tamanho e peso (400, 600 e 700), nunca de
uma segunda família.

### Hierarchy
- **Display** (700, 28/34): o passo dentro do card "Seu próximo passo", que é o maior
  texto da tela Hoje. Também é usado nos textos do card quando ainda não há passo ("Nenhum
  passo por aqui ainda", "Defina um primeiro passo").
- **Title** (700, 24/30): título de cada tela (saudação, "Tarefas", "Progresso"), anunciado
  como cabeçalho pelo leitor de tela.
- **Heading** (600, 18/24): títulos de seção ("Tarefas de hoje", "Sua semana") e a pergunta
  central da tela Hoje ("Qual é a menor coisa que você pode começar agora?"), que fica
  acima do card e abaixo do passo na hierarquia.
- **Body** (400, 16/24): subtítulos de tela e textos corridos, como a frase "Nesta
  semana: …" da tela Hoje.
- **Body Strong** (600, 16/24): título de tarefa, título de estado vazio, valores em
  linhas de resultado e números dentro da frase "Nesta semana". Tem a mesma entrelinha do
  Body, então os dois se misturam numa linha sem desalinhar.
- **Caption** (400, 14/20): legendas, resumo de passos e textos de apoio.
- **Label** (600, 14/20): rótulos curtos e links de seção ("Ver todas"), incluindo o
  rótulo "Seu próximo passo".
- **Button** (600, 16/20): texto de botão.
- **Stat** (700, 28/32, algarismos tabulares): números da grade da aba Progresso.
- **Tab Label** (600, 12/16): rótulo das abas. É a única variante com ampliação limitada
  (ver The System Font Rule).

A variante `hero` (24/31) foi removida na Etapa 1.1. O passo do card passou a usar Display.

### Named Rules
**The System Font Rule.** Nenhuma fonte baixada. O conteúdo das telas nunca tem tamanho
máximo travado (`maxFontSizeMultiplier`): a interface se adapta à fonte ampliada, e não o
contrário.

*Exceção registrada (Etapa 1.1):* o rótulo das abas (componente `TabLabel`, em
`src/app/(tabs)/_layout.js`) tem a ampliação limitada a 1,2 (`tabLabelMaxFontScale`) e
ocupa uma linha só. A área das abas tem 56 dp (`tabBarHeight`) mais o espaço da barra de
navegação do sistema. Motivo: com a fonte do sistema no máximo, o rótulo era cortado
embaixo (teste de 28/10/2026). Qualquer outra exceção precisa de um motivo testado e
registrado do mesmo jeito.

**The Variant-Only Rule.** Todo texto passa por `AppText` com uma variante da escala. Fora
da variante, só são permitidos a cor e ajustes de layout (alinhamento, `flexShrink`,
margens); tamanho, peso e entrelinha vêm sempre da variante.

## Layout

Coluna única em retrato (`orientation: portrait`). Toda tela usa `Screen`: área segura no
topo e nas laterais, rolagem vertical e margens de 16 dp nas laterais, 24 dp no topo e
32 dp no fim. Os blocos da tela ficam a 16 dp uns dos outros (`gap: lg`), e os cabeçalhos de
seção ganham mais 8 dp acima. A base da tela fica a cargo da barra de abas, que soma 56 dp
ao espaço da barra de navegação do sistema (botões ou gestos).

O ritmo segue a escala de múltiplos de 4: 4 (dentro de cabeçalhos e entre as linhas de
texto de uma tarefa), 8 (ícone e texto, itens de estado vazio), 12 (dentro de cards e entre
colunas), 16 (entre blocos e no padding dos cards padrão), 24 (padding do card de destaque
e dos estados vazios) e 32 (fim da tela).

A única grade é a de números da tela Progresso: duas colunas fluidas (`flexBasis: 45%`,
`gap: md`). No teste de fonte máxima (28/10/2026) ela manteve as duas colunas e os textos
quebraram em mais linhas sem cortar. O máximo daquele aparelho equivale a cerca de 30% de
ampliação; aparelhos que permitem mais não foram testados. Não há pontos de quebra para
tablet.

### Named Rules
**The Tokens-Only Rule.** Todo espaçamento, raio, cor, área de toque e feedback de toque vem
de `src/theme`. Mudar a identidade visual deve exigir a edição de um único arquivo.

## Elevation & Depth

O sistema é plano e não usa nenhuma sombra. A profundidade vem de três camadas tonais: o
fundo Névoa Fria, as superfícies brancas com borda suave de 1 dp e, por cima de tudo em
peso visual, o card Petróleo Profundo. A única resposta de "elevação" é o toque: todo
elemento tocável usa o mesmo feedback (`pressedFeedback`), que deixa a opacidade em 0,8 e a
escala em 0,98 enquanto o elemento é pressionado.

### Named Rules
**The No-Shadow Rule.** Nenhum elemento ganha `shadow*` ou `elevation`. Para destacar algo,
use contraste de superfície. Se isso não bastar, o elemento provavelmente compete com o
card de destaque.

**The One Press Rule.** Todo elemento tocável responde ao toque com `pressedFeedback`. Não
se cria uma resposta de toque própria num componente.

## Shapes

As formas são suaves em toda parte, e o raio cresce com a importância do elemento:

- **Arredondado médio** (12 dp, `md`): aviso de demonstração.
- **Arredondado largo** (20 dp, `lg`): cards padrão e discretos, listas, StatTile em caixa e
  estados vazios.
- **Arredondado generoso** (28 dp, `xl`): somente o card de destaque.
- **Pílula** (999, `pill`): todos os botões.

Bordas: 1 dp sólida para cards (e, por consequência, para o StatTile em caixa), 1,5 dp para
o botão secundário e o contorno dos estados vazios, e linha fina do sistema
(`hairlineWidth`) entre tarefas. Os cards cortam o conteúdo nos cantos (`overflow:
hidden`), para que as divisórias das listas respeitem o raio.

### Named Rules
**The Dashed Means Space Rule.** Contorno tracejado significa "espaço disponível, ainda
vazio". Ele só aparece nos estados vazios.

## Components

Acolhedores e firmes: formas suaves, mas um destaque inequívoco onde está a ação principal.
Todos têm papel e rótulo de acessibilidade; os ícones são decorativos e ficam ocultos para
o leitor de tela.

### Buttons (`Button`)
- **Shape:** pílula (`pill`), altura mínima de 48 dp (`minTouchTarget`), padding de
  12 × 24 dp, ícone opcional de 20 dp a 8 dp do texto. O texto quebra linha e fica
  centralizado se não couber.
- **Primary:** fundo Verde-Petróleo, texto branco.
- **Secondary:** fundo branco, contorno de 1,5 dp e texto em Verde-Petróleo. É usado em
  "Nova tarefa" e nas ações de estado vazio.
- **Hero:** fundo Menta Clara, texto Petróleo Profundo. Só existe dentro do card de
  destaque, alinhado à esquerda.
- **Pressed:** `pressedFeedback` (opacidade 0,8 e escala 0,98). **Disabled:** opacidade
  0,5, com `accessibilityState.disabled`.
- Não há variante de texto puro nem de perigo/erro.

### Cards / Containers (`Card`)
- **Padding por variante:** 16 dp em `default` e `muted`, 24 dp em `hero`, sempre com
  espaçamento interno de 12 dp. Com `padded={false}` (listas de tarefas), o conteúdo
  controla o próprio espaçamento.
- **Acessibilidade:** propriedades extras (por exemplo, `accessible` e
  `accessibilityLabel`) são repassadas ao contêiner, para que o card inteiro possa ser lido
  como um único elemento.
- **Default:** fundo branco, borda suave de 1 dp, raio de 20 dp.
- **Muted:** fundo Névoa Funda, sem borda. É usado para informação de contexto ("Sobre o
  Destrava").
- **Hero:** fundo Petróleo Profundo, raio de 28 dp. Contém o rótulo "Seu próximo passo"
  (Label, com papel de cabeçalho para o leitor de tela), o passo (Display), o contexto
  (Caption), o botão Hero e a frase de permissão (Caption).
- **Shadow Strategy:** nenhuma (ver Elevation & Depth).

### Lista de tarefas (`TaskList`, em `src/features/tasks/TaskList.js`)
Um painel único que agrupa as tarefas, em vez de um card por tarefa.
- Card padrão com `padded={false}`: fundo branco, borda suave de 1 dp, raio de 20 dp. Quem
  controla o espaçamento são as linhas.
- Toda linha, a partir da segunda, recebe a divisória superior (`showDivider`). A primeira
  encosta direto na borda do card.
- O corte nos cantos (`overflow: hidden`) faz as divisórias respeitarem o raio.
- `highlightedTaskId`: identifica a tarefa cujo próximo passo já está no card de destaque.
  A linha dessa tarefa não repete o passo. A tela Hoje usa essa propriedade.
- Aparece na tela Hoje ("Tarefas de hoje") e na tela Tarefas ("Pendentes" e "Concluídas").

### Linha de tarefa (`TaskItem`, em `src/features/tasks/TaskItem.js`)
Mostra uma tarefa e, logo abaixo, o passo que vem a seguir.
- **Estrutura:** linha horizontal alinhada ao topo, com padding de 16 dp, ícone de 24 dp e,
  a 12 dp do ícone, uma coluna de texto que ocupa o resto da largura. As linhas de texto
  ficam a 4 dp uma da outra (`xs`).
- **Divisória:** linha fina do sistema (`hairlineWidth`) em Borda Suave, no topo, quando
  `showDivider` está ativo.
- **Pendente:** ícone de círculo vazio em Ardósia e título em Body Strong Tinta. Se houver
  passo em aberto, aparece "Próximo: [passo]" em Caption Tinta. Por último vem o resumo:
  "X de Y passos feitos", ou "Ainda sem passos definidos" quando a tarefa não tem passos,
  em Caption Ardósia.
- **Em destaque (`isHighlighted`):** quando o próximo passo da tarefa já está no card de
  destaque, a linha "Próximo" é trocada por "Próximo passo em destaque no card acima", em
  Caption Ardósia.
- **Concluída:** ícone de círculo marcado em Verde-Petróleo, título em Body Strong
  Ardósia, sem a linha "Próximo", e o resumo "Concluída".
- **Hierarquia:** "Próximo: [passo]" é o único Caption em Tinta do sistema, para que o
  passo seguinte se destaque do resumo, que fica em Ardósia. O aviso de destaque fica em
  Ardósia porque só aponta para o card, sem repetir o passo.
- **Acessibilidade:** a linha é um único elemento para o leitor de tela, que lê título,
  resumo e a linha do próximo passo (ou o aviso de destaque) numa frase só, separados por
  ponto.
- **Interação:** nenhuma nesta etapa. Abrir e concluir a tarefa ficam para a Etapa 2.

### Estado vazio (`EmptyState`)
- Contorno tracejado de 1,5 dp em Cinza-Ardósia, raio de 20 dp, padding de 24 × 16 dp,
  conteúdo centralizado.
- Ícone de 32 dp em Verde-Petróleo, título em Body Strong, mensagem em Caption Ardósia e,
  se houver ação, um botão secundário.
- Texto convidativo, sem cobrança ("Tudo bem. Quando quiser…").

### Números (`StatTile`)
- Número em Stat Verde-Petróleo com legenda em Caption Ardósia, lidos juntos pelo leitor
  de tela.
- **Em caixa (`boxed`):** reaproveita o Card padrão (fundo branco, borda suave de 1 dp,
  raio de 20 dp, padding de 16 dp) em vez de repetir esses estilos. É usado na grade da
  tela Progresso.
- **Solto:** continua disponível no componente, mas não é usado em nenhuma tela desde a
  Etapa 1.1.

### Resumo da semana (tela Hoje)
Um resumo simples do progresso, numa frase só. Os números completos ficam na aba Progresso.
- Card padrão com a frase "Nesta semana: [N sessões de foco] e [N passos feitos]." em Body,
  com os números e as palavras que os acompanham em Body Strong Verde-Petróleo. Singular e
  plural são ajustados (`pluralize`, em `src/utils/format.js`).
- Logo abaixo, "Cada começo conta, inclusive os pequenos." em Caption Ardósia.
- Sem dados da semana, é substituído por um estado vazio.

### Resultado da sessão (`OutcomeRow`, local de `src/app/(tabs)/progresso.js`)
Uma linha "rótulo e quantidade" para contar como as sessões terminaram.
- Componente local da tela Progresso: não é exportado e não fica em `src/components/`.
- **Estrutura:** linha horizontal centralizada na vertical, com rótulo à esquerda e valor
  à direita (`space-between`), a 12 dp de distância. Se o rótulo não couber, ele quebra
  linha e o valor permanece visível.
- **Rótulo:** Body em Tinta. **Valor:** Body Strong em Verde-Petróleo.
- **Uso:** três linhas ("Concluí o passo", "Avancei um pouco", "Precisei parar") dentro de
  um Card padrão. Elas ficam a 12 dp uma da outra (pelo espaçamento do card), sem
  divisórias, e são seguidas pela frase "Parar também faz parte…" em Caption Ardósia.
- **Tom:** as três saídas têm o mesmo peso visual. Parar não ganha cor diferente, ícone de
  alerta nem destaque negativo.
- **Acessibilidade:** a linha é um único elemento, lido como "[rótulo]: [valor]".

### Aviso de demonstração (`DemoBadge`)
- Fundo Amarelo-Aviso, texto Ocre Escuro, raio de 12 dp, padding de 12 dp, ícone de
  informação de 18 dp.
- "Modo demonstração." em Label, seguido da explicação em Caption. Sai na Etapa 2.

### Cabeçalhos (`ScreenHeader`, `SectionHeader`)
- **ScreenHeader:** título (Title, papel de cabeçalho) e subtítulo opcional (Body
  Ardósia), a 4 dp um do outro.
- **SectionHeader:** título (Heading, papel de cabeçalho) e ação opcional à direita em
  Label Verde-Petróleo, com altura mínima de 48 dp (`minTouchTarget`), área de toque
  estendida em 8 dp e o mesmo feedback de toque dos botões (`pressedFeedback`).

### Navigation (barra de abas)
- Três abas: Hoje (sol), Tarefas (checklist) e Progresso (gráfico de barras). Usa as `Tabs`
  do Expo Router, sem cabeçalho.
- Fundo branco com linha superior em Borda Suave. A aba ativa fica em Verde-Petróleo e as
  inativas em Ardósia, com ícone e texto sempre visíveis.
- **Rótulo (`TabLabel`):** variante Tab Label (12/16, peso 600), uma linha só, com
  ampliação limitada a 1,2 (`tabLabelMaxFontScale`).
- **Altura:** 56 dp (`tabBarHeight`) mais o espaço da barra de navegação do sistema.
- **Transição:** troca de aba com fade curto (`animation: 'fade'`), sem tela de espera.

### Ícones (`Icon`)
- Catálogo fechado em `src/components/Icon.js`, com SF Symbols no iOS e Material Symbols
  no Android/web. Nenhum ícone é usado fora do catálogo.
- Sempre decorativos (`accessible={false}`), porque o texto ao lado descreve a ação.
- Tamanhos em uso: 18 (aviso), 20 (padrão e botões), 24 (tarefas), 32 (estados vazios).

## Do's and Don'ts

### Do:
- **Do** manter um único card de destaque por tela, com uma única ação principal, e deixar
  o passo do card como o maior texto da tela.
- **Do** tirar todo valor visual de `src/theme/index.js`. Um valor novo vira token antes de
  ser usado.
- **Do** usar `AppText` com uma variante da escala para todo texto, deixando a fonte do
  sistema crescer sem limite. A única exceção registrada é o rótulo das abas.
- **Do** garantir área de toque de 48 dp (`minTouchTarget`) em todo controle.
- **Do** usar `pressedFeedback` como resposta ao toque em todo elemento tocável.
- **Do** verificar e registrar o contraste WCAG de todo par novo de cor: 4,5:1 para texto e
  3:1 para elemento gráfico.
- **Do** reconhecer o progresso de forma discreta, com números e frases como "Cada começo
  conta".
- **Do** usar, quando houver validação de formulário (ex.: título vazio), uma cor de erro
  acessível acompanhada de uma mensagem que explique como corrigir, sem tom de alarme. Essa
  cor ainda não existe e precisa virar token, com contraste verificado, antes do uso.

### Don't:
- **Don't** usar sombras ou `elevation`.
- **Don't** criar um segundo bloco escuro ou um destaque que concorra com o card "Seu
  próximo passo".
- **Don't** mostrar o mesmo passo duas vezes na mesma tela.
- **Don't** usar o amarelo de demonstração como cor de alerta, aviso ou destaque.
- **Don't** usar contorno tracejado fora dos estados vazios.
- **Don't** gamificar: nada de sequências (streaks), medalhas, confete ou contadores que
  punem dias parados.
- **Don't** adotar o visual de produtividade agressiva: nada de vermelho de urgência,
  prazos piscando ou linguagem de "bata a meta".
- **Don't** dar ao app cara clínica ou hospitalar, de saúde mental ou de terapia.
- **Don't** adicionar fontes, bibliotecas de ícones ou componentes visuais externos sem
  aprovação.

## Inconsistências observadas

Este levantamento foi feito durante a documentação (28/10/2026). Os itens resolvidos na
Etapa 1.1 continuam listados, com o número original, para manter o histórico. Os itens
pendentes são candidatos a decisão ou ajuste futuro.

**Resumo:** 10 resolvidos na Etapa 1.1 (1, 2, 3, 6, 7, 8, 9, 11, 13 e 14) e 4 pendentes
(4, 5, 10 e 12).

### Entre componentes e tokens
1. ✅ **Resolvido na Etapa 1.1. Ação do SectionHeader com 44 dp.** Usava `minHeight: 44`
   fixo, enquanto `Button` usava `minTouchTarget` (48). Agora a ação usa `minTouchTarget`.
2. ✅ **Resolvido na Etapa 1.1. Rótulo das abas fora da escala.** A barra de abas definia
   `fontSize: 12` e `fontWeight: '600'` direto no layout. Agora usa a variante `tabLabel`
   (12/16, 600).
3. ✅ **Resolvido na Etapa 1.1. Espaçamento fora da escala.** `TaskItem` usava `gap: 2`
   entre as linhas de texto. Agora usa `xs` (4).
4. ⏳ **Pendente. Tamanhos de ícone sem token.** Os tamanhos 18, 20, 24 e 32 estão fixos em
   cada componente, sem uma escala no tema.
5. ⏳ **Pendente. Espessuras de borda sem token.** Existem 1 dp (Card), 1,5 dp (Button
   secundário, EmptyState) e `hairlineWidth` (TaskItem), todas fixas nos componentes.
6. ✅ **Resolvido na Etapa 1.1. StatTile em caixa duplicava o Card.** O estilo `boxed`
   repetia fundo, borda, raio e padding do Card padrão. Agora reaproveita o Card.
7. ✅ **Resolvido na Etapa 1.1. Padding do card de destaque definido na tela.** O Card
   `hero` herdava 16 dp, e os 24 dp vinham de um `style` na tela Hoje. Agora o padding é
   definido por variante no próprio Card.
8. ✅ **Resolvido na Etapa 1.1. Feedback de toque diferente.** `Button` usava opacidade
   0,85 com escala 0,98, e `SectionHeader` usava opacidade 0,6 sem escala. Agora os dois
   usam `pressedFeedback` (0,8 e 0,98).
9. ✅ **Resolvido na Etapa 1.1. Variantes tipográficas quase iguais.** `title` (24/30) e
   `hero` (24/31) diferiam em 1 dp de entrelinha, e `bodyStrong` tinha entrelinha 22. A
   variante `hero` foi removida, e `bodyStrong` passou a 16/24, igual ao `body`.

### Fora dos componentes
10. ⏳ **Pendente. Cores de splash e ícone do template.** Em `app.json`, a splash usa
    `#208AEF` e o fundo do ícone adaptativo usa `#E6F4FE` (azul do template Expo), fora da
    paleta petróleo. Os ícones do app também são os do template.
11. ✅ **Resolvido na Etapa 1.1. Tema do sistema automático.** `app.json` declarava
    `userInterfaceStyle: "automatic"` num app só com tema claro. Agora declara `"light"`.
12. ⏳ **Pendente. Segundo arquivo de tema.** `src/constants/theme.ts` (do template)
    continua no projeto com outros valores. Ele não é usado, mas pode ser confundido com a
    fonte da verdade.
13. ✅ **Resolvido na Etapa 1.1. Transição entre abas não aplicada.** O registro marcava o
    fade como "a confirmar". Agora `src/app/(tabs)/_layout.js` define `animation: 'fade'`.
14. ✅ **Resolvido na Etapa 1.1. Tabela de contraste do registro incompleta.** O registro
    não trazia o par `onHeroSecondary` / `hero` (9,11:1) e nomeava os pares de outro jeito.
    Agora a tabela está completa e usa os nomes dos tokens.
