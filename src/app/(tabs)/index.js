import { useRouter } from 'expo-router';
import { Alert, StyleSheet, View } from 'react-native';

import { AppText } from '../../components/AppText';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { DemoBadge } from '../../components/DemoBadge';
import { EmptyState } from '../../components/EmptyState';
import { Screen } from '../../components/Screen';
import { ScreenHeader } from '../../components/ScreenHeader';
import { SectionHeader } from '../../components/SectionHeader';
import { StatTile } from '../../components/StatTile';
import { SHOW_DEMO_DATA, getTasks, getWeekSummary } from '../../data/demo';
import { TaskList } from '../../features/tasks/TaskList';
import { getNextStep, getTodayTasks } from '../../features/tasks/selectors';
import { colors, spacing } from '../../theme';
import { formatLongDate, getGreeting } from '../../utils/date';

/** Aba "Hoje": a tela inicial do Destrava. */
export default function TodayScreen() {
  const router = useRouter();
  const now = new Date();

  const tasks = getTasks();
  const nextStep = getNextStep(tasks);
  const todayTasks = getTodayTasks(tasks);
  const summary = getWeekSummary();

  function handleStartFocus() {
    // O temporizador de foco será construído na Etapa 4.
    Alert.alert(
      'Modo foco em construção',
      'Nesta etapa, o botão é apenas visual. O temporizador de foco chega numa próxima etapa.'
    );
  }

  function goToTasks() {
    router.navigate('/tarefas');
  }

  function goToProgress() {
    router.navigate('/progresso');
  }

  return (
    <Screen>
      {/* 1. Saudação e apresentação do dia */}
      <ScreenHeader title={`${getGreeting(now)}!`} subtitle={formatLongDate(now)} />

      {SHOW_DEMO_DATA ? <DemoBadge /> : null}

      {/* 2. Pergunta central do app */}
      <AppText variant="display">Qual é a menor coisa que você pode começar agora?</AppText>

      {/* 3 e 4. Card de destaque com o botão principal */}
      <Card variant="hero" style={styles.heroCard}>
        <AppText variant="label" color={colors.onHeroSecondary}>
          Seu próximo passo
        </AppText>

        {nextStep ? (
          <>
            <AppText variant="hero" color={colors.onHero}>
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
              accessibilityHint="Abre uma sessão curta de foco para este passo"
              style={styles.heroButton}
            />
            <AppText variant="caption" color={colors.onHeroSecondary}>
              Cinco minutos já valem. Se quiser parar depois, tudo bem.
            </AppText>
          </>
        ) : (
          <>
            <AppText variant="hero" color={colors.onHero}>
              {tasks.length === 0 ? 'Nenhum passo por aqui ainda' : 'Defina um primeiro passo'}
            </AppText>
            <AppText variant="body" color={colors.onHeroSecondary}>
              {tasks.length === 0
                ? 'Anote algo que você vem adiando. Depois, a gente divide em partes pequenas.'
                : 'Escolha uma tarefa e escreva uma ação que caiba em poucos minutos.'}
            </AppText>
            <Button
              label={tasks.length === 0 ? 'Criar minha primeira tarefa' : 'Ver minhas tarefas'}
              icon={tasks.length === 0 ? 'add' : 'tasks'}
              variant="hero"
              onPress={goToTasks}
              style={styles.heroButton}
            />
          </>
        )}
      </Card>

      {/* 5. Tarefas do dia */}
      <SectionHeader
        title="Tarefas de hoje"
        actionLabel="Ver todas"
        actionHint="Abre a aba Tarefas"
        onAction={goToTasks}
      />
      {todayTasks.length > 0 ? (
        <TaskList tasks={todayTasks} />
      ) : (
        <EmptyState
          icon="leaf"
          title="Nada marcado para hoje"
          message="Tudo bem. Quando quiser, escolha uma tarefa e um primeiro passo pequeno."
        />
      )}

      {/* 6. Resumo simples do progresso */}
      <SectionHeader
        title="Sua semana"
        actionLabel="Ver progresso"
        actionHint="Abre a aba Progresso"
        onAction={goToProgress}
      />
      {summary ? (
        <Card>
          <View style={styles.statsRow}>
            <StatTile value={summary.sessions} label="sessões de foco" />
            <StatTile value={summary.focusMinutes} label="minutos focados" />
            <StatTile value={summary.stepsDone} label="passos feitos" />
          </View>
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
  heroCard: {
    padding: spacing.xl,
    gap: spacing.md,
  },
  heroButton: {
    alignSelf: 'flex-start',
    marginTop: spacing.sm,
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
  },
});
