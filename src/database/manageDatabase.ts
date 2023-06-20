import store from 'storejs';
import { UserConfigType } from '../types/UserConfigType';
const DATABASE_ESSENTIAL_KEYS = ['user'];

function databaseExists() {
  return DATABASE_ESSENTIAL_KEYS.every(KEY => store.get(`?${KEY}`));
}

async function getData(dataKey: keyof UserConfigType) {
  return store.get(dataKey);
}

async function setData(dataKey: keyof UserConfigType, dataValue: any) {
  try {
    store.set(dataKey, dataValue);
  } catch {
    throw new Error('Seu espaço de armazenamento permitido pelo navegador chegou ao limite.\nDelete algumas senhas para liberar espaço.');
  }
}

export { databaseExists, getData, setData, DATABASE_ESSENTIAL_KEYS };
