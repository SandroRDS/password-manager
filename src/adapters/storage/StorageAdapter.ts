import IStorageAdapter from "./IStorageAdapter";

class StorageAdapter implements IStorageAdapter {
  saveItem<ItemStorage>(key: string, value: ItemStorage): void {
    try {
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
    const jsonValue = localStorage.getItem(key);
    return jsonValue ? JSON.parse(jsonValue) : null;
  }

  deleteItem(key: string): void {
    localStorage.removeItem(key);
  }
};

export default StorageAdapter;
