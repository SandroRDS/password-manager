import store from 'storejs';
import defaultConfig from './defaultConfig';
const DATABASE_ESSENTIAL_KEYS = ['username'];
const DATABASE_LIMIT_SPACE = 5 * 1024 ** 2; // Suporta até 5MB de dados armazenados

function databaseExists() {
  return DATABASE_ESSENTIAL_KEYS.every(KEY => store.get(`?${KEY}`));
}

async function loadDatabase() {
  if (databaseExists()) return;

  localStorage.clear();
  store.set(defaultConfig);
}

async function getData(dataKey: string) {
  return store.get(dataKey);
}

async function setData(dataKey: string, dataValue: any) {
  const availableSpace = DATABASE_LIMIT_SPACE - JSON.stringify(localStorage).length;
  if (availableSpace <= 0) throw new Error('Seu espaço de armazenamento permitido pelo navegador chegou ao limite.\nDelete algumas senhas para liberar espaço.');
  store.set(dataKey, dataValue);
}

export { loadDatabase, getData, setData };