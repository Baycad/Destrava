# Destrava — Registro do projeto

Atualize este arquivo ao final de cada etapa. Uma funcionalidade só é marcada como
**testada** depois de executada de fato em um aparelho ou emulador.

Última atualização: 28/10/2026 (Etapa 1.1)

## Ambiente

- Windows 10, VS Code, Node.js v22.20.0
- Expo SDK 58, React Native 0.88.0, React 19.3.0, Expo Router (rotas em `src/app`)
- Testes em aparelho Android físico com Expo Go (SDK 58)
- `npx expo-doctor`: 20/20 aprovadas (antes da Etapa 1)
- Repositório Git próprio em `X:\programação\Destrava` (branch `main`)
- Impeccable 4.8.0 instalado no escopo de usuário (`C:\Users\Lucas Guerra\.claude`),
  usado pelo Claude Code no VS Code

## Histórico de commits

| Commit | Descrição |
|---|---|
| `39536e5` | chore: projeto Expo SDK 58 a partir do template |
| `4bc6b58` | feat: etapa 1 - estrutura visual e navegacao |
| (hash a registrar) | docs: registro atualizado e configuracao do Impeccable |
| `13b69f4` | docs: adiciona PRODUCT.md com o contexto do produto |
| (hash a registrar) | docs: adiciona DESIGN.md com o sistema visual |

## Etapa 1 — Estrutura e interface visual

Status: **implementada e testada no aparelho, com 2 testes de acessibilidade pendentes**

### Funcionalidades e testes

| Item | Status | Evidência |
|---|---|---|
| Navegação inferior: Hoje, Tarefas, Progresso | Testado ✅ | Vídeo no Android, 28/10 |
| Ícones (`expo-symbols`) nas abas e nas tarefas | Testado ✅ | Vídeo no Android, 28/10 |
| Tela Hoje: saudação por horário, data em português, card "Seu próximo passo", botão "Começar 5 minutos" (aviso), tarefas de hoje, resumo da semana | Testado ✅ | Vídeo no Android, 28/10 |
| Tela Tarefas: pendentes (3), concluídas (1), botão "Nova tarefa" (aviso) | Testado ✅ | Vídeo no Android, 28/10 |
| Tela Progresso: números da semana, resultados das sessões, bloco "Sobre o Destrava" | Testado ✅ | Vídeo no Android, 28/10 |
| Links "Ver todas" e "Ver progresso" | Testado ✅ | Relato do desenvolvedor |
| Estados vazios (`SHOW_DEMO_DATA = false`): aviso some, contornos tracejados aparecem | Testado ✅ | Relato do desenvolvedor |
| Botão "Criar minha primeira tarefa" (estado vazio) leva à aba Tarefas | Não confirmado | — |
| Fonte do sistema no tamanho máximo, sem texto cortado | Pendente | — |
| Leitura com TalkBack | Pendente | — |
| Transição em fade entre abas (`animation: 'fade'`) | Não aplicada na Etapa 1; incluída na Etapa 1.1 | — |

### Arquivos criados

- `src/app/_layout.js` — layout raiz (Stack + tema de navegação)
- `src/app/(tabs)/_layout.js` — abas inferiores
- `src/app/(tabs)/index.js` — tela Hoje
- `src/app/(tabs)/tarefas.js` — tela Tarefas
- `src/app/(tabs)/progresso.js` — tela Progresso
- `src/theme/index.js` — cores, espaçamentos, raios, tipografia
- `src/components/` — AppText, Button, Card, DemoBadge, EmptyState, Icon, Screen,
  ScreenHeader, SectionHeader, StatTile
- `src/features/tasks/` — selectors (funções puras), TaskItem, TaskList
- `src/data/demo.js` — dados de demonstração (chave `SHOW_DEMO_DATA`)
- `src/utils/date.js` — saudação e data por extenso em português

### Arquivos movidos (não apagados)

- `src/app/_layout.tsx`, `src/app/index.tsx`, `src/app/explore.tsx` → `template-original/app/`

### Decisões técnicas

1. **JavaScript (.js) dentro do template TypeScript.** O `tsconfig.json` não foi alterado;
   o Metro (empacotador do Expo) compila `.js` normalmente.
2. **Imports relativos** (`../../components/...`) em vez do atalho `@/`, para não depender
   da configuração de caminhos do TypeScript em arquivos JavaScript.
3. **Abas em JavaScript** (`Tabs` do `expo-router`, baseadas no React Navigation) em vez das
   abas nativas do template, para ter controle total de cores, rótulos e acessibilidade.
4. **Ícones com `expo-symbols`**, que já estava instalado (SF Symbols no iOS,
   Material Symbols no Android). Nenhuma biblioteca nova foi instalada.
5. **Somente tema claro** nesta etapa; modo escuro fica para versões futuras.
6. **Fonte do sistema** (Roboto/SF): legível, acompanha o tamanho de fonte do usuário
   e não exige download de fontes.
7. **Datas formatadas manualmente** em português, sem depender de `Intl`.
8. **Regra provisória do "próximo passo":** primeira tarefa pendente marcada para hoje com
   passo em aberto (decisão pendente nº 6 do planejamento).
9. **Sem tela de carregamento artificial entre abas.** As telas abrem praticamente na hora,
   porque os dados são locais; uma espera criada de propósito deixaria o app mais lento.
   Alternativa adotada: transição em fade entre abas. Estados de carregamento reais
   ficam para a Etapa 2, quando os dados forem lidos do armazenamento.

### Contrastes verificados (WCAG 2.1)

Os nomes seguem os tokens de `src/theme/index.js`. A tabela completa, com os pares
calculados durante a documentação, está no `DESIGN.md`.

| Par | Contraste |
|---|---|
| `text` / `background` | 14,91:1 |
| `textSecondary` / `background` | 6,73:1 |
| `textSecondary` / `surfaceMuted` | 6,24:1 |
| `primary` / `surface` | 6,03:1 |
| `onPrimary` / `primary` | 6,03:1 |
| `onHero` / `hero` | 12,01:1 |
| `onHeroSecondary` / `hero` | 9,11:1 |
| `onHeroAction` / `heroAction` | 8,36:1 |
| `demoText` / `demoBackground` | 7,02:1 |
| `borderStrong` / `background` (elemento gráfico) | 3,46:1 |

### Problemas conhecidos / limitações

- Botões "Começar 5 minutos" e "Nova tarefa" mostram apenas um aviso (funções nas próximas etapas).
- Linhas de tarefa ainda não são tocáveis.
- A saudação é calculada ao abrir a tela; se o app ficar aberto na virada do período, só
  atualiza ao reabrir.
- Componentes do template (`src/components/*.tsx`, `src/hooks`, `src/constants/theme.ts`)
  continuam no projeto, mas não são usados. Limpeza prevista para depois da Etapa 2.
- O botão flutuante de engrenagem visto nos testes pertence ao Expo Go, não ao Destrava.
- Ícone do app e tela de abertura (splash) ainda são os do template Expo (azul).

## Problemas de ambiente resolvidos

### 1. Repositório Git na pasta-mãe

- **Sintoma:** `git status` dentro do Destrava listava arquivos de outros projetos
  (`../baycad-rh`, instaladores `.exe` e `.msi`).
- **Causa:** o único repositório Git existente ficava em `X:\programação`, que contém vários
  projetos. O Destrava aparecia apenas como pasta não rastreada.
- **Solução:** criação de um repositório próprio com `git init` em `X:\programação\Destrava`
  (primeiro commit `39536e5`). Nenhum commit foi feito no repositório da pasta-mãe.

### 2. Permissão de escrita no disco X:

- **Sintoma:** o Claude Code não conseguia criar nem editar arquivos ("Acesso negado"), e
  `/impeccable hooks off` falhava.
- **Diagnóstico:** `icacls` mostrou que, por herança do disco, usuários comuns tinham só
  leitura e execução (`RX`) e apenas Administradores podiam modificar (`F`). O teste
  `New-Item` num terminal comum falhou. Os comandos anteriores tinham funcionado porque
  rodaram numa janela de PowerShell elevada (administrador).
- **Solução:** permissão explícita de modificação apenas para a pasta do projeto:
  `icacls "X:\programação\Destrava" /grant "lucas\lucas guerra:(OI)(CI)M" /T`.
  Não foi dada permissão ao disco inteiro, e o editor não passou a rodar como administrador.

### 3. Git: "dubious ownership"

- **Sintoma:** `git status` passou a recusar o repositório no terminal comum.
- **Causa:** a pasta e o `.git` tinham sido criados pela janela elevada, então o dono era o
  grupo Administradores (`S-1-5-32-544`), não a conta do usuário.
- **Solução:** transferência de posse para a conta do usuário:
  `icacls "X:\programação\Destrava" /setowner "lucas\lucas guerra" /T`.
- **Verificação:** `git status` limpo e criação/remoção de arquivo de teste no terminal comum.

**Lição:** trabalhar sempre em terminal e editor **sem** privilégios de administrador; o uso
de janela elevada escondeu o problema de permissões até a chegada do Claude Code.

## Ferramentas de apoio ao design (Impeccable)

- **O que é:** conjunto de *skills* de design para agentes de programação, usado pelo Claude
  Code no VS Code. Não funciona no chat do Claude.ai.
- **Instalação:** `npx impeccable install` (versão 4.8.0), escopo global (usuário), para não
  colocar arquivos da ferramenta no repositório.
- **Hook de verificação automática:** instalado nas configurações globais do Claude Code e
  **desligado neste projeto** com `/impeccable hooks off`. Motivo: o verificador foi pensado
  para páginas web; preferimos aplicar mudanças apenas quando pedidas, para poder revisar e
  explicar cada uma.
- **Arquivos no Git:**
  - versionados: `.impeccable/config.json` (registra o hook desligado), `PRODUCT.md`,
    `DESIGN.md` e `docs/avaliacoes/critique-tela-hoje.md`;
  - ignorados: `.impeccable/config.local.json` (configuração da máquina),
    `.impeccable/design.json` (gerado a partir do `DESIGN.md`) e `.impeccable/critique/`
    (histórico interno da ferramenta).
- **Regras de uso:** commit antes de cada comando que altera código; revisar `git diff`;
  nenhuma biblioteca ou fonte nova sem aprovação; testar no aparelho depois de cada mudança.

### Documentos gerados

| Documento | Conteúdo | Revisão |
|---|---|---|
| `PRODUCT.md` | Usuários, propósito, posicionamento, princípios, acessibilidade, evidências | Corrigido antes do commit (causa da procrastinação, check-in, disciplina, referências) |
| `DESIGN.md` | North Star "O Primeiro Passo", tokens, regras, componentes, 14 inconsistências | Corrigido antes do commit (item 13, regra de variantes, grade não testada) |
| `docs/avaliacoes/critique-tela-hoje.md` | Avaliação heurística da tela Hoje: 21/32 (Aceitável), 1 P1 e 4 P2 | Base da Etapa 1.1 |

**Ressalva metodológica:** a nota 21/32 e as personas do relatório de crítica vêm de uma
avaliação heurística (Nielsen) feita por ferramenta a partir do código. Não é teste com
usuários e não deve ser apresentada como resultado de pesquisa com pessoas.

## Etapa 1.1 — Ajustes de consistência e hierarquia

Status: **implementada, aguardando teste no aparelho**

Origem: problemas da crítica da tela Hoje + inconsistências listadas no `DESIGN.md`.

### Mudanças

| Mudança | Origem | Arquivos |
|---|---|---|
| O passo do card vira o maior texto da tela (`display`, 28); a pergunta central desce para `heading` (18), ainda fora do card | Crítica P1 | `src/app/(tabs)/index.js`, `src/theme/index.js` |
| Variante tipográfica `hero` removida (era quase igual a `title`) | DESIGN.md nº 9 | `src/theme/index.js` |
| `bodyStrong` com entrelinha 24, igual à de `body` | DESIGN.md nº 9 | `src/theme/index.js` |
| Rótulo "Seu próximo passo" com papel de cabeçalho para o TalkBack | Crítica (persona TalkBack) | `src/app/(tabs)/index.js` |
| Dica de acessibilidade honesta em "Começar 5 minutos" | Crítica P2 | `src/app/(tabs)/index.js` |
| A tarefa do card não repete o passo na lista: mostra "Próximo passo em destaque no card acima" | Crítica P2 | `TaskItem.js`, `TaskList.js`, `index.js` |
| "Sua semana" na tela Hoje vira uma frase ("Nesta semana: 6 sessões de foco e 3 passos feitos."); os números completos ficam na aba Progresso | Crítica (observação 5 e P2 de fonte ampliada) | `src/app/(tabs)/index.js`, `src/utils/format.js` |
| Padding de 24 dp do card de destaque passa a ser da variante `hero` | DESIGN.md nº 7 | `src/components/Card.js` |
| StatTile em caixa reaproveita o Card | DESIGN.md nº 6 | `src/components/StatTile.js`, `src/components/Card.js` |
| Ação de seção com 48 dp (`minTouchTarget`) | DESIGN.md nº 1 | `src/components/SectionHeader.js` |
| Mesmo feedback de toque em botões e links (`pressedFeedback`) | DESIGN.md nº 8 | `src/theme/index.js`, `Button.js`, `SectionHeader.js` |
| Rótulo das abas como variante `tabLabel` | DESIGN.md nº 2 | `src/theme/index.js`, `src/app/(tabs)/_layout.js` |
| `gap` do TaskItem dentro da escala (`xs`) | DESIGN.md nº 3 | `src/features/tasks/TaskItem.js` |
| Transição em fade entre abas | DESIGN.md nº 13 / pedido de UX | `src/app/(tabs)/_layout.js` |
| `userInterfaceStyle: "light"` enquanto só existe tema claro | DESIGN.md nº 11 | `app.json` |
| Tabela de contraste do registro completa e com nomes de token | DESIGN.md nº 14 | `docs/registro-do-projeto.md` |

### Adiado (com motivo)

| Item | Motivo | Quando |
|---|---|---|
| Círculo da tarefa que parece caixa de seleção | Na Etapa 2 ele vira uma caixa de seleção de verdade (concluir tarefa); trocar agora seria retrabalho | Etapa 2 |
| Botão "Criar minha primeira tarefa" que só navega | Na Etapa 2 ele abre o formulário de criação | Etapa 2 |
| "Diminuir este passo" / "Escolher outro" no card | Depende da decisão pendente nº 6 e do check-in | Etapa do check-in |
| Tamanhos de ícone e espessuras de borda como tokens | Ajuste menor, sem efeito visível | Limpeza depois da Etapa 2 |
| Ícone e splash com a identidade do Destrava | Exige novas imagens; a splash não aparece no Expo Go, então não daria para testar | Etapa própria de identidade |
| Remover `src/constants/theme.ts` e outros arquivos do template | Limpeza já planejada | Depois da Etapa 2 |

### Não adotado

- Indicador de aba em pílula do Material 3: contraria o "visual único" registrado no
  `PRODUCT.md`.

### Testes

| Item | Status |
|---|---|
| Hierarquia: passo do card maior que a pergunta e que a saudação | Pendente |
| Lista "Tarefas de hoje" sem repetir o passo do card | Pendente |
| "Sua semana" em uma frase, com plural correto | Pendente |
| Fade ao trocar de aba | Pendente |
| Botões e "Ver todas"/"Ver progresso" com o mesmo feedback de toque | Pendente |
| Aba Progresso sem mudança visual (StatTile reaproveitando o Card) | Pendente |
| `Alert` claro com o aparelho em modo escuro (`userInterfaceStyle: "light"`) | Pendente (pode não ter efeito no Expo Go) |
| TalkBack: rótulo "Seu próximo passo" como cabeçalho e dica honesta do botão | Pendente |
| Fonte do sistema no tamanho máximo (pendente desde a Etapa 1) | Pendente |

## Próximos passos

1. Testar a Etapa 1.1 no aparelho, incluindo os testes de acessibilidade pendentes desde a
   Etapa 1 (fonte máxima e TalkBack).
2. Atualizar o `DESIGN.md` com as mudanças da Etapa 1.1 e marcar as inconsistências resolvidas.
3. Rodar `/impeccable critique` de novo na tela Hoje e comparar com os 21/32.
4. Etapa 2: tarefas reais (criar, editar, concluir, excluir) com persistência local
   (AsyncStorage), estados de carregamento reais e caixa de seleção de verdade nas tarefas.
