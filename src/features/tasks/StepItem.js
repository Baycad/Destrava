import { StyleSheet, View } from 'react-native';

import { AppText } from '../../components/AppText';
import { Checkbox } from '../../components/Checkbox';
import { colors, spacing } from '../../theme';

/**
 * Linha de passo: caixa de seleção (feito/não feito) e o texto do passo.
 * Para o leitor de tela, a caixa já leva o texto como rótulo; por isso o texto
 * visível fica oculto para ele, e nada é lido duas vezes.
 * (Na parte 3c, tocar no texto vai abrir a edição do passo.)
 */
export function StepItem({ step, onToggle, showDivider = false }) {
  return (
    <View style={[styles.row, showDivider ? styles.divider : null]}>
      <Checkbox
        checked={step.done}
        onChange={() => onToggle(step)}
        label={step.title}
        hint={step.done ? 'Desmarca o passo' : 'Marca o passo como feito'}
      />
      <View style={styles.texts} importantForAccessibility="no-hide-descendants" accessibilityElementsHidden>
        <AppText variant="body" color={step.done ? colors.textSecondary : colors.text}>
          {step.title}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: spacing.xs,
    paddingLeft: spacing.xs,
    paddingRight: spacing.lg,
  },
  divider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  texts: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingLeft: spacing.xs,
  },
});
