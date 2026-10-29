# Testes da Etapa 2d

> **Aviso:** estes testes foram feitos **sem aparelho**, com compilação, testes de lógica e leitura do código. Eles **não substituem os testes no aparelho**, nem o teste manual com o TalkBack. Nada aqui foi testado no aparelho.

- **Data:** 29/10/2026
- **Estado testado:** cópia de trabalho sobre o commit `e911cbc`, com as mudanças da 2d **ainda não commitadas**
- **Referência:** [auditoria-acessibilidade-etapa2.md](auditoria-acessibilidade-etapa2.md), itens 4, 6b, 9b e 9c
- **Nenhum arquivo do projeto foi alterado** além deste relatório. Nada foi instalado no projeto e nada foi commitado. `package.json` e `package-lock.json` têm o mesmo SHA-256 antes e depois dos testes.

## Comandos executados

| # | Comando | Onde | Resultado |
|---|---|---|---|
| 1 | `git status` · `git diff --stat` · `git diff` | projeto | 4 arquivos de código modificados e 1 não rastreado (ver seção 1) |
| 2 | `npx expo-doctor` | projeto | 19/20 verificações passaram (ver seção 2) |
| 3 | `CI=1 npx expo export --platform android --output-dir <pasta temporária>` | saída fora do projeto | Bundle gerado sem erros. Pasta apagada depois |
| 4 | `npx --yes tsx --import ./register.mjs run.mts "X:/programação/Destrava"` | pasta temporária fora do projeto | 61 testes, 61 passaram. Pasta apagada depois |
| 5 | `sha256sum package.json package-lock.json` (antes e depois) | projeto | Iguais |

## 1. Escopo

| Verificação | Status | Detalhe |
|---|---|---|
| Só os 4 arquivos de código esperados estão modificados | Passou | `src/app/(tabs)/index.js` (+49/−23), `src/components/TextField.js` (+19/−7), `src/features/tasks/TaskForm.js` (+14/−4), `src/features/tasks/TaskItem.js` (+3/−2). Total: 85 inserções e 36 remoções. |
| Arquivo da auditoria aparece como não rastreado | Passou | `docs/avaliacoes/auditoria-acessibilidade-etapa2.md` |
| Nenhum outro arquivo alterado | Passou | Nenhum outro arquivo aparece no `git status`. O Git só avisa sobre a troca de fim de linha LF → CRLF, sem efeito no código. |

## 2. Saúde do projeto (`npx expo-doctor`)

| Verificação | Status | Detalhe |
|---|---|---|
| 19 de 20 verificações | Passou | — |
| Versões compatíveis com o SDK 58 | Falhou | `react-native` esperado **0.88.1**, encontrado **0.88.0** (diferença de patch). **Não vem da 2d**: os arquivos de dependências não mudaram. **Correção sugerida (não aplicada):** em uma etapa separada, rodar `npx expo install --check` ou `npx expo install react-native` e commitar a mudança de `package.json` e `package-lock.json` sozinha. |

## 3. Compilação (`npx expo export --platform android`)

| Verificação | Status | Detalhe |
|---|---|---|
| Bundle Android gerado | Passou | 1345 módulos em cerca de 32 s. Saída: `entry-….hbc` (2,9 MB) + 27 assets. |
| Sem erros de sintaxe, imports quebrados ou rotas inválidas | Passou | O export terminou com código 0, usando `src/app` como raiz do Expo Router. |
| Pasta temporária apagada | Passou | A pasta de saída ficou no diretório temporário do sistema, fora do projeto. |

## 4. Testes de lógica (`npx --yes tsx`)

Os scripts ficaram em uma pasta temporária fora do projeto e importaram os módulos do projeto por caminho absoluto. O `tsx` foi baixado pelo `npx` para o cache e não entrou no `package.json`.

**Como o AsyncStorage foi isolado:** a importação de `@react-native-async-storage/async-storage` foi redirecionada para um armazenamento em memória. O redirecionamento foi feito por um hook de resolução ESM e por um desvio no `require` do CommonJS, porque o `tsx` carrega os `.js` do projeto como CJS. Os dois ficaram em um arquivo pré-carregado com `--import`, sem tocar no projeto. Uma verificação dentro dos testes confirmou que o mock estava em uso.

> Antes do desvio no `require`, o teste de leitura travava: o `require` carregava o AsyncStorage real, que espera um módulo nativo inexistente no Node. Era um problema do ambiente de teste, não do app.

| Módulo | Verificação | Status |
|---|---|---|
| `validation.js` | Limites: título 100 e observação 500 | Passou |
| `validation.js` | Título vazio → "Escreva um título para a tarefa." | Passou |
| `validation.js` | Título só com espaços/tab → mesma mensagem | Passou |
| `validation.js` | Título com 100 caracteres → válido · com 101 → "Use até 100 caracteres no título." | Passou |
| `validation.js` | Observação com 500 → válida · com 501 → "Use até 500 caracteres na observação." | Passou |
| `validation.js` | `hasErrors` com e sem erro | Passou |
| `taskModel.js` | `normalizeFields` tira os espaços das pontas do título e da observação | Passou |
| `taskModel.js` | `normalizeFields`: `forToday` vira booleano (`1` → `true`, ausente → `false`) e observação ausente vira `''` | Passou |
| `taskModel.js` | `createTask` monta o formato completo (`pending`, `steps: []`, `createdAt = updatedAt = now`, `completedAt: null`) | Passou |
| `taskModel.js` | `createTask`: 1000 tarefas com 1000 ids diferentes · `generateId` não vazio | Passou |
| `tasksReducer.js` | Estado inicial `{ status: 'loading', tasks: [] }` | Passou |
| `tasksReducer.js` | `load/started`, `load/succeeded`, `load/failed` | Passou |
| `tasksReducer.js` | `tasks/replaced` | Passou |
| `tasksReducer.js` | `task/added` coloca a tarefa no topo | Passou |
| `tasksReducer.js` | `task/updated` muda os campos e o `updatedAt`, **preserva `createdAt` e `steps`** e não toca nas outras tarefas | Passou |
| `tasksReducer.js` | `task/toggled` pendente → concluída (`completedAt = now`) | Passou |
| `tasksReducer.js` | `task/toggled` concluída → pendente (`completedAt = null`) | Passou |
| `tasksReducer.js` | `task/deleted` | Passou |
| `tasksReducer.js` | Ação desconhecida devolve o **mesmo** objeto de estado | Passou |
| `tasksReducer.js` | Não altera o estado original (imutabilidade) | Passou |
| `selectors.js` | `getNextStep`: lista vazia, pendentes sem passos, tudo concluído e pendente com todos os passos feitos → `null` | Passou |
| `selectors.js` | `getNextStep`: primeiro passo em aberto, com posição e total certos | Passou |
| `selectors.js` | `getNextStep`: dá preferência à tarefa "para hoje" | Passou |
| `selectors.js` | `getTodayTasks`: só as "para hoje", pendentes antes das concluídas, mantendo a ordem | Passou |
| `selectors.js` | `splitByStatus` · `countSteps` · `getFirstPendingStep` | Passou |
| `exampleTasks.js` | 4 tarefas · ids únicos (tarefas e passos) · ids novos a cada carregamento | Passou |
| `exampleTasks.js` | Próximo passo: "Trabalho de Banco de Dados", "Abrir o enunciado e ler só a primeira página", passo 1 de 3 | Passou |
| `exampleTasks.js` | "Revisar Cálculo I": próximo passo é "Refazer o exercício 1 da lista" | Passou |
| `exampleTasks.js` | Datas e status coerentes · tarefas de hoje: 3, com a concluída por último | Passou |
| `date.js` | `getGreeting`: 4h59 Boa noite · 5h00 Bom dia · 11h59 Bom dia · 12h00 Boa tarde · 17h59 Boa tarde · 18h00 Boa noite (também 0h00 e 23h59) | Passou |
| `date.js` | `formatLongDate`: "Quinta-feira, 29 de outubro", "Domingo, 1 de março", "Sábado, 31 de outubro" (primeira letra maiúscula) | Passou |
| `format.js` | `pluralize` com 0 → plural · 1 → singular · 2 → plural | Passou |
| `taskStorage.js` | Primeira leitura (nada salvo) → `[]` | Passou |
| `taskStorage.js` | Gravar e ler de volta (salva com `schemaVersion: 1`) | Passou |
| `taskStorage.js` | JSON inválido → erro (`SyntaxError`) | Passou |
| `taskStorage.js` | Objeto sem lista de tarefas → "Formato de dados inválido" | Passou |
| `taskStorage.js` | Versão desconhecida (99) → "Versão de dados desconhecida: 99" | Passou |

**Total: 61 testes, 61 passaram, 0 falharam.** As tabelas agrupam alguns testes por linha.

Observação: os testes de `taskStorage.js` só confirmam a lógica do módulo. A gravação real no AsyncStorage do aparelho, incluindo a persistência depois de fechar o app, continua **não verificável sem o aparelho**.

## 5. Revisão do código

| # | Verificação | Status | Detalhe |
|---|---|---|---|
| 5a.1 | Hoje, sem tarefas → "Nenhum passo por aqui ainda" + "Criar minha primeira tarefa" (abre o formulário) | Passou | `getEmptyHeroContent`: `tasks.length === 0` → `action: 'new'` → `onPress={goToNewTask}` (`router.push('/tarefa/formulario')`), ícone `add`, dica "Abre o formulário de nova tarefa". |
| 5a.2 | Hoje, todas concluídas → "Nada pendente por agora" + "Nova tarefa" (abre o formulário) | Passou | `!tasks.some(status === 'pending')` → `action: 'new'` → `goToNewTask`. Os testes confirmam que `getNextStep` devolve `null` nesse caso, então o card mostra este conteúdo. |
| 5a.3 | Hoje, pendentes sem passos → "Defina um primeiro passo" + "Ver minhas tarefas" (abre a aba Tarefas) | Passou | Último caso → `action: 'tasks'` → `onPress={goToTasks}` (`router.navigate('/tarefas')`), ícone `tasks`, dica "Abre a aba Tarefas". Também vale para tarefas pendentes com todos os passos feitos, o que faz sentido. |
| 5b.1 | Linha "Para hoje" é um único controle | Passou | `TaskForm.js`: `Pressable` com `accessibilityRole="switch"`, `accessibilityState={{ checked: forToday }}`, `accessibilityLabel="Para hoje"` e dica. O `Pressable` agrupa os textos filhos. |
| 5b.2 | Tocar na linha alterna o valor | Passou | `onPress={() => setForToday((current) => !current)}`. Área de toque: a linha inteira, com `minHeight: 48` (resolve também o item 7g da auditoria). |
| 5b.3 | `Switch` interno oculto para o leitor de tela | Passou | `importantForAccessibility="no-hide-descendants"` (Android) + `accessibilityElementsHidden` (iOS). O rótulo e a dica foram tirados do `Switch`. |
| 5b.4 | `Switch` continua alternando com toque direto | Passou (código) / **Não verificável sem o aparelho** | `onValueChange={setForToday}` continua lá. Pelo código, o `Switch` nativo assume o toque e o `onPress` da linha não deve disparar junto. Confirmar no aparelho que o toque direto alterna **uma vez só**. |
| 5c.1 | Rótulo e contador visíveis ocultos para o leitor de tela | Passou | `TextField.js`: a `View` `labelRow` tem `importantForAccessibility="no-hide-descendants"` + `accessibilityElementsHidden`. O `TextInput` fica fora dela e continua acessível, com `accessibilityLabel={label}`. |
| 5c.2 | Dica visível oculta para o leitor de tela | Passou | O `AppText` da dica tem `importantForAccessibility="no"` + `accessibilityElementsHidden`. |
| 5c.3 | Contador e dica fazem parte da dica falada | Passou | `spokenHint = error ?? ([hint, counterText].filter(Boolean).join('. ') \|\| undefined)`. Título: "0 de 100 caracteres". Observação: dica + contador. |
| 5c.4 | Pontuação da dica falada da Observação | Falhou (baixa gravidade) | A dica já termina em ponto ("…se quiser."), e o `join('. ')` acrescenta outro. O resultado é "Um detalhe que ajude a começar, se quiser.. 0 de 500 caracteres". O TalkBack costuma ignorar a pontuação repetida, mas o texto fica errado. **Correção sugerida (não aplicada):** tirar a pontuação final de cada parte antes de juntar, por exemplo `hint.replace(/[.\s]+$/, '')`, ou juntar com `' '` quando a parte já termina em ponto. |
| 5c.5 | Mensagem de erro continua visível e anunciada | Passou | O erro continua como `AppText` visível, **não oculto**, com `accessibilityLiveRegion="polite"`. Também vira a dica falada do campo, e o `TaskForm` continua chamando `announceForAccessibility`. A possível leitura dupla (item 5c da auditoria) não fazia parte da 2d e continua **não verificável sem o aparelho**. |
| 5c.6 | Dica do `TextInput` é lida no Android | **Não verificável sem o aparelho** | Agora o contador e a dica existem **só** na `accessibilityHint` do `TextInput`. Se o TalkBack não ler a dica de um campo de texto em algum aparelho ou versão, essa informação se perde. Confirmar no aparelho. |
| 5d | Fala da linha de tarefa segue a ordem visual | Passou | `TaskItem.js`: `[task.title, nextStepText, summary]`, a mesma ordem dos `AppText` na tela (título → próximo passo → resumo). |
| 5e.1 | Nenhum import de `DemoBadge` ou `src/data/demo.js` | Passou | Busca em `src/`: nenhuma referência. Os dois arquivos não existem, e o bundle compilou. |
| 5e.2 | Nenhum token de tema inexistente | Passou | Todos os `colors.*`, `spacing.*`, `radius.*` e `typography.*` usados nos 4 arquivos existem em `src/theme/index.js`. |
| 5e.3 | Nenhum elemento oculto por engano | Passou | Elementos ocultos em `src/`: `Icon` (decorativo), `labelRow` e a dica do `TextField` (repetidos no campo) e o `Switch` interno (repetido na linha). Todos têm um equivalente acessível. A mensagem de erro e os textos da linha "Para hoje" não ficaram ocultos. |
| 5e.4 | Observação: tokens de demonstração que sobraram | Passou (sem efeito) | `colors.demoBackground` e `colors.demoText` continuam em `src/theme/index.js`, mas não são usados desde que o `DemoBadge` foi removido. Não quebram nada. Sugestão (não aplicada): removê-los em uma limpeza futura. |
| 5e.5 | Observação: retorno visual ao tocar na linha "Para hoje" | Passou (sem efeito em acessibilidade) | Diferente dos outros `Pressable` do app, a linha não usa `pressedFeedback`. A chave muda de posição ao tocar, então há retorno, mas fica diferente do padrão. Sugestão (não aplicada): `style={({ pressed }) => [styles.switchRow, pressed ? pressedFeedback : null]}`. |

## Resumo

| Status | Quantidade |
|---|---|
| Passou | Escopo 3/3 · compilação 3/3 · lógica 61/61 · revisão 17 verificações |
| Falhou | 2: `react-native` 0.88.0 vs 0.88.1 (antes da 2d, de dependências) · ponto duplo na dica falada da Observação (baixa gravidade) |
| Não verificável sem o aparelho | 2 na revisão (5b.4, 5c.6) + todos os testes manuais abaixo |

Pelo código, as mudanças da 2d resolvem os itens **4, 6b, 9b e 9c** da auditoria, e também o **7g**, porque a linha "Para hoje" agora tem 48 dp de altura em toda a largura.

## Testes manuais que continuam necessários no aparelho

Todos com o app aberto em um aparelho Android, com e sem o TalkBack:

1. **Card "Seu próximo passo", nos três cenários:** sem tarefas, todas concluídas e pendentes sem passos. Conferir título, mensagem e botão, e que o botão abre o formulário ou a aba Tarefas.
2. **Linha "Para hoje" com o TalkBack:** deve ser lida uma vez só, como "Para hoje, Chave, Desativada/Ativada", com a dica. Tocar duas vezes alterna e anuncia o novo estado. Nem o texto nem o `Switch` devem ganhar foco separado.
3. **Linha "Para hoje" sem o TalkBack:** tocar no texto alterna. Tocar direto no `Switch` alterna **uma vez só**, sem disparar também o toque da linha.
4. **Campos Título e Observação com o TalkBack:** o rótulo, o contador e a dica visíveis não devem ganhar foco. Ao focar o campo, ouvir o rótulo e, como dica, o contador (e a dica da Observação). Confirmar que a dica é **realmente lida** (5c.6).
5. **Erro do título com o TalkBack:** salvar com o título vazio. A mensagem é anunciada, e é preciso registrar se ela é falada uma ou duas vezes. A mensagem continua visível e é lida ao focar o campo.
6. **Linha de tarefa com o TalkBack:** a fala segue "título. próximo passo. resumo", e a dica "Abre a edição da tarefa" é lida.
7. **Pendências da auditoria que não fizeram parte da 2d:** perda de foco ao concluir uma tarefa na aba Tarefas (3d), anúncio duplicado ao marcar (3c), pronúncia de "Pendentes (2)" (9d) e aviso de carregamento (9e).
8. **Persistência real:** criar, editar, concluir e excluir tarefas, fechar o app por completo e abrir de novo.
9. **Árvore de acessibilidade:** quando houver `adb` e um aparelho com a depuração USB ativa, rodar `adb shell uiautomator dump` no formulário e conferir: a linha "Para hoje" com `class=android.widget.Switch`, `checkable=true` e `checked` certo, e nenhum nó separado para o `Switch` interno, o rótulo, o contador ou a dica.
