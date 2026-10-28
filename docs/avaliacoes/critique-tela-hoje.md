# Crítica de design: tela Hoje

- **Alvo:** `src/app/(tabs)/index.js` (aba Hoje)
- **Data:** 28/10/2026
- **Ferramenta:** `/impeccable critique` (Impeccable 4.8.0), no Claude Code
- **Método:** só revisão de design. O detector automático não se aplica a plataforma nativa
  (Android).
- **Evidência:** só o código (tela, componentes, `src/theme/index.js`, `src/data/demo.js`),
  analisado com os dados de demonstração ligados. Não houve captura de tela, porque não
  havia adb nem aparelho conectado. As medidas de altura são estimativas para uma tela de
  360 dp de largura.
- **Referências:** `PRODUCT.md` e `DESIGN.md`, na raiz do projeto.
- **Situação:** nenhuma correção aplicada. As correções serão planejadas numa rodada única
  (Etapa 1.1), junto com as inconsistências listadas no `DESIGN.md`.

## Resultado

**21 de 32 pontos (66%): Aceitável.** Foram avaliadas oito das dez heurísticas de Nielsen,
porque duas não se aplicam a esta tela. Foram encontrados 5 problemas prioritários: 1 P1
(grave) e 4 P2 (menores), além de 6 observações menores.

Escala de severidade: **P0** impede a tarefa; **P1** causa dificuldade ou confusão
significativa; **P2** incomoda, mas há contorno; **P3** é acabamento.

## Saúde do design (heurísticas de Nielsen, 0 a 4)

| # | Heurística | Nota | Ponto principal |
|---|---|---|---|
| 1 | Visibilidade do estado do sistema | 2 | "Começar 5 minutos" termina num Alert "em construção"; as linhas de tarefa não respondem ao toque |
| 2 | Correspondência com o mundo real | 4 | Português natural, exemplos de universitário, "Passo 1 de 3 em…" |
| 3 | Controle e liberdade | 2 | O passo em destaque é escolhido pela regra provisória e não pode ser trocado nem diminuído na tela Hoje |
| 4 | Consistência e padrões | 3 | Ação de seção com 44 dp contra 48 dp; Alert onde o Material pede snackbar; aba sem o indicador do M3 |
| 5 | Prevenção de erros | n/a | A tela não tem campos nem ações destrutivas |
| 6 | Reconhecer em vez de lembrar | 3 | Próximo passo sempre visível, mas os círculos das tarefas parecem caixas de seleção |
| 7 | Flexibilidade e eficiência | 2 | Um caminho só para começar; "Ver todas"/"Ver progresso" repetem as abas |
| 8 | Estética e minimalismo | 2 | A pergunta em Display compete com o card; o passo aparece duas vezes; resumo semanal repetido |
| 9 | Recuperação de erros | n/a | A tela não tem estados de erro (sem entrada nem carregamento) |
| 10 | Ajuda e documentação | 3 | Os textos de apoio do card e os estados vazios orientam no momento certo |
| **Total** | | **21/32** | **Aceitável (66%)** |

Faixas: 90% ou mais, Excelente; 70%, Bom; 50%, Aceitável; 30%, Fraco; abaixo disso,
Crítico.

## Veredito de especificidade

A especificidade do Destrava está quase toda no texto, e pouco na forma. A pergunta
central, o "Passo 1 de 3 em Trabalho de Banco de Dados" e a frase "Cinco minutos já valem.
Se quiser parar depois, tudo bem." só existem neste produto. Já a forma visual
(verde-petróleo sobre cinza frio, cards brancos arredondados, botão em pílula, três números
grandes com legenda) serviria sem mudança a um app de hábitos ou de meditação.

Numa tela de tarefa isso é aceitável, porque contenção é o objetivo. A oportunidade
perdida é a forma não reforçar a ideia de "passo pequeno": o tamanho do passo e o lugar dele
na tarefa aparecem só como texto.

## Impressão geral

O conceito está certo: um card escuro com um único passo e um botão de cinco minutos é
exatamente a promessa do PRODUCT.md. O problema é que a tela não deixa o card ser o centro.
Antes dele vêm uma saudação em negrito, o aviso amarelo e a maior frase da tela, uma
pergunta. Depois dele, o mesmo passo se repete na lista. A maior oportunidade é fazer o
passo ser, de fato, a coisa mais forte da tela.

## O que funciona

1. **O card "Seu próximo passo" aplica a One Hero Rule.** É o único bloco escuro da tela,
   com uma ação, o botão em Menta Clara com 8,36:1 de contraste e uma frase de permissão
   logo depois do botão. A permissão para parar vem exatamente no momento do compromisso,
   que é o ponto de maior ansiedade.
2. **O texto é específico e sem culpa.** "Abrir o enunciado e ler só a primeira página" é
   um passo pequeno de verdade. Os estados vazios ("Nada marcado para hoje. Tudo bem.")
   tratam o dia vazio como normal, como pede o princípio 3 do PRODUCT.md.
3. **A acessibilidade está bem estruturada.** As linhas de tarefa e os números são lidos
   como uma frase só, os cabeçalhos de seção têm papel de cabeçalho, os ícones ficam
   ocultos e o texto não tem tamanho máximo travado.

## Problemas prioritários

### [P1] Hierarquia invertida: a pergunta é maior que o passo

- **Justificativa:** a pergunta usa Display (28/700), o maior estilo do app, e o passo usa
  Hero (24/700). A saudação também é 24/700. São três blocos em negrito antes ou no card, e
  o olho para primeiro na pergunta, não na resposta. Numa tela de 360 dp, a pergunta ocupa
  três linhas, e saudação, data, aviso e pergunta somam cerca de 300 dp antes do card
  começar. Para quem já está travado, a primeira coisa que aparece é uma pergunta que cobra
  em vez da ajuda.
- **Sugestão:** o texto do passo deve ser o maior da tela. Rebaixar a pergunta para Heading
  ou Body em Ardósia (decisão: ver "Escolhas do desenvolvedor"). Juntar saudação e data num
  cabeçalho mais leve.
- **Comando sugerido:** `/impeccable typeset`

### [P2] Não há saída para um passo que trava

- **Justificativa:** o card mostra um único passo, escolhido pela regra provisória (decisão
  pendente nº 6), e as únicas opções são começar ou sair da tela. O PRODUCT.md define a
  causa da procrastinação como evitar o desconforto. Se o passo mostrado é justamente o que
  a pessoa está evitando, a tela não oferece "diminuir este passo" nem "escolher outro",
  que são as sugestões que o próprio check-in prevê.
- **Sugestão:** uma ação de texto secundária no card ("Diminuir este passo" ou "Escolher
  outro"), abaixo do botão e sem competir com ele. Depende de uma decisão de produto, a ser
  tomada junto com a regra do próximo passo.
- **Comando sugerido:** `/impeccable shape`

### [P2] O mesmo passo aparece duas vezes

- **Justificativa:** "Abrir o enunciado e ler só a primeira página" aparece no card e logo
  abaixo, como "Próximo: …", na primeira linha de "Tarefas de hoje". A repetição enfraquece
  o princípio "um passo de cada vez" e ocupa espaço da tela.
- **Sugestão:** na lista, a tarefa que está no card mostra "Em destaque acima" (ou não
  mostra a linha "Próximo"), ou a lista não inclui essa tarefa.
- **Comando sugerido:** `/impeccable distill`

### [P2] Elementos que parecem tocáveis e não são

- **Justificativa:** o ícone de tarefa pendente é `radio_button_unchecked`, um círculo
  vazio que no Android significa "toque para marcar", mas a linha não responde ao toque. A
  dica de acessibilidade de "Começar 5 minutos" promete "Abre uma sessão curta de foco",
  mas o botão abre um aviso "em construção". Numa demonstração, essas são as duas primeiras
  coisas que alguém vai tocar.
- **Sugestão:** até a Etapa 2, usar um marcador que não pareça controle, ou antecipar o
  toque na linha. Ajustar a dica para dizer o que acontece de fato nesta etapa.
- **Comando sugerido:** `/impeccable clarify`

### [P2] Risco alto com a fonte no tamanho máximo (teste pendente)

- **Justificativa:** com fonte ampliada, o bloco antes do card (saudação, data, aviso e
  pergunta de três linhas) cresce na mesma proporção, e o botão principal pode cair para
  baixo da área visível. Os três números de "Sua semana" usam `flex: 1` numa linha de cerca
  de 88 dp cada, e legendas como "sessões de foco" tendem a quebrar no meio da palavra.
- **Sugestão:** fazer o teste pendente da Etapa 1. Deixar os números passarem para duas
  colunas ou para uma coluna quando a fonte for grande (`useWindowDimensions().fontScale`).
  Corrigir o problema P1 também reduz o bloco antes do card.
- **Comando sugerido:** `/impeccable adapt`

## Alertas por persona

**Estudante que trava, "Rafa"** (do PRODUCT.md): abre o app às 23h fugindo do trabalho de
Banco de Dados. Vê "Boa noite!", o aviso amarelo e a pergunta grande, que cobra antes de
ajudar. O passo sugerido é pequeno e bom, mas, se ler o enunciado é exatamente o que gera
ansiedade, não há como pedir algo menor. Logo abaixo, "55 minutos focados" é neutro, mas
fica na mesma tela da decisão.

**Usuário de TalkBack, "Sam":** ao navegar por cabeçalhos, o TalkBack vai de "Boa tarde!"
direto para "Tarefas de hoje" e pula o card "Seu próximo passo", porque o rótulo do card
não tem papel de cabeçalho. O bloco mais importante da tela fica invisível nesse modo de
navegação. A dica do botão promete uma sessão que não abre.

**Usuário distraído no celular, "Casey":** o botão principal fica no meio-baixo da tela
(bom para o polegar), mas termina num Alert que precisa ser fechado. As ações "Ver todas" e
"Ver progresso" são textos pequenos no canto direito. Nada é salvo ainda, então ao voltar
para o app a saudação pode estar desatualizada (limitação já registrada).

**Primeiro acesso, "Jordan"** (sem dados): o card diz "Criar minha primeira tarefa", mas o
botão leva para a aba Tarefas, onde é preciso achar "Nova tarefa" e tocar de novo. O nome
do botão promete criar, e o resultado é só navegar.

## Observações menores

1. O título da tela é a saudação. A palavra "Hoje" só aparece na aba, o que funciona
   visualmente, mas o TalkBack anuncia "Boa tarde!" como identidade da tela.
2. O padding de 24 dp do card vem da própria tela (inconsistência 7 do DESIGN.md).
3. O aviso "em construção" usa `Alert`, e com `userInterfaceStyle: "automatic"` ele pode
   aparecer escuro num aparelho em modo escuro (inconsistência 11 do DESIGN.md).
4. A barra de abas segue o padrão do React Navigation (só muda a cor da aba ativa), sem o
   indicador em pílula do Material 3. Isso combina com o "visual único" escolhido, mas não
   com as convenções do Android.
5. "Sua semana" repete na tela Hoje o que a aba Progresso já mostra, com três números
   grandes disputando atenção logo depois da lista.
6. O aviso de demonstração ocupa o melhor espaço da tela, mas é temporário (sai na
   Etapa 2).

## Perguntas para pensar

- E se a pergunta fosse o rótulo do card, para que o card pergunte e já responda na mesma
  hora? (Descartado: ver "Requisitos preservados".)
- A tela Hoje precisa de três números da semana, ou bastaria uma linha ("Esta semana: 6
  começos") com os números ficando na aba Progresso?
- O que o card oferece quando o próprio passo é aquilo que está sendo evitado?
- Como fica esta tela às 23h, sem nada feito no dia e sem nenhuma sessão na semana?

## Escolhas do desenvolvedor

| Pergunta | Escolha |
|---|---|
| Prioridade: qual área atacar primeiro | **Hierarquia do card**: fazer o passo ser o maior texto da tela (problema P1) |
| O que fazer com a pergunta central | **Manter fora do card, menor**: continua acima do card, em Heading ou Body Ardósia, abaixo do passo na hierarquia |
| Escopo | **Nenhuma alteração de código agora.** As correções serão planejadas numa rodada única (Etapa 1.1), junto com as inconsistências do DESIGN.md |

## Requisitos preservados na tela Hoje

Qualquer correção da Etapa 1.1 precisa manter:

1. A pergunta **"Qual é a menor coisa que você pode começar agora?"**.
2. O card com o nome **"Seu próximo passo"**.
3. Um **resumo simples do progresso**.

Efeito sobre as sugestões acima:

- **P1:** a pergunta continua na tela, fora do card, em tamanho menor. A opção de
  transformá-la no rótulo do card fica descartada, porque o card mantém o nome "Seu
  próximo passo".
- **Observação menor 5 e a segunda pergunta para pensar:** "Sua semana" não deve ser
  removido da tela Hoje. A sugestão possível é simplificá-lo, sem tirá-lo.

## Plano sugerido para a Etapa 1.1

Ordem de prioridade, seguindo as escolhas acima:

1. **`/impeccable typeset`** na tela Hoje: o passo do card vira o maior texto; a pergunta
   desce para Heading ou Body Ardósia, ainda fora do card; saudação e data ficam mais
   leves.
2. **`/impeccable distill`** na tela Hoje: tirar a repetição do passo na lista "Tarefas de
   hoje" e simplificar "Sua semana", mantendo um resumo do progresso.
3. **`/impeccable clarify`** na tela Hoje: marcador de tarefa que não pareça caixa de
   seleção, dica honesta em "Começar 5 minutos" e papel de cabeçalho no rótulo "Seu próximo
   passo".
4. **`/impeccable adapt`** na tela Hoje: resumo semanal com fonte ampliada, depois do teste
   pendente de fonte máxima.
5. **`/impeccable shape`** para "diminuir ou trocar o passo", só depois da decisão pendente
   nº 6 (regra do próximo passo).
6. **`/impeccable polish`** no fim, incluindo as inconsistências do DESIGN.md que tocam esta
   tela (7 e 11).

Depois das correções, rodar `/impeccable critique` de novo nesta tela para comparar com
estes 21/32.
