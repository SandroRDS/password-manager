import IStorageAdapter from "./IStorageAdapter";
import config from "../../config";

class StorageAdapter implements IStorageAdapter {
  saveItem<ItemStorage>(key: string, value: ItemStorage): void {
    try {
      if (!config.constants.STORAGE_KEYS.includes(key)) throw new ReferenceError('Chave não configurada.');
      localStorage.setItem(key, JSON.stringify(value));  
    } catch (e: any) {
      if (e.name === 'QuotaExceededError') {
        const quotaError = new Error('Cota de armazenamento do navegador excedida.');
        quotaError.name = 'StorageFullError';
        throw quotaError;
      }
      
      throw e;
    }
  }

  getItem<ItemStorage>(key: string): ItemStorage | null {
    if (!config.constants.STORAGE_KEYS.includes(key)) throw new ReferenceError('Chave não configurada.');
    const jsonValue = localStorage.getItem(key);
    return jsonValue ? JSON.parse(jsonValue) : null;
  }

  deleteItem(key: string): void {
    localStorage.removeItem(key);
  }
};

export default StorageAdapter;
