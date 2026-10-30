import AsyncStorage from '@react-native-async-storage/async-storage';

// Único arquivo do app que conhece o AsyncStorage.
// As telas nunca acessam o armazenamento diretamente: passam pelo TasksContext.
// Se um dia trocarmos por SQLite, só este arquivo muda.

const STORAGE_KEY = '@destrava/tasks';

// Versão do formato salvo. Quando o modelo muda, este número aumenta e uma
// migração converte os dados antigos em migrate().
// - Versão 1 (Etapa 2): passo = { id, title, done }
// - Versão 2 (Etapa 3): passo ganha createdAt e completedAt
const CURRENT_SCHEMA_VERSION = 2;

/**
 * Versão 1 -> 2: acrescenta as datas dos passos.
 * Para passos antigos a data é desconhecida, então fica null: não inventamos datas
 * (princípio "Honestidade" do PRODUCT.md).
 */
function migrateV1toV2(tasks) {
  return tasks.map((task) => ({
    ...task,
    steps: (task.steps ?? []).map((step) => ({ createdAt: null, completedAt: null, ...step })),
  }));
}

/**
 * Converte o que estava salvo para o formato atual, uma versão por vez.
 * Lança erro se os dados estiverem num formato desconhecido.
 */
function migrate(data) {
  if (!data || typeof data !== 'object' || !Array.isArray(data.tasks)) {
    throw new Error('Formato de dados inválido');
  }

  let { schemaVersion, tasks } = data;

  if (schemaVersion === 1) {
    tasks = migrateV1toV2(tasks);
    schemaVersion = 2;
  }

  if (schemaVersion === CURRENT_SCHEMA_VERSION) {
    return tasks;
  }
  throw new Error(`Versão de dados desconhecida: ${data.schemaVersion}`);
}

/** Lê as tarefas salvas. Na primeira vez (nada salvo), devolve uma lista vazia. */
export async function readTasks() {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (raw === null) {
    return [];
  }
  return migrate(JSON.parse(raw));
}

/** Salva a lista completa de tarefas, junto com a versão do formato. */
export async function writeTasks(tasks) {
  const data = { schemaVersion: CURRENT_SCHEMA_VERSION, tasks };
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
