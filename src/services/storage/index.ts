import IStorageAdapter from "../../adapters/storage/IStorageAdapter";

export default class StorageService {
  constructor(private storageAdapter: IStorageAdapter) {}

  saveItem<ItemStorage>(key: string, value: ItemStorage): void {
    return this.storageAdapter.saveItem<ItemStorage>(key, value);
  }

  getItem<ItemStorage>(key: string): ItemStorage | null {
    return this.storageAdapter.getItem<ItemStorage>(key);
  }

  deleteItem(key: string): void {
    return this.storageAdapter.deleteItem(key);
  }
}
