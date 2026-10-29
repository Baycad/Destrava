# Testes da configuração do Jest

> **Aviso:** estes testes foram feitos **sem aparelho**, com testes automatizados, compilação e leitura do código. Eles **não substituem os testes no aparelho**, nem o teste manual com o TalkBack. Nada aqui foi testado no aparelho.

- **Data:** 29/10/2026
- **Estado testado:** cópia de trabalho sobre o commit `291e063` (docs: etapa 2 concluída), com a configuração do Jest **ainda não commitada**
- **Nenhum arquivo do projeto foi alterado**, a não ser por este relatório e pela pasta `coverage/` gerada pelo `npm run test:coverage` (ignorada pelo Git). A única alteração temporária foi a do passo 3 em `heroContent.js`, desfeita e conferida por SHA-256. Nada foi commitado.

## Comandos executados

| # | Comando | Onde | Resultado |
|---|---|---|---|
| 1 | `git status -uall` · `git diff --stat` · `git diff -- package.json .gitignore` | projeto | Escopo certo nos arquivos, mas há um problema no `package.json` (seção 1) |
| 2 | Comparação de `packages[""]` e das versões do `package-lock.json` com `git show HEAD:package-lock.json` (script Node) | projeto (leitura) | 578 pacotes adicionados, 0 removidos, 0 com versão alterada |
| 3 | `npm test` | projeto | **10 suítes e 56 testes, todos passaram** |
| 4 | `npx jest --json` (contagem por arquivo) | projeto | Mesmo resultado, por suíte |
| 5 | `npm run test:coverage` | projeto | 100% de linhas, 98,48% de ramos |
| 6 | Cópia de `heroContent.js` para fora do projeto → mudança do texto → `npx jest` → restauração da cópia → `sha256sum` e `git diff` | projeto + pasta temporária | 1 teste falhou, apontando a diferença. Arquivo restaurado, idêntico |
| 7 | `npx expo-doctor` | projeto | **20/20** |
| 8 | `CI=1 npx expo export --platform android --source-maps --output-dir <pasta temporária>` | saída fora do projeto | Bundle gerado, sem arquivos de teste. Pasta apagada depois |
| 9 | Comparação das versões antigas (`git show HEAD:…`) e novas de `getEmptyHeroContent` e da dica falada (script Node, 488 casos) | pasta temporária | 0 diferenças nos casos reais |

## 1. Escopo

| Verificação | Status | Detalhe |
|---|---|---|
| Arquivos modificados | Passou (com observação) | Modificados: `package.json`, `package-lock.json`, `src/theme/index.js`, `src/components/TextField.js` e `src/app/(tabs)/index.js`. **O `.gitignore` não aparece como modificado**, porque a linha `coverage/` (linha 45) já estava lá desde o commit `4cb682c`. O resultado é o esperado: `coverage/` fica ignorada. Só a descrição da mudança estava imprecisa. |
| Arquivos novos | Passou | `src/features/tasks/heroContent.js`, `src/utils/accessibility.js` e os 10 testes: `src/features/tasks/__tests__/` (exampleTasks, heroContent, selectors, taskModel, tasksReducer, validation), `src/services/storage/__tests__/taskStorage.test.js` e `src/utils/__tests__/` (accessibility, date, format). |
| Scripts e preset no `package.json` | Passou | `"test": "jest"`, `"test:coverage": "jest --coverage"` e `"jest": { "preset": "jest-expo" }`. |
| `jest-expo`, `jest` e `@types/jest` só em `devDependencies` | **Falhou** | Os três pacotes estão em `devDependencies` (`jest-expo ~58.0.13`, `jest ~30.5.2`, `@types/jest 30.0.0`), mas **também foram acrescentados em `dependencies`**, com as mesmas versões. O mesmo acontece em `packages[""]` do `package-lock.json`. O app funciona, porque o Metro só empacota o que é importado (seção 4), mas ferramentas de instalação de produção tratam esses pacotes como dependências do app. Provável causa: um `npx expo install` sem `--save-dev`, seguido de outro com `-- --save-dev`. **Correção sugerida (não aplicada):** apagar as três linhas de `dependencies` no `package.json`, mantendo as de `devDependencies`, e rodar `npm install` para atualizar o `package-lock.json`. Depois, conferir que `git diff package.json` mostra os três pacotes só em `devDependencies` e repetir `npm test`. |
| Nenhuma outra dependência mudou | Passou | Nas seções `dependencies` e `devDependencies` da raiz, só mudaram os três pacotes do Jest. No `package-lock.json`, foram **578 pacotes adicionados** (a árvore do Jest), **0 removidos** e **0 com versão alterada**. |
| Versões instaladas | Passou | `jest 30.5.2`, `jest-expo 58.0.13` e `@types/jest 30.0.0`, compatíveis com o SDK 58 (o `expo-doctor` não aponta nada). |

## 2. Testes (`npm test`)

| Verificação | Status | Detalhe |
|---|---|---|
| 10 suítes e 56 testes passando | Passou | `Test Suites: 10 passed, 10 total` · `Tests: 56 passed, 56 total` · cerca de 3–4 s |
| `coverage/` fora do `git status` | Passou | `git check-ignore -v coverage/` → `.gitignore:45:coverage/`. A pasta foi mantida, como pedido. |

Testes por suíte:

| Suíte | Testes | Status |
|---|---|---|
| `src/features/tasks/__tests__/tasksReducer.test.js` | 10 | Passou |
| `src/utils/__tests__/date.test.js` | 9 | Passou |
| `src/features/tasks/__tests__/selectors.test.js` | 7 | Passou |
| `src/features/tasks/__tests__/validation.test.js` | 7 | Passou |
| `src/features/tasks/__tests__/taskModel.test.js` | 5 | Passou |
| `src/services/storage/__tests__/taskStorage.test.js` | 5 | Passou |
| `src/utils/__tests__/accessibility.test.js` | 5 | Passou |
| `src/features/tasks/__tests__/exampleTasks.test.js` | 4 | Passou |
| `src/features/tasks/__tests__/heroContent.test.js` | 3 | Passou |
| `src/utils/__tests__/format.test.js` | 1 | Passou |
| **Total** | **56** | **Passou** |

## Cobertura (`npm run test:coverage`)

| Arquivo | % Instruções | % Ramos | % Funções | % Linhas | Linhas sem cobertura |
|---|---|---|---|---|---|
| `features/tasks/exampleTasks.js` | 100 | 100 | 100 | 100 | — |
| `features/tasks/heroContent.js` | 100 | 100 | 100 | 100 | — |
| `features/tasks/selectors.js` | 100 | 100 | 100 | 100 | — |
| `features/tasks/taskModel.js` | 100 | 100 | 100 | 100 | — |
| `features/tasks/tasksReducer.js` | 100 | 100 | 100 | 100 | — |
| `features/tasks/validation.js` | 100 | 100 | 100 | 100 | — |
| `services/storage/taskStorage.js` | 100 | 100 | 100 | 100 | — |
| `utils/accessibility.js` | 100 | **85,71** | 100 | 100 | ramo da linha 10 |
| `utils/date.js` | 100 | 100 | 100 | 100 | — |
| `utils/format.js` | 100 | 100 | 100 | 100 | — |
| **Todos** | **100** | **98,48** | **100** | **100** | |

**Observações sobre a cobertura:**
- O ramo descoberto em `accessibility.js:10` é o valor padrão `value = ''`: nenhum teste chama `buildSpokenHint` sem `value`. **Sugestão (não aplicada):** um teste como `buildSpokenHint({ maxLength: 10 })` → `"0 de 10 caracteres"`.
- A tabela só lista os arquivos **importados pelos testes**, porque não há `collectCoverageFrom` na configuração. Componentes, telas e o `TasksContext` não aparecem nem como 0%. Isso é coerente com o objetivo (testar a lógica pura), mas a porcentagem "Todos" não representa o app inteiro. **Sugestão (não aplicada):** se quiser ver o que falta testar, acrescentar `"collectCoverageFrom": ["src/features/**/*.js", "src/utils/**/*.js", "src/services/**/*.js"]` em `jest` no `package.json`.

## 3. Os testes detectam erros

| Verificação | Status | Detalhe |
|---|---|---|
| Cópia temporária fora do projeto | Passou | Cópia em uma pasta temporária do sistema. SHA-256 original: `e803d041…c7ddd44e`. |
| Mudança de "Nada pendente por agora" → "Nada pendente por ora" faz **exatamente 1** teste falhar | Passou | `Tests: 1 failed, 55 passed, 56 total` · `Test Suites: 1 failed, 9 passed`. O teste que falhou foi `getEmptyHeroContent (card da tela Hoje sem passo) › todas concluídas: "Nada pendente por agora", com nova tarefa`, com `Expected: "Nada pendente por agora"` e `Received: "Nada pendente por ora"`. |
| Arquivo restaurado e idêntico | Passou | Depois de restaurar a cópia, o SHA-256 voltou a ser `e803d041…c7ddd44e`, igual ao original. **Observação:** `git diff src/features/tasks/heroContent.js` não mostra nada, mas isso **não serve de prova sozinho**, porque o arquivo ainda não é rastreado pelo Git (`??`). O `git diff` nunca compara arquivos não rastreados. A prova da restauração é a igualdade do SHA-256. A cópia temporária foi apagada. |

## 4. Saúde e compilação

| Verificação | Status | Detalhe |
|---|---|---|
| `npx expo-doctor` | Passou | "20/20 checks passed. No issues detected!" O `expo-doctor` **não** aponta o problema dos pacotes do Jest em `dependencies` (seção 1). |
| Bundle Android gerado | Passou | 1346 módulos. Saída: `entry-….hbc` (2,4 MB) + mapa de fontes. Código de saída 0. |
| Nenhum arquivo de teste no bundle | Passou | O mapa de fontes tem 1324 fontes, 36 delas de `src/`. **Nenhuma** tem `__tests__`, `.test.` ou `jest` no caminho. Os módulos novos `heroContent.js` e `utils/accessibility.js` estão no bundle, como deveriam. No bytecode não aparecem `__tests__`, `jest-expo`, `toEqual` nem os títulos dos testes. |
| Ocorrências de `describe(` e `.test.js` | Passou (falsos positivos) | `describe(` aparece no código do `expo-router` (`useNavigationBuilder.js` e `appendMissingPlaceholderTabRoutes.js`), numa função de navegação que se chama `describe`, não no Jest. `.test.js` aparece no bytecode só como parte da string `react.test.json`, um símbolo do React usado pelo `pretty-format`. Nenhuma das duas vem de arquivo de teste. |
| Pasta temporária apagada | Passou | — |

## 5. Revisão do código

| # | Verificação | Status | Detalhe |
|---|---|---|---|
| 5a.1 | `getEmptyHeroContent` igual à versão anterior | Passou | O código foi movido sem mudanças: mesmos textos, condições e ações. Comparação automática com `git show HEAD:src/app/(tabs)/index.js` em 40 listas de tarefas (vazia e todas as combinações de até 3 tarefas com `pending`, `done` e um status desconhecido): 0 diferenças. `index.js` agora importa de `../../features/tasks/heroContent`. |
| 5a.2 | `buildSpokenHint` igual à expressão anterior | Passou | Comparação automática com a expressão de `git show HEAD:src/components/TextField.js` em 448 combinações de erro, dica, valor e limite: 0 diferenças. |
| 5a.3 | Bordas fora do uso real | Passou (sem efeito) | Há duas diferenças em entradas que o app não produz. (1) Com erro `''` (string vazia), a versão antiga falava `""` e a nova fala a dica + contador. O formulário nunca passa erro vazio: ele usa `undefined` ou uma mensagem. (2) Com `value` indefinido e `maxLength`, a antiga lançava erro e a nova devolve `"0 de 10 caracteres"`. Nos dois casos a nova versão é mais segura. |
| 5b | `TextField` usa `multilineFieldMinHeight`, e o token vale 96 | Passou | `TextField.js:121`: `minHeight: multilineFieldMinHeight`. `src/theme/index.js:70`: `minTouchTarget * 2` = **96**. |
| 5c | Nenhum arquivo de teste em `src/app/` | Passou | Nenhum `__tests__` nem `*.test.*` em `src/app/`. Os 10 testes estão em `src/features/tasks`, `src/services/storage` e `src/utils`. |
| 5d.1 | Comentário de `borderStrong` | Passou | "Contorno dos estados vazios e dos campos de texto; trilho desligado da chave". Usos reais: `EmptyState.js:41`, `TextField.js:41` e `TaskForm.js:127/129` (trilho e fundo iOS da chave). |
| 5d.2 | Comentário de `pressedFeedback` | Passou | Lista botões, links de seção, caixa de seleção, linha de tarefa, botões do cabeçalho do formulário e linha "Para hoje". Usos reais: `Button.js`, `SectionHeader.js`, `Checkbox.js`, `TaskItem.js` e `TaskForm.js` (dois: `HeaderButton` e linha "Para hoje"). Todos os `Pressable` do app usam o token. A barra de abas é do navegador e não usa `pressedFeedback`, o que já era assim antes. |
| 5e | Observação: `DESIGN.md` desatualizado depois da mudança | Falhou (documentação, baixa gravidade) | `DESIGN.md:487` diz que `getEmptyHeroContent` está "em `src/app/(tabs)/index.js`", mas agora fica em `src/features/tasks/heroContent.js`. As inconsistências #16 (comentários do tema) e #18 (altura de 96 sem token) continuam marcadas como pendentes, mas foram resolvidas no código. **Correção sugerida (não aplicada):** atualizar o caminho na linha 487 e marcar #16 e #18 como "✅ Resolvido" na etapa do Jest. Também vale citar `buildSpokenHint` na seção do `TextField` e o token `multilineFieldMinHeight`. |

## Resumo

| Status | Quantidade |
|---|---|
| Passou | Escopo 5/6 · testes 56/56 em 10 suítes · detecção de erro 3/3 · saúde e compilação 5/5 · revisão 8 verificações |
| Falhou | 2: `jest`, `jest-expo` e `@types/jest` duplicados em `dependencies` · `DESIGN.md` desatualizado (caminho de `getEmptyHeroContent` e itens #16 e #18) |
| Não verificável sem o aparelho | Os testes manuais abaixo |

A configuração do Jest funciona, os testes detectam mudanças de comportamento, nenhum teste vai para o bundle e as duas funções movidas se comportam como antes. Antes do commit, vale corrigir a duplicação em `dependencies`.

## Testes manuais que continuam necessários no aparelho

Os testes do Jest cobrem só a lógica pura. Telas, componentes, navegação e leitor de tela continuam dependendo do aparelho:

1. **Abertura do app:** abre sem erro vermelho. As três abas e o formulário funcionam, porque `index.js` e `TextField.js` mudaram de import.
2. **Card "Seu próximo passo", nos três cenários** (sem tarefas, todas concluídas e pendentes sem passos): título, mensagem e botão certos, agora vindos de `heroContent.js`.
3. **Campo Observação:** a altura mínima continua igual (96 dp) e o texto começa no topo.
4. **Dicas faladas com o TalkBack:** Título "0 de 100 caracteres" e Observação "Um detalhe que ajude a começar, se quiser. 0 de 500 caracteres". Com erro, só a mensagem. Confirmar também que a dica do campo é **realmente lida** no Android.
5. **Linha "Para hoje" e Checkbox:** retorno visual ao toque e leitura única pelo TalkBack (sem mudança nesta etapa, mas ainda não testado no aparelho).
6. **Persistência real:** criar, editar, concluir e excluir tarefas, fechar o app por completo e abrir de novo. Os testes de `taskStorage.js` usam um AsyncStorage simulado, não o do aparelho.
7. **Pendências da auditoria de acessibilidade:** perda de foco ao concluir uma tarefa na aba Tarefas (3d), anúncio duplicado ao marcar (3c), pronúncia de "Pendentes (2)" (9d) e aviso de carregamento (9e).
8. **Árvore de acessibilidade:** quando houver `adb` e um aparelho com a depuração USB ativa, rodar `adb shell uiautomator dump` nas três telas e no formulário.
