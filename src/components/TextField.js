import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import {
  colors,
  minTouchTarget,
  multilineFieldMinHeight,
  radius,
  spacing,
  typography,
} from '../theme';
import { buildSpokenHint } from '../utils/accessibility';
import { AppText } from './AppText';

/**
 * Campo de texto com rótulo visível, contador de caracteres e mensagem de erro.
 * - O contorno usa borderStrong (contraste de 3:1 exigido para limites de campo).
 * - Com foco, o contorno fica verde; com erro, fica na cor de erro, e a mensagem
 *   aparece em texto logo abaixo (a cor nunca é a única pista).
 * - A mensagem de erro é anunciada pelo leitor de tela quando aparece.
 * - Para o leitor de tela, rótulo, contador e dica fazem parte do próprio campo
 *   (rótulo + dica do TextInput). Os textos visíveis equivalentes ficam ocultos
 *   para ele, para nada ser lido duas vezes (auditoria de acessibilidade da Etapa 2).
 */
export function TextField({
  label,
  value,
  onChangeText,
  error,
  hint,
  maxLength,
  multiline = false,
  autoFocus = false,
  returnKeyType,
}) {
  const [focused, setFocused] = useState(false);

  // Com erro, a dica falada é a mensagem de erro; sem erro, a dica e o contador.
  const spokenHint = buildSpokenHint({ error, hint, value, maxLength });

  let borderColor = colors.borderStrong;
  if (error) {
    borderColor = colors.error;
  } else if (focused) {
    borderColor = colors.primary;
  }

  return (
    <View style={styles.container}>
      {/* Visível para todos, mas oculto para o leitor de tela (já está no campo). */}
      <View
        style={styles.labelRow}
        importantForAccessibility="no-hide-descendants"
        accessibilityElementsHidden>
        <AppText variant="label" style={styles.label}>
          {label}
        </AppText>
        {maxLength ? (
          <AppText variant="caption" color={colors.textSecondary}>
            {value.length}/{maxLength}
          </AppText>
        ) : null}
      </View>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        maxLength={maxLength}
        multiline={multiline}
        autoFocus={autoFocus}
        returnKeyType={returnKeyType}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        accessibilityLabel={label}
        accessibilityHint={spokenHint}
        selectionColor={colors.primary}
        style={[styles.input, multiline ? styles.multiline : null, { borderColor }]}
      />

      {error ? (
        <AppText variant="caption" color={colors.error} accessibilityLiveRegion="polite">
          {error}
        </AppText>
      ) : hint ? (
        <AppText
          variant="caption"
          color={colors.textSecondary}
          importantForAccessibility="no"
          accessibilityElementsHidden>
          {hint}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: spacing.md,
  },
  label: {
    flexShrink: 1,
  },
  input: {
    minHeight: minTouchTarget,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1.5,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    color: colors.text,
    fontSize: typography.body.fontSize,
  },
  multiline: {
    minHeight: multilineFieldMinHeight,
    textAlignVertical: 'top',
  },
});
