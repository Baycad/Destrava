# Auditoria de acessibilidade — Etapa 2

> **Aviso importante:** esta é uma **auditoria do código-fonte**, feita por leitura estática dos componentes. **Não é um teste com o TalkBack** e **não substitui o teste manual** em um aparelho Android com o leitor de tela ligado.
>
> A árvore de acessibilidade real **não foi verificada**: o comando `adb` não está disponível neste computador (não está no PATH nem em `%LOCALAPPDATA%\Android\Sdk\platform-tools`). Por isso o `uiautomator dump` não foi executado. As frases em "O que o TalkBack deve anunciar" são **previsões** feitas a partir das propriedades no código. A redação exata depende da versão do TalkBack, do idioma e das configurações de verbosidade do aparelho.

- **Data:** 29/10/2026
- **Escopo:** `src/app/(tabs)/index.js`, `src/app/(tabs)/tarefas.js`, `src/app/tarefa/formulario.js`, `src/components/*.js` e `src/features/tasks/*.js`
- **Versões:** Expo SDK 58 (`expo ~58.0.21`), React Native 0.88.0, `expo-symbols ~58.0.4`
- **Observação:** `src/app/(tabs)/index.js` tinha alterações ainda não commitadas no momento da auditoria. O que foi auditado é a cópia de trabalho, não o último commit (`e911cbc`).
- **Nenhum arquivo de código foi alterado.** As correções abaixo são sugestões.

## Resumo

| Status | Quantidade |
|---|---|
| OK | 17 |
| Problema | 4 |
| Não verificável sem o aparelho | 5 |

Os nove itens pedidos estão atendidos no código. Os problemas encontrados ficam **em volta** desses itens: textos lidos duas vezes no formulário, a chave "Para hoje", que só responde ao toque no próprio controle, e a perda de foco do TalkBack quando uma tarefa é concluída na aba Tarefas.

## Tabela de verificação

Legenda de status: **OK** · **Problema** · **Não verificável** (sem o aparelho).

| # | Item | O que o código define | O que o TalkBack deve anunciar | Status | Correção sugerida (não aplicada) |
|---|---|---|---|---|---|
| 1 | Hoje: "Seu próximo passo" é cabeçalho | `index.js:111`: `<AppText variant="label" accessibilityRole="header">`. O `AppText` repassa `...rest` ao `Text` (`AppText.js:15`). | "Seu próximo passo, Título" (o TalkBack em pt-BR diz "Título" para cabeçalhos). Navegando por cabeçalhos, este é um ponto de parada. | OK | — |
| 2 | Hoje: botão "Começar 5 minutos" | `index.js:123-130` → `Button.js:45-51`: `Pressable` com `accessibilityRole="button"`, `accessibilityLabel="Começar 5 minutos"`, `accessibilityHint="Em construção: por enquanto, mostra um aviso"`, `accessibilityState={{ disabled: false }}`. O ícone `play` fica oculto. | "Começar 5 minutos, Botão", e depois de uma pausa: "Em construção: por enquanto, mostra um aviso". Ao ativar, abre o diálogo nativo "Modo foco em construção". | OK | — |
| 3a | Tarefas: papel, rótulo e estado da caixa de seleção | `TaskItem.js:41-46` → `Checkbox.js:14-20`: `accessibilityRole="checkbox"`, `accessibilityLabel={task.title}`, `accessibilityState={{ checked }}`, dica "Marca a tarefa como concluída" ou "Reabre a tarefa". Ícone oculto. | Pendente: "Não marcada, Ligar a luz da sala, Caixa de seleção" + dica "Marca a tarefa como concluída". Concluída: "Marcada, …" + dica "Reabre a tarefa". | OK | — |
| 3b | Tarefas: anúncio ao tocar | `TaskList.js:18-23`: `AccessibilityInfo.announceForAccessibility(task.status === 'done' ? 'Tarefa reaberta.' : 'Tarefa concluída.')`. Usa o status de **antes** da troca, então a lógica está correta. | "Tarefa concluída." ao marcar e "Tarefa reaberta." ao desmarcar. | OK | — |
| 3c | Tarefas: anúncio duplicado do estado | Além do anúncio manual, o Android costuma anunciar sozinho a mudança de estado de uma caixa de seleção focada. | Pode falar duas coisas seguidas: "Marcada" e "Tarefa concluída.". Também pode uma interromper a outra. | Não verificável | Confirmar no aparelho. Se ficar redundante, manter só uma das falas. Por exemplo, anunciar manualmente só quando o foco for perdido (ver 3d). |
| 3d | Tarefas: foco depois de concluir | Na aba Tarefas, pendentes e concluídas ficam em **dois `TaskList` diferentes** (`tarefas.js:84` e `:92`). Ao marcar, a tarefa sai de uma lista e é montada na outra. A `key` só vale dentro do mesmo pai, então a view nativa que tinha o foco é destruída. | O foco do TalkBack fica sem elemento. Na prática, ele costuma pular para outro item ou voltar ao topo, e a pessoa perde o lugar na lista. (Na tela Hoje a tarefa só muda de posição dentro da mesma lista, então o risco é menor.) | Problema | Depois de `toggleTask`, mover o foco de forma explícita com `AccessibilityInfo.setAccessibilityFocus(findNodeHandle(ref))`. O destino pode ser o próximo item pendente ou o cabeçalho da seção. Outra opção é manter a linha no lugar e só mudá-la de seção ao sair da tela. |
| 4 | Tarefas: área de texto da tarefa | `TaskItem.js:37` e `:47-52`: `Pressable` com `accessibilityRole="button"`, `accessibilityLabel = [título, resumo, próximo].filter(Boolean).join('. ')`, `accessibilityHint="Abre a edição da tarefa"`. O `Pressable` agrupa os textos filhos. | "Ligar a luz da sala. 1 de 3 passos feitos. Próximo: comprar lâmpada, Botão" + dica "Abre a edição da tarefa". Concluída: "Título. Concluída, Botão". Na Hoje, para a tarefa em destaque: "…Próximo passo em destaque no card acima". | OK | Observação: a fala segue a ordem pedida (título → resumo → próximo), que é diferente da ordem visual (título → próximo → resumo). Não é um erro, mas vale decidir se a ordem visual deve ser igual. |
| 5a | Formulário: rótulo do campo Título | `TaskForm.js:85-93` → `TextField.js:50-63`: `TextInput` com `accessibilityLabel="Título"` e `accessibilityHint={error ?? hint}` (o Título não tem `hint`). | "Título, Caixa de edição" (com texto: o texto digitado + "Caixa de edição, Título"). | OK | — |
| 5b | Formulário: erro ao salvar com título vazio | `TaskForm.js:61-69`: valida e chama `announceForAccessibility(Object.values(found)[0])`, que é "Escreva um título para a tarefa." (`validation.js:16`). O erro também aparece em `TextField.js:65-67` com `accessibilityLiveRegion="polite"` e passa a ser a dica do campo. | "Escreva um título para a tarefa." Ao focar o campo depois: "Título, Caixa de edição", e na dica: "Escreva um título para a tarefa." | OK | — |
| 5c | Formulário: erro anunciado duas vezes e foco | O erro é anunciado por **dois caminhos**: o `announceForAccessibility` e a live region do texto que acaba de aparecer. O foco continua em "Salvar" e não vai para o campo com erro. | Pode dizer "Escreva um título para a tarefa." duas vezes. Depois do anúncio, a pessoa precisa voltar até o campo por conta própria. | Não verificável | Confirmar no aparelho. Se repetir, manter só um caminho: tirar o `announceForAccessibility` e deixar a live region, ou o contrário. Para o foco, mover o foco de acessibilidade para o campo Título depois do erro (`ref` + `setAccessibilityFocus` ou `focus()`). Atenção: no Android 16, `View.announceForAccessibility` foi marcado como obsoleto. Isso reforça a opção pela live region, mas é preciso confirmar no aparelho. |
| 6a | Formulário: rótulo da chave "Para hoje" | `TaskForm.js:112-120`: `Switch` com `accessibilityLabel="Para hoje"` e `accessibilityHint='Mostra a tarefa em "Tarefas de hoje"'`. O papel vem do componente nativo. | "Desativada, Para hoje, Chave" (ou "Ativada…") + dica. Ao alternar: "Ativada" ou "Desativada". | OK | — |
| 6b | Formulário: só o controle responde ao toque | A linha `switchRow` (`TaskForm.js:105-121`) tem `minHeight: 48`, mas só o `Switch` responde ao toque. Os textos "Para hoje" e a explicação são elementos soltos. | O TalkBack lê "Para hoje" (texto), depois a explicação, depois a chave, que repete "Para hoje" e uma dica parecida com a explicação. Tocar no texto não alterna a chave. | Problema | Transformar a linha inteira em um único controle: `Pressable` com `accessibilityRole="switch"`, `accessibilityState={{ checked: forToday }}`, `accessibilityLabel="Para hoje"`, `onPress` alternando o valor e o `Switch` interno com `importantForAccessibility="no-hide-descendants"`. Isso resolve a leitura dupla e a área de toque. |
| 6c | Formulário: "Cancelar", "Salvar" e "Excluir tarefa" | `HeaderButton` (`TaskForm.js:14-30`): `accessibilityRole="button"` e rótulo. "Cancelar" tem a dica "Fecha sem salvar", "Salvar" não tem dica. "Excluir tarefa" usa `Button` (papel de botão) com a dica "Pede confirmação antes de excluir" e o ícone oculto. | "Cancelar, Botão, Fecha sem salvar" · "Salvar, Botão" · "Excluir tarefa, Botão, Pede confirmação antes de excluir". | OK | — |
| 7a | Toque ≥ 48 dp: `Button` | `Button.js:69`: `minHeight: 48`. A largura é o texto + `paddingHorizontal: 24` dos dois lados. | — | OK | — |
| 7b | Toque ≥ 48 dp: `Checkbox` | `Checkbox.js:32-33`: `width: 48`, `height: 48`. | — | OK | — |
| 7c | Toque ≥ 48 dp: ação da seção ("Ver todas", "Ver progresso") | `SectionHeader.js:19` e `:42`: `minHeight: 48`, `hitSlop={8}`. A largura é o texto (bem acima de 48) + 4 de cada lado. | — | OK | — |
| 7d | Toque ≥ 48 dp: "Cancelar" e "Salvar" | `TaskForm.js:158-159`: `minHeight: 48`, `minWidth: 48`, `hitSlop={8}`. | — | OK | — |
| 7e | Toque ≥ 48 dp: área de texto da tarefa | `TaskItem.js:81-86`: `paddingVertical: 8`. O conteúdo mínimo é o título (24) + espaço (4) + resumo (20), então a altura fica em pelo menos 64 dp. | — | OK | — |
| 7f | Toque ≥ 48 dp: campos de texto | `TextField.js:92`: `minHeight: 48`. O campo de várias linhas tem 96. | — | OK | — |
| 7g | Toque ≥ 48 dp: `Switch` "Para hoje" | Usa o tamanho nativo do Android, sem `minHeight` nem `hitSlop` próprios. A linha tem 48, mas só o `Switch` é tocável. | — | Não verificável | Medir no aparelho (`uiautomator dump`, campo `bounds`). A correção do item 6b já garante 48 dp na linha inteira. |
| 8 | Ícones decorativos ocultos | `Icon.js:36-42`: `SymbolView` com `accessible={false}` e `importantForAccessibility="no-hide-descendants"`. No Android, o `SymbolView` do `expo-symbols` (`node_modules/expo-symbols/build/SymbolView.js`) repassa esses props para a `View` externa, e o glifo interno é um `Text` com `aria-hidden`. Isso vale para todos os usos: `Button`, `Checkbox` e `EmptyState`. | Nenhum ícone é anunciado. Em `EmptyState`, o TalkBack vai direto ao título. | OK | — |
| 9a | Ordem de leitura: tela Hoje | Ver a seção "Ordem de leitura" abaixo. | — | OK | — |
| 9b | Leitura dupla: rótulos visíveis do formulário | `TextField.js:37-39` mostra o rótulo como `Text` solto e repete o mesmo texto no `accessibilityLabel` do `TextInput`. O contador fica entre os dois. | "Título" → "0 de 100 caracteres" → "Título, Caixa de edição". O rótulo é lido duas vezes, e o contador separa o rótulo do campo. | Problema | Ocultar do leitor de tela o rótulo visível e o contador (`importantForAccessibility="no"` + `accessibilityElementsHidden`). Levar o contador para a dica do campo, por exemplo `accessibilityHint="0 de 100 caracteres"`, ou juntar com a dica existente. |
| 9c | Leitura dupla: dica da Observação | `TextField.js:60` usa `hint` como `accessibilityHint` **e** mostra o mesmo texto embaixo (`:69-72`). | Campo: "Observação (opcional), Caixa de edição" + dica "Um detalhe que ajude a começar, se quiser." Logo depois, o mesmo texto de novo como elemento solto. | Problema | Ocultar do leitor o texto de dica visível quando ele já é a `accessibilityHint` do campo, ou manter o texto visível e não repetir na dica. |
| 9d | Cabeçalhos com números entre parênteses | `tarefas.js:82` e `:91`: títulos "Pendentes (2)" e "Concluídas (1)". | Dependendo da verbosidade de pontuação, pode dizer "Pendentes parêntese 2 parêntese, Título". | Não verificável | Se soar mal no aparelho, passar `accessibilityLabel="Pendentes, 2 tarefas"` ao `SectionHeader`, que hoje não aceita essa prop. |
| 9e | Aviso "Carregando suas tarefas…" | `LoadingState.js:25`: `View` com `accessible` e rótulo, mas sem live region. Ela aparece 300 ms depois. | Não é anunciado automaticamente. Só é lido se o foco chegar até ele. | Não verificável | Se a espera for perceptível no aparelho, adicionar `accessibilityLiveRegion="polite"` ao contêiner. |

## Ordem de leitura (item 9)

Para prever a ordem, foi considerada a estrutura dos componentes: o TalkBack percorre os elementos focáveis na ordem da árvore. No Android, uma `View` simples como `Card`, `Screen` ou os contêineres não vira um ponto de foco, então seus filhos são lidos um a um. Um `Pressable` agrupa os filhos em um único elemento.

### Tela Hoje (tarefas carregadas, com próximo passo)

1. "Boa tarde!, Título" (`ScreenHeader`)
2. "quinta-feira, 29 de outubro" (subtítulo)
3. "Qual é a menor coisa que você pode começar agora?". Tem estilo de `heading`, mas **não** tem `accessibilityRole="header"`, então não é ponto de parada na navegação por cabeçalhos. Se for intencional, porque é uma pergunta e não um título, está coerente.
4. "Seu próximo passo, Título"
5. Título do passo (texto `display`)
6. "Passo 1 de 3 em [tarefa]"
7. "Começar 5 minutos, Botão" + dica
8. "Cinco minutos já valem. Se quiser parar depois, tudo bem."
9. "Tarefas de hoje, Título"
10. "Ver todas, Botão" + dica "Abre a aba Tarefas"
11. Para cada tarefa do dia: caixa de seleção ("Não marcada, [título], Caixa de seleção") e depois a área de texto ("[título]. [resumo]. [próximo], Botão"). Ou, sem tarefas: "Nada marcado para hoje" → mensagem (ícone oculto).
12. "Sua semana, Título"
13. "Ver progresso, Botão" + dica
14. "Seu resumo aparece aqui" → mensagem. Hoje `getWeekSummary()` sempre devolve `null`, então este estado vazio é o que aparece. Quando houver resumo, o texto com `AppText` aninhado vira um único `Text` no Android e é lido como uma frase só: "Nesta semana: 2 sessões de foco e 3 passos feitos."
15. Barra de abas (fora do escopo desta auditoria)

Sem próximo passo, os itens 5–8 viram: título do estado vazio → mensagem → botão ("Criar minha primeira tarefa", "Nova tarefa" ou "Ver minhas tarefas", cada um com a sua dica).

**Possíveis repetições ou elementos pulados na Hoje:**
- O **título da tarefa é lido duas vezes por linha**: no rótulo da caixa de seleção e no começo do rótulo da área de texto. São dois controles diferentes e cada um precisa de rótulo próprio, então não é um erro. Mas é repetitivo em listas longas. Uma opção é deixar o rótulo da caixa de seleção mais curto ("Concluir [título]") ou aceitar a repetição.
- Nenhum elemento é pulado pela estrutura. Todos os textos estão fora de contêineres ocultos, e só os ícones estão ocultos, de propósito.

### Formulário (nova tarefa; na edição aparece também "Excluir tarefa")

1. "Cancelar, Botão" + dica "Fecha sem salvar"
2. "Nova tarefa, Título" (ou "Editar tarefa")
3. "Salvar, Botão"
4. "Título" (rótulo visível) **← repetido no item 6**
5. "0 de 100 caracteres" (contador)
6. "Título, Caixa de edição"
7. Só com erro: "Escreva um título para a tarefa."
8. "Observação (opcional)" (rótulo visível) **← repetido no item 10**
9. "0 de 500 caracteres"
10. "Observação (opcional), Caixa de edição" + dica "Um detalhe que ajude a começar, se quiser."
11. "Um detalhe que ajude a começar, se quiser." (texto visível) **← repete a dica do item 10**
12. "Para hoje" (texto) **← repetido no item 14**
13. "Mostra a tarefa em "Tarefas de hoje", na tela inicial."
14. "Desativada, Para hoje, Chave" + dica 'Mostra a tarefa em "Tarefas de hoje"' **← quase igual ao item 13**
15. Só na edição: "Excluir tarefa, Botão" + dica "Pede confirmação antes de excluir"

**Possíveis repetições ou elementos pulados no formulário:**
- Leituras duplas nos itens 4/6, 8/10, 10/11 e 12–14 (ver 6b, 9b e 9c na tabela).
- A ordem "Cancelar → título → Salvar" segue a ordem visual e é a esperada para um cabeçalho de modal.
- Com `autoFocus` no título (nova tarefa), o teclado abre, mas para onde vai o foco do TalkBack ao abrir o modal (primeiro elemento, título da janela ou campo) **não é verificável sem o aparelho**.
- Os anúncios "Tarefa criada.", "Tarefa atualizada." e "Tarefa excluída." (`formulario.js:41`, `:44` e `:63`) acontecem logo antes ou logo depois de `router.back()`. A troca de tela pode interromper esses anúncios. **Não verificável sem o aparelho.**

## Próximos passos recomendados

1. Fazer o **teste manual com o TalkBack** nas três telas, seguindo as ordens de leitura acima, e anotar o que difere.
2. Quando houver um aparelho conectado com a depuração USB ativa e o `adb` instalado, rodar `adb shell uiautomator dump` nas três telas e conferir `content-desc`, `class`, `checkable`, `checked`, `clickable` e `bounds`, principalmente para os itens 3c, 5c, 7g e 9d.
3. Priorizar as correções de **3d** (perda de foco) e **6b** (linha da chave), que afetam o uso. As leituras duplas (9b e 9c) são incômodas, mas não impedem o uso.
