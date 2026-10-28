import { StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '../theme';
import { AppText } from './AppText';
import { Icon } from './Icon';

/**
 * Aviso de que a tela mostra dados fictícios.
 * Será removido quando as tarefas passarem a ser salvas no aparelho (Etapa 2).
 */
export function DemoBadge() {
  return (
    <View
      style={styles.container}
      accessible
      accessibilityLabel="Atenção: modo demonstração. Os dados desta tela são exemplos para visualizar a interface.">
      <Icon name="info" size={18} color={colors.demoText} />
      <AppText variant="caption" color={colors.demoText} style={styles.text}>
        <AppText variant="label" color={colors.demoText}>
          Modo demonstração.{' '}
        </AppText>
        Os dados abaixo são exemplos para visualizar a interface.
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.demoBackground,
  },
  text: {
    flex: 1,
  },
});
