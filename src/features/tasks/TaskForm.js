import { useState } from 'react';
import { AccessibilityInfo, Pressable, ScrollView, StyleSheet, Switch, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '../../components/AppText';
import { Button } from '../../components/Button';
import { TextField } from '../../components/TextField';
import { colors, minTouchTarget, pressedFeedback, spacing } from '../../theme';
import { NOTES_MAX_LENGTH, TITLE_MAX_LENGTH, hasErrors, validateTaskFields } from './validation';

const EMPTY_VALUES = { title: '', notes: '', forToday: false };

/** Botão de texto do cabeçalho do formulário ("Cancelar" e "Salvar"). */
function HeaderButton({ label, onPress, emphasis = false, accessibilityHint }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      hitSlop={8}
      style={({ pressed }) => [styles.headerButton, pressed ? pressedFeedback : null]}>
      <AppText
        variant={emphasis ? 'button' : 'body'}
        color={emphasis ? colors.primary : colors.textSecondary}>
        {label}
      </AppText>
    </Pressable>
  );
}

/**
 * Formulário de tarefa, reutilizável para criar e editar.
 * "Salvar" fica no cabeçalho para continuar visível mesmo com o teclado aberto.
 * - initialValues: { title, notes, forToday }
 * - onSubmit(fields): chamado só quando os campos são válidos.
 * - onDelete: opcional; quando existe (edição), mostra o botão "Excluir tarefa".
 * - autoFocusTitle: abre o teclado no título (útil ao criar; na edição fica desligado).
 */
export function TaskForm({
  heading,
  initialValues = EMPTY_VALUES,
  onSubmit,
  onCancel,
  onDelete,
  autoFocusTitle = true,
}) {
  const [title, setTitle] = useState(initialValues.title);
  const [notes, setNotes] = useState(initialValues.notes);
  const [forToday, setForToday] = useState(initialValues.forToday);
  const [errors, setErrors] = useState({});

  // A mensagem de erro some assim que o usuário corrige o campo.
  function handleTitleChange(text) {
    setTitle(text);
    if (errors.title && text.trim().length > 0) {
      setErrors((current) => ({ ...current, title: undefined }));
    }
  }

  function handleSubmit() {
    const fields = { title, notes, forToday };
    const found = validateTaskFields(fields);

    if (hasErrors(found)) {
      setErrors(found);
      AccessibilityInfo.announceForAccessibility(Object.values(found)[0]);
      return;
    }

    onSubmit(fields);
  }

  return (
    <SafeAreaView edges={['top', 'left', 'right', 'bottom']} style={styles.safeArea}>
      <View style={styles.header}>
        <HeaderButton label="Cancelar" onPress={onCancel} accessibilityHint="Fecha sem salvar" />
        <AppText variant="heading" accessibilityRole="header" style={styles.headerTitle}>
          {heading}
        </AppText>
        <HeaderButton label="Salvar" onPress={handleSubmit} emphasis />
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <TextField
          label="Título"
          value={title}
          onChangeText={handleTitleChange}
          error={errors.title}
          maxLength={TITLE_MAX_LENGTH}
          autoFocus={autoFocusTitle}
          returnKeyType="done"
        />

        <TextField
          label="Observação (opcional)"
          value={notes}
          onChangeText={setNotes}
          error={errors.notes}
          hint="Um detalhe que ajude a começar, se quiser."
          maxLength={NOTES_MAX_LENGTH}
          multiline
        />

        {/*
          A linha inteira é um único controle "chave": tocar no texto também alterna,
          e o leitor de tela lê "Para hoje, chave, ativada/desativada" uma vez só.
        */}
        <Pressable
          onPress={() => setForToday((current) => !current)}
          accessibilityRole="switch"
          accessibilityState={{ checked: forToday }}
          accessibilityLabel="Para hoje"
          accessibilityHint='Mostra a tarefa em "Tarefas de hoje", na tela inicial'
          style={styles.switchRow}>
          <View style={styles.switchTexts}>
            <AppText variant="bodyStrong">Para hoje</AppText>
            <AppText variant="caption" color={colors.textSecondary}>
              Mostra a tarefa em "Tarefas de hoje", na tela inicial.
            </AppText>
          </View>
          <Switch
            value={forToday}
            onValueChange={setForToday}
            importantForAccessibility="no-hide-descendants"
            accessibilityElementsHidden
            trackColor={{ false: colors.borderStrong, true: colors.primary }}
            thumbColor={colors.surface}
            ios_backgroundColor={colors.borderStrong}
          />
        </Pressable>

        {onDelete ? (
          <Button
            label="Excluir tarefa"
            icon="delete"
            variant="danger"
            onPress={onDelete}
            accessibilityHint="Pede confirmação antes de excluir"
            style={styles.deleteButton}
          />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    backgroundColor: colors.surface,
  },
  headerTitle: {
    flexShrink: 1,
    textAlign: 'center',
  },
  headerButton: {
    minHeight: minTouchTarget,
    minWidth: minTouchTarget,
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.xl,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    minHeight: minTouchTarget,
  },
  switchTexts: {
    flex: 1,
    gap: spacing.xs,
  },
  deleteButton: {
    marginTop: spacing.lg,
  },
});
