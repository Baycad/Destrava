import { Tabs } from 'expo-router';

import { Icon } from '../../components/Icon';
import { colors, typography } from '../../theme';

/**
 * Navegação inferior com três abas.
 * O nome de cada Tabs.Screen corresponde a um arquivo desta pasta:
 *   index.js -> Hoje | tarefas.js -> Tarefas | progresso.js -> Progresso
 * A pasta "(tabs)" é um grupo: os parênteses não aparecem na URL da rota.
 */
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // Transição suave (cross-fade) ao trocar de aba.
        // Não cria espera: a tela nova já está pronta e só aparece com um fade curto.
        animation: 'fade',
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: typography.tabLabel,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Hoje',
          tabBarIcon: ({ color, size }) => <Icon name="today" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="tarefas"
        options={{
          title: 'Tarefas',
          tabBarIcon: ({ color, size }) => <Icon name="tasks" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="progresso"
        options={{
          title: 'Progresso',
          tabBarIcon: ({ color, size }) => <Icon name="progress" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
