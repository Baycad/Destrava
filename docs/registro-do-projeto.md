# Destrava — Registro do projeto

Atualize este arquivo ao final de cada etapa. Uma funcionalidade só é marcada como
**testada** depois de executada de fato em um aparelho ou emulador.

Última atualização: 28/10/2026

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
| Transição em fade entre abas (`animation: 'fade'`) | A confirmar se foi aplicada | — |

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
- O botão flutuante de engrenagem visto nos testes pertence ao Expo Go, não ao Destrava.

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
- **Instalação:** `npx impeccable install`, escopo global (usuário), para não colocar
  arquivos da ferramenta no repositório.
- **Hook de verificação automática:** instalado nas configurações globais do Claude Code e
  **desligado neste projeto** com `/impeccable hooks off`, que criou `.impeccable/config.json`.
  Motivo: o verificador foi pensado para páginas web; preferimos aplicar mudanças apenas
  quando pedidas, para poder revisar e explicar cada uma.
- **Regras de uso:** commit antes de cada comando que altera código; revisar `git diff`;
  nenhuma biblioteca ou fonte nova sem aprovação; testar no aparelho depois de cada mudança.

## Próximos passos

1. Concluir os testes pendentes da Etapa 1 (fonte máxima, TalkBack, botão do estado vazio)
   e confirmar o fade entre abas.
2. Decidir se `.impeccable/` entra no Git ou no `.gitignore`.
3. `/impeccable init` (gera `PRODUCT.md`), `/impeccable document` (gera `DESIGN.md`)
   e `/impeccable critique` da tela Hoje; revisar os resultados antes de qualquer `polish`.
4. Etapa 2: tarefas reais (criar, editar, concluir, excluir) com persistência local
   (AsyncStorage) e estados de carregamento reais.