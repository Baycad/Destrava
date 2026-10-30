# Testes da Etapa 3a (camada de dados dos passos)

> **Aviso:** estes testes foram feitos **sem aparelho**, com testes automatizados, um script de migração, compilação e leitura do código. Eles **não substituem os testes no aparelho**. Nada aqui foi testado no aparelho. O AsyncStorage foi simulado em memória, e nenhuma tela usa as ações de passo ainda.

- **Data:** 30/10/2026
- **Estado testado:** cópia de trabalho sobre o commit `9d54c00`, com a parte 3a **ainda não commitada**
- **Nenhum arquivo do projeto foi alterado**, a não ser por este relatório e pela pasta `coverage/` gerada pelo `npm run test:coverage` (ignorada pelo Git). Nada foi instalado no projeto e nada foi commitado.

## Comandos executados

| # | Comando | Onde | Resultado |
|---|---|---|---|
| 1 | `git status -uall` · `git diff --stat` · `git diff` | projeto | 12 arquivos modificados e 1 novo, os esperados |
| 2 | `npm test` | projeto | **11 suítes e 77 testes, todos passaram** |
| 3 | `npm run test:coverage` | projeto | Arquivos de lógica em 100% de linhas. Falta 1 ramo em `taskStorage.js` |
| 4 | `git show HEAD:…` de `exampleTasks.js`, `taskModel.js`, `tasksReducer.js` e `taskStorage.js` | pasta temporária fora do projeto | Versões da Etapa 2 usadas para gravar os dados de exemplo |
| 5 | `npx --yes tsx --require ./register.cjs run.mts "X:/programação/Destrava"` | pasta temporária fora do projeto | 30 verificações, 30 passaram, mais 12 medições do reducer. Pasta apagada depois |
| 6 | `grep` em `src/` (usos de `addTask`, `updatedAt` e criação de passos) | projeto (leitura) | Ver seção 4 |
| 7 | `npx expo-doctor` | projeto | **20/20** |
| 8 | `CI=1 npx expo export --platform android --output-dir <pasta temporária>` | saída fora do projeto | Bundle gerado sem erros. Pasta apagada depois |

## 1. Escopo

| Verificação | Status | Detalhe |
|---|---|---|
| 12 arquivos modificados e 1 novo | Passou | Modificados: `TasksContext.js`, `exampleTasks.js`, `selectors.js`, `taskModel.js`, `tasksReducer.js`, `validation.js` (em `src/features/tasks`); `taskStorage.js` (em `src/services/storage`); e 5 arquivos de teste (`exampleTasks`, `selectors`, `taskModel`, `validation`, `taskStorage`). Novo: `src/features/tasks/__tests__/stepsReducer.test.js`. Total: 278 inserções e 24 remoções. |
| Nenhuma tela nem componente mudou | Passou | Nada em `src/app` nem em `src/components`. |
| Nenhuma dependência mudou | Passou | `package.json` e `package-lock.json` não aparecem no `git status`. |

## 2. Testes

| Verificação | Status | Detalhe |
|---|---|---|
| `npm test`: 11 suítes e 77 testes | Passou | `Test Suites: 11 passed, 11 total` · `Tests: 77 passed, 77 total` |
| 100% de linhas nos arquivos de lógica | Passou | Ver a tabela de cobertura |
| 100% de ramos nos arquivos de lógica | **Falhou** (baixa gravidade) | `taskStorage.js` tem 92,3% de ramos. Falta o lado `[]` de `task.steps ?? []`, na linha 23: nenhum teste do Jest migra uma tarefa versão 1 **sem** o campo `steps`. O comportamento está certo: o script da seção 3 testou esse caso e o resultado foi `steps: []`. **Correção sugerida (não aplicada):** acrescentar em `taskStorage.test.js` uma tarefa v1 sem `steps` e conferir `steps: []`. |

## Cobertura (`npm run test:coverage`)

| Arquivo | % Instruções | % Ramos | % Funções | % Linhas | Linhas sem cobertura |
|---|---|---|---|---|---|
| `features/tasks/exampleTasks.js` | 100 | 100 | 100 | 100 | — |
| `features/tasks/heroContent.js` | 100 | 100 | 100 | 100 | — |
| `features/tasks/selectors.js` | 100 | 100 | 100 | 100 | — |
| `features/tasks/taskModel.js` | 100 | 100 | 100 | 100 | — |
| `features/tasks/tasksReducer.js` | 100 | 100 | 100 | 100 | — |
| `features/tasks/validation.js` | 100 | 100 | 100 | 100 | — |
| `services/storage/taskStorage.js` | 100 | **92,3** | 100 | 100 | ramo da linha 23 |
| `features/tasks/TaskForm.js` | 0 | 0 | 0 | 0 | 11-148 (interface) |
| `features/tasks/TaskItem.js` | 0 | 0 | 0 | 0 | 16-70 (interface) |
| `features/tasks/TaskList.js` | 0 | 0 | 0 | 0 | 15-35 (interface) |
| `features/tasks/TasksContext.js` | 0 | 0 | 0 | 0 | 9-96 (contexto) |
| `features/tasks/TasksStatusView.js` | 0 | 0 | 0 | 0 | 10-24 (interface) |
| **Pasta `features/tasks`** | 54,41 | 56,8 | 57,14 | 50,27 | |
| **Pasta `services/storage`** | 100 | 92,3 | 100 | 100 | |

**Observações:**
- `TasksContext.js` tem 0%, então `addStep`, `updateStep`, `toggleStep`, `deleteStep`, `moveStep` e o retorno de `addTask` **não têm teste automático**. A lógica deles é só chamar `createStep`, aparar o texto e despachar a ação. O reducer e `createStep` estão testados.
- Os 100% de `tasksReducer.js` não garantem os casos sem mudança: nenhum teste chama `step/updated`, `step/toggled` ou `step/deleted` com um passo inexistente, e essas linhas contam como cobertas pelos outros testes (ver 4b.3).

## 3. Migração com dados de exemplo

Os dados foram gravados com o **`writeTasks` da Etapa 2** (`git show HEAD:src/services/storage/taskStorage.js`), então o JSON é exatamente o formato antigo. As tarefas vieram do `buildExampleTasks` e do `createTask` do commit anterior, mais uma tarefa concluída pelo `tasksReducer` do commit anterior. Ao todo são 6 tarefas e 7 passos, incluindo tarefas sem passos e tarefas concluídas. A leitura e a gravação seguintes usaram o código novo, com o AsyncStorage em memória.

| Verificação | Status | Detalhe |
|---|---|---|
| JSON de partida na versão 1 | Passou | `schemaVersion: 1`. Todos os passos têm só `id`, `title` e `done`. |
| Nada foi perdido | Passou | Mesma quantidade de tarefas (6) e de passos (7). |
| Mesmos ids, na mesma ordem | Passou | Tarefas e passos. |
| Campos da tarefa idênticos | Passou | `id`, `title`, `notes`, `status`, `forToday`, `createdAt`, `updatedAt` e `completedAt` iguais em todas as tarefas. |
| Passos mantêm `id`, `title` e `done` | Passou | — |
| Cada passo ganhou `createdAt: null` e `completedAt: null` | Passou | Inclusive os passos já feitos (`done: true`): a data é desconhecida e não é inventada. |
| Tarefa concluída preservada | Passou | `status: 'done'`, com `completedAt` e `updatedAt` da conclusão original. |
| Próximo passo igual ao de antes | Passou | "Abrir o enunciado e ler só a primeira página", passo 1 de 3 de "Trabalho de Banco de Dados". |
| Ler de novo dá o mesmo resultado | Passou | A migração pode rodar várias vezes. |
| Ler não reescreve o armazenamento | Passou (comportamento a conhecer) | Depois da leitura, o JSON salvo continua na versão 1. O `TasksContext` também evita gravar logo após carregar (`skipNextSave`). O dado só passa para a versão 2 na **primeira alteração** do usuário. Até lá, a migração roda a cada abertura do app, sem prejuízo. |
| `writeTasks` grava a versão 2 | Passou | `schemaVersion: 2`, com as mesmas tarefas. Reler não muda nada. |
| Datas novas não são sobrescritas | Passou | Um passo concluído depois da migração mantém o `completedAt` ao gravar e reler. |
| Tarefa v1 sem o campo `steps` | Passou | Vira `steps: []`. É o ramo que falta no Jest (seção 2). |

## 4. Revisão do código

| # | Verificação | Status | Detalhe |
|---|---|---|---|
| 4a.1 | Migração aplicada uma versão por vez | Passou | `taskStorage.js:36-46`: se a versão é 1, aplica `migrateV1toV2` e passa para 2. Depois compara com `CURRENT_SCHEMA_VERSION`. Uma futura versão 3 entra como mais um passo. |
| 4a.2 | Só aceita as versões 1 e 2 | Passou | Testado com `0`, `3`, `99`, `"1"`, `"2"`, `null`, ausente e `1.5`: todas dão "Versão de dados desconhecida", e o JSON salvo continua intacto. No app, isso leva ao status `error` com "Tentar de novo". Como só se grava com o status `ready`, os dados não são apagados. |
| 4b.1 | Ações de passo atualizam o `updatedAt` | Passou | As 5 ações, com mudança real, atualizam o `updatedAt` e preservam o `createdAt`. |
| 4b.2 | Mesmo estado com tarefa inexistente ou ao mover no extremo | Passou | As 5 ações com tarefa inexistente, e `step/moved` com passo inexistente, primeiro para cima e último para baixo: **devolvem o mesmo objeto**. |
| 4b.3 | Mesmo estado com **passo** inexistente | **Falhou** (baixa gravidade) | Ver a tabela abaixo. **`step/updated`, `step/toggled` e também `step/deleted`** criam um estado novo mesmo sem mudança real. |
| 4b.4 | `step/updated` com o mesmo texto | Observação | Também cria estado novo e muda o `updatedAt`, mesmo com o texto igual. |
| 4c | `addTask` devolver o id não quebra o formulário | Passou | `formulario.js:43` chama `addTask(fields);` e ignora o retorno. É o único uso em `src/`. O retorno antes era `undefined`. |
| 4d.1 | Nenhum código de `src/` cria passos sem as datas | Passou | Só há dois pontos que criam passos: `createStep` (`taskModel.js:45`) e o `step` de `exampleTasks.js`, ambos com `createdAt` e `completedAt`. Fora eles, só a migração completa passos antigos. |
| 4d.2 | Passos no formato antigo nos testes | Passou (sem efeito) | `taskStorage.test.js:53-54` usa o formato antigo de propósito, para testar a migração. `tasksReducer.test.js:44` e o `step` de `selectors.test.js:16` também usam, mas as funções testadas não leem as datas. |
| 4d.3 | Passos de exemplo já feitos | Passou | Em `exampleTasks.js`, ficam com `done: true` e `completedAt: null`, de propósito: o comentário explica que assim não contam como "feitos nesta semana" no futuro resumo. **Atenção para a etapa do resumo:** o cálculo precisará ignorar passos feitos com `completedAt` nulo. |
| 4e | Refatoração de `getNextStep` | Passou | Agora usa `getNextStepOfTask`. Os candidatos já têm um passo em aberto, então o resultado tem os mesmos campos de antes, e os testes de `selectors` continuam passando. |

### Medição das ações sem mudança real (item 4b)

| Ação | Mesmo objeto de estado? | `state.tasks` novo? | `updatedAt` mudou? | Passos mudaram? |
|---|---|---|---|---|
| As 5 ações, tarefa inexistente | Sim | Não | Não | Não |
| `step/moved`, passo inexistente | Sim | Não | Não | Não |
| `step/moved`, primeiro para cima | Sim | Não | Não | Não |
| `step/moved`, último para baixo | Sim | Não | Não | Não |
| **`step/updated`, passo inexistente** | **Não** | **Sim** | **Sim** | Não |
| **`step/toggled`, passo inexistente** | **Não** | **Sim** | **Sim** | Não |
| **`step/deleted`, passo inexistente** | **Não** | **Sim** | **Sim** | Não |
| `step/updated`, mesmo texto | Não | Sim | Sim | Não |

**Causa:** `changeTask` só reconhece "nada mudou" quando recebe a mesma tarefa de volta. `changeStep` e `step/deleted` sempre montam uma tarefa nova (`{ ...task, steps: … }`), mesmo sem o passo existir.

**Efeito prático:**
- **Hoje, nenhum:** nenhuma tela chama essas ações.
- **Quando as telas existirem,** o caso mais provável é um toque duplo em "excluir passo": o segundo toque chega com um id que já não existe. O efeito seria:
  - o `updatedAt` da tarefa muda sem alteração real. Nada em `src/` lê esse campo fora do reducer, do modelo e dos exemplos, então nada aparece para o usuário hoje;
  - o `useEffect` do `TasksContext` grava a lista inteira de novo, uma vez a mais, e as telas que usam `useTasks()` são redesenhadas;
  - **nenhum dado é perdido ou corrompido.**

**Correção sugerida (não aplicada):**
- Em `changeStep`, começar com `if (!task.steps.some((step) => step.id === stepId)) return task;`.
- Em `step/deleted`, fazer a mesma verificação.
- Se quiser cobrir também o texto igual, comparar `step.title` com `action.changes.title` e devolver a tarefa sem mudança.
- Acrescentar em `stepsReducer.test.js` um teste `toBe(state)` para cada caso. Hoje os testes de "mesmo estado" cobrem só `step/moved` nos extremos e `step/added` com tarefa inexistente.

## 5. Saúde e compilação

| Verificação | Status | Detalhe |
|---|---|---|
| `npx expo-doctor` | Passou | "20/20 checks passed. No issues detected!" |
| Bundle Android | Passou | 1346 módulos. Saída: `entry-….hbc` (2,9 MB). Código de saída 0. |
| Pasta temporária apagada | Passou | Fora do projeto, apagada depois. |

## Resumo

| Status | Quantidade |
|---|---|
| Passou | Escopo 3/3 · testes 77/77 em 11 suítes · migração 13/13 · revisão 9 verificações · saúde e compilação 3/3 |
| Falhou | 2, de baixa gravidade: ramo sem cobertura em `taskStorage.js:23` · `step/updated`, `step/toggled` e `step/deleted` recriam o estado com passo inexistente |
| Observação | `step/updated` com o mesmo texto também recria o estado |
| Não verificável sem o aparelho | Os testes manuais abaixo |

A migração preserva os dados da Etapa 2, e nenhuma tela foi afetada. A falha do reducer não perde dados e não tem efeito hoje. O melhor momento para corrigi-la é antes de as telas de passos começarem a usar essas ações.

## Testes manuais que continuam necessários no aparelho

1. **Migração real:** com tarefas salvas pela versão atual do app no aparelho (Etapa 2), instalar ou recarregar esta versão e abrir o app. Todas as tarefas devem continuar lá, com os mesmos títulos, status e "Para hoje".
2. **Persistência depois da migração:** alterar uma tarefa (o que grava a versão 2), fechar o app por completo e abrir de novo.
3. **Sem alterar nada:** abrir e fechar o app várias vezes sem mudar nada. Os dados devem continuar iguais (o JSON fica na versão 1 até a primeira alteração).
4. **Regressão das telas:** criar, editar, concluir, reabrir e excluir tarefas, e conferir o card "Seu próximo passo" e o botão "Carregar exemplos" no modo de desenvolvimento. Essas telas usam os seletores e o `exampleTasks` alterados.
5. **Ações de passo:** `addStep`, `updateStep`, `toggleStep`, `deleteStep` e `moveStep` só podem ser testadas no aparelho quando a tela de passos existir (próximas partes da Etapa 3), incluindo o toque duplo em "excluir passo".
6. **Pendências de testes anteriores:** os testes manuais de [testes-etapa2-ajustes.md](testes-etapa2-ajustes.md) e os itens da auditoria de acessibilidade que continuam abertos (3c, 3d, 9d e 9e).

## Correção aplicada

> **Verificação de 30/10/2026, depois da correção.** Também foi feita sem aparelho e não substitui os testes manuais listados acima. As seções anteriores deste relatório mostram o estado antes da correção. Esta verificação não repetiu o `expo-doctor`, o export nem o script de migração.

**Comandos:** `git status -uall` · `git diff --stat` · `git diff` · `find -newer` (datas dos arquivos) · `npm test` · `npm run test:coverage`.

| Verificação | Status | Detalhe |
|---|---|---|
| `tasksReducer.js` mudou | Passou | No `--stat`, passou de 65 para 83 linhas alteradas. |
| `stepsReducer.test.js` mudou | Passou | Arquivo novo, de 119 para 152 linhas. |
| `taskStorage.test.js` mudou | Passou | No `--stat`, passou de 38 para 43 linhas alteradas. |
| Os outros 6 arquivos de lógica não mudaram | Passou | `TasksContext.js`, `exampleTasks.js`, `selectors.js`, `taskModel.js`, `validation.js` e `taskStorage.js` têm o mesmo diff, comparado linha a linha, da verificação anterior. |
| Os outros 4 arquivos de teste não mudaram | Passou em parte | `exampleTasks`, `selectors`, `taskModel` e `validation`.test.js têm as mesmas contagens de linhas alteradas (5, 25, 14 e 22). **O conteúdo não foi comparado**, porque a verificação anterior não guardou esses diffs nem hashes dos arquivos. |
| Nenhum outro arquivo mudou | Passou | O `git status` mostra os mesmos arquivos de antes, mais este relatório. Nada em `src/app`, `src/components` nem nos arquivos de dependências. |
| `npm test`: 11 suítes e 81 testes | Passou | `Test Suites: 11 passed, 11 total` · `Tests: 81 passed, 81 total`. São 4 testes a mais que os 77 anteriores. |
| 100% em `tasksReducer.js` | Passou | 100% de instruções, ramos, funções e linhas. |
| 100% em `taskStorage.js` | Passou | 100% de instruções, ramos, funções e linhas. Antes eram 92,3% de ramos. |

**Observação sobre as datas dos arquivos:** os 10 arquivos que não deveriam ter mudado também têm data de modificação posterior a este relatório (18:19 a 18:20; os 3 corrigidos são de 18:41). Por isso as datas não servem de prova, e a confirmação vem das comparações da tabela.

**Situação das falhas deste relatório:**

| Item | Antes | Agora | Como foi resolvido |
|---|---|---|---|
| 4b.3: `step/updated`, `step/toggled` e `step/deleted` com passo inexistente | Falhou | Passou | `changeStep` e `step/deleted` devolvem a mesma tarefa quando o passo não existe, e `changeTask` devolve o mesmo estado. Há testes `toBe(state)` para as três ações. |
| 4b.4: `step/updated` com o mesmo texto | Observação | Passou | `hasSameValues` devolve o mesmo passo quando os valores não mudam. Há um teste `toBe(state)`. |
| Toque duplo em "excluir passo" | Previsto para as telas futuras | Passou no teste de lógica | Um teste exclui o mesmo passo duas vezes: a segunda devolve o mesmo estado e o `updatedAt` não muda. O toque duplo de verdade continua dependendo da tela e do aparelho. |
| Ramo da linha 23 de `taskStorage.js` | Falhou | Passou | Um teste migra uma tarefa versão 1 sem o campo `steps` e confere `steps: []`. |

**Continua igual:** `TasksContext.js` segue com 0% de cobertura, então `addStep`, `updateStep`, `toggleStep`, `deleteStep`, `moveStep` e o retorno de `addTask` não têm teste automático.
