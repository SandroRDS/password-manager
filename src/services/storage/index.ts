import IStorageAdapter from '../../adapters/storage/IStorageAdapter';
import StorageAdapter from '../../adapters/storage/StorageAdapter';
import StorageKeys from '../../types/StorageKeys';

export default class StorageService {
  constructor(private storageAdapter: IStorageAdapter = new StorageAdapter) {}

  saveItem<ItemStorage>(key: string, value: ItemStorage): void {
    return this.storageAdapter.saveItem<ItemStorage>(key, value);
  }

  getItem<ItemStorage>(key: string): ItemStorage | null {
    return this.storageAdapter.getItem<ItemStorage>(key as StorageKeys);
  }

  deleteItem(key: string): void {
    return this.storageAdapter.deleteItem(key);
  }
}
