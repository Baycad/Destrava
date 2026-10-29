import AsyncStorage from '@react-native-async-storage/async-storage';

// Único arquivo do app que conhece o AsyncStorage.
// As telas nunca acessam o armazenamento diretamente: passam pelo TasksContext.
// Se um dia trocarmos por SQLite, só este arquivo muda.

const STORAGE_KEY = '@destrava/tasks';

// Versão do formato salvo. Quando o modelo mudar (ex.: Etapa 3), aumentamos
// este número e escrevemos uma migração em migrate().
const CURRENT_SCHEMA_VERSION = 1;

/**
 * Converte o que estava salvo para o formato atual.
 * Lança erro se os dados estiverem num formato desconhecido.
 */
function migrate(data) {
  if (!data || typeof data !== 'object' || !Array.isArray(data.tasks)) {
    throw new Error('Formato de dados inválido');
  }
  if (data.schemaVersion === CURRENT_SCHEMA_VERSION) {
    return data.tasks;
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
