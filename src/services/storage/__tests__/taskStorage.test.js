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
    expect(JSON.parse(await AsyncStorage.getItem(KEY)).schemaVersion).toBe(2);
  });

  test('migra dados da versão 1: passos ganham datas desconhecidas (null)', async () => {
    const v1 = {
      schemaVersion: 1,
      tasks: [
        {
          id: 'a',
          title: 'A',
          status: 'pending',
          steps: [
            { id: 's1', title: 'Feito antes', done: true },
            { id: 's2', title: 'Em aberto', done: false },
          ],
        },
        { id: 'b', title: 'Sem passos', status: 'pending', steps: [] },
      ],
    };
    await AsyncStorage.setItem(KEY, JSON.stringify(v1));

    const tasks = await readTasks();
    expect(tasks[0].steps).toEqual([
      { id: 's1', title: 'Feito antes', done: true, createdAt: null, completedAt: null },
      { id: 's2', title: 'Em aberto', done: false, createdAt: null, completedAt: null },
    ]);
    expect(tasks[1].steps).toEqual([]);
    expect(tasks[0].title).toBe('A');
  });

  test('migração de tarefa da versão 1 sem a lista de passos: vira lista vazia', async () => {
    await AsyncStorage.setItem(KEY, JSON.stringify({ schemaVersion: 1, tasks: [{ id: 'a', title: 'A' }] }));
    expect((await readTasks())[0].steps).toEqual([]);
  });

  test('migração preserva datas que já existam', async () => {
    const v1 = {
      schemaVersion: 1,
      tasks: [{ id: 'a', title: 'A', steps: [{ id: 's', title: 'x', done: true, completedAt: 'T' }] }],
    };
    await AsyncStorage.setItem(KEY, JSON.stringify(v1));
    expect((await readTasks())[0].steps[0].completedAt).toBe('T');
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
