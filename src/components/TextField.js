import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { colors, minTouchTarget, radius, spacing, typography } from '../theme';
import { AppText } from './AppText';

/**
 * Campo de texto com rótulo visível, contador de caracteres e mensagem de erro.
 * - O contorno usa borderStrong (contraste de 3:1 exigido para limites de campo).
 * - Com foco, o contorno fica verde; com erro, fica na cor de erro, e a mensagem
 *   aparece em texto logo abaixo (a cor nunca é a única pista).
 * - A mensagem de erro é anunciada pelo leitor de tela quando aparece.
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

  let borderColor = colors.borderStrong;
  if (error) {
    borderColor = colors.error;
  } else if (focused) {
    borderColor = colors.primary;
  }

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <AppText variant="label" style={styles.label}>
          {label}
        </AppText>
        {maxLength ? (
          <AppText
            variant="caption"
            color={colors.textSecondary}
            accessibilityLabel={`${value.length} de ${maxLength} caracteres`}>
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
        accessibilityHint={error ?? hint}
        selectionColor={colors.primary}
        style={[styles.input, multiline ? styles.multiline : null, { borderColor }]}
      />

      {error ? (
        <AppText variant="caption" color={colors.error} accessibilityLiveRegion="polite">
          {error}
        </AppText>
      ) : hint ? (
        <AppText variant="caption" color={colors.textSecondary}>
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
    minHeight: 96,
    textAlignVertical: 'top',
  },
});
