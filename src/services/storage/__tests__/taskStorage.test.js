import AsyncStorage from '@react-native-async-storage/async-storage';

import { readTasks, writeTasks } from '../taskStorage';

// Simulação do AsyncStorage em memória: os testes não dependem do aparelho.
jest.mock('@react-native-async-storage/async-storage', () => {
  const store = new Map();
  return {
    __esModule: true,
    default: {
      getItem: async (key) => (store.has(key) ? store.get(key) : null),
      setItem: async (key, value) => {
        store.set(key, value);
      },
      removeItem: async (key) => {
        store.delete(key);
      },
      clear: async () => {
        store.clear();
      },
    },
  };
});

const KEY = '@destrava/tasks';

beforeEach(async () => {
  await AsyncStorage.clear();
});

describe('taskStorage', () => {
  test('primeira leitura (nada salvo) devolve lista vazia', async () => {
    await expect(readTasks()).resolves.toEqual([]);
  });

  test('grava e lê de volta, com a versão do formato', async () => {
    const tasks = [{ id: 'a', title: 'A', status: 'pending', steps: [] }];
    await writeTasks(tasks);

    await expect(readTasks()).resolves.toEqual(tasks);
    expect(JSON.parse(await AsyncStorage.getItem(KEY)).schemaVersion).toBe(1);
  });

  test('dados corrompidos geram erro (a tela mostra "Tentar de novo")', async () => {
    await AsyncStorage.setItem(KEY, 'isto não é JSON');
    await expect(readTasks()).rejects.toThrow();
  });

  test('formato sem lista de tarefas gera erro', async () => {
    await AsyncStorage.setItem(KEY, JSON.stringify({ schemaVersion: 1 }));
    await expect(readTasks()).rejects.toThrow('Formato de dados inválido');
  });

  test('versão desconhecida gera erro', async () => {
    await AsyncStorage.setItem(KEY, JSON.stringify({ schemaVersion: 99, tasks: [] }));
    await expect(readTasks()).rejects.toThrow('Versão de dados desconhecida: 99');
  });
});
