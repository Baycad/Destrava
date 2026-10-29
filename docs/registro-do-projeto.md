# Destrava — Registro do projeto

Atualize este arquivo ao final de cada etapa. Uma funcionalidade só é marcada como
**testada** depois de executada de fato em um aparelho ou emulador.

Última atualização: 29/10/2026 (Etapa 2 e testes automáticos concluídos)

## Ambiente

- Windows 10, VS Code, Node.js v22.20.0
- Expo SDK 58, React Native 0.88.1 (era 0.88.0 até o fim da Etapa 2), React 19.3.0,
  Expo Router (rotas em `src/app`)
- Persistência: `@react-native-async-storage/async-storage` 2.2.0 (desde a Etapa 2a)
- Testes automáticos: `jest` 30.5.2, `jest-expo` 58.0.13 e `@types/jest` 30.0.0, só como
  dependências de desenvolvimento. Comandos: `npm test` e `npm run test:coverage`
- Testes em aparelho Android físico com Expo Go (SDK 58)
- `npx expo-doctor`: 20/20 aprovadas (antes da Etapa 1)
- Repositório Git próprio em `X:\programação\Destrava` (branch `main`), conectado a um
  repositório remoto no GitHub (`origin/main`) desde a Etapa 2
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
| (hash a registrar) | docs: avaliacao heuristica da tela Hoje |
| (hash a registrar) | feat: etapa 1.1 - hierarquia da tela Hoje e consistencia do sistema visual |
| `0593d37` | fix: rotulos das abas cortados com fonte ampliada |
| (hash a registrar) | docs: registro da etapa 1.1 com resultados dos testes |
| `f6e8b65` | docs: DESIGN.md atualizado com a etapa 1.1 |
| `4cb682c` | chore: restaura regras do Impeccable no .gitignore |
| (hash a registrar) | feat: etapa 2a - tarefas salvas no aparelho (AsyncStorage) |
| `b139326` | feat: etapa 2b - formulario de criacao de tarefas |
| `e911cbc` | feat: etapa 2c - concluir, editar e excluir tarefas |
| `fe1c7ab` | fix: etapa 2d - card Hoje sem pendencias e acessibilidade do formulario |
| `7e85b66` | fix: pontuacao da dica falada, toque na linha Para hoje e tokens de demonstracao |
| `ad6c750` | chore: react-native 0.88.1 (compativel com o SDK 58) |
| `291e063` | docs: etapa 2 concluida - registro, DESIGN.md e testes |
| `6c2be5b` | test: jest configurado com testes de logica |
| (hash a registrar) | fix: pacotes do jest so em devDependencies, cobertura de todo o src e teste do buildSpokenHint |

Para preencher os hashes: `git --no-pager log --oneline`.

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
| Fonte do sistema no tamanho máximo, sem texto cortado | Testado na Etapa 1.1 (ver abaixo) | Vídeo 17:23 e prints 17:35–17:40 |
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

### 4. Conflito ao conectar o repositório ao GitHub

- **Sintoma:** `git status` mostrou um merge em andamento, com conflito do tipo
  "both added" em `.gitignore` e `README.md`.
- **Causa provável:** o repositório do GitHub foi criado com `README.md` e `.gitignore`
  próprios; ao juntar com o histórico local, os dois lados tinham versões diferentes dos
  mesmos arquivos.
- **Solução:** conflito resolvido pelo desenvolvedor. Na resolução, as regras do Impeccable
  saíram do `.gitignore`, e `.impeccable/critique/` e `.impeccable/design.json` voltaram a
  aparecer como não rastreados. As regras foram restauradas (commit `4cb682c`), e
  `git ls-files` confirmou que nenhum arquivo local do Impeccable tinha sido versionado.

### 5. Versão de patch do React Native

- **Sintoma:** `npx expo-doctor` passou de 20/20 para 19/20: esperado `react-native`
  0.88.1, instalado 0.88.0.
- **Causa:** uma versão de correção foi publicada depois da criação do projeto. Não tinha
  relação com o código do app.
- **Solução:** `npx expo install react-native`, num commit separado. A diferença no
  `package-lock.json` ficou restrita à família do `react-native` (relatório
  `docs/avaliacoes/testes-etapa2-ajustes.md`). `expo-doctor` voltou a 20/20.

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
| `docs/avaliacoes/auditoria-acessibilidade-etapa2.md` | Auditoria de acessibilidade do código (sem aparelho): 17 OK, 4 problemas, 5 não verificáveis | Base das correções da Etapa 2d |
| `docs/avaliacoes/testes-etapa2d.md` | Testes sem aparelho da 2d: escopo, `expo-doctor`, compilação Android, 61 testes de lógica e revisão de código | 2 falhas, corrigidas nos ajustes finais |
| `docs/avaliacoes/testes-jest.md` | Testes sem aparelho da configuração do Jest: 56 testes, detecção de erro, cobertura, bundle sem testes | 2 falhas (pacotes duplicados em `dependencies` e `DESIGN.md` desatualizado), corrigidas no commit seguinte |
| `docs/avaliacoes/testes-etapa2-ajustes.md` | Testes sem aparelho dos ajustes finais: `expo-doctor` 20/20, compilação, 74 testes de lógica | 1 falha de documentação (DESIGN.md), tratada na atualização do DESIGN.md |

**Ressalva metodológica:** a nota 21/32 e as personas do relatório de crítica vêm de uma
avaliação heurística (Nielsen) feita por ferramenta a partir do código. Não é teste com
usuários e não deve ser apresentada como resultado de pesquisa com pessoas.

## Etapa 1.1 — Ajustes de consistência e hierarquia

Status: **concluída e testada no aparelho**, com o teste de TalkBack adiado

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
| Rótulo das abas com ampliação limitada a 1,2 (`tabLabelMaxFontScale`) e área das abas com 56 dp (`tabBarHeight`) mais o espaço da barra do sistema | Defeito encontrado no teste de fonte máxima | `src/theme/index.js`, `src/app/(tabs)/_layout.js` |
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

Aparelho: Android físico com Expo Go. Evidências: vídeo de 28/10 às 17:11 (navegação e
telas), vídeo de 17:23 (fonte máxima) e prints de 17:35, 17:39 e 17:40 (rótulos das abas).

| Item | Status | Observação |
|---|---|---|
| Hierarquia: passo do card maior que a pergunta e que a saudação | Testado ✅ | — |
| Lista "Tarefas de hoje" sem repetir o passo do card | Testado ✅ | Na aba Tarefas, que não tem o card, o passo aparece normalmente, como esperado |
| "Sua semana" em uma frase, com plural correto | Testado ✅ | "Nesta semana: 6 sessões de foco e 3 passos feitos." |
| Fade ao trocar de aba | Testado ✅ | Quadros intermediários mostram a transição; `animation: 'fade'` funciona no SDK 58 |
| Mesmo feedback de toque em botões e links | Testado ✅ | Relato do desenvolvedor e quadro do vídeo de 17:23 |
| Aba Progresso sem mudança visual (StatTile reaproveitando o Card) | Testado ✅ | — |
| `Alert` claro com o aparelho em modo escuro | Comportamento desejado observado | No Expo Go o aviso já aparecia claro com `"automatic"` (vídeo da Etapa 1), então o efeito da mudança só poderá ser confirmado numa versão instalada do app |
| Fonte do sistema no máximo: telas Hoje, Tarefas e Progresso | Testado ✅ | Os textos quebram em mais linhas sem cortar; a grade da aba Progresso continua com duas colunas. O máximo deste aparelho equivale a cerca de 30% de ampliação; aparelhos que permitem mais não foram testados |
| Fonte do sistema no máximo: rótulos das abas | Defeito encontrado e corrigido ✅ | Ver "Defeito: rótulos das abas cortados" |
| TalkBack: rótulo "Seu próximo passo" como cabeçalho e dica honesta do botão | **Pendente (adiado)** | Deve ser feito antes da apresentação ao professor e do teste com usuários; previsto para junto da Etapa 2 |

### Defeito: rótulos das abas cortados com fonte máxima

- **Sintoma:** com a fonte do sistema no máximo, a parte de baixo dos rótulos das abas era
  cortada ("Hoje" aparecia como "Hoie" e o "g" de "Progresso" sumia). Com a fonte normal
  não acontecia (comparação com os vídeos da Etapa 1 e da Etapa 1.1).
- **Causa:** a área das abas tem altura fixa; o texto cresce com a fonte do sistema, mas a
  barra não acompanha.
- **Primeira tentativa:** limitar a ampliação do rótulo a 1,2. Reduziu o tamanho, mas o
  texto continuou cortado (print de 17:35).
- **Correção final:** manter o limite de 1,2 e aumentar a área das abas para 56 dp, somando
  o espaço da barra de navegação do sistema (`useSafeAreaInsets`). Rótulos inteiros com a
  fonte no máximo (print de 17:39) e bem posicionados com a fonte normal (print de 17:40).
- **Decisão de design:** o limite de ampliação do rótulo das abas é uma exceção consciente
  à regra "fonte sem limite" do `DESIGN.md`, justificada pela altura fixa da barra. O
  conteúdo das telas continua crescendo sem limite.

## Forma de trabalho a partir da Etapa 2

A cada parte, o desenvolvimento segue o ciclo:

1. Planejamento aprovado pelo desenvolvedor.
2. Implementação, com verificação de imports e testes de lógica feitos pelo orientador.
3. **Testes sem aparelho pelo Claude Code**, a partir de um prompt: escopo das mudanças
   (`git status`/`git diff`), `npm test` (testes automáticos do projeto, desde a parte de
   testes com Jest), `npx expo-doctor`, compilação Android (`npx expo export`) e revisão de
   código. O resultado vira um relatório
   em `docs/avaliacoes/`. Esses testes **nunca** contam como "testado no aparelho".
4. **Testes manuais no aparelho**, só com o que exige o celular (tela, toque, TalkBack,
   persistência depois de fechar o app).
5. Commit e `git push`.

## Etapa 2 — Tarefas reais, salvas no aparelho

Status: **concluída e testada no aparelho**

### Decisões aprovadas no planejamento

| # | Decisão | Escolha |
|---|---|---|
| 1 | Dados de demonstração | Removidos das telas; botão "Carregar exemplos" visível só em `__DEV__` |
| 2 | Exclusão | Confirmação com aviso nativo; "Desfazer" com snackbar fica para depois |
| 3 | "Para hoje" | Chave no formulário, desligada por padrão |
| 4 | Passos | Fora da Etapa 2; até a Etapa 3, o card mostra "Defina um primeiro passo" para tarefas sem passos |
| 5 | Testes automáticos (Jest) | Numa parte separada, depois da Etapa 2 |
| 6 | Cor de erro | `#A8322B` (6,14:1 sobre o fundo; 6,65:1 sobre branco) |

### Partes

| Parte | Conteúdo | Teste no aparelho |
|---|---|---|
| **2a** | AsyncStorage 2.2.0; `taskStorage` (envelope `{ schemaVersion: 1, tasks }`); `tasksReducer` (funções puras); `TasksContext` com `useTasks()`; carregamento real com atraso de 300 ms; erro de leitura com "Tentar de novo"; exemplos reais; remoção de `DemoBadge` e `src/data/demo.js`; resumo da semana como estado vazio até existirem sessões | ✅ Relato: estados vazios, exemplos, persistência depois de recarregar e de fechar o Expo Go |
| **2b** | Rota `/tarefa/formulario` (modal); `TaskForm`; `TextField` (rótulo, contador, erro); `validation.js`; token `error`; "Salvar" no cabeçalho para continuar visível com o teclado | ✅ Relato: validação, criação, "Para hoje", cancelar, persistência e teclado |
| **2c** | `Checkbox` acessível (48 dp); linha da tarefa com duas áreas de toque (concluir / editar); edição pela mesma rota (`?id=`); exclusão com confirmação; variante de botão `danger`; ícone de lixeira | ✅ Relato |
| **2d** | Card da tela Hoje com três situações sem passo (sem tarefas, todas concluídas, pendentes sem passos); correções da auditoria de acessibilidade (itens 4, 6b, 7g, 9b, 9c) | ✅ Relato, incluindo o TalkBack |
| **Ajustes finais** | Dica falada sem pontuação dupla; `pressedFeedback` na linha "Para hoje"; remoção dos tokens de demonstração; `react-native` 0.88.1 | Testes sem aparelho: 74/74 e `expo-doctor` 20/20. Abertura do app depois da atualização: a confirmar |

### Acessibilidade

- **Teste manual com TalkBack:** feito em 29/10/2026 (relato do desenvolvedor), cobrindo a
  tela Hoje, a aba Tarefas e o formulário. Encerra a pendência aberta desde a Etapa 1.
- **Auditoria do código** (Claude Code, sem aparelho): 4 problemas encontrados e corrigidos
  na 2d (leituras duplas no formulário, linha "Para hoje" com três leituras e área de toque
  só na chave, ordem da fala diferente da ordem visual).
- **Itens que só o aparelho resolveria** (anúncios duplicados ao marcar e ao mostrar erro,
  perda de foco ao concluir na aba Tarefas): não apareceram como problema no teste manual.
- **Não verificados:** pronúncia de "Pendentes (2)" e anúncio do aviso de carregamento.
  Sem `adb`, a árvore de acessibilidade real (`uiautomator dump`) não foi conferida.

### Problemas conhecidos / limitações

- Os passos ainda não podem ser criados pela interface (Etapa 3). Só os exemplos têm passos.
- "Começar 5 minutos" continua mostrando um aviso (temporizador na Etapa 4).
- O resumo da semana e a aba Progresso mostram estado vazio até existirem sessões de foco.
- Não há "Desfazer" depois de excluir uma tarefa.
- Se os dados salvos estiverem corrompidos, a tela de erro só oferece "Tentar de novo";
  apagar todos os dados (RF17) virá com a tela de Ajustes.
- Para voltar ao estado vazio, é preciso excluir todas as tarefas (ou limpar os dados do
  Expo Go, o que afeta todos os projetos abertos nele).

## Testes automáticos com Jest

Status: **concluída**. Testes automáticos executados (`npm test`); app testado no aparelho
depois da mudança (relato do desenvolvedor, 29/10/2026).

### Decisões

| # | Decisão | Escolha |
|---|---|---|
| 1 | Escopo | Só testes de lógica (funções puras). Testes de componentes com a React Native Testing Library ficam para a Etapa 3 |
| 2 | `@types/jest` | Incluído, para o VS Code completar e explicar `describe`, `test` e `expect` |
| 3 | Reorganizações para permitir testes | `getEmptyHeroContent` saiu de `src/app/(tabs)/index.js` para `src/features/tasks/heroContent.js`; a dica falada virou `buildSpokenHint`, em `src/utils/accessibility.js` |
| 4 | Inconsistências do `DESIGN.md` | #16 (comentários do tema) e #18 (altura do campo de várias linhas, agora token `multilineFieldMinHeight`) resolvidas; #17 (texto do `TextInput` fora do `AppText`) aceita como exceção registrada; #15 (componentes do template) fica para a limpeza planejada |

### Como os testes estão organizados

- Ficam em pastas `__tests__`, ao lado do código testado: `src/features/tasks/__tests__`,
  `src/services/storage/__tests__` e `src/utils/__tests__`.
- **Nunca dentro de `src/app/`:** o Expo Router transforma todo arquivo dessa pasta em rota.
- O teste do armazenamento usa uma simulação do AsyncStorage em memória, escrita no próprio
  arquivo de teste, sem depender do aparelho.
- A cobertura (`npm run test:coverage`) considera todos os arquivos `.js` de `src/`, inclusive
  telas e componentes. Assim, o relatório mostra com honestidade o que **não** é coberto pelo
  Jest: telas e componentes continuam sendo testados no aparelho.

### Resultados

- 57 testes em 10 suítes (56 da configuração inicial + 1 para o ramo sem cobertura de
  `buildSpokenHint`), todos passando.
- Cobertura: os 10 módulos de lógica (`src/features/tasks`, `src/services/storage` e
  `src/utils`) têm 100% de instruções, ramos, funções e linhas. Considerando todo o `src/`,
  a cobertura é de 29% das linhas, porque 25 arquivos de telas, componentes e contexto
  aparecem com 0%: eles são verificados no aparelho e pela auditoria de acessibilidade, não
  pelo Jest.
- Prova de que os testes detectam erros: uma mudança proposital no texto "Nada pendente por
  agora" fez exatamente 1 teste falhar, apontando a diferença.
- Nenhum arquivo de teste nem pacote do Jest entra no app compilado (conferido pelo mapa de
  fontes do bundle Android).
- As funções movidas se comportam como antes (488 casos comparados com o commit anterior).

### Problema encontrado e corrigido no commit seguinte

- **Pacotes do Jest duplicados** (presentes no commit `6c2be5b`): `jest`, `jest-expo` e `@types/jest` ficaram registrados em
  `dependencies` e em `devDependencies`. Causa provável: a primeira tentativa de instalação
  registrou os pacotes como dependências do app, e a forma alternativa registrou de novo
  como dependências de desenvolvimento. Correção: remoção de `dependencies` com
  `npm pkg delete` e `npm install` para atualizar o `package-lock.json`. O app não foi
  afetado: o Metro só empacota o que é importado, e nenhum teste entra no bundle.
- **No mesmo commit:** `collectCoverageFrom` passou a considerar todo o `src/`, e entrou um
  teste para o ramo sem cobertura de `buildSpokenHint` (57 testes no total).
- **`DESIGN.md`:** #16 e #18 marcadas como resolvidas, #17 como exceção aceita (🟰) e a
  exceção registrada na "Variant-Only Rule".

## Próximos passos

1. Etapa 3: passos dentro das tarefas, com a tela de detalhe da tarefa e os primeiros
   testes de componentes (React Native Testing Library).
2. Limpeza dos arquivos do template (`src/components/*.tsx`, `src/hooks`,
   `src/constants/theme.ts`), numa parte própria, com teste.