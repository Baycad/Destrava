import { useRouter } from 'expo-router';

import { AppText } from '../../components/AppText';
import { Card } from '../../components/Card';
import { EmptyState } from '../../components/EmptyState';
import { Screen } from '../../components/Screen';
import { ScreenHeader } from '../../components/ScreenHeader';
import { SectionHeader } from '../../components/SectionHeader';
import { getWeekSummary } from '../../features/progress/weekSummary';
import { HeroMessageCard, NextStepCard } from '../../features/tasks/HeroCards';
import { useTasks } from '../../features/tasks/TasksContext';
import { TasksStatusView } from '../../features/tasks/TasksStatusView';
import { TaskList } from '../../features/tasks/TaskList';
import { getEmptyHeroContent } from '../../features/tasks/heroContent';
import { getNextStep, getTodayTasks } from '../../features/tasks/selectors';
import { colors } from '../../theme';
import { formatLongDate, getGreeting } from '../../utils/date';
import { pluralize } from '../../utils/format';

// Ícone e dica falada de cada ação do card sem passo.
const EMPTY_HERO_ACTIONS = {
  new: { icon: 'add', hint: 'Abre o formulário de nova tarefa' },
  task: { icon: 'tasks', hint: 'Abre os detalhes da tarefa para escrever o passo' },
};

/**
 * Aba "Hoje": a tela inicial do Destrava.
 * Hierarquia: o passo dentro do card é o maior texto da tela;
 * a pergunta central fica acima do card, em tamanho menor.
 */
export default function TodayScreen() {
  const router = useRouter();
  const now = new Date();

  const { status, tasks } = useTasks();
  const nextStep = getNextStep(tasks);
  const todayTasks = getTodayTasks(tasks);
  const emptyHero = getEmptyHeroContent(tasks);
  const summary = getWeekSummary();

  function goToTasks() {
    router.navigate('/tarefas');
  }

  function goToProgress() {
    router.navigate('/progresso');
  }

  function handleEmptyHeroAction() {
    if (emptyHero.action === 'task') {
      router.push({ pathname: '/tarefa/[id]', params: { id: emptyHero.taskId } });
    } else {
      router.push('/tarefa/formulario');
    }
  }

  const header = <ScreenHeader title={`${getGreeting(now)}!`} subtitle={formatLongDate(now)} />;

  // Enquanto as tarefas são lidas do aparelho (ou se a leitura falhar).
  if (status !== 'ready') {
    return (
      <Screen>
        {header}
        <TasksStatusView />
      </Screen>
    );
  }

  return (
    <Screen>
      {/* 1. Saudação e apresentação do dia */}
      {header}

      {/* 2. Pergunta central: voz do produto, abaixo do passo na hierarquia */}
      <AppText variant="heading">Qual é a menor coisa que você pode começar agora?</AppText>

      {/* 3 e 4. Card de destaque com o botão principal */}
      {nextStep ? (
        <NextStepCard nextStep={nextStep} showTaskName />
      ) : (
        <HeroMessageCard
          title={emptyHero.title}
          message={emptyHero.message}
          actionLabel={emptyHero.actionLabel}
          actionIcon={EMPTY_HERO_ACTIONS[emptyHero.action].icon}
          actionHint={EMPTY_HERO_ACTIONS[emptyHero.action].hint}
          onAction={handleEmptyHeroAction}
        />
      )}

      {/* 5. Tarefas do dia (sem repetir o passo que já está no card) */}
      <SectionHeader
        title="Tarefas de hoje"
        actionLabel="Ver todas"
        actionHint="Abre a aba Tarefas"
        onAction={goToTasks}
      />
      {todayTasks.length > 0 ? (
        <TaskList tasks={todayTasks} highlightedTaskId={nextStep ? nextStep.task.id : null} />
      ) : (
        <EmptyState
          icon="leaf"
          title="Nada marcado para hoje"
          message="Tudo bem. Quando quiser, escolha uma tarefa e um primeiro passo pequeno."
        />
      )}

      {/* 6. Resumo simples do progresso: uma frase; os números completos ficam na aba Progresso */}
      <SectionHeader
        title="Sua semana"
        actionLabel="Ver progresso"
        actionHint="Abre a aba Progresso"
        onAction={goToProgress}
      />
      {summary ? (
        <Card>
          <AppText variant="body">
            Nesta semana:{' '}
            <AppText variant="bodyStrong" color={colors.primary}>
              {pluralize(summary.sessions, 'sessão de foco', 'sessões de foco')}
            </AppText>{' '}
            e{' '}
            <AppText variant="bodyStrong" color={colors.primary}>
              {pluralize(summary.stepsDone, 'passo feito', 'passos feitos')}
            </AppText>
            .
          </AppText>
          <AppText variant="caption" color={colors.textSecondary}>
            Cada começo conta, inclusive os pequenos.
          </AppText>
        </Card>
      ) : (
        <EmptyState
          icon="progress"
          title="Seu resumo aparece aqui"
          message="Depois da primeira sessão de foco, você verá o que já fez na semana."
        />
      )}
    </Screen>
  );
}
