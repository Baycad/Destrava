import { DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { TasksProvider } from '../features/tasks/TasksContext';
import { colors } from '../theme';

// Tema da navegação baseado nas cores do Destrava.
// Nesta etapa o app usa somente o tema claro (modo escuro está nas versões futuras).
const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
  },
};

/**
 * Layout raiz (Expo Router).
 * - TasksProvider: deixa as tarefas (salvas no aparelho) disponíveis em todas as telas.
 * - Stack: por enquanto contém apenas o grupo de abas; telas como o formulário
 *   de tarefa entram aqui, abrindo por cima das abas.
 */
export default function RootLayout() {
  return (
    <TasksProvider>
      <ThemeProvider value={navigationTheme}>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          {/* Detalhe da tarefa: abre por cima, com o cabeçalho nativo (voltar + Editar) */}
          <Stack.Screen
            name="tarefa/[id]"
            options={{
              headerShown: true,
              title: 'Tarefa',
              headerStyle: { backgroundColor: colors.surface },
              headerTintColor: colors.primary,
              headerTitleStyle: { color: colors.text },
              headerShadowVisible: false,
            }}
          />
          {/* Formulário de tarefa: abre por cima das abas, como modal */}
          <Stack.Screen name="tarefa/formulario" options={{ presentation: 'modal' }} />
        </Stack>
      </ThemeProvider>
    </TasksProvider>
  );
}
