# Product

<!-- impeccable:product-schema 1 -->

## Platform

android

## Users

Estudantes universitários que procrastinam. A situação típica: um trabalho, uma leitura ou
uma revisão para prova vem sendo adiada, e a pessoa não consegue começar, muitas vezes por
evitar o desconforto ligado à tarefa (ansiedade, tédio, frustração, sensação de que é grande
ou confusa demais), e não por falta de tempo. O trabalho que o Destrava faz por
ela é transformar "preciso fazer isso" em uma ação pequena o bastante para começar agora.

## Product Purpose

O Destrava ajuda a sair da paralisia do começo. Cada tarefa é dividida em passos pequenos,
o app destaca um único "próximo passo" e oferece uma sessão curta de foco (5 minutos) para
dar a partida. Sucesso é a pessoa começar, não necessariamente terminar: avançar um passo
ou parar depois de alguns minutos também conta como resultado.

Uma das funcionalidades prioritárias é o check-in opcional depois de cada sessão. A pessoa
pode indicar o obstáculo que apareceu (ex.: não sei por onde começar, me distraí, estou
ansioso) e recebe uma sugestão prática de próximo passo: criar um passo menor, começar 5
minutos ou adiar conscientemente. Adiar de forma consciente é aceito e não é tratado como
falha.

O Destrava é uma ferramenta de organização e reflexão. Não faz diagnóstico e não substitui
acompanhamento profissional (texto já presente na aba Progresso).

## Positioning

O app não organiza uma lista de afazeres. Ele gira em torno de uma pergunta: "Qual é a menor
coisa que você pode começar agora?". O mecanismo é decompor a tarefa em passos mínimos,
mostrar um próximo passo de cada vez, propor uma sessão de cinco minutos com permissão
explícita para parar, e registrar o resultado sem julgamento: concluído, avançou ou parou. Depois da sessão, um
check-in opcional pergunta qual obstáculo apareceu e devolve uma sugestão prática (um passo
menor, mais 5 minutos ou adiar conscientemente), tratando o adiamento consciente como uma
escolha válida.

## Operating Context

- Uso no celular, em momentos de estudo ou de adiamento, geralmente sozinho.
- Navegação em três abas: **Hoje** (saudação, próximo passo, tarefas do dia, resumo da
  semana), **Tarefas** (pendentes e concluídas) e **Progresso** (números da semana e
  resultados das sessões).
- Projeto acadêmico da disciplina de Desenvolvimento de Aplicativos, avaliado pelo professor. Existe um documento de
  planejamento fora do repositório, com decisões numeradas (ex.: "decisão pendente nº 6").
  O andamento é registrado em `docs/registro-do-projeto.md`, e uma funcionalidade só é
  marcada como testada depois de rodar num aparelho.

## Capabilities and Constraints

- **Stack:** Expo SDK 58, React Native 0.88, Expo Router (rotas em `src/app`). O código do
  app é em JavaScript (`.js`) dentro do template TypeScript.
- **Plataforma:** Android primeiro, testado em aparelho físico com Expo Go. O iOS pode vir
  depois, com o mesmo visual próprio e não uma adaptação por sistema. A web fica fora do
  foco.
- **Etapas:**
  - Etapa 1 (estrutura visual e navegação) concluída, com dados de demonstração
    (`SHOW_DEMO_DATA` em `src/data/demo.js`).
  - Etapa 2: tarefas reais com persistência local.
  - Etapa 4: temporizador de foco.
- **Ainda não funciona:** "Começar 5 minutos" e "Nova tarefa" só mostram um aviso, e as
  linhas de tarefa não são tocáveis.
- **Modelo de dados:** tarefa (`title`, `status`, `forToday`, `steps[]`), passo (`title`,
  `done`) e resumo semanal (sessões, minutos focados, passos feitos, resultados
  `completed` / `progressed` / `stopped`). Campos em inglês, textos em português.
- **Regras de trabalho:**
  - nenhuma biblioteca ou fonte nova sem aprovação;
  - commit antes de mudanças de código;
  - revisar o `git diff`;
  - testar no aparelho depois de cada mudança.
- **Decisões em aberto:**
  - a regra definitiva do "próximo passo" (hoje é provisória: o primeiro passo em aberto
    da primeira tarefa pendente marcada para hoje);
  - o modo escuro (adiado; hoje só existe o tema claro).

## Brand Commitments

- **Nome:** Destrava. Interface toda em português do Brasil.
- **Voz:** acolhedora, sem cobrança e sem culpa. Valoriza começos pequenos: "Cinco minutos
  já valem. Se quiser parar depois, tudo bem.", "Cada começo conta, inclusive os
  pequenos.", "Nada marcado para hoje. Tudo bem."
- **Linguagem:** sem termos clínicos e sem promessas terapêuticas.

## Evidence on Hand

- Vídeo de teste da Etapa 1 num Android físico (28/10/2026), com o resultado registrado em
  `docs/registro-do-projeto.md`.
- Contrastes WCAG 2.1 medidos e registrados no mesmo documento.
- Não há usuários reais, depoimentos, métricas de uso nem estudos com o app. As decisões de
  produto se baseiam em literatura sobre procrastinação acadêmica (Van Eerde & Klingsieck,
  2018; Salguero-Pazos & Reyes-de-Cózar, 2023; Turner & Hodis, 2023; definição da APA) e são
  tratadas como hipóteses de design, não como eficácia comprovada. Os números da tela
  Progresso são de demonstração e não podem ser apresentados como resultado.

## Product Principles

1. **Começar vale mais que terminar.** Toda tela deve deixar a próxima ação pequena e óbvia.
2. **Um passo de cada vez.** Mostrar o próximo passo é mais útil que mostrar a lista
   inteira.
3. **Sem culpa.** Parar, adiar ou ter um dia vazio é tratado como normal, nunca como falha.
4. **Honestidade.** Não diagnosticar, não prometer, não inventar dados ou progresso.
5. **Simples de manter e explicar.** É um projeto acadêmico: cada decisão precisa ser
   justificável e cada mudança precisa ser revisável.

## Accessibility & Inclusion

- Contraste WCAG 2.1 AA verificado em todos os pares de cor de texto e de elemento gráfico.
- A fonte do sistema acompanha o tamanho escolhido pelo usuário, e a interface não pode
  cortar texto no tamanho máximo (teste pendente).
- Leitura com TalkBack: rótulos e dicas de acessibilidade nos botões e links (teste
  pendente).
- Alvos de toque de no mínimo 48 dp.
