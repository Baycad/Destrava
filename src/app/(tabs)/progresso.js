import { StyleSheet, View } from 'react-native';

import { AppText } from '../../components/AppText';
import { Card } from '../../components/Card';
import { DemoBadge } from '../../components/DemoBadge';
import { EmptyState } from '../../components/EmptyState';
import { Screen } from '../../components/Screen';
import { ScreenHeader } from '../../components/ScreenHeader';
import { SectionHeader } from '../../components/SectionHeader';
import { StatTile } from '../../components/StatTile';
import { SHOW_DEMO_DATA, getWeekSummary } from '../../data/demo';
import { colors, spacing } from '../../theme';

/** Linha "resultado da sessão + quantidade" (usada só nesta tela). */
function OutcomeRow({ label, value }) {
  return (
    <View style={styles.outcomeRow} accessible accessibilityLabel={`${label}: ${value}`}>
      <AppText variant="body" style={styles.outcomeLabel}>
        {label}
      </AppText>
      <AppText variant="bodyStrong" color={colors.primary}>
        {value}
      </AppText>
    </View>
  );
}

/** Aba "Progresso": resumo da semana, sem metas obrigatórias nem sequências. */
export default function ProgressScreen() {
  const summary = getWeekSummary();

  return (
    <Screen>
      <ScreenHeader
        title="Progresso"
        subtitle="Um retrato da sua semana, para você se observar, não para se cobrar."
      />

      {SHOW_DEMO_DATA ? <DemoBadge /> : null}

      {summary ? (
        <>
          <View style={styles.grid}>
            <StatTile boxed value={summary.sessions} label="sessões de foco" style={styles.gridItem} />
            <StatTile boxed value={summary.focusMinutes} label="minutos focados" style={styles.gridItem} />
            <StatTile boxed value={summary.stepsDone} label="passos feitos" style={styles.gridItem} />
            <StatTile boxed value={summary.tasksDone} label="tarefas concluídas" style={styles.gridItem} />
          </View>

          <SectionHeader title="Como terminaram as sessões" />
          <Card>
            <OutcomeRow label="Concluí o passo" value={summary.outcomes.completed} />
            <OutcomeRow label="Avancei um pouco" value={summary.outcomes.progressed} />
            <OutcomeRow label="Precisei parar" value={summary.outcomes.stopped} />
            <AppText variant="caption" color={colors.textSecondary}>
              Parar também faz parte. Cada sessão iniciada já foi um começo.
            </AppText>
          </Card>
        </>
      ) : (
        <EmptyState
          icon="progress"
          title="Seu progresso aparece aqui"
          message="Depois da primeira sessão de foco, você verá um resumo da semana. Sem metas obrigatórias."
        />
      )}

      <Card variant="muted">
        <AppText variant="label">Sobre o Destrava</AppText>
        <AppText variant="caption" color={colors.textSecondary}>
          O Destrava é uma ferramenta de organização e reflexão. Ele não faz diagnóstico nem
          substitui acompanhamento profissional.
        </AppText>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  gridItem: {
    flexBasis: '45%',
    flexGrow: 1,
  },
  outcomeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  outcomeLabel: {
    flexShrink: 1,
  },
});
