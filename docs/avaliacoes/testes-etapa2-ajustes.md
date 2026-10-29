# Testes dos ajustes finais da Etapa 2

> **Aviso:** estes testes foram feitos **sem aparelho**, com compilação, testes de lógica e leitura do código. Eles **não substituem os testes no aparelho**, nem o teste manual com o TalkBack. Nada aqui foi testado no aparelho.

- **Data:** 29/10/2026
- **Estado testado:** cópia de trabalho sobre o commit `fe1c7ab` (Etapa 2d), com os ajustes **ainda não commitados**
- **Referência:** [testes-etapa2d.md](testes-etapa2d.md), itens 5b, 5c, 5c.4 e 5e.4/5e.5, e a falha do `expo-doctor`
- **Nenhum arquivo do projeto foi alterado** além deste relatório. Nada foi instalado no projeto e nada foi commitado. `package.json` e `package-lock.json` têm o mesmo SHA-256 antes e depois dos testes.

## Comandos executados

| # | Comando | Onde | Resultado |
|---|---|---|---|
| 1 | `git status` · `git diff --stat` · `git diff` | projeto | 5 arquivos modificados, os esperados (ver seção 1) |
| 2 | `npx expo-doctor` | projeto | **20/20** verificações passaram |
| 3 | `CI=1 npx expo export --platform android --output-dir <pasta temporária>` | saída fora do projeto | Bundle gerado sem erros. Pasta apagada depois |
| 4 | `npx --yes tsx --import ./register.mjs run.mts "X:/programação/Destrava"` | pasta temporária fora do projeto | 74 testes, 74 passaram. Pasta apagada depois |
| 5 | `sha256sum package.json package-lock.json` (antes e depois) | projeto | Iguais |

## 1. Escopo

| Verificação | Status | Detalhe |
|---|---|---|
| Só os 5 arquivos esperados estão modificados | Passou | `package.json` (+1/−1), `package-lock.json` (+42/−173), `src/components/TextField.js` (+8/−1), `src/features/tasks/TaskForm.js` (+1/−1), `src/theme/index.js` (−5). Nenhum arquivo não rastreado. |
| `package.json`: a única mudança é a versão do `react-native` | Passou | `"react-native": "0.88.0"` → `"0.88.1"`. Nada mais mudou. |
| `package-lock.json`: só mudam o `react-native` e as dependências dele | Passou | Pacotes `@react-native/*` passaram de 0.88.0 para 0.88.1, e o `hermes-compiler` (dependência do `react-native`) de 260318099.0.4 para 260318099.0.5. Cópias duplicadas da 0.88.0 que estavam aninhadas, por exemplo em `@react-native/babel-preset/node_modules/…`, foram removidas. Nenhum pacote fora da família do `react-native` mudou. |
| Nenhum outro arquivo alterado | Passou | O Git só avisa sobre a troca de fim de linha LF → CRLF, sem efeito no código. |

## 2. Saúde do projeto (`npx expo-doctor`)

| Verificação | Status | Detalhe |
|---|---|---|
| 20 de 20 verificações | Passou | "20/20 checks passed. No issues detected!". A falha de versão registrada na 2d (`react-native` 0.88.0 vs 0.88.1) foi resolvida. |

## 3. Compilação (`npx expo export --platform android`)

| Verificação | Status | Detalhe |
|---|---|---|
| Bundle Android gerado | Passou | 1344 módulos em cerca de 12 s. Saída: `entry-….hbc` (2,9 MB). Na 2d eram 1345 módulos. A diferença de um módulo é coerente com a mudança interna do `react-native` 0.88.1, e nenhum import do app quebrou. |
| Sem erros de sintaxe, imports quebrados ou rotas inválidas | Passou | O export terminou com código 0. |
| Pasta temporária apagada | Passou | A saída ficou fora do projeto e foi apagada. |

## 4. Testes de lógica (`npx --yes tsx`)

Usei a mesma técnica da 2d: scripts em uma pasta temporária fora do projeto, módulos importados por caminho absoluto e AsyncStorage simulado em memória. O redirecionamento foi feito por um hook de resolução ESM e por um desvio no `require` do CommonJS, pré-carregados com `--import`. Uma verificação dentro dos testes confirmou que o mock estava em uso.

### 4.1 Os 61 testes da Etapa 2d (repetidos)

| Módulo | Testes | Status |
|---|---|---|
| `validation.js` (título vazio, só espaços, 100/101, observação 500/501, `hasErrors`) | 8 | Passou |
| `taskModel.js` (`normalizeFields`, `createTask`, ids diferentes) | 5 | Passou |
| `tasksReducer.js` (todas as ações, `task/updated` preserva `createdAt` e `steps`, `task/toggled` nas duas direções, ação desconhecida, imutabilidade) | 12 | Passou |
| `selectors.js` (`getNextStep` com e sem passos e com tudo concluído, `getTodayTasks`, `splitByStatus`, `countSteps`) | 10 | Passou |
| `exampleTasks.js` (4 tarefas, ids únicos, próximo passo esperado) | 7 | Passou |
| `date.js` (`getGreeting` em 4h59, 5h, 11h59, 12h, 17h59 e 18h, mais 0h e 23h59; `formatLongDate` com maiúscula) | 10 | Passou |
| `format.js` (`pluralize` com 0, 1 e 2) | 3 | Passou |
| `taskStorage.js` (primeira leitura, gravar e ler, JSON inválido, formato inválido, versão desconhecida) | 6 | Passou |
| **Subtotal** | **61** | **61 passaram** |

### 4.2 Dica falada do `TextField` (`spokenHint`), testes novos

O `spokenHint` foi testado de duas formas:

1. **Cópia literal** da expressão, com uma verificação que compara essa cópia com o texto atual do `TextField.js` (ignorando espaços). Se alguém mudar o código, esse teste falha.
2. **A expressão extraída do arquivo do projeto** no momento do teste (`counterText` e `spokenHint`) e avaliada com os mesmos valores. Assim o teste roda o código real, não só a cópia.

| Verificação | Status | Detalhe |
|---|---|---|
| Expressões `counterText` e `spokenHint` encontradas no `TextField.js` | Passou | — |
| A cópia do teste é idêntica ao código | Passou | Comparação ignorando espaços |
| (a) dica terminada em ponto + contador | Passou (cópia e código) | `"Um detalhe que ajude a começar, se quiser. 0 de 500 caracteres"`, sem `..` |
| (b) só o contador | Passou (cópia e código) | `"3 de 100 caracteres"` |
| (c) sem dica nem contador | Passou (cópia e código) | `undefined` |
| (d) com erro | Passou (cópia e código) | Só `"Escreva um título para a tarefa."`, sem dica nem contador |
| Extra: dica sem ponto + contador | Passou | `"Dica curta. 2 de 10 caracteres"` |
| Extra: dica com vários pontos e espaços no fim | Passou | `"Dica...  "` → `"Dica. 0 de 10 caracteres"` |
| Extra: só a dica, sem contador | Passou | `"Um detalhe que ajude a começar, se quiser"`. O ponto final também sai quando a dica está sozinha, o que não muda a fala (ver observação 5d.3). |
| **Subtotal** | **13 passaram** | |

**Total: 74 testes, 74 passaram, 0 falharam.**

> Na primeira execução, o teste "cópia idêntica ao código" falhou por um problema **do próprio teste**: o `tsx` reescreve o corpo das funções, então `toString()` não devolvia o texto original. O teste passou a comparar com um texto literal e passou. O código do app não teve nenhuma falha.

## 5. Revisão do código

| # | Verificação | Status | Detalhe |
|---|---|---|---|
| 5a | Nenhum arquivo em `src/` usa `demoBackground` ou `demoText` | Passou | Busca em `src/`: nenhuma ocorrência. Os tokens e a linha de contraste correspondente foram removidos de `src/theme/index.js`. O bundle compilou. |
| 5a.2 | A documentação de design ainda cita os tokens removidos | Falhou (documentação, baixa gravidade) | `DESIGN.md` (linhas 19–20, 122–123, 240 e 273) e `.impeccable/design.json` (linhas 231 e 247) ainda descrevem `demoBackground` e `demoText`, inclusive em um componente nas linhas 122–123. `docs/registro-do-projeto.md:107` também cita o contraste, mas como registro histórico pode ficar. Não afeta o app. **Correção sugerida (não aplicada):** em uma etapa de documentação, tirar os tokens e o componente de aviso de demonstração do `DESIGN.md` e do `.impeccable/design.json`, ou marcar como removidos na Etapa 2. |
| 5b.1 | A linha "Para hoje" usa `pressedFeedback` | Passou | `TaskForm.js:115`: `style={({ pressed }) => [styles.switchRow, pressed ? pressedFeedback : null]}`, o mesmo padrão do `HeaderButton`. |
| 5b.2 | O import de `pressedFeedback` existe | Passou | `TaskForm.js:8`: `import { colors, minTouchTarget, pressedFeedback, spacing } from '../../theme';` |
| 5c.1 | Item 5b da 2d: a linha é um único controle | Passou | Sem mudanças: `Pressable` com `accessibilityRole="switch"`, `accessibilityState={{ checked: forToday }}`, `accessibilityLabel="Para hoje"` e dica. `onPress` alterna o valor e a linha tem `minHeight: 48`. |
| 5c.2 | Item 5b da 2d: `Switch` interno oculto e alternando ao toque direto | Passou (código) / **Não verificável sem o aparelho** | Continua com `importantForAccessibility="no-hide-descendants"` + `accessibilityElementsHidden` e `onValueChange={setForToday}`. O `pressedFeedback` só muda o estilo da linha e não interfere no toque. Falta confirmar no aparelho que o toque direto alterna **uma vez só**. |
| 5c.3 | Item 5c da 2d: rótulo, contador e dica visíveis ocultos para o leitor de tela | Passou | Sem mudanças nas linhas `TextField.js:50–62` (`labelRow`) e `:85–92` (dica). |
| 5c.4 | Item 5c da 2d: contador e dica na dica falada | Passou | Mesma lógica de antes, agora sem pontuação dupla (testes 4.2). |
| 5c.5 | Item 5c da 2d: a mensagem de erro continua visível e anunciada | Passou | O erro continua com `AppText` visível e `accessibilityLiveRegion="polite"`, e é a dica falada quando existe. O `TaskForm` continua chamando `announceForAccessibility`. |
| 5c.6 | Item 5c.4 da 2d (ponto duplo) | Passou (corrigido) | Era "Falhou (baixa gravidade)" na 2d. Agora a fala é `"…se quiser. 0 de 500 caracteres"`. |
| 5c.7 | Nenhum elemento oculto por engano | Passou | Os únicos elementos ocultos em `src/` continuam sendo os mesmos 4 da 2d: `Icon`, `labelRow`, a dica do `TextField` e o `Switch` interno. |
| 5d.1 | Ajuste 5e.4 da 2d (tokens de demonstração) | Passou (código) | Removidos de `src/`. Ver 5a.2 para a documentação. |
| 5d.2 | Ajuste 5e.5 da 2d (`pressedFeedback` na linha) | Passou | Ver 5b. |
| 5d.3 | Observação: limpeza de pontuação no `spokenHint` | Passou (sem efeito hoje) | A expressão tira só `.` e espaços do fim. Uma dica que termine em `?` ou `!` ficaria com `"?. 0 de…"`, mas nenhuma dica atual termina assim. Quando só existe a dica, o ponto final também sai, sem efeito na fala. Nenhuma correção é necessária agora. |

## Resumo

| Status | Quantidade |
|---|---|
| Passou | Escopo 4/4 · `expo-doctor` 20/20 · compilação 3/3 · lógica 74/74 (61 da 2d + 13 novos) · revisão 13 verificações |
| Falhou | 1: a documentação de design (`DESIGN.md`, `.impeccable/design.json`) ainda cita os tokens removidos. Baixa gravidade, não afeta o app |
| Não verificável sem o aparelho | 1 na revisão (5c.2) + todos os testes manuais abaixo |

Os três ajustes de código fazem o que foi pedido, e a atualização do `react-native` resolveu a falha do `expo-doctor` sem mudar nenhuma outra dependência do projeto.

## Testes manuais que continuam necessários no aparelho

Todos com o app aberto em um aparelho Android, com e sem o TalkBack. Como o `react-native` mudou de versão (0.88.0 → 0.88.1), vale gerar uma nova build de desenvolvimento ou abrir de novo no Expo Go antes de testar.

1. **Abertura do app depois da atualização do `react-native`:** o app abre sem erro vermelho, e as três abas e o formulário funcionam.
2. **Linha "Para hoje" sem o TalkBack:** ao tocar no texto, a linha mostra o retorno visual (leve transparência e redução) e alterna. Tocar direto no `Switch` alterna **uma vez só**.
3. **Linha "Para hoje" com o TalkBack:** lida uma vez só, como "Para hoje, Chave, Desativada/Ativada", com a dica. Tocar duas vezes alterna e anuncia o novo estado. O `Switch` não ganha foco separado.
4. **Campo Observação com o TalkBack:** a dica falada é "Um detalhe que ajude a começar, se quiser. 0 de 500 caracteres", sem pausa estranha ou pontuação lida em voz alta. Confirmar que a dica do campo é **realmente lida** (5c.6 da 2d).
5. **Campo Título com o TalkBack:** dica "0 de 100 caracteres". Ao salvar vazio, a mensagem de erro é anunciada, e é preciso registrar se ela é falada uma ou duas vezes.
6. **Card "Seu próximo passo", nos três cenários** (sem tarefas, todas concluídas e pendentes sem passos): título, mensagem e botão certos.
7. **Linha de tarefa com o TalkBack:** a fala segue "título. próximo passo. resumo".
8. **Pendências da auditoria que continuam abertas:** perda de foco ao concluir uma tarefa na aba Tarefas (3d), anúncio duplicado ao marcar (3c), pronúncia de "Pendentes (2)" (9d) e aviso de carregamento (9e).
9. **Persistência real:** criar, editar, concluir e excluir tarefas, fechar o app por completo e abrir de novo.
10. **Árvore de acessibilidade:** quando houver `adb` e um aparelho com a depuração USB ativa, rodar `adb shell uiautomator dump` no formulário e conferir a linha "Para hoje" (`class=android.widget.Switch`, `checkable=true`, `checked`) e a ausência de nós separados para o `Switch` interno, o rótulo, o contador e a dica.
