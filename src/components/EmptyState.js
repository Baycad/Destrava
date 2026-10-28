import { StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '../theme';
import { AppText } from './AppText';
import { Button } from './Button';
import { Icon } from './Icon';

/**
 * Estado vazio: aparece quando ainda não há dados.
 * O contorno tracejado indica "espaço disponível", e o texto
 * convida a agir, sem tom de cobrança.
 */
export function EmptyState({ icon = 'leaf', title, message, actionLabel, onAction }) {
  return (
    <View style={styles.container}>
      <Icon name={icon} size={32} color={colors.primary} />
      <AppText variant="bodyStrong" style={styles.centered}>
        {title}
      </AppText>
      {message ? (
        <AppText variant="caption" color={colors.textSecondary} style={styles.centered}>
          {message}
        </AppText>
      ) : null}
      {actionLabel && onAction ? (
        <Button label={actionLabel} onPress={onAction} variant="secondary" style={styles.action} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.borderStrong,
  },
  centered: {
    textAlign: 'center',
  },
  action: {
    marginTop: spacing.sm,
  },
});
