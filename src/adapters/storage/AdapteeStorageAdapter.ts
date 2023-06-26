import TargetStorageAdapter from "./TargetStorageAdapter";

class AdapteeStorageAdapter implements TargetStorageAdapter {
  async saveItem<ItemStorage>(key: string, value: ItemStorage): Promise<void> {
    try {
      localStorage.setItem(key, JSON.stringify(value));  
    } catch (e: any) {
      if (e.name === 'QuotaExceededError') throw new Error('Cota de armazenamento excedida.');
      throw e;
    }
  }

  async getItem<ItemStorage>(key: string): Promise<ItemStorage | null> {
    const jsonValue = localStorage.getItem(key);
    return jsonValue ? JSON.parse(jsonValue) : null;
  }

  async deleteItem(key: string): Promise<void> {
    localStorage.removeItem(key);
  }
};

export default AdapteeStorageAdapter;
