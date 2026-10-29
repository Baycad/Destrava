import { useRouter } from 'expo-router';
import { Alert, StyleSheet } from 'react-native';

import { AppText } from '../../components/AppText';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { EmptyState } from '../../components/EmptyState';
import { Screen } from '../../components/Screen';
import { ScreenHeader } from '../../components/ScreenHeader';
import { SectionHeader } from '../../components/SectionHeader';
import { getWeekSummary } from '../../features/progress/weekSummary';
import { useTasks } from '../../features/tasks/TasksContext';
import { TasksStatusView } from '../../features/tasks/TasksStatusView';
import { TaskList } from '../../features/tasks/TaskList';
import { getNextStep, getTodayTasks } from '../../features/tasks/selectors';
import { colors, spacing } from '../../theme';
import { formatLongDate, getGreeting } from '../../utils/date';
import { pluralize } from '../../utils/format';

/**
 * Aba "Hoje": a tela inicial do Destrava.
 * Hierarquia (Etapa 1.1): o passo dentro do card é o maior texto da tela;
 * a pergunta central fica acima do card, em tamanho menor.
 */
export default function TodayScreen() {
  const router = useRouter();
  const now = new Date();

  const { status, tasks } = useTasks();
  const nextStep = getNextStep(tasks);
  const todayTasks = getTodayTasks(tasks);
  const summary = getWeekSummary();

  function handleStartFocus() {
    // O temporizador de foco será construído numa próxima etapa.
    Alert.alert(
      'Modo foco em construção',
      'Nesta etapa, o botão é apenas visual. O temporizador de foco chega numa próxima etapa.'
    );
  }

  function goToTasks() {
    router.navigate('/tarefas');
  }

  function goToNewTask() {
    router.push('/tarefa/formulario');
  }

  function goToProgress() {
    router.navigate('/progresso');
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
      <Card variant="hero">
        <AppText variant="label" color={colors.onHeroSecondary} accessibilityRole="header">
          Seu próximo passo
        </AppText>

        {nextStep ? (
          <>
            <AppText variant="display" color={colors.onHero}>
              {nextStep.step.title}
            </AppText>
            <AppText variant="caption" color={colors.onHeroSecondary}>
              Passo {nextStep.position} de {nextStep.total} em {nextStep.task.title}
            </AppText>
            <Button
              label="Começar 5 minutos"
              icon="play"
              variant="hero"
              onPress={handleStartFocus}
              accessibilityHint="Em construção: por enquanto, mostra um aviso"
              style={styles.heroButton}
            />
            <AppText variant="caption" color={colors.onHeroSecondary}>
              Cinco minutos já valem. Se quiser parar depois, tudo bem.
            </AppText>
          </>
        ) : (
          <>
            <AppText variant="display" color={colors.onHero}>
              {tasks.length === 0 ? 'Nenhum passo por aqui ainda' : 'Defina um primeiro passo'}
            </AppText>
            <AppText variant="body" color={colors.onHeroSecondary}>
              {tasks.length === 0
                ? 'Anote algo que você vem adiando. Depois, a gente divide em partes pequenas.'
                : 'Escolha uma tarefa e escreva uma ação que caiba em poucos minutos.'}
            </AppText>
            {tasks.length === 0 ? (
              <Button
                label="Criar minha primeira tarefa"
                icon="add"
                variant="hero"
                onPress={goToNewTask}
                accessibilityHint="Abre o formulário de nova tarefa"
                style={styles.heroButton}
              />
            ) : (
              <Button
                label="Ver minhas tarefas"
                icon="tasks"
                variant="hero"
                onPress={goToTasks}
                accessibilityHint="Abre a aba Tarefas"
                style={styles.heroButton}
              />
            )}
          </>
        )}
      </Card>

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

const styles = StyleSheet.create({
  heroButton: {
    alignSelf: 'flex-start',
    marginTop: spacing.sm,
  },
});
