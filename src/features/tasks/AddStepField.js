import { useState } from 'react';
import { AccessibilityInfo, StyleSheet, View } from 'react-native';

import { Button } from '../../components/Button';
import { TextField } from '../../components/TextField';
import { spacing } from '../../theme';
import { STEP_MAX_LENGTH, validateStepTitle } from './validation';

/**
 * Campo para adicionar passos, um atrás do outro.
 * Depois de adicionar (botão ou tecla Enter), o campo limpa e o teclado continua
 * aberto, pronto para o próximo passo: dividir a tarefa fica rápido.
 * - inputRef: permite que a tela leve o foco até este campo.
 */
export function AddStepField({ onAdd, inputRef }) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState(undefined);

  function handleChange(text) {
    setTitle(text);
    if (error && text.trim().length > 0) {
      setError(undefined);
    }
  }

  function handleSubmit() {
    const found = validateStepTitle(title);
    if (found) {
      setError(found);
      AccessibilityInfo.announceForAccessibility(found);
      return;
    }
    onAdd(title);
    setTitle('');
    AccessibilityInfo.announceForAccessibility('Passo adicionado.');
  }

  return (
    <View style={styles.container}>
      <TextField
        label="Novo passo"
        value={title}
        onChangeText={handleChange}
        error={error}
        hint="Algo que caiba em poucos minutos. Comece com um verbo: Abrir…, Ler…, Listar…"
        maxLength={STEP_MAX_LENGTH}
        returnKeyType="done"
        submitBehavior="submit"
        onSubmitEditing={handleSubmit}
        inputRef={inputRef}
      />
      <Button
        label="Adicionar passo"
        icon="add"
        variant="secondary"
        onPress={handleSubmit}
        accessibilityHint="Adiciona o passo no fim da lista"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
});
