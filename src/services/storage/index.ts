import TargetStorageAdapter from "../../adapters/storage/TargetStorageAdapter";

export default class StorageService {
  constructor(private adapteeStorageAdapter: TargetStorageAdapter) {}

  async saveItem<ItemStorage>(key: string, value: ItemStorage): Promise<void> {
    return await this.adapteeStorageAdapter.saveItem<ItemStorage>(key, value);
  }

  async getItem<ItemStorage>(key: string): Promise<ItemStorage | null> {
    return await this.adapteeStorageAdapter.getItem<ItemStorage>(key);
  }

  async deleteItem(key: string): Promise<void> {
    this.adapteeStorageAdapter.deleteItem(key);
  }
}
