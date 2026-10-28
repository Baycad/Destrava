# Destrava — Registro do projeto

Atualize este arquivo ao final de cada etapa. Uma funcionalidade só é marcada como
**testada** depois de executada de fato em um aparelho ou emulador.

## Ambiente

- Windows 10, VS Code, Node.js v22.20.0
- Expo SDK 58, React Native 0.88.0, React 19.3.0, Expo Router (rotas em `src/app`)
- `npx expo-doctor`: 20/20 aprovadas (antes da Etapa 1)

## Etapa 1 — Estrutura e interface visual

Status: **implementada, aguardando teste no aparelho**

### Funcionalidades

| Item | Status |
|---|---|
| Navegação inferior: Hoje, Tarefas, Progresso | Implementado, não testado |
| Tela Hoje (saudação, pergunta, card "Seu próximo passo", botão, tarefas de hoje, resumo) | Implementado, não testado |
| Tela Tarefas (pendentes e concluídas, versão visual) | Implementado, não testado |
| Tela Progresso (resumo da semana, versão visual) | Implementado, não testado |
| Dados de demonstração identificados + estados vazios | Implementado, não testado |

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

### Contrastes verificados (WCAG 2.1)

| Par | Contraste |
|---|---|
| Texto / fundo | 14,91:1 |
| Texto secundário / fundo | 6,73:1 |
| Cor principal / branco | 6,03:1 |
| Texto branco / card de destaque | 12,01:1 |
| Botão do card (texto / fundo) | 8,36:1 |
| Aviso de demonstração | 7,02:1 |
| Contorno tracejado / fundo (elemento gráfico) | 3,46:1 |

### Problemas conhecidos / limitações

- Botões "Começar 5 minutos" e "Nova tarefa" mostram apenas um aviso (funções nas próximas etapas).
- Linhas de tarefa ainda não são tocáveis.
- A saudação é calculada ao abrir a tela; se o app ficar aberto na virada do período, só
  atualiza ao reabrir.
- Componentes do template (`src/components/*.tsx`, `src/hooks`, `src/constants/theme.ts`)
  continuam no projeto, mas não são usados. Limpeza prevista para depois da Etapa 2.
- O repositório Git atual pertence à pasta-mãe, não ao Destrava (ver resposta da Etapa 1).

## Próximos passos

- Etapa 2: tarefas reais (criar, editar, concluir, excluir) com persistência local (AsyncStorage).
